import { routingCatalogueReady, validateIds, type Pub } from '../shared/catalogue.js'
import { normaliseOrs, object } from '../shared/route.js'

export const ORS_URL = 'https://api.heigit.org/openrouteservice/v2/directions/foot-walking/geojson'
const RESPONSE_LIMIT = 2 * 1024 * 1024
interface Options {
  enabled: boolean
  environment: string | undefined
  apiKey: string | undefined
  origin: string
  pubs: readonly Pub[]
  revision: string
  fetcher?: typeof fetch
}
class Failure extends Error {
  readonly status: number
  readonly code: string
  constructor(status: number, code: string, message: string) { super(message); this.status = status; this.code = code }
}
function failure(status: number, code: string, message: string): never { throw new Failure(status, code, message) }
function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra } })
}

// Race the operation as well as aborting it: cancellation is cooperative, not a deadline guarantee.
async function bounded<T>(task: (signal: AbortSignal) => Promise<T>, milliseconds: number, parent: AbortSignal, timeout: Failure): Promise<T> {
  const controller = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  let onAbort = () => {}
  const stop = new Promise<never>((_, reject) => {
    onAbort = () => { controller.abort(); reject(new Failure(408, 'REQUEST_CANCELLED', 'The request was cancelled.')) }
    parent.addEventListener('abort', onAbort, { once: true })
    if (parent.aborted) onAbort()
    timer = setTimeout(() => { controller.abort(); reject(timeout) }, milliseconds)
  })
  try {
    if (parent.aborted) return await stop
    return await Promise.race([task(controller.signal), stop])
  } finally {
    controller.abort()
    clearTimeout(timer)
    parent.removeEventListener('abort', onAbort)
  }
}

async function readJson(body: ReadableStream<Uint8Array> | null, limit: number, signal: AbortSignal, oversize: Failure): Promise<unknown> {
  if (!body) throw new SyntaxError('Empty body')
  const reader = body.getReader(), chunks: Uint8Array[] = []
  let size = 0
  const cancel = () => { void reader.cancel().catch(() => {}) }
  signal.addEventListener('abort', cancel, { once: true })
  try {
    while (true) {
      signal.throwIfAborted()
      const { value, done } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > limit) throw oversize
      chunks.push(value)
    }
    const bytes = new Uint8Array(size)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) as unknown
  } finally {
    signal.removeEventListener('abort', cancel)
    cancel()
  }
}

export function createWalkingHandler(options: Options): (request: Request) => Promise<Response> {
  return async request => {
    try {
      if (request.method !== 'POST') {
        const response = json({ error: { code: 'METHOD_NOT_ALLOWED', message: 'Use POST.' } }, 405, { Allow: 'POST' })
        return request.method === 'HEAD' ? new Response(null, { status: 405, headers: response.headers }) : response
      }
      const url = new URL(request.url)
      if (url.pathname !== '/api/walking-route' || url.search) failure(400, 'INVALID_REQUEST', 'Use the walking route endpoint without query parameters.')
      if (url.origin !== options.origin || request.headers.get('origin') !== options.origin ||
          request.headers.get('sec-fetch-site') === 'cross-site') failure(403, 'REQUEST_NOT_ALLOWED', 'This request is not allowed.')
      if (!options.enabled || options.environment === 'preview' || !options.apiKey?.trim() ||
          !routingCatalogueReady(options.pubs)) failure(503, 'ROUTING_UNAVAILABLE', 'Walking directions are currently unavailable. Your stops are saved in this plan.')
      if (!/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(request.headers.get('content-type') ?? '') ||
          request.headers.has('content-encoding')) failure(415, 'UNSUPPORTED_MEDIA_TYPE', 'Send uncompressed UTF-8 JSON.')
      const length = request.headers.get('content-length')
      if (length !== null && (!/^\d+$/.test(length) || Number(length) > 2048)) failure(413, 'PAYLOAD_TOO_LARGE', 'The request is too large.')
      let body: Record<string, unknown>
      try {
        body = object(await bounded(signal => readJson(request.body, 2048, signal,
          new Failure(413, 'PAYLOAD_TOO_LARGE', 'The request is too large.')), 2000, request.signal,
        new Failure(408, 'REQUEST_TIMEOUT', 'The request took too long.')))
      } catch (error) {
        if (error instanceof Failure) throw error
        failure(400, 'INVALID_REQUEST', 'Send a JSON object containing only pubIds.')
      }
      if (Object.keys(body).length !== 1 || !Object.hasOwn(body, 'pubIds')) failure(400, 'INVALID_REQUEST', 'Send only the pubIds field.')
      let ids: string[]
      try { ids = validateIds(body.pubIds, options.pubs, 2) } catch { failure(422, 'INVALID_ROUTE', 'Choose 2–12 unique, active pub IDs.') }
      const selected = ids.map(id => options.pubs.find(pub => pub.id === id)!)
      const route = await bounded(async signal => {
        let upstream: Response
        try {
          upstream = await (options.fetcher ?? fetch)(ORS_URL, { method: 'POST', redirect: 'error', signal,
            headers: { Authorization: options.apiKey!, 'Content-Type': 'application/json', Accept: 'application/geo+json, application/json' },
            body: JSON.stringify({ coordinates: selected.map(pub => pub.position), instructions: true,
              instructions_format: 'text', language: 'en', units: 'm' }) })
        } catch { failure(502, 'ROUTING_SERVICE_ERROR', 'The walking service could not be reached. Your stops are unchanged.') }
        let payload: unknown
        try {
          const contentType = upstream.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase()
          if (contentType !== 'application/json' && contentType !== 'application/geo+json') {
            void upstream.body?.cancel().catch(() => {})
            throw new Error('Unexpected content type')
          }
          payload = await readJson(upstream.body, RESPONSE_LIMIT, signal, new Failure(502, 'ROUTING_SERVICE_ERROR', 'The walking service returned an invalid response.'))
        } catch {
          // Authentication and throttling can have non-JSON gateway bodies.
          if (![401, 403, 429].includes(upstream.status)) failure(502, 'ROUTING_SERVICE_ERROR', 'The walking service returned an invalid response.')
        }
        if (upstream.status === 429) failure(503, 'ROUTING_BUSY', 'Walking directions are busy. Try again later; your stops are unchanged.')
        if (upstream.status === 401 || upstream.status === 403) failure(503, 'ROUTING_UNAVAILABLE', 'Walking directions are currently unavailable. Your stops are unchanged.')
        if (!upstream.ok) {
          let code: unknown
          try { code = object(object(payload).error).code } catch { /* Unrecognised provider error stays private. */ }
          if (code === 2009) failure(422, 'NO_WALKING_ROUTE', 'No walking route was found for these stops.')
          if (code === 2010) failure(422, 'WAYPOINT_UNROUTABLE', 'A selected pub could not be reached on foot. Your stops are unchanged.')
          failure(502, 'ROUTING_SERVICE_ERROR', 'The walking service is unavailable. Your stops are unchanged.')
        }
        try { return normaliseOrs(payload, selected, options.revision) }
        catch { failure(502, 'ROUTING_SERVICE_ERROR', 'The walking service returned an invalid route. Your stops are unchanged.') }
      }, 10_000, request.signal, new Failure(504, 'ROUTING_TIMEOUT', 'Walking directions took too long. Your stops are unchanged.'))
      if (new TextEncoder().encode(JSON.stringify(route)).byteLength > RESPONSE_LIMIT) failure(502, 'ROUTING_SERVICE_ERROR', 'The walking response is too large.')
      return json(route)
    } catch (error) {
      // No provider bodies, credentials, stack traces or arbitrary messages in output/logs.
      const safe = error instanceof Failure ? error : new Failure(500, 'ROUTING_ERROR', 'Walking directions are unavailable. Your stops are unchanged.')
      return json({ error: { code: safe.code, message: safe.message } }, safe.status)
    }
  }
}

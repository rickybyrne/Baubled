import { object, validateRoute, type WalkingRoute } from '../shared/route'

export class RoutingClientError extends Error {
  readonly retryable: boolean
  constructor(message: string, retryable = true) { super(message); this.retryable = retryable }
}
async function readPayload(response: Response, signal: AbortSignal): Promise<unknown> {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('Empty response')
  const cancel = () => { void reader.cancel().catch(() => {}) }
  signal.addEventListener('abort', cancel, { once: true })
  const chunks: Uint8Array[] = []
  let length = 0
  try {
    while (true) {
      signal.throwIfAborted()
      const { value, done } = await reader.read()
      if (done) break
      length += value.length
      if (length > 2 * 1024 * 1024) throw new Error('The walking response was too large.')
      chunks.push(value)
    }
    const bytes = new Uint8Array(length)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) as unknown
  } finally { signal.removeEventListener('abort', cancel); cancel() }
}
export async function requestWalkingRoute(ids: readonly string[], revision: string, signal: AbortSignal,
  fetcher: typeof fetch = fetch): Promise<WalkingRoute> {
  const combined = AbortSignal.any([signal, AbortSignal.timeout(12_000)])
  const response = await fetcher('/api/walking-route', { method: 'POST', signal: combined,
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pubIds: ids }), cache: 'no-store' })
  let payload: unknown
  try {
    const mime = response.headers.get('content-type')?.split(';')[0]?.trim().toLowerCase()
    if (mime === 'application/json') {
      try { payload = await readPayload(response, combined) } catch { /* Invalid response handled below, never echoed. */ }
    } else { void response.body?.cancel().catch(() => {}) }
    if (!response.ok) {
      let code: unknown
      try { code = object(object(payload).error).code } catch { /* Platform errors can be HTML. */ }
      if (response.status === 429 || code === 'ROUTING_BUSY') throw new RoutingClientError('Directions are busy. Try again later; your stops are unchanged.')
      if (response.status === 422) throw new RoutingClientError('These stops could not be routed. Check their pedestrian entrances; your order is unchanged.', false)
      if (response.status === 504) throw new RoutingClientError('Walking directions took too long. Your stops are unchanged.')
      throw new RoutingClientError('Walking directions are unavailable. Your stops and share link still work.',
        !['ROUTING_UNAVAILABLE', 'ROUTING_QUOTA_EXHAUSTED'].includes(String(code)) && ![401, 403].includes(response.status))
    }
    try { return validateRoute(payload, ids, revision) }
    catch { throw new RoutingClientError('The walking service returned an invalid route. Your stops are unchanged.') }
  } finally {
    if (!response.body?.locked) void response.body?.cancel().catch(() => {})
  }
}

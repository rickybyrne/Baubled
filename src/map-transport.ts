import type { AddProtocolAction, RequestTransformFunction } from 'maplibre-gl'

// A bounded proof transport, not an account-wide quota or an anti-abuse control.
// Each approved document load gets at most 50 HTTP attempts, including the logo.
export const MAP_DOCUMENT_ATTEMPTS = 50
export const MAP_PROTOCOL = 'baubled-map'
export const MAP_STYLE = 'https://api.maptiler.com/maps/streets-v2/style.json'
export const MAP_LOGO = 'https://api.maptiler.com/resources/logo.svg'
const UNAVAILABLE = 'Map unavailable. Your pub list and plan are unchanged.'

export function createMapBudget(limit = MAP_DOCUMENT_ATTEMPTS) {
  let attempts = 0
  return {
    reserve() { if (!Number.isInteger(limit) || limit < 1 || attempts >= limit) throw new Error(UNAVAILABLE); attempts++ },
    attempts: () => attempts,
  }
}
// Shared across mounts in this document, including React Strict Mode. Reloads and
// other browsers are separate allocations and must be counted in the approved plan.
const documentBudget = createMapBudget()
export function createMapTransport(key: string, fetcher: typeof fetch = fetch, budget = documentBudget) {
  const lifetime = new AbortController()
  function address(input: string): string {
    const url = new URL(input.replace(`${MAP_PROTOCOL}://`, 'https://'))
    if (url.origin !== 'https://api.maptiler.com' || url.username || url.password || url.hash ||
        !/^\/(maps\/|tiles\/|fonts\/|resources\/logo\.svg$)/.test(url.pathname)) throw new Error(UNAVAILABLE)
    // Never forward a key embedded in a third-party style, cookies or custom headers.
    url.searchParams.set('key', key)
    return url.href
  }
  async function load(input: string, parent: AbortSignal): Promise<ArrayBuffer> {
    try {
      const url = address(input)
      if (!key.trim() || lifetime.signal.aborted || parent.aborted) throw new Error(UNAVAILABLE)
      budget.reserve() // Synchronous BEFORE dispatch, including failed/cancelled attempts.
      const signal = AbortSignal.any([parent, lifetime.signal, AbortSignal.timeout(10_000)])
      const response = await fetcher(url, { signal, redirect: 'error', credentials: 'omit', cache: 'no-store' })
      if (!response.ok || !response.body) { void response.body?.cancel().catch(() => {}); throw new Error(UNAVAILABLE) }
      const reader = response.body.getReader(), chunks: Uint8Array[] = []
      const cancel = () => { void reader.cancel().catch(() => {}) }
      signal.addEventListener('abort', cancel, { once: true })
      let length = 0
      try {
        while (true) {
          signal.throwIfAborted()
          const { value, done } = await reader.read()
          if (done) break
          length += value.byteLength
          if (length > 8 * 1024 * 1024) throw new Error(UNAVAILABLE)
          chunks.push(value)
        }
        signal.throwIfAborted()
        const bytes = new Uint8Array(length)
        let offset = 0
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
        return bytes.buffer
      } finally { signal.removeEventListener('abort', cancel); cancel() }
    } catch {
      // A cancelled tile need not disable the whole map. Every other failure does.
      if (!parent.aborted) lifetime.abort()
      throw new Error(UNAVAILABLE) // Do not leak URLs/keys through MapLibre's error logging.
    }
  }
  const transformRequest: RequestTransformFunction = url => {
    try { return { url: address(url).replace('https://', `${MAP_PROTOCOL}://`) } }
    catch { lifetime.abort(); throw new Error(UNAVAILABLE) }
  }
  const protocol: AddProtocolAction = async (request, controller) => {
    const bytes = await load(request.url, controller.signal)
    try {
      const text = () => new TextDecoder('utf-8', { fatal: true }).decode(bytes)
      const data: unknown = request.type === 'json' ? JSON.parse(text()) : request.type === 'string' ? text() : bytes
      // The proof is vector-only. Do not silently enable raster, terrain or video.
      if (request.type === 'json' && new URL(address(request.url)).pathname === '/maps/streets-v2/style.json') {
        if (!data || typeof data !== 'object' || !('sources' in data) || !data.sources || typeof data.sources !== 'object' ||
            'terrain' in data || Object.values(data.sources).some(source => !source || source.type !== 'vector')) throw new Error(UNAVAILABLE)
      }
      return { data: data as object | string | ArrayBuffer }
    } catch { lifetime.abort(); throw new Error(UNAVAILABLE) }
  }
  return { transformRequest, protocol, load, stop: () => lifetime.abort(), attempts: budget.attempts }
}

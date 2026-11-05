// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createWalkingHandler, ORS_URL } from './walking-route'
import entry from '../api/walking-route'
import { testPubs, orsFixture } from '../src/test/fixtures'

const origin = 'https://baubled.vercel.app'
const key = 'NON_SECRET_TEST_SENTINEL'
const ids = testPubs.map(pub => pub.id)
function request(body: unknown = { pubIds: ids }, init: RequestInit = {}, suffix = '') {
  return new Request(`${origin}/api/walking-route${suffix}`, { method: 'POST',
    headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body), ...init })
}
function setup(overrides: Partial<Parameters<typeof createWalkingHandler>[0]> = {}) {
  const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(orsFixture()))
  return { fetcher, handler: createWalkingHandler({ enabled: true, environment: 'production', apiKey: key, origin,
    pubs: testPubs, revision: 'test', fetcher, ...overrides }) }
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs() })
describe('routing handler', () => {
  it('makes one fixed ordered request and returns only validated safe fields', async () => {
    const { handler, fetcher } = setup()
    const response = await handler(request())
    expect(response.status).toBe(200)
    const text = await response.text()
    expect(text).not.toContain(key)
    const result = JSON.parse(text)
    expect(result.legs).toHaveLength(11)
    expect(result.pubIds).toEqual(ids)
    expect(fetcher).toHaveBeenCalledTimes(1)
    const [url, init] = fetcher.mock.calls[0]!
    expect(url).toBe(ORS_URL)
    expect(init?.redirect).toBe('error')
    expect(init?.headers).toMatchObject({ Authorization: key })
    expect(JSON.parse(init?.body as string)).toEqual({ coordinates: testPubs.map(pub => pub.position),
      instructions: true, instructions_format: 'text', language: 'en', units: 'm' })
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
  })
  it.each([null, [], '', {}, { pubIds: ids, coordinates: [] }, { pubIds: ids, url: 'https://evil.test' }])('rejects body shape %j without upstream work', async body => {
    const { handler, fetcher } = setup()
    expect((await handler(request(body))).status).toBe(400)
    expect(fetcher).not.toHaveBeenCalled()
  })
  it.each([[], ['p001'], [...ids, 'p013'], ['p001', 'p001'], ['p001', 'p999'], ['p001', 2], ['p001', 'P002'], ['p001', ' p002']].map(pubIds => ({ pubIds })))('rejects IDs $pubIds without upstream work', async ({ pubIds }) => {
    const { handler, fetcher } = setup()
    expect((await handler(request({ pubIds }))).status).toBe(422)
    expect(fetcher).not.toHaveBeenCalled()
  })
  it.each([
    ['bad JSON', { body: '{' }, '', 400], ['query', {}, '?profile=driving', 400],
    ['method', { method: 'GET', body: undefined }, '', 405],
    ['origin', { headers: { origin: 'https://evil.test', 'content-type': 'application/json' } }, '', 403],
    ['missing origin', { headers: { 'content-type': 'application/json' } }, '', 403],
    ['fetch metadata', { headers: { origin, 'content-type': 'application/json', 'sec-fetch-site': 'cross-site' } }, '', 403],
    ['content type', { headers: { origin, 'content-type': 'text/plain' } }, '', 415],
    ['encoding', { headers: { origin, 'content-type': 'application/json', 'content-encoding': 'gzip' } }, '', 415],
    ['declared size', { headers: { origin, 'content-type': 'application/json', 'content-length': '2049' } }, '', 413],
    ['actual UTF8 bytes', { body: JSON.stringify({ pubIds: ['é'.repeat(1024)] }) }, '', 413],
  ] as const)('rejects %s', async (_, init, suffix, status) => {
    const { handler, fetcher } = setup()
    expect((await handler(request(undefined, init, suffix))).status).toBe(status)
    expect(fetcher).not.toHaveBeenCalled()
  })
  it.each([{ enabled: false }, { environment: 'preview' }, { apiKey: '' }, { pubs: [] },
    { pubs: testPubs.map(pub => ({ ...pub, entranceVerified: false })) }])('fails closed for %j', async overrides => {
    const { handler, fetcher } = setup(overrides)
    expect((await handler(request())).status).toBe(503)
    expect(fetcher).not.toHaveBeenCalled()
  })
  it('cannot activate the shipped entry point via environment variables', async () => {
    vi.stubEnv('ROUTING_ENABLED', 'true'); vi.stubEnv('ORS_API_KEY', key)
    expect((await entry.fetch(request())).status).toBe(503)
  })
  it.each([[429, {}, 503], [401, {}, 503], [403, { error: { message: key } }, 503],
    [400, { error: { code: 2009 } }, 422], [404, { error: { code: 2010 } }, 422],
    [500, { error: { message: key } }, 502], [302, {}, 502], [200, {}, 502]] as const)('sanitises upstream %i', async (status, body, expected) => {
    const { handler, fetcher } = setup()
    fetcher.mockResolvedValue(Response.json(body, { status }))
    const result = await handler(request())
    expect(result.status).toBe(expected)
    expect(await result.text()).not.toContain(key)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it.each([401, 429, 502])('cancels a rejected streaming non-JSON %i body', async status => {
    let cancelled = false
    const { handler, fetcher } = setup()
    fetcher.mockResolvedValue(new Response(new ReadableStream({ cancel() { cancelled = true } }), { status, headers: { 'content-type': 'text/html' } }))
    await handler(request())
    expect(cancelled).toBe(true)
    expect(fetcher.mock.calls[0]![1]?.signal?.aborted).toBe(true)
  })
  it('bounds oversized upstream bodies and rejects network errors without retry', async () => {
    const { handler, fetcher } = setup()
    fetcher.mockResolvedValue(new Response(' '.repeat(2 * 1024 * 1024 + 1), { headers: { 'content-type': 'application/json' } }))
    expect((await handler(request())).status).toBe(502)
    fetcher.mockRejectedValue(new Error(key))
    const response = await handler(request())
    expect(response.status).toBe(502)
    expect(await response.text()).not.toContain(key)
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
  it('bounds body reading and upstream deadlines, including an uncooperative fetch', async () => {
    vi.useFakeTimers()
    const { handler, fetcher } = setup()
    const slow = new Request(`${origin}/api/walking-route`, { method: 'POST', headers: { origin, 'content-type': 'application/json' },
      body: new ReadableStream(), duplex: 'half' } as RequestInit)
    const first = handler(slow)
    await vi.advanceTimersByTimeAsync(2001)
    expect((await first).status).toBe(408)
    expect(fetcher).not.toHaveBeenCalled()
    fetcher.mockImplementation(() => new Promise(() => {}))
    const second = handler(request())
    await vi.advanceTimersByTimeAsync(10_001)
    expect((await second).status).toBe(504)
    expect(fetcher.mock.calls[0]![1]?.signal?.aborted).toBe(true)
  })
  it('cancels slow upstream response bodies and browser cancellation', async () => {
    vi.useFakeTimers()
    const { handler, fetcher } = setup()
    let cancelled = false
    fetcher.mockResolvedValue(new Response(new ReadableStream({ cancel() { cancelled = true } }), { headers: { 'content-type': 'application/json' } }))
    const pending = handler(request())
    await vi.advanceTimersByTimeAsync(10_001)
    expect((await pending).status).toBe(504)
    expect(cancelled).toBe(true)
    const controller = new AbortController(); controller.abort()
    expect((await handler(request(undefined, { signal: controller.signal }))).status).toBe(408)
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
})

// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { createMapBudget, createMapTransport, MAP_LOGO, MAP_STYLE } from './map-transport'

const key = 'PUBLIC_TEST_SENTINEL'
const signal = () => new AbortController().signal
describe('bounded map proof transport', () => {
  it('shares a pre-dispatch allowance across transports and counts logo, failures and concurrent starts', async () => {
    const budget = createMapBudget(2)
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response('map bytes'))
    const first = createMapTransport(key, fetcher, budget), second = createMapTransport(key, fetcher, budget)
    await Promise.all([first.load(MAP_LOGO, signal()), second.load(MAP_STYLE, signal())])
    await expect(second.load(MAP_STYLE, signal())).rejects.toThrow('Map unavailable')
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(first.attempts()).toBe(2)
  })
  it('sets only the configured public key and never follows redirects or sends cookies', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}'))
    const map = createMapTransport(key, fetcher, createMapBudget())
    await map.load(`${MAP_STYLE}?key=UNTRUSTED`, signal())
    expect(fetcher).toHaveBeenCalledWith(`${MAP_STYLE}?key=${key}`, expect.objectContaining({ redirect: 'error', credentials: 'omit', cache: 'no-store' }))
    expect(map.transformRequest(MAP_STYLE)).toEqual({ url: `baubled-map://api.maptiler.com/maps/streets-v2/style.json?key=${key}` })
  })
  it.each(['https://evil.test/tiles/a', 'http://api.maptiler.com/tiles/a', 'https://api.maptiler.com.evil.test/maps/a',
    'https://user:pass@api.maptiler.com/tiles/a', 'https://api.maptiler.com/geocoding/a', 'data:image/png;base64,a'])('rejects unapproved resource %s without dispatch', async url => {
    const fetcher = vi.fn<typeof fetch>()
    const map = createMapTransport(key, fetcher, createMapBudget())
    await expect(map.load(url, signal())).rejects.toThrow('Map unavailable')
    expect(fetcher).not.toHaveBeenCalled()
  })
  it('latches provider errors closed, including retries requested by the library', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('secret detail', { status: 429 }))
    const map = createMapTransport(key, fetcher, createMapBudget())
    await expect(map.load(MAP_STYLE, signal())).rejects.toThrow('Map unavailable')
    await expect(map.load(MAP_STYLE, signal())).rejects.toThrow('Map unavailable')
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('cancels outstanding loads on disposal and refuses later dispatch', async () => {
    let outbound: AbortSignal | null = null
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async (_, init) => {
      outbound = init!.signal!
      return new Response('data')
    })
    const map = createMapTransport(key, fetcher, createMapBudget())
    await map.load(MAP_STYLE, signal()); map.stop()
    expect((outbound as AbortSignal | null)?.aborted).toBe(true)
    await expect(map.load(MAP_STYLE, signal())).rejects.toThrow()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('returns decoded style JSON and binary tiles/images through the same guard', async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => Response.json({ version: 8, sources: { streets: { type: 'vector' } } }))
    const map = createMapTransport(key, fetcher, createMapBudget())
    expect((await map.protocol({ url: MAP_STYLE, type: 'json' }, new AbortController())).data).toMatchObject({ version: 8 })
    expect((await map.protocol({ url: MAP_LOGO, type: 'image' }, new AbortController())).data).toBeInstanceOf(ArrayBuffer)
  })
  it.each([{ sources: { raster: { type: 'raster' } } }, { sources: {}, terrain: {} }, { sources: null }])('rejects an unexpected style without requesting its dependencies', async style => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(Response.json(style))
    const map = createMapTransport(key, fetcher, createMapBudget())
    await expect(map.protocol({ url: MAP_STYLE, type: 'json' }, new AbortController())).rejects.toThrow()
    await expect(map.load(MAP_LOGO, signal())).rejects.toThrow()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('rejects oversize responses and sanitises thrown network details', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(new Uint8Array(8 * 1024 * 1024 + 1)))
    await expect(createMapTransport(key, fetcher, createMapBudget()).load(MAP_STYLE, signal())).rejects.toThrow('Map unavailable')
    fetcher.mockRejectedValue(new Error(`private URL ${key}`))
    const error = await createMapTransport(key, fetcher, createMapBudget()).load(MAP_STYLE, signal()).catch(error => error)
    expect(String(error)).not.toContain(key)
  })
})

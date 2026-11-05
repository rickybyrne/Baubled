import { act, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { testPubs, orsFixture } from './test/fixtures'
import { normaliseOrs } from '../shared/route'
import DublinMap from './DublinMap'

const fake = vi.hoisted(() => ({ maps: [] as Array<{ options: Record<string, unknown>; events: Record<string, () => void>; removed: boolean; sources: Set<string>; layers: Set<string>; addSource: ReturnType<typeof vi.fn> }> }))
vi.mock('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url', () => ({ default: '/test-worker.js' }))
vi.mock('maplibre-gl', () => ({
  setWorkerUrl: vi.fn(), NavigationControl: class {}, AttributionControl: class {},
  Popup: class { setText() { return this } },
  Marker: class { setLngLat() { return this } setPopup() { return this } addTo() { return this } remove() {} },
  Map: class {
    options: Record<string, unknown>; events: Record<string, () => void> = {}; removed = false
    sources = new Set<string>(); layers = new Set<string>()
    addSource = vi.fn((name: string) => { this.sources.add(name) })
    constructor(options: Record<string, unknown>) { this.options = options; fake.maps.push(this) }
    addControl() {} fitBounds() {} on(name: string, handler: () => void) { this.events[name] = handler }
    remove() { this.removed = true }
    getSource(name: string) { return this.sources.has(name) } removeSource(name: string) { this.sources.delete(name) }
    getLayer(name: string) { return this.layers.has(name) } removeLayer(name: string) { this.layers.delete(name) }
    addLayer(layer: { id: string }) { this.layers.add(layer.id) }
  },
}))
describe('map boundary', () => {
  it('uses an offline style even if a browser key is present, shows fallback and cleans up', async () => {
    vi.stubEnv('VITE_MAPTILER_KEY', 'PUBLIC_TEST_SENTINEL')
    const { unmount } = render(<DublinMap pubs={testPubs} ids={[]} route={null} />)
    await waitFor(() => expect(fake.maps.length).toBeGreaterThan(0))
    const map = fake.maps.at(-1)!
    expect(map.options.style).toMatchObject({ version: 8, sources: {} })
    await act(async () => map.events.error!())
    expect(screen.getByRole('status')).toHaveTextContent('Map unavailable')
    expect(map.removed).toBe(true)
    unmount(); vi.unstubAllEnvs()
  })
  it('only displays geometry for the exact current order and removes it on selection change', async () => {
    const pubs = testPubs.slice(0, 2), ids = pubs.map(pub => pub.id), route = normaliseOrs(orsFixture(pubs), pubs, 'test')
    const { rerender, unmount } = render(<DublinMap pubs={pubs} ids={ids} route={route} />)
    await waitFor(() => expect(fake.maps.at(-1)?.options).toBeDefined())
    await act(async () => {})
    const map = fake.maps.at(-1)!
    await act(async () => map.events.load!())
    expect(map.addSource).toHaveBeenCalledWith('walking-route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: route.geometry } })
    rerender(<DublinMap pubs={pubs} ids={[...ids].reverse()} route={route} />)
    expect(map.sources.has('walking-route')).toBe(false)
    unmount(); expect(map.removed).toBe(true)
  })
})

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import type { AddProtocolAction } from 'maplibre-gl'
import DublinMap from './DublinMap'
import { testPubs } from './test/fixtures'

// This mock exercises the dormant live wiring; the application gate remains false.
vi.mock('./live-map-config', () => ({ liveMapKey: () => 'PUBLIC_TEST_SENTINEL' }))
vi.mock('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url', () => ({ default: '/test-worker.js' }))
const fake = vi.hoisted(() => ({ protocol: undefined as AddProtocolAction | undefined, removeProtocol: vi.fn(),
  map: undefined as { events: Record<string, () => void>; remove: ReturnType<typeof vi.fn>; options: Record<string, unknown> } | undefined }))
vi.mock('maplibre-gl', () => ({
  setWorkerUrl: vi.fn(), addProtocol: (_: string, action: AddProtocolAction) => { fake.protocol = action }, removeProtocol: fake.removeProtocol,
  NavigationControl: class {}, AttributionControl: class {}, Popup: class { setText() { return this } },
  Marker: class { setLngLat() { return this } setPopup() { return this } addTo() { return this } remove() {} },
  Map: class {
    events: Record<string, () => void> = {}; remove = vi.fn(); options: Record<string, unknown>
    constructor(options: Record<string, unknown>) { this.options = options; fake.map = this }
    on(name: string, action: () => void) { this.events[name] = action }
    addControl() {} fitBounds() {} getSource() { return false } getLayer() { return false }
  },
}))
afterEach(() => { cleanup(); vi.unstubAllGlobals(); fake.map = undefined; fake.protocol = undefined })

it('loads the logo and all map resources through the guarded protocol, then cleans up', async () => {
  const revoke = vi.fn()
  vi.stubGlobal('URL', class extends URL { static createObjectURL() { return 'blob:test-logo' }; static revokeObjectURL = revoke })
  const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response('<svg xmlns="http://www.w3.org/2000/svg"/>'))
  vi.stubGlobal('fetch', fetcher)
  const { unmount } = render(<DublinMap pubs={testPubs} ids={[]} route={null} />)
  await waitFor(() => expect(fake.map).toBeDefined())
  expect(fetcher).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('link', { name: 'Maps by MapTiler' })).toHaveAttribute('href', 'https://www.maptiler.com/')
  expect(screen.getByRole('img', { name: 'MapTiler' })).toHaveAttribute('src', 'blob:test-logo')
  const transform = fake.map!.options.transformRequest as (url: string) => { url: string }
  const tile = transform('https://api.maptiler.com/tiles/test/1/2/3.pbf')
  await fake.protocol!({ url: tile.url, type: 'arrayBuffer' }, new AbortController())
  expect(fetcher).toHaveBeenCalledTimes(2)
  await act(async () => fake.map!.events.load!())
  expect(screen.getByRole('status')).toHaveTextContent('Dublin street map')
  unmount()
  expect(fake.map!.remove).toHaveBeenCalledTimes(1)
  expect(fake.removeProtocol).toHaveBeenCalledWith('baubled-map')
  expect(revoke).toHaveBeenCalledWith('blob:test-logo')
})

it('does not leave a usable live map if its required logo cannot be displayed', async () => {
  vi.stubGlobal('URL', class extends URL { static createObjectURL() { return 'blob:test-logo' }; static revokeObjectURL() {} })
  const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response('image data'))
  vi.stubGlobal('fetch', fetcher)
  render(<DublinMap pubs={testPubs} ids={[]} route={null} />)
  const logo = await screen.findByRole('img', { name: 'MapTiler' })
  fireEvent.error(logo)
  expect(screen.getByRole('status')).toHaveTextContent('Map unavailable')
  expect(fake.map!.remove).toHaveBeenCalledTimes(1)
  await expect(fake.protocol!({ url: 'baubled-map://api.maptiler.com/tiles/a', type: 'arrayBuffer' }, new AbortController())).rejects.toThrow()
  expect(fetcher).toHaveBeenCalledTimes(1)
})

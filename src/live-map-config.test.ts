import { afterEach, expect, it, vi } from 'vitest'
import { liveMapKey } from './live-map-config'
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })
it.each([
  [true, 'live-proof', 'http://127.0.0.1:5174', true],
  [false, 'live-proof', 'http://127.0.0.1:5174', false],
  [true, 'development', 'http://127.0.0.1:5174', false],
  [true, 'live-proof', 'http://localhost:5174', false],
  [true, 'live-proof', 'https://baubled.vercel.app', false],
  [false, 'production', 'https://baubled.vercel.app', false],
])('requires approved dev mode and the exact loopback origin: %s %s %s', (dev, mode, origin, allowed) => {
  vi.stubEnv('DEV', dev); vi.stubEnv('MODE', mode); vi.stubEnv('VITE_MAPTILER_KEY', 'PUBLIC_TEST_ONLY')
  vi.stubGlobal('window', { location: { origin } })
  expect(liveMapKey()).toBe(allowed ? 'PUBLIC_TEST_ONLY' : undefined)
})

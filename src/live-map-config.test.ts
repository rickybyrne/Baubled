import { afterEach, expect, it, vi } from 'vitest'
import { liveMapKey } from './live-map-config'
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs() })
it.each([
  [true, 'live-proof', 'http://127.0.0.1:5174', true],
  [false, 'live-proof', 'http://127.0.0.1:5174', false],
  [true, 'development', 'http://127.0.0.1:5174', false],
  [true, 'live-proof', 'http://localhost:5174', false],
  [true, 'live-proof', 'https://baubled.vercel.app', false],
  [false, 'production', 'https://baubled.vercel.app', true],
  [true, 'production', 'https://baubled.vercel.app', false],
  [false, 'preview', 'https://baubled.vercel.app', false],
  [false, 'production', 'https://baubled-git-feature.vercel.app', false],
  [false, 'production', 'https://baubled.vercel.app.evil.test', false],
  [false, 'production', 'http://127.0.0.1:4173', false],
])('requires the permitted mode and exact origin: %s %s %s', (dev, mode, origin, allowed) => {
  vi.stubEnv('DEV', dev); vi.stubEnv('MODE', mode); vi.stubEnv('VITE_MAPTILER_KEY', 'PUBLIC_TEST_ONLY')
  vi.stubGlobal('window', { location: { origin } })
  expect(liveMapKey()).toBe(allowed ? 'PUBLIC_TEST_ONLY' : undefined)
})

it.each([undefined, '', '   '])('keeps public maps offline without a usable key: %s', key => {
  vi.stubEnv('DEV', false); vi.stubEnv('MODE', 'production'); vi.stubEnv('VITE_MAPTILER_KEY', key)
  vi.stubGlobal('window', { location: { origin: 'https://baubled.vercel.app' } })
  expect(liveMapKey()).toBeUndefined()
})

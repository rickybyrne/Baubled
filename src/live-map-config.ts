// Owner approval is required before changing this gate or its permitted origins.
export const LIVE_MAP_APPROVED = false
export function liveMapKey(): string | undefined {
  const key: string | undefined = import.meta.env.VITE_MAPTILER_KEY
  const localProof = import.meta.env.DEV && import.meta.env.MODE === 'live-proof' && window.location.origin === 'http://127.0.0.1:5174'
  const production = LIVE_MAP_APPROVED && window.location.origin === 'https://baubled.vercel.app'
  return (localProof || production) && key?.trim() ? key : undefined
}

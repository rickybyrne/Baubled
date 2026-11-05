// Owner approval is required before changing this gate or its permitted origins.
export const LIVE_MAP_APPROVED = false
export function liveMapKey(): string | undefined {
  const key: string | undefined = import.meta.env.VITE_MAPTILER_KEY
  return LIVE_MAP_APPROVED && window.location.origin === 'https://baubled.vercel.app' && key?.trim() ? key : undefined
}

// Owner-approved local release candidate; publication is a separate approval.
export const LIVE_MAP_APPROVED = true
export function isPublicProof(): boolean {
  return LIVE_MAP_APPROVED && !import.meta.env.DEV && import.meta.env.MODE === 'production' &&
    window.location.origin === 'https://baubled.vercel.app'
}
export function liveMapKey(): string | undefined {
  const key: string | undefined = import.meta.env.VITE_MAPTILER_KEY
  const localProof = import.meta.env.DEV && import.meta.env.MODE === 'live-proof' && window.location.origin === 'http://127.0.0.1:5174'
  return (localProof || isPublicProof()) && key?.trim() ? key : undefined
}

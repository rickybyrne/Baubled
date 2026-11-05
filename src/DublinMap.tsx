import { useEffect, useRef, useState } from 'react'
import type { Map as LibreMap, Marker } from 'maplibre-gl'
import type { Pub } from '../shared/catalogue'
import type { WalkingRoute } from '../shared/route'
import 'maplibre-gl/dist/maplibre-gl.css'

// No live map traffic until the owner approves the one-key origin workflow and test budget.
const LIVE_MAP_APPROVED = false
const offlineStyle = { version: 8 as const, sources: {}, layers: [
  { id: 'background', type: 'background' as const, paint: { 'background-color': '#e5e6da' } },
] }
export default function DublinMap({ pubs, ids, route }: { pubs: readonly Pub[]; ids: readonly string[]; route: WalkingRoute | null }) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<LibreMap | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  useEffect(() => {
    let disposed = false
    const markers: Marker[] = []
    let instance: LibreMap | undefined
    void Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')]).then(([libre, worker]) => {
      if (disposed || !container.current) return
      libre.setWorkerUrl(worker.default)
      const key: string | undefined = import.meta.env.VITE_MAPTILER_KEY
      instance = new libre.Map({ container: container.current, center: [-6.265, 53.349], zoom: 13,
        style: LIVE_MAP_APPROVED && key ? `https://api.maptiler.com/maps/streets-v2/style.json?key=${encodeURIComponent(key)}` : offlineStyle,
        attributionControl: false, cooperativeGestures: true, refreshExpiredTiles: false })
      map.current = instance
      instance.addControl(new libre.NavigationControl({ showCompass: false }), 'top-right')
      instance.addControl(new libre.AttributionControl({ compact: false }), 'bottom-right')
      instance.on('load', () => {
        if (disposed) return
        const positions = pubs.flatMap(pub => pub.status === 'active' && pub.position ? [pub.position] : [])
        if (positions.length) instance?.fitBounds([
          [Math.min(...positions.map(p => p[0])), Math.min(...positions.map(p => p[1]))],
          [Math.max(...positions.map(p => p[0])), Math.max(...positions.map(p => p[1]))],
        ], { padding: 36, maxZoom: 14, duration: 0 })
        setStatus('ready')
      })
      instance.on('error', () => {
        if (!disposed) { setStatus('failed'); instance?.remove(); map.current = null; instance = undefined }
      })
      for (const pub of pubs) {
        if (pub.status !== 'active' || !pub.position) continue
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'pub-marker'
        button.setAttribute('aria-label', `Map location: ${pub.name}`)
        button.textContent = '●'
        const popup = new libre.Popup({ offset: 25 }).setText(`${pub.name} — published building location; pedestrian entrance unverified.`)
        markers.push(new libre.Marker({ element: button }).setLngLat(pub.position).setPopup(popup).addTo(instance))
      }
    }).catch(() => { if (!disposed) setStatus('failed') })
    return () => { disposed = true; markers.forEach(marker => marker.remove()); instance?.remove(); map.current = null }
  }, [pubs])
  useEffect(() => {
    const instance = map.current
    if (status !== 'ready' || !instance) return
    const activeRoute = route && JSON.stringify(route.pubIds) === JSON.stringify(ids) ? route : null
    if (instance.getLayer('walking-line')) instance.removeLayer('walking-line')
    if (instance.getSource('walking-route')) instance.removeSource('walking-route')
    if (activeRoute) {
      instance.addSource('walking-route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: activeRoute.geometry } })
      instance.addLayer({ id: 'walking-line', type: 'line', source: 'walking-route', paint: { 'line-color': '#8d2e35', 'line-width': 5 } })
    }
  }, [route, ids, status])
  return <section aria-label="Dublin map" className="map-panel">
    <div ref={container} className="map-canvas" aria-label="Interactive Dublin coordinate map" hidden={status === 'failed'} />
    <p role="status" className="map-note">{status === 'failed' ? 'Map unavailable. Use the pub list below; your plan is unchanged.' :
      status === 'loading' ? 'Loading the map canvas…' : 'Offline map canvas centred on Dublin. Live street tiles are disabled; markers are sourced building locations, not verified entrances.'}</p>
    <p className="map-credits"><a href="https://maplibre.org/">MapLibre</a> · Live maps, when approved: <a href="https://www.maptiler.com/copyright/">MapTiler</a> · <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></p>
  </section>
}

import { useEffect, useRef, useState } from 'react'
import type { Map as LibreMap, Marker } from 'maplibre-gl'
import type { Pub } from '../shared/catalogue'
import type { WalkingRoute } from '../shared/route'
import { liveMapKey } from './live-map-config'
import { createMapTransport, MAP_LOGO, MAP_PROTOCOL, MAP_STYLE } from './map-transport'
import 'maplibre-gl/dist/maplibre-gl.css'

const offlineStyle = { version: 8 as const, sources: {}, layers: [
  { id: 'background', type: 'background' as const, paint: { 'background-color': '#e5e6da' } },
] }
export default function DublinMap({ pubs, ids, route }: { pubs: readonly Pub[]; ids: readonly string[]; route: WalkingRoute | null }) {
  const container = useRef<HTMLDivElement>(null)
  const map = useRef<LibreMap | null>(null)
  const failMap = useRef<() => void>(() => {})
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [logo, setLogo] = useState<string | null>(null)
  const key = liveMapKey()
  useEffect(() => {
    let disposed = false
    const markers: Marker[] = []
    let instance: LibreMap | undefined
    let transport: ReturnType<typeof createMapTransport> | undefined
    let removeProtocol: (() => void) | undefined
    let logoUrl: string | undefined
    const dispose = () => {
      transport?.stop(); instance?.remove(); instance = undefined; map.current = null
      removeProtocol?.(); removeProtocol = undefined
      if (logoUrl) { URL.revokeObjectURL(logoUrl); logoUrl = undefined }
    }
    const fail = () => { if (!disposed) { setStatus('failed'); setLogo(null); dispose() } }
    failMap.current = fail
    void Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url')]).then(async ([libre, worker]) => {
      if (disposed || !container.current) return
      libre.setWorkerUrl(worker.default)
      if (key) {
        transport = createMapTransport(key)
        const bytes = await transport.load(MAP_LOGO, new AbortController().signal)
        if (disposed || !container.current) return
        logoUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/svg+xml' }))
        setLogo(logoUrl)
        libre.addProtocol(MAP_PROTOCOL, transport.protocol)
        removeProtocol = () => libre.removeProtocol(MAP_PROTOCOL)
      }
      instance = new libre.Map({ container: container.current, center: [-6.265, 53.349], zoom: 13,
        style: key ? MAP_STYLE : offlineStyle, transformRequest: transport?.transformRequest,
        maxBounds: [[-6.30, 53.33], [-6.23, 53.37]], maxZoom: 17,
        attributionControl: false, cooperativeGestures: true, refreshExpiredTiles: false })
      map.current = instance
      instance.addControl(new libre.NavigationControl({ showCompass: false }), 'top-right')
      instance.addControl(new libre.AttributionControl({ compact: false }), 'bottom-right')
      instance.on('load', () => {
        if (disposed || !instance) return
        const positions = pubs.flatMap(pub => pub.status === 'active' && pub.position ? [pub.position] : [])
        if (positions.length) instance?.fitBounds([
          [Math.min(...positions.map(p => p[0])), Math.min(...positions.map(p => p[1]))],
          [Math.max(...positions.map(p => p[0])), Math.max(...positions.map(p => p[1]))],
        ], { padding: 36, maxZoom: 14, duration: 0 })
        setStatus('ready')
      })
      instance.on('error', fail)
      for (const pub of pubs) {
        if (pub.status !== 'active' || !pub.position) continue
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'pub-marker'
        button.setAttribute('aria-label', `Map location: ${pub.name}`)
        button.textContent = '●'
        const popup = new libre.Popup({ offset: 25 }).setText(`${pub.name} — published building location; pedestrian entrance unverified.${pub.locationNote ? ` ${pub.locationNote}` : ''}`)
        markers.push(new libre.Marker({ element: button }).setLngLat(pub.position).setPopup(popup).addTo(instance))
      }
    }).catch(() => {
      if (!disposed) {
        markers.forEach(marker => marker.remove())
        fail()
      }
    })
    return () => { disposed = true; failMap.current = () => {}; markers.forEach(marker => marker.remove()); dispose() }
  }, [pubs, key])
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
    {logo && status !== 'failed' && <a className="maptiler-logo" href="https://www.maptiler.com/" aria-label="Maps by MapTiler"><img src={logo} alt="MapTiler" width="100" height="30" onError={() => failMap.current()} /></a>}
    <p role="status" className="map-note">{status === 'failed' ? 'Map unavailable. Use the pub list below; your plan is unchanged.' :
      status === 'loading' ? 'Loading the map canvas…' : key ? 'Dublin street map. Check the pub list for location verification details.' : 'Offline map canvas centred on Dublin. Live street tiles are disabled; markers are sourced building locations, not verified entrances.'}</p>
    <p className="map-credits"><a href="https://maplibre.org/">MapLibre</a> · {key ? '' : 'Live maps, when approved: '}<a href="https://www.maptiler.com/copyright/">© MapTiler</a> · <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></p>
  </section>
}

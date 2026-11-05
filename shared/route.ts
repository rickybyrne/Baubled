import { validPosition, type Position, type Pub } from './catalogue.ts'

export const ROUTE_ATTRIBUTION = 'Directions: openrouteservice / HeiGIT; © OpenStreetMap contributors, CC BY-SA 4.0. Reformatted by Baubled.'
export interface Step {
  instruction: string
  type: number
  distanceMetres: number
  durationSeconds: number
  wayPoints: [number, number]
}
export interface Leg {
  fromId: string
  toId: string
  distanceMetres: number
  durationSeconds: number
  wayPoints: [number, number]
  steps: Step[]
}
export interface WalkingRoute {
  pubIds: string[]
  catalogueRevision: string
  geometry: { type: 'LineString'; coordinates: Position[] }
  legs: Leg[]
  totals: { distanceMetres: number; durationSeconds: number }
  attribution: string
}
export function object(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid object')
  return value as Record<string, unknown>
}
function metric(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new Error('Invalid metric')
  return value
}
function index(value: unknown, maximum: number): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > maximum) throw new Error('Invalid waypoint')
  return value
}
function pair(value: unknown, start: number, end: number): [number, number] {
  if (!Array.isArray(value) || value.length !== 2) throw new Error('Invalid index pair')
  const a = index(value[0], end), b = index(value[1], end)
  if (a < start || b < a) throw new Error('Invalid index order')
  return [a, b]
}
function geometry(value: unknown): WalkingRoute['geometry'] {
  const g = object(value)
  if (g.type !== 'LineString' || !Array.isArray(g.coordinates) || g.coordinates.length < 2 ||
      g.coordinates.length > 50_000 || !g.coordinates.every(validPosition)) throw new Error('Invalid geometry')
  return { type: 'LineString', coordinates: g.coordinates }
}
function snapDistance(a: Position, b: Position): number {
  const rad = Math.PI / 180
  const h = Math.sin((b[1] - a[1]) * rad / 2) ** 2 +
    Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin((b[0] - a[0]) * rad / 2) ** 2
  return 6_371_000 * 2 * Math.asin(Math.sqrt(Math.min(1, h)))
}

// Shared validation for the normalised endpoint result; returns only the allowed fields.
export function validateRoute(value: unknown, ids: readonly string[], revision: string): WalkingRoute {
  const r = object(value), g = geometry(r.geometry)
  if (!Array.isArray(r.pubIds) || JSON.stringify(r.pubIds) !== JSON.stringify(ids) ||
      ids.length < 2 || ids.length > 12 || new Set(ids).size !== ids.length ||
      r.catalogueRevision !== revision || r.attribution !== ROUTE_ATTRIBUTION ||
      !Array.isArray(r.legs) || r.legs.length !== ids.length - 1) throw new Error('Route mismatch')
  let previousEnd = 0, count = 0
  const legs: Leg[] = r.legs.map((value, i) => {
    const leg = object(value), wayPoints = pair(leg.wayPoints, previousEnd, g.coordinates.length - 1)
    if (wayPoints[0] !== previousEnd || wayPoints[0] === wayPoints[1] || leg.fromId !== ids[i] || leg.toId !== ids[i + 1] ||
        !Array.isArray(leg.steps)) throw new Error('Invalid leg')
    previousEnd = wayPoints[1]
    const distanceMetres = metric(leg.distanceMetres), durationSeconds = metric(leg.durationSeconds)
    count += leg.steps.length
    if (count > 2000 || ((distanceMetres > 0 || durationSeconds > 0) && leg.steps.length === 0)) throw new Error('Missing instructions')
    let previousStep = wayPoints[0]
    const steps: Step[] = leg.steps.map(value => {
      const step = object(value), stepPoints = pair(step.wayPoints, wayPoints[0], wayPoints[1])
      if (typeof step.instruction !== 'string' || !step.instruction.trim() || step.instruction.length > 1024 ||
          typeof step.type !== 'number' || !Number.isSafeInteger(step.type) || step.type < 0 ||
          stepPoints[0] < previousStep) throw new Error('Invalid instruction')
      previousStep = stepPoints[0]
      return { instruction: step.instruction, type: step.type, wayPoints: stepPoints,
        distanceMetres: metric(step.distanceMetres), durationSeconds: metric(step.durationSeconds) }
    })
    return { fromId: ids[i]!, toId: ids[i + 1]!, distanceMetres, durationSeconds, wayPoints, steps }
  })
  if (previousEnd !== g.coordinates.length - 1) throw new Error('Incomplete geometry')
  const totals = { distanceMetres: legs.reduce((sum, leg) => sum + leg.distanceMetres, 0),
    durationSeconds: legs.reduce((sum, leg) => sum + leg.durationSeconds, 0) }
  const reported = object(r.totals)
  if (!Number.isFinite(totals.distanceMetres) || !Number.isFinite(totals.durationSeconds) ||
      Math.abs(metric(reported.distanceMetres) - totals.distanceMetres) > 1 ||
      Math.abs(metric(reported.durationSeconds) - totals.durationSeconds) > 1) throw new Error('Inconsistent totals')
  return { pubIds: [...ids], catalogueRevision: revision, geometry: g, legs, totals, attribution: ROUTE_ATTRIBUTION }
}

export function normaliseOrs(value: unknown, pubs: readonly Pub[], revision: string): WalkingRoute {
  const collection = object(value)
  if (collection.type !== 'FeatureCollection' || !Array.isArray(collection.features) || collection.features.length !== 1) throw new Error('Invalid collection')
  const feature = object(collection.features[0]), properties = object(feature.properties), g = geometry(feature.geometry)
  if (feature.type !== 'Feature' || !Array.isArray(properties.segments) || properties.segments.length !== pubs.length - 1 ||
      !Array.isArray(properties.way_points) || properties.way_points.length !== pubs.length) throw new Error('Invalid segments')
  const points = properties.way_points.map(value => index(value, g.coordinates.length - 1))
  pubs.forEach((pub, i) => {
    if (!pub.position || snapDistance(pub.position, g.coordinates[points[i]!]!) > 50) throw new Error('Unsafe waypoint snap')
  })
  const summary = object(properties.summary)
  const legs = properties.segments.map((value, i) => {
    const segment = object(value)
    if (!Array.isArray(segment.steps)) throw new Error('Missing steps')
    return { fromId: pubs[i]!.id, toId: pubs[i + 1]!.id, distanceMetres: segment.distance,
      durationSeconds: segment.duration, wayPoints: [points[i], points[i + 1]], steps: segment.steps.map(value => {
        const step = object(value)
        return { instruction: step.instruction, type: step.type, distanceMetres: step.distance,
          durationSeconds: step.duration, wayPoints: step.way_points }
      }) }
  })
  return validateRoute({ pubIds: pubs.map(pub => pub.id), catalogueRevision: revision, geometry: g, legs,
    totals: { distanceMetres: summary.distance, durationSeconds: summary.duration }, attribution: ROUTE_ATTRIBUTION }, pubs.map(pub => pub.id), revision)
}

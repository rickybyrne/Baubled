import { describe, expect, it } from 'vitest'
import { testPubs, orsFixture } from '../src/test/fixtures'
import { normaliseOrs, validateRoute } from './route'
import { restorePlan, planSearch } from './route-url'
import { PUBS, routingCatalogueReady } from './catalogue'

describe('walking response boundary', () => {
  it.each([2, 12])('preserves %i stops, consecutive legs and unrounded totals', n => {
    const pubs = testPubs.slice(0, n).reverse()
    const result = normaliseOrs(orsFixture(pubs), pubs, 'test')
    expect(result.pubIds).toEqual(pubs.map(pub => pub.id))
    expect(result.legs).toHaveLength(n - 1)
    expect(result.legs.at(-1)?.toId).toBe(pubs.at(-1)?.id)
    expect(result.totals.distanceMetres).toBeCloseTo((n - 1) * 10.4)
    expect(validateRoute(result, result.pubIds, 'test')).toEqual(result)
  })
  it.each([
    ['wrong geometry', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.geometry.type = 'Polygon' }],
    ['non-finite coordinate', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.geometry.coordinates[0]![0] = Infinity }],
    ['out-of-range coordinate', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.geometry.coordinates[0]![1] = 91 }],
    ['extra coordinate dimension', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.geometry.coordinates[0]!.push(0) }],
    ['missing segment', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments.pop() }],
    ['negative metric', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.duration = -1 }],
    ['non-finite metric', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.distance = NaN }],
    ['wrong summary', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.summary.distance += 2 }],
    ['missing steps', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.steps = [] }],
    ['reversed step indices', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.steps[0]!.way_points = [1, 0] }],
    ['step outside leg', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.steps[0]!.way_points = [0, 3] }],
    ['oversized instruction', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.segments[0]!.steps[0]!.instruction = 'x'.repeat(1025) }],
    ['coincident snap', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.way_points[1] = 0 }],
    ['missing waypoint', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.properties.way_points.pop() }],
    ['distant snap', (f: ReturnType<typeof orsFixture>) => { f.features[0]!.geometry.coordinates[0]![0] = 10 }],
  ])('rejects %s', (_, mutate) => {
    const fixture = orsFixture(); mutate(fixture)
    expect(() => normaliseOrs(fixture, testPubs, 'test')).toThrow()
  })
  it('rejects a coincident zero-length leg, too many features, and wrong order/revision', () => {
    const fixture = orsFixture()
    fixture.features[0]!.properties.way_points[1] = 0
    fixture.features[0]!.properties.segments[0]!.distance = 0
    fixture.features[0]!.properties.segments[0]!.duration = 0
    expect(() => normaliseOrs(fixture, testPubs, 'test')).toThrow()
    const other = orsFixture(); other.features.push(other.features[0]!)
    expect(() => normaliseOrs(other, testPubs, 'test')).toThrow()
    const result = normaliseOrs(orsFixture(), testPubs, 'test')
    expect(() => validateRoute(result, [...result.pubIds].reverse(), 'test')).toThrow()
    expect(() => validateRoute(result, result.pubIds, 'stale')).toThrow()
  })
  it('keeps actual entrance-unverified data out of live routing', () => {
    expect(routingCatalogueReady(testPubs)).toBe(true)
    expect(routingCatalogueReady(PUBS)).toBe(false)
    expect(routingCatalogueReady([...testPubs, testPubs[0]!])).toBe(false)
  })
})

describe('version 1 plan URLs', () => {
  it.each(Array.from({ length: 12 }, (_, i) => i + 1))('round-trips %i ordered unique stops', n => {
    const ids = testPubs.slice(0, n).reverse().map(pub => pub.id)
    expect(restorePlan(planSearch(ids, testPubs), testPubs)).toEqual({ ids, error: null })
  })
  it('allows an empty editing state without a route query', () => {
    expect(planSearch([], testPubs)).toBe('')
    expect(restorePlan('', testPubs)).toEqual({ ids: [], error: null })
  })
  it.each(['?v=2&pubs=p001', '?v=1&pubs=p001,p001', '?v=1&pubs=p999', '?v=1&pubs=', '?v=1&pubs=P001',
    '?v=1&pubs=p001,%20p002', '?v=1&pubs=p001&pubs=p002', '?v=1&v=1&pubs=p001', '?pubs=p001',
    '?v=1&pubs=p001&url=evil', '?v=1&pubs=%xx', `?v=1&pubs=${'p001,'.repeat(100)}`,
    `?v=1&pubs=${testPubs.map(pub => pub.id).join(',')},p013`])('rejects invalid input without partial restoration: %s', search => {
    expect(restorePlan(search, testPubs)).toEqual({ ids: [], error: expect.any(String) })
  })
  it('explains retired IDs', () => {
    expect(restorePlan('?v=1&pubs=p001', [{ ...testPubs[0]!, status: 'retired' }]).error).toMatch(/retired/)
  })
})

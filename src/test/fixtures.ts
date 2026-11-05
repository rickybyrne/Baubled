import type { Pub } from '../../shared/catalogue'

// Deliberately synthetic coordinates and identities. Never imported by application code.
export const testPubs: Pub[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p${String(i + 1).padStart(3, '0')}`, name: `Test pub ${i + 1}`, address: 'Synthetic test address',
  status: 'active', position: [i * 0.0001, 0], identitySource: 'https://example.test/identity',
  coordinateSource: 'https://example.test/synthetic', coordinateLicence: 'Synthetic test data',
  checkedOn: '2026-11-05', entranceVerified: true,
}))
export function orsFixture(pubs = testPubs) {
  return { type: 'FeatureCollection', features: [{ type: 'Feature', properties: {
    summary: { distance: (pubs.length - 1) * 10.4, duration: (pubs.length - 1) * 8.2 },
    way_points: pubs.map((_, i) => i), segments: pubs.slice(1).map((_, i) => ({
      distance: 10.4, duration: 8.2, steps: [{ distance: 10.4, duration: 8.2, type: 11,
        instruction: 'Synthetic instruction for testing only', way_points: [i, i + 1] }],
    })),
  }, geometry: { type: 'LineString', coordinates: pubs.map(pub => [...pub.position!]) } }] }
}

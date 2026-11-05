export type Position = [longitude: number, latitude: number]

export interface Pub {
  id: string
  name: string
  address: string
  status: 'active' | 'retired'
  position: Position | null
  identitySource: string
  coordinateSource: string | null
  coordinateLicence: string | null
  coordinateRecord?: string
  checkedOn: string
  entranceVerified: boolean
  locationNote?: string
}

export const CATALOGUE_REVISION = 'dublin-proof-2026-11-05'
export const LOCATION_DATASET = 'https://data.gov.ie/dataset/national-inventory-of-architectural-heritage-niah-national-dataset'
export const LOCATION_ATTRIBUTION = 'Pub location data © Government of Ireland, National Inventory of Architectural Heritage, CC BY 4.0. Selected records; venue names and addresses checked against official websites on 5 November 2026.'
// Published building centroids, NOT entrance coordinates. All remain blocked for routing.
// Source: national CSV snapshot dated 2023-10-11, retrieved 2026-11-05; see decisions.
export const PUBS: readonly Pub[] = [
  { id: 'p001', name: 'Molloy’s', address: '59 Talbot Street, Dublin', position: [-6.251356, 53.351109], coordinateRecord: '50010141', identitySource: 'https://www.molloysdublin.com/contact-us' },
  { id: 'p002', name: 'The Confession Box', address: '88 Marlborough Street, Dublin', position: [-6.258411, 53.350327], coordinateRecord: '50010241', identitySource: 'https://theconfessionbox.ie/' },
  { id: 'p003', name: 'Madigan’s Earl Street', address: '25 North Earl Street, Dublin', position: [-6.259301, 53.350061], coordinateRecord: '50010252', identitySource: 'https://www.madigansearlst.com/contact-us' },
  { id: 'p004', name: 'Madigan’s O’Connell Street', address: '19 O’Connell Street, Dublin', position: [-6.260547, 53.351414], coordinateRecord: '50010548', identitySource: 'https://www.madigansdublin.com/location-contact-us' },
  { id: 'p005', name: 'Grand Central', address: '10–11 O’Connell Street, Dublin', position: [-6.259180, 53.348326], coordinateRecord: '50010275', identitySource: 'https://grandcentral.ie/', locationNote: 'The association between this building record and Grand Central still needs review.' },
  { id: 'p006', name: 'The Oval', address: '78 Middle Abbey Street, Dublin', position: [-6.260283, 53.348441], coordinateRecord: '50010405', identitySource: 'https://theovalbar.com/contact/' },
  { id: 'p007', name: 'The Lotts Café Bar', address: '9 Lower Liffey Street, Dublin', position: [-6.263322, 53.347363], coordinateRecord: '50010373', identitySource: 'https://www.thelottscafebar.com/contact/' },
  { id: 'p008', name: 'T.P. Smith’s', address: '9–10 Jervis Street, Dublin', position: [-6.266008, 53.347480], coordinateRecord: '50010411', identitySource: 'https://tpsmiths.ie/' },
  { id: 'p009', name: 'Slattery’s', address: '129 Capel Street, Dublin', position: [-6.268880, 53.348285], coordinateRecord: '50010438', identitySource: 'https://slatterys.bar/' },
  { id: 'p010', name: 'Jack Nealon’s', address: '165–166 Capel Street, Dublin', position: [-6.268144, 53.346382], coordinateRecord: '50010361', identitySource: 'https://jacknealons.ie/' },
  { id: 'p011', name: 'Sin É', address: '14–15 Upper Ormond Quay, Dublin', position: [-6.269476, 53.345987], coordinateRecord: '50070286', identitySource: 'https://sin-e.ie/' },
  { id: 'p012', name: 'The Cobblestone', address: '77 King Street North, Dublin', position: [-6.277825, 53.349822], coordinateRecord: '50070204', identitySource: 'https://www.cobblestonepub.ie/' },
].map(pub => ({ ...pub, position: pub.position as Position, status: 'active', coordinateSource: LOCATION_DATASET,
  coordinateLicence: 'CC BY 4.0', checkedOn: '2026-11-05', entranceVerified: false }))

export function validateIds(value: unknown, pubs: readonly Pub[], minimum = 1): string[] {
  if (!Array.isArray(value) || value.length < minimum || value.length > 12 ||
      value.some(id => typeof id !== 'string' || !/^p[0-9]{3}$/.test(id)) ||
      new Set(value).size !== value.length) throw new Error('Choose 1–12 unique pub IDs in your intended order.')
  for (const id of value) {
    const pub = pubs.find(candidate => candidate.id === id)
    if (!pub) throw new Error('This plan contains an unknown pub ID. No stops were restored.')
    if (pub.status !== 'active') throw new Error('This plan contains a retired pub. No stops were restored.')
  }
  return [...value] as string[]
}

export function validPosition(value: unknown): value is Position {
  return Array.isArray(value) && value.length === 2 && value.every(Number.isFinite) &&
    Math.abs(value[0] as number) <= 180 && Math.abs(value[1] as number) <= 90
}

export function routingCatalogueReady(pubs: readonly Pub[]): boolean {
  return pubs.length > 0 && new Set(pubs.map(pub => pub.id)).size === pubs.length &&
    pubs.every(pub => /^p[0-9]{3}$/.test(pub.id) && pub.name && pub.address &&
      pub.identitySource.startsWith('https://') && /^\d{4}-\d{2}-\d{2}$/.test(pub.checkedOn) &&
      (pub.status === 'retired' || (validPosition(pub.position) && pub.entranceVerified &&
        pub.coordinateSource?.startsWith('https://') && Boolean(pub.coordinateLicence))))
}

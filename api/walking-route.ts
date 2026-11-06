import { PUBS, CATALOGUE_REVISION } from '../shared/catalogue.js'
import { createWalkingHandler } from '../server/walking-route.js'

// Owner-approved local release candidate; publication is a separate approval.
// Production must also opt in through its server-only runtime switch.
const PUBLIC_ROUTING_APPROVED = true
// Retain the handler's defensive counters across requests in one warm instance.
const handler = createWalkingHandler({ enabled: PUBLIC_ROUTING_APPROVED && process.env.VERCEL_ENV === 'production' && process.env.ROUTING_ENABLED === 'true',
  environment: process.env.VERCEL_ENV, apiKey: process.env.ORS_API_KEY,
  origin: 'https://baubled.vercel.app', pubs: PUBS, revision: CATALOGUE_REVISION })
export default {
  fetch: handler,
}

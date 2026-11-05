import { PUBS, CATALOGUE_REVISION } from '../shared/catalogue'
import { createWalkingHandler } from '../server/walking-route'

// Release gate: change only after the owner accepts financial/enforcement evidence.
// An accidentally configured environment variable alone cannot open this endpoint.
const PUBLIC_ROUTING_APPROVED = false
export default {
  fetch(request: Request) {
    return createWalkingHandler({ enabled: PUBLIC_ROUTING_APPROVED && process.env.ROUTING_ENABLED === 'true',
      environment: process.env.VERCEL_ENV, apiKey: process.env.ORS_API_KEY,
      origin: 'https://baubled.vercel.app', pubs: PUBS, revision: CATALOGUE_REVISION })(request)
  },
}

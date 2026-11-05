import { Readable } from 'node:stream'
import type { Connect } from 'vite'
import { PUBS, CATALOGUE_REVISION } from '../shared/catalogue.ts'
import { createWalkingHandler } from './walking-route.ts'

// Vite serves no Vercel functions. This loopback adapter exercises the same handler,
// permanently disabled, without a CLI, project linking or any provider credential.
export const localApi: Connect.NextHandleFunction = (incoming, outgoing, next) => {
  if (incoming.url?.split('?')[0] !== '/api/walking-route') return next()
  const origin = `http://${incoming.headers.host}`
  const headers = new Headers()
  for (const [name, value] of Object.entries(incoming.headers)) {
    if (typeof value === 'string') headers.set(name, value)
  }
  const controller = new AbortController()
  outgoing.on('close', () => controller.abort())
  const init: RequestInit & { duplex: 'half' } = { method: incoming.method, headers, signal: controller.signal, duplex: 'half' }
  if (incoming.method !== 'GET' && incoming.method !== 'HEAD') init.body = Readable.toWeb(incoming) as ReadableStream<Uint8Array>
  const handler = createWalkingHandler({ enabled: false, environment: 'development', apiKey: undefined, origin,
    pubs: PUBS, revision: CATALOGUE_REVISION })
  void handler(new Request(`${origin}${incoming.url}`, init)).then(async response => {
    outgoing.writeHead(response.status, Object.fromEntries(response.headers))
    outgoing.end(await response.text())
  }).catch(() => { outgoing.writeHead(500); outgoing.end() })
}

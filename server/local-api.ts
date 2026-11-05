import { Readable } from 'node:stream'
import type { Connect } from 'vite'
import { PUBS, CATALOGUE_REVISION } from '../shared/catalogue.ts'
import { createWalkingHandler } from './walking-route.ts'
import { LOCAL_PROOF_ORIGIN, type readLocalProof } from './local-proof.ts'

// Ordinary dev/preview remain disabled. Only the separately approved live-proof
// Vite mode supplies a key and a persistent two-attempt budget.
export function createLocalApi(proof?: ReturnType<typeof readLocalProof>): Connect.NextHandleFunction {
  const liveHandler = proof && createWalkingHandler({ enabled: true, environment: 'development', apiKey: proof.apiKey,
    origin: LOCAL_PROOF_ORIGIN, pubs: PUBS, revision: CATALOGUE_REVISION, fetcher: proof.budget.fetcher(fetch) })
  return (incoming, outgoing, next) => {
    if (proof) {
      if (incoming.headers.host !== new URL(LOCAL_PROOF_ORIGIN).host || incoming.socket.remoteAddress !== '127.0.0.1') {
        outgoing.writeHead(403); outgoing.end(); return
      }
      if (incoming.method === 'GET' && incoming.headers.accept?.includes('text/html')) {
        try { proof.budget.document() }
        catch { outgoing.writeHead(503, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }); outgoing.end('Local proof document budget closed. Do not reload or reset it.'); return }
      }
    }
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
    const handler = liveHandler ?? createWalkingHandler({ enabled: false, environment: 'development', apiKey: undefined, origin,
      pubs: PUBS, revision: CATALOGUE_REVISION })
    void handler(new Request(`${origin}${incoming.url}`, init)).then(async response => {
      if (proof && !response.ok) proof.budget.halt()
      outgoing.writeHead(response.status, Object.fromEntries(response.headers))
      outgoing.end(await response.text())
    }).catch(() => { proof?.budget.halt(); outgoing.writeHead(500); outgoing.end() })
  }
}

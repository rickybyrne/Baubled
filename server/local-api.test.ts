// @vitest-environment node
import { createServer, request as httpRequest, type Server } from 'node:http'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { afterEach, expect, it, vi } from 'vitest'
import { createServer as createViteServer } from 'vite'
import { createLocalApi } from './local-api'
import { createLocalProofBudget, LOCAL_PROOF_ORIGIN } from './local-proof'
import { PUBS } from '../shared/catalogue'
import { orsFixture } from '../src/test/fixtures'

const servers: Server[] = []
afterEach(async () => {
  vi.unstubAllGlobals()
  await Promise.all(servers.splice(0).map(server => new Promise<void>(resolve => server.close(() => resolve()))))
})
async function listen(proof?: Parameters<typeof createLocalApi>[0]) {
  const api = createLocalApi(proof)
  const server = createServer((req, res) => api(req, res, () => { res.end('page') }))
  servers.push(server)
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
  const address = server.address() as { port: number }
  return (path: string, body?: unknown, headers: Record<string, string> = {}) => new Promise<{ status: number; text: string }>((resolve, reject) => {
    const request = httpRequest({ hostname: '127.0.0.1', port: address.port, path, method: body === undefined ? 'GET' : 'POST',
      headers: { host: new URL(LOCAL_PROOF_ORIGIN).host, origin: LOCAL_PROOF_ORIGIN, 'content-type': 'application/json', ...headers } }, response => {
      let text = ''; response.setEncoding('utf8'); response.on('data', chunk => { text += chunk })
      response.on('end', () => resolve({ status: response.statusCode!, text }))
    })
    request.on('error', reject); request.end(body === undefined ? undefined : JSON.stringify(body))
  })
}
function proof() {
  return { apiKey: 'SECRET_TEST_ONLY', mapKey: 'PUBLIC_TEST_ONLY',
    budget: createLocalProofBudget({ calls: 0, documents: 0, lastStarted: null, halted: false }, () => {}) }
}
it('keeps ordinary local routing closed without an upstream call', async () => {
  const upstream = vi.fn<typeof fetch>(); vi.stubGlobal('fetch', upstream)
  const request = await listen()
  const response = await request('/api/walking-route', { pubIds: ['p001', 'p002'] })
  expect(response.status).toBe(503); expect(upstream).not.toHaveBeenCalled()
})
it('serves only two proof documents and rejects a different Host', async () => {
  const request = await listen(proof())
  expect((await request('/', undefined, { host: 'evil.test' })).status).toBe(403)
  expect((await request('/', undefined, { accept: 'text/html' })).status).toBe(200)
  expect((await request('/?v=1&pubs=p001,p002', undefined, { accept: 'text/html' })).status).toBe(200)
  expect((await request('/', undefined, { accept: 'text/html' })).status).toBe(503)
})
it('uses the real handler and halts after malformed upstream geometry', async () => {
  const upstream = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ wrong: true }))
  vi.stubGlobal('fetch', upstream)
  const request = await listen(proof())
  const response = await request('/api/walking-route', { pubIds: ['p001', 'p002'] })
  expect(response.status).toBe(502)
  expect(response.text).not.toContain('SECRET_TEST_ONLY')
  expect((await request('/api/walking-route', { pubIds: ['p001', 'p002'] })).status).toBe(502)
  expect(upstream).toHaveBeenCalledTimes(1)
})
it('accepts a valid mocked two-stop result without leaking the credential', async () => {
  const upstream = vi.fn<typeof fetch>().mockResolvedValue(Response.json(orsFixture([...PUBS.slice(0, 2)])))
  vi.stubGlobal('fetch', upstream)
  const request = await listen(proof())
  const response = await request('/api/walking-route', { pubIds: ['p001', 'p002'] })
  expect(response.status).toBe(200)
  expect(JSON.parse(response.text).legs).toHaveLength(1)
  expect(response.text).not.toContain('SECRET_TEST_ONLY')
})
it('denies secret files through actual Vite file serving', async () => {
  const root = await mkdtemp(join(tmpdir(), 'baubled-vite-secrets-'))
  let vite: Awaited<ReturnType<typeof createViteServer>> | undefined
  try {
    await mkdir(join(root, 'secrets'))
    await writeFile(join(root, 'secrets/live-proof.env'), 'SECRET_FILE_TEST_ONLY')
    await writeFile(join(root, '.npmrc'), 'SECRET_FILE_TEST_ONLY')
    vite = await createViteServer({ configFile: resolve('vite.config.ts'), root, mode: 'development', cacheDir: join(root, '.vite'),
      server: { port: 0, strictPort: false, hmr: false, watch: null, forwardConsole: false }, logLevel: 'silent' })
    await vite.listen()
    const address = vite.httpServer!.address() as { port: number }
    for (const path of ['/secrets/live-proof.env', `/@fs/${join(root, 'secrets/live-proof.env')}`, '/.npmrc']) {
      const response = await fetch(`http://127.0.0.1:${address.port}${path}`)
      expect(response.status, path).toBe(403)
      expect(await response.text()).not.toContain('SECRET_FILE_TEST_ONLY')
    }
  } finally { await vite?.close(); await rm(root, { recursive: true, force: true }) }
}, 15_000)

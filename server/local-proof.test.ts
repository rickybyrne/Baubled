// @vitest-environment node
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PUBS } from '../shared/catalogue'
import { createLocalProofBudget, readLocalProof, type ProofLedger } from './local-proof'

const fresh = (): ProofLedger => ({ documents: 0, calls: 0, lastStarted: null, halted: false })
const options = (n: number): RequestInit => ({ body: JSON.stringify({ coordinates: PUBS.slice(0, n).map(pub => pub.position) }) })
const roots: string[] = []
function root() {
  const path = mkdtempSync(join(tmpdir(), 'baubled-local-proof-')); roots.push(path)
  mkdirSync(join(path, 'secrets'))
  writeFileSync(join(path, 'secrets/live-proof.env'), 'FREE_PLANS_CONFIRMED=true\nORS_API_KEY=SECRET_TEST_ONLY\nMAPTILER_KEY=PUBLIC_TEST_ONLY\n', { mode: 0o600 })
  return path
}
afterEach(() => { for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true }) })

describe('approved local proof budget', () => {
  it('reserves only two documents and persists before allowing the page', () => {
    const state = fresh(), save = vi.fn(), budget = createLocalProofBudget(state, save)
    budget.document(); budget.document()
    expect(() => budget.document()).toThrow('Local proof is closed')
    expect(save).toHaveBeenCalledTimes(2)
    expect(state.documents).toBe(2)
  })
  it('reserves the exact two routes before dispatch and refuses concurrent or extra calls', async () => {
    let time = 0
    const state = fresh(), budget = createLocalProofBudget(state, () => {}, () => time)
    const upstream = vi.fn<typeof fetch>().mockImplementation(async () => {
      expect(state.calls).toBeGreaterThan(0)
      return Response.json({})
    })
    const fetcher = budget.fetcher(upstream)
    await fetcher('https://example.test', options(2))
    await expect(fetcher('https://example.test', options(12))).rejects.toThrow()
    expect(upstream).toHaveBeenCalledTimes(1)
    time = 60_000
    await fetcher('https://example.test', options(12))
    time = 120_000
    await expect(fetcher('https://example.test', options(12))).rejects.toThrow()
    expect(upstream).toHaveBeenCalledTimes(2)
  })
  it('halts on a wrong sequence without a call or on a provider failure without retries', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('', { status: 429 }))
    const first = createLocalProofBudget(fresh(), () => {})
    await expect(first.fetcher(fetcher)('https://example.test', options(12))).rejects.toThrow()
    expect(fetcher).not.toHaveBeenCalled()
    expect(() => first.document()).toThrow()
    const second = createLocalProofBudget(fresh(), () => {})
    await second.fetcher(fetcher)('https://example.test', options(2))
    await expect(second.fetcher(fetcher)('https://example.test', options(2))).rejects.toThrow()
    expect(fetcher).toHaveBeenCalledTimes(1)
  })
  it('permits only one separately approved review while preserving consumed counters', async () => {
    const state: ProofLedger = { documents: 2, calls: 2, lastStarted: 0, halted: false, additionalReviewApproved: true }
    const saved = vi.fn(), budget = createLocalProofBudget(state, saved, () => 60_000)
    const upstream = vi.fn<typeof fetch>().mockResolvedValue(Response.json({}))
    budget.document()
    await budget.fetcher(upstream)('https://example.test', options(12))
    expect(state).toMatchObject({ documents: 3, calls: 3 })
    expect(saved).toHaveBeenCalledTimes(2)
    expect(() => budget.document()).toThrow()
    await expect(budget.fetcher(upstream)('https://example.test', options(12))).rejects.toThrow()
    expect(upstream).toHaveBeenCalledTimes(1)
  })
  it('preserves the ledger across server restarts without storing keys', () => {
    const path = root()
    readLocalProof(path).budget.document()
    readLocalProof(path).budget.document()
    expect(() => readLocalProof(path).budget.document()).toThrow()
    expect(readFileSync(join(path, 'secrets/live-proof-budget.json'), 'utf8')).not.toContain('TEST_ONLY')
  })
  it('fails closed for unconfirmed plans, exposed file permissions or malformed state, without echoing input', () => {
    const path = root(), credentials = join(path, 'secrets/live-proof.env')
    chmodSync(credentials, 0o644)
    expect(() => readLocalProof(path)).toThrow('Local proof setup is not ready')
    chmodSync(credentials, 0o600)
    writeFileSync(credentials, 'FREE_PLANS_CONFIRMED=false\nORS_API_KEY=DO_NOT_ECHO\nMAPTILER_KEY=DO_NOT_ECHO\n')
    let error: unknown
    try { readLocalProof(path) } catch (caught) { error = caught }
    expect(String(error)).not.toContain('DO_NOT_ECHO')
    const valid = root()
    writeFileSync(join(valid, 'secrets/live-proof-budget.json'), '{')
    expect(() => readLocalProof(valid)).toThrow('Local proof setup is not ready')
  })
})

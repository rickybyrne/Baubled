import { readFileSync, renameSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseEnv } from 'node:util'
import { PUBS } from '../shared/catalogue.ts'

export const LOCAL_PROOF_ORIGIN = 'http://127.0.0.1:5174'
const CLOSED = 'Local proof is closed. Check the approved setup and request budget.'
export interface ProofLedger { documents: number; calls: number; lastStarted: number | null; halted: boolean; additionalReviewApproved?: boolean }

// These are counters, not provider responses or credentials. Persist before each
// dispatch so a dev-server restart cannot silently grant another test allowance.
export function createLocalProofBudget(state: ProofLedger, save: (value: ProofLedger) => void, now = Date.now) {
  // A separately approved final review may add exactly one document/call.
  // Existing counters are never reset; ordinary setup still permits only two.
  const limit = state.additionalReviewApproved === true ? 3 : 2
  const halt = () => { state.halted = true; save(state) }
  return {
    halt,
    document() {
      if (state.halted || state.documents >= limit) throw new Error(CLOSED)
      state.documents++; save(state)
    },
    fetcher(upstream: typeof fetch): typeof fetch {
      return async (input, init) => {
        if (state.halted || state.calls >= limit || (state.lastStarted !== null && now() - state.lastStarted < 60_000)) throw new Error(CLOSED)
        const expected = (state.calls === 0 ? PUBS.slice(0, 2) : PUBS).map(pub => pub.position)
        const body = JSON.parse(String(init?.body)) as { coordinates?: unknown }
        if (JSON.stringify(body.coordinates) !== JSON.stringify(expected)) { halt(); throw new Error(CLOSED) }
        state.calls++; state.lastStarted = now(); save(state)
        try {
          const response = await upstream(input, init)
          if (!response.ok) halt()
          return response
        } catch { halt(); throw new Error(CLOSED) }
      }
    },
  }
}

export function readLocalProof(root: string) {
  const credentialPath = join(root, 'secrets/live-proof.env')
  const ledgerPath = join(root, 'secrets/live-proof-budget.json')
  try {
    if (statSync(credentialPath).mode & 0o077) throw new Error(CLOSED)
    const values = parseEnv(readFileSync(credentialPath, 'utf8'))
    if (values.FREE_PLANS_CONFIRMED !== 'true' || !values.ORS_API_KEY?.trim() || !values.MAPTILER_KEY?.trim() ||
        /\s/.test(values.ORS_API_KEY) || /\s/.test(values.MAPTILER_KEY) ||
        Object.keys(values).some(name => !['FREE_PLANS_CONFIRMED', 'ORS_API_KEY', 'MAPTILER_KEY'].includes(name))) throw new Error(CLOSED)
    let ledger: ProofLedger
    try { ledger = JSON.parse(readFileSync(ledgerPath, 'utf8')) as ProofLedger }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
      ledger = { documents: 0, calls: 0, lastStarted: null, halted: false }
      writeFileSync(ledgerPath, JSON.stringify(ledger), { flag: 'wx', mode: 0o600 })
    }
    const limit = ledger.additionalReviewApproved === true ? 3 : 2
    if ((ledger.additionalReviewApproved !== undefined && typeof ledger.additionalReviewApproved !== 'boolean') ||
        !Number.isInteger(ledger.documents) || ledger.documents < 0 || ledger.documents > limit ||
        !Number.isInteger(ledger.calls) || ledger.calls < 0 || ledger.calls > limit || typeof ledger.halted !== 'boolean' ||
        (ledger.lastStarted !== null && (!Number.isFinite(ledger.lastStarted) || ledger.lastStarted < 0)) ||
        (ledger.calls > 0 && ledger.lastStarted === null)) throw new Error(CLOSED)
    const budget = createLocalProofBudget(ledger, value => {
      const temporary = `${ledgerPath}.tmp`
      writeFileSync(temporary, JSON.stringify(value), { mode: 0o600 })
      renameSync(temporary, ledgerPath)
    })
    return { apiKey: values.ORS_API_KEY, mapKey: values.MAPTILER_KEY, budget }
  } catch { throw new Error('Local proof setup is not ready. Check secrets/live-proof.env, owner-only permissions and the existing budget ledger. No credentials were printed.') }
}

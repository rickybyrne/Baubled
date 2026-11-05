import { useEffect, useRef, useState } from 'react'
import { PUBS, CATALOGUE_REVISION, LOCATION_DATASET, LOCATION_ATTRIBUTION, validateIds, type Pub } from '../shared/catalogue'
import { restorePlan, planSearch } from '../shared/route-url'
import type { WalkingRoute } from '../shared/route'
import { requestWalkingRoute, RoutingClientError } from './routing-client'
import DublinMap from './DublinMap'

type RoutingState = { kind: 'idle' | 'loading' | 'error' | 'ready'; route: WalkingRoute | null; message: string; retryable: boolean }
const idle: RoutingState = { kind: 'idle', route: null, message: '', retryable: true }
export default function IntegrationPlanner({ pubs = PUBS, fetcher }: { pubs?: readonly Pub[]; fetcher?: typeof fetch }) {
  const [plan, setPlan] = useState(() => restorePlan(window.location.search, pubs))
  const [draft, setDraft] = useState(() => plan.ids.join(','))
  const [inputError, setInputError] = useState('')
  const [routing, setRouting] = useState<RoutingState>(idle)
  const generation = useRef(0)
  const pending = useRef<AbortController | null>(null)

  useEffect(() => {
    const restore = () => {
      generation.current++; pending.current?.abort(); pending.current = null
      const restored = restorePlan(window.location.search, pubs)
      setPlan(restored); setDraft(restored.ids.join(',')); setInputError(''); setRouting(idle)
    }
    window.addEventListener('popstate', restore)
    return () => { window.removeEventListener('popstate', restore); pending.current?.abort() }
  }, [pubs])

  function apply(ids: string[]) {
    generation.current++; pending.current?.abort(); pending.current = null
    setPlan({ ids, error: null }); setDraft(ids.join(',')); setInputError(''); setRouting(idle)
    // Explicit proof actions replace the current URL; full editor history is Milestone 6.
    window.history.replaceState(null, '', `${window.location.pathname}${planSearch(ids, pubs)}#route-planner`)
  }
  async function calculate() {
    if (plan.ids.length < 2 || pending.current || !routing.retryable) return
    const controller = new AbortController(), token = ++generation.current, ids = [...plan.ids]
    pending.current = controller
    setRouting({ kind: 'loading', route: null, message: 'Finding your walking route…', retryable: false })
    try {
      const route = await requestWalkingRoute(ids, CATALOGUE_REVISION, controller.signal, fetcher)
      if (token === generation.current && !controller.signal.aborted) setRouting({ kind: 'ready', route, message: '', retryable: false })
    } catch (error) {
      if (token === generation.current && !controller.signal.aborted) setRouting({ kind: 'error', route: null,
        retryable: !(error instanceof RoutingClientError) || error.retryable,
        message: error instanceof Error && !(error instanceof DOMException) ? error.message : 'Walking directions could not be loaded. Your stops are unchanged.' })
    } finally { if (token === generation.current) pending.current = null }
  }
  const selected = plan.ids.map(id => pubs.find(pub => pub.id === id)!)
  const share = planSearch(plan.ids, pubs)
  return <div className="integration-proof">
    <p className="status">Integration proof · live services awaiting approval</p>
    <p className="mt-4">Try an ordered plan with these sourced pub candidates. Building locations still need entrance checks. Walking directions remain disabled while the free-service protection gate is reviewed.</p>
    <DublinMap pubs={pubs} ids={plan.ids} route={routing.route} />
    <p className="text-sm mt-4">{LOCATION_ATTRIBUTION} <a href={LOCATION_DATASET} className="source-link">Dataset</a> · <a href="https://creativecommons.org/licenses/by/4.0/" className="source-link">Licence</a></p>
    {plan.error && <div role="alert" className="feedback"><p>{plan.error} The original URL has been kept.</p><button onClick={() => apply([])}>Start an empty plan</button></div>}
    <div className="proof-columns">
      <section aria-labelledby="fixture-heading">
        <h3 id="fixture-heading">Pub fixture candidates</h3>
        <p className="text-sm">Select in the order you intend to visit. This small proof set is not the final catalogue.</p>
        {pubs.length === 0 && <p>Verified source records are not yet available. No venue data has been invented.</p>}
        <ul className="fixture-list">{pubs.filter(pub => pub.status === 'active').map(pub => <li key={pub.id}>
          <label><input type="checkbox" checked={plan.ids.includes(pub.id)} disabled={Boolean(plan.error) || (!plan.ids.includes(pub.id) && plan.ids.length >= 12)}
            onChange={event => apply(event.target.checked ? [...plan.ids, pub.id] : plan.ids.filter(id => id !== pub.id))} /><span><strong>{pub.name}</strong>{' '}<br /><span className="text-sm">{pub.address} · {pub.id}</span></span></label>
          <a className="source-link" href={pub.identitySource}>Venue source{' '}<span className="sr-only">for {pub.name}</span></a>
        </li>)}</ul>
      </section>
      <section aria-labelledby="order-heading">
        <h3 id="order-heading">Your ordered plan</h3>
        <p>{plan.ids.length} of 12 stops · {Math.max(0, plan.ids.length - 1)} walking legs expected</p>
        {selected.length ? <ol className="selected-list">{selected.map(pub => <li key={pub.id}>{pub.name}</li>)}</ol> : <p>Select a pub to begin. One stop is a valid plan without walking legs.</p>}
        <form onSubmit={event => {
          event.preventDefault()
          try { apply(validateIds(draft.split(','), pubs)) }
          catch (error) { setInputError(error instanceof Error ? error.message : 'Check your pub IDs.') }
        }}>
          <label htmlFor="ordered-ids">Ordered pub IDs</label>
          <p id="ids-help" className="text-sm">Comma-separated, with no spaces. Applying a list preserves its exact order.</p>
          <input id="ordered-ids" value={draft} onChange={event => setDraft(event.target.value)} maxLength={256} aria-describedby="ids-help" aria-invalid={Boolean(inputError)} />
          <button type="submit">Apply order</button>
        </form>
        {inputError && <p role="alert" className="feedback">{inputError} Your current plan is unchanged.</p>}
        <div className="proof-actions">
          <button onClick={() => apply([])} disabled={!plan.ids.length && !plan.error}>Clear plan</button>
          <button onClick={() => void calculate()} disabled={plan.ids.length < 2} aria-disabled={!routing.retryable}>Check walking route</button>
        </div>
        {share && <a className="share-link" href={`${share}#route-planner`}>Open this exact plan</a>}
        <p role="status" className="feedback">{routing.message || (routing.kind === 'ready' ? 'Walking directions match this exact plan.' : plan.ids.length === 1 ? 'One stop — no directions request is needed.' : 'Directions are requested only when you choose “Check walking route”. No automatic retries.')}</p>
        {routing.route && <section aria-label="Walking directions">
          <h4>Walking estimate</h4><p>{(routing.route.totals.distanceMetres / 1000).toFixed(2)} km · {Math.round(routing.route.totals.durationSeconds / 60)} minutes, excluding pub visits</p>
          {routing.route.legs.map((leg, i) => <details key={`${leg.fromId}-${leg.toId}`}><summary>{i + 1}. {selected[i]!.name} → {selected[i + 1]!.name} · {Math.round(leg.distanceMetres)} m · {Math.round(leg.durationSeconds / 60)} min</summary>
            <ol>{leg.steps.map((step, j) => <li key={j}>{step.instruction} ({Math.round(step.distanceMetres)} m)</li>)}</ol></details>)}
          <p className="text-sm">{routing.route.attribution} <a href="https://openrouteservice.org/">ORS</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">Licence</a></p>
        </section>}
      </section>
    </div>
  </div>
}

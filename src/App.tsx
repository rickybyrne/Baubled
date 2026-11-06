import IntegrationPlanner from './IntegrationPlanner'
import { isPublicProof } from './live-map-config'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="page-width flex flex-wrap items-center justify-between gap-4 py-6">
        <span className="brand">baubled<span aria-hidden="true">✳</span></span>
        <p className="eyebrow">Made for Dublin evenings</p>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="welcome-heading">
          <div className="page-width hero-layout">
            <div className="hero-copy">
              <p className="eyebrow text-gold">Good company. A festive wander.</p>
              <h1 id="welcome-heading">A little Dublin. <br />A little <em>festive.</em></h1>
              <p className="hero-description">Your favourite people, a few Dublin pubs, and an evening that’s yours to plan. A festive pub crawl planner is taking shape.</p>
              <a className="primary-link" href="#route-planner">Plan your route <span aria-hidden="true">↗</span></a>
              <p className="mt-4 text-sm text-cream/80">{import.meta.env.DEV && import.meta.env.MODE === 'live-proof' ?
                'An approved local integration test with a separate request allowance.' : isPublicProof() ?
                'An early integration proof. Walking estimates depend on provider availability.' :
                'An offline integration proof — live services are disabled in this environment.'}</p>
            </div>
            <div className="ornament" aria-hidden="true">
              <div className="ornament-cap" />
              <div className="ornament-ball"><span>Baubled</span><span className="ornament-star">✳</span><span>DUBLIN · GOOD COMPANY</span></div>
            </div>
          </div>
        </section>

        <section id="route-planner" className="page-width planner" aria-labelledby="planner-heading" tabIndex={-1}>
          <div>
            <p className="eyebrow text-red">The next stop</p>
            <h2 id="planner-heading">Your evening, <br />in your order.</h2>
          </div>
          <IntegrationPlanner />
        </section>
      </main>

      <footer className="page-width flex flex-wrap justify-between gap-4 border-t border-forest/20 py-6 text-sm">
        <p>Baubled · Dublin, Ireland</p>
        <p>A personal, non-commercial project.</p>
      </footer>
    </>
  )
}

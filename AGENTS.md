# Baubled conventions

Personal, non-commercial Dublin pub crawl planner. Operating budget: strictly €0/month.

Canonical project: `/Users/rickybyrne/Documents/ChatGPT/baubled`, connected to `https://github.com/rickybyrne/Baubled.git`. This React/Vite project is the sole source of truth. Earlier Baubled repositories, instructions, and history are obsolete; do not import or reconcile them. Leave the obsolete directory untouched unless separately authorised.

## Project context

- Read [docs/product-brief.md](docs/product-brief.md) for authoritative launch scope and contracts, [docs/backlog.md](docs/backlog.md) for the eight milestone gates, [docs/decisions.md](docs/decisions.md) for architecture/provider decisions, and [docs/progress.md](docs/progress.md) for current evidence and the next task.
- The local foundation is already committed and pushed; do not repeat scaffolding, initial Git setup, or remote configuration. Milestone 1 remains open until its hosted skeleton is verified.
- Roadmap entries describe future work, not permission to implement it. Work one scoped task at a time, preserve the foundation, report actual evidence, and await owner review before dependent work. Never infer access to another conversation's prompts.

## Work style and scope

- Inspect Git status and existing work before edits; preserve unrelated changes.
- Use npm and the single package-lock.json. Node is pinned in .nvmrc; keep CI aligned.
- React + strict TypeScript + Vite; Tailwind theme tokens live in src/styles.css.
- Prefer semantic HTML, accessible names, native anchors, visible focus, system fonts, and touch targets of at least 44px. Verify mobile layout and keyboard behaviour in a real browser.
- Keep components small; extract only when current use benefits. Test behaviour using accessible queries; no snapshots or CSS-class assertions.
- Current delivered scope is the local application foundation. Do not add route state, catalogue data, maps, directions, URL parsing, persistence, authentication, backend, or analytics without a new task. The product brief's deferred features need explicit scope approval.
- Enforce €0/month: no potentially billable integration, paid services, or billing activation. MapLibre/MapTiler Free, openrouteservice and Vercel Hobby remain provisional pending current official verification and approval. Historical research is not a completed integration gate; quota exhaustion may disable service but must not incur charges.
- Provider accounts, credentials and infrastructure deployment require explicit owner approval; none is authorised by this documentation task. Commit, push, and Git remote changes also require explicit authorisation. The initial GitHub setup was authorised and completed on 16 October 2026; that is not permission for subsequent commits/pushes.
- Frontend environment variables are public. Never store secrets in frontend configuration.
- Preserve the product brief's state, data, routing and URL contracts. Keep map logic contained and one small routing module; no generic provider framework or speculative dependencies. Never fabricate venue data or reuse permanent pub IDs.
- Test behaviour with deterministic mocked provider responses and a separate approved live smoke check. Never weaken meaningful tests to obtain a pass. Record checked dates/source links for provider decisions and distinguish new evidence from historical reports in docs/progress.md.

## Commands and required checks

`npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run preview`.

Before handoff: clean lockfile installation, typecheck, lint, tests, and build. Build must include TypeScript checking. Inspect dev and production preview in a browser: 375px/1280px layout, overflow, CTA destination, Tab/Enter navigation, skip link, visible focus, and console errors. Record unavailable checks honestly. Local CI-equivalent checks do not establish a hosted Actions result.

Report files changed and why, commands and outcomes, manual evidence, unperformed checks, limitations, and a suggested commit checkpoint. Classify review results as Accepted, Needs correction, or Unverified; a build or screenshot alone does not verify live routing or venue correctness.

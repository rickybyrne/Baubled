# Baubled

A personal, non-commercial, mobile-first Dublin pub crawl planner inspired by the **12 Pubs of Christmas**. The intended journey is to browse approximately 24 verified pubs by map or list, choose 1–12 unique stops, add/remove/replace/reorder them, review walking geometry and instructions, and share the ordered plan through a versioned URL. Shorter plans remain valid; the user's order is preserved without automatic optimisation or a return journey.

Canonical local project: `/Users/rickybyrne/Documents/ChatGPT/baubled`. GitHub: [rickybyrne/Baubled](https://github.com/rickybyrne/Baubled). The foundation is committed and pushed as [`0293e6d`](https://github.com/rickybyrne/Baubled/commit/0293e6da409815bc894c98fad5c0f676b2037e7e). Earlier Baubled repositories are obsolete and are not dependencies of this project.

## Current status

As of **6 November 2026**, Milestone 1 remains accepted and complete. The offline Milestone 2 checkpoint and Node ESM correction are published through `bf98cb4` at [baubled.vercel.app](https://baubled.vercel.app/), with successful exact-SHA Actions, automatic Vercel deployment and controlled disabled-endpoint verification. The interface has 12 sourced pub candidates, an interactive MapLibre coordinate canvas, ordered selection and versioned URL restoration. See the [current evidence and working plan](docs/progress.md#tested-activation-candidate--6-november-2026).

Milestone 2 is incomplete. The owner approved a simpler free-plan protection policy without metered WAF rate limiting, and sourced building locations rather than surveyed doors. Local preparation adds bounded map loading/attribution and best-effort warm-instance routing limits; these are not global abuse limits. The owner confirmed Free/Standard accounts and a bounded local proof returned real tiles and an ordered twelve-stop/eleven-leg route. Production-only Vercel variable records are now prepared (ORS Secret, public MapTiler Config); stored key validity and deployed integration remain unverified. The owner-approved local activation candidate opens the code gates only for the intended production environment; publication and the Production runtime switch remain unapproved. See the [activation checkpoint](docs/deployment.md#tested-activation-candidate--6-november-2026). Local evidence is not milestone completion.

The default page runs without accounts, keys or external runtime requests. The map has no street tiles; its approximate building markers are not entrance-verified. The published production site remains offline. In the local release candidate, ordinary dev and preview remain closed even with supplied variables; production routing additionally requires `VERCEL_ENV=production`, `ROUTING_ENABLED=true` and a server key. A separately approved, loopback-only `live-proof` dev mode is described below; its approved test allowance is now exhausted and locked closed. Operating budget: **€0/month**.

## Local setup

Use **Node 24.19.0** (pinned in `.nvmrc`) and **npm 12.2.0**. If these are unavailable, the recommended durable setup is an owner-approved per-user [nvm installation](https://github.com/nvm-sh/nvm#installing-and-updating), then `nvm install` and `npm install --global npm@12.2.0` in that Node environment. Agents must not install runtimes or change shell configuration without approval.

For an already configured shell, run from the checkout being developed:

```sh
nvm use
node --version
npm --version
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). No environment file is needed. Run `npm ci` for a fresh checkout or dependency changes, not before every edit. Keep each worktree's dependencies and generated files separate.

If Codex has no Node/npm on PATH, it can discover its bundled Node, check the version against `.nvmrc`/`engines`, and use an integrity-checked, pinned npm 12.2.0 launcher in temporary storage for the current session. Put both on that process's PATH so nested npm scripts work. This is a temporary fallback, not a machine setup or a repository dependency; do not hardcode an old temporary path or loosen version constraints. Report the runtime actually used.

| Command | Purpose |
| --- | --- |
| `npm ci` | Clean installation from the lockfile |
| `npm run dev` | Development server |
| `npm run typecheck` | Strict TypeScript checking |
| `npm run lint` | ESLint, with no warnings allowed |
| `npm test` | Vitest + React Testing Library, non-watch mode |
| `npm run verify` | Lint → tests → typechecked production build; same command as CI |
| `npm run build` | Type checking followed by production output in `dist/` |
| `npm run preview` | Serve the built output locally, normally port 4173 |

GitHub Actions runs `npm ci` then `npm run verify` on pushes and pull requests, retaining pinned Node/npm and read-only repository permissions. The build performs TypeScript checking once; a separate typecheck step is unnecessary in the full verification sequence. Check [actual workflow runs](https://github.com/rickybyrne/Baubled/actions/workflows/ci.yml) for hosted results; local checks alone do not establish a hosted pass.

Use focused tests/static checks during iteration, then `npm run verify` for completed behavioural or tooling changes. Documentation-only edits need whitespace, Markdown/link and scope checks rather than dependency installation/builds. Do not add tests that merely assert script spelling or mirror implementation.

## Browser verification

Use the Codex in-app browser when available, or a normal local browser. Start a loopback-only dev server with `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`. After `npm run verify`, start production preview separately with `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`. If a port is occupied, inspect the owner or select another explicit port; do not kill unrelated processes. Stop task-owned servers after checking.

1. Inspect both servers at **375×812** and **1280×900**. Check readable content, existing colours/type/spacing, no horizontal overflow and interactive targets at least 44px. Compare affected UI with the established design, not just test output.
2. On a fresh root-page load, Tab to the visible skip link and Enter to focus main content. Tab to **Plan your route**, verify visible focus and Enter to reach `#route-planner`. Check one stop (no routing request), 12-stop exact order, invalid-input feedback, share/refresh restoration and the disabled-routing response. The page must clearly distinguish the offline proof from live directions.
3. Clear/inspect console and network observations around the actual journey. Record unexpected errors and failed assets. Use keyboard events and rendered/accessibility observations; programmatic focus alone does not prove keyboard navigation.
4. For future affected features, inspect empty/loading/error states, accessible names, focus after updates and reduced-motion behaviour. Use deterministic provider mocks; routine checks must not contact MapTiler or ORS.
5. Record browser, server mode, viewport, actions and results. Distinguish actual visual/keyboard checks from source inspection. If media emulation, a physical phone, screen reader or another browser was unavailable, state that limitation.

This lightweight procedure needs no new browser-test dependency. Add Playwright only when meaningful end-to-end journeys justify its separately reviewed scope.

## Approved local live proof

The owner approved this local phase on **5 November 2026**: at most **two document loads × 50 MapTiler HTTP attempts**, and **two ORS Directions attempts**, at least 60 seconds apart. Failures/cancellations count. Stop on the first unexpected result. No publication, Vercel setting, WAF activation or deployed test is included.

1. The owner creates MapTiler **Free** and HeiGIT/ORS **Standard (€0)** accounts, handles terms/passwords, confirms no billing/trial activation, and restricts the single MapTiler key to `127.0.0.1` (no protocol/port). Do not test provider demo maps or paste keys into chat.
2. In the isolated worktree only, the owner fills ignored `secrets/live-proof.env` with `MAPTILER_KEY`, `ORS_API_KEY`, and `FREE_PLANS_CONFIRMED=true` after checking the plans. The prepared file has owner-only permissions. Neither normal Vite env loading nor production builds read it; Vite file serving denies the entire `secrets` directory. ORS values must never have a `VITE_` prefix.
3. After account/setup confirmation and checking provider availability, the operator runs `npm run dev -- --mode live-proof` from that worktree. It binds `http://127.0.0.1:5174` with a strict port, no watcher/HMR reloads or browser-console forwarding. Do not override its host/port, run a second proof server, or edit code while it is active. Do not use this mode for a build or preview.
4. Open the first document once. Verify the street map, attribution and responsive layout by resizing that document. Route `p001,p002` once, then—after at least 60 seconds—route `p001,p002,p003,p004,p005,p006,p007,p008,p009,p010,p011,p012` once. Check route/snapping/instructions/metrics as specified in decisions. The second document is reserved for exact-order restoration, with **no third ORS request**.
5. `secrets/live-proof-budget.json` stores counters/timestamps, a halt flag and an optional explicit review approval. Reservations persist before dispatch and survive server restarts. Do not delete/reset it or clear a halt without fresh approval. The owner separately approved one final review after an anchor-navigation defect was fixed: `additionalReviewApproved=true` raises the cumulative ceiling to three documents/three ORS calls, preserving every counter. That allowance has also been consumed; the ledger is halted. This is a dated approval, not permission for another run. After the proof, stop the server and latch the ledger closed, preserving counts. Replace MapTiler's temporary `127.0.0.1` origin with production-only `baubled.vercel.app`; never clear restrictions to an unrestricted key. This did not enable the published production deployment.

The accepted policy allows sourced building points; it does not establish current doorway access. Check every snapped pedestrian arrival and retain the 50-metre boundary. Avoid announced HeiGIT maintenance (6 November 2026, 07:30–11:30 UTC); recheck availability before the actual run. Account changes and keys remain owner actions. The owner confirmed cleanup to production-only `baubled.vercel.app` after the local test; the published production deployment is still disabled. See [local results](docs/progress.md#local-live-proof-results--5-november-2026). Routine automated tests use temporary synthetic credentials and fake provider responses, never this file or budget.

## Feature delivery

Give Codex an outcome, relevant UX, constraints/non-goals, observable acceptance criteria and any owner-reserved decisions. Codex owns the implementation plan and continues through testing, correction and browser verification without routine approval between steps. See the [working agreement](AGENTS.md) and [delivery/publication workflow](docs/backlog.md#task-and-review-workflow).

Safe local feature-branch commits are allowed within the approved objective. Pushes, merges into `main`, deployments and provider/cost operations require explicit approval. A push to `main` can automatically deploy production; GitHub Actions is a separate check, not a guaranteed deployment gate.

## Structure

- `src/App.tsx`, `src/IntegrationPlanner.tsx`: introduction and small integration-proof interface.
- `src/DublinMap.tsx`: contained MapLibre canvas, markers, route layer and fallback.
- `shared/catalogue.ts`: 12 sourced identities/building coordinates with provenance and explicit unverified-entrance metadata.
- `src/map-transport.ts`, `src/live-map-config.ts`: bounded MapTiler loading and the exact production-build/origin gate.
- `server/routing-budget.ts`: per-instance attempt/concurrency limits and quota/auth cooldowns; not a shared quota guarantee.
- `shared/route.ts`, `shared/route-url.ts`: route validation/normalisation and basic versioned URL contract.
- `api/walking-route.ts`, `server/walking-route.ts`: release-blocked entry point and tested server boundary.
- `server/local-api.ts`, `server/local-proof.ts`: ordinary disabled adapter plus explicitly approved loopback proof mode, private credential loading and persistent request counters.
- `src/styles.css`: Tailwind theme, page styles, and focus foundation.
- Tests beside the modules: deterministic provider, lifecycle, error, URL and UI behaviour; synthetic geographic data is confined to test helpers.
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`: development checks.
- [Authoritative product brief and launch contracts](docs/product-brief.md).
- [Eight-milestone backlog and review workflow](docs/backlog.md).
- [Architecture decisions and provider verification gates](docs/decisions.md).
- [Progress and validation evidence](docs/progress.md).

The accepted architecture is MapLibre/MapTiler in the browser and one Vercel Node function holding the ORS key server-side. The local release candidate has owner-approved code gates; publishing it and setting the Production runtime switch still require explicit approval. Do not treat local preparation as permission to activate production. `ORS_API_KEY` must never use a `VITE_` prefix or enter a browser build, Preview or CI. MapTiler's `VITE_MAPTILER_KEY` is public and must follow the accepted single-key/origin workflow. The ordinary dev/preview adapter returns a disabled-service response; ordinary tests inject synthetic responses directly, without invoking a provider. Vite's static build does not prove Vercel function packaging or deployment.

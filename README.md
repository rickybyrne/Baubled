# Baubled

A personal, non-commercial, mobile-first Dublin pub crawl planner inspired by the **12 Pubs of Christmas**. The intended journey is to browse approximately 24 verified pubs by map or list, choose 1–12 unique stops, add/remove/replace/reorder them, review walking geometry and instructions, and share the ordered plan through a versioned URL. Shorter plans remain valid; the user's order is preserved without automatic optimisation or a return journey.

Canonical local project: `/Users/rickybyrne/Documents/ChatGPT/baubled`. GitHub: [rickybyrne/Baubled](https://github.com/rickybyrne/Baubled). The foundation is committed and pushed as [`0293e6d`](https://github.com/rickybyrne/Baubled/commit/0293e6da409815bc894c98fad5c0f676b2037e7e). Earlier Baubled repositories are obsolete and are not dependencies of this project.

## Current status

As of **5 November 2026**, Milestone 1 is accepted, published and deployed at [baubled.vercel.app](https://baubled.vercel.app/). The application contains a responsive introduction, a working “Plan your route” anchor and an honest planner placeholder. Pub selection, maps, walking directions and sharing are not implemented. See [deployment evidence](docs/deployment.md) and [latest local verification](docs/progress.md#development-workflow-overhaul--5-november-2026) for checks and limitations.

Milestone 2 is in progress: Task 1 research is published at `6c0f076`; Task 2 design was accepted on 5 November, with its separate publication still pending. Option B is accepted in principle. Public WAF activation and live routing remain blocked by the Hobby financial/enforcement gate; accounts and integrations remain unverified. This workflow branch does not include the unpublished Task 2 changes.

The page runs without accounts, API keys, external fonts, or external runtime services. Operating budget: **€0/month**.

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
2. On a fresh root-page load, Tab to the visible skip link and Enter to focus main content. Tab to **Plan your route**, verify visible focus and Enter to reach `#route-planner`. Check pointer activation and refresh at `/` and `/#route-planner`; the current planner must still say it is coming soon.
3. Clear/inspect console and network observations around the actual journey. Record unexpected errors and failed assets. Use keyboard events and rendered/accessibility observations; programmatic focus alone does not prove keyboard navigation.
4. For future affected features, inspect empty/loading/error states, accessible names, focus after updates and reduced-motion behaviour. Use deterministic provider mocks; routine checks must not contact MapTiler or ORS.
5. Record browser, server mode, viewport, actions and results. Distinguish actual visual/keyboard checks from source inspection. If media emulation, a physical phone, screen reader or another browser was unavailable, state that limitation.

This lightweight procedure needs no new browser-test dependency. Add Playwright only when meaningful end-to-end journeys justify its separately reviewed scope.

## Feature delivery

Give Codex an outcome, relevant UX, constraints/non-goals, observable acceptance criteria and any owner-reserved decisions. Codex owns the implementation plan and continues through testing, correction and browser verification without routine approval between steps. See the [working agreement](AGENTS.md) and [delivery/publication workflow](docs/backlog.md#task-and-review-workflow).

Safe local feature-branch commits are allowed within the approved objective. Pushes, merges into `main`, deployments and provider/cost operations require explicit approval. A push to `main` can automatically deploy production; GitHub Actions is a separate check, not a guaranteed deployment gate.

## Structure

- `src/App.tsx`: root page and planner placeholder.
- `src/styles.css`: Tailwind theme, page styles, and focus foundation.
- `src/App.test.tsx`: page, CTA destination, and skip-link contracts.
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`: development checks.
- [Authoritative product brief and launch contracts](docs/product-brief.md).
- [Eight-milestone backlog and review workflow](docs/backlog.md).
- [Architecture decisions and provider verification gates](docs/decisions.md).
- [Progress and validation evidence](docs/progress.md).

The accepted architecture direction is MapLibre/MapTiler in the browser and a minimal Vercel Node function holding the ORS key server-side. Vercel hosts the skeleton; map/routing providers are not integrated. Keep the documented security, licensing and financial gates before implementation. No provider credentials are needed to develop or verify the current skeleton.

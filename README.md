# Baubled

A personal, non-commercial, mobile-first Dublin pub crawl planner inspired by the **12 Pubs of Christmas**. The intended journey is to browse approximately 24 verified pubs by map or list, choose 1–12 unique stops, add/remove/replace/reorder them, review walking geometry and instructions, and share the ordered plan through a versioned URL. Shorter plans remain valid; the user's order is preserved without automatic optimisation or a return journey.

Canonical local project: `/Users/rickybyrne/Documents/ChatGPT/baubled`. GitHub: [rickybyrne/Baubled](https://github.com/rickybyrne/Baubled). The foundation is committed and pushed as [`0293e6d`](https://github.com/rickybyrne/Baubled/commit/0293e6da409815bc894c98fad5c0f676b2037e7e). Earlier Baubled repositories are obsolete and are not dependencies of this project.

## Current status

Milestone 1 is in progress. This repository implements the local foundation: a responsive introduction, a working “Plan your route” anchor, and an honest planner placeholder. Pub selection, route building, maps, directions, and sharing are not implemented. The foundation's [hosted CI run passed](https://github.com/rickybyrne/Baubled/actions/runs/38926238221); the hosted skeleton and public deployment checks remain outstanding. See [progress](docs/progress.md) for dated evidence and limits.

The page runs without accounts, API keys, external fonts, or external runtime services. Operating budget: **€0/month**.

## Local setup

Use **Node 24.19.0** (Node 24 LTS, pinned in `.nvmrc`) and **npm 12.2.0**. For a persistent per-user installation, use [nvm's official installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating). Installing nvm normally adds its loader to your shell configuration; review that change first. The temporary Codex runtime used for validation is not a normal Terminal setup. With nvm installed, run these commands from the project directory:

```sh
nvm install
nvm use
npm install --global npm@12.2.0
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173). No environment file is needed.

| Command | Purpose |
| --- | --- |
| `npm ci` | Clean installation from the lockfile |
| `npm run dev` | Development server |
| `npm run typecheck` | Strict TypeScript checking |
| `npm run lint` | ESLint, with no warnings allowed |
| `npm test` | Vitest + React Testing Library, non-watch mode |
| `npm run build` | Type checking followed by production output in `dist/` |
| `npm run preview` | Serve the built output locally, normally port 4173 |

GitHub Actions runs typecheck, lint, tests, and build after `npm ci` on pushes and pull requests, with read-only repository permissions. Check [the actual workflow runs](https://github.com/rickybyrne/Baubled/actions/workflows/ci.yml) for hosted results; local checks alone do not establish a hosted pass.

## Structure

- `src/App.tsx`: root page and planner placeholder.
- `src/styles.css`: Tailwind theme, page styles, and focus foundation.
- `src/App.test.tsx`: page, CTA destination, and skip-link contracts.
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`: development checks.
- [Authoritative product brief and launch contracts](docs/product-brief.md).
- [Eight-milestone backlog and review workflow](docs/backlog.md).
- [Architecture decisions and provider verification gates](docs/decisions.md).
- [Progress and validation evidence](docs/progress.md).

Provisional services are MapLibre GL JS for rendering, MapTiler Free for maps, openrouteservice for walking directions, and Vercel Hobby for personal/non-commercial hosting. No deployment or provider integration has been performed. Current official pricing, charge prevention, technical capabilities, credentials, attribution and storage terms must be verified before approval/integration. Temporary service interruption at quota limits is acceptable; unexpected charges are not. No accounts or credentials are needed for the current skeleton.

# Baubled conventions

Personal, non-commercial Dublin pub crawl planner. Operating budget: strictly €0/month.

Canonical project: `/Users/rickybyrne/Documents/ChatGPT/baubled`, connected to `https://github.com/rickybyrne/Baubled.git`. This React/Vite project is the sole source of truth. Earlier Baubled repositories, instructions, and history are obsolete; do not import or reconcile them. Leave the obsolete directory untouched unless separately authorised.

## Work style and scope

- Inspect Git status and existing work before edits; preserve unrelated changes.
- Use npm and the single package-lock.json. Node is pinned in .nvmrc; keep CI aligned.
- React + strict TypeScript + Vite; Tailwind theme tokens live in src/styles.css.
- Prefer semantic HTML, accessible names, native anchors, visible focus, system fonts, and touch targets of at least 44px. Verify mobile layout and keyboard behaviour in a real browser.
- Keep components small; extract only when current use benefits. Test behaviour using accessible queries; no snapshots or CSS-class assertions.
- Current scope is the local application foundation. Do not add route state, catalogue data, maps, directions, URL parsing, persistence, authentication, backend, or analytics without a new task.
- No paid services, billing, accounts, mapping dependencies, credentials, or deployment for this milestone. Commit, push, and Git remote changes require explicit user authorisation; the initial GitHub setup was authorised on 16 October 2026.
- Frontend environment variables are public. Never store secrets in frontend configuration.
- Preserve future contracts in docs/decisions.md and accurate evidence in docs/progress.md.

## Commands and required checks

`npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run preview`.

Before handoff: clean lockfile installation, typecheck, lint, tests, and build. Build must include TypeScript checking. Inspect dev and production preview in a browser: 375px/1280px layout, overflow, CTA destination, Tab/Enter navigation, skip link, visible focus, and console errors. Record unavailable checks honestly. Local CI-equivalent checks do not establish a hosted Actions result.

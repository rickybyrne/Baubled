# Progress

## Canonical repository and initial commit preparation — 16 October 2026

Milestone 1 remains in progress; no additional product features were added.

- The owner selected `/Users/rickybyrne/Documents/ChatGPT/baubled` as the sole authoritative Baubled project. Git root matches this exact path; the branch is `main`.
- The current React/Vite application, tests, configuration, decisions, and evidence are retained. Earlier Baubled files, instructions, and commit history are obsolete and were not imported. The obsolete directory was left untouched.
- GitHub authentication was verified and `rickybyrne/Baubled` was confirmed public and empty before setup. `origin` now points to `https://github.com/rickybyrne/Baubled.git`.
- The owner authorised an independent initial commit, with subject `feat: initialise Baubled application foundation`, followed by a normal push. This entry records the pre-commit validation; the commit/push result and hosted CI must be verified afterward rather than inferred from local checks. See [main](https://github.com/rickybyrne/Baubled/commits/main/) and [workflow runs](https://github.com/rickybyrne/Baubled/actions/workflows/ci.yml).
- Expanded `.gitignore` for credentials, local service state, temporary files, and generated artifacts. Reviewed the 20-file commit scope: application, tests, tooling, current documentation, and two existing browser screenshots. No credentials or unrelated files were found; lockfile downloads use the official npm registry without embedded credentials. Dependencies and build output are excluded.

### Fresh validation

Using Node **24.19.0** and npm **12.2.0**, `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` all passed. Tests: **3 passed**. npm reported **0 vulnerabilities**; its default block on the optional macOS `fsevents` install script remains a non-blocking warning.

Development and production-preview servers both ran. Rechecked desktop layout at 1280px and mobile layout at 375px with no horizontal overflow. Keyboard Tab/Enter revealed the skip link and visible focus, reached main content, and activated the planner anchor. A production-preview CTA click also reached and focused the planner. Browser logs contained no warnings or errors. No application source or test changes were needed.

The normal shell still lacks Node/npm. Validation reused the bundled Node runtime and temporary npm launcher; no shell configuration or machine-wide installation was changed. Persistent setup is recommended through nvm, matching `.nvmrc` and npm 12.2.0; README describes the setup and expected shell-loader change.

Next review: verify the pushed initial commit, upstream tracking, hosted Actions result, and clean working tree. Provider integration, deployment, catalogue creation, and route features remain outside this task. The following 14 October entry is retained as historical evidence, including the state before this GitHub authorisation.

## Milestone 1 — in progress

**14 October 2026. Last accepted commit: not yet established.**

This task establishes the local application foundation only. The original directory contained an empty Git repository on `main`, with no commits, source, dependencies, lockfiles, tests, or applicable ancestor AGENTS.md files. No unrelated files or uncommitted work were overwritten. No commit, remote, push, account, service integration, or deployment was created.

## Implemented

- Responsive React introduction and honest planner placeholder, with a real same-page CTA.
- Semantic landmarks, heading hierarchy, keyboard skip link, focusable anchor destinations, visible focus rings, system fonts, and static styling without animation.
- Strict TypeScript, Tailwind theme tokens, ESLint, and three focused React Testing Library/Vitest tests.
- One npm lockfile, development/preview scripts, and a typechecked production build.
- Read-only GitHub Actions workflow and project conventions/architecture documentation.

Files added: `index.html`, `package.json`, `package-lock.json`, `.nvmrc`, `.gitignore`, `tsconfig.json`, `vite.config.ts`, `eslint.config.js`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`, `src/App.test.tsx`, `src/test/setup.ts`, `.github/workflows/ci.yml`, `AGENTS.md`, `README.md`, `docs/decisions.md`, this progress log, and browser evidence under `docs/evidence/`.

## Validation evidence

Executed with Node **24.19.0** and npm **12.2.0**. The shell initially had neither on PATH. Validation used Codex's bundled Node and official npm downloaded into temporary storage, with a temporary npm launcher; no machine-wide runtime installation was made. Normal user setup is documented in README.

| Check | Actual result |
| --- | --- |
| `npm install` | Passed; generated package-lock.json |
| `npm ci` | Passed; 246 packages installed from lockfile; audit reported 0 vulnerabilities |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings |
| `npm test` | Passed: 1 file, 3 tests |
| `npm run build` | Passed, including TypeScript; Vite built 16 modules |
| `npm run dev -- --host 127.0.0.1` | Served successfully on port 5173; browser loaded page |
| `npm run preview -- --host 127.0.0.1` | Served built output successfully on port 4173; browser loaded page |

Initial test failures exposed missing whitespace around heading line breaks; markup was corrected and all checks rerun successfully. Initial server launch was blocked by the sandbox; the approved local-server retry succeeded. An initial attempt to use npm's shell launcher with the bundled standalone Node failed; the temporary launcher resolved that environment issue before the successful clean install.

npm 12 blocked the optional macOS `fsevents@2.3.3` install script by default. No script approval was added. Installation, checks, development serving, and production preview succeeded with this default. This is an install warning, not a failed check.

### Browser checks

Inspected in the Codex in-app browser:

- Development page at 1280 × 900: readable desktop layout; document scroll width and viewport width both 1280px.
- Tab revealed the skip link with a visible red 3px outline. Enter changed the fragment to `#main-content` and focused the main landmark.
- Next Tab focused “Plan your route” with a visible gold outline. Enter changed the fragment to `#route-planner`, scrolled, and focused the planner section.
- Production preview at 375 × 812: readable single-column layout and planner text; document scroll width and viewport width both 375px. Repeated keyboard skip-link and CTA activation successfully; planner destination had visible focus.
- Production preview at 1280 × 900: readable desktop layout; scroll width 1280px. Mouse activation of CTA reached and focused the planner section.
- Browser logs returned no warnings or errors on the checked development or production page.
- No provider accounts, keys, fonts, or remote runtime services were needed.

Saved production screenshots: [desktop](evidence/desktop.jpg), [mobile](evidence/mobile.jpg). Browser focus/scroll behaviour was checked directly; jsdom tests are only markup/destination contract checks.

## Checks not performed and remaining limits

- Hosted GitHub Actions was not run: no remote/push was requested. Local command success is not a hosted CI result.
- No deployed smoke check or provider authentication, response, attribution/licensing, or quota verification: these are explicitly outside this task. Owner-supplied prior research is labelled in decisions.md.
- No exhaustive cross-browser, assistive-technology, or physical-device audit. Responsive checks used browser viewport overrides.
- The route builder, catalogue, maps, walking directions, URL sharing, persistence, and backend are not implemented.

Development and production-preview servers were stopped after validation; restart with the README commands.

## Suggested next review

Review and accept this foundation's copy, visual design, accessibility, tooling, and documented future contracts. Establish the first accepted commit only after review. Do not advance to catalogue creation, route features, provider integration, or deployment as part of this task.

Suggested commit message: `chore: establish Baubled local application foundation`

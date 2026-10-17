# Progress

## Current status — 17 October 2026

**Milestone 1: Accepted and complete — 17 October 2026.** The owner reviewed and accepted the deployment verification report, explicitly retaining the outstanding physical-device, cross-browser and screen-reader testing limitations. The local React/Vite foundation, GitHub version control, hosted CI and public skeleton at [baubled.vercel.app](https://baubled.vercel.app/) have supporting evidence below. Milestones 2–8 are planned, not implemented.

**Review status:** the owner authorised publishing only docs/deployment.md, docs/decisions.md and this record with commit subject `docs: complete Baubled milestone 1 deployment`, followed by a normal push to origin/main and verification of its CI/Vercel results. Physical-device, cross-browser and screen-reader testing remain **Unverified**, not waived or reported as passed. Milestone 2 implementation and hosting-setting changes are not authorised.

**Application baseline:** [`0293e6da409815bc894c98fad5c0f676b2037e7e`](https://github.com/rickybyrne/Baubled/commit/0293e6da409815bc894c98fad5c0f676b2037e7e), `feat: initialise Baubled application foundation`, committed 16 October 2026 at 16:43:16 Europe/Dublin. Documentation publication does not change this application baseline. Hosted verification and the owner's explicit acceptance complete Milestone 1.

**First verified deployed source / pre-finalisation HEAD:** [`d7bbe20562a3865cea696f62488faababfffa8aa`](https://github.com/rickybyrne/Baubled/commit/d7bbe20562a3865cea696f62488faababfffa8aa), `docs: establish Baubled product plan`. During public verification, GitHub's main-branch and commit-check APIs confirmed this SHA and [Validate run 38981639259](https://github.com/rickybyrne/Baubled/actions/runs/38981639259) completed successfully. The Vercel dashboard linked the production domain to the same SHA. Local `main` and its existing `origin/main` tracking ref agreed. Preparation began with a clean tree; verification and finalisation began with the three uncommitted preparation/verification documents, which were preserved and updated. The application and configuration remain unchanged. The finalisation commit's own CI and any automatic deployment are checked after pushing and reported in the publishing handoff; earlier results are not attributed to that new commit.

## Repository and GitHub preflight — verified during 16 October reconciliation

- Canonical directory and `git rev-parse --show-toplevel`: `/Users/rickybyrne/Documents/ChatGPT/baubled`.
- Branch: `main`, tracking `origin/main`; initial working tree was clean. `git log -5 --format=fuller` shows the single foundation commit above.
- `origin` fetch/push URL: `https://github.com/rickybyrne/Baubled.git`.
- `git ls-remote origin refs/heads/main` returned the same full SHA as local HEAD. GitHub metadata confirms `rickybyrne/Baubled` is public, nonempty, and defaults to `main`.
- GitHub's [Validate run 38926238221](https://github.com/rickybyrne/Baubled/actions/runs/38926238221), triggered by the foundation push on 16 October at 16:43:25 Europe/Dublin, is **completed / success** for that SHA. Read using `gh run list --repo rickybyrne/Baubled --commit 0293e6da409815bc894c98fad5c0f676b2037e7e`; this is hosted evidence, not an inference from local commands. Individual job logs were not re-audited.
- The 20 tracked baseline files contain application code, tests, tooling, documentation, and two intentional evidence images. `node_modules/` and `dist/` are ignored and untracked. The tracked-file/lockfile review found no credential files or credential-bearing registry URLs; all 291 resolved package URLs use the official npm registry. This is a scoped review, not a forensic secret audit of the machine.
- The obsolete project was not read for implementation/history, imported, changed or deleted. No remote change, fetch into local refs, commit, push, history rewrite, GitHub mutation, account creation or deployment occurred during this task.

The earlier instructions to create the first commit/push are superseded: both already exist. There is no repository setup to repeat. The 16 October reconciliation ended with six unstaged documentation files: AGENTS.md, README.md, docs/product-brief.md, docs/backlog.md, docs/decisions.md and this file. The new brief/backlog were untracked at that handoff. On 17 October the owner authorised staging and publishing exactly those six files.

## Documentation changes from the 16 October reconciliation

- `docs/product-brief.md`: authoritative long-term launch requirements, data/routing/URL contracts, deferred scope, €0 boundary, definition of done, and learning expectations.
- `docs/backlog.md`: eight milestones, each with objective, deliverables, dependencies, acceptance, risks, manual checks and suggested commit checkpoints, plus task/review gates.
- `docs/decisions.md`: accepted architecture versus historical 14 October research, provisional providers and outstanding verification gates.
- `AGENTS.md`: durable conventions and links to the plan; task/approval boundaries; no repeated foundation/Git setup.
- `README.md`: accurate intended product versus implemented placeholder, documentation links, existing commit and hosted CI evidence.
- `docs/progress.md`: current verified Git/CI state, fresh validation, clearly dated historical reports and remaining work.

The full product scope replaces the earlier interpretation that a homepage/placeholder defined the finished product. The €0 provider combination remains provisional; this task does not convert historical research into an approved integration. The initial prohibition on deployment during the foundation task is distinguished from the roadmap's future, separately approved hosted-skeleton work.

## Foundation preserved

Source inspection confirms a static React introduction, “Plan your route” fragment link, honest planner placeholder, semantic landmarks, skip link, focusable anchor destinations, visible focus styles, responsive Tailwind theme and system fonts. There are three focused markup/destination tests, strict TypeScript, ESLint, a typechecked Vite build and a read-only GitHub Actions workflow.

No catalogue, route editing/state, maps, walking directions, URL sharing, persistence, authentication, backend or analytics exists. No product functionality was added. Source, tests, dependency manifests/lockfile, configuration and existing evidence images have no diff against the foundation commit.

## Foundation validation — performed during 16 October reconciliation

Normal shell PATH still has no Node/npm. This task reused the bundled Node **24.19.0** executable and existing temporary npm **12.2.0** launcher at `/private/tmp/baubled-bin/npm`, plus a temporary cache. No machine-wide runtime or shell configuration was installed/changed. README documents normal user setup; the temporary launcher is not a portable project prerequisite.

| Command/check | Actual outcome |
| --- | --- |
| `npm ci --cache /private/tmp/baubled-npm-cache --prefer-offline` | Passed; 246 packages installed from the unchanged lockfile. Optional `fsevents@2.3.3` install script remained blocked by npm's default policy. No new dependency or script permission added. |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, zero warnings |
| `npm test` | Passed: 1 test file, 3 tests |
| `npm run build` | Passed, including TypeScript; Vite built 16 modules |
| `npm run dev -- --host 127.0.0.1` | Served on port 5173 after approved sandbox retry |
| `npm run preview -- --host 127.0.0.1` | Served on port 4173 after approved sandbox retry |
| `git diff --check` | Passed; no whitespace errors |
| Local documentation link and roadmap structure checks | Passed; local Markdown file targets exist and all eight milestones include the required planning fields. External source links were not revalidated as current policy. |
| `git diff --exit-code HEAD -- src package.json package-lock.json .nvmrc .github vite.config.ts tsconfig.json eslint.config.js index.html .gitignore docs/evidence` | Passed; foundation source, tests, dependencies, config and existing images preserved |

The install output did not establish a fresh vulnerability-audit result; do not reuse the historical “0 vulnerabilities” claim as a current finding. GitHub requests initially failed under sandbox DNS restrictions and succeeded with read-only escalated retries. Local servers initially failed with sandbox `EPERM` and succeeded after approval. These were environment restrictions, not application failures.

### Browser verification on 16 October

Used the Codex in-app browser against the unchanged app:

- Development at 1280×900: readable desktop page; document scroll width equalled viewport width (1280px). Tab exposed the skip link with a visible red 3px outline. Enter reached and focused `#main-content`; next Tab focused the CTA with a gold 3px outline; Enter reached and focused `#route-planner`.
- Development at 375×812: single-column mobile layout inspected; scroll width 375px, no horizontal overflow.
- Production preview at 375×812: scroll width 375px; keyboard skip/CTA sequence again reached and focused the correct destinations with visible outlines; planner text and footer were readable.
- Production preview at 1280×900: desktop layout inspected; scroll width 1280px; mouse activation of CTA reached and focused the planner.
- Development and preview browser logs returned no warnings/errors in the checked sessions.

Temporary browser tabs were closed, the viewport override reset, and both servers stopped after checking. No replacement evidence images were added; existing [desktop](evidence/desktop.jpg) and [mobile](evidence/mobile.jpg) images remain historical screenshots. Browser observations above were performed anew; jsdom tests alone do not establish these behaviours.

## Historical validation — retained as reports

These entries summarise prior project records, not checks newly performed by this planning task. The full earlier log remains available in the foundation commit.

- **14 October foundation task:** reported Node 24.19.0/npm 12.2.0, successful install/clean install/typecheck/lint/3 tests/build, and an audit result of 0 vulnerabilities. Initial heading-whitespace test failures were corrected before the recorded pass. Dev desktop and preview mobile/desktop checks covered keyboard anchors, focus, overflow and console output; the two committed screenshots were captured then. The optional fsevents script warning did not prevent validation. At that time, there was no commit/remote/deployment; that historical state is no longer the current repository state.
- **16 October pre-commit task:** reported clean installation, typecheck, lint, 3 tests, build and repeat browser checks passing; audit reported 0 vulnerabilities. It recorded owner authorisation for initial GitHub setup but left the push/hosted CI result pending. The live repository/CI verification above resolves that pending evidence without repeating setup.

## Unperformed checks and outstanding decisions — updated 17 October

- The public homepage/placeholder is verified at [baubled.vercel.app](https://baubled.vercel.app/); the full planning journey does not exist yet and has not been tested.
- Vercel Hobby policy was checked during preparation; the actual plan, build settings, deployment and billing controls were inspected during verification. Map/directions pricing, licence/storage, credentials and live routing remain unverified; their 14 October research remains historical in decisions.md. No map/directions provider account or credential was used.
- No cross-browser matrix, physical touch-device or screen-reader audit was performed; viewport checks are not evidence of all devices or assistive technologies.
- The reconciliation's hosted success applies to the foundation SHA. The deployed documentation SHA now has separately verified GitHub Actions success, Vercel build/deployment success and public browser/HTTP evidence. These are distinct checks.
- Provider credential placement, free-plan enforcement/eligibility, permitted data/result use and caching, catalogue ID/status/source conventions, exact URL grammar/length/history policy, and code/dataset licensing remain decisions for scoped future tasks.

## Documentation publication review — 17 October 2026

All six intended Markdown files were rendered with GitHub-flavoured Markdown support in a temporary local preview and inspected in the browser. Headings, lists, inline/fenced code, links and tables rendered correctly, including both decisions tables and the progress validation table. Local file targets and the cross-document workflow anchor were checked; external URLs were checked for syntax, not reverified as current provider policy. No accidental literal Markdown escaping, missing table columns or substantive duplicated content was found.

Final corrections record the owner's product approval and publication authorisation, date the earlier foundation HEAD/CI evidence, and distinguish the completed planning review from outstanding deployment work. No product scope or implementation changed. The temporary renderer and HTML previews are outside the repository and are not part of the commit.

The application, tests, manifests, lockfile, configuration and existing evidence images match the foundation commit. The six-file review found no credential patterns or unrelated/generated outputs. The 16 October local application/browser checks remain dated evidence; they were not repeated for those documentation-only corrections. Publication subsequently completed as `d7bbe20`; its outcome is recorded in the current status above.

## Deployment preparation — 17 October 2026

Read AGENTS.md, the product brief, backlog, decisions, progress, source, package scripts, runtime pin and CI configuration. `git log`, `git remote -v` and `git status` confirm the existing canonical project; no foundation or Git setup was repeated. Official Vercel Hobby, pricing, fair-use, Vite, build, npm, Node, Git and project-creation documentation was checked. Current findings and limitations are in [decisions](decisions.md#verified-hosting-recommendation--17-october-2026); the reproducible instructions are in [deployment preparation](deployment.md).

The homepage is ready for an approved first deployment with the prepared dashboard settings. No source/configuration change is needed. It requires no app environment variables, secrets, backend or paid integration. The tracked-file inventory contains no credential files or new unrelated/generated content; this is a scoped repository review, not a forensic secret audit. Source, tests, dependencies, lockfile, configuration and evidence images have no diff against `d7bbe20`.

Fresh local checks used the existing bundled Node **24.19.0** and temporary npm **12.2.0** launcher/cache; no machine-wide runtime or shell configuration was changed.

| Check | Outcome on 17 October |
| --- | --- |
| Clean `npm ci` using the temporary cache | Passed: 246 packages; optional `fsevents@2.3.3` install script remained blocked by npm's default policy |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed, no warnings |
| `npm test` | Passed: 1 file, 3 tests |
| `npm run build` | Passed, including TypeScript; 16 modules; output `dist/` |
| npm version override | `npx --yes npm@12.2.0 --version` returned 12.2.0 after a sandbox DNS retry |
| Proposed npm command wrappers | `npx --yes npm@12.2.0 ci` and `npx --yes npm@12.2.0 run build` passed locally with the temporary runtime/cache; hosted execution was unverified at preparation and subsequently passed as recorded below |
| Development and production browser checks | Passed in the Codex in-app browser at 375×812 and 1280×900; details below |
| Application/configuration diff against published HEAD | Empty |
| Documentation checks | Local links/heading anchors, table columns, literal-escape checks and `git diff --check` passed |

Development and preview both showed readable layouts with document widths matching the 375px and 1280px viewports. Keyboard checks in development desktop and preview mobile exposed the skip link with a red 3px outline, focused `#main-content` on Enter, then exposed the CTA with a gold 3px outline and focused `#route-planner` on Enter. Production desktop mouse activation reached the same destination; refresh at the fragment loaded the page. Checked browser logs had no warnings/errors. The mobile planner section and footer remained readable. These were fresh observations, not assumptions from the tests or historical screenshots.

Local dev initially hit sandbox `EPERM`; approved local-server execution allowed dev and preview inspection. A separate npm-wrapper version check initially hit sandbox DNS restrictions and succeeded on retry. Temporary browser tabs were closed, the viewport override reset and both local servers stopped. Generated `dist/` and installed dependencies remain ignored. No new screenshot, dependency, credential or service configuration was added.

Only documentation changed during preparation: this evidence record, the hosting decision in decisions.md, and the new deployment guide. A scoped credential-pattern check found no matches in tracked text, and no root `.env*` files were present. No staging, commit, push, GitHub mutation, Vercel account creation or deployment occurred during preparation. At that handoff, no public URL or hosted runtime had been tested. The later verification below supplies that evidence; physical-device, cross-browser and screen-reader checks remain unperformed.

## Public deployment verification — 17 October 2026

The owner supplied the public URL after initially supplying the private project dashboard. Read-only GitHub API queries, the authenticated Vercel dashboard, public browser checks and separate unauthenticated HTTPS requests established the results below. The full observations, links and limitations are recorded in [deployment and verification](deployment.md#verified-first-deployment--17-october-2026).

| Milestone 1 criterion | Evidence and result |
| --- | --- |
| Reproducible checked foundation | Same-day clean install, typecheck, lint, 3 tests, build and local dev/preview checks passed during preparation above. A fresh diff confirms source, tests, manifests, lockfile and config still match HEAD; local checks were not needlessly repeated for this hosted review |
| Canonical GitHub source / CI | At first-deployment verification, live GitHub main and local HEAD were `d7bbe20562a3865cea696f62488faababfffa8aa`; commit check `validate` was completed / success |
| Actual production deployment | [Deployment 5K8bEkTubuS4NL6896F661i61GdA](https://vercel.com/ricky-cea5/baubled/5K8bEkTubuS4NL6896F661i61GdA) is Ready / Production and lists `baubled.vercel.app`; source link is the intended SHA. Dashboard timestamp: 17 October 2026, 15:40:28 GMT+1; duration 18s |
| Hosted build compatibility | Node 24.21.0 satisfies the existing engine range. Saved Vite settings and npm 12.2.0 wrappers match the guide; hosted log shows successful install, TypeScript check and build |
| Public access and assets | Unauthenticated HTTPS GET returned 200 with no login redirect. Published JS and CSS returned 200 with correct content types; filenames match hosted build output |
| Desktop/mobile usability | Public browser checks at 1280×900 and 375×812 passed: readable layout, no horizontal overflow, keyboard skip/CTA destinations, visible 3px focus, pointer CTA and refresh; no checked console warnings/errors |
| €0 configuration | Direct billing inspection confirms Hobby Active, no payment methods, displayed paid add-ons off, AI auto-reload off; project integrations empty, Basic build machine and on-demand concurrent builds disabled |
| Honest delivered scope | Public copy clearly identifies the planner as coming soon. No app features, dependencies or framework changes were made |

The public browser checks are viewport-based; no physical phone, real touch interaction, cross-browser matrix or screen-reader test was performed. The independent HTTP checks used no cookies or authorisation, so public-access evidence does not depend on the dashboard's authenticated session. Browser viewport overrides were reset and temporary review tabs closed after inspection.

The hosted log contains non-blocking npm warnings about unknown `cache-dir` environment configuration and future npm-major compatibility. No build failure or engine mismatch occurred. Vercel has **No checks configured** for deployment promotion; the current GitHub Actions success was verified separately. Future pushes to `main` can deploy automatically, so approval/review before pushing remains important.

The initial GitHub deployments endpoint returned an empty list; the commit's successful Vercel status and dashboard supplied the actual deployment evidence. Sandbox DNS blocked initial GitHub/HTTPS requests; approved network retries succeeded. The initial dashboard login barrier was resolved during the session. No secrets, billing changes, deployments, new features, staging, commits or pushes were introduced by this verification task.

## Milestone 1 acceptance and publication — 17 October 2026

**Accepted:** the owner explicitly approved Milestone 1 as complete after reviewing the evidence above. No blocking issue was found. The physical-device, cross-browser and screen-reader limitations remain outstanding, and the hosted npm warnings remain non-blocking observations. This acceptance does not claim the full pub-planning product is implemented or approve Milestone 2 work.

The authorised publication contains only docs/deployment.md, docs/decisions.md and this file, with subject `docs: complete Baubled milestone 1 deployment`. The post-push handoff records the resulting SHA, its own GitHub Actions result and Vercel production status; these results cannot be claimed in this pre-publication record. A push may trigger the existing Vercel Git integration; no manual redeployment or settings change is part of this task.

**Recommended first Milestone 2 task, not started:** perform a documentation-only €0 provider gate for MapLibre GL JS with MapTiler Free and openrouteservice. Check current official eligibility, billing/card requirements, quotas and resets, provider-enforced rejection/suspension versus paid overages, browser-key restrictions, attribution/storage terms and ordered 12-stop pedestrian capability. Record dated sources and a pass/fail decision, proposing a safer alternative if any candidate cannot enforce €0. Do not create accounts, obtain keys, install packages or send live routing requests in that first task.

**Learning note:** Vite turns source into static files; Vercel builds a Git commit and serves those files through its production domain. Trace Git SHA → npm install → TypeScript/Vite build → dist assets → browser. Debugging exercise: if CI is green but the public page is old, compare the production deployment's SHA and domain assignment before changing application code. The trade-off is simple static hosting and enforced free limits in exchange for possible quota-related unavailability and provider-managed Node patch updates.

# Progress

## Current status — 17 October 2026

**Milestone 1: in progress.** The local React/Vite foundation, GitHub version control and a hosted CI pass are established. Public hosting and deployed-skeleton verification remain outstanding. Milestones 2–8 are planned, not implemented.

**Review status:** the owner has **Accepted** the overall product direction and authorised documentation finalisation, a commit with subject `docs: establish Baubled product plan`, and a normal push to existing `origin/main`. This approval is limited to the six planning Markdown files. No deployment, application change or new milestone is authorised. Acceptance of the entire Milestone 1 remains **Unverified** pending its public deployment gate and owner observations.

**Application baseline:** [`0293e6da409815bc894c98fad5c0f676b2037e7e`](https://github.com/rickybyrne/Baubled/commit/0293e6da409815bc894c98fad5c0f676b2037e7e), `feat: initialise Baubled application foundation`, committed 16 October 2026 at 16:43:16 Europe/Dublin. The documentation publication does not change this application baseline or complete the hosted-skeleton milestone. Its own commit hash and Actions outcome are verified after pushing and reported in the publishing task handoff; see [commit history](https://github.com/rickybyrne/Baubled/commits/main/) and [workflow runs](https://github.com/rickybyrne/Baubled/actions/workflows/ci.yml).

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

## Unperformed checks and outstanding decisions

- No public deployment or deployed journey has been tested. The foundation has no deployment URL recorded.
- No fresh provider-policy/pricing/licence/storage verification, account/credential use, or live routing request occurred. The 14 October research remains labelled historical in decisions.md.
- No cross-browser matrix, physical touch-device or screen-reader audit was performed; viewport checks are not evidence of all devices or assistive technologies.
- The hosted success cited in the reconciliation record applies to the foundation SHA. The documentation publication's Actions result must be checked for its own commit after pushing; no success is inferred in advance.
- Provider credential placement, free-plan enforcement/eligibility, permitted data/result use and caching, catalogue ID/status/source conventions, exact URL grammar/length/history policy, and code/dataset licensing remain decisions for scoped future tasks.

## Documentation publication review — 17 October 2026

All six intended Markdown files were rendered with GitHub-flavoured Markdown support in a temporary local preview and inspected in the browser. Headings, lists, inline/fenced code, links and tables rendered correctly, including both decisions tables and the progress validation table. Local file targets and the cross-document workflow anchor were checked; external URLs were checked for syntax, not reverified as current provider policy. No accidental literal Markdown escaping, missing table columns or substantive duplicated content was found.

Final corrections record the owner's product approval and publication authorisation, date the earlier foundation HEAD/CI evidence, and distinguish the completed planning review from outstanding deployment work. No product scope or implementation changed. The temporary renderer and HTML previews are outside the repository and are not part of the commit.

The application, tests, manifests, lockfile, configuration and existing evidence images match the foundation commit. The six-file review found no credential patterns or unrelated/generated outputs. The 16 October local application/browser checks remain dated evidence; they were not repeated for these documentation-only corrections. Publication requires a normal push followed by verification of the new commit and its own hosted Actions result, without assuming success in advance.

## Remaining Milestone 1 work — no deployment authorised

The product direction is approved. After documentation publication, the next separately authorised task should verify current Vercel Hobby eligibility/charge prevention and prepare the existing skeleton for its first deployment. The foundation and Git setup do not need rebuilding. Actual account creation, deployment, any necessary configuration change and future commits/pushes still need explicit authorisation; no Milestone 2 feature is started automatically.

The documentation checkpoint `docs: establish Baubled product plan` and its normal push are authorised for this publication task. Complete Milestone 1 later by recording the actual deployed commit, hosted checks and public browser evidence before proceeding to the integration proof.

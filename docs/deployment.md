# Deployment and verification

## Tested activation candidate — 6 November 2026

**Ready for publication review; not activated or deployed.** The owner explicitly approved preparation/testing of the final activation code and asked to finish Milestone 2 by end of 6 November. That deadline does not waive publication, account/runtime-setting or live-test approval. The strict €0 policy, accepted building-point scope and residual availability risks remain unchanged.

The isolated candidate enables its two code gates. The server entry additionally requires exact `VERCEL_ENV=production`, exact `ROUTING_ENABLED=true`, a non-blank server-only key and the existing catalogue/origin/input checks. Browser live mapping additionally requires a production build, exact origin `https://baubled.vercel.app` and its public MapTiler key. Ordinary dev and preview remain offline. The exhausted local proof mode remains separately locked. Public copy describes an experimental integration proof and provider availability, retaining unverified-door disclosures; local/preview copy explicitly says services are disabled in that environment.

The Production credential records prepared earlier remain ORS Secret and MapTiler Config; no values were read from Vercel. No `ROUTING_ENABLED` setting was added. No push, main merge, deployment or provider request occurred. The currently published `bf98cb4` still has false gates. The following is the consolidated approval scope for the tested candidate:

1. Add project **Config** `ROUTING_ENABLED=true` for **Production only**, without altering keys, previews, billing, firewall, build or function settings. This switch affects the next deployment, not the existing one.
2. Recheck branch/remote state, fast-forward canonical `main` to the reviewed local candidate, and push normally to `origin/main`. This intentionally activates real public MapTiler/ORS usage through Vercel's automatic deployment. Verify Actions success and Vercel Ready against the exact resulting SHA; no force push or manual redeploy.
3. After the announced 07:30–11:30 UTC maintenance window has ended and provider availability is rechecked, run the **two-document / at most 100 MapTiler attempts / two ORS attempts** deployed proof detailed below. Preserve exact stop order; calls are two stops then twelve, at least 60 seconds apart, no retries. Stop on the first unexpected result and report it. Public visitors' traffic is separate from this operator budget. Complete the milestone only after those results and owner acceptance.

Validation: full `npm run verify` passed **164 tests in 13 files**, lint, strict TypeScript and build. The native Node ESM regression now exercises seven isolated environment/switch/key combinations, including the enabled path against a fake upstream and all disabled cases with zero upstream calls. It replaces the earlier static-entry test which captured configuration before its environment stubs. The fake upstream verifies the fixed URL, Authorization placement, no redirects and sanitised output. Browser-gate tests cover exact mode/origin, preview/lookalike/localhost origins and missing/blank keys; UI tests cover public/local/offline copy without weakening location disclaimers. Existing routing, map, cancellation, quota and secret-file tests remain.

Browser verification used ordinary dev and production preview at 375px/1280px: no horizontal overflow, keyboard skip link/CTA and visible focus, twelve-stop restoration, reordered three-stop reload and unavailable-route feedback preserving plan/share links. Console checks returned no warnings/errors. A second typechecked build with deliberately fake public/server sentinels included only the public map sentinel; the ORS value/name/upstream URL were absent. Reloading that build on localhost still produced the offline map. No real key or provider request was needed. Public-mode copy is automated-test evidence until the approved hosted proof; physical-device and screen-reader checks remain unperformed.

The known MapLibre chunk-size warning remains. The temporary npm launcher had lost a file; restored npm 12.2.0 from its existing archive after checking its SHA-512 against the saved registry metadata. No project dependency, lockfile, CI, platform configuration or machine-wide runtime change was needed. Canonical main and remote main were read-only checked at `bf98cb40ec18e4467519616733dc01319fb61e1a`; the workflow-overhaul ancestor and preserved Task 2 ref remain intact.

## Production live-proof preparation — 6 November 2026

**Prepared, not deployed. Milestone 2 remains In progress.** The owner authorised Production-only credential setup and preparation of the publication checkpoint after the successful local proof. This is not permission to open release gates, merge/push, deploy or make further provider calls. The published offline source remains `bf98cb40ec18e4467519616733dc01319fb61e1a`; the tested local feature checkpoint is `ddfcc6c4785ad1e2305b5a67a98efb0982d813e8` on `codex/m2-live-proof`. Both code-owned provider gates remain **false**.

### Saved configuration and financial boundary

The authenticated dashboard was inspected across 5–6 November, without changing billing, firewall or function/build settings:

- Hobby Active; no payment method; displayed paid add-ons, Flat Rate CDN and AI auto-reload off. Basic build machine; on-demand concurrent builds disabled. No custom firewall rules, IP blocking or system-bypass rules; Bot Protection off. No metered rate-limit control was activated.
- Functions: Fluid Compute already enabled, Standard 1 vCPU / 2 GB, one region (`iad1`). The existing repository function configuration keeps a 15-second platform duration and cancellation support; the handler separately bounds upstream work to ten seconds. These limits and warm-instance counters do not establish global abuse prevention.
- Vite, Node 24.x, repository-root build, `dist`, install override `npx --yes npm@12.2.0 ci`, build override `node --version && npx --yes npm@12.2.0 run build`. Production tracks `main`; previews track other Git branches. No deployment checks configured: Actions and Vercel run independently.
- Project variables initially empty. After owner entry, the dashboard lists exactly the two records below, both Production only; no shared variables are linked. No Preview/Development values or routing-enable variable were added. Values were not revealed or read back. ORS's empty edit box is expected for a write-only Secret and does not establish an empty saved value; its correctness is still unverified until an approved live request.

| Project variable | Type / exposure | Scope / state |
| --- | --- | --- |
| `ORS_API_KEY` | Secret, server-only; never a `VITE_` variable | Production only; saved by owner, value validity unverified |
| `VITE_MAPTILER_KEY` | Config, intentionally public browser key | Production only; saved by owner; allowed origin confirmed as only `baubled.vercel.app` |
| `ROUTING_ENABLED` | Server Config, exact value `true` would enable the runtime switch | Absent; setting it for activation requires the next approval |

Create the two credential records separately because Vercel applies the form's Type to all added rows. Keep the MapTiler `VITE_` prefix; its public-exposure warning is expected. Keep ORS Secret. Credential entry and Save are owner actions, with no values in chat, screenshots or repository. Do not use a shared/team variable for this project or copy keys into previews. The local ignored file remains owner-only, and its exhausted proof ledger stays halted.

Official sources rechecked 5–6 November: [environment variables](https://vercel.com/docs/environment-variables) apply only to new deployments, and [Config/Secret documentation](https://vercel.com/docs/environment-variables/sensitive-environment-variables) describes public Config versus write-only Secret values. Secrets are also available to builds: review trusted source before any approved production deployment, and never log/export ORS from build code. The [Hobby plan](https://vercel.com/docs/plans/hobby) retains free personal/non-commercial limits; the [pricing FAQ](https://vercel.com/pricing) says Hobby cannot purchase additional usage. This supports the current €0 configuration, not guaranteed availability or protection against later owner upgrades. The accepted residual abuse/quota risks in [decisions](decisions.md#milestone-2-live-proof-preparation--5-november-2026) still apply.

### Concrete activation/publication checkpoint — approval pending

The next requested approval must explicitly cover the following activation changes, verification and publication. None has happened in this preparation:

1. Prepare the small activation diff on the isolated branch: open the two code gates, require exact `VERCEL_ENV=production` plus `ROUTING_ENABLED=true` at the server entry, and restrict browser activation to a production build on exactly `https://baubled.vercel.app`. Local/preview/no-key cases stay closed. Update public proof copy without claiming surveyed doors or milestone acceptance. Add deterministic activation, native Node startup and copy regressions, then rerun full verification and browser checks without real keys/providers.
2. Review the entire integrated diff and secret/bundle/history checks. Preserve canonical main and the retained Task 2 branch; confirm remote main has not advanced. Set only the Production server Config `ROUTING_ENABLED=true` after explicit activation approval. Existing deployments do not change when variables are saved.
3. Only after passing those checks and explicit publication approval: commit the reviewed diff, fast-forward canonical main to the approved descendant, push normally to `origin/main`, and verify Actions plus automatic Vercel Ready for the exact resulting SHA. Do not force-push, manually redeploy, activate WAF or change billing. Stop for an unexpected remote/history/deployment discrepancy.
4. Perform the separately approved bounded deployed proof below, then request milestone acceptance. A successful build or saved environment variable is not live evidence.

### Proposed deployed proof budget — not yet authorised

Before running, recheck provider availability and account plans/restrictions. Avoid announced HeiGIT maintenance on 6 November, 07:30–11:30 UTC. Bind the source, Actions and Vercel evidence to the exact approved SHA before opening the live page.

- At most **two fresh production documents**, each protected by the existing **50-attempt MapTiler transport cap**: at most **100 MapTiler HTTP attempts** in this operator's proof. Resize those documents for 1280px/375px checks; no extra reloads, provider demo pages or separate origin probes. Failures and cancellations count. This is an operator test budget, not a global public traffic limit; other visitors can consume quota independently after activation.
- At most **two ORS Directions attempts**, at least **60 seconds apart**, with no retries: first `p001,p002`; then a fresh shared URL restoring `p001` through `p012` in exact order, followed by one explicit twelve-stop request. Restoration itself must not request directions. Reserve attempts before dispatch and stop at the first unexpected result; do not reuse/reset the exhausted local ledger.
- Verify real street tiles, twelve sourced building markers, required credits/logo, exact URL/order retention, eleven consecutive walking legs, validated geometry/snaps/metrics and readable English instructions. Inspect the street-following line and arrival context while retaining all unverified-door disclaimers. Exercise CTA/keyboard/mobile layout without creating extra documents. Confirm no ORS credential in the built frontend or returned payloads; avoid recording raw headers/provider bodies. Record counts, time, source SHA, UI evidence and limitations.
- Use deterministic tests for auth/quota/timeouts/malformed data/cancellation and unavailable map states. Never exhaust quotas or intentionally submit a bad live key to test error UI. No live response or tile caching/persistence is approved.

Emergency procedure: stop test traffic and report the evidence; the owner can revoke ORS credentials to stop their use across old and new deployments, or separately approve an included static deny rule after checking its current cost/configuration. For a durable code/config shutdown, set `ROUTING_ENABLED=false` and publish an approved disabled build. Environment changes alone do **not** immediately stop an existing deployment or invalidate old immutable deployment URLs. MapTiler origin restrictions remain production-only; do not remove them to troubleshoot. No automatic retry, upgrade or paid fallback is allowed.

## Historical Milestone 1 deployment record

The following sections are preserved as the original dated foundation evidence; statements about no API functions or environment variables describe that earlier scope.

Checked 17 October 2026. The owner connected GitHub and initiated the first deployment after preparation. The public homepage is verified at **[baubled.vercel.app](https://baubled.vercel.app/)**. The owner subsequently **Accepted Milestone 1 as complete**, retaining the documented testing limitations. The verification review made no account, billing, deployment or GitHub changes. A subsequent finalisation task is authorised to commit/push only the three deployment documents and verify CI plus any automatic production deployment.

## Verified first deployment — 17 October 2026

| Evidence | Verified result |
| --- | --- |
| Production URL | [https://baubled.vercel.app/](https://baubled.vercel.app/) |
| Vercel deployment | [5K8bEkTubuS4NL6896F661i61GdA](https://vercel.com/ricky-cea5/baubled/5K8bEkTubuS4NL6896F661i61GdA), Ready, Production; this deployment lists the public domain |
| Deployment timestamp / duration | Dashboard shows 17 October 2026, 15:40:28 GMT+1; 18 seconds |
| Source | `main`, full SHA `d7bbe20562a3865cea696f62488faababfffa8aa`; matched local HEAD, live GitHub main and the dashboard's source link during first-deployment verification |
| GitHub evidence | The commit's Vercel status is success / Deployment has completed. Its [Validate job](https://github.com/rickybyrne/Baubled/actions/runs/38981639259/job/117243614614) is completed / success for the same full SHA |
| Hosted runtime and build | Node **24.21.0**, satisfying `>=24.19.0 <25`; log shows `npx --yes npm@12.2.0 ci`, successful TypeScript checking and Vite 8.3.4 building 16 modules |
| Public access | A fresh HTTPS request with no cookies or authentication returned **200** at the production URL, with normal certificate verification; no login redirect |
| Published assets | `/assets/index-DlF9z-s1.js`: 200, JavaScript, 222,435 bytes. `/assets/index-Bi07KbBC.css`: 200, CSS, 8,774 bytes. Names match the hosted build log |
| Desktop / mobile viewports | Codex in-app browser at **1280×900** and **375×812**; readable homepage/planner/footer, document scroll width equal to viewport width, no horizontal overflow |
| CTA and keyboard | Tab exposed the skip link; Enter focused `#main-content`. Next Tab focused Plan your route; Enter focused `#route-planner`. Both widths passed; red/gold 3px focus outlines were visible. Pointer activation also passed; measured CTA was about 217×65px |
| Refresh / console | Root and planner-fragment navigation/refresh loaded the homepage. No warnings or errors in the checked public browser session; no missing referenced CSS/JavaScript assets |

The initial GitHub deployments listing was empty, so it was not used as proof of absence. The commit status/check APIs and authenticated Vercel dashboard supplied the deployment/source evidence. The dashboard was initially behind login and became accessible during verification. Public access is established independently by unauthenticated HTTPS requests, rather than assumed from the dashboard browser's session.

The [billing page](https://vercel.com/ricky-cea5/~/settings/billing) was inspected directly: **Hobby Plan — Active**, no payment methods added, displayed paid add-on toggles off, Flat Rate CDN off, Flags Explorer unlimited overrides off, AI credit balance $0.00 and auto-reload off. [Baubled integrations](https://vercel.com/ricky-cea5/baubled/settings/integrations) showed **No Integrations Installed**. The deployment uses a Basic build machine with on-demand concurrent builds disabled; Web Analytics and Speed Insights are not enabled. No enabled chargeable add-on was found in these checked settings. This confirms the current €0 hosting configuration, not a guarantee against future owner changes or changed provider terms.

Non-blocking observations and limits:

- Hosted npm emitted warnings about an unknown `cache-dir` environment configuration and future npm-major compatibility. Installation, TypeScript and build still passed. No engine mismatch or application error was found; no setting or dependency was changed to suppress the warnings.
- Mobile checks used a browser viewport, **not a physical phone or touch-device test**. No cross-browser matrix or screen-reader audit was performed. These remain explicitly unverified; they are not reported as passed.
- The same-day local clean install, typecheck, lint, three tests, build and dev/preview browser results are recorded in [progress](progress.md). Application/configuration files still match the tested commit; those local commands were not repeated for this read-only hosted review.
- No product features were added. The public page accurately says the planner is coming soon. The owner accepted Milestone 1 on 17 October and authorised documentation publication; Milestone 2 has not started.

## Readiness and source

The local foundation passes its required checks. The first verified deployed source was `rickybyrne/Baubled`, branch `main`, commit [`d7bbe20562a3865cea696f62488faababfffa8aa`](https://github.com/rickybyrne/Baubled/commit/d7bbe20562a3865cea696f62488faababfffa8aa). GitHub Actions success was checked directly for this SHA. Recheck the source and CI before a future deployment if `main` changes.

No application, dependency, lockfile, CI or repository configuration change is required. Vercel has [native Vite support](https://vercel.com/docs/frameworks/frontend/vite). The existing build creates static HTML, JavaScript and CSS in `dist/`; it needs no Vercel plugin, CLI, backend or serverless function. The page uses root-page fragment links, with no nested client-side routes, so it needs no SPA rewrite or `vercel.json`. Reassess rewrites only if path-based navigation is introduced in a future approved task.

The homepage requires no environment variables, secrets, API keys, database, map service, analytics or paid integration. System fonts and local CSS avoid external font requests. GitHub account authorisation for the hosting integration is separate from application credentials; no token belongs in the repository or browser bundle.

## Hobby eligibility and the €0 boundary

Based on the owner's stated personal, non-commercial use and the current source, Baubled fits [Hobby eligibility](https://vercel.com/docs/plans/hobby). Vercel's [fair-use definition](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage) excludes commercial deployments such as selling services, paid site development or advertising. Reassess eligibility if the project's purpose changes.

Vercel's [pricing FAQ](https://vercel.com/pricing) states that Hobby accounts are limited to usage caps and cannot purchase additional usage. This supports **€0/month hosting without automatic usage overages** on Hobby. Use the included `vercel.app` address; do not choose Pro, a Pro trial, a domain purchase or paid services. The protection comes from the selected plan's caps, not a spend alert or a configurable €0 budget.

Current relevant [Hobby allowances](https://vercel.com/docs/plans/hobby) include 100 GB Fast Data Transfer and 1,000,000 CDN requests. Static assets still consume delivery/request allowances. If limits are exceeded, service can become unavailable; Vercel says most exceeded features require waiting until 30 days have passed. This matches the owner's acceptance of interruptions. Hobby has no paid overage fallback, and this review does not promise uninterrupted service or permanently unchanged terms.

The [general limits](https://vercel.com/docs/limits) include one concurrent build, 100 deployments/day and 45 minutes per build. None is a known blocker for this small static build. Use the existing personal GitHub repository; organisation/team hosting restrictions do not require moving it or upgrading. Hosting limits are independent of future map/directions provider limits, which remain unverified.

## Verified build settings and application requirements

The saved Build and Deployment settings were inspected on 17 October. Build/install/output overrides match the prepared commands. Vercel's Deployment Checks area says **No checks configured**; the successful GitHub Actions workflow is separate, not an automatic promotion gate.

| Setting | Value |
| --- | --- |
| Plan / destination | `ricky-cea5` — Hobby Active |
| Git repository | `rickybyrne/Baubled` |
| Project name | `baubled` |
| Production branch | `main` |
| Root Directory | Blank in the dashboard, meaning repository root; no subdirectory |
| Framework Preset | `Vite` |
| Node.js Version | `24.x`; see the runtime caveat below |
| Install Command — Override | `npx --yes npm@12.2.0 ci` |
| Build Command — Override | `node --version && npx --yes npm@12.2.0 run build` |
| Output Directory | `dist`; Override enabled |
| Development Command | Leave Vite's default; not needed for the hosted static site |
| Application environment requirements | None, established from source inspection |
| Domain | Included production `https://baubled.vercel.app/` |

The build command invokes the existing `build` script (`npm run typecheck && vite build`) and prints Node's actual version. Do not replace it with bare `vite build`, which would omit the existing TypeScript check. Keep development dependencies installed because the build tools need them.

The explicit npm wrappers are intentional: Vercel's [package-manager detection](https://vercel.com/docs/package-managers) does not guarantee that `packageManager: npm@12.2.0` alone selects that version. Its [npm guide](https://vercel.com/kb/guide/how-do-i-use-the-latest-npm-version-for-my-vercel-deployment) documents an `npx npm@version` install override. Both overrides select the repository's pinned npm without adding packages to its manifest or enabling experimental Corepack/environment settings. These are dashboard settings; no repository configuration is needed.

Vercel's [Node documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) supports 24.x and controls minor/patch updates. `engines.node` overrides the dashboard; this repository's `>=24.19.0 <25` keeps the selected major at 24. Vercel does not provide an exact 24.19.0 patch pin equivalent to `.nvmrc`. The first deployment printed **24.21.0**, which satisfies the requirement. For future builds, check the printed version remains **at least 24.19.0 and below 25**. If it is older, or npm/engine errors occur, stop and investigate; do not silently loosen the engine requirement.

## Original first-deployment procedure — retained for reproducibility

The owner has already performed the first setup/deployment. Do not repeat account creation or import. These are the prepared instructions, not a request to create another project; future external changes still need owner approval.

1. Open [Vercel signup](https://vercel.com/signup), choose personal use / **Hobby**, and continue with the existing GitHub account. If an account already exists, sign in and select its Hobby scope. Check the plan beside the selected scope; avoid the Pro trial and upgrade flow.
2. In the [dashboard](https://vercel.com/dashboard), select **Add New… → Project**. Under **Import Git Repository**, connect GitHub if necessary. In GitHub's Vercel app authorisation, choose **Only select repositories → Baubled** under `rickybyrne`, then return to Vercel. This authorisation is a future external change, not something performed during preparation.
3. Find **rickybyrne/Baubled** and click **Import**. Import the existing repository; do not choose a template, clone/create another repository or change the Git remote.
4. Confirm the Hobby destination, project name, root and **Vite** preset. Expand **Build and Output Settings**, enable the Install and Build overrides, and paste the exact commands above. Confirm `dist`; leave Environment Variables empty. Select **24.x** if the import screen exposes Node selection; the existing engine range also selects that major.
5. Review the configuration and source branch. **Deploy** starts the first build and public hosting; click it only after owner approval. Wait for **Ready**, inspect build logs and record the actual source SHA, Node/npm versions and production URL. A failed hosted build is not a completed deployment gate.
6. In **Project → Settings → Build and Deployment**, confirm the framework, commands, output and Node version. In **Settings → Environments → Production → Branch Tracking**, confirm `main`. In **Settings → Domains**, copy the assigned production `vercel.app` URL; the exact available name is not guaranteed in advance.
7. Check **Settings → Deployment Protection** and test the production domain while signed out. Ensure production is public; retain preview protection where offered. A protected preview/deployment URL is not evidence that the public production domain is inaccessible.
8. Check the selected scope still shows **Hobby** and review **Usage**. Do not add paid integrations or billing. Record the settings and results in [progress](progress.md).

The official [project creation guide](https://vercel.com/docs/projects/managing-projects) and [Git deployment guide](https://vercel.com/docs/git) describe this flow. Some npm documentation still calls the settings area General / Build & Development Settings; the current build guide calls it Build and Deployment. Use the matching named fields if the layout differs.

Connecting Git enables automatic production deployments on later pushes to `main`, and previews for other branches. GitHub Actions remains a separate validation workflow; connecting Vercel does not by itself make that workflow an approval gate. Continue reviewing and approving changes before pushing. No new GitHub deployment workflow or repository token is needed.

## Verification checklist for future deployments

1. Confirm Vercel **Ready**, the approved Git SHA and successful hosted CI for that SHA. Record the deployment URL/time and build log runtime versions. If a different commit was deployed, verify that commit rather than borrowing earlier evidence.
2. Open the production HTTPS address signed out/in a private window. Confirm there is no login barrier, the correct Baubled title/homepage appears, and HTML/CSS/JavaScript load without failed requests or console errors. Refresh `/` and `/#route-planner`; the current site has no other application paths.
3. Inspect desktop at 1280×900 and mobile at 375×812: readable layout, no horizontal overflow, CTA at least 44px, planner placeholder and footer. Repeat on an actual phone browser for touch and a desktop browser for keyboard; record actual browsers/devices rather than claiming a broad compatibility audit.
4. Use Tab to expose the skip link; Enter must focus `#main-content`. Tab to **Plan your route**, check visible focus, and activate it with Enter, mouse and touch as available. It must reach `#route-planner`, with honest “coming soon” text and no claim that route building works yet.
5. Record screenshots, console/network findings, exact commit/CI evidence and any unavailable device checks in [progress](progress.md). Review the Hobby plan/usage without deliberately exhausting quotas. Seek owner review before marking Milestone 1 Accepted or beginning Milestone 2.

No source-code or hosted-deployment blocker was found in this review. The owner accepted Milestone 1 and authorised publishing these records on 17 October. Physical-device, broader browser and screen-reader checks remain unperformed. Mapping, walking directions and catalogue work are outside this task. The evidence above describes the first deployment; verify any deployment triggered by the documentation push against its own source SHA and report its outcome in the publication handoff.

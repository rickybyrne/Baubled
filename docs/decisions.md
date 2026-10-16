# Architecture decisions

Updated 17 October 2026 following owner approval of the product direction. [Product brief](product-brief.md) owns scope and behavioural contracts, [backlog](backlog.md) sequences delivery, and [progress](progress.md) records evidence. An architectural decision does not itself authorise accounts, credentials, deployment, commits or a feature task.

## Accepted — canonical repository

The owner selected `/Users/rickybyrne/Documents/ChatGPT/baubled` and `https://github.com/rickybyrne/Baubled.git`. The React/Vite foundation is already committed and pushed: `0293e6da409815bc894c98fad5c0f676b2037e7e` (`feat: initialise Baubled application foundation`, 16 October 2026) was both local HEAD and live remote `main` during the 16 October verification. Its [hosted Validate run](https://github.com/rickybyrne/Baubled/actions/runs/38926238221) passed.

Do not recreate the initial commit, configure another remote, import the obsolete Next.js project/history, or reconcile its instructions. The owner's repository update supersedes the earlier empty-repository assumption. The obsolete directory remains untouched. The 16 October planning reconciliation did not authorise a commit or push. On 17 October, the owner explicitly authorised publishing the six planning Markdown files with commit subject `docs: establish Baubled product plan`; this does not authorise deployment or another milestone.

## Accepted — application architecture

Retain React/Vite, strict TypeScript, Tailwind's Vite integration, npm with one lockfile, ESLint, Vitest/React Testing Library, and GitHub Actions. The current single root page uses native fragment navigation and system/Georgia fonts; it needs no router, state library, provider or external font service. Theme tokens live in `src/styles.css`. Keep decoration subtle and respect reduced motion; the existing page has no animation or smooth scrolling.

React/Vite fits an interactive browser application with static data and URL sharing. A framework migration is not justified by CV value. Future editing will use pure operations and `useReducer`, separating ordered IDs, results for that exact order, and interface state; Context only where useful. Contain map-specific logic and normalise routing responses through one small module. This permits later provider migration without designing a generic provider framework now.

A backend is not the default. If credential policy or another concrete requirement demands a small serverless endpoint, propose its validation, rate limits and operating constraints before approval. A proxy alone neither guarantees quota protection nor controls separately metered map usage. Frontend environment variables are public. No persisted provider-response cache is assumed until storage terms are checked.

## Implemented tooling and historical selection rationale

Current manifests pin Node 24.19.0 (`.nvmrc`), npm 12.2.0, React/DOM 19.3.1, Vite 8.3.4, Tailwind 4.3.3, TypeScript 6.0.3, ESLint 10.12.0, Vitest 5.0.4 and React Testing Library 16.3.3. Full versions live in `package.json` and `package-lock.json`; this planning task does not update them. CI uses `.nvmrc` and matching npm; the production build includes TypeScript checking.

The 14 October foundation notes report verification against official npm metadata and selection of TypeScript 6.0.3 because typescript-eslint 8.71.2 supported `>=4.8.4 <6.1.0`, excluding the then-reported latest TypeScript 7.0.2. These selection claims are historical, not a fresh latest-version/compatibility survey in this task. Existing setup references:

- [Vite](https://vite.dev/guide/) and [Tailwind's Vite integration](https://tailwindcss.com/docs/installation/using-vite).
- [Vitest](https://vitest.dev/guide/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/setup/).
- [Node release lifecycle](https://nodejs.org/en/about/previous-releases) and [official npm metadata](https://registry.npmjs.org/).

Tests currently establish markup/destination contracts, not browser focus, layout, venue accuracy or live integration. Add a small Playwright suite later for meaningful journeys, keeping routine provider tests deterministic and separate from approved live smoke checks.

## Accepted — cost boundary; provisional — services

The operating budget is strictly **€0/month**. The owner accepts temporary feature unavailability at enforced limits. Free allowances, notifications, client-side counters and request cancellation do not guarantee protection from charges. Any future paid migration requires an explicit owner-approved change to this constraint.

The following is **owner-supplied historical research dated 14 October 2026**, not newly verified provider policy in this documentation task. Listing a candidate does not approve a production integration.

| Candidate | Historical rationale | Official starting points |
| --- | --- | --- |
| MapLibre GL JS | Intended open-source map renderer replacing Mapbox GL JS. Rendering is separate from tile-service usage policy. | [MapLibre](https://maplibre.org/projects/gl-js/), [React integration](https://visgl.github.io/react-map-gl/docs/get-started) |
| MapTiler Free | Reportedly pauses at quota and permits personal/non-commercial use without billing information. Earlier research listed 100,000 API requests/month and 5,000 SDK sessions/month; these are different measures, not interchangeable visitor allowances. It also listed one API key, so separate dev/prod keys cannot be assumed. | [Pricing](https://www.maptiler.com/cloud/pricing/), [terms](https://www.maptiler.com/terms/cloud/), [key/origin guidance](https://docs.maptiler.com/guides/credentials/api-key/) |
| openrouteservice Standard | Reportedly €0 with 2,000 Directions requests/day and 40/minute, errors/blocking at limits, and 50 waypoints. Prior research identified migration to `api.heigit.org` and CC BY-SA 4.0 licensing of results. Reverify the current endpoint, full instructions/leg contract, credential handling and result obligations. | [Plans](https://account.heigit.org/info/plans), [terms](https://account.heigit.org/info/tos), [restrictions](https://openrouteservice.org/restrictions/), [directions documentation checked in the earlier research](https://giscience.github.io/openrouteservice/v9.10.0/api-reference/endpoints/directions/), [migration notice](https://ask.openrouteservice.org/t/reducing-the-quota-of-deprecated-api-api-openrouteservice-org/8013) |
| Vercel Hobby | Intended free personal/non-commercial hosting with service limits rather than paid overages on the selected plan. Hosting and map/routing limits are independent. | [Hobby documentation](https://vercel.com/docs/plans/hobby) |
| Mapbox — excluded from the €0 plan | Prior research found no enforceable monthly spending cap; alerts do not stop billed usage. Do not silently reintroduce it. | [Billing guidance](https://docs.mapbox.com/accounts/guides/invoices/) |

## Outstanding verification gates

No provider gate below was newly completed on 16 October. Record each future check's date, primary URL, applicable plan/product/version, finding and unresolved limitation. Pre-integration documentation establishes policy and capability; the approved live smoke test during Milestone 2 establishes actual integration behaviour.

| Gate | Required evidence |
| --- | --- |
| Walking contract, before integration | Ordered 2–12-stop pedestrian requests; waypoint limits; street-following geometry and readable instructions; N−1 legs; distance/duration units; longitude/latitude order; exact schema/errors and current API endpoint. |
| Cost and eligibility, before integration/deployment | Current free-plan eligibility, usage units, daily/monthly quotas, rate limits, resets, and provider-enforced excess behaviour. Confirm the selected account/plan cannot incur automatic charges; alerts alone fail this gate. |
| Credentials, before integration | Browser-intended versus secret credentials, minimum permissions, supported origin restrictions, dev/prod separation if supported, quota-abuse exposure, rotation and revocation. Decide direct browser access versus a justified serverless endpoint before exposing a key. Never request credentials in chat. |
| Licensing/data use, before integration or storage | Map/logo/provider/OSM attribution, result and dataset licences distinct from code, permitted use, storage/caching and redistribution. Map-tile permission does not automatically cover catalogue coordinate sourcing. |
| Hosting, before deployment | Current Hobby eligibility/enforced limits, no paid additions, explicit account/deployment approval, reproducible build configuration and actual deployed source commit. |
| Live integration, to accept Milestone 2 | Separate approved deployed 12-stop Dublin smoke test: exact order, 11 legs, plausible pedestrian geometry and checked entrances, instructions/metrics and attribution. Record live evidence independently of mocks. |
| Reliability, built through Milestone 5 | Deterministic quota, timeout, network, authentication, no-route, malformed response and stale-response tests; keep editing/sharing usable when provider features fail. Do not exhaust live quotas to exercise errors. |

If a candidate fails, propose another coherent combination meeting the product and €0 constraints before integrating it. Do not create accounts, use credentials, enable billing, issue live paid requests or deploy infrastructure without explicit owner approval.

## Decisions to make in later scoped tasks

- Catalogue ID grammar, availability/retirement values, permitted coordinate sources and endpoint verification records. No venue records are created in this task.
- Routing result/error types, validation, debounce interval, timeout/retry messaging and credential placement after provider verification.
- Exact version-1 URL grammar, duplicate-parameter rules, maximum input length, explicit repair choices and push/replace/back/forward policy. Exact order and rejection of silent repair are already requirements; detailed limits and interactions need a focused decision before implementation.
- Application code licence and dataset/result attribution presentation, treated separately.
- Hosting account configuration and deployment procedure. The hosted skeleton remains part of Milestone 1 and requires a separately authorised task.

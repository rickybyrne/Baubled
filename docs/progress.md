# Progress

## Production preparation checkpoint — 6 November 2026

**Ready for activation review; live release gates remain closed. Milestone 2 In progress.** The owner authorised Production-only credential preparation and a deployment checkpoint after the local proof. Reviewed current Vercel Hobby/billing/build/function/firewall/environment settings without enabling features or deploying. The owner saved `ORS_API_KEY` as Secret and `VITE_MAPTILER_KEY` as Config, both project-scoped Production only. The saved records/scopes were verified without revealing values; no shared variables are linked. `ROUTING_ENABLED` is absent. ORS's write-only edit field is blank by design; the stored key's validity remains unverified.

Recorded current settings, environment isolation, concrete proposed activation/publication changes, emergency shutdown limits and a proposed two-ORS/two-document (100 MapTiler attempt) deployed test in [deployment](deployment.md#production-live-proof-preparation--6-november-2026). Both public code gates stay false; production remains the previously verified offline checkpoint. The local allowance remains three documents/three calls, exhausted and halted. No live provider calls, publication, production deployment, paid activation or firewall changes occurred. The owner's origin cleanup remains only `baubled.vercel.app`.

Validation at this preparation: `npm run verify` passed **156 tests in 13 files**, lint, strict TypeScript and production build on Node 24.19.0/npm 12.2.0. The known MapLibre chunk warning remains. Complete preparation diff review, `git diff --check`, Markdown structure and 25 local links passed. Actual-key scans of 56 tracked/build files found no exposure; the ignored local credential file remains 0600 and its exhausted ledger is still halted. Historical deployment/progress bodies are byte-preserved. Canonical main is clean and the preserved Task 2 ref is unchanged. No code, dependency, build or CI changes were made during this preparation. No dependency reinstall or repeated browser UI pass was necessary; prior local desktop/mobile live and offline evidence remains separately dated above/below. Hosted CI/deployed provider results are not established by these local tests.

Next: explicit approval to prepare/open the public activation gates and Production runtime switch, then review the resulting tested diff before publishing normally to main and performing the bounded deployed proof. The present setup approval does not authorise those actions. Preserve the accepted historical research and both existing local feature commits (`25d2130`, `ddfcc6c`), canonical main at `bf98cb4`, and the separate preserved Task 2 branch. Do not begin Milestone 3.

## Local live proof results — 5 November 2026

**Local integration technically verified; ready for owner review. Milestone 2 remains In progress.** Production live activation, Git publication and the deployed acceptance proof are not authorised or verified by this result. Work remains isolated on `codex/m2-live-proof`; canonical main is unchanged at `bf98cb40ec18e4467519616733dc01319fb61e1a`.

The owner confirmed Free MapTiler and Standard ORS through the prepared local file, entered both keys without sharing them in chat, and confirmed MapTiler's only temporary allowed origin was `127.0.0.1`. Owner-only permissions and Git exclusion passed; scans found neither actual key in tracked files or the production build. Only the public MapTiler key is defined in the explicit local frontend mode; ORS remains in the Node handler. Plans/restrictions are owner-confirmed, not independently inspected private dashboards.

### Live evidence

- Real MapLibre/MapTiler Dublin street tiles loaded, with twelve sourced building markers, visible MapTiler logo, MapLibre/MapTiler/OSM credits and NIAH attribution. The 375px and 1280px views had no horizontal overflow; map failure/list fallback remains covered by deterministic checks.
- ORS attempt 1, **23:36:57 UTC**: `p001,p002`, one validated leg, UI rounded to **556 m / 7 min**.
- ORS attempt 2, **23:39:35 UTC**: `p001` through `p012` in exact order, **11 consecutive legs**, UI total **3.48 km / 42 min**, excluding pub visits. Every instruction disclosure was opened and readable English text checked. The normaliser accepted GeoJSON, ordered waypoint indices, all twelve snaps within 50 metres, finite non-negative metrics, contiguous leg geometry and consistent summed totals. UI rounds metres/minutes only for display; the contract retains metres/seconds.
- A fresh document restored all twelve IDs in exact order from `?v=1&pubs=p001,...,p012` without automatically requesting directions. No duplicate, optimisation or return leg was inserted.
- ORS attempt 3, **23:45:09 UTC**, separately approved after the UI fix below: repeated the twelve-stop route with the same rounded totals. The route stayed present after the CTA anchor and keyboard navigation. Its displayed line followed Dublin streets/paths, including the western bends towards Smithfield, rather than straight marker-to-marker lines. At 375px all eleven leg sections and the selected order remained present; keyboard Enter opened the instructions. No warning/error console entries were captured in the live pages.
- Exact frontage/current door suitability was **not** established. The Cobblestone arrival instruction names Red Cow Lane; the existing official Backroom reference supports that access context but does not prove the ordinary pub doorway. All twelve records retain `entranceVerified: false`, unchanged source coordinates and the explicit building-location disclaimer. The owner accepted that scope.

| Consecutive IDs | Displayed distance | Displayed duration |
| --- | ---: | ---: |
| p001 → p002 | 556 m | 7 min |
| p002 → p003 | 93 m | 1 min |
| p003 → p004 | 229 m | 3 min |
| p004 → p005 | 357 m | 4 min |
| p005 → p006 | 79 m | 1 min |
| p006 → p007 | 252 m | 3 min |
| p007 → p008 | 272 m | 3 min |
| p008 → p009 | 291 m | 3 min |
| p009 → p010 | 238 m | 3 min |
| p010 → p011 | 125 m | 2 min |
| p011 → p012 | 991 m | 12 min |

These are observations of the approved live ORS response, not fixed estimates or test fixtures. Attribution: openrouteservice / HeiGIT; © OpenStreetMap contributors, CC BY-SA 4.0. Rounded leg values need not sum to the rounded total.

### Stops, correction and budget

During the first document, simultaneous owner exploration changed the selected plan and activated the conservative sequence/time guard before another upstream call. The session was stopped at one recorded call. The owner confirmed the interaction and explicitly approved resuming the remaining allowance; counters were preserved.

After the second successful call, the visual check exposed a real defect: clicking the same-page planner anchor caused `popstate` to erase a ready route. Added two tests for pending/ready results across hash-only history events, observed both fail, then fixed the query-change boundary. Different shared-plan queries still invalidate old results. No retry was made under the exhausted original approval.

The owner then approved one final document/call (50 additional MapTiler attempts maximum). The optional ledger extension preserves all consumed counts and permits at most three documents/three ORS calls in total. The final live review confirmed the correction. All starts were more than 60 seconds apart, outside the announced maintenance window. Final ledger: **documents 3, calls 3, halted true**. No raw provider responses, tiles or credentials were committed; screenshots retain attribution. Exact MapTiler attempt/billed counts were not recorded; the tested pre-dispatch guard bounds the three documents to **150 attempts maximum**.

The live server and its tabs were closed. The owner confirmed cleanup to **only `baubled.vercel.app`** in MapTiler's allowed origins. The ignored keys remain local, and the exhausted ledger must not be reset or reopened without fresh approval. No Vercel settings, public activation, billing, WAF, remote Git or deployment operations occurred.

### Validation and next gates

`npm run verify` passed **156 tests across 13 files**, lint, strict TypeScript and the production build after the final changes. The known MapLibre chunk-size warning remains. Tests use synthetic credentials/responses; none consumes this live ledger. Default dev and production preview continue to show an offline map and controlled disabled-routing feedback. Browser checks confirmed CTA/skip-link focus and preserved disabled-service feedback after same-plan anchors; full pending/ready state regression is automated and the ready state was also rechecked live.

Final static checks passed: complete intended diff review, `git diff --check`, Markdown fences/table columns/local links, actual-key scans of tracked/new source and the production build, and byte-preservation checks for the existing decisions/progress bodies. Both public approval constants remain false. Canonical main is clean; the preserved Task 2 branch is unchanged. Ordinary dev and production preview were checked at 375px/1280px with no horizontal overflow.

No dependency install was needed: the lockfile/runtime/dependencies are unchanged. This local run is not a hosted CI result, production deployment proof, physical-device/screen-reader audit or street-level access survey. Existing Task 1/Task 2 acceptance and Milestone 1 evidence remain historical and preserved.

Next: owner review of this local evidence and correction, then a separately approved production preparation/publication checkpoint: verify current Hobby configuration has no paid activation, place ORS only in Production server variables and MapTiler only as its public build key, keep previews without live credentials, review the release diff before opening public code gates, and approve normal publication plus a bounded deployed proof. The proposed deployed budget remains two ORS calls and up to 100 MapTiler attempts including any denied-origin check. That future proof must bind successful Actions/Vercel evidence to the exact release SHA, repeat twelve-stop/order/URL/attribution/path checks and preserve emergency disable/revocation. Do not mark this milestone complete from local results alone.

## Approved local live-test setup — 5 November 2026

**Preparation record, before the live run reported above: local phase authorised; awaiting owner accounts/keys; zero live requests used at that point. Milestone 2 remains In progress.** The owner approved the local-only proof and owner setup, with at most 100 MapTiler attempts across two documents and two ORS attempts (two stops, then twelve), at least 60 seconds apart; failures count and the first unexpected result stops the test. Neither provider account exists yet, according to the owner. Production publication/deployment/settings and the proposed deployed test remain unapproved.

Prepared on `codex/m2-live-proof` after local checkpoint `25d21304e0521ddeaba311ecf957be1fcb022f36`: explicit loopback-only `live-proof` mode, owner-only ignored credential template, fail-closed plan/key validation, persistent document/request reservations across restarts, exact route-sequence and time-gap enforcement, safe error shutdown, and honest local-mode UI wording. The existing common handler retains all security/data validation. Production and ordinary dev/preview stay closed; only the explicitly selected dev mode can use the owner's file. No dependencies, hosted configuration or framework changes.

Created `secrets/live-proof.env` with empty key fields and permissions 0600, without overwriting existing work. The owner was given official account links and instructions; no keys/passwords are requested in chat. Provider terms/account creation and credential entry are handed to the owner. Do not start the proof merely because the file later appears populated: confirm account plan/restriction setup, read current service availability and check the authorised budget first. Avoid HeiGIT's announced 6 November 07:30–11:30 UTC maintenance window.

Validation: `npm run verify` passed **153 tests across 13 files**, lint, strict TypeScript and production build; the existing MapLibre size warning remains. New checks exercise persisted limits, exact sequence/timing, malformed-response shutdown, loopback Host checks, default closed behaviour, local versus production map activation and actual HTTP denial of secret files by Vite. An initial attempt to extend the deny list in `configResolved` was too late for Vite's matcher; a synthetic-file regression exposed it. The final configuration supplies the complete installed Vite defaults plus `secrets` before resolution, and the full check now passes. Status-only HEAD checks also confirm the earlier offline review server denies both direct and `/@fs/` paths with 403, without reading credential contents.

At this preparation checkpoint, live tiles/routing and the local-mode browser journey were **Unverified**, pending owner setup. No request budget has been consumed by the deterministic tests. No push, deployment, account creation, key generation, billing or firewall modification was performed. The previous offline browser evidence remains historical; it does not stand in for the forthcoming live proof.

## Milestone 2 live integration execution — 5 November 2026

**In progress; no live gate opened.** The owner authorised unblocked engineering for the live integration proof, local isolated commits and independent research, reserving security-policy decisions, accounts/credentials, live calls, firewall settings and publication/deployment for explicit approval. Work continues on `codex/m2-live-proof` in the existing managed worktree, based on the clean published `bf98cb40ec18e4467519616733dc01319fb61e1a`. Canonical main and preserved Task 2 work remain untouched.

The preceding startup correction was subsequently published with owner approval: [Actions 42116400557](https://github.com/rickybyrne/Baubled/actions/runs/42116400557) passed for `bf98cb40ec18e4467519616733dc01319fb61e1a`; [Vercel EL5ds7FZdSYsfXvQ4s7QnbgwmxhC](https://vercel.com/ricky-cea5/baubled/EL5ds7FZdSYsfXvQ4s7QnbgwmxhC) reached Ready / Production on that SHA. Deployed POST returned controlled 503 `ROUTING_UNAVAILABLE`, HEAD returned 405/Allow POST, and public browser selection/order/URL restoration preserved the plan after failure. This is recorded evidence from the completed publication, not a live-provider proof.

Working plan:

1. **Done:** inspect/reuse the clean published baseline; preserve main/history and create the isolated branch. Read current scope, accepted contracts, implementation and test boundaries.
2. **Policy approved:** rechecked Hobby/WAF, ORS usage/key policy and MapTiler financial/origin/attribution evidence. The owner accepted [proportionate free-plan protection](decisions.md#milestone-2-live-proof-preparation--5-november-2026) after being told about non-global counters, possible quota exhaustion/downtime and ORS suspension. Metered WAF is no longer mandatory and remains off. Actual free-account verification is still required.
3. **Prepared locally:** guarded dormant map transport/logo with a document-wide 50-attempt cap; per-instance routing attempt/concurrency limits and quota/auth cooldown; persistent warm handler. Both code gates remain false, and the local adapter stays disabled. No dependencies, lockfile, framework, CI or deployment settings changed.
4. **Location scope clarified by owner:** sourced pub/building locations are sufficient; surveyed doorways are not required for this proof. All numeric coordinates and false entrance flags are preserved. Catalogue readiness now requires source/date/licence/valid coordinates, without pretending entrances are verified; revision records the changed waypoint policy. The 50-metre snap and manual pedestrian-path review remain. Historic entrance evidence is retained; Grand Central's building association is corroborated through its own bank history and NIAH. Public Overpass research failed (406/timeouts); no data was imported.
5. **Locally verified:** 136 deterministic tests, lint/typechecked build, real-browser offline regression and synthetic real-MapLibre protocol exercise passed. Final scope/secret/Markdown checks are recorded below.
6. **Next protected checkpoint:** complete free-account verification, owner credential entry and explicit local-test budget/activation approval, then separately approved publication and deployed proof. Following the policy reply, read-only Vercel review confirmed Hobby, no custom/IP-block/system-bypass rules and Bot Protection off. No credentials were requested/used, settings changed, live MapTiler/ORS call made, or push/deployment performed. MapTiler/ORS account status and remaining billing configuration are unverified.

The policy reply also permits account review/preparation guidance. Future live calls retain the four ORS attempts and 100+100 MapTiler attempt proposal; they are **not yet authorised**. New browser contexts/reloads consume a separate map allocation. If the guard or evidence cannot establish the bound, testing stops. Milestone 3/full route editor have not begun.

### Local verification for the live-proof preparation

`npm run verify` passed **136 tests across ten files**, zero lint warnings, strict TypeScript and production build on Node 24.19.0/npm 12.2.0. Existing MapLibre chunk-size warning remains. Tests cover warm-instance concurrency/attempt ceilings/cooldowns, source-provenance requirements, mock map transport/resource bounds/logo failure, closed provider gates and native Node ESM startup, in addition to the existing route/input/error/URL/UI regressions. No dependency reinstall was needed; dependency files are unchanged. An initial verification run encountered lint errors in an ignored temporary browser harness; the harness was removed after its check and the complete command reran successfully without changing lint rules.

Dev and rebuilt production preview passed Codex-browser checks at **375×812 and 1280×900**: marker inspection, source/entrance disclosure, selected click order, full 12-stop reordering, exact-order reload/share, invalid input preserving the current plan, disabled routing preserving the plan, clear-plan focus, and Tab/Enter skip-link/CTA navigation with visible focus. No horizontal overflow or console warnings/errors were observed on the checked final pages. Viewport overrides needed visible-browser mode to take effect; actual innerWidth was checked rather than trusting the setting. Nearby markers still overlap at some zoom levels; the list and keyboard inspection remain available.

A temporary ignored harness exercised **real MapLibre 6.15 and its worker** using synthetic vector data and a fake transport, with a browser CSP prohibiting external provider connections. Style JSON, TileJSON, sprite JSON/PNG, vector tiles and font PBF all traversed the custom protocol; the map loaded without map errors. Exhaustion stopped dispatch at exactly 50 mock attempts. This is library/guard evidence, **not live MapTiler rendering**. The synthetic tile serializer emitted a legacy-spec warning; this fixture was only a transport exercise, not map-quality evidence. The first harness import was corrected from a default import to MapLibre's namespace export before the successful check; the harness was then removed. Ordinary automated tests remain deterministic and credential-free.

Unperformed: provider/account configuration, live street tiles, real ORS geometry/snapping/instructions, hosted checks for these unpublished changes, physical-device/screen-reader testing and doorway survey. The owner waived the survey prerequisite, not honest location disclosure or live route review. Milestone 2 remains **In progress**, with live integration **Unverified**.

The repeated production build with deliberately non-secret ORS/MapTiler sentinels and an enabled environment switch passed. Neither sentinel, the ORS variable name nor either provider API hostname appeared in built assets; both code gates still prevent activation. The current public ORS plan confirms Standard €0, Directions 2,000/day and 40/minute. Its maintenance notice for 6 November 2026, 07:30–11:30 UTC must be considered before the later live test.

Final diff/whitespace, Markdown fences/local links/anchors, credential-pattern and exact file-scope checks passed. All 12 ID/coordinate pairs match the published baseline. Accepted historical decision/progress bodies and the preserved Task 2 commit remain intact; workflow/history ancestry is unchanged. Canonical main is still clean at `bf98cb4`. The local preparation contains only milestone code/tests and current workflow/product/decision documentation; no package, CI or infrastructure changes. Task-owned dev/preview servers were stopped after testing; the earlier owner-review server was left alone. This feature checkpoint is local only and does not authorise publication.

## Published offline checkpoint and function startup correction — 5 November 2026

**Offline checkpoint published; deployed function verification Needs correction; local fix ready for review. Milestone 2 remains In progress.** The approved normal push published `ef52d26320f560fae5ec71b7d52d68b7e3378fb6` to origin/main. [Validate run 42114599945](https://github.com/rickybyrne/Baubled/actions/runs/42114599945) succeeded for that SHA, including clean install and verify. [Automatic Vercel deployment 6FApXUMGfPPuhxDqKNhDUNo1SsP7](https://vercel.com/ricky-cea5/baubled/6FApXUMGfPPuhxDqKNhDUNo1SsP7) was Ready / Production, assigned to baubled.vercel.app and linked to the exact commit. Public browser verification confirmed the homepage, navigation, offline canvas/markers, selection, order and URL restoration. Original accepted Task 2 files are preserved byte-for-byte in local branch `codex/task2-preserved-before-publication`, commit `0076c64`; canonical main was fast-forwarded and clean.

The post-deployment routing check exposed **HTTP 500 `FUNCTION_INVOCATION_FAILED`**, rather than the intended disabled-service 503. The UI preserved the plan and share link. Publication work stopped and the owner then authorised investigation and preparation of a minimal correction for review, with both provider gates closed. No further publication or live-provider operation was authorised by that follow-up.

**Confirmed cause:** read-only deployment logs for the two existing requests at 21:41:18 and 21:41:45 UTC show `ERR_MODULE_NOT_FOUND`: the emitted `api/walking-route.js` attempts to import `/var/task/shared/catalogue` without an extension. Module loading fails before the handler runs. A local native Node import reproduced the same unresolved path. Vitest/Vite's resolver accepted extensionless imports; the earlier static frontend build and handler unit tests did not exercise Node loading emitted function files.

**Correction on `codex/fix-function-startup`:** use explicit `.js` specifiers for the five local imports in `api/walking-route.ts`, `server/walking-route.ts` and `shared/route.ts`. This includes the transitive imports that previously retained `.ts` suffixes, so the emitted JavaScript graph consistently points to JavaScript files. No handler logic, credentials, provider gates, deployment settings, dependencies or frontend behaviour changes. Current official documentation checked **5 November 2026**: [Node 24.19 ESM requires explicit relative file extensions](https://nodejs.org/download/release/v24.19.0/docs/api/esm.html#mandatory-file-extensions); [Vercel documents TypeScript compilation and the existing fetch-handler form](https://vercel.com/docs/functions/runtimes/node-js#using-typescript-with-the-nodejs-runtime).

**Regression and validation:** added `server/function-startup.test.ts` outside the deployable api directory. It compiles the actual entry point and dependency graph with the installed TypeScript compiler under NodeNext resolution, then imports the emitted entry point in a separate native Node process, without Vite or a custom loader. The child receives only a non-secret sentinel environment and a rejecting fetch stub. The test failed against the original extensionless imports, then passed after the correction: POST returns 503 `ROUTING_UNAVAILABLE`, JSON/no-store/nosniff, no reflected sentinel; HEAD returns 405/Allow POST without a body; zero upstream calls occur even with the environment switch set true. Temporary output is removed. This is a native-Node startup regression, not a simulation of all Vercel packaging/platform behaviour.

`npm run verify` passed **112 tests in seven files**, lint without warnings, strict TypeScript and production build on Node 24.19.0/npm 12.2.0. The existing MapLibre size warning remains. Full diff, whitespace, local documentation links, scope and credential/bundle checks passed; both code-owned provider gates remain false. No dependency reinstall was necessary. No new UI browser pass was needed for import-only runtime changes; the frontend build and existing UI tests passed. No new production calls, provider requests, Vercel CLI/build, credential/account changes or deployment were used for this investigation. Canonical main remains unchanged at the published SHA. **The production 500 is not fixed until a separately approved publication and exact-SHA deployed POST/HEAD verification succeed.** WAF financial/enforcement clarification, venue entrances and bounded real map/routing acceptance remain open.

## Offline checkpoint publication authorisation — 5 November 2026

The owner approved publishing the integrated workflow overhaul, accepted Task 2 design and reviewed offline Milestone 2 checkpoint, conditional on a successful final audit. **Milestone 2 remains In progress.** This approval includes the dormant Vercel function and expected automatic main-branch deployment; it does not approve WAF activation, credentials, provider settings, live requests or manual deployment.

Final pre-publication audit of `0684d10984b7d5f529f2061f28280ce4f8594ef1`: `npm run verify` passed lint, **111 tests in six files**, strict TypeScript and production build. The existing MapLibre size warning is unchanged. All 29 changed files belong to the reviewed workflow/design/offline scope. Code-owned ORS and MapTiler release gates remain false; the local adapter is permanently disabled. Client bundle scanning found no server credential name, non-secret build sentinel, provider API URL or synthetic test identity. Credential-pattern scanning and diff checks passed. The currently published homepage at `6c0f076` passed a new public-browser smoke check, including real Tab/Enter skip-link and planner navigation, with no console warnings/errors.

The workflow commit and exact accepted Task 2 bodies are preserved in the integrated history. Canonical Task 2 hashes match the earlier preservation record, with no unrelated local changes. Publication procedure: preserve those exact canonical documents in a separate local branch/commit, return to main, fast-forward only to the reviewed integrated descendant, and push normally to origin/main. No reset, stash, force push or discarded work. Stop if remote main has advanced or any integration discrepancy appears. The final release metadata edits only update current documentation wording; accepted dated research remains intact.

**Hosted results pending at commit time:** this record is not proof of successful GitHub Actions, Vercel deployment or deployed function behaviour. Check each against the final published SHA and report the result in the publication handoff. The existing detailed review and remaining live-integration gates below still apply; publication of an offline checkpoint is not completion of Milestone 2.

## Offline checkpoint product and technical review — 5 November 2026

**Ready for owner review; not published or accepted as a completed milestone.** Audited the complete integrated branch against published `main` at `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`: workflow overhaul `5a99900`, accepted Task 2 baseline `ee99cd9`, and offline implementation `52372ee`. A read-only `git ls-remote` confirmed GitHub main still has that published SHA. No push, main merge, deployment, account change or live-provider request occurred.

The audit confirmed strict server-side IDs/options/size/deadline validation, sanitised outputs, stale-result cancellation, separate selection/result state, false code-owned provider release gates, and production credential exclusion from the client bundle. Disabled routing still executes the local/hosted application boundary; it is not a pre-function firewall or a global rate limiter. The workflow's single verify command retains lint, tests and typechecking inside the build. Existing locked dependency versions remain unchanged; MapLibre and its dependency tree are the only additions.

In-scope corrections: retain useful keyboard focus after clearing/recovering a plan; dispose a partially initialised map if setup throws; show controlled network-failure text; expose Grand Central's previously documented building-association uncertainty in its list entry and popup; reserve popup text space for its 44px close button. No venue identity, coordinate, entrance flag, provider gate or architecture decision was changed. Regression tests cover the behavioural fixes; browser checks cover popup spacing. All 12 coordinate/record pairs were independently re-compared with the recorded NIAH CSV and match exactly; this verifies transcription, not physical entrances or current operation.

Validation: `npm run verify` passed **111 tests across six files**, lint without warnings, strict TypeScript and production build, using Node 24.19.0/npm 12.2.0. The existing large MapLibre chunk warning remains visible. No reinstall was needed because dependencies were unchanged since the recorded clean installation. The non-secret build sentinel and server credential/provider URL strings are absent from `dist`. Diff whitespace, changed Markdown structure/local links, secret-pattern and scope checks passed. Hash checks confirm the canonical unpublished Task 2 files are untouched, their accepted bodies and published historical records remain in this branch, and the workflow commit is an ancestor.

Browser evidence: dev and rebuilt production preview inspected in the Codex browser at 375×812 and 1280×900. Demonstrated marker popups, list selection in click order, explicit reordering, 12 stops/11 **expected** legs, exact-order reload, disabled routing preserving selections/share links, invalid-link recovery and keyboard focus after recovery/clear. No horizontal overflow. One transient dev CSS hot-reload error coincided with Vite's catalogue-triggered server restart; fresh reload rendered correctly with no further errors, and production preview reported no console warnings/errors. Nearby 44px markers can overlap at the initial zoom; zoom or keyboard inspection is needed, and selection remains available in the list. Map setup failure and successful walking responses remain deterministic test evidence. Loopback dev is intentionally left running for owner review; temporary viewport overrides are reset. No new hosted CI, function packaging/deployment, physical-device/screen-reader audit, live tiles/directions, account/WAF verification or pedestrian entrance survey was performed.

### Owner review checklist

1. Open the locally running interface at `http://127.0.0.1:5173/#route-planner`. Confirm the Christmas visual identity and the offline/live distinction are clear.
2. Zoom/pan and open a marker: the blank canvas has no streets, markers are building candidates, entrances are unverified, and Grand Central has an additional association warning. Markers inspect locations; the list selects stops.
3. Select Madigan's Earl Street, Molloy's, then The Confession Box. Confirm that click order is retained. Apply `p002,p003,p001` in Ordered pub IDs and confirm the new order.
4. Reload or open the exact-plan link; confirm restoration. Try a duplicate ID and confirm the current plan survives. One stop needs no route; 12 stops show 11 expected legs, not 11 verified walking legs.
5. Choose Check walking route: unavailable feedback must preserve the plan and share link. Clear/recover using the keyboard and confirm focus moves to Ordered pub IDs.

### Publication decision and safe integration

Publishing this branch would replace the hosted placeholder with the disclosed offline proof **and introduce a dormant Vercel function** via `api/walking-route.ts`/`vercel.json`. It cannot call ORS with the shipped release gate false, but requests can consume included Vercel resources. An automatic main-branch deployment is expected independently of Actions; local Vite preview does not verify Vercel packaging. The owner must decide whether to publish that complete offline scope after manual review. Do not silently remove the function or activate WAF to simplify publication.

The canonical main checkout still contains accepted unpublished Task 2 work. Do not merge over it, blindly reapply its already-integrated patch, reset it, or stash it as a shortcut. Recommended approved-publication procedure: recheck remote main and the canonical hashes, use the clean feature checkout to publish the reviewed linear descendant normally to `origin/main`, leaving the canonical checkout/files untouched. Verify hosted CI/deployment for the exact SHA. If main has advanced, stop for a reconciliation review; never force-push. Advancing/reconciling the canonical checkout is a separate explicit step after preserving its local evidence. No publication operation has been performed by this review.

Public live routing remains **Blocked** pending authoritative WAF no-charge activation/exhaustion/enforcement evidence and owner approval. All entrances, Grand Central's building association, actual free-account/key/origin configuration, bounded MapTiler guards/attribution and separately approved real 12-stop/11-leg deployed proof remain open. The explicit Vercel enquiry and bounded live-test plan in decisions remain the next external gates. The simplified ID-based order control is an integration proof, not the final accessible route editor. Milestone 2 remains incomplete.

## Milestone 2 autonomous integration work — 5 November 2026

**Offline implementation ready for owner review; public live routing Blocked; live integration Unverified; milestone incomplete.** The owner authorised cohesive Milestone 2 implementation and local isolated commits, while reserving publication, deployment, accounts, credentials, WAF and live calls for explicit approval. This supersedes earlier task-specific implementation exclusions without changing their historical evidence.

Safe baseline: canonical `main` remains at `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`, with the two accepted, unpublished Task 2 files untouched. Reused the clean managed workflow worktree; created `codex/milestone-2-integration` from `5a99900f54c03e22e42400443f738140b704c892`. Local commit `ee99cd9` integrates the exact accepted Task 2 document contents and preserves the workflow progress appendix. No main merge, push or deployment occurred.

Working plan and current evidence:

1. **Done:** preserve and integrate both baselines; read the product/architecture contracts and existing implementation.
2. **Done:** independently recheck WAF public evidence; source 12 real pub candidates and licensed building coordinates. See the [dated implementation decisions](decisions.md#milestone-2-implementation-boundaries--5-november-2026). Entrance verification and actual provider/account settings remain open.
3. **Implemented:** shared ordered-ID/URL contracts, defensive ORS normalisation, disabled Vercel handler and local adapter, MapLibre offline canvas/markers, simple selection/order/share proof, failure UI and deterministic tests. No live provider request was made. The small proof interface is not the Milestone 3 catalogue or Milestone 4 editor.
4. **Done:** clean lockfile install, lint/tests/typechecked build, dev/preview browser checks, independent code review and bundle/secret/scope/documentation checks. Local feature checkpoint: `feat: prepare offline milestone 2 integration proof`; publication remains unapproved.
5. **Blocked on external evidence/approval:** public throttle financial/exhaustion answer; pedestrian entrances; actual free-account/key/origin configuration; bounded live map/routing proof; exact-SHA hosted CI/deployment and owner acceptance.

The accepted four-attempt ORS / 100+100 MapTiler-attempt plan remains the proposed future budget, not permission to execute it. Provider-contact wording, candidate provenance, release gates and remaining live-harness work are recorded in decisions. Milestone 3 has not begun.

### Verification and limitations

- Used the bundled **Node 24.19.0** and integrity-checked temporary **npm 12.2.0** launcher, without machine-wide installation or shell changes. `npm ci --no-audit --no-fund` passed with 269 packages. npm continued to block the optional `fsevents` install script under its existing policy; no script approval/policy relaxation was made.
- `npm run verify` passed: zero lint warnings, **108 tests across six files**, strict typecheck including API/server/shared modules, and production build. Tests cover ordered 2/12-stop response contracts, input rejection with zero upstream calls, exact URL restoration at every valid length, malformed/oversized responses, non-JSON gateway errors, auth/quota/no-route, body deadlines, cancellation, independently ineffective cancellation/A→B→A, XSS-safe instruction text, map failure/disposal and terminal-error retry suppression. Synthetic test records are never imported by the application. Initial accessible-label and cleanup/coincident-waypoint findings were fixed and rerun, not waived.
- Vite still reports the separate **1,094.33 kB** minified MapLibre chunk (**296.04 kB gzip**) and **518.44 kB** worker as large. MapLibre is dynamically imported; the warning is not silenced and no performance target is claimed. Current main application chunk is about **240.68 kB / 76.00 kB gzip**. No unrelated dependency upgrade occurred.
- Built with deliberate non-secret `ORS_API_KEY=NON_SECRET_BUILD_SENTINEL`; scanning `dist` found no sentinel, `ORS_API_KEY`, ORS URL, MapTiler API URL or synthetic test identity. Credential-pattern scan/manual review found no credentials. This is evidence for the current bundle, not a guarantee about future account/build configuration.
- Codex in-app browser: dev and production preview at **375×812 and 1280×900**. Verified rendered layout/no horizontal overflow, existing Christmas palette/typography, real Tab/Enter skip-link/main/CTA navigation and visible focus, one-stop disabled action, exact twelve-stop order and refresh restoration, invalid version/recovery, map zoom/popup, all initial mobile markers fitting the canvas, and disabled-route feedback preserving selection/share links. Terminal routing errors retain keyboard focus; primary buttons/map controls/checkbox-label targets were at least 44 px. Browser console inspection returned no warnings/errors for the inspected loaded pages. Map-failure and successful walking rendering use deterministic unit/UI tests; no real street tiles or walking path was loaded.
- A loopback HTTP probe returned the actual **503 `ROUTING_UNAVAILABLE`**, JSON, `no-store`, and `nosniff`. The initial sandboxed probe could not reach loopback; the permitted host probe succeeded. The Vite dev server adds its own local CORS header; this does not establish deployed function headers or WAF behavior.
- Independent read-only review checked endpoint/client failure cleanup, release gating, stale results and source data. All 12 stored coordinate/REG_NO pairs exactly match the source CSV. Five changed Markdown documents passed headings/fences and **41 local links/anchors**; `git diff --check` and scope checks passed. Hashes confirm both canonical unpublished documents are untouched; accepted historical bodies and the workflow commit/ref remain preserved.

**Not performed:** real MapTiler/ORS calls; credentials/accounts/dashboard/WAF/billing changes; Vercel CLI linking or function packaging/deployment; GitHub Actions for this unpublished code; public production changes/smoke checks; physical-device, screen-reader, second-browser or reduced-motion emulation. Physical pedestrian entrances/current venue operation remain unverified. The map uses no flights/fit animation; broader motion/accessibility checks remain future evidence. No npm vulnerability-audit service was invoked. No new paid infrastructure, backend service, analytics, persistence or Milestone 3 work was introduced.

**Owner review/next action:** inspect the local proof and code, obtain the exact Vercel answer in decisions (or authorise that enquiry), and provide/approve attributable entrance verification. Actual provider setup, bounded test tooling/budget, release-gate changes, publication and automatic Vercel deployment each retain their explicit approval boundary. The existing four-call acceptance plan remains unexecuted. A local commit is a recoverable checkpoint, not integration acceptance or publication.

## Current status — Milestone 2, Task 2 — 5 November 2026

**Task 2 design research: Accepted following technical review on 5 November 2026. Option B: Accepted in principle. Public WAF rate-limit activation and public live routing: Blocked on the protection gate. Integration readiness: Unverified.** Milestone 1 remains accepted and complete; Task 1 is accepted and published. Milestone 2 remains **In progress**, incomplete. The [Task 2 design](decisions.md#milestone-2-task-2--provider-architecture-and-security-design--19-october-2026) records accepted proposals for the endpoint, credential lifecycle, MapTiler workflow, abuse controls and bounded future proof. Research verification remains dated **19 October 2026**; acceptance does not establish implemented or live-verified functionality. Earlier Task 1 and Milestone 1 records below are preserved verbatim and describe their time of writing.

### Task 2 acceptance and publication preparation — 5 November 2026

The owner confirmed that technical review on **5 November 2026** accepted Task 2 as a completed research/design task, with no blocking documentation corrections. Preparation changes only acceptance/status wording and this publication record; the accepted architecture, source-derived findings, numerical limits and original research verification date are preserved. The strict **€0/month** requirement, unresolved Hobby WAF activation/overage/exhaustion behaviour and prohibition on activating the proposed six-requests-per-IP-per-minute rule remain in force. Actual provider credentials, account configurations and map/routing integrations remain unverified. The financial investigation has not been reopened.

Preflight confirmed the canonical repository on `main`, tracking `origin/main`, with both HEAD and the local tracking ref at `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`. Only docs/decisions.md and docs/progress.md were modified; no staged, untracked or unrelated changes were present. The intended checkpoint is `docs: design provider security boundaries`, limited to those two files. **Prepared, not published:** nothing has been staged, committed or pushed; separate owner approval is required. The existing push-triggered Validate workflow is expected to run, and the recorded Vercel main-branch integration is expected to create an automatic production deployment independently of Actions. Their results and exact source SHA must be checked after an approved push; no new hosted verification or deployment has occurred.

Publication-preparation validation on **5 November 2026**: complete intended diff and acceptance-only edits reviewed; `git diff --check` passed; heading/table/fence checks and all 14 local links/anchors passed; credential-pattern scanning and manual review found no secrets. Task 1 and Milestone 1 records remain byte-for-byte preserved against HEAD. The scope check (`git diff --exit-code HEAD -- . ':!docs/decisions.md' ':!docs/progress.md'`) passed: application code, dependencies, tests, configuration and GitHub Actions are unchanged. Dependency installation, application checks/builds, rendered Markdown/Mermaid inspection, new hosted checks and live provider tests were not performed for these documentation-only edits. Provider research and private account settings were not rechecked; their existing limitations remain.

### Task 1 publication outcome and owner smoke evidence

The approved documentation was published as [`6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`](https://github.com/rickybyrne/Baubled/commit/6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff), `docs: verify zero-cost provider contracts`, with a normal push to origin/main. The prior publishing turn verified [Validate run 39239667690](https://github.com/rickybyrne/Baubled/actions/runs/39239667690) succeeded for that exact SHA, including installation, typecheck, lint, tests and build. [Vercel deployment 2HRayFUetezRr5qpwB5RkZLwNGND](https://vercel.com/ricky-cea5/baubled/2HRayFUetezRr5qpwB5RkZLwNGND) was Ready / Production with that SHA and the production domain. No manual deployment was triggered.

The separate Python HTTPS probe failed to validate its local certificate chain, so Codex did not claim public availability from that probe. **Owner-reported evidence in this Task 2 instruction:** the public homepage at [baubled.vercel.app](https://baubled.vercel.app/) passed manual smoke checks in private browsing and a separate browser. This resolves the publication's accessibility follow-up as owner evidence; it is not a newly performed Codex browser check or map/routing test. No private account dashboard or production smoke check was reopened during Task 2.

### Task 2 investigation and conclusions — 19 October 2026

Confirmed canonical directory `/Users/rickybyrne/Documents/ChatGPT/baubled`, clean `main`, and HEAD/local tracking ref `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff` before editing. Recent history contains the accepted Task 1 and Milestone 1 publications. Read AGENTS, README, product brief, backlog, full decisions/progress, deployment records, package/runtime/TypeScript/Vite/CI configuration and ignore rules. Older README/AGENTS/backlog milestone wording remains outside this two-file scope; the owner's current status and dated evidence govern. No obsolete project was read or modified.

Research on **2026-10-19 (Europe/Dublin)** focused on the outstanding decisions, without redoing the provider comparison:

- Verified current public Vercel Node function structure, environment scopes/Secret behaviour, rotation/deployment snapshots, timeout and opt-in cancellation documentation. Proposed one `POST /api/walking-route` function with ordered IDs, shared static catalogue lookup, 2 KiB input, fixed upstream options and a validated minimal response. Existing TypeScript coverage will need extending in a separately approved implementation task.
- Reviewed Hobby caps, free firewall controls, WAF matching/execution order, rate-limit rules/pricing and regional counters. The official free-Hobby announcement is relevant, but allowance evidence does not establish the actual activation contract or exhaustion outcome. The pricing FAQ's Hobby caps and the WAF comparison's all-plan overage language need authoritative clarification. No pricing dialog or private settings were inspected.
- Rechecked MapTiler's public Free/key/metering guidance. Recommended production-only origins after a bounded initial local window; routine development and previews use mocks. Exceptional local/preview work requires an approved maintenance window, with no permanent localhost or wildcard Vercel origin.
- Rechecked ORS's public FAQ, schema, errors, Standard plan and terms. The plans/terms were blank in text retrieval and were read in the browser without login. No provider request, account action, credential or provider contact was used.
- Proposed production-only server Secret, disabled/keyless previews, redacted outputs/logging, revocation that also disables old deployment credentials, deterministic failure tests and a future proof limited to four total ORS attempts plus 200 guarded MapTiler HTTP attempts across local/deployed phases. No fixtures or implementation were created.

**Financial decision:** Task 1's published-policy Pass for included base services remains intact. Full operational readiness is Conditional on actual accounts/settings. Public live routing remains **Blocked** until an enforceable throttle's no-charge activation and exhaustion behaviour are established and approved. Free DDoS/static deny controls are useful, including for a separately approved owner-only proof, but they do not replace a public per-client throttle. Even the proposed regional per-IP throttle would not guarantee protection of the shared ORS quota against distributed traffic.

Files changed: docs/decisions.md adds the dated design, official evidence and sources, control assessment, error contracts and future live-test procedure; docs/progress.md adds this investigation and the prior publication/owner-smoke outcome. No accepted Task 1 or Milestone 1 research was rewritten.

### Task 2 documentation validation — 19 October 2026

Reviewed the complete intended diff. `git diff --check` passed. A read-only Python check passed for heading levels/spacing, balanced code fences, table column structure, and all 14 local file/anchor links across the two documents. Credential-pattern scanning plus manual diff review found no secrets. Historical decisions and progress records were compared with HEAD and remain byte-for-byte intact within their original sections.

`git diff --exit-code HEAD -- . ':!docs/decisions.md' ':!docs/progress.md'` passed: application code, tests, package/lock files, Vite/TypeScript configuration, deployment configuration and GitHub Actions are unchanged. Only the two approved documents are modified, unstaged; no staged or untracked files were present. Branch and HEAD remain `main` / `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`. No commit or push was made.

Not run: dependency installation, application typecheck/lint/tests/build, dev/preview browser checks, new hosted CI/deployment checks, account inspection or live provider calls. This task changed only documentation and expressly excludes those integration operations. Markdown/Mermaid structure was inspected, but no rendered-document visual check was performed. Current sources supporting Task 2 were read; historical external URLs were not exhaustively re-audited. Actual configuration, endpoint security, provider response behaviour and integration readiness remain unverified.

**Next action:** await explicit owner authorisation to commit and push the accepted documentation. The next independent investigation remains a separately scoped resolution of the Hobby WAF activation/exhaustion gate; it is not started or authorised here. A private-account review, provider enquiry, key/account operation, implementation or deployment requires separate explicit approval. No Task 3 work is authorised or started. Proposed commit subject: `docs: design provider security boundaries`.

## Current status — 19 October 2026

**Milestone 1 remains Accepted and complete. Milestone 2, Task 1 documentation research is Accepted by the owner following technical review on 19 October 2026. Milestone 2 remains incomplete.** Option B is accepted in principle; detailed architecture, security controls and live integrations remain conditional. No Milestone 2 implementation or live integration is verified. The [dated provider investigation](decisions.md#milestone-2-task-1--provider-verification--19-october-2026) records current official evidence, policy Pass results and remaining Conditional gates. Overall integration-readiness recommendation: **Unverified**.

Initial working tree was clean on `main` at `d2eaa36` (`docs: complete Baubled milestone 1 deployment`); the local tracking ref agreed. Recent history also contained `d7bbe20` and `0293e6d`. No fetch, current remote/CI/deployment audit or external state change was needed. The 17 October records below remain historical evidence. Older README/AGENTS/backlog descriptions of Milestone 1 have not been broadened into this task's edit scope; the owner's current instruction and dated acceptance records establish completion.

Only two files changed:

- `docs/decisions.md`: provider evidence tables and dated primary links; exact quotas, resets, billing enforcement, package/worker and routing contracts; credential/licence/cache findings; comparison of architecture options; owner decisions and future tests.
- `docs/progress.md`: this task's scope, findings, validation, limits and proposed next step. Existing history is preserved below.

Evidence collected on **2026-10-19**:

- Read AGENTS.md, README, product brief, backlog, decisions, progress, deployment documentation, package/runtime and TypeScript settings before edits; confirmed canonical directory and Git history/status.
- MapLibre public npm metadata reports **6.15.0** with ESM, bundled types and compatible Node/npm minima. Current docs require WebGL2 and explicit Vite worker wiring. Exact React/Vite/TypeScript integration remains untested.
- MapTiler Free documents €0-equivalent price, no card, 100k monthly requests for third-party MapLibre, one key, and suspension at limits. One-key development versus production-origin protection remains an owner decision; exact burst limits/quota status codes were not established.
- HeiGIT's rendered plans and terms establish Standard €0, 2k/day and 40/minute Directions, and enforced errors/blocking. Current FAQ prohibits client-side application keys. Recommend a minimal routing function (Option B, Conditional); direct shared-key routing (Option A) fails. New `api.heigit.org/openrouteservice/v2/…` path and dated migration/CORS announcements were checked.
- Vercel current policy supports free included hosting/functions and no paid Hobby overages. Existing account evidence is from 17 October; it was not re-audited today. Any WAF activation requires a further review of the actual Hobby controls and cost terms.
- The ORS plans/terms were empty in text retrieval and were inspected successfully in the browser. The playground overview rendered but its endpoint detail failed; schema was cross-checked against official v9.10.0 source, with current backend docs at 10.0.1. This mismatch is disclosed, not presented as a hosted-version test. The npm web fetch failed; a read-only curl retry after sandbox DNS failure retrieved public package metadata. No package was installed/executed.

Research-stage validation for this documentation-only task:

| Check | Outcome |
| --- | --- |
| `git diff --check` | Passed; no whitespace errors |
| Markdown structure, local targets/anchors and source-link syntax | Passed: two files, 12 tables and 102 links checked for table structure, fences, heading spacing, local targets/anchors and HTTPS syntax. This is structural validation, not a rendered-document or historical external-link audit |
| Final changed-file and complete diff review | Passed: exactly decisions.md and progress.md; no untracked repository outputs. Earlier decisions content and progress history verified unchanged except relabelling the prior current-status heading as historical |
| Foundation/dependencies/configuration preservation | Passed: `git diff --exit-code HEAD -- . ':!docs/decisions.md' ':!docs/progress.md'` returned 0; no other tracked changes |
| `npm ci`, typecheck, lint, tests, build, dev/preview browser checks | **Not run**: the explicit task limits validation to documentation and prohibits package installation; no application/configuration changes |
| Accounts, credentials, authenticated API calls and live Dublin integration | **Not performed**, as required |
| Hosted CI / new deployment | **Not performed**; no commit/push/deployment or hosting/billing changes |

Remaining risks: quota-abuse outages despite financial caps; MapTiler one-key/origin isolation; unverified new-account/payment flow after public signup; actual serverless/WAF configuration; browser/device compatibility; current gateway error/header details; and Dublin pedestrian data/entrance correctness. CC BY-SA result obligations and map branding must be preserved; no persistent cache or catalogue source is approved by this research.

**Next proposed task — Milestone 2, Task 2: Provider Architecture and Security Design — requires owner approval, not started.** Settle the one-key map workflow, server-only secret handling, request validation, appropriate €0 abuse controls and a bounded later live-test plan. Account creation, credentials, settings, packages, implementation and deployment require their own explicit scope. Do not advance to fixtures/maps/routing/URL work from this research alone.

### Acceptance and publication preparation — 19 October 2026

The owner accepted Task 1 documentation research following technical review and authorised preparation of only docs/decisions.md and docs/progress.md for publication. Preparation confirmed the canonical directory, branch `main`, HEAD `d2eaa36a7129c7d7861fa69d8b27c28aba8f07b6` and matching local `origin/main` tracking ref. The two accepted documents were the only unstaged changes; nothing was staged or untracked. No remote fetch or live account/settings audit was performed.

Final edits record acceptance, retain Unverified integration readiness and the incomplete milestone, update the decisions document's opening date, and remove a redundant slash from one MapTiler documentation URL. Accepted source-derived findings and historical research/Milestone 1 records remain preserved.

Publication-preparation validation passed: `git diff --check`; structural checks of 31 headings, 12 tables and 102 links (including 12 local targets/anchors); exact comparison of historical decisions and progress against HEAD; comparison of accepted provider evidence against the pre-edit documents, allowing only the approved URL correction; and review of the complete intended two-file diff. A scoped credential-pattern scan and manual review found no secrets or credentials. No other tracked file changed, and nothing is staged or untracked. Application tests, installation, browser checks and fresh external-source verification were not repeated for these documentation-only edits.

Proposed commit checkpoint, pending explicit commit/push approval: `docs: verify zero-cost provider contracts`. The recorded Vercel Git integration is expected to deploy a push to `origin/main` automatically; the existing Validate workflow also runs on pushes without a documentation-path exclusion. These settings have not been re-audited live during preparation. No staging, commit, push, manual deployment or settings change was performed. Publication and verification of the resulting SHA's GitHub Actions and Vercel outcomes remain pending. Task 2 has not begun.

## Status recorded — 17 October 2026

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

## Development workflow overhaul — 5 November 2026

**Delivered locally; ready for owner review.** The owner approved autonomous execution of coherent objectives, with protected publication/provider/cost operations still requiring approval. Current product status is summarised in [README](../README.md#current-status); the delivery convention is in [backlog](backlog.md#task-and-review-workflow). Milestone 1 remains complete, Milestone 2 incomplete. Task 2 design acceptance on 5 November is owner-confirmed; its separate publication remains pending. WAF financial/enforcement clarification remains the next investigation, not permission to implement routing.

**Isolation:** started from `main` / `6c0f07679e1cd78ec51fc8c95f3ce89bbd3a05ff`. Canonical docs/decisions.md and docs/progress.md held accepted, unpublished Task 2 work. Created the attached `workflow-overhaul` worktree and local `codex/workflow-overhaul` branch from the published commit. Those canonical files remain byte-for-byte unchanged; their Task 2 additions are absent from this branch. This progress entry is appended to the published history, keeping the independent Task 2 preparation separate. Review both histories when later authorising integration/publication; do not overwrite either.

**Changed:** AGENTS now distinguishes routine autonomous work from protected operations and selective context from historical research. README/backlog correct stale milestone status and document setup, outcome-based intake, proportionate verification, browser checks and concise handoffs. `npm run verify` runs lint → tests → the existing typechecked build; CI uses the same command after installation. This removes one duplicate typecheck per full CI run and replaces four manual check invocations with one. No speed improvement was measured. No new dependency, framework, skill, automation or planning-document hierarchy was added.

| Verification | Observed result |
| --- | --- |
| Runtime and install | Bundled Node **24.19.0**, temporary npm **12.2.0**, package tarball integrity checked against registry metadata. `npm ci --no-audit --no-fund` installed 246 locked packages; lockfile unchanged. npm reported blocked optional fsevents install scripts; no allowlist/security setting was changed. |
| Shared check | `npm run verify` passed lint with no warnings, **3 tests**, strict TypeScript and Vite production build. The initial sandbox restriction on Vite temporary files was resolved through the normal permission mechanism; no source change was needed. |
| Browser | Codex in-app browser, dev and production preview, **375px / 1280px** widths. Readable unchanged homepage/planner, no horizontal overflow, working Tab/Enter skip-link and CTA targets, visible red/gold 3px focus, pointer CTA and root/fragment refresh. CTA about 217×65px; skip link about 181×50px. No console warnings/errors in these sessions. |
| Motion and cleanup | Source and rendered styles showed no animation, zero-duration transitions and automatic scrolling. No reduced-motion media emulation was performed. Task-owned loopback servers/tabs were closed and viewport overrides reset. |
| Review | Independent read-only audit found no blocking workflow/approval/CI issue. Complete diff and `git diff --check` passed; structure checks covered all 7 Markdown files and 45 local links/anchors. Package JSON and CI YAML validation passed. Secret-pattern scan/manual review found no credentials. Application source, tests, lockfile, product brief, provider decisions, deployment settings and CI permissions remain unchanged; historical progress and canonical Task 2 files are preserved. |

Normal shell PATH still lacks Node/npm. A per-user nvm setup is the durable recommendation, requiring owner approval before installation/shell edits; temporary tooling allowed verification without changing the machine setup. Managed worktree creation, local terminal/builds, browser viewport/keyboard/console checks and a separate read-only agent were exercised. Goal, review-panel, skill and scheduling tools are exposed by the session; no Goal, scheduled task or new skill was created. Use Goals only on an explicit bounded objective; defer Playwright/monitoring until their benefit is concrete.

**Limits and next review:** no new hosted CI/deployment or public-production check, physical-device/touch/screen-reader/cross-browser audit, dependency vulnerability audit, authenticated provider call, account inspection or WAF investigation was performed. No product UI or milestone implementation changed. Local checkpoint: `chore: streamline autonomous development workflow`; no push, merge or deployment is authorised. Review the working agreement and shared verification command, then separately approve publication and the focused WAF financial/enforcement investigation when ready.

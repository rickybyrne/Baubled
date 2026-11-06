# Development backlog

Plan established 16 October 2026; overall product direction approved by the owner on 17 October. [Product brief](product-brief.md) owns launch requirements; [decisions](decisions.md) owns technical choices; [progress](progress.md) records dated evidence. Milestones describe dependencies and acceptance gates, not permission to implement everything. The owner approves a coherent outcome; Codex owns its routine engineering execution. The [workflow below](#task-and-review-workflow), revised 5 November 2026, governs local commits and publication approval.

## Milestone 1 — Foundation and hosted skeleton

**Status: Accepted, complete and deployed.** The foundation at `0293e6da409815bc894c98fad5c0f676b2037e7e` and subsequent hosted skeleton have [deployment evidence](deployment.md); acceptance/publication is recorded in [progress](progress.md#milestone-1-acceptance-and-publication--17-october-2026). Do not repeat scaffolding, Git setup or deployment preparation. The original checklist below is retained as the milestone's acceptance history, not outstanding work.

- **Objective:** establish a reproducible, accessible, version-controlled skeleton with a verified public deployment.
- **Deliverables:** preserve the React/Vite homepage and planner placeholder, strict TypeScript/Tailwind, focused tests, lint/build scripts, CI, and current documentation. Complete hosted skeleton verification in a separately approved task.
- **Dependencies:** owner review of this plan (satisfied 17 October); current Node/npm setup; explicit approval for any hosting account and deployment; verification that the selected hosting plan enforces €0 for this personal use.
- **Acceptance:** clean lockfile install and all required checks pass; GitHub contains the canonical commit; hosted CI passes for the deployed source; the public skeleton loads without secrets or provider services; documentation distinguishes placeholder and planned product.
- **Common risks:** conflating a build with deployment evidence, repeating obsolete Git setup, unsupported local runtime, unintentionally adding paid services, calling the entire milestone complete after local checks only.
- **Manual verification:** dev and production preview at 375px/1280px; no overflow; Tab/Enter skip link and CTA destinations/focus; console check. After approval, repeat on the public URL, including refresh and a mobile browser.
- **Small task sequence:** accept this plan (done) → publish the approved documentation → verify hosting eligibility/configuration and prepare deployment instructions → owner-approved deployment → verify and record deployed evidence. Correct foundation issues only if found.
- **Commit checkpoints:** existing `feat: initialise Baubled application foundation`; authorised `docs: establish Baubled product plan`; later `docs: record verified skeleton deployment` (include configuration only if actually required).

## Milestone 2 — Integration proof

**Status: In progress.** The workflow overhaul, accepted Task 2 documents, offline implementation and Node ESM correction are published through `bf98cb4`. The local live proof on `codex/m2-live-proof` has returned real MapTiler tiles and an ordered twelve-stop/eleven-leg ORS route; the owner-approved local allowance is now exhausted and closed. On 5 November 2026 the owner approved free-plan safeguards without metered WAF and sourced building locations without surveyed entrances. Production-only key records are prepared. The owner approved local activation code preparation on 6 November; the tested candidate keeps non-production closed. Runtime activation, publication and the bounded deployed proof remain open gates. See the [tested candidate and next gates](progress.md#tested-activation-candidate--6-november-2026).

- **Objective:** expose provider, budget, and URL recovery risks before substantial UI polish.
- **Deliverables:** a Dublin map, controlled verified pub fixtures, an ordered walking request up to 12 stops, real geometry/instructions/per-leg metrics, basic versioned URL recovery, attribution, and visible failure behaviour. Prove that the list remains usable if mapping fails.
- **Dependencies:** accepted Milestone 1; completed pre-integration documentation and credential-policy gates in decisions.md; explicit approval for accounts, credentials and integration/deployment; licensed fixture coordinates and checked pedestrian endpoints. The deployed live smoke evidence is produced during this milestone.
- **Acceptance:** approved free configuration has enforced usage limits without charges; an actual deployed 12-stop request preserves order and returns 11 legs, readable instructions and plausible geometry/metrics; 1 stop causes no directions request; basic valid URL restores the same IDs/order after refresh. Invalid input is identified, not silently altered, even before full Milestone 6 hardening. No automatic optimisation or return leg.
- **Common risks:** outdated API examples, exposing a secret, confusing tile and session quotas, unsupported waypoint/instruction contracts, inaccurate entrances, mistaking mocked results for a live integration.
- **Manual verification:** check the active account plan and quota policy; inspect an approved deployed request/response without exposing credentials; compare ordered endpoints, pedestrian path and 11 legs; open the basic URL in another browser; simulate map/network failure. Do not exhaust live quota just to test errors.
- **Small task sequence:** official documentation/credential decision → sourced fixtures → map proof → walking proof → basic URL recovery → deployed smoke evidence. Use deterministic fixtures for routine tests.
- **Commit checkpoints:** `docs: verify zero-cost provider contracts`, `feat: prove Dublin map and walking integration`, `feat: prove basic route restoration`.

## Milestone 3 — Verified pub catalogue and design

- **Objective:** provide trustworthy pub discovery and a coherent responsive presentation.
- **Deliverables:** approximately 24 static records with the product brief's provenance fields; dataset licence/attribution; equivalent map markers and browsable list; reusable visual tokens and controls; refined homepage and mobile layout.
- **Dependencies:** accepted integration proof, permitted sources, a stable ID/status convention and sourced coordinates.
- **Acceptance:** records have unique permanent IDs, verified identity/address and explicit coordinates, source references, dates and status; no fabricated venue claims; map/list entries agree; retired records remain explainable; browse works without map availability.
- **Common risks:** unlicensed data, swapping latitude/longitude, selecting building centres instead of usable entrances, stale venue claims, premature decorative work.
- **Manual verification:** review every source and coordinate; inspect pedestrian access and route endpoints where practical and record unresolved checks; compare list/markers; test readable responsive layouts, keyboard access and attribution visibility.
- **Small task sequence:** schema/provenance convention → curate small reviewed batches → list/marker connection → responsive design review.
- **Commit checkpoints:** `data: add verified Dublin pub catalogue`, `feat: add accessible pub discovery`.

## Milestone 4 — Accessible route editing

- **Objective:** let visitors build and revise their exact ordered plan.
- **Deliverables:** pure operations/reducer for add, remove, replace and reorder; numbered list and count; duplicate/12-stop rules; empty/full feedback; Move up/down controls and predictable focus.
- **Dependencies:** accepted catalogue, stable IDs and status policy; basic integration state must evolve without breaking proven map/URL behaviour.
- **Acceptance:** empty editing state and 1–12 distinct selections behave correctly; add/replace cannot introduce duplicates or exceed 12; replacement occupies the intended position; boundary move operations are safe; removals/counts/order are correct; shorter routes are valid. No drag-and-drop dependency or optimisation.
- **Common risks:** focus loss on removal/reordering, index/ID confusion, duplicate replacement, inaccessible full-state feedback, mixing editing state with provider responses.
- **Manual verification:** perform each operation with keyboard and touch; move first/last stops; replace with an already selected pub; reach the limit, remove a stop and add again; verify focus and announced status with assistive technology where available.
- **Small task sequence:** pure route rules → controls and focus → empty/full/error states → interaction review.
- **Commit checkpoints:** `feat: add route selection operations`, `feat: add accessible route reordering`.

## Milestone 5 — Resilient walking routes and summary

- **Objective:** ensure walking results always describe the current ordered plan and failure does not break editing.
- **Deliverables:** connect editing to the small routing module; debounce, duplicate avoidance, cancellation and independent stale-response rejection; response validation; per-leg geometry/instructions/metrics, totals and editable summary; explicit loading/error/retry states.
- **Dependencies:** accepted editing and proven routing contract. Storage terms must be checked before any persisted response cache; none is assumed.
- **Acceptance:** no request below 2 stops; complete order submitted; N−1 valid legs; finite non-negative metrics; totals summed before rounding; obsolete responses never become current, including an A→B→A change. Invalid geometry/schema, no-route, timeout, authentication, quota and service failures preserve selection; appropriate explicit retry works without loops. Estimates exclude pub visits.
- **Common risks:** response races despite cancellation, duplicate calls, displaying old results, total-rounding errors, straight-line fallbacks mislabelled as directions, excessive quota use.
- **Manual verification:** rapid add/remove/reorder and reset to one stop; slow network; mocked delayed and out-of-order responses; each error/retry state; compare summary/order/map; inspect one approved live walking journey separately from deterministic tests.
- **Small task sequence:** validated result module → request lifecycle → summary and leg display → recovery tests and browser review.
- **Commit checkpoints:** `feat: validate walking route results`, `feat: handle routing changes and failures`, `feat: add editable walking summary`.

## Milestone 6 — Robust route sharing

- **Objective:** make shared plans durable, predictable and recoverable.
- **Deliverables:** final versioned parser/serialiser, explicit invalid-link repair UI, retired/unknown ID handling, copy/share feedback, and defined refresh/back/forward behaviour.
- **Dependencies:** accepted route rules and summary; permanent IDs with retirement records; a documented URL grammar, input-length limit and history policy chosen before implementation.
- **Acceptance:** test default/empty, all valid route lengths 1–12, exact order, duplicates, syntax, excessive length, too many stops, unknown/retired IDs and unsupported versions. Refresh and another device restore the plan; back/forward follows the chosen policy without stale results or feedback loops. No silent repair. Incoming URL takes precedence over any future draft; URLs contain no credentials/coordinates/provider responses.
- **Common risks:** partial restore silently changing a plan, parse/write loops, excessive history entries, malformed percent encoding, ID reuse, clipboard failure.
- **Manual verification:** open generated links in a fresh browser/device; refresh/back/forward; exercise malformed and retired links and each explicit repair; simulate failed copy and use an accessible fallback. Recalculated estimates may differ while order must not.
- **Small task sequence:** grammar/history decision and pure parser → recovery UI → browser-history/cross-device verification.
- **Commit checkpoints:** `feat: validate versioned share links`, `feat: restore and repair shared routes`.

## Milestone 7 — Product polish and regression testing

- **Objective:** make the complete core journey usable, accessible and consistent.
- **Deliverables:** mobile/desktop refinements, reduced-motion and focus review, consistent empty/loading/error/full states, a small Playwright regression suite, and an evidence-based performance review.
- **Dependencies:** accepted editing, walking and sharing; deterministic mocked provider responses; real-device/browser checks where available.
- **Acceptance:** core browse→select→reorder/replace→review→share journeys pass with mocks; map/directions failures and invalid links remain recoverable; keyboard/touch interaction and attribution work; no unresolved launch-blocking accessibility or functional defect. Document performance measurements with environment and method rather than invented targets or gains.
- **Common risks:** brittle snapshots, tests mirroring internals, heavy decoration, losing focus during responsive layout changes, broad browser claims from one emulator.
- **Manual verification:** mobile/desktop widths, keyboard-only journey, touch and screen-reader checks, reduced motion, zoom/reflow, browser console, throttled network; record actual browsers/devices and limits.
- **Small task sequence:** review findings → focused fixes → critical end-to-end tests → regression and performance evidence. Optional drag-and-drop only after accessible controls are accepted.
- **Commit checkpoints:** `test: cover core planning journeys`, `fix: resolve launch usability findings`.

## Milestone 8 — Public launch and portfolio preparation

- **Objective:** verify the release against the product definition of done and make it explainable/reproducible.
- **Deliverables:** verified production deployment and hosted CI for its source commit; reproducible README/setup, architecture/data flow, provider configuration/quotas/revocation and recovery instructions, licensing/attribution, known limitations, accurate screenshots, short demo, and evidence-backed CV bullets.
- **Dependencies:** accepted prior gates, approved deployment, current free-plan verification and data review. Recheck plan/usage-policy changes before launch.
- **Acceptance:** every item in the product brief's definition of done has recorded evidence; a live deployed journey succeeds, including exact order on another device; automated checks pass; €0 configuration is documented; no unsupported performance/user/production-scale claims. Owner can explain the principal engineering trade-offs.
- **Common risks:** documenting planned features as delivered, stale screenshots, deploying a different commit than tested, missing attribution, assuming free allowances prevent overages, inaccessible quota recovery.
- **Manual verification:** reproduce setup from the lockfile; inspect deployed commit and hosted CI; complete live desktop/mobile journeys, share across devices, inspect route endpoints and attribution, confirm account plans/limits without deliberately exhausting quota, and rehearse the demonstration.
- **Small task sequence:** final verification → targeted corrections → operating/docs/demo materials → owner launch review.
- **Commit checkpoints:** `docs: prepare launch and operating guide`, `docs: record verified launch evidence`.

## Task and review workflow

### Approve an outcome

A request normally supplies the user outcome, relevant UX/behaviour, constraints and non-goals, observable acceptance criteria, and any consequential decisions reserved for the owner. A detailed human-authored implementation plan is unnecessary. Interpret criteria as behaviours to demonstrate, including relevant failures; clarify material conflicts while continuing independent safe work. Existing product/provider gates still apply.

### Execute and verify

Codex inspects the relevant repository context, makes a short working plan, implements the complete approved outcome, adds meaningful tests, checks the affected journeys and fixes in-scope failures. Related subparts and corrections do not need separate prompts or approval. Reuse existing modules/styles; do not expand product scope or introduce speculative infrastructure.

Use the proportionate checks in [AGENTS](../AGENTS.md#verify-and-hand-off) and the [README browser procedure](../README.md#browser-verification). A fresh checkout needs `npm ci`; the shared full check is `npm run verify`. Documentation-only changes need documentation checks. Broaden testing when the risk or evidence warrants it, not as a ritual after every edit. Test provider failures with deterministic mocks; live tests require a separately approved budget and configuration.

Stop only for a genuine unmet requirement, material product/security/cost decision, missing essential data/tool or protected operation. Explain the evidence, recommended resolution and minimum owner decision. Do not hand back ordinary implementation errors without attempting in-scope correction.

### Review and publish

The handoff covers **Delivered, Changed, Verified, Decisions, Limitations and Review**: the completed outcome, meaningful files, actual checks, consequential choices, remaining uncertainty and what the owner should inspect or approve. Use concise links/diffs rather than repeating full research. Distinguish ready for review from owner **Accepted**, known defects from **Needs correction**, and unperformed checks from **Unverified**.

Local commits containing only approved task work on a safe feature branch/worktree are allowed. Keep unrelated unpublished changes separate, stage explicit files, and review the complete commit. Pushes to any remote, merges into `main`, and production/preview deployments need explicit owner approval. Explain automatic deployment consequences before requesting publication; an approved push does not authorise manual redeployment or service settings changes. Verify hosted CI and any deployment against the exact published SHA, with public smoke evidence and honest limitations. Never rewrite history or erase user work to simplify publication.

After meaningful work, record delivered behaviour, consequential decisions, verification, unresolved gates and next action in the existing progress/decisions documents. Keep dated research and milestone evidence intact; Git retains fine-grained edit history. Update current summaries when status changes. Owner acceptance of one outcome does not start the next milestone or clear provider/financial gates. No copy-and-paste relay between ChatGPT and Codex is required for routine execution.

### Codex capabilities without extra process

Use the local terminal, browser and review panel immediately. Prefer one primary implementation agent; use a worktree when it protects unrelated work or isolates an independent feature, not for every small edit. Give parallel agents independent responsibilities and explicit file ownership; read-only audits are useful alongside implementation. Review integration and combined checks before combining changes. The app's [worktree guidance](https://learn.chatgpt.com/docs/environments/git-worktrees) describes isolated checkouts with shared Git metadata; it does not authorise merges.

For substantial work with an uncertain path, the owner can explicitly request a persistent [Codex Goal](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) with a measurable finish line, verification, scope and blocked stop condition. A Goal does not override approvals. A normal feature request is sufficient otherwise; no Goal is required or activated by this workflow.

Skills and scheduled-task tools are available in the current desktop environment, but no project-specific skill or automation is needed yet. Consider a skill only after a repeated procedure needs reusable tooling beyond these instructions. Consider read-only CI monitoring only with explicit owner approval and a useful notification policy; do not schedule it now. Defer Playwright until implemented journeys justify end-to-end coverage. No plugin, orchestration library or new planning-document hierarchy is introduced. Capability availability is a dated observation, not a guarantee for every future session; recheck only what the task needs.

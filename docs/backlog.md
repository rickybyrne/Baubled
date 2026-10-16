# Development backlog

Plan established 16 October 2026; overall product direction approved by the owner on 17 October. [Product brief](product-brief.md) owns launch requirements; [decisions](decisions.md) owns technical choices; [progress](progress.md) records verified status. Milestones are gates, not instructions to implement everything at once. The documentation checkpoint is authorised for publication; future commit subjects are suggestions only and require explicit owner authorisation.

## Milestone 1 — Foundation and hosted skeleton

**Status:** in progress. The local foundation is already committed and pushed as `0293e6da409815bc894c98fad5c0f676b2037e7e`; its hosted Validate workflow passed. Do not repeat scaffolding or Git setup. Public deployment and its verification remain outstanding.

- **Objective:** establish a reproducible, accessible, version-controlled skeleton with a verified public deployment.
- **Deliverables:** preserve the React/Vite homepage and planner placeholder, strict TypeScript/Tailwind, focused tests, lint/build scripts, CI, and current documentation. Complete hosted skeleton verification in a separately approved task.
- **Dependencies:** owner review of this plan (satisfied 17 October); current Node/npm setup; explicit approval for any hosting account and deployment; verification that the selected hosting plan enforces €0 for this personal use.
- **Acceptance:** clean lockfile install and all required checks pass; GitHub contains the canonical commit; hosted CI passes for the deployed source; the public skeleton loads without secrets or provider services; documentation distinguishes placeholder and planned product.
- **Common risks:** conflating a build with deployment evidence, repeating obsolete Git setup, unsupported local runtime, unintentionally adding paid services, calling the entire milestone complete after local checks only.
- **Manual verification:** dev and production preview at 375px/1280px; no overflow; Tab/Enter skip link and CTA destinations/focus; console check. After approval, repeat on the public URL, including refresh and a mobile browser.
- **Small task sequence:** accept this plan (done) → publish the approved documentation → verify hosting eligibility/configuration and prepare deployment instructions → owner-approved deployment → verify and record deployed evidence. Correct foundation issues only if found.
- **Commit checkpoints:** existing `feat: initialise Baubled application foundation`; authorised `docs: establish Baubled product plan`; later `docs: record verified skeleton deployment` (include configuration only if actually required).

## Milestone 2 — Integration proof

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

Each future implementation prompt contains one immediate objective and necessary context; instructions to inspect AGENTS.md, relevant docs, actual code/dependencies/tests and Git status; precise behaviour and exclusions; preservation requirements; technical/data contracts; observable acceptance including failures; appropriate automated/manual checks; and a handoff reporting files/reasons, commands/results, unperformed checks, limitations and a suggested commit checkpoint.

Use focused changes and existing conventions; do not invent files/components, refactor unrelated work, install speculative dependencies, or weaken meaningful tests. Use deterministic mocked provider responses for routine checks and a separate approved deployed live smoke test. Review relevant code/diffs, record what was not inspected, and request only evidence missing for the decision.

Classify each result **Accepted**, **Needs correction**, or **Unverified**. Await owner observations and review before advancing dependent work. When correction is needed, prepare one focused correction task. Completing a task does not automatically complete its milestone or authorise accounts, credentials, commits, pushes, deployment, or the next feature.

After each accepted milestone, add a short learning note: central concept, implementation data flow, one debugging/prediction exercise and the key interview trade-off. Launch claims must trace to implemented features or measured evidence.

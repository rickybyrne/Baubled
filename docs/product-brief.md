# Baubled product brief

Authoritative product specification, established 16 October 2026 from the owner's updated brief. The owner approved the overall product direction on 17 October 2026. This describes the intended launch, not functionality already delivered. Read [progress](progress.md) for implementation evidence, [backlog](backlog.md) for sequencing, and [decisions](decisions.md) for technical choices and verification gates. Changes to launch scope require owner approval.

## Purpose and priorities

Baubled is a mobile-first Dublin pub crawl route builder inspired by the 12 Pubs of Christmas. Visitors discover genuine pubs, choose and order stops, review realistic walking directions, and share the plan through a URL. Dublin is the only supported city at launch.

This is a personal, non-commercial software engineering portfolio project. The product should feel like a coherent consumer application, with code and trade-offs the owner can understand and explain in interviews.

Priorities, in order:

1. A complete, reliable core journey.
2. Understandable, maintainable architecture.
3. Excellent mobile usability and accessibility.
4. A distinctive Christmas identity.
5. Strictly controlled operating costs: **€0 per month is a hard constraint**.
6. Reliable automated and manual verification.
7. Evidence-backed portfolio claims.

## Launch journey

### Homepage and visual identity

A responsive homepage introduces Baubled and provides a clear “Plan your route” CTA. Use forest green, warm cream, rich red, and restrained gold; consistent typography, spacing, controls, and interaction states; subtle festive decoration; and reduced-motion support. Prefer semantic HTML, accessible names, native controls, visible keyboard focus, and touch targets of at least 44px. The complete journey must work on mobile and desktop with keyboard and touch.

### Discover pubs

Provide an interactive central Dublin map and an equivalent browsable list of approximately 24 curated, verified pubs. Markers and list entries represent the same stable catalogue records. Names, addresses, coordinates, source provenance, and required attribution must be accurate. The static catalogue is version-controlled; no live venue search or runtime geocoding is required.

The list and editing controls remain usable if the map fails. Missing or retired venue information is explained rather than fabricated. Do not promise current opening status, admission, or Christmas-group acceptance without verified evidence.

### Build and edit a route

Users can add, remove, replace, and reorder between 1 and 12 unique pubs. Show a numbered list, selection count, and understandable empty and full states. Replacement must preserve a valid unique selection; it is not permission to choose a recommendation automatically. Provide accessible Move up and Move down controls with sensible focus behaviour. Drag-and-drop is optional polish, not a launch dependency.

Exactly 12 distinct stops make a complete traditional “12 Pubs” route. Shorter plans remain usable and shareable. Empty selection is a valid editing/default state. Preserve the user's exact order; never optimise automatically or append a return to the starting pub.

### Review walking directions

From two selected pubs onward, show street-following geometry, readable instructions, distance and estimated walking duration for each leg, plus total distance and estimated duration in an editable route summary. One pub has no walking legs. For N selected pubs with N ≥ 2, expect N−1 legs. Totals use unrounded values before presentation rounding. Label walking distances and durations as estimates and explain that time inside pubs is excluded.

Directions are a plan, not live GPS navigation. Never present straight connecting lines as genuine walking directions.

### Share the plan

Use a versioned root-page query string, for example `?v=1&pubs=p001,p017,p009`; these are illustrative IDs, not catalogue records. Store permanent IDs and exact order only, never names, coordinates, provider responses, or credentials. No account or database is needed. Reopening the link restores the plan after refresh and on another device; walking estimates may be recalculated.

Define and test empty/default input, valid 1–12-stop routes, exact order, duplicates, malformed syntax, excessive input length, more than 12 stops, unknown IDs, retired IDs, unsupported versions, refresh, and browser history. Explain invalid input and offer explicit recovery; do not silently drop or replace stops. Incoming shared routes take precedence over any future local draft. A routing library is not required solely for sharing.

## Data contract and provenance

Start with a small sourced set for integration, then expand to approximately 24 pubs. Every record contains:

- Permanent stable ID, name, and address.
- Separate longitude and latitude fields.
- Coordinate source/reference and identity/address verification source.
- Verification date and availability or retirement status.

Use appropriately licensed geographic data and corroborate identity/address details with reliable sources, preferably official venue information or direct observation. Check pedestrian entrances and routing endpoints where practical; document unresolved endpoint concerns and resolve material routing issues before launch. Do not invent venue facts or coordinates, reuse IDs for different venues, or delete retired records needed to explain old links.

Keep dataset licensing and provenance distinct from the code licence. Preserve required map and data attribution. Do not scrape/import ratings, photos, prices, or opening hours without a permitted, justified source.

## Architecture and reliability contracts

Retain React, Vite, strict TypeScript, Tailwind, npm with one lockfile, ESLint, Vitest, React Testing Library, and GitHub Actions. Add a small Playwright suite later where meaningful. Do not migrate to Next.js for CV value.

Separate ordered selected pub IDs, calculated results for that exact selection, and temporary interface state. Prefer `useReducer` for editing, pure functions for route operations and URL parsing, local state for small interface concerns, and Context only when useful. Contain map-specific code and normalise responses through one small routing module. Avoid speculative libraries or a generic multi-provider framework.

For each changed selection:

1. Update the selected list immediately. Do not request directions for fewer than two stops.
2. Briefly debounce routing and request the complete current order; avoid duplicate requests for identical current inputs.
3. Cancel superseded requests where possible, and independently reject responses whose request identity and ordered IDs are no longer current. Cancellation does not establish that the provider stopped processing or billing.
4. Validate response structure, street-following geometry, expected leg count, and finite non-negative distances/durations before accepting results.
5. On timeout, no-route, authentication, quota, network, or service errors, preserve selection, explain status, provide appropriate retry, and avoid automatic retry loops. Do not present stale results as current. Editing and sharing remain available independently of maps and directions.

A backend is not required by default. Propose a small serverless function only for a concrete need, such as a provider secret, with input validation and appropriate rate limiting. Explain its limitations and any separately metered map usage before approval.

## Budget and provider gates

The provisional combination is MapLibre GL JS, MapTiler Free, openrouteservice, and Vercel Hobby for eligible personal/non-commercial hosting. These are candidates, not approved production integrations. The 14 October 2026 research is historical and must be rechecked before use. Do not silently restore potentially billable Mapbox services.

Before integration, verify official current documentation for ordered 12-stop walking capability, waypoint limits, geometry, readable instructions, per-leg metrics, coordinates and response schema, authentication, frontend versus server credentials, free-plan eligibility, quotas/rate limits, charge prevention, attribution/licensing, storage/caching, and deployment-origin restrictions. Record primary links, check dates, and limitations in [decisions](decisions.md).

Free allowances and alerts alone do not guarantee €0 spending. Prefer provider-enforced suspension or rejected requests at limits; temporary unavailability is acceptable. Do not create accounts, use credentials, enable billing, make live paid requests, or deploy infrastructure without explicit owner approval. Never request credentials in chat or treat frontend environment variables as secret storage. Do not persist provider response caches before checking current storage terms.

## Deferred features

Authentication, payments, saved-route databases, ratings, pint prices, popularity scores, recommendations, automatic route optimisation, collaborative editing, additional cities, live venue search, runtime geocoding, live GPS/continuous rerouting, offline maps, social-preview image generation, and complex backend infrastructure are outside launch scope. Future additions need explicit approval. “Smart planner” means displaying the user's chosen plan; it does not authorise recommendation algorithms.

## Definition of done

The first public release is complete only when:

1. A new visitor can open the deployed app and explore genuine Dublin pubs by map or list.
2. They can select 1–12 unique pubs, remove/replace stops, and reorder them.
3. Walking geometry, instructions, distances, and estimated durations match the current ordered selection; one stop has no walking legs.
4. A versioned share link restores the exact order across refresh and devices.
5. Invalid links and provider failures have clear recovery without losing the plan.
6. Keyboard, touch, mobile, desktop, focus, and reduced-motion behaviour are verified.
7. Data provenance, dataset licensing, and provider attribution are present.
8. Relevant automated checks and hosted CI pass, and a deployed live journey is manually verified.
9. The approved configuration enforces the €0 operating constraint, with documented limits and operating instructions.
10. Setup is reproducible; documentation accurately explains implementation, architecture, configuration, limitations, and evidence. The owner can demonstrate and explain the main engineering choices.

## Review and learning

Work one scoped task at a time under [the backlog workflow](backlog.md#task-and-review-workflow). Classify results as Accepted, Needs correction, or Unverified using actual evidence and owner observations; do not advance dependent work before review. Tests use deterministic mocked responses, with a separate approved deployed live-provider smoke check. A build is not live integration evidence, and a screenshot is not data verification.

After each accepted milestone, explain one central concept, trace data flow, give one small debugging/prediction exercise, and record an interview trade-off. Launch materials include accurate screenshots, a short demonstration, architecture/setup documentation, known limitations, and CV bullets supported by implemented features and measured evidence. Never invent users, performance gains, customers, or production-scale claims.

# Architecture decisions

## Canonical repository — 16 October 2026

The owner selected `/Users/rickybyrne/Documents/ChatGPT/baubled` as the permanent, authoritative project, with `https://github.com/rickybyrne/Baubled.git` as its remote. Start an independent initial history from the current React/Vite foundation. Do not import earlier Baubled files, history, instructions, or architectural decisions. The obsolete local repository remains untouched pending a separate deletion request. This decision does not change the application stack, scope, or €0 budget.

## Local foundation — 14 October 2026

Use a single React root page with Vite, strict TypeScript, and Tailwind's Vite plugin. Native fragment links handle navigation without a router or state library. System sans-serif and Georgia provide typography without network requests. CSS theme tokens define forest green, cream, red, gold, spacing, and type; no animation or smooth scrolling is used.

Keep one npm lockfile and exact direct dependency versions. Node 24.19.0 and npm 12.2.0 are aligned locally and in CI. React/React DOM 19.3.1, Vite 8.3.4, Tailwind 4.3.3, ESLint 10.12.0, Vitest 5.0.4, and React Testing Library 16.3.3 were selected from official npm metadata. TypeScript is intentionally 6.0.3: typescript-eslint 8.71.2 declares support for TypeScript >=4.8.4 and <6.1.0, so the latest TypeScript 7.0.2 was not selected. Node types stay on major 24. Full exact versions are in package.json and package-lock.json.

Setup references checked for this task:

- [Vite getting started](https://vite.dev/guide/)
- [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite)
- [Vitest getting started](https://vitest.dev/guide/)
- [React Testing Library setup](https://testing-library.com/docs/react-testing-library/setup/)
- [Node release lifecycle](https://nodejs.org/en/about/previous-releases)
- [Official npm registry metadata](https://registry.npmjs.org/)

The tests check user-facing markup and destination contracts. They do not establish browser focus, anchor scrolling, or responsive layout. Production validation always includes TypeScript checking; Vite transpilation alone is insufficient.

## Future contracts (not implemented)

- Dublin only; 1–12 distinct pubs.
- Preserve user-selected order. No automatic optimisation and no return leg.
- One stop has no walking legs.
- Keep ordered selected IDs, walking results, and interface state separate.
- Share links will encode a version and ordered permanent pub IDs, never coordinates or provider responses.
- Frontend environment variables are public, not secret storage.
- Provider failures must leave route editing and sharing usable.
- Maps and directions may become unavailable at quota limits rather than incur charges.

## Owner-supplied prior research — 14 October 2026

The following is prior research supplied by the project owner, **not provider-policy verification performed in this task**:

- Mapbox was rejected because it lacks an enforceable monthly spending cap. [Reference](https://docs.mapbox.com/accounts/guides/invoices/)
- MapTiler Free was provisionally selected for maps because its published policy pauses service at quota. MapLibre is the intended rendering library. [Reference](https://www.maptiler.com/cloud/pricing/)
- openrouteservice Standard was provisionally selected for walking directions because it provides a €0 plan with enforced request limits. [Plans](https://account.heigit.org/info/plans) · [Terms](https://account.heigit.org/info/tos)
- Vercel Hobby is intended for this personal/non-commercial deployment. [Reference](https://vercel.com/docs/plans/hobby)

## Integration gates and unresolved questions

Before any provider integration, verify authentication and browser-origin restrictions, full response contracts and failure handling, attribution/licensing, quota enforcement without charges, and current eligibility for the intended usage. Determine how public frontend credentials should be constrained; do not assume they can be secret. A deployed Dublin walking-route smoke check remains an integration gate. No accounts, keys, mapping dependencies, services, or billing are configured now.

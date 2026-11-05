# Baubled working agreement

Personal, non-commercial, mobile-first Dublin pub-crawl planner. **€0/month is a hard limit:** outages at enforced free-plan limits are acceptable; unexpected charges are not.

Canonical repository: `/Users/rickybyrne/Documents/ChatGPT/baubled`, remote `https://github.com/rickybyrne/Baubled.git`. Managed worktrees are valid isolated checkouts. Leave obsolete Baubled projects untouched. Preserve React 19, Vite 8, strict TypeScript, Tailwind, npm and the single lockfile; Node is pinned in `.nvmrc`.

## Read selectively

Inspect Git status, current task requirements and relevant source before editing. Use these existing sources; read only sections needed for the objective, not every historical report:

- [README](README.md): setup, commands and browser-check procedure.
- [Product brief](docs/product-brief.md): authoritative requirements and launch definition.
- [Backlog](docs/backlog.md): priorities, dependencies and feature-delivery workflow.
- [Decisions](docs/decisions.md): architecture, provider contracts and security/cost gates.
- [Progress](docs/progress.md): implementation status and dated verification evidence.
- [Deployment](docs/deployment.md): production configuration and deployed evidence.

Milestone 1 is accepted and deployed. This isolated branch contains the authorised Milestone 2 offline integration proof; live providers, pedestrian entrances and deployed acceptance remain unverified. Read current progress before continuing. Roadmap entries are not authorisation. Current owner instructions take precedence over older task-specific restrictions; preserve dated reports as history.

## Own the approved outcome

- Follow **Inspect → Plan → Implement → Test → Fix → Verify → Report** without requesting approval between routine steps. Derive the implementation plan; deliver related subparts together and correct in-scope failures until acceptance criteria pass or a genuine blocker remains.
- Preserve unrelated work. Prefer an isolated worktree when unpublished changes would mix with the task. Never discard, stash, overwrite or commit someone else's changes without approval. Use explicit file lists for staging.
- Choose straightforward components, modules, types, fixtures and error handling. Reuse existing code/styles; avoid speculative abstractions, dependencies and unrelated refactoring. Test behaviour through accessible queries, not snapshots or CSS-class assertions. Do not weaken tests, TypeScript or lint to obtain a pass.
- Keep selected IDs, provider results and UI state separate. Preserve permanent pub IDs, exact order, 1–12 unique stops, N−1 legs and versioned ID-only sharing. Never invent venue data or present straight lines as walking routes. Keep map code contained and routing in one small module.
- Follow `src/styles.css`: forest green, cream, red, gold and existing typography/spacing. Preserve semantic HTML, accessible names, keyboard navigation, visible focus, reduced motion and 44px touch targets. Fix related accessibility regressions within scope.
- Use deterministic provider mocks in ordinary tests. Frontend env variables are public; keep ORS credentials server-only. Do not persist provider responses or tiles without a verified storage/licensing decision.
- Default to one implementation agent. Delegate only independent work with clear file ownership, such as read-only review. Review combined changes and verification before integrating parallel work.

## Autonomy and protected operations

Within an approved objective, local code/tests/docs, builds, dev servers, browser checks, reversible refactoring, ignored temporary artefacts and task-only commits on a safe feature branch/worktree are authorised. Local commits do not authorise publication. Respect sandbox/security permissions and any narrower instruction in the task.

Obtain owner approval for remote pushes; merges or commits to `main`; production/preview deployment; Git remote/security changes; provider/Vercel settings, accounts or credentials; anything potentially chargeable; new infrastructure; major architecture/framework changes; significant dependencies; material product/design/scope changes; destructive Git operations or deletion of user work/history; and live-provider testing with an explicit bounded budget. A push to `main` can automatically deploy production; account for that consequence in the approval request.

The Option B architecture remains accepted in principle. **Public WAF rate-limit activation and public live routing remain blocked** until the Hobby financial/enforcement gate is resolved and approved. Free allowances, spend alerts, client throttles and research acceptance do not clear that gate. Do not start integration merely to demonstrate the workflow.

Escalate a conflicting requirement, material UX/security/cost decision, unavailable essential data/tool, unapproved external operation or unsafe work preservation. State the evidence, smallest recommended resolution and decision needed; continue independent safe work. Ordinary implementation choices and fixable in-scope failures are not approval gates.

## Verify and hand off

- Install with `npm ci` for a fresh checkout or changed dependencies; avoid reinstalling unchanged dependencies for every edit. Use npm only. Do not install machine-wide tools or change shell settings without approval.
- `npm run verify` runs lint, tests and the typechecked production build, matching CI. Use focused checks while iterating; run the full command for features, bug fixes affecting shared behaviour, and script/configuration changes. Broaden regression checks for high-risk work. Repeat expensive checks only after relevant changes or failures.
- Documentation-only work needs diff/Markdown/local-link/secret checks, not an application rebuild. Small non-behavioural edits need proportionate static or focused checks.
- For affected UI, follow the [browser checklist](README.md#browser-verification) on dev and production preview at 375px/1280px. Check real browser behaviour and correct regressions; viewport emulation is not physical-device or screen-reader evidence. Report unavailable checks.
- Before handoff, review the full diff, run `git diff --check`, verify file scope and secret safety, and record material facts in progress/decisions as appropriate. Preserve historical evidence; use Git for routine edit history.
- Report delivered outcome, meaningful changes, verification, consequential decisions, limitations and what needs owner review. Mark unperformed/live checks **Unverified**; reserve **Accepted** for owner acceptance. Code alone is not completion, and local verification is not a hosted CI/deployment result.

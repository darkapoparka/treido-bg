# Agent execution contract

Read this file at the start of every session. Work in this repository, not in `treido-next`. The canonical document map is in [README.md](README.md). Current work and evidence live only in [tasks.md](tasks.md).

## Mission and fixed boundaries

Build the full Treido product, not a demo. The selected architecture is a small pnpm/Turborepo monorepo: `apps/web` is the COMPLETE browser platform; `apps/mobile` is the Expo native buyer application. The account, full selling dashboard, and admin capabilities are retained in scope. Follow [architecture.md](architecture.md) and [requirements.md](requirements.md).

The buyer design sequence is mandatory: exact selected Shop reference -> documented fidelity approval -> Treido branding and food terminology -> renewed verification. Follow [design.md](design.md). Do not rebrand early or improvise a different buyer composition. Merchant and admin screens have their own explicit acceptance; Shop buyer screenshots are not their specification.

A new repository does not make old code worthless or new code correct. Reuse only relevant, inspected behavior under [migration.md](migration.md). Do not import the old application, global CSS, service wrappers, or historical instructions wholesale.

## Session protocol

1. Read `tasks.md` and the owning documents for the selected task. Inspect current files, scripts, Git status, branch, and uncommitted work. Do not overwrite another agent's changes.
2. Select the earliest ready task whose dependencies and required decisions are satisfied. Record the task claim and touched areas in the existing task ledger. Only one agent edits a given feature, schema, root dependency configuration, or visual baseline at a time.
3. State the acceptance criteria and intended boundary of the change before coding. Inspect existing implementations and tests before creating alternatives.
4. Verify current official documentation and package metadata for the relevant installed versions. Use available Next.js, Expo, database, auth, browser, and testing guidance. Generic skill examples do not authorize changing our product, installing extra services, resetting databases, or changing themes.
5. Implement the smallest complete behavior for the task. Add or adjust tests at the real failure boundary. Thin routes are useful; an arbitrary number of layers is not.
6. Execute the applicable checks from [verification.md](verification.md), inspect the actual UI when it changed, and examine persisted state when commerce changed. Missing credentials or devices are blockers to the corresponding proof, not permission to mark it passed.
7. Review the diff for regressions, unused code, accidental dependencies, secrets, and unrelated edits. Update the owning contract only when the behavior/decision intentionally changed.
8. Update `tasks.md` with exact commands/results, platform/environment scope, evidence references, limitations, and the next ready task. Commit with the task ID. Do not write another handoff/backlog file.

## Decision discipline

The architecture is selected, not infallible. Do not restart the framework debate during routine feature work. Propose a change only with a concrete requirement, measured failure or incompatibility, alternatives, migration impact, and owner approval recorded in the decision log in `architecture.md`.

Do not invent business answers to unblock yourself. Use the decision register in `requirements.md`. When evidence can answer a question, inspect it first. When a decision is missing, work on independent ready tasks and report the narrow blocker. Do not ask again for a decision already recorded here.

Current manifests and verified provider configuration establish actual runtime facts. These documents establish product and engineering intent. A mismatch is something to resolve and record, not silently reinterpret. Legacy documents and generic tutorials never override the new owner-approved direction.

## Implementation rules

- Server code owns identity, authorization, stock, money, allowed transitions, review eligibility, and entitlements. Never trust a client-supplied workspace ID or total as authority.
- One owner per business rule. Web and native use the same commerce behavior. Do not expose Server Actions as the native API or call our own HTTP API from Server Components unnecessarily.
- Client-safe packages must not transitively import database clients, provider secrets, `next/headers`, `server-only`, or Node-only modules. Do not import web UI into native.
- Add dependencies for a named current requirement. No speculative microservices, generic repository pattern, CQRS/event-sourcing framework, universal web/native component system, or broad state store by default.
- Use one authoritative component per visual role. Avoid `new-*`, `v2-*`, alternate homes, and permanent legacy/reference skins. Delete replaced active code after its replacement is accepted; preserve history in Git.
- Correct styles at their owner. Do not add global class-substring overrides or universal `!important` patches. Accessibility/reduced-motion styles are explicit, scoped exceptions, not excuses to disable all transitions.
- No fake production data, fake success toasts, invented review counts, profits, delivery promises, or simulated payments. Deterministic fixtures are allowed only in visibly marked, isolated test/reference environments.
- Use explicit errors and recovery. Do not hide exceptions behind successful empty responses. Log sanitized diagnostic context, not private payloads.
- Keep dependencies, schema changes, design changes, and unrelated feature work in separate reviewable commits whenever possible. Do not bulk upgrade during a fidelity task.

## Safety and public-repository rules

The repository is public. Never commit `.env` values, authentication state, API tokens, connection strings, customer data, private logs, signed media URLs, licensed font files, or third-party reference screenshot collections. BOOT-001 must establish ignore rules and a secret check before credentials/assets enter the workspace. Use placeholders only in env examples.

Before any database write, verify the exact project, branch/database, role, and environment through trusted configuration. A hostname, database name, or an `APP_ENV` label alone is not proof. Fail closed when the target is ambiguous. Use synthetic non-production data. No automatic `db push`, reset, migration repair, history rewrite, production seed, or copying production rows.

No live provider registration, DNS/domain changes, production deployments, app-store submission, billing activation, destructive cleanup, or visibility changes are implied by installing the stack. Those require separate owner authorization. Do not provision billable infrastructure just to run an isolated fixture screen.

Do not run a dev server and build against the same `.next` output concurrently. Do not kill unknown processes. Serialize migrations/code generation and root lockfile changes. Keep the old repo/database intact. Never force-push.

## Verification and reporting

Use the real scripts after BOOT-001 establishes them. Do not report a proposed command as executed. An empty suite, skipped database tests, Expo Go preview, screenshot capture, or HTTP 200 alone does not prove the relevant feature.

Every task completion includes: requirement IDs; changed files; actual commands and exit results; fixture/provider mode; browser/device and viewport where applicable; persisted effects checked; evidence reference; unresolved limitations. Use `ready`, `in-progress`, `blocked`, `review`, and `done` as defined in `tasks.md`.

Never auto-accept changed screenshots merely to make CI green. Source-reference approval and rebrand approval belong to the owner/design reviewer, not the implementation agent that generated them. Tests may be improved when wrong, but never weakened without a documented explanation.

If a check fails, fix the cause or leave the task blocked/review with exact evidence. A confident explanation is not a passing result. Never promise perfect software, 100% reference fidelity, production readiness, or a code-reduction percentage without the corresponding bounded evidence.

## First local Codex run

Read `README.md`, this file, `techstack.md`, `architecture.md`, and BOOT-001 in `tasks.md`. Establish the compatible stack and required scripts, validate the repository/environment, run the stated bootstrap checks, and record evidence. Do not begin arbitrary homepage styling, install next-forge, or connect the existing production database.

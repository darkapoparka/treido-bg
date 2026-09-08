# Agent execution contract

## Mission

Build the product specified in [product.md](product.md), in this repository, from a clean foundation. Build the buyer frontend against [design.md](design.md): selected Shop styling and flows first, approved Treido adaptation second. Build full account, merchant and admin functionality from the explicit feature contracts. Do not treat a previous application as the target to preserve.

The architecture is the selected Next.js + Expo pnpm/Turborepo monorepo. `apps/web` is the complete browser platform; `apps/mobile` is the native buyer app. Follow [architecture.md](architecture.md) and [techstack.md](techstack.md). The task/evidence authority is [tasks.md](tasks.md).

## Clean-build rule

These documents must be sufficient to understand what to build without another repository. No old-route audit, compatibility mapping, backend port, schema import or preservation check is mandatory. Do not import an earlier frontend or call this a reskin. Do not create new features merely because an old route exists.

An older project may be consulted for a specific question, just like another technical reference. New code is the default. Optional reuse must satisfy the current requirement, code ownership, tests and publication rights; it must not introduce undocumented dependencies. Access to old code is never a prerequisite for bootstrap or feature completion. If an unspecified business detail is genuinely needed, record the precise question in product.md instead of delegating it to unspecified old behavior.

## Every session

1. Read README.md, product.md, design.md and this file on the first session; subsequently read the current task and its owning contracts. Inspect actual files, Git status, branch, scripts and concurrent changes.
2. Choose a ready task whose dependencies are satisfied. Record a claim in tasks.md. One agent owns a feature/schema/root lockfile/visual baseline at a time; preserve unrelated work.
3. State the feature's acceptance criteria, implement the smallest complete behavior and test the actual failure boundary. Do not merely generate route placeholders.
4. Check current official guidance for installed versions when using SDKs/framework APIs. Skills are implementation references, not authority to change product scope or install unrelated services.
5. Run the applicable checks in verification.md. Inspect changed UI in a browser/device; inspect persisted records for data/commerce work. A proposed command is not an executed result.
6. Review the diff for dead code, speculative abstractions, unrelated edits and sensitive content. Update only the owning documentation when a decision changes.
7. Record commands/results, commit, environment/dataset, browser/device/locale, evidence, limitations and next task in tasks.md; commit with the task ID. Do not create another handoff/backlog.

## Code ownership and design discipline

- One server owner for identity, authorization, quantity/price/stock, allowed order transitions, review eligibility and entitlements. Web/native are clients, not separate commerce engines.
- Do not trust client totals or a selected workspace ID as authority. Authorize inside the owning query/command, including every HTTP or Server Action entry.
- Native uses the supported HTTP API. Client-safe packages cannot import Prisma, secrets, server-only, next/headers or Node-only dependencies. Do not import web UI into native.
- Add dependencies for named current needs. No speculative microservices, generic repository/controller framework, event-sourcing platform, global state layer or universal web/native UI system.
- Implement one canonical component per visual role on each platform. No permanent alternate homes, v2/new/legacy skins or a fixture frontend separate from the eventual real frontend.
- Shop is the buyer reference, not generic inspiration. Source access and evidence are required to claim a match. No early Treido colors, homemade spacing or substitute navigation. Merchant/admin use explicitly reviewed operational designs.
- Fix styling at its owner. No global class-substring overrides, broad shadow/blur resets or blanket !important patches. Explicit accessibility/reduced-motion support is not permission to disable all feedback.
- Reference fixtures are allowed only in marked, isolated test/reference environments. No fake success, payments, ratings, stock, profit or delivery promises in real application paths. Integration failure must not silently become mock success.
- Do not hide missing functionality by weakening tests, deleting feature scope or automatically approving new screenshots. Review visual changes against the actual reference, then against approved regression baselines.

## Decisions and blockers

Do not reopen the architecture debate during normal work. A change needs concrete evidence, alternatives, impact and owner approval recorded in architecture.md. Product/commercial decisions and intentional design deviations are recorded in their owning document. A narrow blocker blocks only dependent work; continue independent ready tasks.

The user has already selected the stack direction and reference-before-brand sequence. Do not ask for those decisions again. Exact missing screenshots, payment rules or approved taxonomy are genuine inputs; do not invent them or pretend they were verified.

## Safe operations

This is a public repository. No usable secrets, connection strings, customer rows, private logs, authenticated browser state, signed asset URLs, third-party screenshot collections or licensed fonts in Git. Establish ignores and secret checks before handling credentials/assets; env templates contain placeholders only.

Use fresh synthetic development/test data. Before a database write verify the actual authorized project/database/branch, role and environment; an environment label alone is insufficient. Never fall back to production credentials. Database migration commands are for the new schema, not permission to import or reset another application's database.

Do not edit applied migrations, reset shared data, seed production, force-push, kill unknown processes or overwrite concurrent work. Do not run dev/build against the same .next directory concurrently. Serialize schema/code generation and lockfile work.

Paid provisioning, live providers, DNS/domain changes, release deployment, billing activation, store submission and real-data transfer require explicit authorization. A documentation or installation task does not authorize them. Existing repositories/databases remain untouched unless separately requested.

## Acceptance and reporting

A done task names the requirement IDs, implemented behavior, commands/results, exact test scope and evidence. Unit mocks, real PostgreSQL, provider sandbox, device builds and production checks are different evidence. Empty/skipped suites, HTTP 200, a screenshot capture or Expo Go alone do not establish their broader claims.

Reference and brand approval belong to the owner/design reviewer, not the implementation agent. Do not claim unbounded 1:1, perfect software or production readiness. State exactly what passed and what remains unknown.

## First local run

Read README.md -> product.md -> design.md -> architecture.md -> techstack.md -> tasks.md. Execute BOOT-001: scaffold compatible official Next.js/Expo workspaces, establish scripts and meaningful checks, and record actual results. Do not require access to an old project; do not begin branding or touch production.

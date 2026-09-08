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
4. Discover and use the relevant available skills, plugins/MCP tools and official CLIs as described below. Check current official guidance for installed versions instead of guessing SDK APIs. Tools are implementation aids, not authority to change product scope or install unrelated services.
5. Run the applicable checks in verification.md. Inspect changed UI in a browser/device; inspect persisted records for data/commerce work. A proposed command is not an executed result.
6. Review the diff for dead code, speculative abstractions, unrelated edits and sensitive content. Update only the owning documentation when a decision changes.
7. Record commands/results, commit, environment/dataset, browser/device/locale, evidence, limitations and next task in tasks.md; commit with the task ID. Do not create another handoff/backlog.

## Skills, plugins and official CLIs

Inspect the capabilities actually available in the local session; do not assume they match another agent's environment. Read and apply relevant installed skills before the corresponding task: Next.js/React for web, Expo/React Native for mobile, Turborepo for workspace configuration, shadcn for web primitives, and browser/device verification for UI. Use database/auth/payment guidance when those features begin, not all skills at every session.

Use connected documentation tools such as Context7 or framework MCP when available and helpful. Use Mobbin tools or an authorized browser session for the exact Shop reference, and browser/device tools to inspect the implementation. A plugin listing is not a successful source read or a verification result. If a tool is unavailable, use current official docs or authorized supplied assets and record the precise limitation. Do not bulk-install unrelated skills/plugins or bypass access restrictions.

Prefer the official generators and installers over hand-written framework scaffolding: create-next-app for apps/web, create-expo-app for apps/mobile, shadcn init/add for needed web primitives, and expo install/check for Expo-compatible native packages. Invoke through the selected package manager, check current CLI help/options and existing files, then inspect the generated diff. Preserve the root docs and one workspace lockfile. Do not generate over completed work or overwrite approved component styling.

Prefer supported starter defaults within the selected architecture. Customize configuration only for a concrete requirement or reproduced issue. Record the actual resolved versions and commands once; do not turn compatibility checks into a framework-comparison project. Skills and CLI defaults do not override Shop geometry, approved product policy or safe environment boundaries.

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

## First local run and when Shop work begins

Read README.md -> product.md -> design.md -> architecture.md -> techstack.md -> tasks.md. Execute BOOT-001 using the relevant skills and official CLIs: a runnable web/native scaffold, compatible workspace resolution, basic checks and recorded results. Do not require an old project, provider accounts, paid infrastructure or the complete release test suite for this task. Use existing tooling for checks; do not create an elaborate framework merely to validate documentation.

REF-001 (inspect and specify Shop) can run alongside BOOT-001 without conflicting file edits. Once BOOT-001 and REF-001 are accepted, begin REF-002 immediately: source-measured buyer shell, navigation, cards/shelves and overlays on web/native, using isolated deterministic fixtures where needed. This is the beginning of reproducing Shop. It does not wait for BOOT-002, payment integration, the merchant dashboard or full device-release acceptance.

The backend lane BOOT-002 -> CONTRACT-001 -> BOOT-004 can progress alongside ready reference work. Build feature logic and connect the same UI incrementally; REF-003 and later tasks retain their real-data acceptance requirements. Do not call a fixture-backed screen a finished commerce feature. Complete the frozen reference scope and obtain REF-005 approval before BRAND-001 applies Treido colors and food content. This is one implementation developed in stages, not a disposable clone followed by another app.

A local assignment bounded to BOOT-001 ends at its stated checkpoint; report REF-001/REF-002 as next work rather than silently broadening the assignment. An assignment that includes reference implementation may proceed once those prerequisites are met. No additional documentation phase or full backend completion is required before the first source-matched UI.

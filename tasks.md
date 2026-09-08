# Execution queue

**Only this file owns implementation status and task order.** [requirements.md](requirements.md) owns feature scope. [AGENTS.md](AGENTS.md) defines the work loop. Updated: 2026-09-08.

## Current checkpoint

- Documentation foundation is being established; no application dependencies, source features, database migration, provider setup, CI result or device acceptance is claimed.
- Selected architecture: Next.js complete browser platform + Expo native buyer in a small pnpm/Turborepo monorepo, one authoritative commerce backend.
- Buyer order of work: selected Shop reference -> approved fidelity -> Treido branding/food adaptation. No early green/yellow/red redesign.
- Old source review was bounded at `11ed36fcb1ecd3c8b9d419a2858e1f9896f31af8`; full local inventory and selected Mobbin capture remain unverified.
- G0..G6 in `verification.md` are all unverified.
- **Next executable local task: BOOT-001.** MIG-001, REF-001 and POL-001 may be investigated independently without touching production or conflicting files.

## Status rules

`ready`: prerequisites available and work may start. `in-progress`: explicitly claimed by one agent. `blocked`: a named dependency/decision/evidence is missing (including a not-yet-completed predecessor). `review`: implementation exists but its required checks/reviewer approval are outstanding. `done`: acceptance evidence is recorded for the specified scope.

A completed infrastructure task does not complete every requirement it supports. A partial feature remains review/blocked; record exactly what passed. Dependency completion changes downstream tasks to ready after checking their specific decisions/environment. Do not leave an entire project blocked when independent work is available.

Only the owner changes product scope or approves source-reference/rebrand deviations. A task can be split into numbered subtasks here when execution needs it; retain its original acceptance and requirement mapping. Do not create parallel task documents.

## Ordered task graph

| Task | Work and required exit result | Depends on | Requirement coverage | State |
| --- | --- | --- | --- | --- |
| BOOT-001 | Scaffold compatible Next.js/Expo workspaces from official starters; establish commands, ignores, version matrix and clean import/build checks | None | QUA-001, NAT-001 | ready |
| MIG-001 | Inventory actual legacy routes, modules, taxonomy, data sensitivity and public-reuse eligibility; fill migration dispositions | None; authorized source access | All legacy capabilities; DEC-003/006 | ready |
| REF-001 | Capture exact Shop source, detailed screen/flow matrix, platform exceptions and merchant design scope; reviewer approves coverage | None; authorized source access | BUY-001..010, ACC-001..003, NAT-001; DEC-001 | ready |
| POL-001 | Resolve inherited checkout/fees/fulfillment/refund policies from actual evidence and owner decisions; record sandbox plan | None; inspect existing policy first | BUY-007/009, MER-005/009; DEC-002/004 | ready |
| BOOT-002 | Verify isolated DB/auth environments, Prisma baseline and role/target checks, Clerk web/native identity and seed safety | BOOT-001, MIG-001 | ACC-001/003, QUA-001 | blocked |
| CONTRACT-001 | Establish v1 catalog/identity contract and client consumers, errors/pagination and authentication/tenant-negative tests | BOOT-002 | BUY-002/005, ACC-001, NAT-001/002 | blocked |
| BOOT-003 | Establish CI, PostgreSQL/browser harness, secret-safe artifacts and performance measurement harness; record baseline of implemented routes | BOOT-002 | QUA-001 | blocked |
| BOOT-004 | Prove native development builds on declared iOS/Android targets, API connectivity, secure session and cold links | BOOT-002, CONTRACT-001 | NAT-002/003 | blocked |
| CORE-001 | Port/build catalog, variants, publication, quantity and inventory behavior with actual constraints and concurrency tests | BOOT-002, MIG-001, CONTRACT-001 | BUY-005/006, MER-002/004; DEC-003 | blocked |
| REF-002 | Implement measured buyer primitives, navigation and overlay behavior on web/native without Treido rebranding | BOOT-001, REF-001 | BUY-001, NAT-001 | blocked |
| REF-003 | Implement home/discovery/store/product reference flows; integrate catalog reads and source-measured states | REF-002, CORE-001 | BUY-002..005, NAT-001 | blocked |
| REF-004 | Implement remaining mapped cart/checkout/account/order/comms reference presentations and interactions; identify fixture-only paths explicitly | REF-002, CONTRACT-001 | BUY-006..010, ACC-001/002, COM-001/002, NAT-001 | blocked |
| MER-001 | Implement real merchant onboarding, product publication, inventory view and order queue under its own reviewed shell | CORE-001, REF-001 | MER-001/002/004/005, ACC-003 | blocked |
| PAY-001 | Build approved quote, reservation, order/payment protocol, signature/deduplication/reconciliation and retry safety | CORE-001, CONTRACT-001, POL-001 | BUY-006/007, MER-005 | blocked |
| ORD-001 | Implement canonical buyer/merchant order detail/timeline and allowed fulfillment transitions | PAY-001, MER-001 | BUY-008, MER-005 | blocked |
| NAT-001 | Wire initial native buyer discovery-to-order journey to the real API; reference-specific UI/lifecycle verification | BOOT-004, REF-002, PAY-001, ORD-001 | NAT-001/002, BUY-005..008 | blocked |
| FLOW-001 | Prove initial complete web/native buyer-to-merchant transaction and critical stock/payment/authorization failures | BOOT-003, REF-003, REF-004, MER-001, PAY-001, ORD-001, NAT-001 | G2; covered initial commerce slice | blocked |
| REF-005 | Review all frozen reference-required flows/states across declared platforms; obtain explicit owner approval with exceptions | REF-001, REF-002, REF-003, REF-004, NAT-001, FLOW-001 | G3; visual/interaction approval only | blocked |
| BRAND-001 | Apply approved Treido colors/identity/food taxonomy and copy through accepted components; reverify and remove release reference artifacts | REF-005, MIG-001; DEC-003 | G4, BUY-001..005, QUA-001 | blocked |
| DISC-001 | Complete search quality, location/map, facets, sort, storefront discovery and promotion disclosures on real data | REF-003, CORE-001 | BUY-002/003/004, ADM-002 | blocked |
| ACC-001 | Complete personal account, addresses, preferences, saved items, identity recovery, secure selling switch and business access lifecycle | REF-004, BOOT-002 | ACC-001/002/003, BUY-010 | blocked |
| CAT-002 | Complete merchant catalog/media/bulk import-export and relevant locations/lots/expiry/adjustment workflows | MER-001, CORE-001 | MER-002/003/004 | blocked |
| RECOV-001 | Complete cancellations/returns/refunds/support according to approved multi-seller/provider policy; test races and allocations | ORD-001, POL-001 | BUY-009, MER-005 | blocked |
| FIN-001 | Complete merchant operational dashboard, sales/finance/payout definitions and business/team/store configuration | ORD-001, CAT-002, ACC-001 | MER-001/007/008 | blocked |
| COM-001 | Resolve transport decision and implement durable authorized live chat, attachments, read state, blocking and reconnect | CONTRACT-001, ACC-001, ORD-001; DEC-005 | COM-001, MER-006, NAT-002 | blocked |
| NOTIF-001 | Resolve retry/delivery architecture; implement durable in-app/email/push preferences, replay/dedupe and deep links | ORD-001, COM-001; DEC-005 | COM-002, MER-008, NAT-002 | blocked |
| TRUST-001 | Complete verified reviews/replies, reporting/moderation, seller verification and privileged admin/support tools | ORD-001, RECOV-001, COM-001 | BUY-009/010, MER-006, ADM-001 | blocked |
| PREM-001 | Implement configured Free/Premium billing, entitlements, invoices/portal and downgrade/error handling | ACC-001, POL-001, FIN-001 | MER-009; DEC-004 | blocked |
| AI-001 | Implement scoped listing, operational, metric/inventory and reply copilots; human approval, audit and cost limits | CAT-002, FIN-001, COM-001, PREM-001 | MER-010 | blocked |
| ROLE-001 | Complete/disposition discovered distributor/logistics/driver and promotion/workspace requirements without silent loss | MIG-001, MER-001, TRUST-001 | ADM-002 | blocked |
| NAT-002 | Complete all remaining native buyer journeys, notifications, support, offline/lifecycle recovery and approved Android adaptations | NAT-001, DISC-001, ACC-001, RECOV-001, NOTIF-001, TRUST-001, BRAND-001 | NAT-001/002/003; native buyer requirement coverage | blocked |
| MIG-002 | Close every old-route/capability/data disposition and validate redirects/identifiers/snapshots in new implementation | MIG-001, ROLE-001, ACC-001, CAT-002, FIN-001, PREM-001, AI-001, NAT-002 | Full migration scope | blocked |
| QUAL-001 | Full populated web/native/merchant/admin regression, accessibility, localization, performance and security review | BRAND-001, DISC-001, CAT-002, FIN-001, RECOV-001, NOTIF-001, TRUST-001, PREM-001, AI-001, NAT-002, MIG-002 | QUA-001; all feature evidence | blocked |
| MIG-003 | Rehearse schema/data/provider cutover and recovery; finish release-specific runbook and reconciliation | MIG-002, QUAL-001 | G5 migration readiness | blocked |
| REL-001 | Obtain owner GO and execute exact-artifact/configuration release, safe cutover, hosted checks and native submissions as authorized | QUAL-001, MIG-003; all open release decisions | G6; DEC-004/006; NAT-003 | blocked |

Full product delivery includes advanced merchant requirements. A restricted pilot can be authorized with explicit scope and controls, but cannot mark later tasks done or redefine full acceptance.

## First tasks: execution detail

### BOOT-001 — install and prove the foundation

Read `techstack.md` and `architecture.md`. Inspect current branch/work and generated files; retain documentation. Resolve current stable compatible Node/pnpm/Next/Expo/React/TypeScript versions, record the matrix and source URLs, then scaffold only the two apps and consumed shared packages.

Establish package scripts, lint/format/typecheck, meaningful unit/contract smoke tests, safe env templates and ignore rules. Verify dependency resolution from each app, one React instance per app, no duplicate native modules and no server imports in shared client packages. Do not install next-forge, alternate backend/styling stacks, or unneeded provider SDKs.

Exit evidence: clean frozen-lockfile install from a clean checkout, actual lint/typecheck/test results, web production build and local rendered shell inspection, native dependency/doctor/export results. Native OS compilation is separately BOOT-004. No fixture startup is represented as authenticated commerce.

### MIG-001 — know what must survive

Inspect current local source and unpushed changes read-only. Enumerate route files, redirects/re-exports, overlays and non-route jobs; map account, selling, admin and operational roles. Fill `migration.md` dispositions and taxonomy inventory; compare against all requirement IDs. Classify data/publication rights without copying private data or credentials. Record exact source SHA/diffs and unresolved items.

Exit: every discovered capability has a named owner/disposition or explicit blocker, not an unsupported assumption. This is inventory, not permission to port everything.

### REF-001 — source before styling

Use the selected capture in `design.md`; obtain authorized screen/flow evidence. Fill actual device/viewport/version and source IDs, states, entry/back/dismissal behavior, assets, component measurements, desktop/Android exceptions and merchant design scope. Do not invent Shop details from a different version.

Exit: complete reference coverage matrix and reviewer approval of its scope. Without source access mark only this work blocked; BOOT/MIG/policy work remains available.

### POL-001 — commercial details before money

Inspect inherited server policy and effective sandbox/provider configuration under appropriate access. Resolve DEC-002 with owner confirmation where evidence is insufficient: order/seller grouping, fee base/rounding, charge/payment/payout ownership, fulfillment eligibility, supported recovery and refund allocation. Record examples and expected totals for normal, weighted and multi-seller cases. Identify DEC-004 release reviews separately.

Exit: a testable written policy and sandbox plan. Do not activate live payments or infer legal approval. Build neutral catalog/navigation while this decision is pending.

### BOOT-002 / CONTRACT-001 — isolate and authorize

Verify the exact authorized non-production database and roles. Reproduce/inspect schema with synthetic seed and real constraints; test the production-target guard. Wire Clerk development identities on web/native and verify resource-level rejection of a second user/business. Expose explicit v1 catalog/context DTOs and errors; consume them from native and test response parsing.

Exit: actual persisted non-production data, documented migration baseline and credential sources without values; negative auth/tenant tests; no provider fallback into live mode. Unavailable integrations remain named blockers.

### BOOT-003 / BOOT-004 — make evidence repeatable

Establish separate unit, real PostgreSQL, built-web browser, visual and native check lanes. Protect public PRs from secrets. Record a baseline only for routes that exist; measure populated home/search/product/cart/checkout/merchant paths before FLOW-001 and again before QUAL-001. Do not present scaffold timings as final-product performance.

Prove native device API origin, secure session persistence, cold/deep links and background/resume in declared iOS/Android development builds. Export/Expo Go is not sufficient. When a platform is unavailable record the exact missing build/device evidence; do not mark BOOT-004 done for both.

## Reference and product integration rules

REF-002..004 own reference presentation and interaction coverage. CORE/PAY/ORD and other feature tasks own authoritative behavior. Reuse the same components and contracts as integration progresses; do not build a disposable screenshot clone and then a separate real app.

Fixtures are allowed for deterministic source comparison and provider-independent UI states, under the isolation rules. REF-005 may approve a source-matched fixture state while its feature task remains incomplete; it must explicitly label that distinction. FLOW-001, feature completion and release must use real PostgreSQL/sandbox/provider evidence as applicable.

FLOW-001 proves the first end-to-end transaction, including applicable stock/payment/idempotency/tenant failures. Later recovery/review/chat cases extend that same golden fixture under their own tasks. A first single-merchant success does not complete multi-seller checkout or the whole platform. Establish populated-route/API/native performance baselines and provisional budgets before approving this milestone.

BRAND-001 cannot start while REF-005 remains review/blocked. Backend and merchant tasks can proceed independently; do not gate them unnecessarily on rebranding. Food adaptation changes approved tokens/copy/data without silently changing reference geometry or navigation.

QUAL-001 closes the entire declared scope with evidence; feature ownership from MIG-001 must reconcile to actual routes. Unresolved payment, privacy/food/legal review, app identity, migration or data-retention decisions block their corresponding release actions.

## Scope acceptance trace

| Requirement group | Primary completion tasks |
| --- | --- |
| BUY-001 | REF-002, REF-005, BRAND-001, QUAL-001 |
| BUY-002..005 | CORE-001, REF-003, DISC-001, BRAND-001 |
| BUY-006/007 | PAY-001, REF-004, FLOW-001; approved multi-seller extension before QUAL-001 |
| BUY-008/009 | ORD-001, RECOV-001, TRUST-001 |
| BUY-010 | ACC-001, TRUST-001 |
| ACC-001..003 | BOOT-002, ACC-001, MER-001 |
| MER-001..005 | MER-001, CORE-001, CAT-002, ORD-001, RECOV-001, FIN-001 |
| MER-006..010 | COM-001, TRUST-001, FIN-001, NOTIF-001, PREM-001, AI-001 |
| COM-001/002 | COM-001, NOTIF-001 |
| ADM-001/002 | TRUST-001, ROLE-001, MIG-002 |
| NAT-001..003 | BOOT-004, NAT-001, NAT-002, REL-001 |
| QUA-001 | BOOT-003, QUAL-001, MIG-003, REL-001 |

## Active claims and evidence ledger

No implementation task is currently claimed. Add concise records here as work begins; completed task evidence can be kept directly below its task detail or in a sanitized CI/commit link. Do not paste full test logs or source screenshot collections into this file.

Documentation bootstrap: canonical documents authored for the new repository. This record is not an application verification result. The publication response identifies the resulting Git commit and structural checks; local BOOT-001 records actual installation evidence later.

Use this record format:

```text
Task ID / claim owner / date:
State and blocking dependency/decision if any:
Commit tested and requirement IDs:
Commands -> actual results:
Environment/provider/dataset/platform scope:
Evidence IDs and reviewer outcome:
Remaining limitations and next ready work:
```

No task is marked done on the strength of architecture confidence. The completion unit is observable, tested behavior within a stated scope.

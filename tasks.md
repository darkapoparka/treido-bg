# Implementation queue

[product.md](product.md) specifies WHAT to build. This file alone owns task order/status and execution evidence. [AGENTS.md](AGENTS.md) defines the local work loop. Updated: 2026-09-08.

## Current checkpoint

Documentation only: no application installation, feature implementation, provider configuration, database test, CI or device acceptance is claimed. G0 through G6 in verification.md are unverified.

Build the selected Next.js/Expo monorepo from official starters and implement this product specification. No mandatory old-project inventory, code port, schema import, route mapping or compatibility audit exists in this queue. The prior migration-first queue is superseded by this clean-build queue.

Buyer sequence: Shop reference -> reviewed fidelity -> Treido branding/food adaptation. Product and backend work proceeds from its specified rules, not from preserving another implementation.

**Next local task: BOOT-001.** REF-001, SPEC-001 and POL-001 are independent preparation tasks. Optional reference code is not a prerequisite for any task.

## Execution priorities

The architecture decision is closed for routine work: clean Next.js + Expo monorepo, one authoritative commerce backend, separate browser/native presentation. Optional reference material may answer a specific question; building does not depend on an old repository. A demonstrated incompatibility is reported with evidence, not hidden by changing frameworks.

The first local assignment is bounded to BOOT-001. Install only the workspace/framework/styling/test foundation and consumed shared packages. Do not install every future provider SDK, build empty feature modules or create substitute marketplace screens. A neutral, labeled bootstrap screen is not the Shop frontend. No database account, paid cloud build or Mobbin access is required to prove this scaffold.

After bootstrap, prioritize BOOT-002 -> CONTRACT-001 -> BOOT-004 so the actual identity/API/native connection is tested before the full catalog/inventory module. BOOT-003 establishes repeatable database/browser checks in parallel with that work once its prerequisites are available. Local checks needed by BOOT-002 belong in that task; CI expansion in BOOT-003 is not a reason to defer its tests. Missing credentials or a device block only the corresponding proof; record the platform separately and continue independent authorized work.

Next implement the initial complete transaction using CORE-001, REF-002/003, MER-001, PAY-001, ORD-001 and NAT-001. Prove it in FLOW-001 before completing every account/support/communication reference state in REF-004. PAY-001 and ORD-001 own the first web transaction screens; NAT-001 wires the native equivalents. REF-004 extends those same components, rather than rebuilding them. Full source approval still requires all frozen reference states under REF-005; branding still waits for that approval.

## Status and ownership

ready = task can start. in-progress = claimed by one agent. blocked = a named predecessor, input, environment or approval is missing. review = implementation exists but required proof/review is outstanding. done = acceptance for the declared scope is recorded.

When a predecessor completes, verify task-specific inputs and mark the downstream task ready. Do not falsely mark a skipped device/provider check as successful. Work on independent tasks when a narrow blocker exists. Only one agent edits a feature/schema/root lockfile/baseline at a time.

Requirement IDs are defined in product.md; task IDs below identify work. Split tasks into numbered subtasks here when needed, without losing their acceptance criteria. Do not create parallel backlogs or quietly reduce product scope. Product/design decisions belong in their owning documents, not an unexplained task note.

## Task graph

Dependencies below are task IDs. Additional commercial/design decisions are stated in the work/exit column and product.md; a task cannot claim the affected behavior until those decisions are recorded.

| Task | Work and required exit | Depends on | Main requirements | State |
| --- | --- | --- | --- | --- |
| BOOT-001 | Scaffold compatible Next.js/Expo workspaces, commands, ignores, version matrix and meaningful import/build checks. | None | QUA-001, NAT-001 | ready |
| REF-001 | Inspect the exact Shop capture; freeze screen/state/flow coverage, measurements and explicit platform differences. | None | BUY-001, NAT-001; DEC-001 | ready |
| SPEC-001 | Specify catalog taxonomy/attributes/quantity/publication rules and merchant/admin navigation from product.md; propose the partner-workflow details for review. | None | BUY-002, BUY-005, MER-001, MER-002, OPS-001, OPS-002, OPS-003; DEC-003 | ready |
| POL-001 | Approve testable checkout grouping, fee/rounding, charge/payout, fulfillment and refund rules with numerical examples and sandbox plan. | None | BUY-007, BUY-009, MER-005, MER-009; DEC-002 | ready |
| BOOT-002 | Verify fresh isolated PostgreSQL/development auth, initial user/business schema, safe synthetic seeds and negative authorization checks. | BOOT-001 | ACC-001, ACC-003, QUA-001 | blocked |
| BOOT-003 | Establish CI, actual PostgreSQL and built-web/browser harness, safe artifacts and production-build performance instrumentation. | BOOT-002 | QUA-001 | blocked |
| CONTRACT-001 | Implement the initial authenticated identity/context HTTP API, shared error/response contracts and web/native consumers; test tenant-negative cases. Catalog endpoints follow in CORE-001. | BOOT-002 | ACC-001, ACC-003, NAT-001, NAT-002 | blocked |
| BOOT-004 | Prove declared iOS/Android development builds, device API origin, secure sessions and cold/deep links. | BOOT-002, CONTRACT-001 | NAT-002, NAT-003 | blocked |
| CORE-001 | Implement catalog/variants/publication, exact quantity/inventory rules and real paginated public catalog API in the new schema; constraints, output contracts, concurrency and persisted-state tests. | BOOT-002, SPEC-001, CONTRACT-001 | BUY-002, BUY-005, BUY-006, MER-002, MER-004 | blocked |
| REF-002 | Build measured buyer primitives/navigation/overlays on web/native, without Treido rebranding or old frontend imports. | BOOT-001, REF-001 | BUY-001, NAT-001 | blocked |
| REF-003 | Implement reference home/discovery/store/product flows and states, integrated with the new catalog. | REF-002, CORE-001, CONTRACT-001 | BUY-002, BUY-003, BUY-004, BUY-005, NAT-001 | blocked |
| MER-001 | Build real merchant onboarding, product publication, inventory and order-queue shell from the reviewed operational design. | CORE-001, SPEC-001 | MER-001, MER-002, MER-004, MER-005, ACC-003 | blocked |
| PAY-001 | Implement approved quotes/reservations/order/payment protocol and the initial reference-matched web cart/auth-return/checkout screens; prove signature/dedupe/replay and retry-safe effects. | CORE-001, CONTRACT-001, POL-001, REF-002 | BUY-006, BUY-007, MER-005 | blocked |
| ORD-001 | Implement canonical buyer/merchant order details, initial source-matched buyer order screens, timelines, permissions and allowed fulfillment transitions. | PAY-001, MER-001 | BUY-008, MER-005 | blocked |
| NAT-001 | Integrate native discovery/cart/auth-return/checkout/order screens against the real API using the measured components and interruption recovery. | BOOT-004, REF-003, PAY-001, ORD-001 | NAT-001, NAT-002, BUY-005, BUY-006, BUY-007, BUY-008 | blocked |
| FLOW-001 | Prove the new web/native-to-merchant transaction, stock/payment/quote/idempotency/permission failures and populated performance baselines. | BOOT-003, REF-003, MER-001, PAY-001, ORD-001, NAT-001 | BUY-005, BUY-006, BUY-007, BUY-008, MER-005, NAT-001, QUA-001 | blocked |
| REF-004 | Complete the remaining frozen reference cart/checkout/account/order/communication states using the initial transaction components; label fixture-only states and do not create another frontend. | REF-002, CONTRACT-001, FLOW-001 | BUY-006, BUY-007, BUY-008, BUY-009, BUY-010, ACC-001, ACC-002, COM-001, COM-002 | blocked |
| REF-005 | Review all frozen reference-required flows/states on declared targets; owner approves exact scope/evidence/exceptions. | REF-001, REF-002, REF-003, REF-004, NAT-001, FLOW-001 | BUY-001, NAT-001; G3 visual/interaction gate | blocked |
| BRAND-001 | Adapt accepted components to approved Treido identity/colors/food labels and content; reverify and remove reference-only release artifacts. | REF-005, SPEC-001 | BUY-001, BUY-002, BUY-005, QUA-001 | blocked |
| DISC-001 | Complete real search quality, facets/sort, location/map/storefront discovery and truthful promotion placement integration. | REF-003, CORE-001 | BUY-002, BUY-003, BUY-004 | blocked |
| ACC-001 | Complete personal account, addresses, preferences, saved items, identity recovery and business membership/selling switch. | REF-004, BOOT-002 | ACC-001, ACC-002, ACC-003, BUY-010 | blocked |
| CAT-002 | Complete catalog/media, bulk tools, relevant locations/lots/expiry and auditable inventory adjustment workflows. | MER-001, CORE-001 | MER-002, MER-003, MER-004 | blocked |
| RECOV-001 | Complete cancellations/returns/refunds/support under approved policy; test provider/race/amount/item/seller allocations. | ORD-001, POL-001 | BUY-009, MER-005 | blocked |
| FIN-001 | Complete operational dashboard, finance/payout definitions, business/store/team configuration and traceable metrics. | ORD-001, CAT-002, ACC-001 | MER-001, MER-007, MER-008 | blocked |
| COM-001 | Decide transport and build durable authorized chat, attachments/read state/blocking and reconnect; document reliability/cost evidence. | CONTRACT-001, ACC-001, ORD-001 | COM-001, MER-006, NAT-002; DEC-005 | blocked |
| NOTIF-001 | Select notification delivery/retry support and extend the existing payment replay foundation with in-app/email/push preferences, dedupe and secure deep links. | ORD-001, COM-001 | COM-002, MER-008, NAT-002; DEC-005 | blocked |
| TRUST-001 | Build verified reviews/replies, reports/moderation, seller verification and privileged admin/support tools. | ORD-001, RECOV-001, COM-001 | BUY-009, BUY-010, MER-006, ADM-001 | blocked |
| PREM-001 | Implement configured Free/Premium billing, entitlements, portal/invoices and downgrade/failure recovery. | ACC-001, POL-001, FIN-001 | MER-009; DEC-004 | blocked |
| AI-001 | Build scoped listing, operational, metric/inventory and reply copilots with approval, audit, cost limits and failures. | CAT-002, FIN-001, COM-001, PREM-001 | MER-010 | blocked |
| OPS-001 | Implement specified supplier relationships, configured delivery/pickup coordination and least-privilege assigned-driver workflows. | CORE-001, MER-001, ORD-001, SPEC-001 | OPS-001, OPS-002, OPS-003; approved DEC-003 details | blocked |
| PROMO-001 | Implement promotion eligibility/scheduling, tenant-safe management, disclosures and honest attribution; activate commercial terms only when approved. | CORE-001, MER-001, TRUST-001 | ADM-002, BUY-002; DEC-004 | blocked |
| NAT-002 | Complete all remaining native buyer flows, support/notifications/offline/lifecycle handling and Android adaptations. | NAT-001, DISC-001, ACC-001, RECOV-001, NOTIF-001, TRUST-001, BRAND-001 | NAT-001, NAT-002, NAT-003 | blocked |
| QUAL-001 | Verify every declared product feature on populated web/native/merchant/admin paths: functional, visual, accessibility, locales, security and performance. | BRAND-001, DISC-001, ACC-001, CAT-002, FIN-001, RECOV-001, NOTIF-001, TRUST-001, PREM-001, AI-001, OPS-001, PROMO-001, NAT-002 | All product requirement IDs; G5 | blocked |
| RELEASE-PREP-001 | Rehearse new-app schema deployment, backup/restore, provider reconciliation and rollback; finish exact-environment release runbook. | QUAL-001 | QUA-001, NAT-003 | blocked |
| REL-001 | Obtain owner authorization and release exact web/native artifacts with verified live configuration/hosted checks; store submission only as authorized. | RELEASE-PREP-001 | All approved release requirements; G6, DEC-004 | blocked |

All declared features are in the queue. A restricted pilot can be approved separately without marking deferred work done. No source-system comparison is required for QUAL-001. Optional import/takeover work is added only if separately requested; do not smuggle it back into these dependencies.

## First implementation tasks

### BOOT-001

Read product/design intent, architecture and techstack. Inspect the new working directory and existing changes. Resolve stable compatible Node/pnpm/Next/Expo/React/TypeScript versions from current official guidance. Scaffold the two official starter apps, actual consumed shared packages, one lockfile and strict private/server import boundaries.

Implement the initial scripts, meaningful unit/import tests, lint/format/typecheck, env examples and ignores. Verify dependency resolution inside each app, production web build/rendered shell and Expo doctor/export. Record a clean frozen-lockfile install. No provider or native-build success claims based on fixture startup. Do not install another architecture or start rebranding.

For this first task, establish `dev:web`, `dev:mobile`, `build:web`, `typecheck`, `lint`, `format:check`, `format`, `test:unit`, `native:check` and `check` with their real behavior. The initial `check` aggregates only implemented mandatory checks, including document links/references. Database, full browser/visual and device suites arrive in their owning tasks; do not add fake passing placeholders or demand their completion to close BOOT-001.

Use one root lockfile and framework-supported workspace resolution. Run native export for iOS and Android and record it as JavaScript export, not native compilation. Inspect the built web shell and shared-package resolution. Keep dev and build output directories separate or serialize them. Do not invent exact Shop tokens without source evidence; bootstrap token consumers may use clearly temporary neutral values, replaced before reference work.

### SPEC-001

Write a concrete catalog definition: food hierarchy and BG/EN labels, category attributes, units/package/minimum/increment/precision, allowed publication rules and representative fixtures. Define merchant/admin navigation and representative draft/editor/queue/finance states from the product workflows. Propose the partner-operation details as a named subtask, not an old-code discovery exercise.

Record approved decisions in product.md/design.md. Separate required catalog decisions from later partner activation details; a still-pending partner subtask must not block catalog/bootstrap that has its own approved contract. Amend the task into explicit subtasks with dependencies when needed rather than pretending the entire specification is approved.

### REF-001

Inspect the selected Mobbin capture or authorized owner-provided assets. Fill device/OS/version/content dimensions and exact source screens, states and recordings. Record entry/back/dismissal/keyboard/scroll behavior, measured components and explicit platform adaptations. Installation and unrelated product work proceed without waiting for source access; fidelity claims do not.

### POL-001

Specify DEC-002 from the product policy: order/seller/payment grouping, fees and rounding, supported methods/fulfillment, cancellation/refund allocation and reconciliation. Include normal, weighted, multi-seller and failure examples with expected totals. Inspect sandbox provider configuration where authorized; a previous implementation may be an optional example but does not decide the policy. Missing commercial decisions require owner approval, not guesses.

### BOOT-002 / CONTRACT-001 / CORE-001

BOOT-002 verifies fresh isolated PostgreSQL and development identity targets and implements the new user/business membership schema with reviewed migrations and synthetic actors. Test actual constraints/permissions and ambiguous/production-target rejection. No source-schema reproduction or old ID preservation is required.

CONTRACT-001 then exposes a small real `/api/v1/me` identity/business-context query (or a documented equivalent). Verify unauthenticated, expired-session, wrong-business and revoked-membership behavior. Consume and validate the response from native; server-rendered web code calls the same authorized function directly. Standardize safe errors and correlation IDs. This proves the client/server boundary using actual development identity and database data, without waiting for inventory or payment implementation. Test fixtures are not represented as live catalog endpoints.

CORE-001 subsequently implements the product-led catalog/variant/inventory schema and public catalog/category/store DTOs, real paginated read endpoints, response parsing and web/native data integration. Include publication filtering, quantity/stock rules, private-field exclusion and concurrency tests. REF-003 cannot claim catalog integration using only the earlier identity proof.

Add authentic sandbox providers as their feature tasks need them; never fall back to live configuration.

### BOOT-003 / BOOT-004

Establish the CI/PostgreSQL/browser/visual/native lanes with secret-safe artifacts. Prove actual installed iOS/Android development builds and API/session/deep-link behavior; record any unavailable platform evidence. A source export is not an OS build.

Performance harness results cover only implemented routes. Before FLOW-001, measure populated discovery/product/cart/checkout and merchant paths and define provisional API/native budgets. Empty scaffold results are not production-product acceptance.

### PAY-001: correctness cannot wait for notification infrastructure

Before FLOW-001, prove recoverable payment ingestion: signature checks, durable event/operation identity, duplicate/out-of-order handling, bounded retry or authorized replay, and reconciliation after provider success followed by application failure. Implement the smallest supported processing mechanism that meets this protocol; critical payment recovery cannot wait for NOTIF-001. Do not assume detached promises or an in-process timer survive a hosted request. Any managed worker/runtime must be appropriate to the host and separately authorized when provisioning is required.

Build only the initial buyer transaction screens needed for the approved journey, using the measured reference components and existing API/domain rules. REF-004 completes the wider reference-state matrix after this flow is proved. This is staged integration, not permission to mark the full checkout or all reference states complete early.

## Implementation and approval rules

REF tasks own source measurements, shared presentation and the remaining reference-state matrix. PAY-001/ORD-001/NAT-001 build the first transaction screens against those measured components while implementing real behavior. REF-004 extends them after FLOW-001; no second checkout frontend is created. Fixtures can represent deterministic source states but never create fake production functionality.

FLOW-001 proves the first integrated transaction. A one-seller example does not finish multi-seller or weighted checkout; PAY-001 and QUAL-001 require their approved edge cases. Further features extend the same testing foundation.

REF-005 is owner/design-reviewer approval for the declared source scope and any fixture-only distinctions. BRAND-001 cannot start before it. Food branding changes accepted tokens/copy/data rather than introducing another frontend. Merchant/backend work can progress independently when its own inputs are available.

QUAL-001 maps product requirement IDs to implemented routes/API behavior and evidence. The mapping is new-product coverage, not old-route compatibility. All declared capabilities must have evidence for full product completion. Relevant payment/privacy/food/legal, configured rates/quotas and actual native release decisions remain explicit release blockers.

RELEASE-PREP-001 proves recovery for this new application's data and providers. REL-001 is separate authorization; no old-system cutover or real-data import is implied. Existing systems remain untouched.

## Evidence ledger

No implementation task is currently claimed or completed. Documentation correction: requirements.md is replaced by product.md; mandatory migration planning is removed. The selected stack, full product scope, Shop-first buyer target and safety/quality requirements remain explicit. No application tests were run as part of editing documentation.

Documentation audit on 2026-09-08 (source: `934348bfe92f0c8710b56a079752ac62eca48e9d`): read all eight current Markdown documents and `.gitignore`; reviewed document ownership, clean-build scope, full buyer/account/merchant/admin/native requirements, reference-before-brand rules, safety and runtime boundaries. Rechecked official Next.js HTTP/auth/testing, Expo monorepo/development-build and Clerk native guidance. The selected architecture is unchanged. Corrected initial identity/API proof being gated on complete inventory, and first-transaction proof being gated on the remaining reference screens. Clarified first-task script scope and payment replay ownership. Validation: copied task-source bytes matched the Git blob SHA; a local Python parser verified 35 tasks, 97 dependency edges, 34/34 explicitly mapped product requirement IDs, zero undefined dependencies and zero cycles. Assertions proved early native/API verification no longer depends on CORE-001, FLOW-001 no longer depends on REF-004, and reference-before-brand and quality/recovery-before-release ordering still hold. Reviewed canonical relative-link targets across all eight documents. Git check-ignore tests passed for 12 sensitive/generated paths and six intended source/example paths. These are structural checks, not proof that feature contracts are fully implemented or all commercial/design decisions are resolved. Application installs, builds, database/provider/device tests and source-reference fidelity remain NOT RUN.

Record concise entries here, not raw logs or new report files:

```text
Task / claim owner / date:
Status and precise blocker:
Requirement IDs and commit tested:
Commands -> actual results:
Environment/provider/dataset/platform:
Persisted effects and evidence identifiers:
Reviewer result / exceptions / limitations:
Next ready work:
```

A task is done because its observable behavior and required proof are complete, not because it was written confidently or because another application once had the feature.

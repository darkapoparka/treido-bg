# Implementation queue

[product.md](product.md) specifies WHAT to build. This file alone owns task order/status and execution evidence. [AGENTS.md](AGENTS.md) defines the local work loop. Updated: 2026-09-08.

## Current checkpoint

Documentation only: no application installation, feature implementation, provider configuration, database test, CI or device acceptance is claimed. G0 through G6 in verification.md are unverified.

Build the selected Next.js/Expo monorepo from official starters and implement this product specification. No mandatory old-project inventory, code port, schema import, route mapping or compatibility audit exists in this queue. The prior migration-first queue is superseded by this clean-build queue.

Buyer sequence: Shop reference -> reviewed fidelity -> Treido branding/food adaptation. Product and backend work proceeds from its specified rules, not from preserving another implementation.

**Next local task: BOOT-001.** REF-001, SPEC-001 and POL-001 are independent preparation tasks. Optional reference code is not a prerequisite for any task.

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
| CORE-001 | Implement catalog/variants/publication and exact quantity/inventory rules in the new schema; constraints, concurrency and persisted-state tests. | BOOT-002, SPEC-001 | BUY-005, BUY-006, MER-002, MER-004 | blocked |
| CONTRACT-001 | Implement catalog/identity HTTP contracts, validation/errors/pagination and web/native consumers; test tenant-negative cases. | CORE-001 | BUY-002, BUY-005, ACC-001, NAT-001, NAT-002 | blocked |
| BOOT-004 | Prove declared iOS/Android development builds, device API origin, secure sessions and cold/deep links. | BOOT-002, CONTRACT-001 | NAT-002, NAT-003 | blocked |
| REF-002 | Build measured buyer primitives/navigation/overlays on web/native, without Treido rebranding or old frontend imports. | BOOT-001, REF-001 | BUY-001, NAT-001 | blocked |
| REF-003 | Implement reference home/discovery/store/product flows and states, integrated with the new catalog. | REF-002, CORE-001, CONTRACT-001 | BUY-002, BUY-003, BUY-004, BUY-005, NAT-001 | blocked |
| REF-004 | Implement remaining reference cart/checkout/account/order/communication presentations and interactions; label fixture-only states. | REF-002, CONTRACT-001 | BUY-006, BUY-007, BUY-008, BUY-009, BUY-010, ACC-001, ACC-002, COM-001, COM-002 | blocked |
| MER-001 | Build real merchant onboarding, product publication, inventory and order-queue shell from the reviewed operational design. | CORE-001, SPEC-001 | MER-001, MER-002, MER-004, MER-005, ACC-003 | blocked |
| PAY-001 | Implement approved server quotes/reservations/order/payment protocol, signature/dedupe/reconciliation and retry-safe effects. | CORE-001, CONTRACT-001, POL-001 | BUY-006, BUY-007, MER-005 | blocked |
| ORD-001 | Implement canonical buyer/merchant order details, timelines, permissions and allowed fulfillment transitions. | PAY-001, MER-001 | BUY-008, MER-005 | blocked |
| NAT-001 | Integrate native discovery-to-order against the real API with source-matched UI and interruption recovery. | BOOT-004, REF-002, PAY-001, ORD-001 | NAT-001, NAT-002, BUY-005, BUY-006, BUY-007, BUY-008 | blocked |
| FLOW-001 | Prove the new web/native-to-merchant transaction, stock/payment/quote/idempotency/permission failures and populated performance baselines. | BOOT-003, REF-003, REF-004, MER-001, PAY-001, ORD-001, NAT-001 | BUY-005, BUY-006, BUY-007, BUY-008, MER-005, NAT-001, QUA-001 | blocked |
| REF-005 | Review all frozen reference-required flows/states on declared targets; owner approves exact scope/evidence/exceptions. | REF-001, REF-002, REF-003, REF-004, NAT-001, FLOW-001 | BUY-001, NAT-001; G3 visual/interaction gate | blocked |
| BRAND-001 | Adapt accepted components to approved Treido identity/colors/food labels and content; reverify and remove reference-only release artifacts. | REF-005, SPEC-001 | BUY-001, BUY-002, BUY-005, QUA-001 | blocked |
| DISC-001 | Complete real search quality, facets/sort, location/map/storefront discovery and truthful promotion placement integration. | REF-003, CORE-001 | BUY-002, BUY-003, BUY-004 | blocked |
| ACC-001 | Complete personal account, addresses, preferences, saved items, identity recovery and business membership/selling switch. | REF-004, BOOT-002 | ACC-001, ACC-002, ACC-003, BUY-010 | blocked |
| CAT-002 | Complete catalog/media, bulk tools, relevant locations/lots/expiry and auditable inventory adjustment workflows. | MER-001, CORE-001 | MER-002, MER-003, MER-004 | blocked |
| RECOV-001 | Complete cancellations/returns/refunds/support under approved policy; test provider/race/amount/item/seller allocations. | ORD-001, POL-001 | BUY-009, MER-005 | blocked |
| FIN-001 | Complete operational dashboard, finance/payout definitions, business/store/team configuration and traceable metrics. | ORD-001, CAT-002, ACC-001 | MER-001, MER-007, MER-008 | blocked |
| COM-001 | Decide transport and build durable authorized chat, attachments/read state/blocking and reconnect; document reliability/cost evidence. | CONTRACT-001, ACC-001, ORD-001 | COM-001, MER-006, NAT-002; DEC-005 | blocked |
| NOTIF-001 | Decide work delivery/retry mechanism; implement in-app/email/push preferences, dedupe, replay and secure deep links. | ORD-001, COM-001 | COM-002, MER-008, NAT-002; DEC-005 | blocked |
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

### SPEC-001

Write a concrete catalog definition: food hierarchy and BG/EN labels, category attributes, units/package/minimum/increment/precision, allowed publication rules and representative fixtures. Define merchant/admin navigation and representative draft/editor/queue/finance states from the product workflows. Propose the partner-operation details as a named subtask, not an old-code discovery exercise.

Record approved decisions in product.md/design.md. Separate required catalog decisions from later partner activation details; a still-pending partner subtask must not block catalog/bootstrap that has its own approved contract. Amend the task into explicit subtasks with dependencies when needed rather than pretending the entire specification is approved.

### REF-001

Inspect the selected Mobbin capture or authorized owner-provided assets. Fill device/OS/version/content dimensions and exact source screens, states and recordings. Record entry/back/dismissal/keyboard/scroll behavior, measured components and explicit platform adaptations. Installation and unrelated product work proceed without waiting for source access; fidelity claims do not.

### POL-001

Specify DEC-002 from the product policy: order/seller/payment grouping, fees and rounding, supported methods/fulfillment, cancellation/refund allocation and reconciliation. Include normal, weighted, multi-seller and failure examples with expected totals. Inspect sandbox provider configuration where authorized; a previous implementation may be an optional example but does not decide the policy. Missing commercial decisions require owner approval, not guesses.

### BOOT-002 / CORE-001 / CONTRACT-001

Verify fresh isolated PostgreSQL and development identity targets. Create the new user/business schema first, then product-led catalog/variant/inventory tables through reviewed migrations. Use synthetic actors and products. Test actual constraints/permissions and ambiguous/production-target rejection. No source-schema reproduction or old ID preservation is required.

Define explicit v1 public catalog and authenticated context contracts, response parsing/errors/pagination and web/native consumers. Verify current-context and cross-business negative cases. Add authentic sandbox providers as their feature tasks need them; never fall back to live configuration.

### BOOT-003 / BOOT-004

Establish the CI/PostgreSQL/browser/visual/native lanes with secret-safe artifacts. Prove actual installed iOS/Android development builds and API/session/deep-link behavior; record any unavailable platform evidence. A source export is not an OS build.

Performance harness results cover only implemented routes. Before FLOW-001, measure populated discovery/product/cart/checkout and merchant paths and define provisional API/native budgets. Empty scaffold results are not production-product acceptance.

## Implementation and approval rules

REF tasks own reference presentation. CORE/PAY/ORD and other feature tasks own real behavior. Use the same components/contracts as integration progresses. Fixtures can represent deterministic source states but never create fake production functionality.

FLOW-001 proves the first integrated transaction. A one-seller example does not finish multi-seller or weighted checkout; PAY-001 and QUAL-001 require their approved edge cases. Further features extend the same testing foundation.

REF-005 is owner/design-reviewer approval for the declared source scope and any fixture-only distinctions. BRAND-001 cannot start before it. Food branding changes accepted tokens/copy/data rather than introducing another frontend. Merchant/backend work can progress independently when its own inputs are available.

QUAL-001 maps product requirement IDs to implemented routes/API behavior and evidence. The mapping is new-product coverage, not old-route compatibility. All declared capabilities must have evidence for full product completion. Relevant payment/privacy/food/legal, configured rates/quotas and actual native release decisions remain explicit release blockers.

RELEASE-PREP-001 proves recovery for this new application's data and providers. REL-001 is separate authorization; no old-system cutover or real-data import is implied. Existing systems remain untouched.

## Evidence ledger

No implementation task is currently claimed or completed. Documentation correction: requirements.md is replaced by product.md; mandatory migration planning is removed. The selected stack, full product scope, Shop-first buyer target and safety/quality requirements remain explicit. No application tests were run as part of editing documentation.

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

# Migration and selective reuse

This file owns source inventory, old-to-new mapping, data safety and cutover. It is not a second cleanup backlog. Execute work through [tasks.md](tasks.md). The old repository remains intact and is not a runtime dependency of the new application.

## 1. Known evidence and limits

Reference repository: `darkapoparka/treido-next`. Bounded GitHub source review baseline: `11ed36fcb1ecd3c8b9d419a2858e1f9896f31af8` (2026-09-05). Product, buyer, merchant and architecture contracts, selected layouts, account/cart handoff code and inventory behavior were inspected. Full local source, unpushed work, complete route coverage, provider configuration and production data were NOT validated.

MIG-001 must record the actual current source SHA, local modifications, and source directory being inspected. Never overwrite or reset that directory to match this older review. Do not copy credentials or assume the source environment is disposable because the product was described as prelaunch.

## 2. Reuse classification

| Class | Expected treatment | Examples / caveat |
| --- | --- | --- |
| Reuse after inspection | Port the smallest self-contained implementation and relevant tests, adapting imports and validation boundaries | Inventory reservations, quantity arithmetic, allowed order transitions, idempotent provider reconciliation, verified review eligibility. Existence is not proof they pass. |
| Adapt | Preserve behavior, separate framework/presentation coupling, verify with contract and database tests | Buyer commerce/auth context, merchant editors/queues, provider wiring, account/workspace flows. |
| Rebuild | Implement against the new canonical design/architecture | Buyer shell, reference-matched cards and flows, native presentation, global styling. |
| Omit with evidence | Remove only unused/superseded implementation or owner-dispositioned scope | Historical alternate homes, duplicate visual variants, unused template apps, obsolete wrappers and superseded docs. |
| Hold for decision | Do not port, delete or claim completion until ownership/requirements are understood | Driver/logistics/distributor features, sensitive data, unknown paid/provider paths or licensing constraints. |

Do not port the entire `packages/database` package merely to obtain one helper, and do not reimplement proven transaction rules just to avoid imports. Extract coherent feature behavior, not arbitrary line ranges. Preserve third-party licenses and confirm that private-source material is suitable for this public repository before copying it.

Do not copy the old stylesheet, `home1` alternatives, root config/release wrappers or all documentation. Useful requirements are reconciled into their new owning document. Old task IDs and previous bounded completion claims are historical evidence, not acceptance here.

## 3. Route and capability disposition

The following is an initial mapping, not an exhaustive verified route inventory. Target paths are the selected convention; MIG-001 may refine individual aliases without changing product ownership. Locale-aware browser URLs use `/<locale>/...`.

| Legacy source family | New owner / target | Required verification |
| --- | --- | --- |
| `apps/web` public marketplace/home | Web buyer area, `/<locale>` | One canonical home, full reference flow, metadata and navigation. |
| Public categories/search/products/producers | Web buyer discovery/product/store routes | Exact old paths/slugs inventoried; bookmark/deep-link continuity and filters. |
| Buyer cart and checkout in web | Web buyer `/<locale>/cart`, `/<locale>/checkout` | Auth return, guest merge, server validation, fulfillment/payment correctness. |
| `apps/app/.../cart` and checkout handoffs | Redirect old URLs to the corresponding new buyer route | Preserve safe selected items/return context; do not trust legacy query totals. |
| `apps/app/.../account`, `/profile`, settings/addresses/payment views | Web buyer account plus explicit business settings | Personal vs workspace ownership, saved addresses/receipts/preferences retained; account cannot require unnecessary merchant onboarding. |
| Existing web buyer profile/purchases/saved | Same canonical buyer account/purchase owner | Consolidate duplicates without losing data or access controls. |
| Merchant products/inventory/orders/storefront/billing/team | Web `/<locale>/merchant/...` | Complete operational workflows and urgent mobile-web tasks; separate sidebar/layout. |
| Shared messages and notifications | Buyer and merchant projections of the same durable services | Correct tenant/participant context, unread/read/reconnect and settings. |
| `apps/app/.../admin` | Web `/<locale>/admin/...` | Distinct platform authorization and audit trail. |
| Distributor/driver/logistics/producer/buyer workspace families | Explicit disposition under ADM-002 / MIG-001 | Inspect every workflow; choose merchant role area, admin operations or owner-approved omission. No silent loss. |
| `apps/api` callbacks and scheduled work | Web `/api/webhooks/...` and authorized worker entry points | Signature/auth/dedupe/retry, provider destination switch and monitoring. |
| No legacy native equivalent | `apps/mobile` | Native auth, contracts, device navigation and store-release scope are new work. |
| Alternate homes/demo/storybook/docs/email preview tooling | No automatic production destination | Keep only useful local tooling with a present use; document removals. |

For each concrete old route record: exact path/file; current behavior; actor/workspace; requirement ID; data/services; target path or intentional redirect; disposition (reuse/adapt/rebuild/omit/hold); tests; evidence and status. Generate inventory from actual App Router files AND inspect redirects/re-exports/parallel routes: a filename alone does not establish unique functionality.

Every capability required by `requirements.md` must have a target. Any remaining `hold` disposition blocks migration completion, not unrelated scaffold work. Do not duplicate the full queue here; detailed execution remains in task subtasks and route mapping records added to this section or its explicitly linked generated inventory.

## 4. Database and identity plan

Default: protect the existing database and work on a verified isolated development target. Prefer schema-only plus synthetic data when authorized and supported, or reproduce the reviewed migrations in disposable PostgreSQL. A branch that includes real data is still sensitive. Branching the database does not isolate external auth, payments, email, media storage or webhook endpoints.

Before schema/data work inventory tables, schema version, migrations, constraints, relevant row counts, identities/provider mappings, catalog IDs/slugs/media ownership and active transaction state. Store private counts/data extracts and operational credentials outside Git as appropriate. Record a sanitized schema/migration summary and source fingerprint, not raw production data.

Choose one recorded path:

- Retained schema/data baseline: preserve migration history and IDs, add reviewed forward migrations, validate legacy invariants and orphan relations.
- New-schema destination: only after an explicit conversion plan, source-to-target identifier mapping, historical snapshot preservation and rollback/reconciliation proof. An empty database is not approval to discard required history.

Do not edit applied migrations, run `db push` over retained data, reset a shared database, or assume a schema branch can be merged back like a Git branch. Apply reviewed migrations to the authorized destination; code merge and database deployment are different operations.

Identity mapping preserves external auth ID, local user ID, business memberships and statuses. Migration must not create duplicate users/businesses on first login, reactivate removed members, or grant seller/admin roles. Reconcile races between login provisioning and provider webhooks. Keep test identities/provider projects separate from live ones.

Use explicit adapters where legacy semantics differ (for example stock already net of reservations or legacy product-level commercial fields). Document and test the conversion; do not keep two competing authorities indefinitely.

## 5. Incremental transfer procedure

For each feature: inspect source and tests -> state required behavior -> classify reuse -> port into the new owner -> run unit, PostgreSQL, API and UI checks as appropriate -> compare saved records and user behavior -> remove temporary adapter when replacement is proven -> record migration evidence.

A source-only test that substitutes persistence is not database acceptance. A mocked provider test is not sandbox webhook verification. A prior screenshot is not new reference fidelity. Preserve useful tests, then add missing failures rather than importing a large suite unquestioningly.

New code must not reach into a sibling checkout of `treido-next`, symlink old packages, or assume old `.env` files. Every declared dependency must resolve from this repo's lockfile/providers. No dual writes to both old/new production applications during development.

## 6. Cutover and recovery

MIG-003 produces a release-specific runbook with exact private target identifiers, tested data migration and recovery steps. It remains non-production rehearsal until explicit owner GO under REL-001.

Required sequence: approve requirement coverage -> backup/restore rehearsal -> freeze or safely drain old writers where needed -> capture final source state -> apply compatible reviewed schema/data conversion -> reconcile IDs/counts/money/inventory/history -> deploy the approved production artifact/configuration -> switch provider endpoints/domains in a controlled order -> verify buyer/merchant/native behavior -> monitor/reconcile delayed callbacks and in-flight transactions.

Only one implementation owns new live orders at a time. Preserve correlation for old pending orders and delayed payment events. Do not register duplicate side-effecting webhook consumers against the same live operation without an explicit idempotent routing design.

Rollback must distinguish application rollback from data/provider rollback. Restoring an old database snapshot after new payments can destroy valid records; use the tested recovery/reconciliation plan, not an automatic restore. New schema must remain compatible with the chosen fallback, or the release must declare forward-only recovery and have owner approval.

No deletion of the old repository/database or permanent domain changes are included in initial setup. After successful cutover, retention/decommissioning is a separate authorized task.

## References

[Neon schema-only/data branch overview](https://neon.com/blog/instant-branches-schema-only-or-with-data-the-choice-is-yours), [Neon documentation index](https://neon.com/docs/llms.txt), and [Prisma migration guidance](https://www.prisma.io/docs/orm/prisma-migrate) describe mechanisms. Actual account availability, target isolation and migration correctness must be verified in the authorized environment; no production access is implied by this document.

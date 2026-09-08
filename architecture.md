# Architecture

Selected foundation: **small monorepo, two clients, one authoritative commerce backend**. This is a deliberate tradeoff with shared web releases, not a guarantee of perfect software or a claim that next-forge is slow. [requirements.md](requirements.md) owns scope; [techstack.md](techstack.md) owns installation; [verification.md](verification.md) owns proof.

## 1. Boundaries and repository shape

```text
apps/
  web/
    src/
      app/
        layout.tsx
        [locale]/
          (buyer)/                 marketplace, account, purchases, checkout
          (merchant)/merchant/     full selling dashboard
          (platform)/admin/        separately authorized platform operations
        api/v1/                    supported native/client HTTP contract
        api/webhooks/              signed provider callbacks
        api/jobs/                  authorized scheduled/durable work entry points
      features/
        catalog/                   feature UI, queries, commands and tests
        cart/
        checkout/
        orders/
        inventory/
        identity/
        conversations/
        notifications/
        finance/
      components/ui/               selected web presentation primitives
      lib/                         provider clients, env, small shared helpers
    prisma/                        schema and reviewed migration history
    tests/                         integration and web journey tests
  mobile/                          Expo Router application; native buyer UI
packages/
  contracts/                       public DTOs, input/output schemas, error codes
  design-tokens/                   platform-neutral semantic values
  locales/                         shared plain messages when both clients use them
```

This tree defines ownership, not an instruction to generate empty modules. Create a feature when its task begins. Package names use `@treido/*`; explicit exports limit accidental imports. The web database client/schema is not a shared native package. A server package is extracted only when another actual server deployment needs it.

`apps/web` is the complete browser platform, not the old marketplace-only meaning. Marketplace, personal account, merchant and admin keep distinct navigation and layout. Prefer a common minimal root and nested area layouts; do not load merchant charts/editor dependencies in the buyer root. Roles are not inferred from layouts or URL prefixes.

Native is a separate client, not another backend and not the old `apps/app` directory renamed. Native browser-dashboard handoff is explicit where provided. Domain and API compatibility are planned now, so mobile does not require rewriting commerce later.

## 2. Dependency and operation flow

```text
Web Server Component / Server Action -> authorized feature query/command -> DB/provider
Native or interactive HTTP client   -> Route Handler -> same query/command -> DB/provider
Scheduled worker / verified webhook -> feature command -> DB/outbox -> delivery
```

Server-rendered web reads call server functions directly; no avoidable HTTP call back into the same Next.js application. Native uses supported HTTP endpoints, never Server Action internals. Browser writes use one documented adapter per operation; business validation is not duplicated between the action and HTTP handler.

A typical feature contains a small public surface such as `queries.server.ts`, `commands.server.ts`, `policy.ts`, and local components/tests where useful. These names are a convention, not mandatory layers. Server code is guarded with `server-only`; shared pure calculations have no Next/browser dependency. No framework of generic controllers/repositories/interfaces around simple queries.

Client-safe exports may depend on Zod and other deliberately portable utilities, but not Prisma, secrets, Node-only modules, `next/headers`, or server packages. Native/web views never import each other. Sensitive entity models are projected into explicit DTOs; no returning `include: everything` or generated ORM objects directly.

## 3. Identity, tenancy and authorization

Clerk authenticates identity. Treido resolves local user/business membership and resource permissions. An authenticated identity is not merchant authority. Maintain one coherent mapping between external identity and local records; uniqueness, deleted/suspended state, and membership revocation must be handled.

Construct server-verified actor context at the entry point, then enforce resource-specific permissions in the owning query/command. Validate selected workspace membership and current role. Do not trust a workspace ID from a form, cookie or token claim without the required live authorization check. For sensitive writes, handle membership/status changes racing the write in the transaction/locking design.

Queries scope private records by actor and business; mutations recheck ownership/current state. Keep explicit permission checks for finance, refunds, publishing, team management and admin. Platform admin is a separate privileged capability, not a seller plan or UI toggle. Audit consequential actions with actor, target, action, timestamp, result and correlation ID; exclude secrets/private message bodies.

Native sends provider-supported bearer sessions over HTTPS; the server verifies authenticity, expiry and configured audience/issuer/origin properties as applicable. Browser cookie mutations require appropriate same-origin/CSRF protection. CORS is not authentication and must never be wildcard credentials access. Logout, member removal and workspace switch clear private client caches and subscriptions.

Auth webhooks are signed, idempotent and reconciled; duplicated/out-of-order identity events cannot recreate deleted membership or grant privileges. Initial account creation and webhook sync must not race into duplicates.

## 4. Data ownership and commerce invariants

Use the legacy schema as an inspected migration input, not a mandate to recreate every table. Begin with the required baseline and preserve identifiers/history when adopting existing data. Do not reset or rebaseline a retained database casually. New PostgreSQL relations use real foreign keys, plus appropriate unique/check constraints and indexes. Investigate orphaned legacy rows before enabling new constraints. Financial and order history should not cascade away with ordinary catalog deletion.

### Catalog and money

Product owns shared listing identity/content; ProductVariant owns the sellable SKU, option selection, unit/package and commercial/inventory identity. No-option products have a default variant, not a second checkout model. Tenant and product/variant relationships must agree, including in inventory and cart rows.

Represent monetary amounts in integer minor units with explicit currency, bounded to safe serialization ranges; never floating-point currency. Use exact decimal/scaled quantity arithmetic for weighted products, stored/serialized consistently (API quantities are decimal strings). Define allowed quantity precision, increments, minimums and rounding in the approved policy before implementation. Never use binary float comparisons as the business rule.

Every cart/order/quote enforces its market/currency contract. Mixed currency checkout is rejected initially; additional markets use explicit policy rather than string replacements. Store timestamps in UTC and fulfillment/business time zones separately. Locale is not currency, market, or timezone.

### Inventory

Availability is a projection of authoritative variant inventory/reservations and sellability. On-hand, reserved, consumed and released effects must have explicit semantics. Adapt legacy stock that already represents net availability without subtracting reservations twice. Lots/expiry/location apply only where the product/workflow requires them.

Use database transactions and guarded updates/locks to prevent overselling. Lock related resources in a stable order where necessary; use bounded retry for classified transaction conflicts. Never rely on an in-memory lock across requests. Persist reservation identity, quantity, state and expiry; consume/release transitions are idempotent and mutually valid. Expiry and checkout success races require tests. Adjustments are audited and cannot create negative available stock silently.

### Checkout, payments and orders

The checkout protocol is: authenticate/authorize -> validate submitted selection -> calculate server quote with policy/version and expiry -> lock/revalidate current cart, buyer, seller, catalog and inventory -> persist pending order/reservations and operation identity -> provider request outside the DB transaction -> reconcile/finalize from verified provider state with current-state checks.

A quote is not guaranteed inventory or a paid order. Confirmations bind to the reviewed quote/selection; changed money, stock, address, seller status or fulfillment yields explicit revalidation, not a silent changed purchase. Required payment model and fee/refund allocation are DEC-002 in `requirements.md`.

Idempotency keys are scoped to actor/business and operation, bound to a canonical request hash, and backed by a database uniqueness rule. Same key + same request returns the existing operation/result; same key + different request is a conflict. Persist in-progress/provider correlation so a crash can be reconciled. Do not hide duplicate operations behind client button disabling.

Verify webhook signatures over the raw body. Durably record provider event identity and processing outcome; acknowledge only according to a recoverable ingestion contract. Repeated/delayed/out-of-order callbacks cannot regress the order or apply a money effect twice. Provider idempotency and local transactions do not create magical distributed exactly-once execution: retries, dedupe and reconciliation establish effectively-once business effects.

Preserve immutable purchased line, seller, currency, price, fee, address/fulfillment and policy snapshots. Keep commercial acceptance, payment and fulfillment as distinct state dimensions with one shared projection for buyers/merchants. Seller-scoped fulfillment visibility must not expose another seller's buyer/private data unnecessarily.

Cancellation/refund must respect captured/authorized/fulfilled state and allocation. Do not free inventory on an unconfirmed provider cancellation. Refunds have durable identity, supported amount/item/seller allocation and reconciliation. Unsupported partial multi-seller operations are unavailable with explicit explanation, not simulated full success.

### Messaging, notifications, finance and AI

Messages/participants and read cursors are durable database truth. Authorize every conversation read/write/subscription/attachment. Stable message/client operation IDs support retry/deduplication; reconnect resumes with a cursor. Delivery acknowledgments are not read receipts. Blocking/removal must revoke applicable realtime access. Keep transport replaceable under DEC-005, without building a generic transport framework in advance.

Use an application outbox written with domain changes for important notifications/provider follow-up. A worker claims work with leases, bounded retry/backoff and terminal failure visibility. A cron trigger is not a durable queue. Function memory, detached promises and process timers are not guaranteed background execution. Long-lived chat/worker requirements may need an appropriate managed runtime; Next.js hosting limits must be tested, not ignored.

Metrics are derived from canonical transactions. Gross/net sales, discounts, refunds, fees, COGS, profit and payouts are different quantities with one definition. Unknown COGS means profit is unavailable. Do not make analytics writable duplicate truth.

AI uses authorized query/command tools; it cannot bypass workspace, price, inventory or refund policy. Treat merchant/customer content as untrusted input. Require explicit approval before publishing, sending replies, changing prices, refunds or other consequential mutations unless an owner-approved bounded automation exists. Define token/cost/time limits and fallbacks; ordinary commerce never depends on AI availability.

## 5. HTTP contract and native compatibility

Prefix the supported API with `/api/v1`. Public catalog DTOs are distinct from private/account/merchant ones. In CONTRACT-001 implement explicit request AND response validation, pagination, authorization tests and representative fixtures in `@treido/contracts`.

Initial resource families are products/categories/stores, identity/context, cart items, checkout quotes/confirmation, orders, conversations/messages and notifications. Add endpoints per implemented feature; do not generate empty CRUD routes for every database model. Provider callbacks are under `/api/webhooks/<provider>`, not the client API.

Use meaningful HTTP results: 401 unauthenticated, 403 or deliberate non-disclosing 404 unauthorized, 409 state/idempotency conflict, 422 invalid business input, 429 throttled, 503 temporary dependency failure. Errors use `{ error: { code, message, fieldErrors? }, requestId }`; localization maps stable codes to client copy. Do not leak stack traces, SQL or private values. Success payloads are explicitly typed; pagination includes a stable cursor and bounded page size.

Contracts specify units/currency, decimal quantity representation, UTC timestamps, required/optional fields, limits and idempotency. User-facing errors retain recovery details without disclosing other tenants. Rate-limit and bound uploads, queries, chat and expensive operations; protect sensitive endpoints, not just the public shell.

Prefer additive API evolution. Supported installed mobile builds may outlive a web deployment. Preserve compatibility with recorded supported versions, test old contract fixtures, and plan explicit retirement before breaking removal. Keep app build identity and API compatibility observable without transmitting secrets. Native logout/account change clears data; abandoned requests cannot populate another account's cache.

## 6. Rendering, styling and performance

One buyer shell, explicit merchant/admin layouts, narrow Client Component boundaries. Basic navigation renders without a blank viewport-detection phase. Use CSS for ordinary responsive layout. Do not render two complete device trees and merely hide one; share data/composition where appropriate while allowing intentionally different layouts.

Choose cache behavior per route/data projection. Public catalog may cache only public, bounded data with market/locale/filter keys and documented invalidation. Personalization, cart, checkout and private business data are not globally cached. Keep checkout revalidation authoritative even when discovery uses cached catalog. Do not spread request cookies/auth dependencies into every public component unnecessarily.

Document a CSP/security-header decision with the actual framework version. Nonces have rendering/caching consequences; do not accidentally promise a static shell and request-specific nonce simultaneously. Do not remove protections or enable unsafe production settings just to reach a timing target. Scope provider integration scripts and measure costs.

Use sized/compressed media, prioritized above-fold imagery, lazy offscreen maps/charts, stable skeleton geometry and bounded list queries. Test production builds, not development compilation times. Keep functions near the database initially; introduce regional/data architecture based on actual workloads, not a global label. Budgets live in `verification.md`.

## 7. Files, environments and deployment

Public product media and private conversation/invoice content are different capabilities. Authorize uploads server-side, enforce type/size/count, verify content rather than trusting filename/MIME, and use unguessable scoped object names. Private access uses short-lived authorized delivery; possession of a public URL is not our authorization model. Never store raw payment card details.

Separate runtime, migration, test and operator credentials; validate effective least privilege. No public/native DB keys. No production mutations during build/install. Identity tokens, payment secrets, logs, reference assets and customer data stay out of this public repository.

Initial hosted architecture is one Next.js deployment plus native builds consuming its stable API. Web release coordination is shared; future independent services require recorded evidence. CI/source checks do not authorize release. Verify preview and production provider modes explicitly. Promoting a preview must not accidentally retain sandbox API origins, embedded public keys or fixture flags. Build the approved production configuration and verify the exact artifact before cutover.

## 8. Architecture decision log

| ID | Selected decision | Reason / reconsideration trigger |
| --- | --- | --- |
| ADR-001 | Small Next.js + Expo monorepo | Native is near-term; avoid later client-contract retrofit. Reconsider only for a demonstrated requirement/incompatibility. |
| ADR-002 | One initial Next.js browser/backend deployment | Distinct layouts without cross-app release/auth coordination. Reconsider for independent teams/releases or runtime/security isolation need, not folder count. |
| ADR-003 | Shared client-safe contracts/tokens, separate web/native UI | Reuse meaning without importing DOM/server code into native. Universal UI requires demonstrated net benefit and owner approval. |
| ADR-004 | Neon/Prisma and selective behavior reuse | Preserve needed commerce invariants and data history; no provider/ORM migration for novelty. |
| ADR-005 | Real constraints, idempotency, outbox and integration tests | Protect money/inventory/tenancy; no generic event-sourcing or microservice platform. |
| ADR-006 | Reference approval before branding | Prevent repeated layout/style churn; exact process in `design.md`. |

To amend: record requirement, evidence, rejected alternatives, consequences, owner approval and affected tasks here. Routine task difficulty is not permission for another rewrite.

## Primary implementation references

[Next.js route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups), [backend for frontend and hosting limits](https://nextjs.org/docs/app/guides/backend-for-frontend), [authentication](https://nextjs.org/docs/app/guides/authentication), [CSP](https://nextjs.org/docs/app/guides/content-security-policy), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions), [relation modes](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/relation-mode), [Stripe Connect](https://docs.stripe.com/connect/charges), [Clerk Expo](https://clerk.com/docs/expo/getting-started/quickstart), [Expo monorepos](https://docs.expo.dev/guides/monorepos/). Verify details against the installed versions. These references support mechanisms, not a claim that Treido's implementation already satisfies this contract.

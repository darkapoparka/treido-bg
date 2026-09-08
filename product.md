# Treido product specification

This document defines WHAT to build. It is a standalone product contract, not a description of an existing implementation. [design.md](design.md) defines appearance and interactions; [architecture.md](architecture.md) defines engineering boundaries; [tasks.md](tasks.md) defines execution and evidence. No application functionality is complete merely because it is specified here.

## 1. Product

Treido is a food-first marketplace and operating platform connecting buyers with real producers, shops and other food businesses. Start with Bulgaria and Bulgarian/English experiences. Model market, currency, language and time zone separately so additional markets do not require another commerce engine.

The product consists of a shopping experience, personal/business accounts, a full merchant operating dashboard, platform administration and a native buyer application. A shopper can also sell through an authorized business without creating a second personal identity.

The buyer frontend is a NEW implementation of the selected Shop reference: styling, typography, layout, navigation, transitions and complete flows. After reference approval, adapt that implementation to Treido's branding, food categories, producers and commerce details. It is not a reskin of a previous Treido frontend. Shop does not supply the merchant/admin design; specify those workspaces independently from their workflows.

## 2. Users and entry points

| Actor | Needs |
| --- | --- |
| Visitor | Browse/search, inspect products and sellers, build a guest cart, then sign in without losing the selection or destination. |
| Personal buyer | Buy, track purchases, communicate, manage addresses/preferences, save items, request support and submit eligible reviews. |
| Business buyer | Purchase in an authorized business context with business contact/invoice details; see only permitted business records. |
| Merchant member/manager/owner | Run the business through role-appropriate catalog, inventory, fulfillment, orders, customers, finance, team and settings tools. |
| Platform operator | Perform explicitly granted verification, moderation, support and exceptional commerce operations with an audit trail. |
| Delivery/distribution partner | Carry out the explicitly configured partner workflows in section 6, with restricted assignment/resource access. |

Public browsing does not require authentication. Initial checkout requires sign-in. Guest checkout is not assumed. Personal account and the selling dashboard have different navigation. Switching to selling selects or creates an authorized business; it never grants permissions merely by changing the interface.

The native application serves buyers on iOS and Android. The complete merchant dashboard works on desktop and mobile web. A native link to selling may open that dashboard with tested authentication and return behavior; it must not be described as a native merchant application.

## 3. Feature contract

IDs identify requirements, not implementation status. A feature must work across its declared clients/locales, with real data, permissions and actionable loading/empty/error states. Its tasks record what has actually passed.

### Shopping

| ID | Build | Required observable behavior |
| --- | --- | --- |
| BUY-001 | Buyer shell/navigation | Shop-matched chrome and navigation; useful initial controls, correct selected state, back/forward and scroll restoration; no unexplained visual changes between routes. |
| BUY-002 | Home and food discovery | Catalog-driven product/store shelves and category hierarchy; valid destinations, honest promotions/ratings/availability, useful empty states. Food labels are applied in the Treido adaptation phase. |
| BUY-003 | Search/filter/sort | Product and seller results; category-specific facets, location/fulfillment filters, bounded pagination, shareable web query state and stable ordering. Evaluate Bulgarian/English queries, typos, synonyms and transliteration. Recover from no results. |
| BUY-004 | Storefront/location discovery | Public seller identity, location, verification and catalog; save/follow where specified; usable map/list interaction and denied-location fallback. Never invent proximity or delivery eligibility. |
| BUY-005 | Product detail | Images, description, seller, options, price/currency, unit/package, minimum/increment quantity, stock/orderability, fulfillment, relevant food facts and review summary. Adding an item always identifies a sellable variant. |
| BUY-006 | Cart | Add/update/remove variants, seller grouping, guest persistence, authenticated ownership and deterministic sign-in merge. Explain changed price, unavailable stock, invalid quantities or incompatible fulfillment instead of silently altering the purchase. |
| BUY-007 | Checkout/payment | Address or pickup selection, eligible fulfillment, server quote, disclosed fees, review and confirmation. Repeated submission, provider challenges, interrupted return and failed payment must recover without duplicate orders or charges. |
| BUY-008 | Purchases/tracking | Owner-scoped history and detail, purchased snapshots, payment/commercial/fulfillment timeline, per-seller progress when applicable, actionable delays or exceptions. |
| BUY-009 | Recovery/support | Cancellation, return/refund request and order issue entry according to approved policy; visible request/outcome history, supported money/stock effects and accessible escalation. Unsupported operations explain the limitation. |
| BUY-010 | Saved items and trust | Saved products/sellers, verified-purchase review eligibility, separate product/seller reputation, seller replies, reporting/moderation and empty reputation states without fabricated scores. |

### Accounts

| ID | Build | Required observable behavior |
| --- | --- | --- |
| ACC-001 | Identity/personal account | Sign-in/up/out, account recovery, personal details, language, sessions and account-removal request. Authentication resumes the intended journey with the correct cart. |
| ACC-002 | Addresses/preferences/receipts | Owner-scoped addresses, communication/privacy preferences, receipts/invoices and provider-managed payment methods where enabled. Do not store raw card details. |
| ACC-003 | Businesses and selling entry | Business creation/selection, onboarding, invitation acceptance, membership/role lifecycle and suspended/removed-member handling. A personal identity is not business authorization. |

### Merchant operating dashboard

| ID | Build | Required observable behavior |
| --- | --- | --- |
| MER-001 | Business onboarding and home | Collect business/contact/verification information, show submission status, select a workspace and surface real attention queues: unconfirmed orders, low stock and operational exceptions. |
| MER-002 | Catalog/variants/media | Create drafts; edit content, category/attributes, variants/options/SKU/barcode, units/packages/quantities/prices and fulfillment eligibility; upload/reorder/delete media; publish/archive with explicit validation. |
| MER-003 | Bulk tools | Catalog import/export and useful bulk edits; preview validation and row errors, defined atomicity and retry behavior. No silent partial corruption or cross-business export. |
| MER-004 | Inventory | On-hand, reserved and available quantities per variant; auditable adjustments with a reason; applicable locations/lots/expiry. Concurrent checkout cannot oversell; release/consumption cannot be applied twice. |
| MER-005 | Orders and fulfillment | Configure pickup/delivery methods, locations/windows/fees/instructions; filter the order queue; inspect purchased facts; confirm/decline and progress eligible fulfillment; handle exceptions and approved refunds/cancellations. |
| MER-006 | Customers/inbox/reviews | Authorized customer/order context, durable conversations, unread state, attachments, search, customer history, review replies and report/block/escalation. |
| MER-007 | Analytics/finance | Date-scoped sales, refunds, discounts, fees, supplied costs, calculable profit and payout/settlement records. Drill from totals to records; unknown costs are not zero and revenue is not profit. |
| MER-008 | Store/team/settings | Public storefront identity/content, contact/business settings, invitations/roles/removal and notification preferences. Financial/team/admin privileges are enforced on the server. |
| MER-009 | Free/Premium | Configured subscriptions, entitlement enforcement, invoices/portal, downgrade/failure recovery and accurate limits. Basic commerce correctness and ordinary customer service are not premium-only. |
| MER-010 | Permissioned AI assistance | Listing drafts from authorized photos/input; category/attribute/translation suggestions; operational summaries; metric-backed analysis and inventory signals; buyer-reply drafts. Approval precedes consequential actions; costs and failures are bounded. |

### Communication and administration

| ID | Build | Required observable behavior |
| --- | --- | --- |
| COM-001 | Live conversations | Authorized inbox/thread, stable message order, send/retry/deduplication, pagination/reconnect, private attachments and block/report. Delivery and read receipts are distinct. Durable history agrees across clients. |
| COM-002 | Notifications | Durable in-app events and enabled email/push delivery, preference-aware retries/deduplication, unread state and secure deep links. Optional providers do not block initial shopping. |
| ADM-001 | Platform operations | Privileged verification and moderation queues, reports/reviews, support and commerce exceptions, operator permissions and auditable decisions. Normal merchants cannot access these tools. |
| ADM-002 | Promotions | Clearly disclosed promoted product/store placements with eligible content, configured scheduling, tenant-safe management and honest attribution. Organic content is not secretly labeled as paid or vice versa; commercial activation requires configured terms. |

## 4. Required transaction journeys

### Merchant publishes; buyer purchases

A merchant creates a draft product and at least one variant. Publishing checks the required content, price/quantity rules, inventory policy and available fulfillment. An eligible published product appears in discovery. A buyer selects the variant and quantity, reviews cart/fulfillment/charges and confirms. The server validates current facts and records the operation. Verified payment outcome produces the appropriate order state. The merchant receives an authorized order and progresses allowed fulfillment. Buyer and merchant views show the same underlying result.

Acceptance includes two buyers competing for the last quantity, a price change before confirmation, repeated confirmation, a failed/interrupted payment and a merchant attempting another business's order. A disabled button is not concurrency protection.

### Customer issue and review

From a purchase, the buyer opens an allowed issue/cancellation/refund request or contacts the seller. The responsible merchant/operator sees context and performs only permitted actions. The outcome is durable, notifications link to it and repeated processing cannot duplicate money/stock effects. After eligibility is satisfied, the buyer can submit the allowed product/seller review. Ineligible or duplicate reviews are rejected with useful feedback.

### Daily merchant operations

A merchant sees actual work needing attention, filters the order queue, completes allowed fulfillment, adjusts inventory with a reason, answers customers and reconciles displayed totals to orders/refunds/payouts. An invitation grants only its configured role; removal revokes access and clears stale client context. No chart or queue is filled with fake production values.

## 5. Commercial and catalog rules

The current product policy is a buyer **Treido Protection and Service Fee of 5% plus EUR 0.50 per order**, **0% seller commission**, and separate configured fulfillment charges. Implement a single server policy and immutable order fee snapshots. Detailed fee base, rounding, order grouping and refund allocation require DEC-002; the headline policy alone is not an executable calculation specification. Do not invent foreign-currency conversions.

Protection means issue review/support, not insurance or an automatic refund guarantee. Plan names are Free and Premium. Billing prices, quotas and availability come from approved configuration. No invented plan prices or marketing promises.

Support the approved multi-seller shopping model. Before payment implementation, settle whether one checkout creates grouped seller orders or another explicit structure and how fulfillment, fees, payments, refunds and seller liability relate. A one-seller test fixture does not define the final product model.

A Product contains listing content; a ProductVariant is the sellable SKU. A no-option product has one default variant. Quantity minimums/increments and units are explicit. Store exact monetary/quantity values and purchased snapshots; never trust client prices or totals. Separate commercial acceptance, payment and fulfillment states. Configure actual pickup/delivery offers; a screenshot does not authorize same-day delivery claims.

Build a hierarchical food taxonomy with stable identifiers, Bulgarian/English labels, ordering, category attributes and search synonyms. Task 2 records the approved categories and quantity/attribute rules in this document before catalog publication acceptance. Example families are fruit/vegetables, dairy/eggs, meat/fish, bakery, pantry and beverages; they are illustrative, not an approved production seed list. The food model exists from the beginning; reference comparison data does not require a temporary fashion schema.

Food facts can include ingredients/allergens, origin, unit/package, storage and applicable expiry/lot information. Required fields depend on the approved category/market policy. Seller-supplied evidence determines certification/organic/origin claims; AI and photographs do not establish them. Appropriate food, consumer, privacy and tax review precedes release; this document is not legal approval.

## 6. Partner operations

These are explicit product workstreams, not instructions to search another repository for hidden features. Task 2 settles their business rules and activation scope with the owner. Work on the core marketplace need not wait for optional operational configuration.

| ID | Build | Required observable behavior |
| --- | --- | --- |
| OPS-001 | Supplier/distributor relationships | Authorized businesses can establish and review partner relationships, view the information actually shared with them and manage permitted sourcing/supply activity. Linking businesses never transfers catalog ownership or grants unrestricted access. |
| OPS-002 | Delivery/pickup coordination | Configure partner pickup points and scheduled fulfillment runs, applicable locations/windows/capacity, dispatch assignments and exceptions. A buyer is offered only eligible configured fulfillment. |
| OPS-003 | Assigned driver workflow | An assigned operator sees the minimum necessary job/contact details, records allowed pickup/handoff/delivery/exception events and cannot access unrelated orders or finances. Events feed the canonical order timeline. |

No invented nationwide logistics service, routing optimizer or autonomous fleet management. Product planning records the intended workflows; a limited release must label any deferred work explicitly rather than call the full platform complete.

## 7. Native and quality

| ID | Build | Required observable behavior |
| --- | --- | --- |
| NAT-001 | Native buyer product | iOS/Android discovery, product, cart, checkout, purchases, account and support use the supported API; navigation, keyboard, safe areas and accessibility are verified per platform. |
| NAT-002 | Native lifecycle/recovery | Secure session persistence, cold/deep links, interrupted payment return, background/resume, unreliable network and truthful offline read/mutation states; no offline claim of successful payment. |
| NAT-003 | Native release | Verified installable builds/devices, configured identities/signing, permissions, privacy/account deletion and separately authorized store submission. Export or Expo Go alone is not a release build. |
| QUA-001 | Cross-cutting quality | BG/EN completeness, explicit global data boundaries, accessibility, SEO, measured performance, tenant-safe caching, observable failures, backups and recovery as defined in verification.md. |

## 8. Narrow decisions still requiring evidence

The product must be understandable without another repository. An unresolved value is stated here rather than delegated to unspecified old code. Only dependent work is blocked. Technical implementation choices within the selected architecture belong to the implementing agent; commercial choices and design changes require the owner's decision.

| ID | Required decision | Blocks | State |
| --- | --- | --- | --- |
| DEC-001 | Inspect selected Shop screens/recordings; record exact flow coverage and web/Android differences; separately approve merchant/admin presentation. | Affected fidelity claims and brand pass | Owner-selected URL known; complete capture not yet inspected. |
| DEC-002 | Fee base/rounding, multi-seller order/payment grouping, charge/payout responsibility, supported methods and cancellation/refund allocation with numerical examples. | Payment/recovery acceptance and live money | Headline policy specified; detailed calculation/flow approval outstanding. |
| DEC-003 | Food hierarchy/attributes/quantity precision, publication rules and partner-operation business scope. | Affected catalog/content and partner acceptance | Task 2 produces a complete proposal for owner review; no dependency on another codebase. |
| DEC-004 | Launch market/legal/privacy terms, billing/advertising prices and quotas, retention/account-deletion rules and release identities. | Affected commercial activation and public release | Owner/provider/reviewer configuration outstanding. |
| DEC-005 | Realtime and retryable-job provider based on reliability, reconnect, workload and cost requirements. | Communication/delivery production acceptance | Resolve payment replay needs in Task 5 and communication/delivery choices in Task 9; no speculative provider installation. |

Resolve decisions here with approved values, examples and date; update affected tasks/tests. Do not duplicate the feature contract in another document. Full product completion means all declared requirements have evidence; a restricted pilot is a separate, explicitly approved scope.

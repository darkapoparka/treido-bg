# Product requirements

Status: implementation contract, not completed functionality. This file owns WHAT Treido must do. [tasks.md](tasks.md) owns sequence and status; [architecture.md](architecture.md) owns HOW; [design.md](design.md) owns visual/interaction acceptance. Do not create a duplicate feature backlog.

## 1. Product and users

Treido is a food-first marketplace and operating platform for buyers and real sellers. Launch focus is Bulgaria, with Bulgarian and English experiences. The model must support additional markets without duplicating the commerce engine. `treido-bg` is the repository name, not permission to hard-code Bulgarian assumptions into every module.

The full product includes discovery, accurate product evaluation, ordering/payment, tracking, communication, trust and recovery; plus a full merchant operating dashboard, personal/business accounts, platform operations, Premium, and permissioned AI. A one-product pilot or a set of static screens is NOT this scope.

Primary actors are visitor, personal buyer, business buyer, merchant member, merchant owner/manager, and separately authorized platform operator. A person can buy and belong to one or more businesses without duplicate identities. Existing distributor, driver, logistics, or other workspace capabilities discovered in migration must be explicitly mapped and either retained or dispositioned by the owner; agents may not silently remove them.

Native scope is a buyer application, not a promise of a separate native merchant app. Merchant workflows remain fully supported on desktop and mobile web. A native entry to selling may hand off to the browser dashboard with an explicit, tested return/auth experience; do not claim native merchant parity.

## 2. Non-negotiable delivery contract

- Preserve the complete intended product. Stage implementation; do not quietly shrink it to make progress appear faster.
- Buyer presentation follows the exact selected Shop capture, then an approved Treido rebrand. The strict sequence and bounded definition of 1:1 live in `design.md`.
- All offered capabilities work against authoritative data, with permission checks, clear loading/empty/error/retry states, and no pretend success.
- Public browsing is usable without an account. The initial commerce baseline requires authenticated checkout; guest browsing/cart retention must survive sign-in. Guest checkout is not added without an explicit decision.
- Account, buyer purchases, and a full selling dashboard remain distinct experiences even though they share one browser application.
- No public release while mandatory safety, payment, migration, reference, or legal/compliance review gates remain open.

## 3. Feature catalogue and acceptance

IDs below are stable requirement identifiers. Their status belongs in task evidence, not a second set of checkboxes here. Each delivered feature is accepted across its declared clients, locales, populated data, failure states, and permissions.

### Buyer marketplace

| ID | Capability | Minimum observable acceptance |
| --- | --- | --- |
| BUY-001 | Shell and navigation | Coherent home/discovery/cart/account entry, usable initial navigation, correct back/forward, return destinations and scroll; no route-specific accidental redesign. |
| BUY-002 | Home, categories and merchandising | Real product/store shelves, approved food taxonomy after rebranding, valid links, honest stock/ratings/promotion disclosures, no filler. |
| BUY-003 | Search, filters and sort | Product/store search, category facets, location/orderability filters, stable pagination and URL state; BG/EN query set including typo/synonym/transliteration cases; zero-result recovery. |
| BUY-004 | Seller/storefront and map discovery | Accurate seller identity, verification, location and catalog; coherent list/map state; permission denied/unavailable location states; no fabricated nearby/delivery claims. |
| BUY-005 | Product detail | Images, seller, variants, price/currency, unit/package, minimum and increment quantities, availability, fulfillment, relevant food facts and verified reviews are understandable; exact purchasable variant selected. |
| BUY-006 | Cart | Guest persistence and authenticated ownership, quantities/removal, variant and seller grouping, merge on sign-in, stale-price/stock recovery; correct totals after server revalidation. |
| BUY-007 | Checkout and payment | Valid address or pickup, eligible fulfillment by seller, disclosed charges, idempotent order/payment creation, provider challenge/return/failure recovery, no duplicate charge/order on retry. |
| BUY-008 | Purchases and tracking | Own order history/detail, immutable purchased facts, clear payment/acceptance/fulfillment timeline, split seller/fulfillment state where applicable, actionable exceptions. |
| BUY-009 | Cancellation, return/refund and support | Allowed actions reflect actual state/policy; explicit request/outcome history, reliable money/inventory consequences, reachable support; unsupported partial recovery never pretends success. |
| BUY-010 | Trust, reviews and saved items | Verified-purchase eligibility, product/store reputation distinguished, seller replies/moderation, saved products/stores, report/block where applicable; no invented aggregates. |

### Personal and business account

| ID | Capability | Minimum observable acceptance |
| --- | --- | --- |
| ACC-001 | Identity and account | Sign-in/up/out, recovery, personal details, locale, sessions and account-removal request; no losing cart/intended destination during authentication. |
| ACC-002 | Addresses, preferences and billing views | Owner-scoped addresses, notification/privacy settings, payment-provider-managed payment methods where supported, invoices/order receipts; no storing raw card data. |
| ACC-003 | Workspace and selling entry | Explicit switch to selling and business selection, onboarding, membership/invitation lifecycle, unauthorized/suspended/removed-member handling; personal identity and business authority not conflated. |

### Full merchant operating system

| ID | Capability | Minimum observable acceptance |
| --- | --- | --- |
| MER-001 | Onboarding, verification and dashboard | Real business setup, verification state, active workspace, operational alerts and queues; dashboard answers what needs attention using actual records. |
| MER-002 | Catalog, variants and media | Create/edit/archive/publish products, default and option variants, SKU/barcode, price/unit/package/MOQ, attributes, media upload/order/removal; publication explains missing requirements. |
| MER-003 | Bulk catalog tooling | Validated imports/exports and useful bulk edits with row errors, defined atomicity and retry behavior; no silent partial corruption. |
| MER-004 | Inventory | On-hand/reserved/available stock, auditable adjustments with reasons, locations/lots/expiry where relevant, concurrency-safe reservation and release/consumption. |
| MER-005 | Fulfillment and order operations | Configure delivery/pickup methods, locations/windows/instructions; actionable order queue and lifecycle, allowed bulk transitions, exceptions/cancellations/refunds; same order truth as buyers. |
| MER-006 | Customers, inbox and reviews | Order-context conversations, unread state, attachment safety, search, reply workflow, customer history and review replies; no cross-business access. |
| MER-007 | Analytics and finance | Date-scoped sales, discounts, refunds, net sales, fees, known COGS/profit, settlement/payout records; trace totals to canonical records; unknown costs are not zero. |
| MER-008 | Store, team and preferences | Public store/profile configuration, team invitations/roles/removal, business settings and notifications; privileged finance/admin changes checked server-side. |
| MER-009 | Premium | Free/Premium entitlements, configured billing intervals/prices, invoices and billing portal; protected server-side capabilities and clear downgrade/failure behavior. Core commerce and ordinary support remain usable without Premium. |
| MER-010 | AI copilot | Listing drafts from permitted inputs, translation/attributes, operational summaries, metric-backed analysis, inventory signals and reply drafts; human approval for consequential actions, bounded costs and graceful failure. |

### Shared communication and platform operations

| ID | Capability | Minimum observable acceptance |
| --- | --- | --- |
| COM-001 | Durable live chat | Authorized inbox/thread, send/retry/dedupe, pagination, ordering, reconnect, delivery distinct from read receipts, attachments, block/report; persisted history remains authoritative across web/native. |
| COM-002 | Notifications | Durable in-app notifications and enabled email/push channels, preference-aware delivery, deduplication/retries, deep links and unread state; optional providers do not block initial browsing. |
| ADM-001 | Platform operations | Separately authorized seller verification, product/review/report moderation, support and commerce exception tools, auditable actions and privileged access review. |
| ADM-002 | Operational roles and promotions | Inventory every existing distributor/logistics/driver workflow and promotion feature; preserve approved functionality/disclosures/entitlements, or obtain explicit disposition before migration acceptance. No unrequested logistics network or advertising system is invented. |

### Native and cross-cutting requirements

| ID | Capability | Minimum observable acceptance |
| --- | --- | --- |
| NAT-001 | Native buyer journeys | Discovery through purchases/account/support on iOS and Android using the same API/domain rules; platform-appropriate safe areas, navigation, keyboard and accessibility. |
| NAT-002 | Mobile lifecycle | Secure session persistence, cold/deep links, interrupted payment return, background/foreground, unreliable network, offline read state and explicit mutation failure; no offline claim of paid order. |
| NAT-003 | Native release | Device testing, permissions, privacy/account deletion, application identity, signing and store submissions under owner authorization; Expo Go or an export is not a release build. |
| QUA-001 | Quality and global foundations | BG/EN completeness, market/currency/time-zone boundaries, accessible controls, performance budgets, SEO for public pages, safe caching, monitoring, backups and recovery as specified in `verification.md`. |

## 4. Commerce semantics

Retain the inherited business baseline unless the owner changes it: **buyer Treido Protection and Service Fee of 5% plus EUR 0.50 per order; seller commission 0%; fulfillment charges separate**. This is product intent from the legacy contract, not a claim that the payment setup is verified. Keep it in one server policy with immutable order snapshots. The fee base, rounding, definition of an order in a multi-seller checkout, and refund allocation must be resolved under DEC-002 before money-bearing implementation is accepted. Never assume a fixed EUR fee converts automatically for future markets.

Protection is an issue-review/support service, not an insurance or automatic-refund promise. Do not generate guarantees. Free/Premium are the plan names; prices, quotas, intervals and availability require configured, verified commercial data, not invented documentation defaults.

Support multiple sellers at the product level. Define checkout grouping, payment/fulfillment ownership and recovery explicitly. A constrained technical pilot does not change the requirement to support the approved multi-seller model. Do not reduce the data model to one seller merely because the first test fixture has one.

Product identity and sellable variant are separate. Every product has a concrete default variant when it has no visible choices. Inventory and purchased commercial identity belong to the variant; order lines preserve snapshots. Server validation checks seller status, publication, quantities, price, market/currency and fulfillment at the moment of purchase.

The commercial acceptance, payment and fulfillment states are distinct. A browser redirect is not payment truth. Payment capture, cancellation, refund, reservation release and fulfillment must follow verified allowed transitions; details are in `architecture.md`.

Support configured pickup and delivery accurately. Existing offers such as producer pickup, pickup points, seller-managed delivery and scheduled runs must be inventoried; never offer a method based solely on a screenshot. Dates/windows, fees and capacity are real configuration. No hidden default claim of same-day delivery.

## 5. Food taxonomy and content adaptation

Food-first renaming is a presentation/content adaptation, not a reason to rename every technical `Product`/`Category` concept. During reference acceptance use the approved reference copy or documented substitutions. After that gate, map Shop categories/stores/products to the approved Treido food categories, sellers/producers and food listings.

MIG-001 must extract the actual current taxonomy and attribute definitions. Candidate display families include fruit/vegetables, dairy/eggs, meat/fish, bakery, pantry and beverages, but this list is NOT an approved seed taxonomy. Preserve stable identifiers/slugs or record redirects; do not generate a replacement taxonomy from memory. Record Bulgarian/English labels, hierarchy, merchandising order, query synonyms and retired-label mapping.

Use real seller-provided food facts where required: unit and package, ingredients/allergens, origin, storage and relevant expiry/lot information. Do not infer safety, organic status, origin or certification from photographs or AI. Any required food/consumer/privacy/tax review is an explicit pre-release review; these documents are not legal approval.

## 6. Decision register

These are narrow blockers, not permission to stall all work. Inspect authorized existing evidence before asking the owner. Record the answer here with source/date and update affected tests and tasks. Do not create a separate decisions backlog.

| ID | Decision or evidence required | Resolves before | Current state |
| --- | --- | --- | --- |
| DEC-001 | Exact Shop capture/flows, licensed asset access, screen measurements, browser/Android exceptions and merchant design coverage | Reference-flow acceptance and BRAND-001 | Source URL known; complete capture NOT inspected or approved. |
| DEC-002 | Checkout grouping, supported payment methods/charge routing, seller payout responsibility, fee base/rounding, cancellation/refund and multi-seller liability allocation | Checkout/payment/recovery implementation acceptance; live money always blocked until approved | Inherited headline fee known; detailed policy and effective provider setup unverified. |
| DEC-003 | Actual food taxonomy/attributes, required seller/food facts and operational-role scope | Catalog publication rules and food rebrand acceptance | Extract and reconcile under MIG-001; no taxonomy invented here. |
| DEC-004 | Market launch settings, required legal/privacy/food/tax terms, billing prices/quotas, retention and account-deletion handling | Affected feature acceptance and release | Owner/provider/reviewer evidence required; no legal conclusion supplied. |
| DEC-005 | Chat delivery and retryable-job provider choice based on measured workload, reconnect, reliability and cost requirements | COM-001/COM-002 production acceptance | No new provider selected. Ably/Inngest are candidates, not installed dependencies. |
| DEC-006 | Source data classification, reuse/publication rights, migration target and legacy route dispositions | Legacy data/code transfer and cutover | Old system remains untouched; full local inventory pending. |

## 7. Completion boundary

Reference visual approval, Treido brand approval, source-test success, sandbox/provider success, device acceptance and production release are separate facts. A full feature is complete only when its required evidence exists. Deferred advanced work stays explicitly visible in `tasks.md`; a pilot is labeled as such. Do not use a single green build, generated screenshot or old task checkbox as acceptance for this repository.

## Sources and authority

Product baseline: legacy `platform.md`, `web.md`, `app.md` and `architecture.md` reviewed at commit `11ed36fcb1ecd3c8b9d419a2858e1f9896f31af8`; the owner's instructions for this reset supersede their old deployment and presentation constraints. Actual local code/data are still subject to MIG-001.

Payment integration decisions must be checked against current [Stripe Connect charge guidance](https://docs.stripe.com/connect/charges). Other implementation references are in `techstack.md` and `architecture.md`. External examples never override Treido's approved commercial contract.

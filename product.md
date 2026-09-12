# Product: Treido

## The destination

Build a modern, food-manufacturer-first marketplace: consumers and authorized business buyers discover real producers, understand exactly what they are buying, place reliable food orders, and stay informed through fulfillment. Sellers operate their catalog, inventory, orders, customers and store presentation in one useful workspace. AI reduces repetitive work without inventing facts or taking unapproved commercial actions.

Initial market direction is Bulgaria with Bulgarian and English experiences. Language, market, currency and time zone are separate concepts. Primary sellers are manufacturers/producers; additional food-business and partner roles remain explicit requirements, with activation decided rather than silently removed or advertised prematurely.

This is a NEW implementation in `treido-bg`, retaining its existing work. `treido-next` is an optional source for a specific domain question, not a required schema, UI, architecture or code import. No real-data migration is authorized by the documentation rewrite.

## One product, distinct surfaces

| Surface | Contract | Purpose |
| --- | --- | --- |
| Buyer website | [web.md](web.md) | Discovery, product evaluation, shopping, purchases and account in the browser |
| Native buyer app | [native.md](native.md) | iOS/Android buyer journeys, sharing the commerce API, not DOM components |
| Seller operating platform | [app.md](app.md) | Onboarding, catalog, inventory, orders, finance, teams and storefront CMS |
| Platform administration | [admin.md](admin.md) | Separately privileged verification, moderation, support and exceptions |
| AI assistance | [ai.md](ai.md) | Permissioned drafts, retrieval and analysis integrated into real workflows |

A person can buy and belong to selling businesses. Switching workspaces never grants authority. Merchant and platform roles are not interchangeable. The native app is not a second server or a promised native merchant dashboard.

## Build sequence and gates

**1. Finish the Shop buyer reconstruction.** Reproduce the frozen screens AND ordered interactions in canonical components, including overlays, forms, empty/error states, navigation, focus and scroll. Current execution targets mobile-width web. Keep every recorded source obligation; source-specific voice/assistant/Minis/widget states need explicit platform boundaries, not deletion from the inventory.

**2. Approve the source and establish the design system.** Evidence is scoped to source IDs, platform, state and source revision. Extract measured shared patterns while building; freeze their accepted values and named exceptions before branding. A numerical score alone is not 1:1 approval.

**3. Adapt the same product to food manufacturers.** Replace the general-shopping content and semantics with food categories, producer identity, units/packages, ingredients/allergens, storage, lot/expiry applicability and configured fulfillment. Update approved branding through tokens/components. Do not build a second permanent skin or throw away the clone.

**4. Complete real commerce and seller operations.** Connect the same buyer components to authoritative identity/catalog/stock/payment/order services; complete the seller workspace and CMS with meaningful permissions and persistence. The numbered tasks preserve their dependencies; source-only approval must never imply backend completion.

**5. Complete native, AI, platform operations and release qualification.** These are explicit workstreams, not hidden requirements for a screenshot batch or implied capabilities of a scaffold. Release requires integrated evidence and separate authorization.

The current owner-selected implementation phase remains phase 1. Planning later phases does not start them. The stable execution interface is [tasks.md](tasks.md), not this narrative order.

## Requirements that cannot disappear during restructuring

[Detailed requirements](docs/product/requirements.md) retain the full contracts, food taxonomy/quantity proposal and worked commercial examples. Feature IDs remain stable:

| Family | IDs | Scope |
| --- | --- | --- |
| Buyer | BUY-001 through BUY-010 | Shell, discovery, search, stores, products, cart, checkout, purchases, recovery, saved/trust |
| Accounts | ACC-001 through ACC-003 | Identity, addresses/preferences, business membership and selling entry |
| Seller | MER-001 through MER-010 | Onboarding, catalog, bulk, inventory, fulfillment/orders, customer work, finance, store/team, Premium, AI |
| Communication | COM-001, COM-002 | Durable conversations and notifications |
| Platform | ADM-001, ADM-002 | Privileged operations and disclosed promotions |
| Partners | OPS-001 through OPS-003 | Supplier relationships, pickup/delivery coordination and assigned drivers |
| Native/quality | NAT-001 through NAT-003, QUA-001 | Buyer app, lifecycle, release and cross-cutting quality |

The expanded storefront editor in [app.md](app.md) refines MER-008; it does not create a competing feature-number system. Core merchant customer service and correct commerce must not require Premium or AI.

## Commercial and food truth

Preserve the existing headline policy: buyer protection/service fee of **5% + EUR 0.50 per order**, **0% seller commission**, and separately configured fulfillment charges. The detailed fee base, parent/seller-order grouping, allocations, rounding and refund policy remain an **unapproved proposal under DEC-002**. This document does not approve pricing, settlement responsibility or live payments.

A product owns listing content; a variant is the sellable SKU, including a default variant for simple products. Exact units, package quantities, minimums/increments, stock and fulfillment eligibility matter. Unknown ingredients/allergens are not safe absence; certification and origin claims require evidence. Do not infer them from images or AI.

See [the decision register](docs/product/decisions.md). Legal, tax, privacy, food-policy and provider review precede public release. Documentation, source imitation and AI review are not compliance certification.

## Success

A seller can publish a valid offer, a buyer can knowingly purchase it, the system can reconcile payment and stock exactly once at the business-outcome level, and the seller can fulfill or resolve the purchase with matching buyer-visible state. The website, native app and dashboards stay usable, accessible and truthful through failure, stale data, revoked access and interrupted journeys. Every declared requirement is either evidenced or openly deferred in an approved release envelope; none becomes Done by omission.

# Buyer website contract

Owner: buyer routes/components in `apps/web`. Scope: a real responsive browser application, not Expo rendered on the web. Current work is Shop parity; food adaptation and service integration follow their declared gates.

## Experiences

Support browse -> search/filter or storefront -> product -> variant/quantity -> cart -> checkout -> confirmation -> purchase tracking -> help/recovery. Saved items/collections, followed stores, profile/settings, addresses, notifications and support must return users to the correct context. Public browsing and a guest cart do not require sign-in; the current initial checkout policy requires authentication with deterministic cart merge and destination recovery.

BUY-001 through BUY-010 and ACC-001 through ACC-003 are specified in [product requirements](docs/product/requirements.md). [design.md](design.md) owns the frozen visual source. No generic ecommerce theme replaces it.

## Current reference phase

Use the existing buyer shell, shared card/dialog/sheet/navigation owners and real DOM controls. Map source frame -> route/query -> named fixture -> actual actions -> overlay/scroll/focus -> evidence. Route hints and isolated screenshot pages are not complete journeys. Source-specific features still need explicit states and honest service boundaries even before real AI, payments or integrations exist.

The source comparison frame is 393 x 793 browser content, with the documented normalization in design.md. Check relevant 320/430 containment. Wider compositions are deliberate adaptations, not stretched screenshots or a separate component tree hidden by CSS.

Preserve browser Back/Forward, deep links, query/filter state, scroll restoration and focus return. Closing a child sheet must not dismiss its parent. A tab or control must not navigate to a blank history entry. Page refresh and loading state must not silently reset an authenticated cart or misreport a completed payment.

## Food adaptation, after source approval

A listing needs producer identity, actual variant/price/currency, meaningful unit or pack size, minimum/increment, availability and configured delivery/pickup. Product evaluation exposes applicable ingredients/allergens, storage/origin and traceability facts without fabricated badges. Compare price per declared selling unit; do not confuse a six-pack with one item or a quoted weight with actual-weight charging.

Search supports the approved category hierarchy, producer/store and product results, BG/EN queries and source-backed facets. Dietary/allergen filters may only assert verified structured facts and must preserve unknown states. Location permission denial has a useful non-location fallback.

Mixed-seller purchase grouping, fees and fulfillment presentation follow approved DEC-002, never a screenshot's incidental one-seller example. Requote changed prices/stock/offers explicitly and require review before payment.

## Implementation and acceptance

Server Components and feature services own reads where appropriate. Keep interactive client boundaries narrow; do not move permissions or totals into browser state. Isolated reference adapters feed the same components used by real data. No fixture fallback on provider failure and no production shipping of restricted source content.

Review loading, empty, validation, unavailable, forbidden, offline/retry and long BG/EN content states as applicable. Test keyboard/focus, accessible names, reduced motion and important screen-reader journeys. Source matching does not excuse inaccessible controls.

A batch is complete only for the declared scope: implemented states, exercised connected interactions, visual evidence at the recorded source revision, sibling regression and any required real-service tests. Checkout, orders and identity cannot be called working services solely because their reference screens render.

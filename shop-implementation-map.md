# Shop implementation map

Current checkout/branch policy is owned by [AGENTS.md](AGENTS.md); use [single-session-execution.md](single-session-execution.md) for the reference loop. The frame ledger and flow checklist remain the evidence owners.

## Current source checkpoint

The integration preserves application commit `c4584c8` from `main` and documentation/setup commit `758f11c` from `astra-pro`. The main changes include storefront styling, sheet history registration before dialogs become interactive, and 20 product checkpoint definitions.

Enumeration on 2026-09-12 found **97 flows, 424 frame entries and 175 registered replay definitions**. The product definitions in `recipes-product.mjs` are not yet imported by the registry, so flows 18-20, 32, 37 and 38 still enumerate as route hints. Next: register those existing definitions, inspect their ordered source frames, replay them and verify the connected product journeys. Flow 17 remains a separate detail/variant obligation.

Local media verification currently rejects `store-hero`, `shower-caddy` and `rice-shampoo`; other listed product assets passed. Keep their expected hashes and inspect provenance before any repair. The old four-asset failure is not the current local result.

This is source/definition discovery, not successful replay or visual acceptance. Current measured results will replace this note after the connected batch; the dated ledger is not regenerated from enumeration.

## Fixed source and comparison

- Frozen corpus: 97 flows, 424 ordered flow frames, 323 standalone media entries. These are different inventory counts, not interchangeable completed-screen counts.
- Primary browser viewport: **393x793**.
- For the documented 1179/1180x2676 flow rasters, normalize the source to 393x892, then crop `(0, 59, 393, 793)`.
- Do not resize the live screenshot. Do not apply this normalization blindly to standalone media.
- The fixed crop excludes native status chrome and the Mobbin footer. Additional keyboard/provider boundaries require frame-specific evidence. Never mask app-owned controls, incorrect imagery, typography, layout or missing content.
- Videos and standalone entries not reconciled with a flow remain explicit obligations; still screenshots do not establish transition parity.

## Mapping and canonical owners

`node scripts/shop-parity/run.mjs enumerate` produces `.qa/shop-parity/frame-map.json` from the frozen manifest and committed recipes:

`source frame -> family -> route/query -> scenario -> setup/actions -> scroll/focus/overlay -> comparison/evidence`.

A route hint is not executable coverage. A reproducible definition is not visual completion. Retain every source frame even when several frames share a route or pixels.

| Flows | Family / canonical owner |
| --- | --- |
| 1, 94 | onboarding/login: `/onboarding`, `/login` |
| 2-6, 42 | Home/notifications/deals/following |
| 7-13 | Saved/collections: `saved.tsx`, `saved-card.tsx`, `saved.css` |
| 14-16, 40-41, 96-97 | storefront/collections/search/filter/info/video |
| 17-20, 32, 37-38 | product/gallery/save/cart/contact/report |
| 21-31 | cart/checkout/review/pay/receipt |
| 33-39 | product/store reviews and reports |
| 43-49 | Search/assistant/result filters |
| 50-59 | Explore/Minis |
| 60-68, 79 | Orders/history/tracking/manual order/review |
| 69-78 | Profile/account/people/preferences |
| 80-82 | payment methods/card add/detail/delete |
| 83-84 | addresses/detail/delete |
| 85-93 | security/notifications/connections/privacy/support/logout |
| 95 | widgets web adaptation |

All families remain in scope. Preserve working canonical components and state rather than making disconnected screenshot pages. Captured history jumps belong in explicit named entries with source notes; do not invent a causal UI transition that the source does not show.

## Historical evidence

The earlier `77efe3e` / `b12796d` implementation, Actions runs, unresolved frame list and historical next step are already preserved in the [immutable pre-Astra map](docs/history/pre-astra-2026-09-12/shop-implementation-map.md.txt). Consult that specific record for older evidence; do not repeat its failures as current facts. Later main commits changed storefronts, Saved behavior and shared sheet history.

## Measurement and execution

[design.md](design.md) owns source normalization and unchanged diagnostic thresholds. [single-session-execution.md](single-session-execution.md) owns commands, server coordination and the connected replay loop. Wait for the real target UI, hydration, fonts and decoded images. Inspect reference/live pairs and related 320/430 containment, then run the focused existing tests.

A route, definition, successful capture, diagnostic candidate, interaction pass and owner approval are different results. Preserve source obligations and report failures without altering masks, hashes or thresholds to manufacture green evidence.

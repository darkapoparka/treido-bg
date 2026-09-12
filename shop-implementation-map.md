# Shop implementation map

Current checkout/branch policy is owned by [AGENTS.md](AGENTS.md); use [single-session-execution.md](single-session-execution.md) for the reference loop. The frame ledger and flow checklist remain the evidence owners.

## Current source checkpoint

Integration `cd4f8fcffd89bfc4ed1a5e117f5454358505e25c` preserves application changes through `57ca1fe` from `main` and documentation/setup through `758f11c` from `astra-pro`. The main changes include storefront styling, sheet history registration before dialogs become interactive, product description states and 20 product checkpoint definitions.

Registration commit `fe14af0` connects those existing product definitions to the registry and existing CI selection. Enumeration on 2026-09-12 now finds **97 flows, 424 frame entries and 195 registered replay definitions**. The 20 checkpoints cover flows **18-20, 32, 37 and 38**; their complete ordered source stills were inspected. Flow 17 remains a separate detail/variant obligation.

Local media verification rejects `store-hero`, `shower-caddy` and `rice-shampoo`; fresh allowlisted downloads reproduced the last two mismatches. Other listed product assets passed. Keep their expected hashes and inspect provenance before repair. CI has its own verified cached originals; a CI capture does not repair local assets.

The owned checkout's old preview on 6412 is unresponsive and Windows denied stopping PID 16240. Local browser navigation failed; see [status](docs/STATUS.md) for the exact prerequisite. [Non-deploying run 34708336898](https://github.com/darkapoparka/treido-bg/actions/runs/34708336898) evaluates the integrated source. Registration is not replay or visual acceptance; regenerate measurements only from its actual evidence, retaining unmeasured frames.

That run scored **98/99 selected frames**, including **19/20 product checkpoints**, with **67/68 interactions passing**. Product gallery frames `f018-002` and `f018-003` are numerical candidates, not owner approvals. `f038-006` failed an ambiguous reported-marker selector; the bag description test measured 0px where the source/test requires 16px. The scoped follow-up fixes the selector and description heading/paragraph spacing. Its next action is the same capture/interaction verification, including sibling frames and the existing 320/393/430 description tests.

Local inspection artifacts: `.qa/shop-parity/imported-ci-cd4f8fc/` holds the downloaded run reports/pairs; `.qa/shop-parity/local-integration/` holds the source/live contact sheets and full-size bag comparison. The source still has open promotion/arrival-history differences, quantity/button/review typography, description-sheet geometry and the add-to-cart recording's missing intermediate animation/timing. No mask or baseline is changed to hide them.

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

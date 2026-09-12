# Shop implementation map

Current checkout/branch policy is owned by [AGENTS.md](AGENTS.md); use [single-session-execution.md](single-session-execution.md) for the reference loop. The frame ledger and flow checklist remain the evidence owners.

## Current source checkpoint

Reviewed source `fc7d58b9699c64692ce4870601bf7e19ef07bee5` preserves both original branch histories and later main fixes. Integration `cd4f8fc` registered the product checkpoints; merge `11ecfa3` reconciled the newer paragraph, storefront search, Forward-test and checkpoint changes. The canonical working branch is now `main`.

Registration commit `fe14af0` connects those existing product definitions to the registry and existing CI selection. Enumeration on 2026-09-12 now finds **97 flows, 424 frame entries and 195 registered replay definitions**. The 20 checkpoints cover flows **18-20, 32, 37 and 38**; their complete ordered source stills were inspected. Flow 17 remains a separate detail/variant obligation.

Local media verification rejects `store-hero`, `shower-caddy` and `rice-shampoo`; fresh allowlisted downloads reproduced the last two mismatches. Other listed product assets passed. Keep their expected hashes and inspect provenance before repair. CI has its own verified cached originals; a CI capture does not repair local assets.

The owned checkout's old preview on 6412 is unresponsive and Windows denied stopping PID 16240. Local browser navigation failed; see [status](docs/STATUS.md) for the prerequisite. [Non-deploying run 34709677111](https://github.com/darkapoparka/treido-bg/actions/runs/34709677111) provides the inspected browser evidence on clean `fc7d58b`. Its cached originals passed unchanged provenance/dimension verification; the local rejected files remain unresolved.

The run scores **99/99 selected frames**, including **20/20 product checkpoints**, with no browser errors and **68/68 interactions passing** (zero skipped/flaky tests). It verifies the original 16px bag paragraph assertion, distinct bag/Shea descriptions, 320/393/430 containment and return focus/scroll. `f038-006` now replays the exact concealed Shea card in All products. All 20 ordered product source/live pairs were inspected.

Against the prior `cd4f8fc` run, `f020-001`/`f032-001` improve from **6.402% to 6.127% MAE**, `f020-002` from **6.964% to 5.750%**, and `f032-002` from **6.788% to 6.489%**. The retained main search fix improves `f040-004` from **6.828% to 6.487%**. The largest increase across 98 comparable frames is **0.0051 percentage points**. Four frames (`f005-004`, `f006-002`, `f018-002`, `f018-003`) are numerical candidates; the diagnostic gate fails and source acceptance remains open.

Evidence: `.qa/shop-parity/runs/ci-fc7d58b9699c64692ce4870601bf7e19ef07bee5/` contains the exact report and unchanged source/live pairs; the prior `ci-cd4f8fc...` run is beside it. `.qa/shop-parity/imported-ci-fc7d58b/` retains interaction/build/provenance reports. `.qa/shop-parity/local-integration/product-batch-delta.json` is the existing runner's comparison, and `product-reviewed-family-fc7d58b.png` plus four full-size pairs record the inspection. The frame ledger was regenerated through `ledger.mjs`, preserving all 424 rows, 195 definitions and unmeasured frames.

Open source differences include promotion/arrival history, quantity/button typography and disabled styling, review card sizing/spacing, description-sheet geometry and the add-to-cart recording's missing intermediate animation/timing. The report fixture truthfully says that no report was sent; captured saved-product history is not fabricated. No masks, expected hashes, assertions or diagnostic thresholds were weakened. **Next:** finish flow 20's ordered product flight, temporary added state and offer timing from the existing 11.0167-second recording, then repeat the full family and sibling checks.

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
| 14-16, 40-41, 96-97 | storefront/collections/search/filter/info/video: `store.tsx`, `store-filter.tsx`, `store.module.css` |
| 17-20, 32, 37-38 | product/gallery/save/cart/contact/report: `product.tsx`, `product.css`, `reviews.tsx` |
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

The [pre-batch frame ledger at fc7d58b](https://github.com/darkapoparka/treido-bg/blob/fc7d58b9699c64692ce4870601bf7e19ef07bee5/shop-frame-ledger.md) preserves the older account/profile/wallet measurements and their exact run/source notes. Those families are not rescored by this 99-frame selection; the current generated ledger labels them accordingly without turning historical candidates into current acceptance.

[Concurrent main checkpoint at 41445f9](https://github.com/darkapoparka/treido-bg/blob/41445f956883a15cf0e28cecc8521558670adc6d/shop-implementation-map.md) preserves its four intermediate Actions runs/artifact IDs, measured storefront improvements and that session's connector denial. Its GitHub-only operating mode and 175-definition limit predate this explicitly authorized local integration and its actual 195-definition/99-frame CI selection. They are historical evidence, not current instructions. The integration retains `a1bbc46`'s search-editing-only canvas and `87a1652`'s stronger Forward observation; the overlapping `701e4d8` paragraph fix is consolidated into the canonical product CSS.

Flow 17 still includes the distinct Midi Shirtdress in Ultrasoft Cotton / Estate Blue, Open Air, White source state; do not substitute Shea or invent its seller. Storefront residuals include filter-underlay alignment, photography, incomplete search-result rows, the returning Kitsch hero and Chemical Guys inventory/video. These remain source obligations alongside the product residuals above.

## Measurement and execution

[design.md](design.md) owns source normalization and unchanged diagnostic thresholds. [single-session-execution.md](single-session-execution.md) owns commands, server coordination and the connected replay loop. Wait for the real target UI, hydration, fonts and decoded images. Inspect reference/live pairs and related 320/430 containment, then run the focused existing tests.

A route, definition, successful capture, diagnostic candidate, interaction pass and owner approval are different results. Preserve source obligations and report failures without altering masks, hashes or thresholds to manufacture green evidence.

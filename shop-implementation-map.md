# Shop implementation map

Current checkout/branch policy is owned by [AGENTS.md](AGENTS.md); use [single-session-execution.md](single-session-execution.md) for the reference loop. The frame ledger and flow checklist remain the evidence owners. A session's explicit owner restrictions still apply: the GitHub-only continuation below used only main and non-deploying Actions, not the owner's computer or a separate local source checkout.

## Latest verified main checkpoint: 2026-09-12

**Evaluated application/CI commit: `fc7d58b9699c64692ce4870601bf7e19ef07bee5`.** Preserve later commits; this is not a reset target.

[Shop run 34709677111](https://github.com/darkapoparka/treido-bg/actions/runs/34709677111) completed against that exact commit. Artifact **10303420683**, `shop-parity-fc7d58b9699c64692ce4870601bf7e19ef07bee5-1`, was downloaded and inspected, including its JSON reports and source/live pairs:

- Frozen source inventory and hashes passed: **97 flows, 424 ordered frames, 323 standalone entries**.
- Product cache restoration and verification against current provenance passed. Web lint, typecheck and the non-deploying production build passed.
- **99/99 selected frames captured and scored**, with no recorded browser errors. The scope is flows **2-16, 18-20, 32, 37-38, 40-42, 84, 96-97**. All **20 product checkpoints** now have capture evidence, including the previously ambiguous `f038-006`.
- **68/68 selected interaction tests passed**, with **0 skipped, 0 unexpected failures and 0 flaky tests** in the inspected Playwright JSON. This includes shared Sheet history, storefront filters/navigation, Saved, product gallery and both product-description journeys.
- The frame map contains **195 registered replay definitions / 424 frames**, with **229 route hints**. This is not 195 completed screens. The artifact includes the regenerated existing frame ledger; preserve unmeasured rows when incorporating it into the checked-in ledger.
- **Only four frames cleared both numerical gates. No new owner acceptance was recorded.** The workflow therefore correctly remains failing at its numerical diagnostic gate, not at build, capture or interaction execution.

| Numerical candidate | MAE % | Bad-pixel-12 % |
| --- | ---: | ---: |
| `f005-004` | 1.4629 | 4.2801 |
| `f006-002` | 0.9117 | 2.9081 |
| `f018-002` | 0.7688 | 3.9942 |
| `f018-003` | 1.1121 | 5.0980 |

These four are diagnostic candidates, not literal 1:1 approval. The other 95 selected frames remain numerically unresolved, alongside unselected and unmapped source obligations.

[Foundation run 34709677151](https://github.com/darkapoparka/treido-bg/actions/runs/34709677151), on the same `fc7d58b` commit, passed **`pnpm check`, `pnpm build:web` and `pnpm test:smoke:web`**. Its **`pnpm native:check` step failed**. Do not call the entire foundation green; equally, do not repeat the older 28-file formatting failure as the current result. The native failure is separate from the successful web checks and remains outside this Shop-web implementation batch.

### Cache repair without weakening provenance

The integration at `11ecfa3008253107c8d72c7df0da4d8acf9e8ebf` changed the exact media-cache key. Run **34709522604** missed that cache, downloaded new upstream bytes, and rejected `rice-bundle`, `shower-caddy`, `rice-shampoo` and `home-air-dry-cream`. Build/captures/interactions were skipped in that run, not passed.

Commit **`fc7d58b`** adds an OS/architecture-specific restore-key fallback to the existing Actions cache. A fallback is only a candidate: both preparation and `--verify` still check every image against **current expected hashes, decoded-pixel hashes and dimensions**. Cache saving still requires successful product verification. No expected checksum, acceptance threshold or source mask changed; rejected candidates are not served. The completed run above proves this cache-backed path, not stable fresh upstream downloads or repaired local assets.

### Source changes preserved and verified by this continuation

- **`ad09fc0`** registers/adopts shared Sheet history synchronously before `showModal()`. The original immediate Filter Back to `about:blank` failure is fixed. Deferred retirement, nested history, committed queries, focus return and body locks remain covered.
- **`9c63cf9` / `dadc9b7`** test history ownership at the actual `showModal()` call, repeated immediate Back and nested dismissal. The corrected test reads its parent marker before a child dialog makes the parent inert; it does not weaken the assertions.
- **`62bccf5` / `a1bbc46`** refine storefront action spacing, Filter row/header/chevron/footer geometry, search suggestions and information-category rhythm. The white suggestion canvas is restricted to the editing state; its initially introduced result-grid regression was corrected.
- **`ad5c9c5` / `701e4d8` / `57ca1fe`** establish separate Shea and Bag description excerpts, full product-specific descriptions and focused tests at 320/393/430 pixels with exact scroll/focus restoration. The integration consolidated the Bag's 16px paragraph spacing into canonical product CSS.
- **`87a1652`** makes the storefront Forward test observe the committed URL outside a replacing browser execution context, retaining exact criteria assertions and adding returned-route, hydration, grid and closed-dialog checks. Its pre-expansion run **34709126328**, artifact **10302282901**, passed 64/64 tests with 79/79 captures; the expanded 68-test result above supersedes that selected scope.
- **`c4584c8`** supplied the twenty product recipes. The normal registry write in that session was denied before writing; it was not bypassed. The separately integrated **`fe14af0`** registration is now on main and those recipes were genuinely executed in the latest run. Do not keep describing the module as inactive or repository writes as generally unavailable.

### Exact remaining visual work

The latest reference/live pairs for `f018-001`, `f019-002`, `f020-001`, `f032-002` and `f038-006` were inspected. Passing interactions do not resolve these visible differences:

- `f019-002` measures **9.4653% MAE**. Its Save picker underlay is visibly too light: current global 40% black differs from the source's approximately 50% black. A scoped non-creating product-picker backdrop correction is the next small visual change to verify; it has **not** been committed. Preserve the source's separate promotion/arrival history rather than inventing a discount change when saving.
- `f018-001` measures **4.2825% MAE**. The Shea detail photograph is brighter than the source; product typography, icons, story-ring state, offer and dock treatment still differ. The already numerically passing fullscreen gallery is a distinct treatment and must not be changed blindly with the detail image.
- `f020-001` and `f032-001` each measure **6.1273% MAE**; the Bag description paragraph tests now pass, but purchase/review geometry and source typography remain visually unresolved.
- `f032-002` measures **6.4889% MAE**. The full-description panel still needs geometry/typography comparison. Flow 32 switches from the Bag preview to Shea's ingredients; retain that explicit separate product entry.
- `f038-006` now captures successfully but measures **10.3651% MAE**. Reported-product concealment and confirmation do not establish visual parity of the returning storefront, inventory, promotion and saved-history state.

Continue the existing product/detail/variant/save/cart/contact/report owners without restarting architecture or creating another queue. Flow 17 still includes the distinct Midi Shirtdress state; the add-to-cart recording still requires its genuine intermediate feedback/motion. Other review, search/assistant, Explore/Minis, commerce, orders, onboarding and widget obligations remain in scope. Do not endlessly tune one photograph while those families remain unmapped.

## Integration checkpoint retained

Integration `cd4f8fcffd89bfc4ed1a5e117f5454358505e25c` preserves application changes through `57ca1fe` from `main` and documentation/setup through `758f11c` from `astra-pro`. The main changes include storefront styling, sheet history registration before dialogs become interactive, product description states and 20 product checkpoint definitions.

Registration commit `fe14af0` connects those existing product definitions to the registry and existing CI selection. Enumeration on 2026-09-12 finds **97 flows, 424 frame entries and 195 registered replay definitions**. The 20 checkpoints cover flows **18-20, 32, 37 and 38**; their complete ordered source stills were inspected. Flow 17 remains a separate detail/variant obligation.

The local integration record reported rejected `store-hero`, `shower-caddy` and `rice-shampoo` assets and fresh-download mismatches for the last two. Its old preview on 6412 was unresponsive and Windows denied stopping PID 16240; see [status](docs/STATUS.md) for that checkout's prerequisite. The GitHub-only continuation did not use or change that computer. A CI capture does not repair local assets.

[Non-deploying integration run 34708336898](https://github.com/darkapoparka/treido-bg/actions/runs/34708336898) scored **98/99 selected frames**, including **19/20 product checkpoints**, with **67/68 interactions passing**. `f038-006` failed an ambiguous reported-marker selector and the Bag description test measured 0px instead of 16px. The scoped follow-up fixed the selector and description heading/paragraph spacing; the newer exact-main verification above confirms successful capture and passing tests. Its visual residuals remain open.

The integration's local inspection artifacts were `.qa/shop-parity/imported-ci-cd4f8fc/` for downloaded reports/pairs and `.qa/shop-parity/local-integration/` for source/live contact sheets. Its original source still had open promotion/arrival-history differences, quantity/button/review typography, description-sheet geometry and add-to-cart intermediate animation/timing. No mask or baseline was changed to hide them.

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

[Concurrent main checkpoint at 41445f9](https://github.com/darkapoparka/treido-bg/blob/41445f956883a15cf0e28cecc8521558670adc6d/shop-implementation-map.md) preserves its four intermediate Actions runs/artifact IDs, measured storefront improvements and that session's connector denial. Its 175-definition limit predates the later integration and actual 195-definition/99-frame CI selection. The integration retains `a1bbc46`'s search-editing-only canvas and `87a1652`'s stronger Forward observation; the overlapping `701e4d8` paragraph fix is consolidated into canonical product CSS. Historical operating modes do not override a current session's explicit owner restrictions.

Flow 17 still includes the distinct Midi Shirtdress in Ultrasoft Cotton / Estate Blue, Open Air, White source state; do not substitute Shea or invent its seller. Storefront residuals include filter-underlay alignment, photography, incomplete search-result rows, the returning Kitsch hero and Chemical Guys inventory/video. These remain source obligations alongside the product residuals above.

## Measurement and execution

[design.md](design.md) owns source normalization and unchanged diagnostic thresholds. [single-session-execution.md](single-session-execution.md) owns commands, server coordination and the connected replay loop. Wait for the real target UI, hydration, fonts and decoded images. Inspect reference/live pairs and related 320/430 containment, then run the focused existing tests.

A route, definition, successful capture, diagnostic candidate, interaction pass and owner approval are different results. Preserve source obligations and report failures without altering masks, hashes or thresholds to manufacture green evidence.

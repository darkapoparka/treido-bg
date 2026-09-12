# Shop implementation map

Execution and evidence map for the frozen Shop corpus. `shop-frame-ledger.md` remains the frame record; `shop-parity-checklist.md` remains the acceptance ledger. Current owner mode is **GitHub tools + GitHub Actions, main only**; see `single-session-execution.md`. Do not return to a Windows checkout or another local source checkout.

## Fixed source and comparison

- Verified corpus: **97 flows, 424 ordered flow frames, 323 standalone media entries**. These are different inventories, not interchangeable completed-screen counts. The newer Actions provenance verifies 755 referenced files.
- Primary browser viewport: **393×793**.
- For the documented 1179/1180×2676 flow rasters, normalize the source to 393×892, then crop `(0, 59, 393, 793)`.
- Never resize the live screenshot or blindly apply this normalization to differently sized standalone media.
- The crop excludes native status chrome and the Mobbin footer. Additional keyboard/provider boundaries require frame-specific evidence. Never mask app-owned controls, incorrect imagery, typography, layout or missing content.
- Videos and standalone entries not reconciled with a flow remain explicit obligations. Still screenshots do not establish transition parity.

## Mapping and canonical owners

`node scripts/shop-parity/run.mjs enumerate` produces `.qa/shop-parity/frame-map.json` from the frozen manifest and registered recipes:

`source frame → family → route/query → scenario → setup/actions → scroll/focus/overlay → comparison/evidence`.

A route hint is not executable coverage. A reproducible definition is not visual completion. Retain every source frame even when several frames share a route or pixels.

| Flows | Family / canonical owner |
| --- | --- |
| 1, 94 | onboarding/login: `/onboarding`, `/login` |
| 2–6, 42 | Home/notifications/deals/following |
| 7–13 | Saved/collections: `saved.tsx`, `saved-card.tsx`, `saved.css` |
| 14–16, 40–41, 96–97 | storefront/collections/search/filter/info/video: `store.tsx`, `store-filter.tsx`, `store.module.css` |
| 17–20, 32, 37–38 | product/gallery/save/cart/contact/report: `product.tsx`, `product.css`, `reviews.tsx` |
| 21–31 | cart/checkout/review/pay/receipt |
| 33–39 | product/store reviews and reports |
| 43–49 | Search/assistant/result filters |
| 50–59 | Explore/Minis |
| 60–68, 79 | Orders/history/tracking/manual order/review |
| 69–78 | Profile/account/people/preferences |
| 80–82 | payment methods/card add/detail/delete |
| 83–84 | addresses/detail/delete |
| 85–93 | security/notifications/connections/privacy/support/logout |
| 95 | widgets web adaptation |

All families remain in scope. Preserve working canonical components and state rather than building disconnected screenshot pages. Captured history jumps belong in explicit named entries with source notes; never invent a causal transition that the source does not show.

## Current checkpoint: 2026-09-12 resumed execution

### Preserve the actual main history

The resumed session found **`1f9cc493a978f3aee8a70bddf93294b333283dce`**, 29 commits beyond the old `e4b90b7` handoff. The interrupted response did not erase those commits. Storefront implementation and 27 storefront replay frames, Saved corrections, product gallery changes and verified-media caching were already present. Never reset to the obsolete handoff or describe that newer work as uncommitted.

Latest application-source checkpoint: **`a1bbc4682245cc2cfb672a406525cf399b9ec996`**. The latest subsequent test correction is **`87a165218ce210587cedcf7bf5bf01db10a56078`**. Read current main and preserve any newer commits; these pointers are not reset targets.

### What changed in this resumed batch

- `ad09fc0`: shared Sheets synchronously register/adopt their history entry **before** exposing the dialog with `showModal()`. This fixes the immediate-Back race to `about:blank` while retaining nested history, committed query restoration, body locks, retiring-entry cleanup and focus return without scrolling.
- `9c63cf9` / `dadc9b7`: regression instrumentation observes the marker at the exact `showModal()` call, not after a timer. Repeated open/Back and nested Back preserve entries, focus and body locks. The corrected test reads its parent marker before the child makes the parent inert; all original assertions remain.
- `62bccf5` / `a1bbc46`: storefront action spacing; Filter header/row/chevron geometry and equal-width footer buttons; search suggestion price/cancel typography; information-category row rhythm. The initial white-canvas change regressed result grids, so it is now restricted to the editing/suggestion state.
- `ad5c9c5` / `701e4d8`: separate Shea and Bag description-preview paragraphs and captured excerpts, one real Read more control, unchanged complete descriptions and ingredients. The Bag's 16px separation is owned at the component instead of being defeated by the global unlayered paragraph reset.
- `57ca1fe`: both product-description journeys cover 320/393/430 containment, complete product-specific descriptions, genuine nonzero scroll, exact focus/scroll restoration and Back/Escape dismissal.
- `87a1652`: the storefront criteria test reads the committed main-frame URL outside the browser execution context, avoiding evaluation inside a document being replaced during Forward navigation. It retains the exact criteria checks and adds explicit returned-route, interactive-surface, product-grid and closed-dialog assertions.
- `c4584c8`: twenty proposed product replay checkpoints are committed in `recipes-product.mjs`, but **their registry update was denied and they are not active coverage**. See the precise limitation below.

### Completed verification snapshots

| Actions run | Evaluated commit | Captures | Interactions | Main finding | Evidence artifact |
| --- | --- | --- | --- | --- | --- |
| 34706244853 | `1f9cc493` | 79 scored | 60 passed / 1 failed | Original Filter immediate Back reached `about:blank` | 10302485378 |
| 34707281518 | `c4584c88` | 79 scored | 61 passed / 1 failed | Original race fixed; new test queried an inert parent | 10302735629 |
| 34708071703 | `57ca1fe5` | 79 scored | 63 passed / 1 failed | Bag paragraph margin was 0px rather than 16px | 10302677503 |
| 34708556877 | `a1bbc468` | 79 scored | 63 passed / 1 failed | Both product tests passed; storefront Forward test evaluated a replacing document | 10301894629 |

All four completed snapshots passed frozen-reference verification, exact cached-product re-verification, web lint/typecheck and the **non-deploying production web build**. No skipped or flaky interaction tests were reported in their inspected JSON. They are separate runs, not results that can be combined into a fictitious all-green run.

The latest application-source run **34708556877** passed the immediate-Back and nested regression tests, both product-description tests, the existing Saved tests and the existing nested Billing test. Its sole interaction failure was `nested Price Back and Forward preserve drafts, then Done consumes only the filter entries`, at `criteria(page)` after returning from `/following`. The captured failure state shows the intended storefront with its filtered result; the assertion crashed because `page.evaluate` lost its execution context during document replacement. `87a1652` corrects that observation and explicitly checks the restored UI. Its exact verification is **run 34709126328**; no pass is claimed until that run's results are inspected.

### Active coverage, not a completion percentage

The inspected Actions `frame-map.json` contains **175 reproducible definitions / 424 frames**, with **249 route hints**. The unregistered twenty product entries are excluded; do not report 195 definitions or twenty product captures.

The current selected scope is **flows 2–16, 40–42, 84, 96–97: 79 frames**, including all 27 Saved frames and all 27 storefront-family frames. Every selected frame was captured/scored in the completed snapshots above. Only **`f005-004` and `f006-002`** cleared both numerical thresholds. No frame or flow received new owner acceptance.

The existing Actions ledger generator emits all 424 rows into the artifact's `frame-ledger.md`. The checked-in ledger still predates this newer evidence. Preserve all IDs and historical/unmeasured rows when incorporating it; do not treat its stale count as deleted work or replace unchecked rows with invented passes.

### Measured storefront changes and inspected residuals

Source/live/before/after pairs were inspected for the Filter, search suggestions/results and information categories. Against run 34707281518, the application-source checkpoint `a1bbc468` measured:

| Frame | Before MAE % | After MAE % | Status |
| --- | ---: | ---: | --- |
| `f016-001` | 3.572 | 3.377 | Improved; unresolved |
| `f016-002` | 3.613 | 3.421 | Improved; unresolved |
| `f016-003` | 3.094 | 2.995 | Improved; unresolved |
| `f016-004` | 3.340 | 3.241 | Improved; unresolved |
| `f040-002` | 2.433 | 2.072 | Improved; unresolved |
| `f040-003` | 2.586 | 2.193 | Improved; unresolved |
| `f097-002` | 6.344 | 5.679 | Improved; unresolved |

The earlier `57ca1fe5` result regressed `f040-004` by 0.341 MAE points because the white editing canvas also reached results. `a1bbc468` restricts that rule and returns the result-grid score to approximately 6.49%. No compared frame in that application-source batch increased by more than the 0.15-point investigation threshold against `c4584c88`. Several storefront-header frames increased by approximately 0.053 points despite the source-matched action gap; the larger improvements do not erase those smaller residuals.

Remaining storefront differences include about 8px of Filter-underlay scroll alignment, photo scale/treatment, typography and icon metrics, incomplete search-result rows, the returning Kitsch hero, Chemical Guys catalog/artwork and genuine video playback. The four identified search-result products do not constitute the complete source list. On-sale source frames show regular-price items for which discount facts are not established; do not fabricate compare-at prices or disable filtering to mimic them.

All Saved frames **`f007-001`–`f007-004`, `f008-001`–`f008-007`, `f009-001`–`f009-003`, `f010-001`–`f010-002`, `f011-001`–`f011-005`, `f012-001`–`f012-003`, `f013-001`–`f013-003`** remain visually unresolved. Typography, collection/card spacing, photography and translucent dock/fade differences remain explicit. Never reconstruct the obscured pink product price or mask its unknown lower photograph.

### Acquisition and foundation checks

The verified-media cache restores an already approved set and rechecks exact bytes on every run. `rice-bundle`, `shower-caddy`, `home-air-dry-cream` and `rice-shampoo`, previously rejected at `b12796d`, passed the newer preparation/verification steps. This proves those cache-backed runs, not stable fresh upstream downloads. Preserve provenance and checksum rejection; never repin changing bytes or serve rejected candidates automatically.

Foundation **run 34708556933**, application commit `a1bbc468`, passed workspace/root lint but failed `pnpm check` at **Prettier on 28 files**. This includes older work and this batch's CSS/recipe/test files; it is not solely pre-existing debt. Subsequent foundation typecheck/unit/build/smoke/native stages were skipped. The separate Shop workflow's web lint/typecheck/build results remain valid, but do not call the whole foundation green. Formatting and full foundation verification remain open.

### Specific denied registry mutation

The ordinary `GitHub.update_file` operation for **`scripts/shop-parity/recipes.mjs`**, intended to import/register `productRecipes`, was rejected by the connector safety check before writing. The active registry is unchanged. Do not bypass that denied mutation through another interface, alternate import hub, workflow injection or the owner's PC.

Normal writes to shared `components.tsx`, product/source CSS, tests and these handoff documents succeeded. The old assertion that the shared-history fix was not committed is obsolete; there is no general loss of GitHub write access.

`recipes-product.mjs` describes flows 18–20, 32, 37–38 but is inactive and has no capture evidence. Flow 17's nine frames remain undefined in that module. A source draft and a syntax-valid file cannot count as active browser replay.

### Exact next execution point

Inspect run **34709126328** on `87a165218ce210587cedcf7bf5bf01db10a56078` for the corrected cross-document Forward test; record actual results without merging successful assertions from different runs. Then continue the existing product/gallery/save/cart/description/contact/report family, preserving registered storefront and Saved work and the explicit denied registry mutation.

Product sources 17–20, 32, 37–38 and flow 20's approximately 11.0167-second recording were inspected. Specific obligations:

- Flow 17 includes a distinct **Midi Shirtdress in Ultrasoft Cotton | Estate Blue/Open Air/White** state, price/compare-at, stock and size availability. Do not replace it with Shea or invent a seller identity from an unrelated product.
- Flow 19 changes promotion history between source frames. Saving a product must not fabricate that promotion change.
- Flow 20 shows product-flight/added-item feedback and a stable added-cart state before the offer. The current immediate-offer behavior does not reproduce that motion/ordering. The recording does not justify assuming a new network delay or an automatic offer timer.
- Flow 32 jumps from the Bag preview to Shea's full ingredients. The committed preview/full-description behavior now keeps the two products distinct; retain the explicit separate source history.
- Contact/report previews must remain local and honest; captures must not execute real email, phone, external social, account or report operations.

Continue through the remaining product/review, search/assistant, Explore/Minis, commerce, orders, onboarding and widget obligations. Do not restart the architecture, narrow the assignment to one family, endlessly tune a single photograph or create another planning/scoring framework. Keep implemented, replayable, interaction-tested, visually compared, numerical-candidate, unresolved and owner-accepted separate.

## Historical checkpoints retained

- `77efe3e` / run 34677545900 / artifact 10292614218: Saved implementation, 52 captures, 46 passed/4 failed at that historical commit.
- `b12796d` / run 34678202940 / artifact 10292814536: four checksum failures; browser work skipped. The older unrendered-photo note is historical, not the status of newer cache-backed comparisons.
- `19ed823` / run 34676399228: earlier media repair and browser evidence; later fresh-download instability remained.
- Foundation run 34677545892: historical formatting failure before build/smoke.
- `0f92453`, `f78ef18`, `4c9e902`, `782d507`: prior commerce, Account/Profile, Home/Following and quantitative checkpoints. Preserve their work; never reset main to them.

## Measurement and regression guard

`MAE% = 100 × sum(abs(referenceRGB − liveRGB)) / (255 × 3 × unmaskedPixels)`.

Secondary diagnostics are normalized RMSE, the fraction of pixels whose mean channel error exceeds 12/255, 50:50 overlays and difference heatmaps. Gates remain **MAE ≤ 1.5% and bad-pixel-12 ≤ 8%**. Meaningful visual or behavioral differences remain unresolved even below a threshold.

Keep shared changes only after inspecting affected states and important siblings. An unexplained increase over **0.15 MAE points** requires investigation, not a lowered threshold or silent baseline approval. Thresholds may be tightened, never loosened merely to inflate counts.

## Existing execution loop

Run `.github/workflows/shop-parity.yml` on an exact main commit. The ephemeral Actions preview may use `127.0.0.1:6412`; this does not authorize the owner's computer or a separate local development checkout.

```sh
node scripts/shop-parity/run.mjs enumerate
node scripts/shop-parity/run.mjs baseline --all --flows 2-16,40-42,84,96-97 --run ci-COMMIT_SHA
node scripts/shop-parity/run.mjs compare-runs --before BEFORE_RUN --after AFTER_RUN
```

Use the declared versions and lockfile; the inspected installed framework artifact contains Next.js 16.3.4 navigation/component guidance. Wait for the intended state, `data-shop-interactive=true`, fonts, decoded images and stable frames. Capture independent checkpoints in fresh contexts, drive real controls, inspect reference/live pairs and check relevant 320/430 containment. Commit coherent improvements directly to main and preserve exact-commit evidence. An HTTP 200, screenshot, route, passing test or numerical candidate is not completed 1:1 parity.

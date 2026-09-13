# Current project status

Updated 2026-09-13. This is the session entry point, not a second backlog.

## Working context

Use the existing `J:\treido-bg` checkout of `darkapoparka/treido-bg`, canonical **main**, with one writer. This integration extends **`4d0539f2d0cd70f884941cc83f05ff075365542d`**. Subagents reviewed source pairs and supplied ignored patch proposals; the local writer reviewed, integrated and verified them. [AGENTS.md](../AGENTS.md) and [Codex setup](agents/codex.md) own branch policy, runtime ownership and synchronization.

The active work remains the Shop **mobile-web** portions of Tasks 3/5/6. Finish and approve the frozen UI and connected flows, then adapt the same implementation to the producer-first food marketplace under [product.md](../product.md) and [web.md](../web.md). Backend, native, merchant/admin, food branding and release remain separate work.

## Current implementation checkpoint

All **97 flows / 424 ordered states** now have executable recipes, and every ordered source frame has been visually inspected. The complete `20260913-complete-current` run scored **424/424 states with zero browser errors**, with **31 numerical candidates**, mean **4.817% MAE** and 33 states above 10%. Subsequent fitting changes require their own comparisons; the full run is a dated baseline. Owner acceptance remains **0/97 flows**. [The implementation map](../shop-implementation-map.md) identifies canonical family owners and source gaps; the [frame ledger](../shop-frame-ledger.md) and [flow checklist](../shop-parity-checklist.md) remain the measurement and acceptance owners.

The batch connects onboarding and real loading fallbacks, Home/search history, assistant photos and feedback, checkout editors and receipts, manual orders/tracking, Minis, and account continuations through the existing components and state. Home and Search share recent items. Profile exposes manually created orders independently of profile completeness. Phone entry preserves one country code through both address paths and Back. Store information, product entry, photo menus, order panels and Beauty have source-specific geometry and actual photo/brand regions; controls remain live DOM.

The latest full interaction run passed **206/207** tests (`20260913-interactions-integrated.json`). Its only failure was an expectation missing the source's space before a review-text period; the corrected review and checkout regressions passed **21/21**, including two new phone-to-address journeys. Explore/media siblings passed **5/5**. The complete suite now contains **210** tests; a single full run on the final commit remains pending. Final `pnpm check` passed lint, formatting, all three package typechecks and **17 unit tests**; the real-loading replay helper passed **4/4** tests. Documentation integrity and `git diff --check` passed.

The closing source audit restored the Shop splash wordmark, matched new-onboarding code colors, centered checkout Close/Back controls, retained the single-line payment address and corrected six captured review-author labels. Onboarding/account siblings passed **12/12** and checkout/review siblings **14/14**. `20260913-checkout-fifty-final` scored **50/50 states**, zero browser errors, mean **4.188% MAE**, zero numerical candidates. `20260913-onboarding-final` scored **24/24**, zero browser errors, mean **2.413% MAE**, eight numerical candidates; the restored splash is **0.332% MAE**. The earlier native/browser exceptions and provider boundaries remain explicit.

Flow 19 now records the later offer/arrival/rating snapshot as an explicit entry before the real Save action. It preserves product prices, stock and cart calculations; Save changes only membership. The final product/account sibling run passed **16/16**. `20260913-product-fifty-final` scored **50/50**, zero browser errors, mean **3.919% MAE**, five numerical candidates. These are focused final-source comparisons, not a replacement for the pending complete CI comparison.

`20260913-final-fifty-reviewed` compared another **50 states**, all scored with zero browser errors. Examples improved from the earlier full baseline: store video 18.357% → 1.475% MAE, skin photo menu 26.732% → 4.285%, and expanded order detail 10.751% → 4.583%. These are measured improvements, not accepted screens. The runner now waits for decoded images before positioning scroll anchors. Final Beauty/phone run `20260913-phone-beauty-final` scored **18/18**, zero browser errors, mean **3.833% MAE** and zero numerical candidates. @Browser inspection confirmed Shop information containment at 320/393/430 and Report dismissal with focus return. Current exact-source CI build, production smoke and the full capture/test run remain pending; no local production build was run alongside the owned dev preview.

## Remaining source and verification work

All 307 standalone images are reconciled to existing ordered states (179 exact hash matches, 128 inspected export variants); they add no new screen or clearer asset. [The implementation map](../shop-implementation-map.md#open-source-obligations) records exact inventories. The 16 standalone videos have poster inspection only; this does not establish matching motion or transitions.

Local original-media verification still rejects **`store-hero`**, **`shower-caddy`** and **`rice-shampoo`** against their unchanged expected hashes. Missing Pura/Chemical Guys motion, partial or occluded photography, incomplete source-specific catalog/history states and source typography differences remain visible obligations. Beauty caption removal changes alpha within declared bounds; it cannot recover the photograph hidden by the original text. Existing crops or successful rendering do not repair original provenance failures. Keep lawful/private asset boundaries, diagnostic thresholds and frame-specific platform exceptions intact.

Shopify reference acquisition remains separately unresolved in [its source record](../shopify/README.md); unknown totals and unacquired assets are not buyer-parity completion.

## Next action

Finish the same-source full capture and required verification, then continue fitting the canonical screens to their source pairs until the unchanged visual thresholds and source acceptance requirements are satisfied. Prioritize the largest measured differences, exercise connected returns and sibling widths after shared changes, and update the existing ledgers with exact evidence. Use the owned runtime and existing runner; do not repeat the retired preview-recovery or recipe-registration instructions.

## Dated setup and integration evidence

The [2026-09-12 status at `4d0539f`](https://github.com/darkapoparka/treido-bg/blob/4d0539f2d0cd70f884941cc83f05ff075365542d/docs/STATUS.md) preserves the synchronization history, desktop skill/MCP checks, standalone CLI incompatibility, runtime versions, documentation/upstream checks, earlier Actions results, cache provenance and drive/runtime recovery evidence. Its stopped-preview prerequisite, 195-definition count and older CI outcomes are historical context. [The implementation map's history](../shop-implementation-map.md#historical-evidence) retains the corresponding source/run provenance and earlier visual measurements.

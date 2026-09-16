# Shop implementation map

Current checkout/branch policy is owned by [AGENTS.md](AGENTS.md); use [single-session-execution.md](single-session-execution.md) for the reference loop. The frame ledger and flow checklist remain the evidence owners.

## Current source checkpoint

Updated 2026-09-13. The local integration extends main at **`4d0539f2d0cd70f884941cc83f05ff075365542d`**. All **97 flows / 424 ordered states** now have executable recipes and complete ordered source inspection. The complete `20260913-complete-current` run scored **424/424 states with zero browser errors**: **31 numerical candidates**, **4.817% mean MAE**, 33 states above 10%. Later fitting changes are measured in separate named runs until the next complete comparison; retain their exact provenance. Owner acceptance remains **0/97 flows**.

Connected work includes onboarding and real streamed loading states, shared Home/search history, assistant photos/feedback, checkout editors/receipts, manual orders/tracking, Minis and account continuations. Later fitting covers the Carpe continuation, distinct product arrival/settled/saving-offer source entries, Chemical Guys photo regions, Shop information, photo menus, Beauty and order panels. The full interaction run passed **206/207**; its review-text expectation was corrected and **26/26** focused regressions passed, including two new phone/address journeys. Additional final onboarding, checkout/review and product siblings passed **12/12**, **14/14** and **16/16**. The suite now contains **210** tests. [Current status](docs/STATUS.md) owns final revision/check results and the resume action.

The subsequent `20260913-final-fifty-reviewed` run scored all **50 states** with no browser errors. Store-video frame 15/002 improved to **1.475% MAE**, skin-menu frame 57/004 to **4.285%**, and expanded-order frame 61/002 to **4.583%**. Its two numerical candidates remain unaccepted. Final Beauty caption and phone normalization changes have a separate targeted run; do not present separate fitting runs as one complete final-source capture. The runner waits for loaded, decoded images before scroll anchors so captures preserve the intended positions.

## Preferences spacing resume, 2026-09-16

Tasks 3/5/6, flow 1, source `b778fdce-2c65-4153-aaee-6703098f27d4`: baseline `20260916-onboarding-before` captured all 15 states at clean `753a1c39b16a411056ad8123740bc88626768255` using Edge, Node 22.22.0 and the existing 6412 preview at 393x793. Mean MAE was 2.224%; this is not owner acceptance. The splash stayed unchanged at 0.332%.

The canonical `apps/web/src/features/account/account.css` preferences action margin changes 18px to 6px, moving Next up 12px without changing artwork or the short-height override. `20260916-preferences-after` captures frame 13 with that CSS diff: MAE 2.436520% -> 2.373446% (delta -0.063074 points). Source/live inspection confirms the improved Next placement; typography/choice styling remain visibly different and the frame remains above threshold. Sibling frame 9 in `20260916-preferences-empty-after` remains 1.809% MAE. No masks, assets, recipes or thresholds changed.

`tests/reference/onboarding-widget-journeys.spec.ts` passed 4/4 via the existing reference config with `REFERENCE_BASE_URL=http://127.0.0.1:6412` and `PLAYWRIGHT_CHANNEL=msedge`. The added test checks disabled/hidden Next before selection, 14px button-boundary spacing and horizontal containment at 320/393/430, keyboard activation, selection retained through Back, and Forward to tracking. Existing cold launch covers 320x568 through Home. The first new-test attempt failed because its role locator excluded the deliberately hidden button; using its DOM locator corrected the test without removing the hidden/disabled assertions. Local logs and pair artifacts stay in ignored `.qa/shop-parity/`.

Next: fit the remaining preference typography/selected control styling against frames 9/13, then resume the Home family. Frame 8 is the onboarding outlier at 6.751% MAE; its trailing Princess Polly product is explicitly unavailable, not a failed decoded image. Recovering that content requires valid source identity/media, not an unrelated product substitution. Full suite, production build, CI and motion verification were not rerun; owner acceptance stays 0/97.

## Open source obligations

All **307 standalone images** are reconciled with existing ordered flow states: **179** have exact manifest-hash matches, and **128** were visually paired with their ordered counterpart. The latter are exports with different resolution, compression and footer packaging; no additional UI state or clearer photographic asset was found. Exact local inventories are `.qa/shop-parity/standalone-reconciliation.json`, `.qa/agent-patches/standalone-checkout/inventory.json` (47 images) and `.qa/agent-patches/standalone-minis/inventory.json` (81). This reconciles image inventory, not implementation acceptance. The **16 standalone videos** received poster inspection; complete motion/transition matching remains separate.

- Original-media verification still rejects `store-hero`, `shower-caddy` and `rice-shampoo`; expected hashes are unchanged. Local rendered crops and older CI cache evidence do not resolve these provenance failures.
- Pura's campaign changes scene in the source but lacks the required motion; its available still is already dimmed. Chemical Guys inventory/video remains incomplete. Still-image capture is not motion or provider acceptance.
- Partial photographs, image regions hidden by captured controls, trailing products, campaign ordering and source-specific promotion/cart/history states remain visible gaps. Recover only lawful photo/brand regions and keep controls in canonical DOM; never fabricate missing imagery or provider success.
- Unavailable source typography and named browser/native boundaries remain review obligations. Preserve frame-specific evidence and the original comparison rules.
- Flow 17 retains the distinct Midi Shirtdress in Ultrasoft Cotton / Estate Blue, Open Air, White source identity; do not substitute Shea or invent its seller. Reassess the recorded storefront and product residuals against current pairs rather than treating historical observations as repaired or unchanged.

Continue source fitting until the unchanged diagnostic thresholds and source-acceptance requirements are satisfied. No new acceptance is inferred from recipe registration, successful capture or focused interaction passes.

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

A route hint is not executable coverage. A reproducible definition is not visual completion. Retain every source frame even when several frames share a route or pixels. The following owners are under `apps/web/src/features/`; subsequent filenames in a row use the same feature folder. Their existing scoped CSS and state modules remain canonical.

| Flows               | Family / canonical owners                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1, 94               | onboarding/login: `account/support.tsx`, `account/authentication.tsx`, `account/reference-transitions.tsx`                                             |
| 2-6, 42             | Home/notifications/deals/following: `discovery/home.tsx`, `home-campaigns.tsx`, `notifications.tsx`, `deals.tsx`, `following.tsx`                      |
| 7-13                | Saved/collections: `discovery/saved.tsx`, `saved-card.tsx`, `collection-editor.tsx`, `first-collection.tsx`                                            |
| 14-16, 40-41, 96-97 | storefront/collections/search/filter/info/video: `discovery/store.tsx`, `store-filter.tsx`, `store.module.css`                                         |
| 17-20, 32, 37-38    | product/gallery/save/cart/contact/report: `discovery/product.tsx`, `product-gallery.ts`, `product-addition.tsx`, `reviews.tsx`                         |
| 21-31               | cart/checkout/review/pay/receipt: `commerce/cart.tsx`, `checkout.tsx`, `initial-payment.tsx`, `orders.tsx`                                             |
| 33-39               | product/store reviews and reports: `discovery/reviews.tsx`, `review-feedback.tsx`, `store-reviews.tsx`                                                 |
| 43-49               | Search/assistant/result filters: `discovery/search.tsx`, `search-recent.tsx`, `assistant.tsx`, `filters.tsx`                                           |
| 50-59               | Explore/Minis: `discovery/explore.tsx`, `minis.tsx`, `mini-frame.tsx`, `sol.tsx`                                                                       |
| 60-68, 79           | Orders/history/tracking/manual order/review: `commerce/orders.tsx`, `tracking.tsx`, `order-presentation.tsx`                                           |
| 69-78               | Profile/account/people/preferences: `account/pages.tsx`, `profile-recent.tsx`, `preferences.tsx`                                                       |
| 80-82               | payment methods/card add/detail/delete: `account/forms.tsx`, `pages.tsx`                                                                               |
| 83-84               | addresses/detail/delete: `account/forms.tsx`, `pages.tsx`                                                                                              |
| 85-93               | security/notifications/connections/privacy/support/logout: `account/pages.tsx`, `authentication.tsx`, `privacy.tsx`, `support.tsx`, `support-chat.tsx` |
| 95                  | widgets web adaptation: `discovery/widgets.tsx`                                                                                                        |

All families remain in scope. Preserve working canonical components and state rather than making disconnected screenshot pages. Captured history jumps belong in explicit named entries with source notes; do not invent a causal UI transition that the source does not show. The catalog/reference adapter and existing account/discovery state own isolated fixtures; preview data is not real commerce.

## Historical evidence

The earlier `77efe3e` / `b12796d` implementation, Actions runs, unresolved frame list and historical next step are preserved in the [immutable pre-Astra map](docs/history/pre-astra-2026-09-12/shop-implementation-map.md.txt). Consult that specific record for older evidence; do not repeat its failures as current facts.

The [2026-09-12 map at `4d0539f`](https://github.com/darkapoparka/treido-bg/blob/4d0539f2d0cd70f884941cc83f05ff075365542d/shop-implementation-map.md) retains the 195-definition checkpoint, all 20 inspected product-frame identities, exact artifact/local paths and numerical comparisons for the `fc7d58b` baseline. [Run 34709677111](https://github.com/darkapoparka/treido-bg/actions/runs/34709677111) captured 99 selected frames and passed 68 interactions on that older source; four numeric candidates did not pass the diagnostic gate or gain owner acceptance. Artifact `10303420683` and `.qa/shop-parity/runs/ci-fc7d58b9699c64692ce4870601bf7e19ef07bee5/` retain its report and pairs.

The [pre-batch ledger at `fc7d58b`](https://github.com/darkapoparka/treido-bg/blob/fc7d58b9699c64692ce4870601bf7e19ef07bee5/shop-frame-ledger.md) preserves earlier account/profile/wallet measurements and exact run/source notes. Historical candidates do not become current acceptance.

[The concurrent checkpoint at `41445f9`](https://github.com/darkapoparka/treido-bg/blob/41445f956883a15cf0e28cecc8521558670adc6d/shop-implementation-map.md) preserves four intermediate Actions runs/artifact IDs, measured storefront improvements and its connector denial. Its GitHub-only operating mode and 175-definition limit are historical context. The retained `a1bbc46` search-editing canvas, `87a1652` Forward observation and consolidated `701e4d8` paragraph fix remain part of the implementation history.

[The verified checkpoint at `ad32ac0`](https://github.com/darkapoparka/treido-bg/blob/ad32ac05fd99445b4ba9a0ffbb8eadf5529b4a7c/shop-implementation-map.md) preserves granular source-commit provenance, artifact IDs and the Save-backdrop hypothesis (40% black versus approximately 50% in the source). Reassess that dated observation against current captures; it does not establish current behavior.

## Measurement and execution

[design.md](design.md) owns source normalization and unchanged diagnostic thresholds. [single-session-execution.md](single-session-execution.md) owns commands, server coordination and the connected replay loop. Wait for the real target UI, hydration, fonts and decoded images. Inspect reference/live pairs and related 320/430 containment, then run the focused existing tests.

A route, definition, successful capture, diagnostic candidate, interaction pass and owner approval are different results. Preserve source obligations and report failures without altering masks, hashes or thresholds to manufacture green evidence.

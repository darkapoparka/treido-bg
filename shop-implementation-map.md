# Shop implementation map

Operational visual-fidelity map for the frozen Shop corpus. This document is the execution source for quantitative 1:1 work; `shop-parity-checklist.md` remains the acceptance ledger.

## Fixed source and comparison frame

- Frozen source: 97 flows, 424 ordered flow frames, 323 standalone entries under `references/shop/`.
- Primary browser viewport: **393x793**.
- Frozen raster is 1179/1180x2676. Normalize to **393x892**, then crop `(x=0, y=59, width=393, height=793)`.
- The crop excludes native iOS status chrome at y0-59 and the Mobbin attribution/footer at normalized y852-892.
- Never recreate excluded chrome in DOM. Never scale the app screenshot to fit a reference.
- Web-owned pixels are compared 1:1 after this normalization. Any additional native keyboard/file-picker/provider chrome is masked explicitly per frame.

## Machine-readable mapping architecture

Disposable QA workspace: `.qa/shop-parity/` (excluded locally through `.git/info/exclude`, never committed).

`node .qa/shop-parity/shop-parity.cjs enumerate` reads `references/shop/manifest.json` and emits `.qa/shop-parity/frame-map.json` with one entry per frozen frame:

`flowNo + flowId + frameNo -> reference file -> family -> route -> queryState -> setupActions -> scrollPosition -> overlayState -> scoreability`.

Every corpus frame exists in the map immediately. A frame is `route-hint` until its exact deterministic replay is encoded in `.qa/shop-parity/recipes.cjs`; only `reproducible` frames are pixel-scored. Do not guess missing state from a neighboring route.
### Family route owners

| Flows | Family / canonical route owner |
| --- | --- |
| 1, 94 | onboarding/login: `/onboarding`, `/login` |
| 2-6, 42 | home/notifications/deals/following: `/`, `/notifications`, `/deals`, `/following` |
| 7-13 | Saved/collections: `/saved` |
| 14-16, 40-41, 96-97 | storefront/search/filter/info/video: `/stores/[id]/*` |
| 17-20, 32, 37-38 | product/gallery/save/cart/contact/report: `/products/[id]` |
| 21-31 | cart/checkout/review/pay/receipt: `/products/shampoo-bag`, `/checkout`, order receipt routes |
| 33-39 | product/store reviews and reports: review routes + shared Sheet |
| 43-49 | Search/assistant/result filters: `/search`, `/assistant` |
| 50-59 | Explore/Minis: `/explore`, `/minis/*` |
| 60-68, 79 | Orders/history/tracking/review/manual order: `/orders/*` |
| 69-78 | Profile/account/people/preferences: `/profile`, `/account`, `/account/people` |
| 80-82 | profile payment methods/card add/detail/delete: Profile + `/account/payments` |
| 83-84 | profile addresses/detail/delete: Profile + `/account/addresses` |
| 85-93 | security/notifications/connections/privacy/support/logout: `/account/*`, `/support`, `/about` |
| 95 | widgets browser adaptation: `/widgets` |

For flows with repeated predecessor frames, replay from the source flow entry state rather than substituting a visually similar direct route. Shared state is recreated inside a fresh browser context for every scored frame.
## Visual scoring formula

Primary metric is normalized RGB mean absolute error over unmasked pixels:

`MAE% = 100 * sum(abs(referenceRGB - liveRGB)) / (255 * 3 * unmaskedPixels)`

Secondary diagnostics:

- `RMSE% = 100 * sqrt(mean((referenceRGB-liveRGB)^2)) / 255` to expose concentrated large errors.
- `bad-pixel-12%` = percentage of unmasked pixels whose mean RGB absolute error exceeds 12/255.
- Reference/live 50:50 alpha overlay for alignment inspection.
- Difference heatmap where intensity is proportional to per-pixel RGB error.

A change is kept only when the affected canonical family improves in aggregate and no important sibling materially regresses. Default regression guard: reject any sibling increase greater than **0.15 MAE points** unless the old state was demonstrably mapped incorrectly. A generic rule that helps one family and hurts another must be scoped at the correct component/state owner.

## QA commands

```powershell
node .qa/shop-parity/shop-parity.cjs enumerate
node .qa/shop-parity/shop-parity.cjs baseline --flow 84 --frame 1 --run address-before
node .qa/shop-parity/shop-parity.cjs baseline --family account-payments --run payments-before
node .qa/shop-parity/shop-parity.cjs baseline --all --run corpus-current
node .qa/shop-parity/shop-parity.cjs compare-runs --before payments-before --after payments-after
```

Run against the owned preview with `SHOP_REFERENCE_PREVIEW=1`; current development target is `http://127.0.0.1:6412`. Each scored frame writes `reference.png`, `live.png`, `overlay.png`, `difference-heatmap.png`, plus ranked JSON/CSV/Markdown at the run root.
## Shared visual primitives and leverage

| Owner | Primary files | Dependent flow families |
| --- | --- | --- |
| page canvas / gutters / typography | `app/globals.css`, feature CSS roots | all 97 flows |
| floating dock / back / cart controls | `features/discovery/components.tsx` + shared CSS | nearly every buyer flow |
| Sheet/dialog geometry/history/focus | `features/discovery/components.tsx` | filters, reports, cart, account confirmations, Minis |
| ProductCard / StoreRow / media treatment | discovery components + product/store CSS | Home, Saved, Search, Store, Product, Explore |
| account page/header/rows/forms | `features/account/forms.tsx`, `account.css` | 69-94 |
| payment card/add/detail | account forms/pages/state/CSS | 21, 26, 29, 80-82 |
| address forms/list/detail | account forms/pages/state/CSS | 25, 27-28, 83-84 |
| cart/checkout shell | commerce checkout + account CSS | 20-31 |
| product detail shell | product/reviews + product CSS | 17-20, 32-38 |
| Saved/collection grid | `features/discovery/saved.tsx`, `saved.css` | 7-13, 19 |
| Search/result rails/filters | search/store owners + Sheet | 40, 43-49 |
| order shell/tracking/review | commerce order owners | 60-68, 79 |

Fix the highest-leverage shared primitive only when the ranked heatmaps show the same residual pattern across siblings. Otherwise fix the family-specific owner.

## Current quantitative baseline

Run: `.qa/shop-parity/runs/current-80-84-scored/` against the preserved working tree. 19/19 mapped frames scored successfully.

| Family | Frames | Mean MAE % | Worst MAE % | Mean bad-pixel-12 % |
| --- | ---: | ---: | ---: | ---: |
| account-payments | 13 | 4.102 | 7.108 | 14.540 |
| account-addresses | 6 | 2.635 | 4.869 | 8.132 |

Worst mapped states now: flow 80 frame 7 `add-card-save-visible` 7.108%; flow 80 frame 8 `profile-two-cards` 5.341%; flow 80 frame 6 `add-card-name-and-billing` 5.287%; shared profile payment-method state 4.869%; card detail 4.823%; address detail 3.002%; address-delete dialog 2.860%. Best mapped state is flow 80 frame 2 at 0.981%.
Measured improvement already established: the flow-80 add-card bottom-space sweep found **185px** as the local optimum; frame 7 improved **11.664% -> 7.108% MAE** while every other scored payment sibling remained numerically unchanged. This scoped rule is therefore retained.

A disposable clean-`HEAD` preview on port 6413 confirmed that the prior committed implementation was materially worse at the first two reproducible flow-80 states: frame 1 **6.213%** vs current **4.869%**, frame 2 **13.201%** vs current **0.981%**. Later HEAD states use an older incompatible interaction structure, so they are not assigned fabricated before scores.

## Priority order

1. Finish account payment shared residuals: profile payment-method composition, card detail, delete-card dialog, then the remaining add-card frames. These currently dominate mapped error and share owners with checkout payment flows.
2. Finish account address residuals and lock flows 83-84 after sibling regression comparison.
3. Map and score 69-78; correct shared account canvas/typography/rows before per-field exceptions.
4. Map 85-94, then score the complete Account/Profile family so shared account changes are judged together.
5. Map 2-6 + 42 and fix Home canvas/dock/campaign shared owners.
6. Map 7-13, then 14-20 + 32 + 37-41 + 96-97; prioritize ProductCard/StoreRow/product shell by family-average error.
7. Map 33-39, Search 43-51, Minis 52-59, then widget adaptation 95.
8. Map commerce 21-31 + 60-68 + 79 and run one commerce-wide visual pass, preserving its existing functional checkpoint.
9. Once every reproducible frame is mapped, run a whole-corpus ranked baseline and iterate worst -> best by shared DOM/CSS owner.

Do not follow catalogue number merely because it is next. After mapping, ranking error + shared leverage decides implementation order.
## Acceptance thresholds

These are strict visual gates, not substitutes for direct inspection:

- **Excellent candidate:** MAE <= 1.0% with no structural heatmap cluster.
- **Close candidate:** MAE <= 1.5%, bad-pixel-12 <= 8%, and direct reference/live inspection shows no meaningful geometry/content mismatch.
- **Needs refinement:** 1.5-3.0% or any coherent geometry hotspot.
- **Priority mismatch:** >3.0%; >5.0% is high priority unless the frame is partially system-owned.
- A web-owned frame is visually acceptance-ready only at **<=1.5% MAE**, with no important region mismatch after direct inspection.
- A flow is acceptance-ready only when every scoreable frame passes its frame gate, family mean is <=1.25%, behavior tests pass, and no required source state is merely a route hint.
- Numerical similarity never excuses wrong text, missing controls, screenshot-painted UI, broken Back/focus/scroll, or a hidden native boundary.

These thresholds can be tightened if the corpus distribution shows lower stable noise. They cannot be loosened merely to mark more flows complete.

## Native/system boundaries

Always excluded by the fixed crop: iOS status bar and Mobbin attribution/footer.

Frame-level masks are required when a frozen state contains native keyboard, file picker/camera picker, OS permission UI, or provider-owned UI. The app-owned portion above/around that boundary remains scoreable. Pure system/provider states are recorded `system-only` and are not assigned a fake pixel score.

Known families needing boundary classification while recipes are added include form-heavy checkout 24-29, account photo flow 71, account inline-edit/people flows 73-78, Gmail/provider flow 88, login/onboarding 1/94, and Minis permission/camera/microphone states 53-59. Inspect the actual frozen frame before applying a mask; do not blanket-mask a whole family.

## Execution loop

For each implementation change: capture all affected canonical states -> save before scores -> make the smallest owner-level change -> recapture -> compare runs -> keep only an aggregate win with no important sibling regression -> run the focused interaction spec -> update the parity ledger only for evidence actually obtained.

For scalar CSS parameters (size, gap, offset, radius, opacity, blur, rgba, gradient stops/positions), prefer a bounded automated sweep against the exact affected frame/family. Commit and push directly to `main` after a coherent objectively improved batch; `.qa/` artifacts remain local and disposable.
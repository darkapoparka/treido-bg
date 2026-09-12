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

`node scripts/shop-parity/run.mjs enumerate` reads `references/shop/manifest.json` and emits `.qa/shop-parity/frame-map.json` with one entry per frozen frame:

`flowNo + flowId + frameNo -> reference file -> family -> route -> queryState -> setupActions -> scrollPosition -> overlayState -> scoreability`.

Every corpus frame exists in the map immediately. A frame is `route-hint` until its exact deterministic replay is encoded in `scripts/shop-parity/recipes.mjs`; only `reproducible` frames are pixel-scored. Do not guess missing state from a neighboring route.
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
node scripts/shop-parity/run.mjs enumerate
node scripts/shop-parity/run.mjs baseline --flow 84 --frame 1 --run address-before
node scripts/shop-parity/run.mjs baseline --family account-payments --run payments-before
node scripts/shop-parity/run.mjs baseline --all --run corpus-current
node scripts/shop-parity/run.mjs compare-runs --before payments-before --after payments-after
```

Run against the owned preview with `SHOP_REFERENCE_PREVIEW=1`; current development target is `http://127.0.0.1:6412`. Each scored frame writes `reference.png`, `live.png`, `overlay.png`, `difference-heatmap.png`, plus ranked JSON/CSV/Markdown at the run root.

The scorer and replay definitions are versioned in `scripts/shop-parity/`. Only captures and reports stay in ignored `.qa/shop-parity/`. A fresh checkout reuses the same executable commands; do not recreate another scorer or substitute manual "looks close" review.

### Scorer runtime invariants

- Port **6412 must serve the live `J:\treido-bg` development source**, not an old `next start` production build. Verify the listener/process before trusting a score.
- Every route-changing replay action must wait for the target state to become visible before capture. A click completing is not proof that App Router navigation rendered.
- Focus is part of the visual state. Blur fields when the frozen frame is unfocused; do not tune CSS to compensate for browser focus rings that are absent in the source.
- Wait for `document.fonts.ready`, decoded images and two animation frames before screenshotting. Use a fresh browser context for every independently scored frame.
- If a score changes implausibly after a CSS rule that cannot affect that state, inspect the live artifact and replay recipe before accepting/rejecting the source change.

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

## Current quantitative baseline and exact resume point

Checkpoint date: 2026-09-12. The tracked runner now replays **100/424 ordered frames**: all 41 Account/Profile/People frames (69–78) plus the 59 payment/address/settings/support/sign-in frames (80–94). **10 frames are numerical candidates; 0/97 flows are owner accepted.**

Current evidence: `resume-account-candidate`, followed by `resume-profile-content-corrected` for 69 and 72, then `wallet-vector-final` and `wallet-settings-siblings` for affected wallet screens. Original comparison: `resume-profile-before`. These are local reports under `.qa/shop-parity/runs/`; the public frame ledger records their numerical outcomes.

| Family | Frames | Mean MAE % | Worst MAE % |
| --- | ---: | ---: | ---: |
| account-profile | 24 | 2.872 | 8.888 |
| account-authentication | 9 | 2.167 | 6.426 |
| account-addresses | 6 | 2.192 | 3.002 |
| account-preferences | 9 | 3.411 | 5.706 |
| account-settings | 11 | 2.663 | 5.143 |
| account-payments | 13 | 2.794 | 4.602 |
| account-people | 8 | 3.414 | 4.456 |
| account-privacy | 7 | 2.335 | 3.918 |
| account-support | 13 | 2.128 | 3.508 |

The full reference suite passed **94/94** against the owned development preview. The subsequent wallet-only batch passed all 10 focused Account/payment/settings tests plus typecheck and lint with no warnings. Genuine fixes include per-card receipt preference persistence, working nested billing-address editing with retained drafts, stock-aware saved-for-later moves, tracking edits no longer overwritten by display constants, and pickup payment state following account changes. Stale test routes/labels were corrected against inspected source frames while keeping validation, history, identity and provider-boundary assertions.

The source viewport had keyboard space reserved twice in person editing. Fixing the sheet owner improves 78/002 from **23.399 to 3.092%**, 78/003 from **26.007 to 3.239%**, and birthday 78/005 from **15.943 to 2.883%**. Public-profile layout improves 72/002 **5.333 to 1.990%** and 72/003 **4.581 to 1.147%**. These remain review evidence, not acceptance.

Replay corrections are separate from visual improvements: scenarios select the observed buyer/profile state, Skincare AI replaces the wrongly identified Homescape item, and previous product/store history remains after recently viewed Minis. Named synthetic scenarios are selected only behind the existing server preview gate; they never authorize or perform real authentication, payments, account connections or deletion.

### Resume without replanning

1. The measured decorative payment-card vector and compact wallet row typography are now implemented at their canonical owners. The repeated wallet frame improved 3.922% -> 2.216% MAE; no affected sibling regressed by more than 0.15 points. The remaining blank lower-area/dock, typography and account-form residuals remain unaccepted.
2. Expand deterministic coverage to Home 2–6/42 and Saved 7–13 using the existing scenario loader and canonical components. Do not rebuild working families or make a second scorer.
3. Continue the store/product/review/search/Minis and commerce families. All 324 unmapped ordered frames remain explicitly open.

Scorer invariants: fresh named scenario context for each checkpoint; wait for `data-shop-interactive=true`; reduced native-keyboard viewports may be padded only inside the explicitly excluded keyboard rectangle. App-owned pixels are never resized, and provider outcomes remain explicit captured-state previews.

## Priority order

Work by shared owner and measured error using the current resume actions above. Map the next complete family while retaining already verified behavior. No flow is accepted on the basis of route existence, a test pass or a low average alone.

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
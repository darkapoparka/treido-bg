# Single-session Shop parity execution

## Current owner mode: GitHub only

Updated 2026-09-12 from the owner's explicit takeover instructions. This section supersedes historical Windows-checkout and parallel-lane instructions elsewhere in the repository.

- Repository: `darkapoparka/treido-bg`; branch: **main only**.
- Read and change source through GitHub tools. Preserve current parent and file SHAs; never force-update main.
- Execute installation, formatting, lint, typecheck, builds, tests, browsers and comparison scripts in non-deploying GitHub Actions checkouts of the exact evaluated commit.
- No Remote Desktop Commander, user computer, J: or M: checkout, separate local source checkout, worktrees, feature branches, pull requests or parallel writers.
- Downloaded Actions evidence may be inspected. This does not authorize a separate local source checkout or local app execution.
- No deployment, paid infrastructure, production data, live payments, secrets or external account operations.
- All Shop frontend families across Tasks 3/5/6 remain in scope. Do not begin Treido branding, merchant/admin, backend or Expo work.

## Resume from committed code, not an interrupted response

Read current `main` first. The interrupted response did not reset the repository: the resumed session found `1f9cc493a978f3aee8a70bddf93294b333283dce`, 29 commits after the old `e4b90b7` handoff. The storefront implementation, 27 storefront replay frames, Saved fixes, product gallery work and verified-media cache already existed and were preserved.

The latest application/test checkpoint recorded here is **`a1bbc4682245cc2cfb672a406525cf399b9ec996`**. This is a historical pointer, never a reset target. Subsequent documentation or implementation commits must be preserved.

`shop-implementation-map.md` owns the most recent exact-commit results, residuals and next execution step. Read its current checkpoint rather than treating the older snapshots below as the latest test result. `shop-frame-ledger.md` is the frame ledger; `shop-parity-checklist.md` owns the 97-flow acceptance record. Reuse the existing manifest, recipes, runner and ledger generator.

## Source work committed in the resumed session

- **`ad09fc0`**: `components.tsx` now registers/adopts a Sheet history entry synchronously, before `showModal()`. The former timer exposed an interactive dialog without its Back entry. Deferred retirement, nested Sheets, query restoration and focus/body-lock cleanup are preserved.
- **`9c63cf9` / `dadc9b7`**: regression test observes the history marker at the instant `showModal()` executes, repeats immediate Back three times and verifies nested Back, focus and body locks. The first test revision incorrectly queried its inert parent through the accessibility tree after opening the child; the second reads the parent marker beforehand without weakening the assertions.
- **`62bccf5` / `a1bbc46`**: measured storefront action spacing, Filter rows/chevrons/equal-width actions, search suggestion prices/cancel weight and information-category row spacing. Image comparison found that applying the white suggestion canvas to results worsened `f040-004`; the latter commit restricts it to `store-search-editing`.
- **`ad5c9c5` / `701e4d8`**: distinct Shea and Shampoo Bar Bag description-preview paragraphs and captured excerpts, with one real Read more control and unchanged full descriptions. The global unlayered paragraph reset defeated the first Bag spacing utility; the correction owns the 16px separation in the component instead of weakening the CSS assertion or changing the global reset.
- **`57ca1fe`**: two product-description journey tests verify both products, 320/393/430 containment, complete descriptions, nonzero scroll, exact focus/scroll return and Back/Escape dismissal.
- **`c4584c8`**: `recipes-product.mjs` contains twenty proposed checkpoints for flows 18–20, 32, 37–38. **It is not registered in the active runner; it does not add executable or captured coverage.** See the precise denied operation below.

## Verified checkpoints and current evidence boundaries

Run **34706244853**, commit `1f9cc493a978f3aee8a70bddf93294b333283dce`, artifact **10302485378**:

- Web lint/typecheck, non-deploying production web build, frozen references, cached product re-verification and 79/79 selected captures passed.
- 60 interaction tests passed; repeated-query Filter followed by immediate Back navigated to `about:blank`.
- The previously documented nested Billing, Saved accessible-name and More ideas defects passed their existing tests in this newer checkpoint. Do not keep reporting the old four-test failure list as current.

Run **34707281518**, commit `c4584c8883e55da1c0a2313a1add87b41232c8c0`, artifact **10302735629**:

- Web build/checks, references/media and 79 captures passed. The original immediate-Back failure passed.
- 61 tests passed; only the first revision of the new inert-parent test setup failed. That setup was subsequently corrected at `dadc9b7`.

Run **34708071703**, commit `57ca1fe56bad530c49aadce007d8168435d1cbcf`, artifact **10302677503**:

- Web build/checks, references/media and 79 captures passed.
- 63 tests passed; the new Bag description test correctly failed its expected 16px paragraph separation, receiving 0px. The immediate-Back and corrected nested regression tests passed.
- Seven selected storefront frames improved numerically. `f040-004` worsened by 0.341 MAE points after the overly broad white search canvas. Actual pairs were inspected; neither the failure nor the regression was hidden.
- `701e4d8` and `a1bbc46` correct those two findings. Their verification is run **34708556877** on `a1bbc4682245cc2cfb672a406525cf399b9ec996`; consult the newer checkpoint in `shop-implementation-map.md` for its actual outcome, not a prediction here.

The inspected frame maps contain **175 reproducible definitions and 249 route hints / 424 frames**. This is not 175 completed screens. The 20 unregistered product definitions are excluded. The selected capture scope is **2–16, 40–42, 84, 96–97**, totaling 79 frames. Only `f005-004` and `f006-002` were numerical candidates in the inspected completed runs; no owner acceptance was earned.

The existing Actions generator regenerates all 424 frame rows into the artifact's `frame-ledger.md`. The checked-in ledger still predates these newer captures; use the exact-commit artifact rather than treating its old counter as lost work. Preserve historical/unmeasured rows when incorporating a generated ledger.

Product preparation now restores a previously verified set and rechecks exact bytes against provenance. The four products rejected in the old `b12796d` run passed these newer checks. A verified cache hit is not proof that a fresh upstream download is stable; never repin or serve a known mismatch just to pass CI.

Foundation run **34707754958** on `62bccf5` passed lint but failed Prettier on 28 files, including newly changed files as well as older work. Later foundation stages were skipped. This is separate from the passing production web build in the Shop workflow. Keep formatting and full foundation verification open until actually fixed and rerun.

## One precise denied operation, not a general GitHub write failure

During this resumed session, a normal `GitHub.update_file` request for **`scripts/shop-parity/recipes.mjs`**, intended to import/register `productRecipes`, was rejected by the connector's safety check before any commit. That registry remains unchanged. Do not route this denied mutation through another interface, import hub, workflow injection or the owner's PC. Do not count the orphan module as active replay coverage.

The shared `components.tsx` write and the other source/test writes succeeded through their normal GitHub operations. The old assertion that no shared-dialog fix is committed is obsolete. A specific denied write is not evidence that repository writes or frontend implementation are generally unavailable.

## Continue without restarting or narrowing the assignment

Continue the product/gallery/save/cart/description/contact/report family from the existing owners and inspected source, while preserving the registered storefront work. Flow 17 still includes a distinct apparel product; do not substitute Shea for it. Flow 32 explicitly switches from a Bag preview to Shea's full ingredients; do not manufacture continuity by assigning those ingredients to the Bag. The inspected flow-20 recording shows an added-item intermediate state and motion before the offer, which the immediate-offer implementation does not yet reproduce.

Storefront residuals include native typography/icon metrics, about 8px of Filter underlay scroll alignment, product photograph treatment, incomplete search-result sample rows, the returning Kitsch hero, Chemical Guys inventory/artwork and genuine video playback. Do not approve these just because controls work or a score improves. Search/assistant, Explore/Minis, reviews, checkout, orders, onboarding and widgets remain obligations too.

Use `.github/workflows/shop-parity.yml` and `scripts/shop-parity/run.mjs` for complete related-family batches. Wait for fonts/images/interactive state; compare at 393×793, inspect actual pairs and relevant 320/430 containment, commit real improvements, and retain exact-commit evidence. Keep MAE ≤ 1.5%, bad-pixel-12 ≤ 8% and the 0.15-point regression investigation rule. Do not introduce another scoring framework, automatic baseline approval or screenshot-painted UI.

## Historical evidence retained

- `77efe3e` / run 34677545900 / artifact 10292614218: Saved implementation, 52 captures, 46 passed/4 failed interactions at that historical commit.
- `b12796d` / run 34678202940 / artifact 10292814536: product checksum failures; browser work skipped, not passed.
- Foundation run 34677545892: historical formatting failure before build/smoke.
- `0f92453`, `f78ef18`, `4c9e902`, `782d507`: earlier commerce, Account/Profile, Home/Following and quantitative integration checkpoints. Preserve their implementations; never reset main to them.

Historical parallel documents and PC-only reports are evidence, not current execution instructions or proof of current-main results.

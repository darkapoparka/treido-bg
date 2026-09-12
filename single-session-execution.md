# Single-session Shop parity execution

Owner mode as of 2026-09-11: **one writer, one checkout, one branch**.

- Repo: `J:\treido-bg`
- Branch: `main`
- Remote: `https://github.com/darkapoparka/treido-bg.git`
- No feature branches. No worktrees. No parallel writer lanes.
- Never use `M:\treido-bg` or `treidotyj` for this project.
- `shop-parity-checklist.md` remains the 97-flow acceptance ledger.

## Why this replaces parallel mode

The three-lane experiment created coordination overhead, stale locks and partially finished families. The useful code has been consolidated onto local `main`; future work is sequential so one session owns source inspection, implementation, browser QA, tests, checklist updates, commits and pushes end to end.

`parallel-execution.md`, `parallel-prompts.md` and `docs/parity/lane-*.md` are historical handoff evidence only. Do not create or honor lane locks for new work.

## Consolidated implementation checkpoints

- `0f92453` — commerce/cart/checkout/order continuation, including focused parity specs.
- `f78ef18` — Account/Profile/People parity continuation for flows 69–78.
- `4c9e902` — Home Deals/Notifications/Following continuation for flows 2–6 family.
- `782d507` — quantified Account payment/address parity checkpoint for flows 80–84, including `shop-implementation-map.md` and focused parity coverage.

These are implementation checkpoints, **not automatic 1:1 acceptance**. Preserve them; fix forward rather than reverting them wholesale. The quantitative scorer and current resume state in `shop-implementation-map.md` override older prose when choosing the next visual fix.
## Fast execution loop

Work in coherent families of roughly 5–10 flows. Do **not** stop after every screenshot and do not rerun the full repository suite after every small change.

1. Verify `J:\treido-bg`, `main`, remote, HEAD and `git status`.
2. Fetch `origin`; never reset/rebase away local work.
3. Open every ordered frozen frame for the family once and make a compact mismatch list.
4. Run/reuse the dev preview on `127.0.0.1:6412` with `SHOP_REFERENCE_PREVIEW=1`.
5. Fix the canonical components/state owners in one pass.
6. Drive the complete family at 393×793; check Back/focus/scroll/sheets and only the relevant 320/430 containment states.
7. Add or extend **one focused family Playwright spec**, not a test file per frame.
8. Run web typecheck, web lint, the focused family spec and `git diff --check`.
9. Update the checklist for evidence actually obtained.
10. Commit directly to `main`, fetch again, then push if clean and fast-forward safe.

Run the broad reference suite only after several families, before a major handoff, or when shared navigation/state was changed. A family should take one implementation/QA cycle, not dozens of micro-cycles.

## Immediate queue

The shared behavior pass is green: 94/94 reference tests. Deterministic coverage is now 100/424 frames (69–78 and 80–94). Read the **current quantitative baseline and exact resume point** in `shop-implementation-map.md`; do not repeat the completed sticky-header, hydration-readiness or person-keyboard fixes.

Finish the current shared decorative-card/Profile residuals, then extend Home 2–6/42 and Saved 7–13, then store/product/review, search/Minis and commerce coverage. Reuse the tracked runner, named gated scenarios, and canonical UI; preserve the existing functional implementations.

Do not start Task 7 / Treido branding until Shop parity is complete or the owner approves named exceptions.

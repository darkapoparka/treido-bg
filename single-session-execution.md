# Single-session execution

Use the checkout, two-branch limit and one-writer policy in [AGENTS.md](AGENTS.md). [Codex setup](docs/agents/codex.md) owns synchronization; this file owns only the Shop implementation and reference loop.

## Resume, do not restart

Read [AGENTS.md](AGENTS.md), [current status](docs/STATUS.md), the owning [task](tasks.md), and [the implementation map](shop-implementation-map.md). Inspect actual source and git state. Load only the relevant source family and skill, not all archived docs. Do not create another parity pipeline or recount routes as completed screens.

The active queue spans the Shop frontend parts of Tasks 3/5/6. Start from the current recipes and reproduce the relevant outstanding issue. Finish complete related families, including connected interactions, before moving onward. Keep the rest of the frozen corpus in scope; avoid polishing one card indefinitely while leaving other states unmapped.

## Existing local reference loop

Confirm the repository, branch, pinned runtime, ignored local assets and listener ownership. Review `.github/workflows/shop-parity.yml` and `playwright.reference.config.ts` for the existing harness. The documented local parity preview uses these explicit environment values in the SAME terminal that starts the server:

```powershell
$env:SHOP_REFERENCE_PREVIEW = '1'
$env:VERCEL_ENV = 'preview'
$env:SHOP_PARITY_BASE_URL = 'http://127.0.0.1:6412'
$env:PLAYWRIGHT_CHANNEL = 'chrome'
node prepare-shop-reference.mjs --verify
pnpm --filter @treido/web exec next dev --hostname 127.0.0.1 --port 6412
```

Use the installed browser channel actually available. `--verify` checks the existing allowlisted media; a failure requires provenance-aware preparation/review, not new expected hashes. Starting this opt-in preview does not authorize any real provider action. Do not reuse an unidentified listener or take over another project's server.

In a second terminal with the same runtime and base-URL/browser environment, use the existing commands with the selected family and an honest run identifier:

```sh
node scripts/shop-parity/run.mjs enumerate
node scripts/shop-parity/run.mjs baseline --all --flows 14-16,40-41,96-97 --run YOUR_RUN_ID
node scripts/shop-parity/run.mjs compare-runs --before BEFORE_RUN --after AFTER_RUN
```

Run the relevant existing Playwright specs with the reference config. To use the confirmed preview already serving 6412, set `$env:REFERENCE_BASE_URL='http://127.0.0.1:6412'`; the harness validates loopback HTTP and does not start a second server. If using its separate development-server path instead, unset that override and use `REFERENCE_DEV=1`, which owns port 3103. Stop only the confirmed owned 6412 runtime before the separate harness uses the same `.next` directory, then restart the capture preview if needed. The default path without either override requires an existing production build. Do not mistake that default for the running dev preview.

`scripts/shop-parity/ledger.mjs` takes the recorded run ID as its positional argument when regenerating the dated ledger from real evidence. Do not regenerate acceptance from mere source definitions.

## Decide and act

Inspect ordered source and live pairs; fix the canonical owner. Exercise actual Back/Forward, overlays, keyboard, focus, scrolling and state persistence. Wait for the target UI state, fonts and decoded images. Verify related sibling states and relevant 320/430 widths before keeping a shared change.

Treat current access/permission failures precisely. Historical failures are dated evidence, not permanent claims that a tool or file is unavailable. Verify current permitted access without evading an actual denial. An unavailable computer is not proof that GitHub access is unavailable.

## Close a coherent batch

Run scoped checks, preserve original assertions and diagnostic thresholds, record exact source/run/evidence and update the owning task/flow records. Follow the root commit/synchronization contract and leave unrelated work untouched. Update the current resume note rather than appending another contradictory queue.

The browser/source gate is not payment, native or production acceptance. Missing proof is reported as not run or unresolved. Continue the next useful related work within the current request; do not ask the owner to approve routine component edits.

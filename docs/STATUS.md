# Current project status

Updated 2026-09-12. This is the session entry point, not a second backlog.

## Working context

Use `J:\treido-bg` and `darkapoparka/treido-bg`, canonical **main**, with only **main** and optional **astra-pro** retained locally and on origin. Reviewed source `fc7d58b9699c64692ce4870601bf7e19ef07bee5` includes both original branch histories and the later main changes through `41445f9`; merge `11ecfa3` reconciles the overlapping paragraph, history-test and checkpoint changes. The fully merged local `codex/task-1-foundation` branch was deleted with normal `git branch -d`. There is one existing checkout and no stash. [AGENTS.md](../AGENTS.md) and [Codex setup](agents/codex.md) own the policy and synchronization procedure.

The active work remains the Shop **mobile-web** portions of Tasks 3/5/6. Finish and approve the frozen UI/flows, then adapt the same implementation to producers, food shelves, storefronts and seller operations under [product.md](../product.md) and [web.md](../web.md). Source integration does not start food branding, backend, native, merchant/admin or release work.

## Local setup evidence

The current desktop session exposes all nine repository skills under `J:\treido-bg\.agents\skills\`: `gh-fix-ci`, `openai-docs`, `security-best-practices`, `security-threat-model`, `treido-shop-parity`, `treido-food-commerce`, `treido-merchant-cms`, `treido-ai-quality`, `treido-session`. This was verified against the session's actual skill catalogue, not inferred from filesystem checks. No global copies were installed.

The exposed `openaiDeveloperDocs` MCP completed a documentation search and fetched the official skills, AGENTS.md, MCP and Astra instruction-following pages. No desktop connection approval or restart was required. Standalone `codex-cli 0.116.0` could not run `codex mcp list`: its config parser rejects the account's `max` reasoning value. That separate CLI compatibility issue does not invalidate the desktop request; global settings were preserved.

Selected runtime: Node **24.20.0**, pnpm **12.3.4**, Python **3.13.1** through `py -3`. Node was already installed and selected with a session-local PATH; the global default was 24.21.0. Both required checks passed on the integrated sources and final evidence update: `node scripts/check-agent-docs.mjs` (42 docs, 214 links, nine skills, 14 tasks, 34 requirement IDs, 12 intact snapshots) and `py -3 scripts/agent-skills.py --verify` (four pinned skills / 34 original files). Skill Creator validated the narrowly revised `treido-session`; its representative use reconciled the newly arrived main commits and the current evidence. No prerequisites needed installation.

## Current implementation checkpoint

[shop-implementation-map.md](../shop-implementation-map.md) records the current product family. Commit `fe14af0` registers the existing **20 checkpoints in flows 18-20, 32, 37 and 38**, adds them to the existing CI capture selection and includes product interaction tests. Enumeration now reports **195 registered definitions / 424 ordered frames**. All 20 ordered source stills were inspected; no captured frame or source acceptance is inferred from registration.

The 29 inherited Prettier failures are fixed with the pinned formatter; provenance values and hashes are unchanged. On `fc7d58b`, [Foundation run 34709677151](https://github.com/darkapoparka/treido-bg/actions/runs/34709677151) passes lint, formatting, types, **14 unit tests**, the production web build and **one web smoke test**. Its final native compatibility check fails because Expo currently recommends four newer patches (`expo` 57.0.22, constants 57.0.18, linking 57.0.10, router 57.0.21). Repository pins are preserved; doctor and native exports did not run. This is not an all-green foundation or native qualification. [Docs CI 34709522605](https://github.com/darkapoparka/treido-bg/actions/runs/34709522605) passed on `11ecfa3`; local docs/upstream verification also passed after the cache-only `fc7d58b` change.

[Parity run 34709677111](https://github.com/darkapoparka/treido-bg/actions/runs/34709677111) on clean source `fc7d58b` captures **99/99 selected frames**, including **20/20 product checkpoints**, with no recorded browser errors, and passes **68/68 interactions** with no skipped or flaky tests. These include the existing 320/393/430 description checks and Back/Escape focus/scroll restoration. The bag's 16px paragraph gap, 16px/20px description heading and 4px heading gap are verified; the report recipe now selects the exact Shea card in All products instead of matching both shelves.

All 20 product source/live pairs were inspected. Compared with the prior `cd4f8fc` run (98 captures, 67 interactions passing), the bag preview MAE improves **6.402% -> 6.127%**, its settled cart state **6.964% -> 5.750%**, and the Shea description sheet **6.788% -> 6.489%**. Across 98 comparable frames, the largest increase is **0.0051 percentage points**. The numerical gate still fails: only **4/99** frames are candidates; no owner acceptance was granted. [The regenerated ledger](../shop-frame-ledger.md) retains all 424 frame identities and unmeasured obligations. The implementation map records remaining visual/transition differences and local evidence paths.

Local browser verification is blocked by the unresponsive Next server on port 6412, PID **16240**. Next's own diagnostic confirmed `J:\treido-bg\apps\web`; its log contains `EPIPE`, and Windows denied the targeted stop. The 45-second browser navigation timed out. A temporary preview also refused the existing server lock and exited; no competing server or persistent config change was kept. The owner must stop the old process from its owning terminal or elevated Task Manager before the normal local runner can start.

Git staging also encountered a full `J:` drive. Only this task's two downloaded CI run directories were relocated to its `C:` artifact folder (`treido-shop-evidence`); all **795 files** were SHA-256 verified before removing the duplicate copies. Their existing `.qa/shop-parity/runs/ci-...` paths remain usable through verified directory junctions. Source, Git, frozen reference originals and the active preview cache were preserved. Free space measured 530.7 MiB afterward; check capacity again before starting a local build.

Current local media verification rejects `store-hero`, `shower-caddy` and `rice-shampoo`. Fresh allowlisted downloads of the last two reproduced the rejected hashes; none was promoted and all expected hashes remain unchanged. CI's `11ecfa3` run missed the cache after formatting changed its key and correctly rejected four newly downloaded candidates. Reviewed `fc7d58b` restores an earlier cache candidate and passes the unchanged preparation/checksum/dimension verification before capture. Keep these local-versus-CI prerequisites distinct; local rejected candidates remain ignored/private.

[The flow checklist](../shop-parity-checklist.md) owns acceptance and [the frame ledger](../shop-frame-ledger.md) owns dated measurements. Definitions are not replays, comparisons are not owner approval, and fixture UI does not prove real commerce. No new source approval or production qualification is recorded.

Shopify reference acquisition remains unresolved: the 2026-09-12 connector reported a paid-plan requirement and the ordinary browser showed unauthenticated marketing content. [Its source record](../shopify/README.md) retains unknown totals and no acquired assets.

## Next action

Continue **flow 20's ordered add-to-cart transition** from its existing 11.0167-second recording: implement the product flight, temporary Added to cart state and offer timing in the canonical product owner, then compare the complete sequence and rerun the existing family/sibling interactions. Keep its control/review styling differences visible. Local execution first needs the confirmed old process stopped and rejected assets repaired from verified provenance; the existing non-deploying CI runner remains usable. Do not start food adaptation before source approval.

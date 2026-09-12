# Current project status

Updated 2026-09-12. This is the session entry point, not a second backlog.

## Working context

Use `J:\treido-bg` and `darkapoparka/treido-bg`. The checkout is now on canonical **main**, with only **main** and optional **astra-pro** retained. Integration source `cd4f8fcffd89bfc4ed1a5e117f5454358505e25c` preserves `main` through `57ca1fe` and `astra-pro` setup through `758f11c`; both parent histories remain intact. The fully merged local `codex/task-1-foundation` branch was deleted with normal `git branch -d`. There is one existing checkout and no stash. [AGENTS.md](../AGENTS.md) and [Codex setup](agents/codex.md) own the policy and synchronization procedure.

The active work remains the Shop **mobile-web** portions of Tasks 3/5/6. Finish and approve the frozen UI/flows, then adapt the same implementation to producers, food shelves, storefronts and seller operations under [product.md](../product.md) and [web.md](../web.md). Source integration does not start food branding, backend, native, merchant/admin or release work.

## Local setup evidence

The current desktop session exposes all nine repository skills under `J:\treido-bg\.agents\skills\`: `gh-fix-ci`, `openai-docs`, `security-best-practices`, `security-threat-model`, `treido-shop-parity`, `treido-food-commerce`, `treido-merchant-cms`, `treido-ai-quality`, `treido-session`. This was verified against the session's actual skill catalogue, not inferred from filesystem checks. No global copies were installed.

The exposed `openaiDeveloperDocs` MCP completed a documentation search and fetched the official skills, AGENTS.md, MCP and Astra instruction-following pages. No desktop connection approval or restart was required. Standalone `codex-cli 0.116.0` could not run `codex mcp list`: its config parser rejects the account's `max` reasoning value. That separate CLI compatibility issue does not invalidate the desktop request; global settings were preserved.

Selected runtime: Node **24.20.0**, pnpm **12.3.4**, Python **3.13.1** through `py -3`. Node was already installed and selected with a session-local PATH; the global default was 24.21.0. Both required checks passed on the integrated sources: `node scripts/check-agent-docs.mjs` (42 docs, 212 links, nine skills, 14 tasks, 34 requirement IDs, 12 intact snapshots) and `py -3 scripts/agent-skills.py --verify` (four pinned skills / 34 original files). Skill Creator validated the narrowly revised `treido-session`; its representative use reconciled the newly arrived main commits and the current evidence. No prerequisites needed installation.

## Current implementation checkpoint

[shop-implementation-map.md](../shop-implementation-map.md) records the current product family. Commit `fe14af0` registers the existing **20 checkpoints in flows 18-20, 32, 37 and 38**, adds them to the existing CI capture selection and includes product interaction tests. Enumeration now reports **195 registered definitions / 424 ordered frames**. All 20 ordered source stills were inspected; no captured frame or source acceptance is inferred from registration.

Local web lint passed on `f238d46`; TypeScript (`pnpm --filter @treido/web exec tsc --noEmit --incremental false`) and all four workspace tests passed on `cd4f8fc`. The non-deploying [parity run 34708336898](https://github.com/darkapoparka/treido-bg/actions/runs/34708336898) evaluates that exact integrated source. [Docs CI 34708336879](https://github.com/darkapoparka/treido-bg/actions/runs/34708336879) passed. [Foundation run 34708336893](https://github.com/darkapoparka/treido-bg/actions/runs/34708336893) passed all three package lint tasks but stopped at Prettier with 29 inherited formatting failures; its later checks did not run.

That parity run captured **98/99 selected frames**, including **19/20 product frames**, and passed **67/68 interactions**. Source/live review found the description heading/paragraph spacing mismatch. The report replay failed because the same reported product appears in two shelves. The follow-up scopes that replay to the exact Shea product in All products, gives the bag its captured 16px paragraph gap and aligns the description heading's 16px/20px type and 4px gap. The original 16px assertion and all comparison thresholds remain intact. The 29 flagged files also receive the pinned formatter, with provenance values/hashes verified unchanged. Follow-up browser evidence is required before calling these fixes verified.

Local browser verification is blocked by the unresponsive Next server on port 6412, PID **16240**. Next's own diagnostic confirmed `J:\treido-bg\apps\web`; its log contains `EPIPE`, and Windows denied the targeted stop. The 45-second browser navigation timed out. A temporary preview also refused the existing server lock and exited; no competing server or persistent config change was kept. The owner must stop the old process from its owning terminal or elevated Task Manager before the normal local runner can start.

Current local media verification rejects `store-hero`, `shower-caddy` and `rice-shampoo`. Fresh allowlisted downloads of the last two reproduced the rejected hashes; none was promoted and all expected hashes remain unchanged. CI independently restored and verified its cached originals. Keep these local-versus-CI prerequisites distinct; local rejected candidates remain ignored/private.

[The flow checklist](../shop-parity-checklist.md) owns acceptance and [the frame ledger](../shop-frame-ledger.md) owns dated measurements. Definitions are not replays, comparisons are not owner approval, and fixture UI does not prove real commerce. No new source approval or production qualification is recorded.

Shopify reference acquisition remains unresolved: the 2026-09-12 connector reported a paid-plan requirement and the ordinary browser showed unauthenticated marketing content. [Its source record](../shopify/README.md) retains unknown totals and no acquired assets.

## Session close

Replace the current checkpoint with task/family, exact source commit, changed behavior, actual checks, evidence paths, unresolved issues and one next action. Keep commercial approvals in their decision register and historical reports under history; do not append competing handoffs here.

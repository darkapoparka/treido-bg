# Current project status

Updated 2026-09-12. This is the session entry point, not a second backlog.

## Working context

Use `J:\treido-bg` and `darkapoparka/treido-bg`. The owner now authorizes consolidation onto canonical **main**, retaining only **main** and optional **astra-pro** with one writer. The integration preserves `main` application commit `c4584c8` and `astra-pro` setup commit `758f11c`; the existing foundation branch has no unique commits. [AGENTS.md](../AGENTS.md) and [Codex setup](agents/codex.md) own the policy and synchronization procedure.

The active work remains the Shop **mobile-web** portions of Tasks 3/5/6. Finish and approve the frozen UI/flows, then adapt the same implementation to producers, food shelves, storefronts and seller operations under [product.md](../product.md) and [web.md](../web.md). Source integration does not start food branding, backend, native, merchant/admin or release work.

## Local setup evidence

The current desktop session exposes all nine repository skills under `J:\treido-bg\.agents\skills\`: `gh-fix-ci`, `openai-docs`, `security-best-practices`, `security-threat-model`, `treido-shop-parity`, `treido-food-commerce`, `treido-merchant-cms`, `treido-ai-quality`, `treido-session`. This was verified against the session's actual skill catalogue, not inferred from filesystem checks. No global copies were installed.

The exposed `openaiDeveloperDocs` MCP completed a documentation search and fetched the official skills, AGENTS.md, MCP and Astra instruction-following pages. No desktop connection approval or restart was required. Standalone `codex-cli 0.116.0` could not run `codex mcp list`: its config parser rejects the account's `max` reasoning value. That separate CLI compatibility issue does not invalidate the desktop request; global settings were preserved.

Selected runtime: Node **24.20.0**, pnpm **12.3.4**, Python **3.13.1** through `py -3`. Node was already installed and selected with a session-local PATH; the global default was 24.21.0. Both required checks passed on the synchronized sources: `node scripts/check-agent-docs.mjs` and `py -3 scripts/agent-skills.py --verify`. Edited docs receive the same checks before the integration commit. No prerequisites needed installation.

## Current implementation checkpoint

[shop-implementation-map.md](../shop-implementation-map.md) records the source investigation and next family. Enumeration still reports 175 registered definitions because the 20 product checkpoints added on `main` have not been connected to the registry. Resume flows **18-20, 32, 37 and 38** using their existing recipes and canonical product components; inspect source frames, register, replay, and verify interactions before claiming progress.

Current local media verification rejects `store-hero`, `shower-caddy` and `rice-shampoo` against their existing hashes. Keep the failed candidates private and expected hashes unchanged. Record any affected capture limitations explicitly; earlier asset/interaction failures remain dated evidence in the archive, not an asserted current baseline.

[The flow checklist](../shop-parity-checklist.md) owns acceptance and [the frame ledger](../shop-frame-ledger.md) owns dated measurements. Definitions are not replays, comparisons are not owner approval, and fixture UI does not prove real commerce. No new source approval or production qualification is recorded.

Shopify reference acquisition remains unresolved: the 2026-09-12 connector reported a paid-plan requirement and the ordinary browser showed unauthenticated marketing content. [Its source record](../shopify/README.md) retains unknown totals and no acquired assets.

## Session close

Replace the current checkpoint with task/family, exact source commit, changed behavior, actual checks, evidence paths, unresolved issues and one next action. Keep commercial approvals in their decision register and historical reports under history; do not append competing handoffs here.

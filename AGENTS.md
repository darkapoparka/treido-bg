# Treido agent contract

## Start here

Treido connects buyers with food manufacturers, farmers, growers and other eligible food producers. The destination is a producer-first food marketplace: the homepage presents manufacturers with their own product shelves, buyers visit their stores and buy food, and sellers manage their businesses through an operating workspace and storefront CMS. It is not a general-product marketplace or a security-tooling project. The product is not production-qualified.

First reconstruct the frozen Shop buyer UI and complete flows; after source approval, adapt the SAME implementation to Treido. Shop brands, cosmetics and other general-shopping products are comparison fixtures, not the final catalog. Seller CMS and platform administration are separate workspaces, not buyer screens.

Current owner instruction, 2026-09-12: use **darkapoparka/treido-bg**, canonical branch **main**, and the existing local checkout `J:\treido-bg`. Keep at most two branches, `main` and the existing optional integration branch `astra-pro`, locally and on origin. Use one writer; do not create another branch, worktree or checkout. GitHub editing and non-deploying Actions are allowed. Integrate reviewed work into `main` with both histories preserved; a merge is not deployment. See [the synchronization procedure](docs/agents/codex.md#synchronize-the-existing-checkout). Never reset, clean, force-push, silently stash, or touch `treido-next`.

The user's current instructions take precedence over skill guidelines. Resolve routine choices within the authorized task. If a skill actually requires pausing, identify its exact file and instruction instead of silently treating a guideline as a new approval requirement.

At the start of each new session, read [product.md](product.md) and [docs/STATUS.md](docs/STATUS.md), then the requested section of [tasks.md](tasks.md) and its relevant owner below. Do not reload these unchanged files every turn. Inspect actual source, Git status and available tools. Do not reread the whole documentation library, reinstall the stack or restart the project. `Continue` resumes the current checkpoint; `Execute Task N` selects the existing numbered task. Make routine implementation decisions and execute a coherent batch. Ask only when missing authorization or a material product decision truly blocks that action; continue independent work.

## Find the owner

| Work | Read when relevant |
| --- | --- |
| Product scope and phase boundaries | [product.md](product.md), [docs/product/decisions.md](docs/product/decisions.md) |
| Buyer website and manufacturer-first homepage | [web.md](web.md), [apps/web/AGENTS.md](apps/web/AGENTS.md) |
| Native buyer app | [native.md](native.md), [apps/mobile/AGENTS.md](apps/mobile/AGENTS.md) |
| Seller workspace and store CMS | [app.md](app.md) |
| Platform operators | [admin.md](admin.md) |
| Shop reconstruction | [design.md](design.md), [single-session-execution.md](single-session-execution.md), [shop-implementation-map.md](shop-implementation-map.md) |
| Styling and later food adaptation | [style-guide.md](style-guide.md) |
| Data, identity, money and permissions | [architecture.md](architecture.md), relevant detailed requirement |
| AI product behavior | [ai.md](ai.md) |
| Commands and proof | [techstack.md](techstack.md), [verification.md](verification.md) |
| Codex, OpenAI guidance or reusable workflows | [docs/agents/codex.md](docs/agents/codex.md), [docs/agents/skills.md](docs/agents/skills.md) |

Nested instructions apply within their subtree. Docs in `docs/history/` are dated evidence, NEVER current execution policy. `tasks.md` owns the product queue; the existing Shop manifest, frame ledger and flow checklist own parity evidence. Do not invent another progress counter or competing backlog.

When changing documentation, follow the retirement rules in [docs/README.md](docs/README.md): consolidate unique requirements into their current owner, update references, and delete obsolete active guides instead of leaving competing copies. Do not delete all Markdown, historical evidence, source ledgers, generated framework instructions or upstream licenses. A product-doc update must explain what users can do and what acceptance proves, not merely add more warnings or skills.

## Build and verify

Keep one canonical component per visual role per platform. Implement complete connected states and actions, not screenshot backgrounds or inert controls. During Shop parity, preserve reference styling/content and named platform exceptions; do not rebrand early. The current push is mobile-width **web**, not permission to begin native, backend or merchant implementation.

Use installed-version framework documentation and existing scripts. For Next.js, read relevant `apps/web/node_modules/next/dist/docs/` guidance; the generated nested instructions remain intact. Load only task-relevant skills. Upstream examples do not authorize global installation, permission changes, deployment or branch changes; resolve bundled scripts from the skill's actual path. Prefer the existing Playwright reference runner over installing a second browser pipeline.

Implement a meaningful related batch, then run risk-proportionate checks. Docs-only work gets documentation checks, not the full application suite. Shared UI changes include sibling regression; money, stock and authorization changes need focused real-behavior tests before completion. Never weaken assertions, masks, asset hashes or baselines to manufacture green results. Visual comparison, interaction tests, production services and owner acceptance are distinct evidence.

## Safe boundaries

The repository is public. Never commit credentials, session state, personal/customer data, signed downloads, restricted reference exports or font collections. Existing reference files are inherited evidence, not blanket publication permission for new assets. Use ignored local/private storage for new Mobbin exports until rights are established. A connector/access denial is not permission to bypass that boundary through another tool.

One server owns commerce and resource authorization. Client totals, workspace IDs and AI output are untrusted. No secrets or ORM/server modules in native/shared client contracts. Missing providers must not become fake success. Core commerce must work without AI or Premium.

Verify the exact authorized non-production target before external writes. No production data transfer, paid provisioning, live money, account activation, DNS, deployment or app-store submission without specific authorization. Never kill an unidentified process; avoid dev/build collisions in the same output directory.

## Finish the batch

Update the owning task/checkpoint with changed behavior, exact source/evidence, checks actually run, failures or not-run checks, and the next concrete action. Keep summaries short and replace stale current-state prose rather than append endless competing handoffs. Explicitly stage reviewed files and commit on the current authorized branch; finish integrations on `main`. Fetch and push only when fast-forward safe. Report the actual commit and evidence, not a claim that the whole platform is finished.

# Treido

**Food manufacturers, a better buying experience, and a real operating system for sellers.**

Treido is being built as a Bulgaria-first, Bulgarian/English marketplace connecting buyers with food manufacturers and producers. The long-term product combines a buyer website, native buyer app, seller operations and storefront CMS, platform administration, and permissioned AI assistance.

The immediate work is faithful reconstruction of the frozen **Shop buyer UI and complete flows**. Once accepted, the same components are adapted to Treido's food-specific product model and identity. Shopify web is a reference for seller workflows, not a backend we have downloaded or implemented. This repository is prelaunch and not production-qualified.

## Start a development session

Read [AGENTS.md](AGENTS.md), [product.md](product.md), [current status](docs/STATUS.md), and the selected [numbered task](tasks.md). Use the existing `J:\treido-bg` checkout and canonical `main` branch. The only optional second branch is the existing `astra-pro`; use one writer. [Codex setup](docs/agents/codex.md) owns safe synchronization and verification.

```sh
git status --short --branch
git remote -v
node --version
pnpm --version
```

Use the pinned runtime and [setup commands](techstack.md). Install only when needed, with the frozen lockfile. Start only the selected app after checking existing listeners. Do not deploy, migrate databases or activate providers as setup steps.

## Product surfaces

| Contract | What it means | Code owner |
| --- | --- | --- |
| [web.md](web.md) | Buyer browser experience | `apps/web` buyer routes |
| [native.md](native.md) | Expo iOS/Android buyer app | `apps/mobile` |
| [app.md](app.md) | Seller operating workspace and store CMS | Merchant routes inside `apps/web`; not a new `apps/app` |
| [admin.md](admin.md) | Separately privileged platform operations | Admin routes inside `apps/web` |
| [ai.md](ai.md) | Grounded, permissioned buyer/seller assistance | Server-owned feature integrations when implemented |

[Product](product.md) owns scope; [architecture](architecture.md) owns boundaries; [design](design.md) and [style guide](style-guide.md) own presentation; [verification](verification.md) owns proof. [The documentation index](docs/README.md) routes deeper questions.

## Local Codex and Astra

Repo skills live in `.agents/skills/`. [Codex setup](docs/agents/codex.md) explains discovery, optional tools and session handoff. [OpenAI guidance](docs/agents/openai-guidance.md) records verified sources and the distinction between the coding model, API configuration and the `astra-pro` branch name. Model availability is not created by a Markdown file.

The prior reference corpus, application code and historical evidence remain available. Documentation changes do not increase Shop acceptance counts, implement providers, approve product policies or qualify a release.

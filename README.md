# Treido

Build a new food-first marketplace, full merchant operating dashboard, personal/business accounts, platform administration and native buyer app. Start in Bulgaria with Bulgarian and English; model additional markets explicitly.

**Current state: documentation only. Dependencies, application code, provider configuration, database behavior and release readiness have not been verified.**

## Start here

Read [product.md](product.md) to understand the product. Read [design.md](design.md) to understand the frontend target. Follow [AGENTS.md](AGENTS.md) and the next ready task in [tasks.md](tasks.md) to implement it.

This is a clean build, not a migration project or a reskin. The product contract and approved design references define success. An agent must be able to execute without access to another Treido repository.

## Selected foundation

Use pnpm/Turborepo with Next.js for the complete browser platform and Expo/React Native for the native buyer application. One server implementation owns commerce rules. Start from official framework starters, not the full next-forge scaffold.

- `apps/web`: marketplace, personal accounts, full merchant dashboard, separately authorized administration, HTTP API and provider callbacks. Different areas have different layouts and permissions.
- `apps/mobile`: native iOS/Android buyer experience using the supported API, not a duplicate commerce backend.
- Shared packages contain client-safe contracts, design values and genuinely shared messages; no server secrets or database client in native.

The architecture is selected. Ordinary task work is not another framework-selection exercise. Changes require a demonstrated requirement/incompatibility and a recorded decision.

## Documentation ownership

| Document | Owns |
| --- | --- |
| [product.md](product.md) | Product, actors, features, journeys, business rules, food content and narrow open decisions. |
| [design.md](design.md) | Shop screen/flow reference, fidelity evidence, platform differences, merchant design and later Treido adaptation. |
| [architecture.md](architecture.md) | Code/data ownership, API, security, transactions, rendering and deployment boundaries. |
| [techstack.md](techstack.md) | Selected tools, compatible versions, installation and required commands. |
| [verification.md](verification.md) | Tests, evidence, performance, release/restore checks and acceptance gates. |
| [tasks.md](tasks.md) | The only implementation queue, dependencies and evidence ledger. |
| [AGENTS.md](AGENTS.md) | Local agent work loop and safety rules. |

Do not create another product/features/requirements document or parallel backlog. Update the file that owns the decision. `product.md` replaces the earlier `requirements.md`; the former mandatory migration document and migration task chain are removed.

## Frontend sequence

1. Install and verify the foundation. Inspect the exact selected Shop screens and recordings.
2. Build NEW buyer components and flows against Shop's styling and interactions. Integrate real isolated commerce incrementally; deterministic reference fixtures are allowed but are not completed backend features.
3. Obtain reference approval for the declared screen/flow/platform scope.
4. Adapt those same components to Treido colors, identity, producers, food categories and commerce details; verify again. Do not build a separate second frontend or reintroduce previous Treido layouts.
5. Complete all product features and prove web/native, merchant/admin, security, failure recovery and production readiness.

Shop is the buyer visual authority. The product specification is the feature/business authority. Merchant/admin design is reviewed against its own workflows, not invented from buyer screenshots.

## Optional reference and safety

The previous project may be consulted for a specific example or implementation idea. It does not define mandatory features, routes, schema, component names, tests or styling. There is no required inventory, porting quota, compatibility checklist or full source audit before building. New code is the default; optional copied code must be independently reviewed, appropriately licensed and tested against this specification.

A clean build does not authorize deleting or resetting any existing system. Use a fresh isolated development schema and synthetic data. Any future import of real users/catalog/orders or takeover of an existing domain is a separate authorized operation, not a prerequisite for the new product.

This repository is public. Never commit credentials, personal data, private logs, authentication state, signed URLs, restricted screenshots or font collections. Use private/ignored reference assets with nonsecret evidence identifiers. No deployment, live payment activation, database reset or app-store submission is implied by installation.

**Next local task: BOOT-001.** Product decisions and reference capture can be worked on independently. No implementation task is completed by publishing this documentation.

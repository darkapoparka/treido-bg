# Treido

A new food-first marketplace, full merchant operating dashboard, personal/business accounts, administration and native buyer app. Start in Bulgaria with Bulgarian and English; model additional markets explicitly.

**Current state: documentation only. No stack installation, application, database/provider integration or production readiness has been verified.**

## How to start

Open this repository in local Codex and say **Execute Task 1**. Later say **Execute Task 2**, **Execute Task 3**, or **Continue Task 3**. [tasks.md](tasks.md) tells the agent what to read, what to build, which tools to use, what checks close the batch and where to stop.

Tasks are meaningful work packages, not individual file edits. The agent implements a batch before running its closing checks; the full product regression is a later numbered task. No extra long prompt or separate task-code lookup is needed.

## Documentation

| File | Responsibility |
| --- | --- |
| [product.md](product.md) | What Treido does: users, features, business rules and open commercial decisions. |
| [design.md](design.md) | Exact Shop UI/flow reference, review and subsequent Treido adaptation. |
| [tasks.md](tasks.md) | Numbered executable work packages and the only progress record. |
| [AGENTS.md](AGENTS.md) | How the agent executes tasks, uses skills/CLIs and reports batch results. |
| [techstack.md](techstack.md) | Selected tools, compatibility, setup and scripts. |
| [architecture.md](architecture.md) | Code/data ownership, API, permissions, transactions and rendering. |
| [verification.md](verification.md) | Batch checks, focused risk tests, final regression and release proof. |

Do not add a duplicate features.md, requirements.md or another backlog. product.md is the feature authority; each numbered task points to the applicable sections.

## Selected foundation

A small pnpm/Turborepo monorepo: `apps/web` uses Next.js for the complete browser platform and server/API; `apps/mobile` uses Expo/React Native for the native buyer app. Shopping, accounts, the full selling dashboard and administration have distinct layouts and permissions. Native uses the same commerce backend. Client-safe contracts/tokens can be shared; database/server code and platform UI are not shared into native.

Start with official framework CLIs and use relevant available skills/plugins. Do not install the full next-forge scaffold or reopen the stack decision during routine work.

## Build order

Task 1 installs the foundation. Task 2 establishes the source and product details. Task 3 starts reproducing Shop's buyer discovery UI immediately, without waiting for the backend. Tasks 4-6 add real data, purchases and the remaining reference flows. After explicit source approval, Task 7 applies Treido branding and food content. Tasks 8-11 complete the remaining merchant/platform features; Tasks 12-14 verify and release the product under explicit authorization.

This is one implementation developed in batches, not a screenshot clone followed by a replacement frontend. Isolated fixtures support design work; they are not proof of working commerce.

## Clean build and safety

Build from this specification. Old repositories are optional references, not mandatory migration/parity targets or required component/schema imports. Existing systems must not be changed as a side effect. Real-data import or domain takeover requires separate scope and authorization.

The repository is public. Never commit secrets, customer data, authentication recordings, private logs, signed URLs or restricted screenshot/font collections. Use fresh isolated development data and safe reference storage. Installation does not authorize paid infrastructure, live payments, production deployment or store submission.

The instruction to start is **Execute Task 1**. No task is completed merely because it is documented.

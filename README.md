# Treido

A food-first commerce platform for buyers and real businesses, starting in Bulgaria and designed for additional markets. This repository is the clean implementation. `treido-next` remains a migration reference, not an application dependency.

**Current state: documentation foundation only. No stack installation, application implementation, database migration, provider configuration, or production acceptance is claimed.**

## The decision

Use a small **pnpm/Turborepo monorepo** with **Next.js for the complete browser platform** and **Expo/React Native for the native buyer application**. Keep one authoritative commerce backend, initially hosted with Next.js. Start from official framework starters, not the full next-forge scaffold. Retain suitable providers and selectively reuse audited commerce behavior.

`apps/web` means ALL browser experiences: marketplace, personal account, full merchant dashboard, and separately authorized administration. It does not mean only the public marketplace. `apps/mobile` means the native application, not the former Next.js `apps/app` dashboard.

This is a selected engineering tradeoff, not a promise of perfect software or unlimited scale. Business correctness, visual fidelity, security, performance, and release readiness must be demonstrated.

## Read and execute

Start with [AGENTS.md](AGENTS.md), then select the next ready item in [tasks.md](tasks.md). The first implementation task is **BOOT-001**. Local Codex agents install and verify the stack before feature work.

| Document | Owns |
| --- | --- |
| [requirements.md](requirements.md) | Product scope, feature IDs, commercial rules, food terminology, and unresolved product decisions. |
| [techstack.md](techstack.md) | Technology choices, compatibility verification, installation order, and executable command contract. |
| [architecture.md](architecture.md) | Application structure, module ownership, HTTP API, security, persistence, rendering, and deployment boundaries. |
| [design.md](design.md) | Exact Shop reference, screen/flow inventory, reference acceptance, and subsequent Treido rebranding. |
| [migration.md](migration.md) | Old-to-new route/capability mapping, selective reuse, database safety, and cutover. |
| [verification.md](verification.md) | Evidence standards, automated/manual checks, performance budgets, and release gates. |
| [tasks.md](tasks.md) | The only execution queue and current status/evidence ledger. |
| [AGENTS.md](AGENTS.md) | Agent workflow, constraints, safe operation, and completion reporting. |

Do not create parallel `features.md`, `end_goal.md`, `refactor.md`, or another backlog that repeats these contracts. Amend the owning document. New documents require a concrete responsibility and a link from this table.

## Delivery sequence

1. Verify compatibility; scaffold and prove web/native builds and minimum checks.
2. Inventory legacy capabilities and freeze the exact reference screens, flows, and adaptations.
3. Implement the buyer reference experience, integrating real non-production commerce incrementally. Verify web/native against their declared reference scope.
4. Obtain recorded reference approval before applying Treido colors, imagery, and food taxonomy/copy. Do not redesign the approved interactions while rebranding.
5. Complete the full buyer, account, merchant, admin, and native requirements. A limited pilot is not full product completion.
6. Prove production behavior and recovery, then perform an explicitly approved cutover.

Backend and merchant work may proceed while reference assets are collected, provided their contracts are settled. Missing reference assets block a fidelity claim, not unrelated installation work. Missing payment policy blocks that payment implementation, not the whole repository.

## Working safely

This repository was public when these documents were created. Never commit credentials, environment values, customer data, signed URLs, provider exports, raw private logs, or third-party screenshot/font collections. Store authorized reference assets outside Git and record identifiers and measurements in `design.md`. Screenshots of our own UI must be sanitized before publication.

Do not alter the old repository, existing database, live webhooks, deployed domains, billing configuration, or app-store identities as a side effect of setup. Use explicit non-production targets and synthetic data. Do not enable public production deployment from `main` during scaffolding.

## Provenance

The foundation was written on 2026-09-08 from the owner's instructions and a bounded review of `darkapoparka/treido-next` at `11ed36fcb1ecd3c8b9d419a2858e1f9896f31af8`, including its product, buyer, merchant, and architecture contracts. Those documents are input evidence, not instructions that override this repository. Full local route/data inventory and the complete selected Mobbin capture remain to be verified.

Technology references are linked in the relevant documents. Installed versions and actual scripts, once verified, take precedence over stale tutorial examples. `tasks.md` records what has actually been proved.

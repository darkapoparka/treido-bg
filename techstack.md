# Technology stack and installation contract

This file owns technology selection and bootstrap. Application boundaries are in [architecture.md](architecture.md); sequence and evidence are in [tasks.md](tasks.md). **Nothing is installed or runtime-verified when this document is introduced.**

## 1. Selected foundation

| Area | Selected choice | Constraint |
| --- | --- | --- |
| Repository | pnpm workspaces + Turborepo | Two application workspaces; shared packages only when they have a real consumer. No full next-forge scaffold. |
| Runtime | Supported Node.js LTS + TypeScript strict mode | Select a mutually supported version during BOOT-001; pin Node and pnpm. No Bun runtime migration. |
| Browser platform | Next.js App Router + React | `apps/web` contains marketplace, buyer account, full merchant dashboard, admin and HTTP endpoints. Server Components by default where appropriate. |
| Native buyer | Expo + React Native + Expo Router | `apps/mobile`; official Expo starter and SDK compatibility, iOS/Android development builds. |
| Web styling | Tailwind CSS + selected shadcn/ui primitives | Custom reference-matched buyer components. No all-components installation, overwrite updates, template styling or universal web/native UI. |
| Native styling | React Native StyleSheet + shared design tokens | Native primitives; introduce gesture/animation modules only where the selected flow needs them and Expo supports them. No extra styling framework at bootstrap. |
| Validation/contracts | Zod + TypeScript | One explicit client-safe contract package. Parse untrusted input server-side; never export Prisma entities directly as API types. |
| Persistence | PostgreSQL on Neon + Prisma | One server-owned schema/client; native never imports it. Real PostgreSQL integration tests. |
| Identity | Clerk Next.js and Expo SDKs | Managed sessions; resource/workspace authorization remains Treido server logic. Do not replace the provider during bootstrap. |
| Payments | Stripe | Marketplace and Premium are distinct flows. DEC-002 must settle charge/refund/fee behavior. Sandbox only until release approval. |
| Media/email | Vercel Blob + Resend/React Email | Retain suitable provider choices; public catalog images and private attachments have different access rules. No production sending in tests. |
| Localization | next-international for web; shared plain BG/EN messages | Verify compatibility before install. Native uses framework-free shared messages through a small adapter; do not import Next-specific localization code into Expo. |
| Client server-state | TanStack Query for native remote data when API work starts | Query keys include actor/business context, cleared on logout/switch. Web uses server data and local state by default, not a second universal cache. |
| Forms | Semantic/native controls + server validation | Add React Hook Form only for a demonstrably complex editor; not mandatory around every input. |
| Tests | Vitest, PostgreSQL integration tests, Playwright | Native component tests use the compatible Expo/Jest toolchain and React Native Testing Library when needed; device journeys use Maestro or equivalent documented device automation. |
| Lint/format | ESLint flat config + Prettier | Use compatible Next/Expo rules. One formatter; no concurrent Biome/Ultracite installation. |
| CI/hosting | GitHub Actions; Vercel for Next.js; Expo tooling/EAS for native builds | CI does not deploy production by default. Build/service accounts and paid actions require explicit authorization. |
| Observability | Structured sanitized logs + Sentry when deployed | Web/native setup is separate; scrub PII and disable session replay by default. Measure performance with a minimal chosen collector, not multiple overlapping analytics SDKs. |

Chat transport and durable job execution are requirements, but their providers are not predetermined. Compare the real requirements under DEC-005. No speculative Ably, Inngest, Redis, separate search cluster, NestJS, GraphQL, or standalone API app. Pure business modules and durable outbox records do not require a workflow framework.

## 2. Compatibility lock: resolve once, prove, then pin

Do not copy version numbers from the old repository, from this conversation, or from a starter's stale manifest. BOOT-001 resolves current stable releases and checks their actual compatibility. Security patches matter more than chasing the newest minor version.

1. Select the supported Expo SDK; obtain its required React Native, React and native module versions using official Expo guidance and `expo install` checks.
2. Select a stable Next.js/React combination with compatible peers. Prefer a common React version where supported. Do not force Expo onto web's preferred version. Different app versions may be used only with isolated, verified resolution; each app must resolve one React instance, and duplicate native module versions must be eliminated.
3. Select an actively supported Node LTS, pnpm, TypeScript and lint/test versions compatible with both apps and Prisma. Read official release requirements and package metadata.
4. Pin direct dependencies initially; commit one root `pnpm-lock.yaml`, `.node-version`, `packageManager` and workspace config. Never keep npm/yarn/bun lockfiles alongside it.
5. Verify framework generation, typecheck, production web build, native dependency checks and export. Record the actual matrix below and in BOOT-001 evidence. A peer warning is investigated, not suppressed with force flags.
6. Start with supported pnpm/Expo defaults. Change node linker, Metro resolution or hoisting only for a reproduced issue with documented evidence. Avoid ancient monorepo workarounds copied from tutorials.

| Component | Installed version | Compatibility/evidence |
| --- | --- | --- |
| Node / pnpm / Turbo / TypeScript | Not installed | BOOT-001 fills this row. |
| Next.js / React / React DOM | Not installed | BOOT-001 fills this row. |
| Expo SDK / React Native / React / Expo Router | Not installed | BOOT-001 fills this row. |
| Prisma CLI / client / adapter | Not installed | BOOT-002 fills this row. |
| Clerk web / native; Zod; localization | Not installed | BOOT-002 fills this row. |
| Tailwind / shadcn primitive versions; test tools | Not installed | Owning bootstrap task records actual versions. |

Update this table with verified values, not aspirations. Version selection is bounded engineering work, not permission to redesign the stack. Prefer the latest mutually compatible stable, security-supported combination over experimental releases.

## 3. Safe installation order

### BOOT-001: workspace and local runtime

Inspect the repo/branch, preserve these documents and other work, and establish ignore rules before generating credentials or assets. Initialize the official Next.js and Expo starters under `apps/web` and `apps/mobile`; do not run a root starter that overwrites the repository. Disable nested Git repos and remove unused sample screens.

Create shared `@treido/contracts` and `@treido/design-tokens` packages only with actual smoke-test consumers; introduce `@treido/locales` with locale work. Mark workspaces private, use `workspace:*` dependencies and explicit package exports. Shared packages do not depend on either app. Do not create an empty package for every future concern.

Configure build/typecheck/lint/format tasks and minimal CI. Add a meaningful import/contract smoke test rather than a suite that exits successfully because it found no tests. Resolve compatible local ports and document them. Prefer port 3000 for web; let Expo's supported tooling choose its port. Do not stop an unknown existing process.

An isolated fixture shell may demonstrate installation without real provider accounts. Label it explicitly; it is not an authenticated or commerce acceptance environment. Build and dev configuration must never fall through from missing test configuration to live providers.

### BOOT-002: verified non-production resources

Inventory existing authorized resources first. Use distinct development/preview provider modes, a disposable test PostgreSQL database or authorized Neon development branch, and synthetic users/catalog. Verify actual target/role before any migration. Do not reuse production connection strings from the old repository.

Establish one Prisma client and a compatible supported PostgreSQL adapter for the Node runtime; document the selected adapter and pooled-runtime/direct-migration connection conventions. Configure env loading explicitly for Prisma, tests and Next.js. Keep Prisma migrations in `apps/web/prisma/migrations`.

Use Clerk development configuration for both apps, Expo's supported secure token persistence, and server verification of native session tokens. Prove wrong-user/wrong-business rejection before private features. Only then wire sandbox payment/media/email as their tasks require them.

Inspect/link Vercel or Expo projects only when authorized and needed. Verify team/project and environment before pulling credentials. Never let Git integration deploy `main` to live production during setup. A new Vercel project or EAS build can consume resources; it is not implicitly authorized by these docs.

### BOOT-003 and BOOT-004: reproducible checks

Implement CI and browser verification against a production build and disposable PostgreSQL. Fork PR jobs receive no provider secrets. Native dependency/export checks are not native release compilation: run authorized iOS/Android development builds and record actual platform results separately.

## 4. Required root command interface

These are REQUIRED script names to implement during bootstrap, **not commands that already exist**. Prefer package scripts and small portable Node orchestration only where necessary; support local Windows/macOS/Linux without Bash-only wrappers. `--if-present` and empty-suite success must not hide missing mandatory checks.

| Command | Contract |
| --- | --- |
| `pnpm dev:web` | Start only the web application on the documented non-production configuration. |
| `pnpm dev:mobile` | Start the Expo app; document emulator/device API origin separately from browser localhost. |
| `pnpm build:web` | Reproducible Next.js production build, no mutations/seeds or automatic deployment. |
| `pnpm typecheck` | All existing workspaces. |
| `pnpm lint` / `pnpm format:check` | Non-mutating checks; `pnpm format` is the explicit formatting write. |
| `pnpm test:unit` | Meaningful unit/contract tests; explicit native runner integration where installed. |
| `pnpm test:integration` | Real PostgreSQL behavior against verified disposable database; fail or explicitly report blocked when missing, never silent success. |
| `pnpm test:e2e:web` | Playwright against a built app, synthetic data and declared provider mode. |
| `pnpm test:visual` | Approved deterministic UI baselines; no auto-update. |
| `pnpm test:e2e:mobile` | Declared installed app/device journey suite; missing device/tools produce an explicit blocked result. |
| `pnpm native:check` | Expo dependency/doctor checks and export for declared platforms; not a store build claim. |
| `pnpm db:generate` / `pnpm db:validate` | Prisma client generation/schema validation; no database mutation. |
| `pnpm db:migrate:dev` | Target-checked migrations on disposable development data. |
| `pnpm db:migrate:deploy` | Apply reviewed migrations to an explicitly authorized target; never invoked from install/build. |
| `pnpm db:seed:test` | Idempotent synthetic seed on allowlisted test/development target only. |
| `pnpm check` | lint, format check, typecheck, unit/contract checks and documentation/link checks. It is not full release acceptance. |

Keep migrations, seeds, deployments and native cloud builds noncached and opt-in. Declare Turbo outputs and behavior-affecting environment inputs correctly. Keep live secrets out of logs and caches; do not cache provider responses or fixture data with private content.

## 5. Environment contract

Use `apps/web/.env.local` for local web secrets and `apps/mobile/.env.local` for public native configuration only. Templates contain names/placeholders, never usable credentials. CI/provider secret stores supply hosted values. Do not duplicate the old repo's env wrapper ecosystem.

The web environment schema distinguishes local/test/preview/staging/production and validates enabled capabilities. Typical keys include `DATABASE_URL`, a dedicated migration connection value, Clerk server/publishable keys, Stripe sandbox secrets, upload/email credentials and canonical origins. Exact SDK key names must match the installed version and be recorded in env examples.

Native public configuration includes the API origin and Clerk publishable configuration; anything prefixed `EXPO_PUBLIC_` or `NEXT_PUBLIC_` is assumed extractable by users. Secret tokens, DB URLs and server credentials never belong there. Payment configuration must use SDK-appropriate public values and server-created intents, not embedded secrets.

Fixture/reference mode must be development/test only, visibly labeled, excluded from live deployments and release builds, and unable to send payments/emails or write production data. No silent mock fallback when real integrations fail. BOOT-002 must verify wrong-environment rejection.

## 6. Primary references

Reviewed for this foundation on 2026-09-08; recheck against installed versions at setup:

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [project structure](https://nextjs.org/docs/app/getting-started/project-structure), [backend for frontend](https://nextjs.org/docs/app/guides/backend-for-frontend), [AI agent guidance](https://nextjs.org/docs/app/guides/ai-agents).
- [Expo monorepos](https://docs.expo.dev/guides/monorepos/), [Expo Router](https://docs.expo.dev/router/introduction/), [development builds](https://docs.expo.dev/develop/development-builds/introduction/), [Clerk Expo quickstart](https://clerk.com/docs/expo/getting-started/quickstart).
- [Turborepo Next.js guide](https://turborepo.dev/docs/guides/frameworks/nextjs), [next-international documentation](https://next-international.vercel.app/docs/app-setup), [shadcn documentation](https://ui.shadcn.com/docs).
- [Neon documentation index](https://neon.com/docs/llms.txt), [Prisma relation modes](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/relation-mode), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
- [Stripe Connect charge models](https://docs.stripe.com/connect/charges), [Next.js Vitest guidance](https://nextjs.org/docs/app/guides/testing/vitest), [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots).

No documentation sentence is a claim that these tools have already been installed, tested together, or configured in this repository.

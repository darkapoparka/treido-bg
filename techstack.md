# Technology stack and bootstrap

This file owns tools, compatibility and installation. [product.md](product.md) owns the product; [architecture.md](architecture.md) owns structure; [tasks.md](tasks.md) owns progress. No toolchain is installed or tested merely because it is selected here.

## 1. Selected tools

| Area | Choice | Boundary |
| --- | --- | --- |
| Workspace | pnpm workspaces + Turborepo | Next.js and Expo apps; packages only for actual shared consumers. Official starters, not the full next-forge scaffold. |
| Runtime/types | Supported Node.js LTS + strict TypeScript | Resolve compatible versions in BOOT-001, then pin. |
| Browser | Next.js App Router + React | Marketplace, personal accounts, full merchant dashboard, admin and server/API in apps/web. |
| Native | Expo + React Native + Expo Router | Buyer application in apps/mobile with actual iOS/Android development-build verification. |
| Web styling | Tailwind + selected shadcn/ui primitives | New Shop-matched components. No generic template look, bulk component install or overwrite update. |
| Native styling | React Native StyleSheet + shared tokens | Platform components; supported gesture/animation libraries only as selected flows require them. |
| Contracts | Zod + TypeScript | Explicit client-safe request/response types, not ORM entity exports. |
| Data | Neon PostgreSQL + Prisma | Product-led new schema, real constraints/transactions and synthetic isolated development data. |
| Identity | Clerk Next.js and Expo SDKs | Sessions/identity; resource/business authorization belongs to Treido. |
| Payments | Stripe | Separate marketplace and Premium flows; approved DEC-002 policy, sandbox before live activation. |
| Files/email | Vercel Blob + Resend/React Email | Public images versus private files, authorized storage and non-production sending. |
| Localization | next-international on web; shared plain BG/EN messages | Verify compatibility; native uses framework-neutral messages, never Next-specific imports. |
| Native server-state | TanStack Query when API consumption begins | Actor/business-scoped keys; clear private data on identity/context changes. |
| Forms | Accessible platform controls + server validation | Add React Hook Form for justified complex editors, not around every input. |
| Tests | Vitest, real PostgreSQL integration, Playwright | Native uses compatible Expo/Jest + React Native Testing Library where needed; Maestro/device automation for installed-app journeys. |
| Lint/format | ESLint flat config + Prettier | Compatible Next/Expo rules, one formatter. |
| CI/build/hosting | GitHub Actions, Vercel, Expo tooling/EAS | No implicit production deploy or paid cloud build authorization. |
| Observability | Sanitized structured logs; Sentry for deployed web/native | Scrub personal data; replay disabled by default; avoid overlapping analytics collectors. |

No database/provider choice implies an import from another project. Chat and durable work need a technical decision under DEC-005, not speculative installation. Ably/Inngest remain candidates. Do not add Redis, separate search clusters, NestJS, GraphQL, a standalone API app or universal web/native UI at bootstrap.

## 2. Resolve compatibility, prove it, pin it

BOOT-001 uses current official docs and package metadata to select stable, security-supported versions. Do not copy another project's lockfile or force incompatible peers.

1. Select an Expo SDK and its supported React Native, React and native-module versions; use Expo's supported install/check process.
2. Choose a compatible stable Next.js/React pair. Prefer compatible common React resolution; never force Expo onto a web-preferred version. Any separate app versions need verified isolation, one React instance per app and no duplicate native module versions.
3. Select Node LTS, pnpm, TypeScript, lint/test tools and Prisma adapters supported by the selected framework versions.
4. Pin direct dependencies initially. Commit one pnpm-lock.yaml, packageManager, workspace configuration and Node version file. No competing lockfiles.
5. Verify a clean install, package imports, lint/typecheck/unit tests, production web build and Expo doctor/dependency/export checks. Native OS builds are separately proved in BOOT-004.
6. Use supported Expo/pnpm defaults. Add Metro/hoisting/node-linker workarounds only for a reproduced, documented incompatibility.

| Component | Actual version | Evidence |
| --- | --- | --- |
| Node / pnpm / Turbo / TypeScript | Not installed | BOOT-001 fills from verified setup. |
| Next.js / React / React DOM | Not installed | BOOT-001. |
| Expo SDK / React Native / React / Expo Router | Not installed | BOOT-001. |
| Prisma CLI/client/adapter; Clerk SDKs | Not installed | BOOT-002. |
| Validation/localization/styling/test tooling | Not installed | Owning bootstrap/feature task. |

Record exact versions and supporting URLs after verification. An unresolved compatibility issue is a narrow blocker, not permission to restart the architecture discussion.

## 3. Install in this order

### BOOT-001: workspace

Inspect branch/Git status and preserve unrelated work and committed documentation. Generate the official Next.js and Expo projects inside their application directories, not over the repository root. Remove starter demo screens and nested Git repositories. No access to old source is required.

Create @treido/contracts and @treido/design-tokens only with actual smoke-test consumers; create shared messages with localization work. Use private workspace manifests, workspace:* dependencies and explicit exports. Do not generate a package for every future feature.

Establish lint/format/typecheck, meaningful import/contract tests, safe ignores/env examples and a minimal CI lane. Document local ports, with web port 3000 as the default when free. Do not stop unknown processes.

A visibly labeled isolated fixture shell may run without provider accounts. It must not claim working authentication/commerce or silently fall back to live resources. Local fixture verification does not require provisioning billable infrastructure.

### BOOT-002: new isolated data and identity

Use an explicitly authorized fresh development database or isolated Neon development target with no production/customer rows. Build this application's initial user/business membership schema and reviewed migrations; catalog tables follow CORE-001. Seed synthetic actors. No inspection, schema import, ID mapping or porting from another repository is a prerequisite.

Verify actual project/database/branch and effective credential roles before writes. Configure one server Prisma client with a supported Node/PostgreSQL adapter and document runtime/migration connection conventions. Keep schema/migrations in apps/web/prisma and explicitly configure env loading for Prisma/tests/Next.js.

Use development Clerk configuration and supported secure native token storage. Test wrong-user/business and stale membership rejection. Add Stripe/storage/email sandbox integrations when their tasks require them, not just to fill env templates.

Inspect/link Vercel or Expo projects only when authorized and needed. Verify the correct team/project and credential mode before pulling secrets. Do not connect main to live public production or change an existing deployment as a setup side effect.

### BOOT-003 / BOOT-004: verification lanes

Build repeatable PostgreSQL and built-web browser tests, safe visual artifacts and a production-build performance harness. Public fork jobs receive no provider secrets. Prove real authorized iOS/Android development builds/device connectivity separately; Expo export/Go is not native release compilation.

## 4. Script contract

These scripts are requirements to implement, not claims that commands already exist. Use package scripts and small portable Node orchestration where needed; support local Windows/macOS/Linux. Missing mandatory scripts/tests must not be concealed with --if-present or empty-suite success.

| Command | Required behavior |
| --- | --- |
| pnpm dev:web | Start only the web app in its explicit non-production mode. |
| pnpm dev:mobile | Start Expo; document emulator/device API origin separately from browser localhost. |
| pnpm build:web | Reproducible production web build without database mutation or deployment. |
| pnpm typecheck | Check all existing workspaces. |
| pnpm lint / pnpm format:check | Non-mutating checks; pnpm format is an explicit write. |
| pnpm test:unit | Actual unit/contract tests and explicit native-runner integration where configured. |
| pnpm test:integration | Real verified disposable PostgreSQL; unavailable target fails/reports blocked, never silent success. |
| pnpm test:e2e:web | Built application with synthetic data and declared provider mode. |
| pnpm test:visual | Approved deterministic baselines; no automatic updates. |
| pnpm test:e2e:mobile | Installed-app/device journey checks; unavailable hardware/tools explicitly reported. |
| pnpm native:check | Expo dependency/doctor/export checks, not a store-build claim. |
| pnpm db:generate / pnpm db:validate | Client generation and schema validation, no data mutation. |
| pnpm db:migrate:dev | Target-checked forward migrations for this new development schema. |
| pnpm db:migrate:deploy | Reviewed migrations on an explicitly authorized target; never from install/build. |
| pnpm db:seed:test | Idempotent synthetic data on allowlisted isolated targets. |
| pnpm check | lint, format check, typecheck, unit/contracts and documentation/link checks; not full release acceptance. |

Install script families with their owning task; absent later-platform checks stay visibly not implemented/blocked rather than green placeholders. Migrations/seeds/deployments/cloud builds are opt-in and noncached. Configure Turbo outputs and behavior-affecting environment inputs; never cache sensitive provider responses/logs.

## 5. Environment and operational safety

Web secrets live in local/hosted secret stores; native env contains public configuration only. Templates contain names/placeholders. NEXT_PUBLIC_* and EXPO_PUBLIC_* values are extractable; no tokens, server credentials or database URLs there.

Validate local/test/preview/staging/production configuration and enabled capabilities explicitly. Missing provider configuration disables/explains an unavailable feature; it never simulates success or uses another project's production credentials. Real integration errors must not trigger mock fallbacks.

Fixture/reference mode is isolated, labeled, unable to send payments/emails or touch live data, and excluded from production/native release. Test wrong-environment rejection. Separate runtime/migration/operator roles and verify the actual destination, not just an APP_ENV string.

Code installation does not authorize data import, old-system cutover, DNS changes, paid resources, live payments or store submissions. Those operations require separate explicit authorization when actually needed.

## 6. Official implementation references

Use the installed version as the basis for verification: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [AI agent guidance](https://nextjs.org/docs/app/guides/ai-agents), [Expo monorepos](https://docs.expo.dev/guides/monorepos/), [Expo Router](https://docs.expo.dev/router/introduction/), [development builds](https://docs.expo.dev/develop/development-builds/introduction/), [Turborepo Next.js](https://turborepo.dev/docs/guides/frameworks/nextjs), [Clerk Expo](https://clerk.com/docs/expo/getting-started/quickstart), [next-international](https://next-international.vercel.app/docs/app-setup), [shadcn](https://ui.shadcn.com/docs), [Neon docs index](https://neon.com/docs/llms.txt), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions), [Stripe Connect](https://docs.stripe.com/connect/charges), [Next.js tests](https://nextjs.org/docs/app/guides/testing/vitest), [Playwright baselines](https://playwright.dev/docs/test-snapshots).

These links support setup work; no compatibility or provider test is claimed until its actual evidence is recorded.

# Technology stack and installation

[product.md](product.md) defines what to build. [architecture.md](architecture.md) defines ownership. [tasks.md](tasks.md) supplies numbered assignments. This document is setup guidance, not another backlog. Tools are selected but not installed/verified until Task 1 and the relevant later batches record results.

## 1. Selected tools

| Area | Choice | Boundary |
| --- | --- | --- |
| Workspace | pnpm workspaces + Turborepo | Official Next.js/Expo starters; packages for real shared consumers. No full next-forge scaffold. |
| Runtime/types | Supported Node.js LTS + strict TypeScript | Resolve mutually compatible versions once in Task 1, then pin. |
| Browser | Next.js App Router + React | Complete marketplace/account/merchant/admin platform and backend in apps/web. |
| Native | Expo + React Native + Expo Router | Buyer app in apps/mobile; platform-specific UI and actual installed-build verification. |
| Web styling | Tailwind + selected shadcn/ui primitives | Shop-matched components, no generic theme or bulk overwrite install. |
| Native styling | React Native StyleSheet + shared tokens | Supported gesture/animation packages only where the source flow needs them. |
| Contracts | Zod + TypeScript | Client-safe inputs/DTOs/errors, not Prisma model exports. |
| Database | Neon PostgreSQL + Prisma | New product-led schema, real constraints, isolated synthetic data. |
| Identity | Clerk web and Expo SDKs | Sessions/identity; business/resource authorization remains on the server. |
| Payments | Stripe | Marketplace and Premium are distinct; product DEC-002 defines money behavior. |
| Files/email | Vercel Blob + Resend/React Email | Public versus private access and safe non-production delivery. |
| Localization | next-international on web; shared plain BG/EN messages | Verify compatibility; native never imports Next-specific localization. |
| Remote native state | TanStack Query when real API work begins | Actor/business-scoped keys, clear private data on context changes. |
| Forms | Accessible controls + server validation | React Hook Form only for justified complex editors. |
| Tests | Vitest, PostgreSQL integration, Playwright | Compatible Expo/Jest + React Native Testing Library as needed; Maestro/device tooling for installed-app journeys. |
| Lint/format | ESLint flat config + Prettier | Supported Next/Expo rules, one formatter. |
| CI/build/hosting | GitHub Actions, Vercel, Expo tooling/EAS | No implicit production deployment or paid cloud build authorization. |
| Observability | Sanitized logs; Sentry on deployed web/native | No personal-data replay by default or overlapping collectors without need. |

Use relevant installed skills/plugins and official CLI help/documentation. Do not install every provider during Task 1. Realtime and durable-work services are selected for their actual feature under DEC-005; Ably/Inngest are candidates, not defaults to install. No speculative Redis/search cluster/NestJS/GraphQL/separate API deployment or universal web/native UI.

## 2. Compatibility and reproducibility

Task 1 selects a supported Expo SDK and its React Native/React requirements first, then a compatible stable Next.js/React pair, Node LTS, pnpm, TypeScript and tooling. Use official package metadata and Expo checks rather than guessing or copying another project's lockfile. Prefer a shared compatible React version; any separate versions need verified isolation and one React instance per app. Never force Expo onto web's preferred version.

Pin direct dependencies initially and commit one pnpm-lock.yaml, packageManager, Node version and workspace config. Prefer supported starter/Metro/pnpm defaults. Add hoisting or resolver workarounds only for a reproduced documented issue. Resolve incompatibilities; do not suppress peer warnings with force flags. Upgrades are reviewable work, not part of a routine styling batch.

| Component | Actual version | Evidence owner |
| --- | --- | --- |
| Node / pnpm / Turbo / TypeScript | Not installed | Task 1 |
| Next.js / React / React DOM | Not installed | Task 1 |
| Expo / React Native / React / Expo Router | Not installed | Task 1 |
| Styling / validation / lint / initial tests | Not installed | Task 1; add only used components |
| Prisma CLI/client/adapter / Clerk / localization / native query | Not installed | Task 4 or the first actual consumer |
| Payment / files / delivery / billing / AI tools | Not installed | Their implementing numbered tasks |

Fill exact versions, source links and check results after installation. Current manifests/lockfile establish runtime facts; documentation is not a claim that the combination already works.

## 3. Installation by work package

**Task 1:** Inspect the checkout and concurrent work. Use create-next-app and create-expo-app in their app directories, preserving root docs and avoiding nested Git repos. Use private manifests, workspace:* dependencies and explicit exports. Add contracts/tokens only with smoke consumers and shared messages when used. Configure strict types, lint/format, minimal CI, meaningful imports/tests, ignores and placeholder env examples. Use a neutral marked provider-free shell; do not invent Shop values or claim working commerce. Document available local ports and device origin conventions. Install needed shadcn primitives with its CLI, not all components. Run the Task 1 closing checks after the coherent scaffold, not after each generated file.

**Task 4:** Use an explicitly authorized fresh development PostgreSQL target and synthetic data; no old schema or data import. Verify project/database/branch and effective roles before writes. Configure one server Prisma client and supported Node/PostgreSQL adapter, runtime/migration connection conventions and explicit env loading. Schema/migrations live in apps/web/prisma. Configure Clerk development identity and secure native token persistence, implement/test context API before the catalog work, and connect real client consumers. Establish the PostgreSQL/browser harness and actual native development-build verification within this batch. Provider/environment setup does not require the old repository.

**Tasks 5 and 8-11:** Install integrations when their implemented feature requires them. Use sandbox/sinks and current relevant skills. Decide and verify background replay at the payment batch, not only at notification work. Later communication extends that foundation. Task 12 runs comprehensive regression; Tasks 13-14 prepare/execute separately authorized release.

A local fixture shell requires no billable provisioning. Access/linking to Vercel, Neon, Clerk or Expo must target the authorized environment. Do not enable public production from main or run paid EAS builds as a side effect of installing dependencies.

## 4. Script contract

Implement real scripts with their owning task, not placeholders that pass because nothing runs. Use package scripts and existing tools; small portable Node glue only when necessary. Support Windows/macOS/Linux without a custom orchestration framework. Scoped scripts/filters can run during development; full checks run at the task checkpoints, not after every small edit.

| Owner | Script | Meaning |
| --- | --- | --- |
| Task 1 | pnpm dev:web / pnpm dev:mobile | Start only the selected application; document ports and device API origin. |
| Task 1 | pnpm build:web | Production web build, no mutations or deployment. |
| Task 1 | pnpm lint / pnpm format:check / pnpm format | Checks versus explicit formatting write. |
| Task 1 | pnpm typecheck / pnpm test:unit | Existing workspaces and meaningful implemented unit/contract tests. |
| Task 1 | pnpm native:check | Expo doctor/dependency checks and iOS/Android JS exports; not OS compilation. |
| Task 1 | pnpm check | Implemented lint/format/types/unit/import/doc-reference checks; not release acceptance. |
| Tasks 3-4/6 | pnpm test:e2e:web / pnpm test:visual | Built-web journeys and approved deterministic baselines once available; no auto-update. |
| Task 4 | pnpm db:generate / pnpm db:validate | Prisma client/schema checks, no data writes. |
| Task 4 | pnpm db:migrate:dev / pnpm db:migrate:deploy | Forward migrations on explicitly authorized targets, never during install/build. |
| Task 4 | pnpm db:seed:test / pnpm test:integration | Synthetic seed/real PostgreSQL tests against verified disposable targets. |
| Tasks 4-6 | pnpm test:e2e:mobile | Declared installed-app/device journeys when implemented; missing platform tools are explicit. |

Absent future suites remain not implemented, not fake green scripts. Do not use --if-present, continue-on-error or empty suites to conceal missing mandatory checks. Install/check early primitives with focused tests; wait for approved source captures before declaring a visual baseline.

Keep database writes/deployments/cloud builds opt-in and noncached. Declare Turbo outputs and environment inputs correctly; never cache sensitive logs/provider payloads. Avoid concurrent dev/build against the same .next output and serialize shared lockfile/schema generation.

## 5. Environment safety

Web secrets stay in local/hosted secret stores; native configuration contains public values only. Templates contain names/placeholders. NEXT_PUBLIC_* and EXPO_PUBLIC_* values are extractable: no server tokens or DB credentials there.

Validate environments and enabled capabilities. Missing configuration explains unavailable behavior, never simulates success or selects another project's live credentials. Real integration errors cannot trigger mock fallbacks. Mark isolated fixture/reference mode, exclude it from release, and test that it cannot send real payments/emails or write production data.

Separate runtime/migration/test/operator credentials; an APP_ENV label alone does not prove the destination or privilege. Installation does not authorize data import, production changes, domains, paid services or store submission.

## 6. Official references

Use version-matched guidance: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [AI agents](https://nextjs.org/docs/app/guides/ai-agents), [Expo monorepos](https://docs.expo.dev/guides/monorepos/), [Expo Router](https://docs.expo.dev/router/introduction/), [development builds](https://docs.expo.dev/develop/development-builds/introduction/), [Turborepo Next.js](https://turborepo.dev/docs/guides/frameworks/nextjs), [Clerk Expo](https://clerk.com/docs/expo/getting-started/quickstart), [next-international](https://next-international.vercel.app/docs/app-setup), [shadcn](https://ui.shadcn.com/docs), [Neon docs](https://neon.com/docs/llms.txt), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions), [Stripe Connect](https://docs.stripe.com/connect/charges), [Next.js tests](https://nextjs.org/docs/app/guides/testing/vitest), [Playwright](https://playwright.dev/docs/test-snapshots).

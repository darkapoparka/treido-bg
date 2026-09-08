# Verification and release

Verify the NEW product against [product.md](product.md) and its frontend against [design.md](design.md). Success is not similarity to an older codebase or preservation of its route tree. [tasks.md](tasks.md) records results; [techstack.md](techstack.md) defines the command interface.

## 1. Evidence standard

A completed task records requirement IDs, tested commit, changed behavior, exact commands/exit results, dataset, provider/environment mode and relevant device/browser/viewport/locale. Include observed persisted effects, safe screenshot/trace/recording identifiers, limitations and reviewer result.

Distinguish unit mocks, actual PostgreSQL, real sandbox providers, installed native builds, physical devices, hosted previews and production. Evidence at one layer does not establish another. Empty/skipped suites, HTTP 200, a sign-in redirect, generated screenshot or Expo export alone are not end-to-end proof. Missing resources are NOT RUN/BLOCKED for the specific check; continue independent work.

Fixtures must be reproducible and isolated per worker. Do not make tests depend on another test's order or retry flakes until they happen to pass. Public artifacts must exclude secrets, real customer data and restricted reference imagery.

## 2. Checks by change

| Change | Required evidence |
| --- | --- |
| Documentation | Valid relative links, defined requirement/task references, acyclic dependencies, consistent ownership and no invented completion claims. |
| Bootstrap | Clean install, dependency/import checks, lint/typecheck/unit tests, production web build, Expo doctor/export; actual native builds separately. |
| UI | Actual browser/device inspection, Shop comparison or approved Treido baseline, navigation/back/focus/keyboard/scroll, BG/EN and loading/error states. |
| Domain/database | Unit calculations plus real PostgreSQL constraints, concurrency/retry tests and persisted-state verification. |
| Auth/API | Input/output contracts, missing/expired auth, cross-user/business attempts, revoked membership, limits and meaningful errors. |
| Provider | Fault injection plus actual sandbox requests/callbacks/reconciliation. Live activation needs separate authorization. |
| Native | Installed app/build/device evidence, secure sessions, navigation/deep links, keyboard, interrupted/background flows and connectivity failure. |
| Release | Full declared product evidence, production-target configuration, backup/restore and rollback rehearsal, exact artifact and owner authorization. |

Required scripts cannot be hidden behind --if-present, continue-on-error or empty success. Device/export/fixture checks are labeled with their actual scope. New-schema migrations are verified database changes, not a requirement to transfer another application's data.

## 3. First complete commerce proof

FLOW-001 runs on synthetic actors/catalog and isolated PostgreSQL/sandbox providers:

1. A merchant creates a draft, variant and fulfillment offer; invalid publication is rejected.
2. Eligible published data appears on web/native with correct price, unit, variant and availability.
3. Guest cart and intended destination survive sign-in under the defined merge policy.
4. The buyer reviews a server quote and confirms an idempotent operation; tampered quantities/totals are rejected.
5. Real sandbox payment and applicable challenge/return reconcile to the existing operation/order.
6. The merchant receives the order and permitted actions; another merchant cannot access it.
7. Fulfillment advances and buyer/merchant views reflect the same state and inventory effect.

Include applicable stock, changed-quote, duplicate-submit, payment-failure and authorization cases below. The initial proof may use one seller/variant, but approved multi-seller grouping and weighted/increment quantities must be exercised before full checkout acceptance. Later tasks extend the same integrated fixture with recovery, reviews, messages and notifications; do not build disconnected demos.

## 4. Failure matrix

| Boundary | Tests |
| --- | --- |
| Inventory | Two buyers/last quantity; expired lot; adjustment race; repeated consume/release; reservation expiry versus payment success; no overselling/double restoration. |
| Cart/quote | Changed price/publication/variant/address/fulfillment; invalid or repeated fields; guest merge conflicts; removed product; currency mismatch; explicit requote. |
| Idempotency | Concurrent same key/input; same key with different input; provider success then application crash; client timeout and resumed operation; no duplicate charge/order. |
| Payments | Invalid signatures, duplicate/late/out-of-order events, provider timeout/rate limit, cancellation versus capture/refund; durable replay and reconciliation. |
| Recovery | Amount/item/seller/fee allocation, duplicate requests, provider success before local finalization, fulfillment constraints; unsupported partial operations blocked honestly. |
| Permissions | Buyer A reads B; merchant A guesses B's IDs; role/member removal; stale business tab; seller attempts admin; private attachment/export/chat alternatives. |
| Identity | Provisioning/webhook race, out-of-order/deleted identity, expired session, account switch/logout, no duplicated records or restored privileges. |
| Messaging | Double send, reconnect/replay, ordering, removed/blocked member, unauthorized file/subscription, read cursor races. |
| Delivery/jobs | Dedupe/retry, expired lease, abandoned work, preference changes and terminal failures; no silent loss of important intents. |
| Environment | Wrong/missing secrets, fixture flag or sandbox origin in release, ambiguous DB target, unsigned job; fail closed. |

Use sandbox providers and delivery sinks; tests do not authorize contacting customers or refunding live payments.

## 5. Visual and accessibility checks

Source matching and regression are separate. Inspect the selected Shop capture at documented logical viewport/density with explicitly approved browser/Android exceptions. Stabilize data/time/media/fonts/rendering versions. Do not auto-accept a screenshot to make CI green; do not mask the UI difference being reviewed.

Web coverage includes 320, 360, 390 and 430 CSS-pixel widths, relevant landscape and tablet/desktop widths including 768, 1024 and 1440. The exact source comparison uses its measured viewport. Test important flows on real iOS Safari and Android Chrome; emulated WebKit is not proof of physical-device behavior.

Native coverage includes declared iOS/Android build/device classes, smaller/larger screens, safe areas, platform back, text scaling, keyboard, background/resume and unreliable networks. Use installed builds, not just a web preview or Expo Go.

Check semantics/labels, keyboard access, visible focus and focus return/containment, contrast, reduced motion and text expansion including 200% web text sizing. Spot-check screen-reader core journeys. Verify the release accessibility target against applicable current standards. Source fidelity is not an excuse for an inaccessible control.

Owner/design-reviewer evidence approves both the source phase and the later Treido adaptation. Visual approval cannot certify a fixture-only payment or unimplemented merchant operation.

## 6. Performance

Separate cold local compilation, deployed cold/warm requests and in-app navigation. Use production builds with realistic synthetic data and documented CPU/network/device/cache/region/provider conditions. Do not blame a framework or monorepo without traces.

Browser targets are LCP <= 2.5 seconds, INP <= 200 milliseconds and CLS <= 0.1 at the 75th percentile once sufficient field data exists, segmented by mobile/desktop and meaningful routes. Before traffic, use repeatable lab/interaction evidence; a Lighthouse run is not field INP proof. These are targets, not observed Treido results.

BOOT-003 establishes a harness for existing routes. Before FLOW-001 approval measure populated discovery/product/cart/checkout and merchant queue; record provisional server/API/native startup and interaction budgets with conditions. Repeat at QUAL-001. A fast empty scaffold is not a completed-product result.

Inspect initial JS, images/transfer, blocking work, provider/auth requests, query count/duration, cache behavior, TTFB and navigation usability. Core navigation stays useful while personalization loads. A skeleton is feedback, not proof of speed. Load-test only explicitly authorized non-production systems. Native startup metrics are measured on native builds, not browser Core Web Vitals.

## 7. Gates

| Gate | Requires | Does not establish |
| --- | --- | --- |
| G0 Foundation | BOOT-001 through BOOT-004 and CONTRACT-001: compatible stack, isolated identity/data, CI and actual declared web/native proof. | Complete features or production readiness. |
| G1 Reference specification | REF-001: actual selected source inventory, coverage and named adaptations. | Implemented source match. |
| G2 Commerce slice | FLOW-001: web/native/merchant transaction and applicable failure proof. | Every feature or reference flow. |
| G3 Reference approval | REF-005: frozen source-required flows/states reviewed with evidence and approved exceptions. | Treido branding or backend acceptance for fixture-only states. |
| G4 Treido design | BRAND-001 after G3: branding/food adaptation through accepted components and renewed checks. | Full merchant/admin/provider completion. |
| G5 Product quality | QUAL-001: all declared product requirements, source/sandbox/device/visual/security/performance evidence. | Permission to activate live services. |
| G6 Release | RELEASE-PREP-001 and REL-001: tested production configuration, recovery and exact authorized artifact/activation. | Guarantee against future defects. |

All gates start unverified. Independent backend/merchant tasks can proceed during reference collection. A restricted pilot must specify limitations and cannot be labeled full product completion.

## 8. CI and new-application operations

Initial CI checks frozen install, lint/format/typecheck, unit/contracts, built-web smoke, disposable PostgreSQL and Expo dependency/export. Add real visual/device lanes as implemented. Unavailable hardware/provider checks remain visible release blockers, not falsely green jobs. Public/fork PRs receive no live secrets.

RELEASE-PREP-001 creates a release-specific runbook for THIS application: verified targets/least-privilege credentials, regions, private storage, signed callbacks/work triggers, rate limits, tracing/alerts, backup/restore and application/data/provider recovery. Test installing this schema from its migrations and updating it safely. No database writes during application build.

Rehearse recovery using synthetic orders and sandbox events, including a crash after provider success and a delayed callback. Restoring a database snapshot can erase later valid records; recovery must reconcile payment/order state rather than blindly restore over live transactions.

Production configuration must exclude fixture routes/data, sandbox origins/keys and private cache leaks. Verify the exact web artifact and native API/key configuration; do not blindly promote a preview. Live deployment, domains/callbacks, billing and store actions require owner authorization recorded at REL-001.

There is no mandatory old-system parity audit, data import or cutover in these gates. Any later import or domain takeover needs a separately scoped plan and explicit authorization; leave existing systems untouched during this clean build.

## 9. Task record

Record in tasks.md, not another report:

```text
Task and requirement IDs:
Commit tested and behavior changed:
Commands -> actual results:
Environment/provider/dataset:
Browser/device/viewport/locale:
Persisted effects and evidence identifiers:
Reviewer decision and exceptions:
Limitations / next ready work:
```

References for implementation: [Playwright baselines](https://playwright.dev/docs/test-snapshots), [Next.js/Vitest](https://nextjs.org/docs/app/guides/testing/vitest), [Core Web Vitals](https://web.dev/articles/vitals), [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions). Only recorded Treido results establish acceptance.

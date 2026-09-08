# Verification and acceptance

This file owns HOW work is proved. [requirements.md](requirements.md) defines behavior; [design.md](design.md) defines reference/brand approval; [tasks.md](tasks.md) records actual results. A document, installed dependency, rendered route or green compile is not a completed product.

## 1. Evidence contract

Every completed task records its requirement IDs, exact commit under test, commands and exit results, environment/provider mode, dataset/fixture version, and relevant browser/device/viewport/locale. Include observed persisted effects, screenshots/recordings or trace identifiers, open limitations and reviewer outcome. Public evidence is sanitized; private assets/logs are identified without exposing tokens or customer data.

Distinguish unit/simulated provider, actual PostgreSQL, sandbox provider, physical device, hosted preview and production evidence. A result in one does not establish another. Missing credentials, assets, providers or devices mean BLOCKED/NOT RUN for the affected check. Continue independent work. Skipped tests, empty suites and successful sign-in redirects are not proof of authenticated features.

Use the selected lockfile and isolated state per worker. Tests must not rely on a previous test's orders. Preserve reproducible failures and fix flakiness instead of retrying until green.

## 2. Checks by change type

| Change | Required proof |
| --- | --- |
| Documentation | Relative links/paths, requirement/task references, dependency graph, consistent ownership/status, and secret/private-data review. |
| Stack setup | Clean install, compatibility checks, lint/typecheck/unit imports, production web build, Expo doctor/dependency checks/export; native development builds separately. |
| UI/interaction | Actual browser/device inspection, source or approved-baseline comparison, keyboard/back/focus/scroll, loading/empty/error states, BG/EN and responsive checks. |
| Database/domain | Unit tests AND real PostgreSQL integration, relevant constraints, concurrency/retry races and persisted effects. SQLite/mocks are not PostgreSQL locking proof. |
| HTTP/auth | Input/output contracts, missing/invalid auth, resource permissions, cross-tenant attempts, revoked/stale context, limits and error semantics. |
| Provider | Unit fault injection AND actual sandbox callbacks/retry/reconciliation in the correct mode. Live activation is separate. |
| Native | Native component/interaction checks, build/device evidence, iOS/Android journeys, secure session/lifecycle/deep links. Browser emulation is not native proof. |
| Release/migration | Complete requirement disposition, hosted configuration, migration/restore rehearsal, security/performance, owner GO, exact artifact and rollback. |

The command interface is in `techstack.md`; bootstrap implements it. CI must not hide absent scripts behind `--if-present`, `continue-on-error` or empty-suite success. Expose unavailable platform checks as explicit release blockers, not green jobs.

## 3. Golden buyer-to-merchant transaction

Run with synthetic actors/products and non-production providers. Prove both clients consume one commerce truth.

1. Merchant A creates a listing, variants and eligible fulfillment. Publication rejects missing required facts.
2. Buyer discovers the published product on web/native with accurate variant/unit/price/availability.
3. Visitor adds items and signs in; selection survives, carts merge under policy, and another user cannot access it.
4. Buyer obtains a server quote and confirms with an idempotency key. Tampered quantities/totals do not become authority.
5. Sandbox payment completes, including challenge/return where applicable; verified provider evidence reconciles order state.
6. Merchant receives the tenant-scoped order and allowed actions. Merchant B cannot view/change it.
7. Fulfillment progresses; both buyer clients show the same timeline and correct inventory effects.
8. Extend the same fixture to recovery, verified reviews, chat and notifications as those feature tasks complete.

**G2/FLOW-001 covers steps 1-7 and applicable stock/payment/idempotency/authorization failures.** Step 8 is required before its corresponding features are complete, not before initial scaffolding. The first slice may use one merchant/variant; approved multi-seller grouping and weighted/increment quantities are mandatory extensions before BUY-007/MER-005 and full product acceptance. This keeps an early proof distinct from a full-feature claim.

## 4. Critical failure matrix

The owning feature task implements reproducible tests for applicable cases. A copied checklist is not evidence.

| Boundary | Minimum failures/races |
| --- | --- |
| Stock | Two buyers compete for last quantity; expired lot; adjustment races reservation; release/consume retries; expiry races payment success; no overselling/double restoration. |
| Cart/quote | Price/publication/variant/fulfillment/address changes; invalid/repeated/missing quantities; guest merge conflict; removed product; currency mismatch; explicit requote/rejection. |
| Idempotency | Concurrent repeated request/key; changed request with same key; crash after provider acceptance; client timeout/recovery; no duplicate order/charge. |
| Payment events | Invalid signature, duplicates, out-of-order/delayed callbacks, provider timeout/rate limit/unavailability, cancellation-vs-capture/refund; durable replay/reconciliation. |
| Refunds | Approved amount/item/seller/fee allocation, repeated request, provider success then local failure, fulfillment restrictions; unsupported partial flow blocked honestly. |
| Authorization | Buyer A accesses B; merchant A guesses B's IDs; membership downgrade/removal/suspension; stale business tab/cache; merchant attempts admin; alternate file/export/chat endpoints. |
| Identity | Duplicate/out-of-order webhook, login provisioning race, deleted identity, expired native session, logout/recovery; no duplicates or resurrected privileges. |
| Messaging | Double send, dropped connection, replay, removed/blocked recipient, unauthorized attachment, cursor race, expired subscription; delivery distinct from read state. |
| Notifications/jobs | Retry/deduplication, expired lease, abandoned work, preference changes and delivery failure; no lost important event or notification storm. |
| Environment | Wrong/missing credentials, fixture mode in release, native localhost/sandbox origin, wrong DB target, unsigned job trigger; fail closed. |

External effects use sandbox/sinks. A test task does not authorize contacting real customers or refunding real payments.

## 5. Visual, interaction and accessibility evidence

Source comparison and approved-baseline regression are separate checks under `design.md`. Match actual source content viewport/density; record rather than invent measurements. Control fixture data/time/images/fonts and rendering versions. Check changed routes and shared component consumers.

Web regression coverage includes 320, 360, 390 and 430 CSS-pixel widths, relevant landscape, and at least 768, 1024 and 1440 tablet/desktop widths. Source matching uses its separately recorded viewport. Test important mobile-web journeys on actual iOS Safari and Android Chrome; Playwright WebKit does not substitute for a physical iOS Safari result.

Native checks cover the approved iOS device class and Android adaptation, smaller/larger screens, safe areas, platform back, text scaling, keyboard, background/resume and poor connectivity. Use installed builds, not just Expo web/Go.

Verify semantic labels, keyboard operation, visible focus, focus containment/return, contrast, reduced motion and text expansion, including 200% web text sizing. Add screen-reader spot checks for core journeys. Record and verify an accessibility target against current standards before release. Reference similarity cannot justify an inaccessible control.

Baseline updates are explicit reviewed design changes, never normal CI. Masks must not hide the UI defect under review. Reference gaps have decisions, not silently larger thresholds. Reference approval and brand approval belong to the owner/design reviewer.

## 6. Performance acceptance

Do not blame a starter, monorepo or library without traces. Separate local cold compilation, deployed cold/warm request and in-app navigation. Use production builds and realistic synthetic data; record CPU/network/device/cache/region/provider conditions.

Browser targets: **LCP <= 2.5s, INP <= 200ms and CLS <= 0.1 at the 75th percentile**, segmented by mobile/desktop and meaningful route groups once sufficient real-user data exists. These are targets, not Treido measurements. Before real traffic, use repeatable lab checks and interaction traces; a Lighthouse run is not field INP acceptance.

BOOT-003 establishes the measurement harness and baseline only for implemented routes. **Before FLOW-001 approval**, measure populated home/search/product/cart/checkout and merchant queue, and record provisional server/API and native startup/interaction budgets with conditions. Repeat at QUAL-001. Do not use empty scaffold timings as populated-product performance. Budget changes require evidence/review.

Inspect initial JavaScript, image sizes/transfer, blocking work, provider/auth calls, query count/duration, cache hits, TTFB and navigation responsiveness. No merchant chart/map/editor dependency in the initial buyer path without need. Core navigation stays useful while personalization loads. A skeleton is feedback, not proof of improvement.

Use bounded, authorized non-production load tests. Never stress live payments/orders. Native metrics are measured on native devices; browser Core Web Vitals are not native startup metrics.

## 7. Gates

| Gate | Requires | Does NOT establish |
| --- | --- | --- |
| G0 Foundation | BOOT-001..004 and CONTRACT-001: compatible stack, commands, isolation, CI, declared web/native build/startup proof | Complete features, full-route performance, design or production readiness. |
| G1 Reference contract | REF-001 plus source/route inventory and explicit exceptions | Implemented fidelity. |
| G2 Commerce slice | FLOW-001, real DB/sandbox, web/native/merchant and applicable failure evidence | All features or reference screens. |
| G3 Reference approval | REF-005, all frozen reference-required flows/states reviewed on declared targets and exceptions approved | Treido branding or rights to publish source assets. |
| G4 Treido design | BRAND-001 after G3, branded/food-adapted UI reverified | All remaining merchant/admin/provider acceptance. |
| G5 Product/source | All required feature dispositions/checks, device/responsive/security/performance evidence and migration rehearsal | Production authorization. |
| G6 Release | REL-001, owner GO, exact production artifact/configuration, migration/provider/recovery plan and hosted verification | Guarantee against future defects. |

Independent backend/merchant work need not wait for source assets. Branding must. Gates are acceptance boundaries, not a ban on valid parallel work. A restricted pilot has explicit limitations and cannot masquerade as full G5 completion.

## 8. CI and operational release

Initial CI runs a frozen-lockfile install; lint/format/typecheck/unit/contracts; built-web smoke and disposable PostgreSQL integration; Expo dependency/export checks. Add approved visual/device checks as features arrive. Public/fork PR jobs receive no live secrets. Review artifact contents/access/retention because the repo is public.

Before deployment verify credential roles, target project/region, provider environments, private storage, signed callbacks/jobs, limits, tracing and alerts. No DB writes during build. Confirm private cache isolation and that fixture/test endpoints are unavailable in release.

Before cutover prove migration/restore/recovery, ownership of in-flight transactions and fallback compatibility. Preview artifacts can embed sandbox public keys/API origins; do not promote blindly. Verify the exact production-targeted artifact and native configuration. DNS, live callbacks, billing and store actions require separate authorization and an operator record.

## 9. Completion record

Record in `tasks.md`, not another report/backlog:

```text
Task / requirement IDs:
Commit tested:
Changed boundary:
Environment and provider mode:
Commands -> actual results:
Browser/device/viewport/locale:
Data fixture and persisted effects:
Evidence IDs / approved exceptions:
Reviewer decision:
Limitations / next ready task:
```

All gates are initially unverified. Publishing these documents completes none of G0..G6.

## Primary references

[Playwright visual comparisons](https://playwright.dev/docs/test-snapshots), [Next.js Vitest guidance](https://nextjs.org/docs/app/guides/testing/vitest), [Core Web Vitals thresholds](https://web.dev/articles/vitals), [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/), [Prisma transactions](https://www.prisma.io/docs/orm/prisma-client/queries/transactions). These describe mechanisms; acceptance is the recorded Treido evidence.

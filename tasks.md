# Numbered execution tasks

Say **"Execute Task 1"**, **"Execute Task 2"**, or **"Continue Task 3"**. The agent reads the matching task below and implements its work package. You do not need to paste another long prompt, translate internal task codes, or direct individual file edits.

[product.md](product.md) defines the features. [design.md](design.md) defines the frontend. [architecture.md](architecture.md) and [techstack.md](techstack.md) define implementation boundaries and tools. [AGENTS.md](AGENTS.md) defines execution; [verification.md](verification.md) defines the checks at the end of a batch.

## How execution works

Task numbers are stable. Follow numerical order by default. A task is a coherent batch, not one component or one file. Read its listed sources, inspect current work, use relevant skills/plugins/official CLIs, implement the batch, then run its closing checks. Do not stop after each small edit to rerun the full test suite or request permission for the next component.

Write tests with the behavior where useful; run focused checks when debugging and run the specified batch checks before declaring the task done. Broad product regression is Task 12. Immediate environment/permission checks before consequential operations still apply; batching is not permission to perform unsafe writes or postpone payment/tenant correctness until release.

If a task exceeds one session, record finished portions, remaining work and check results under that same task. `Continue Task N` resumes there without replanning or creating another backlog. Internal steps such as 5.1 and 5.2 are progress markers, not additional assignments the owner must manage. Do not mark a whole task done for partial work.

Execute the requested task, not the entire roadmap. Report a missing prerequisite rather than silently executing a different task. Independent preparation in Task 2 can run during Task 1 when requested, without conflicting edits. Missing source assets do not block installation; missing payment policy does not block discovery UI. An agent can complete available portions but must label missing evidence and approvals.

## Current state and index

Task 1 is implemented and locally verified. Task 2 has a partial source inventory and concrete product/operations proposals for review; browser screens/flow images are accessible and source mapping can continue. Work is directly on `main` per the owner's 2026-09-08 instruction. Both apps contain only neutral bootstrap screens; no product frontend or provider integration has started. This numbered list is the only active task queue.

| Task | Work package | Deliverable | Status |
| --- | --- | --- | --- |
| 1 | Initialize the stack | Runnable Next.js/Expo workspace and basic checks | Done |
| 2 | Specify Shop and product details | Source-mapped screens/flows, catalog and operational decisions | In progress (browser mapping) |
| 3 | Build Shop discovery frontend | Working shell, home, search, storefront and product UI | Not started |
| 4 | Build data, identity and catalog | Real isolated backend, native API, authentication and basic merchant publishing | Not started |
| 5 | Build the complete purchase journey | Real cart, checkout, orders, fulfillment and approved recovery on web/native | Not started |
| 6 | Complete and review the Shop frontend | Remaining buyer/account states and full declared reference review | Not started |
| 7 | Adapt the approved frontend to Treido | Treido branding and food content on the same components | Not started |
| 8 | Build the full merchant workspace | Bulk tools, inventory operations, finance, teams and storefront settings | Not started |
| 9 | Build communication, trust and administration | Real chat, notifications, reviews, support and admin workflows | Not started |
| 10 | Build Premium and AI | Working subscriptions, entitlements and permissioned copilots | Not started |
| 11 | Build partner operations and promotions | Configured supplier/delivery/driver and promotion workflows | Not started |
| 12 | Verify and optimize the complete product | Full functional, visual, security, performance and device regression | Not started |
| 13 | Prepare and rehearse release | Tested deployment, backup/restore and recovery procedures | Not started |
| 14 | Release the authorized artifacts | Approved hosted release and native submissions, verified separately | Not started |

Statuses: Ready, Not started, In progress, Blocked, Review, Done. A task with implemented code but missing required checks/approval is Review or Blocked, not Done. Record the precise reason; do not label the whole project blocked. Visual fixture approval and live feature acceptance are distinct results.

## Task 1 - Initialize the stack

**Prerequisites:** None; no old repository, Mobbin access or provider account required.

**Read:** README.md, AGENTS.md, techstack.md sections 1-4, architecture.md sections 1-2; skim product.md/design.md to understand the target, not to start styling it.

**Execute:** Use relevant Next.js, Expo, Turborepo and tooling skills, then official CLI generators inside `apps/web` and `apps/mobile`. Resolve supported compatible versions, pin them, use one pnpm lockfile and private workspace manifests. Add shared contracts/tokens only with real smoke-test consumers. Set up strict TypeScript, ESLint/Prettier, minimal CI, ignores and safe placeholder env examples. Remove demo screens, use a neutral labeled bootstrap shell, and establish the Task 1 scripts in techstack.md. Record exact versions and commands there once. Do not hand-build a framework scaffold or install every future provider SDK.

**Check at batch end:** Frozen-lockfile clean install; lint/format/typecheck and meaningful import/contract unit tests; production web build and one browser smoke inspection; Expo dependency/doctor checks and iOS/Android JavaScript exports. Check client-safe imports and React/native module resolution. Export is not native OS compilation. Do not require database, payment, visual-regression or device-release suites yet.

**Done when:** Both clients have a runnable foundation, all available required checks pass and actual commands/versions are recorded. Stop before feature work; next is Task 2.

**Task 1 - Done (local foundation, 2026-09-08).** Started from freshly cloned/fetched/fast-forward-checked `fc6a36504923423c461aaf40ab9b9df981e641e4` in `J:\treido-bg`; implementation branch `codex/task-1-foundation`.

Built: official Next/Expo scaffolds, exact compatible versions recorded in techstack.md, one pnpm lockfile/workspace, shared client-safe Zod locale contract consumed by both apps, strict TypeScript, platform ESLint rules plus server-import restrictions, Prettier, meaningful contract/module-resolution/doc-link tests, production browser smoke, minimal CI and safe env examples. Root/app agent instructions require version-matched Next/Expo docs. Current official Next workflow skills installed globally. No shared design-token package or shadcn primitives without a measured consumer; no product UI or provider SDKs.

Batch evidence (Windows, Node 24.20.0 / pnpm 12.3.4):

- `pnpm install --frozen-lockfile` in a fresh index-materialized `.local/task1-clean-install` copy with no node_modules: passed; same frozen lockfile. Fresh-copy `pnpm test:unit`: 14 passed.
- `pnpm check`: lint, format, all three workspace typechecks and 14 contract/import/doc-reference tests passed. Tests verify both clients and renderers resolve one React instance and Router shares the native modules.
- `pnpm build:web`: production Turbopack build passed; `/` prerendered.
- `pnpm test:smoke:web` with `PLAYWRIGHT_CHANNEL=chrome`: 1 passed at 390x844; expected title/content/language, no overflow and no console/page/resource errors. Fixed the initial favicon 404. Screenshot inspected at ignored `test-results/bootstrap-mobile.png`.
- Agent-browser 0.37.1: inspected the exact owned production listener on `127.0.0.1:3100`, captured `.local/bootstrap-desktop.png` and confirmed the neutral bootstrap route. Browser and temporary production server stopped after verification.
- `pnpm native:check`: Expo dependency validation passed, Expo Doctor 21/21 passed, iOS (1197 modules) and Android (1332 modules) Hermes/JavaScript exports passed. These are not native OS builds or installed-device tests.
- Independent read-only integration review found no actionable Task 1 blockers. `git diff --check` passed.

Limitations: GitHub Actions is configured but not run on GitHub; no push/deploy, provider/database changes, native signing/build/device verification or source-fidelity approval. ESLint 9 and transitive uuid emit upstream deprecation notices; Expo/Node may emit color/ESM-extension warnings. No peer failures are suppressed. The autogenerated demo files were preserved in ignored local storage after automatic deletion approval was rejected.

Commit pointer: the local commit titled `Initialize verified Next.js and Expo foundation` on `codex/task-1-foundation` contains this record and all Task 1 changes. Next/resume: **Execute Task 2** to inspect the exact selected Mobbin capture and map/review the source and product decisions. **Stop here:** no Task 2 mapping or Task 3 frontend implementation has been performed. Use bounded subagents for the later mobile-first source-matched UI work, with one writer per shared component/configuration.


## Task 2 - Specify Shop and product details

**Prerequisites:** None for inspection. Authorized reference access and owner decisions are required for their respective approvals; do not invent them.

**Read:** product.md sections 2-8 and design.md. Use Mobbin/authorized browser tools, available design skills, current provider documentation for technical feasibility, and old project examples only when they answer a specific question.

**Execute three deliverables in the existing owning documents:**

- **Reference:** Inspect the selected Shop capture and recordings. Map source screens, states, transitions, content viewport, typography, geometry, navigation and platform differences. Cover discovery through checkout/account/orders/support; mark Treido-specific screens explicitly. Record the exact first discovery slice needed by Task 3 and get its scope reviewed.
- **Catalog and operations:** Propose and record BG/EN food hierarchy, attributes, units/packages, quantity precision/minimum/increment, publication requirements, merchant/admin navigation and representative operational states. Separate later partner activation details from core catalog decisions.
- **Commercial policy:** Resolve DEC-002 with fee/rounding and multi-seller payment/order/fulfillment/refund examples; record selected methods and sandbox plan. Propose unanswered values for owner review rather than reading unstated requirements into old code. DEC-004 release/business approvals and DEC-005 service choices can be completed when their features need them.

**Check at batch end:** Review the reference/requirement coverage and numerical policy examples; identify exactly which deliverables are approved or still missing. No application suite is required for a documentation-only batch.

**Done when:** Required reference and core catalog/commercial/operational decisions are recorded and reviewed. Task 3 may start once the reference slice is ready even if commercial approval is pending; Task 4 needs the catalog contract; Task 5 needs the approved commerce contract. Do not make the owner wait for unrelated partner details before discovery work.

**Task 2 - Review (browser source mapping, 2026-09-08).** Per the owner's request, safely fast-forwarded local `main` to foundation commit `3ea7bbaf3c0e3f1f788c7b6cbeb5d66e55fc0cd5`. AGENTS.md now requires main-only work. The historical foundation branch contains no separate pending implementation; no push/deploy was performed.

Prepared: design.md records the exact selected 323-screen capture, 11 inspected highlighted stills with canonical screen URLs, the private ordered source archive, UI Elements taxonomy evidence, Flows catalogue evidence and proposed first discovery slice. The archive contains 323/323 separate source-screen files (307 images, 16 videos), 97 flow cards and 424 separate flow occurrences; one flow occurrence is explicitly unresolved because its exact page-assets media was not supplied, and no substitute was used. It also proposes merchant/admin navigation and representative operational states. product.md sections 5-6 contain proposed BG/EN taxonomy, attributes, units/quantity/publication gates, partner activation rules and detailed multi-seller fee/refund examples. All unapproved product/design choices are explicitly proposals.

Batch checks: source/requirement coverage reviewed against the accessible stills and ordinary browser catalogue routes; numerical examples independently checked with integer-cent assertions (single/discounted/boundary/multi-seller charge, allocation, sequential/full refunds and weight/volume examples), all passed. The private indexer `node .local/shop-reference/7b6adbde-de48-47c5-979b-f629f1eb87a9/build-index.mjs` reports 323/323 source screens complete with no duplicate IDs/files/hashes, 307 images decoded, 16 videos byte-validated, 97/97 flow cards, 423/424 acquired flow frames and 1 explicit unresolved flow occurrence; it exits non-zero to keep that known gap visible. `pnpm exec vitest run tests/workspace.test.ts -t 'keeps the owning'`: owning-document relative-link test passed, three unrelated resolution tests skipped. `git diff --check`: passed. No application suites were rerun.

Remaining: owner/design review of the captured discovery slice and proposed catalog/operations/commercial decisions; visual screen-by-screen review; measured typography/geometry/content viewport; complete interaction, transition, playback and platform mapping; and resolution or explicit acceptance of the one missing flow occurrence. The source archive is evidence for the selected capture, not source/brand approval or proof of web/Android/desktop parity. The connector's paid-plan error and upgrade banner were not treated as a browser blocker; no upgrade or download-all action was used.

Commit/worktree: initial preparation is in `793ef22`; the commit titled `Correct Mobbin browser access findings` records the browser verification and removes the unsupported access blocker. The current capture/archive and documentation changes are on local `main` pending the final local commit; no push/deploy. Continue Task 2 for review and approval before implementing discovery components. No UI-writing helpers have been launched for this source-only batch.

## Task 3 - Build Shop discovery frontend

**Prerequisites:** Task 1; Task 2's approved discovery reference. No completed backend required.

**Read:** design.md sections 1-4; product.md BUY-001 through BUY-005; architecture.md sections 1, 2 and 6. Use web/native UI skills, measured reference assets and browser/device inspection tools.

**Build the whole batch:** Source-measured tokens and primitives; buyer shell/navigation; home shelves/cards; search and discovery/filter/sort states; storefront; product images/options/quantity/add feedback; sheets and back/scroll behavior. Build the web/mobile-web and native presentation with a reviewed desktop/Android adaptation. Use deterministic, visibly isolated reference data through client-safe contracts. Navigation and local state must work, not just look correct. Mark an add-to-cart sample as a reference interaction, not a server-persisted purchase. Implement in the canonical routes/components that later receive real data.

**Check at batch end:** A connected home -> search/store -> product -> back journey; compare the changed screen set against source; check keyboard/safe areas and the relevant viewports; scoped lint/typecheck and UI/interaction tests. Use native tooling available and explicitly record unavailable native proof. No payment or full-platform suite. Iterate within the batch without rerunning all checks after each card edit.

**Done when:** The declared discovery slice works and its comparison/limitations are recorded. No Treido rebrand, duplicate demo frontend or unmeasured replacement layout. Next: Task 4.

## Task 4 - Build data, identity and catalog

**Prerequisites:** Task 1; Task 2's approved catalog contract; authorized fresh development database/auth configuration. Task 3 supplies the UI consumers; backend work need not wait for missing unrelated reference assets.

**Read:** product.md ACC-001/ACC-003, BUY-002 through BUY-006, MER-001/MER-002/MER-004; architecture.md sections 2-5 and 7; techstack.md data/identity/native API instructions. Use database, Clerk, Next.js/Expo and contract skills as applicable.

**Build the whole batch:** New user/business/membership schema and development auth; explicit context/permission functions; secure native session and `/api/v1` identity contract. Prove web/native identity connectivity early in this batch. Then add product/variant/publication, exact quantity and inventory records, paginated catalog DTOs and synthetic seeds. Implement real search/filter/sort, storefront and map/location reads with category facets, eligibility and a BG/EN typo/synonym/transliteration query set; do not leave discovery backed by mock search. Build the basic merchant setup/editor/publish/inventory screens under their own reviewed layout. Connect Task 3's same components to real catalog data; no silent fixture fallback. Set up real PostgreSQL tests and a production-build browser harness as needed.

**Check at batch end:** Schema from migrations on verified disposable PostgreSQL; publishing and persisted catalog visibility on web/native; cross-user/business/revoked-role failures; quantity/constraint/concurrent inventory tests, search relevance/filter/sort/pagination and location-denied cases; affected build/typecheck and browser/API integration. Exercise secure sessions, deep links and device API origins in actual authorized iOS/Android development builds; unavailable platforms stay explicitly unverified. Do not demand a release signing/submission result.

**Done when:** Real identity/catalog/publishing works, client-safe boundaries hold and required checks pass. Missing device/provider proof is not a reason to replace functioning code with mocks. Next: Task 5.

## Task 5 - Build the complete purchase journey

**Prerequisites:** Tasks 3 and 4; Task 2's approved checkout/recovery policy and corresponding Shop screens; authorized sandbox providers.

**Read:** product.md BUY-006 through BUY-009, MER-005, sections 4-5; architecture.md inventory/checkout/orders/API; design.md transaction flows; verification.md failure matrix. Use payment/database/auth and web/native interaction skills.

**Build the whole batch:** Guest/cart persistence and deterministic sign-in merge; cart quantity/removal and stale-state recovery; address/pickup/fulfillment selection; server quote; idempotent order/reservation/payment flow; verified webhook ingestion, replay/reconciliation and timeouts; buyer order history/detail/timeline; merchant order queue and allowed fulfillment actions. Implement initial reference-matched cart/checkout/order screens for both clients using existing components. Add the approved cancellation/refund/issue workflow with durable allocation/state, not a fake button. An initially simplified fixture is not the final multi-seller contract.

**Check at batch end:** Full merchant-publishes -> web/native buyer-purchases -> merchant-fulfills journey on real PostgreSQL and sandbox payment; last-stock competition, quote changes, same-key retries, interrupted payment return, duplicate/out-of-order callbacks, unauthorized access and approved refund/cancel races/allocations. Test weighted and multi-seller cases. Measure populated discovery/checkout/order paths once as the initial performance baseline. Do not defer money/inventory correctness to Task 12.

**Done when:** The new transaction and approved recovery work end to end with persisted evidence. Provider request success alone is not a completed order. Next: Task 6.

## Task 6 - Complete and review the Shop frontend

**Prerequisites:** Tasks 3-5 and Task 2's complete frozen reference coverage. The full source comparison requires the declared platform evidence.

**Read:** design.md sections 3-5; product.md BUY-001 through BUY-010, ACC-001 through ACC-003, COM-001/COM-002 and NAT-001/NAT-002.

**Build the whole batch:** Finish all remaining reference states: account, saved items, addresses/preferences, purchases, empty/error/loading, notification/inbox/support entry where present, and all recorded navigation/overlay variations. Implement real profile/address/saved/preferences, sessions/recovery, account-removal request, receipts and enabled provider-managed payment-method views, plus selling entry on the established identity backend. Keep purchase screens connected to Task 5. Communication service states not yet implemented may use explicitly isolated fixtures for source review; document that Task 9 owns their real delivery. Every reference row receives evidence or a named, approved platform/Treido-specific exception.

**Check at batch end:** Review the entire frozen screen/flow set against source in batches; run affected UI/account tests and a transaction regression after shared-navigation changes. Check required small/large widths, long copy, safe areas, keyboard/back/scroll and declared native platforms. Do not approve only a homepage or auto-update screenshots to make failures disappear.

**Done when:** Scope/evidence/commit and accepted exceptions are explicitly approved by the owner/design reviewer. Otherwise status is Review. This approval is a visual/interaction milestone, not a claim that fixture-only communication is functional. Task 7 requires this recorded approval.

## Task 7 - Adapt the approved frontend to Treido

**Prerequisites:** Task 6's explicit source approval; Task 2's approved food content; approved brand values.

**Read:** design.md section 6, product.md section 5. Use UI/accessibility skills and the same components/tokens.

**Build the whole batch:** Apply Treido identity and green/yellow/red roles, neutrals and accessible states; replace reference content with approved food categories, producers, owned media and BG/EN copy. Place food units, minimums, fulfillment and fees without concealing commercial facts. Keep approved geometry and interactions unless a specific change is approved. Remove reference marks and restricted assets from release paths; do not create a second theme or alternate homepage.

**Check at batch end:** Review the complete adapted buyer screen set, long/localized food content, accessibility and shared navigation; run relevant visual/UI and purchase regressions once. Record brand review and any explicit exceptions.

**Done when:** The owner/design reviewer approves the adapted UI and the affected behavior still works. This does not complete remaining service/dashboard tasks. Next: Task 8.

## Task 8 - Build the full merchant workspace

**Prerequisites:** Tasks 4-5 and Task 2's reviewed merchant design. Default sequence is after Task 7; it can proceed independently of pending buyer brand review when expressly assigned.

**Read:** product.md MER-001 through MER-008, ACC-003 and daily merchant journey; architecture.md permissions, inventory, finance and files; design.md section 7.

**Build the whole batch:** Extend the existing basic dashboard, not a replacement: complete catalog/media editors, bulk import/export with row errors, locations/lots/expiry and auditable adjustments, configured fulfillment, operational queues, customer/order context, storefront management, business settings, team invitation/removal/roles, and traceable sales/refund/fee/cost/profit/payout views. Unknown cost stays unavailable. Use the existing order/recovery rules and stable interfaces for Task 9's messaging, not pretend-live chat.

**Check at batch end:** Merchant publishes/edits/imports -> adjusts stock -> processes/reconciles orders -> manages team/store; test import atomicity, financial definitions and cross-tenant/export/file access on real data. Check desktop and urgent mobile-web workflows, affected suites and buyer catalog/order regressions.

**Done when:** Declared merchant operations work with real records and permissions; missing messaging/Premium/AI is explicitly owned by Tasks 9-10. Next: Task 9.

## Task 9 - Build communication, trust and administration

**Prerequisites:** Tasks 5, 6 and 8; approved DEC-005 delivery choices for the implemented paths.

**Read:** product.md COM-001/COM-002, BUY-009/BUY-010, MER-006/MER-008 and ADM-001; architecture.md communication/outbox/authorization/files; existing reference and operational designs.

**Build the whole batch:** Durable authorized conversations, private attachments, send/retry/reconnect/read state and blocking; in-app/email/push notifications and preferences; verified reviews/replies; seller/product/report moderation; support/commerce exception queues and privileged operator actions. Choose required managed delivery/worker tools using current skills/docs and measured constraints. Connect the previously built screens. The outbox/payment replay foundation is extended, not replaced or duplicated.

**Check at batch end:** Buyer/merchant live exchange on declared clients, reconnect/dedupe/blocking/private-file failures; actual sandbox/sink notification delivery and deep links; eligibility/moderation and admin-permission tests; repeat a purchase/issue journey. No testing against real customers.

**Done when:** Communication/trust/support/admin controls operate on real authorized data and their required provider/device evidence exists. No production fixture fallbacks remain for these features. Next: Task 10.

## Task 10 - Build Premium and AI

**Prerequisites:** Tasks 8-9; approved billing prices/limits and supported model/provider configuration.

**Read:** product.md MER-009/MER-010 and commercial rules; architecture.md finance/AI/auth and provider boundaries. Use relevant billing, AI SDK, structured-tool and UI skills.

**Build the whole batch:** Free/Premium subscriptions, configured entitlements/portal/invoices, lifecycle/downgrade/retry behavior; listing/photo/translation assistance, operational summaries, metric-backed analytics/inventory answers and reply drafts. Use the established permissions, queries and commands. Require human approval for consequential writes; bound cost/time and provide useful unavailable/error states. Do not make normal commerce depend on AI or Premium.

**Check at batch end:** Sandbox billing lifecycle and server entitlement tests; deterministic permission/tool/approval/failure tests plus a bounded authorized live-model smoke; wrong-business/prompt-injection cases and cost accounting. Verify underlying commerce still works when billing/AI is unavailable.

**Done when:** Configured billing and all declared AI jobs work within their explicit permissions and evidence limits. Next: Task 11.

## Task 11 - Build partner operations and promotions

**Prerequisites:** Tasks 5, 8 and 9; approved partner workflows and promotion commercial configuration from product.md.

**Read:** product.md section 6, OPS-001 through OPS-003 and ADM-002; architecture.md permissions, orders and reporting. No old-route inventory is required.

**Build the whole batch:** Authorized supplier relationships; eligible pickup points/scheduled runs/capacity and dispatch; least-privilege driver assignment/handoff/delivery/exception states; promotion eligibility/scheduling/management/disclosure and truthful attribution. Do not invent a nationwide logistics or advertising network. Use shared order/fulfillment records and reviewed operational UI.

**Check at batch end:** Assigned versus unassigned partner access, capacity/fulfillment conflicts, repeated delivery updates and canonical tracking; tenant-safe promotion management, scheduling/disclosure/attribution and discovery integration. Run relevant order/catalog regressions.

**Done when:** The specified operations work, commercial activation is approved where needed and no false delivery/promotion claims are shown. Next: Task 12.

## Task 12 - Verify and optimize the complete product

**Prerequisites:** Tasks 1-11 completed for the declared full-product scope, including source and brand approvals. A restricted pilot requires a separate explicit scope, not secretly skipping tasks.

**Read:** verification.md in full; all product.md requirement IDs; approved design scope; actual stack and architecture. Use browser/device, performance, security and database skills/tools.

**Execute a consolidated quality batch:** Run full unit/contract/PostgreSQL/web/native suites, populated visual/responsive/accessibility/BG-EN checks, provider faults/reconciliation, signed-out/buyer/business/merchant/admin/partner permissions and supported API-version compatibility. Exercise real installed iOS/Android builds, lifecycle/deep links/offline recovery. Profile production builds and fix measured query/asset/client/rendering problems without a framework rewrite. Complete any cross-cutting acceptance not proven in earlier tasks.

**Done when:** Every declared requirement maps to working code and appropriate evidence; critical failures are fixed; accepted residual issues and actual field/lab/native performance scope are recorded. Missing device or provider checks are not green results. No release is implied. Next: Task 13.

## Task 13 - Prepare and rehearse release

**Prerequisites:** Task 12; authorized non-production resources and proposed release targets.

**Read:** verification.md release/recovery sections, architecture.md section 7, product.md DEC-004.

**Execute the batch:** Write the environment-specific runbook, validate least privilege and configuration, rehearse fresh-schema install/forward migrations and backup/restore, simulate interrupted provider operations and recovery, verify compatible application rollback, prepare exact web/native artifacts and sanitized monitoring/support procedures. Confirm no fixture endpoints, sandbox keys/origins or restricted assets enter release artifacts. Record target-specific approvals still needed. Any import of real existing data or domain takeover is separate authorized scope.

**Check at batch end:** Rehearsed deployment/recovery on isolated targets, old/new API-client compatibility, build-time public configuration, delayed payment reconciliation and alert checks. Code rollback and database restoration are not interchangeable.

**Done when:** The exact release candidate, runbook, rollback/reconciliation and outstanding authorizations are documented and verified. No live activation yet. Next: Task 14.

## Task 14 - Release the authorized artifacts

**Prerequisites:** Task 13 plus explicit owner approval of exact artifacts, environments and consequential actions. A generic "execute Task 14" does not identify or authorize unknown live payment/DNS/store targets.

**Read:** The Task 13 runbook, product.md DEC-004 and verification.md release rules.

**Execute the batch:** Carry out only the approved release steps for the new web application and separately authorized native builds/submissions. Verify hosted identity, order/payment/fulfillment behavior, enabled callbacks/jobs, monitoring and recovery readiness. Stop or follow the approved recovery path if a required check fails. Do not touch old systems or transfer real data unless specifically included in the authorization.

**Done when:** Hosted outcomes and native submission/store status are reported separately against exact artifacts and targets. Submission is not store approval. Record any platform still pending rather than declaring an unbounded global launch.

## Coverage and progress records

Requirement IDs stay in product.md; task numbers are execution packages, not duplicate feature definitions. Cross-cutting native and quality requirements apply throughout and close in Tasks 12-14. In particular, NAT-001/NAT-002 close through Tasks 3-6/9/12, NAT-003 through Tasks 12-14, and QUA-001 through Tasks 1/4/12-14. All other requirement IDs are named in their owning task reads.

Task 1 evidence is recorded under its owning task. Add one concise record below each subsequent active task or here; do not paste entire logs or create another handoff file:

```text
Task N - In progress / Review / Blocked / Done
Built: ...
Remaining/resume point: ...
Batch checks: command -> result; environment/device and evidence pointer
Approval or blocker: ...
Commit/worktree: ...
Next: Task N or Task N+1
```

The next user prompt can be just: **Continue Task 2.**

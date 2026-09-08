# Design and reference acceptance

This document owns visual and interaction decisions. [requirements.md](requirements.md) owns product behavior; [verification.md](verification.md) owns the evidence method. **The owner's sequence is reference fidelity first, Treido branding and food terminology second.** A beautiful approximation is not approval.

## 1. Reference identity and current evidence

Selected source: [Shop iOS capture on Mobbin](https://mobbin.com/apps/shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d/7b6adbde-de48-47c5-979b-f629f1eb87a9/screens).

- App collection ID: `shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d`.
- Selected capture ID: `7b6adbde-de48-47c5-979b-f629f1eb87a9`.
- Platform: iOS reference; actual device, OS, app version, screenshot dimensions, date and complete flow inventory still require capture verification.
- Evidence state: the URL is owner-selected. The complete selected screen/interaction set has NOT been inspected or approved in this repository. No dimensions, fonts, timings or screenshot IDs are asserted here.

A free website preview does not establish connector access or rights to redistribute assets. Use authorized browser access or owner-provided captures/recordings. If access fails, record the exact limitation; never claim source inspection from a different Shop version or search thumbnail. Missing source blocks affected fidelity approval, not unrelated setup/backend work.

## 2. What 1:1 means

Reference acceptance requires faithful hierarchy, geometry, typography, card/image proportions, spacing, surfaces, navigation, overlays, states and interaction sequence for the recorded scope. Measure instead of inventing values. Review actual transitions, dismissal, back navigation, focus, scrolling and keyboard behavior; screenshots alone do not specify them.

A native iOS capture cannot automatically be the literal pixel baseline for mobile web or Android. Record source device pixels versus logical viewport/density, system chrome and safe areas. Platform differences must be named and approved, not used as blanket permission to redesign. Do not paint a fake iOS status bar inside the mobile website.

Use two comparisons:

1. Source-reference review at a matched content viewport with explicit assets/platform exceptions.
2. Regression comparison against our own baseline AFTER that source review is approved.

The second comparison alone can only show consistency with ourselves. It does not prove similarity to Shop. No blanket pixel-difference percentage constitutes acceptance; rendering/font differences require bounded, explained tolerances, while material geometry/state differences are defects.

No unbounded claim such as "the whole app is 1:1." Acceptance states which capture, flow IDs, clients, viewports, states, exceptions and commit were verified.

## 3. Work sequence and gates

### A. Inventory and freeze (REF-001)

Collect authorized screenshots and flow recordings, enumerate screens/states/actions, assign exact source identifiers, and measure shared components. Record the source's tab model and routes; do not carry over the old Treido five-tab assumptions merely because they exist.

Classify each target as `reference-match`, `approved-platform-adaptation`, `treido-specific`, or `out-of-scope-by-owner`. A required feature missing from Shop is `treido-specific`, not silently omitted. It needs an explicit design decision and cannot be marked reference-matched.

Freeze this matrix and obtain owner approval of coverage and unavoidable differences before claiming fidelity. Installation and independent commerce tests may continue meanwhile.

### B. Reference implementation and review (REF-002..REF-005)

Build one canonical set of buyer components per platform. Implement complete navigation/state behavior with deterministic fixtures where needed, while integrating real sandbox commerce incrementally. Do not defer all integration until after every visual screen is built.

Reference content/imagery may be simulated only in a visibly identified, isolated reference/test environment, with appropriate asset permission. The underlying commerce model can already be food-capable; there is no need to create a fashion database and later rename tables. Snapshot adapters must implement the same client contracts and must not bypass validation in real application paths.

Use the selected source palette and copy during the reference pass, or record permitted substitutions that affect comparison. Do not introduce Treido green/yellow/red, new food card layouts, extra badges, bigger cards, new hero sections, or replacement navigation yet.

The reference milestone covers the frozen required matrix, not just the homepage. Owner/design-reviewer approval is recorded at REF-005 with exact evidence and accepted exceptions. The agent that produced the screenshots cannot self-approve the design gate.

### C. Treido adaptation (BRAND-001)

Only after REF-005 approval, change branding/content through the same components and tokens. Apply green/yellow/red roles, Treido identity, lawful owned imagery and the actual food taxonomy/copy. Keep the accepted geometry, interactions and responsive rules unless the owner separately approves a measured change.

Initial color-role intent, NOT approved hex values: green for brand/primary actions; yellow for selected accents/highlights; red for error/destructive semantics and explicitly approved brand accents. Do not make red mean both success and failure. Neutral surfaces, readable text, focus, contrast and disabled states are separately defined. Exact colors and typography are measured/approved at this stage, not invented now. Do not copy the legacy override stylesheet.

Categories become the approved food categories; generic stores/brands become the appropriate sellers/producers; product content becomes real food listing information. Preserve stable technical identifiers and route mappings. Food-specific units/MOQ/fulfillment need approved placement; they cannot disappear for screenshot similarity.

Re-run geometry, interactions, localization, accessibility, real-data and performance checks after adaptation. Remove Shop names/marks and reference-only data from release paths. Keep the reference approval in Git history/evidence, not a second shipping theme or alternate homepage.

### D. Final buyer acceptance

Brand approval is not feature completion. Verify actual owned media, long BG/EN copy, unavailable stock, authentic account/order data, error recovery and physical-device behavior. The shipping UI must have no reference-only mode reachable in production/native release. Approval is recorded under BRAND-001 and subsequent feature acceptance.

## 4. Reference coverage registry

The following rows are internal work IDs, NOT verified Mobbin screen IDs. REF-001 must fill the source column and state list. Add rows for every necessary source state; do not reduce coverage to this summary. Candidate mappings remain unverified until inspected.

| ID | Journey/component family | Source screen/flow IDs | Clients | Current state |
| --- | --- | --- | --- | --- |
| REF-HOME | Launch/home, tab navigation, shelves, scrolling | Not captured | Web mobile / iOS / Android adaptation | Unverified |
| REF-DISC | Category/discovery, filter/sort sheets, result states | Not captured | Web mobile / native | Unverified |
| REF-SEARCH | Search entry, suggestions, results, no results, clear/back | Not captured | Web mobile / native | Unverified |
| REF-STORE | Seller/storefront, catalog entry, follow/save | Not captured | Web mobile / native | Unverified |
| REF-PDP | Product detail, images, variants, quantities, add/saved | Not captured | Web mobile / native | Unverified |
| REF-CART | Cart, quantity/remove, seller grouping, empty/recovery | Not captured | Web mobile / native | Unverified |
| REF-CHECKOUT | Auth handoff, address, fulfillment, review/payment, return | Not captured | Web mobile / native | Unverified |
| REF-ACCOUNT | Profile, saved items, settings and addresses | Not captured | Web mobile / native | Unverified |
| REF-ORDERS | Purchases, detail, tracking, issue/refund entry | Not captured | Web mobile / native | Unverified |
| REF-COMMS | Messages, notifications, support entry if present | Not captured; may require Treido-specific design | Web mobile / native | Unverified |
| REF-DESKTOP | Responsive desktop buyer composition | Owner-approved adaptation required | Desktop web | Unverified |
| REF-MERCHANT | Account/selling/admin layouts and key editor/queue states | Legacy inventory + explicit owner review; not Shop buyer parity | Desktop/mobile web | Unverified |

For each detailed row record: requirement IDs; source capture/screen/flow; content viewport and density; state/fixture ID; entry action; expected action/result; back/close behavior; keyboard/scroll behavior; destination route; reusable components; exceptions; reference and implementation evidence IDs; reviewer/date/commit; status. Screens that only exist in another Shop version need explicit acceptance as a changed source.

## 5. Component and interaction ownership

Establish the source-measured typography, spacing, radius, color, icon, shadow and motion scales before duplicating their values across screens. Shared tokens are platform-neutral; CSS and React Native consume them through platform adapters. One semantic token source should not import web CSS into native.

Build only needed primitives: app chrome, navigation, product cards, store identity, shelves/grids, buttons/inputs, quantity/variant controls, dialogs/sheets, feedback states and transaction summaries. Do not turn a product card into a universal component with dozens of historical-design flags. Reuse repeated patterns, not unrelated layouts.

For a sheet/modal define open source, dismiss/back/Escape behavior, scroll locking, focus containment/restoration, browser history/deep-link behavior, nested overlay handling and persistent form state. A direct product URL must work without its opening feed. Native hardware back and browser back must not be swallowed by decorative animations.

Record whether tabs preserve their scroll/navigation state. Payment return must resolve to the existing operation, not create a new checkout. A keyboard must not obscure the active field or submit action. Make safe-area clearance part of component layout, not late global padding overrides.

Motion duration/easing comes from inspected recordings or an explicitly accepted adaptation. Honor reduced motion without disabling unrelated page feedback. Do not claim animation parity from still screenshots.

## 6. Evidence and public-repository handling

Store source screenshots, recordings and any licensed fonts in an owner-controlled private location or ignored local directory. Record reference IDs, hashes/measurements and nonsecret relative evidence identifiers here; never commit private signed download URLs or access tokens. Public Mobbin URLs may be linked, but raw third-party assets are not automatically publishable.

Sanitized screenshots of OUR application and synthetic fixture metadata may be committed for regression tests when they contain no restricted reference imagery, personal data or secrets. Otherwise keep the comparison artifact private and record its identifier. A unavailable private asset makes that test explicitly blocked, not auto-passed.

Evidence for each accepted flow includes source comparison, implementation captures, interaction recording where needed, target device/browser/version, fixture and locale, commit, defect list and reviewer result. Mask only proven volatile/system areas with justification; never mask the UI difference under review. Control fixture time/images/fonts/network state for repeatability.

## 7. Forbidden shortcuts

No screenshot-only homepage approval; generic ecommerce template substituted for Shop; auto-updated baselines; new color themes before REF-005; global shadow/blur/class-name patches; hidden duplicate device trees; synthetic ratings/stock in production; silent omitted merchant/account screens; or claiming Android/browser-native equivalence without declared platform review.

A source gap is recorded. An intentional deviation is approved. A defect is fixed. These are different outcomes.

## Reference methodology

[Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) describes baseline mechanics; it does not decide our source fidelity. [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) defines the native development environment. Product navigation/content decisions remain in the selected Mobbin capture and this document's approval records.

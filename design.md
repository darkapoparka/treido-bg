# Frontend design specification

**Build the buyer frontend from the selected Shop reference, not from a previous Treido frontend.** The reference supplies styling AND interaction design: hierarchy, typography, spacing, colors, card proportions, navigation, overlays, transitions and screen flows. A generic ecommerce layout with similar colors is not the target.

[product.md](product.md) defines the required capabilities. [verification.md](verification.md) defines evidence. [tasks.md](tasks.md) owns execution. Buyer work has two design phases: source fidelity, then approved Treido adaptation through the same implementation.

## 1. Reference

[Owner-selected Shop iOS capture on Mobbin](https://mobbin.com/apps/shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d/7b6adbde-de48-47c5-979b-f629f1eb87a9/screens)

Collection: shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d. Capture: 7b6adbde-de48-47c5-979b-f629f1eb87a9.

The source URL is selected. The complete capture, actual device/OS/app version, dimensions, fonts, timings and source screen/flow IDs are not yet verified. REF-001 records those facts from authorized screenshots/recordings. Do not invent measurements or substitute another Shop version/search thumbnail without approval.

Missing source material blocks its fidelity claim, not bootstrap or independent backend work. Use authorized access or owner-supplied captures. Record the limitation rather than claim inspection that did not happen.

## 2. Phase A: reproduce Shop

REF-001 inventories every screen/state/action in the declared reference scope, measures shared components and freezes the mapping. Then REF-002 through REF-004 implement the actual UI and behavior on web/native. Do not use an existing Treido layout, stylesheet, component family, tab count or route behavior as a fallback specification.

Use the reference's typography, palette, geometry and content during comparison, subject to explicitly recorded asset/platform substitutions. No early Treido green/yellow/red palette, food badge redesign, enlarged cards, new hero sections or invented navigation. The underlying model can be food-capable from day one; fixture content does not require a disposable fashion database.

Deterministic fixtures may drive isolated reference states. The same components and contracts must accept real catalog/account/order data as backend features are implemented. Do not build a throwaway screenshot replica followed by a second production frontend. Clearly distinguish visual/interaction approval from backend completion.

A complete source match is bounded to a capture, flow IDs, states, clients, viewports and explicit exceptions. Classify each screen as reference-match, approved-platform-adaptation, Treido-specific, or explicitly out of scope. Required product capabilities absent from Shop need their own design; they do not disappear.

## 3. Reference coverage registry

These IDs are internal work labels, NOT asserted Mobbin IDs. REF-001 fills actual source IDs and expands rows to individual states/actions.

| ID | Required family | Source / state |
| --- | --- | --- |
| REF-HOME | Home, source-measured tab navigation, shelves/cards, scrolling | Not captured / unverified |
| REF-DISC | Category/discovery, facets, filter/sort sheets and result states | Not captured / unverified |
| REF-SEARCH | Search entry, suggestions/results, clear/back, no results and recovery | Not captured / unverified |
| REF-STORE | Seller storefront, product entry, save/follow where present | Not captured / unverified |
| REF-PDP | Detail/images/options, quantity, add/save, unavailable state | Not captured / unverified |
| REF-CART | Items/quantities/removal, empty cart, seller grouping and recovery | Not captured / unverified |
| REF-CHECKOUT | Authentication return, address, fulfillment, review/payment and return | Not captured / unverified |
| REF-ACCOUNT | Personal profile, saved items, addresses and settings | Not captured / unverified |
| REF-ORDERS | Purchases/detail/tracking and issue entry | Not captured / unverified |
| REF-COMMS | Notification/message/support entry where present; explicit Treido-specific designs otherwise | Not captured / unverified |
| REF-DESKTOP | Desktop/tablet buyer adaptation of approved patterns | Separate reviewed composition required |
| REF-MERCHANT | Operational dashboard/catalog/order/finance/account/team layouts | SPEC-001 proposes from product.md workflows; not Shop buyer parity |
| REF-ADMIN | Moderation/verification/support and privileged action states | SPEC-001 proposes from product.md workflows; not Shop buyer parity |

Each detailed entry records requirement ID, source/capture/screen, platform/content viewport/density, fixture state, entry/action/outcome, back/dismissal behavior, keyboard/scroll/focus, destination, component ownership, exceptions, implementation evidence and reviewer/date/commit.

Native iOS screenshots include device density/system chrome. Record logical content viewport separately; do not paint a fake iOS status bar in a website. Browser and Android differences require specific approval, not blanket permission to redesign.

## 4. Interaction and component specification

Derive spacing, type scales, radius, surfaces, shadows, icons and motion from inspected evidence. Tokens are platform-neutral; web CSS and React Native consume them separately. Build only the primitives/components needed by the measured screens, with one canonical component per repeated role on each platform.

For each navigation/overlay flow specify entry, loading, success/failure, direct link, browser/native back, dismiss/Escape, scroll lock, focus containment/return, keyboard clearance, nested overlays and form persistence. A product direct link must work without the feed that normally opens it. Record whether tabs restore their scroll/navigation state.

Payment return must resume the existing operation. It must not accidentally submit checkout again. Poor connectivity must produce truthful retry or offline information. Reference screenshots alone do not establish these behaviors; inspect recordings or approve explicit product-specific interaction details.

Measure motion duration/easing from recordings where available. Honor reduced motion and accessibility. No global shadow/blur/class-substring overrides or universal !important corrections. Fix the owning component/token instead.

## 5. Phase A approval: REF-005

First compare the implementation with the authorized source at matched content dimensions and declared exceptions. Only AFTER that review establish our own deterministic screenshot baselines. Matching our own screenshots alone proves consistency, not Shop fidelity.

The owner/design reviewer approves the frozen scope, records outstanding defects/exceptions and identifies the tested commit and platforms. Implementation agents do not self-approve the design they generated. A homepage screenshot cannot approve the entire flow set. A blanket pixel-difference threshold cannot excuse changed geometry/navigation; tolerances must name real rendering differences.

Reference fixtures may support visual approval, but their feature remains incomplete until real data/provider behavior is verified. FLOW-001 proves an initial integrated transaction before this full reference milestone; subsequent feature tests cover the rest. Unavailable screenshots/devices are explicitly unverified, never auto-passed.

## 6. Phase B: Treido adaptation

BRAND-001 starts only after REF-005. Apply Treido identity, owned imagery, approved food categories, seller/producer terminology and necessary commerce copy THROUGH THE SAME accepted components. Keep geometry, navigation and interactions unless a separate deliberate change is approved.

Color-role intent: green for primary brand/action roles; yellow for approved highlights; red for error/destructive roles and specifically approved brand accents. Exact values, readable neutrals, focus/contrast/disabled states and any typography adjustment are approved here during this phase, not guessed during the Shop pass.

Product and Category remain useful technical concepts; renaming visible labels is not a database architecture rewrite. SPEC-001 provides the approved food category hierarchy/attributes/copy. Units, package sizes, minimum quantities, seller grouping and pickup/delivery facts get deliberate placements rather than being hidden for visual similarity.

Test long Bulgarian/English labels and real food product images, empty/unavailable stock and actual orders/account data. Recheck reference geometry, interaction behavior, accessibility and performance. Remove Shop marks/names and reference-only assets/data from shipping paths. Do not ship alternate Shop/Treido themes or parallel homepages; historical reference approval lives in review evidence/Git.

## 7. Merchant and admin

Design these as new operational experiences based on product.md: account/workspace switching, draft/publication validation, inventory, order queues/detail, refunds, finance, inbox, teams and privileged review. SPEC-001 provides their navigation/route map and representative screens for review. Reference buyer styling does not specify an inventory table or finance workflow.

Desktop should support operational density; mobile web must support urgent actions and usable forms, not a clipped desktop dashboard. Repeated controls use agreed tokens and primitives, but buyers and merchants do not share a giant universal shell. A previous dashboard is optional inspiration, not required component reuse or acceptance authority.

## 8. Assets and evidence

Keep third-party screenshots/recordings/fonts in an authorized private or ignored local location. Public Git may contain permitted source URLs and nonsecret evidence identifiers/measurements, not credentials, signed downloads or restricted asset collections. Use lawful assets and preserve applicable license notices for any optional reused material.

Sanitized screenshots of our own synthetic-data UI can serve as regression artifacts when they do not contain restricted imagery/private data. Otherwise store the comparison privately and record a reference. Masks cannot hide the defect under review. Fix volatile fixtures rather than approving noisy comparisons automatically.

A flow approval records source and implementation captures, interactions when needed, device/browser/version, viewport/density, locale/data, commit, deviations and reviewer decision. Missing evidence is a narrow blocker, not permission to invent the source.

[Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) describes regression mechanics; [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) describes native development builds. Neither substitutes for the selected source or actual Treido review.

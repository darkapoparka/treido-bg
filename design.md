# Frontend design specification

Build the buyer frontend from the selected Shop reference, not from an earlier Treido frontend. Match styling AND interactions: typography, geometry, colors, cards, navigation, sheets, transitions and flows. [product.md](product.md) defines features; [tasks.md](tasks.md) defines numbered implementation packages; [verification.md](verification.md) defines batch review. No generic ecommerce substitute.

## 1. Exact source

[Owner-selected Shop iOS capture on Mobbin](https://mobbin.com/apps/shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d/7b6adbde-de48-47c5-979b-f629f1eb87a9/screens)

Collection: `shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d`. Capture: `7b6adbde-de48-47c5-979b-f629f1eb87a9`.

The URL is selected; the complete source, actual device/OS/app version, dimensions, fonts, motion and screen IDs are still unverified. Task 2 reads authorized captures/recordings and records the details. Never invent them or silently substitute another version. Use the available Mobbin plugin or authorized browser/owner-provided assets; a plugin listing is not source access. Missing source blocks affected fidelity work, not Task 1 installation.

## 2. Implementation sequence

**Task 2:** Inspect and map screens/flows, measure shared patterns and record explicit web/Android/desktop differences. Approve the discovery slice before Task 3; extend to complete declared coverage before Task 6. Merchant/admin and product-specific screens need their own reviewed design, not fake Shop provenance.

**Task 3:** Build buyer discovery on web/native: measured shell, navigation, cards/shelves, home/search/store/product, overlays and working local state. Use isolated deterministic fixtures when the backend is absent. This is the start of reproducing Shop; it does not wait for payment integration.

**Tasks 4-5:** Connect those components to real catalog/auth; build the matching cart, checkout and order flows with real isolated commerce. Do not create new components just to replace the fixtures. Keep the underlying food model from day one; reference content does not require a fashion schema.

**Task 6:** Complete the remaining mapped buyer/account/support/communication states and review the full declared source scope. Actual account/purchase behavior is connected; unfinished communication delivery may be labeled fixture-only until Task 9. The owner/design reviewer explicitly approves source fidelity before branding.

**Task 7:** Apply Treido identity and food content through that same implementation, then review the adapted batch. No permanent reference/Treido skins, alternate homes or throwaway clone.

Use the source typography/palette/content during comparison, with named approved asset/platform substitutions. Do not introduce Treido green/yellow/red, extra badges, larger cards or invented navigation before source approval. Scope fidelity to exact screens/states/platforms/commit, not an unbounded claim of literal native parity everywhere.

## 3. Reference coverage registry

The labels below are reference families, not execution tasks or verified Mobbin screen IDs. Task 2 expands each into actual screens/states/actions and records source evidence in this section. There is no separate task queue here.

| Family | Required source coverage | Initial evidence |
| --- | --- | --- |
| Home | Launch, source tab model, shelves/cards and scroll | Not captured |
| Discovery | Categories, facets, filter/sort sheets, result states | Not captured |
| Search | Entry/suggestions/results/clear/back/empty/recovery | Not captured |
| Store | Seller storefront, product entry and follow/save if present | Not captured |
| Product | Images/options/quantity/add/save/unavailable states | Not captured |
| Cart | Items, quantity/removal, empty, grouping and recovery | Not captured |
| Checkout | Sign-in return, address/fulfillment, review/payment and return | Not captured |
| Account | Profile, saved items, addresses/settings and selling entry | Not captured; Treido-specific areas classified separately |
| Purchases | History/detail/tracking and issue entry | Not captured |
| Communication | Inbox/notification/support entry or explicit Treido-specific alternatives | Not captured |
| Desktop/tablet | Reviewed adaptation of the source buyer patterns | Separate composition required |
| Merchant/admin | Operational navigation, editors, queues, finance/team and privileged states | Task 2 defines from product.md, not Shop buyer parity |

Each entry records: requirement IDs, source/capture/screen IDs, logical viewport and density, fixture/state, entry/action/outcome, back/dismiss/keyboard/scroll, component owner, destination, named exceptions and review evidence. Classify as source-match, approved-platform-adaptation or Treido-specific. Required product functionality absent from Shop is not silently omitted.

Do not paint a fake iOS status bar into a website. Record system chrome/content viewport separately. Android/browser differences need specific decisions, not a blanket exemption from fidelity. Fonts/assets must be lawfully available; record permitted substitutions before claiming a match.

## 4. Components and interaction rules

Derive scales for spacing/type/radius/colors/icons/shadows/motion from inspected source. Shared tokens are platform-neutral; web and native have their own components. One canonical implementation per visual role per platform. Use needed primitives rather than a universal card with dozens of historical flags.

Specify each complete flow's loading/error/success/direct-link behavior; browser/native back; dismiss/Escape; scroll locking/restoration; focus containment/return; keyboard/safe areas; nested sheets and form persistence. Product direct links work without an originating feed. Record whether tab switching restores scroll/navigation state. Payment return resumes its existing operation, not a new checkout.

Use recordings for motion where available; still images cannot prove timings or gestures. Respect reduced motion, readable contrast and semantics. Correct styles in their owning component/token, not global shadow/blur/class-name overrides or blanket !important patches.

Build related components/screens as one batch. Inspect and refine while working, then run the task's screen-set review and focused checks at the batch end. There is no mandatory full-suite or owner approval after each small component edit.

## 5. Source review at Task 6

First compare implementation with the authorized source at matched logical content dimensions and named exceptions. Only then approve our own regression baselines. Matching our previous output alone does not establish Shop fidelity. Masks cannot conceal meaningful differences; blanket pixel thresholds cannot excuse changed geometry or navigation.

Task 3 records discovery feedback; Task 6 reviews the whole frozen scope, related flows and declared platforms as a batch. The owner/design reviewer records approval, commit, evidence and accepted deviations. The implementation agent does not self-approve. A homepage screenshot does not approve checkout, accounts or native behavior.

Task 5's real transaction must already work. Visual review can separately accept an explicitly fixture-driven communication state, but cannot claim its service works before Task 9. Missing source/device evidence remains Review/Blocked for that scope. Record approval in tasks.md with source details here; do not create competing status ledgers.

## 6. Treido adaptation at Task 7

After recorded source approval, apply Treido identity, owned imagery, approved food labels/categories, seller/producer terminology and required commerce copy through the accepted components. Keep their geometry/navigation unless the owner approves a deliberate adjustment. Product and Category remain technical concepts; a display-label change is not a schema rewrite.

Color-role intent: green for brand/primary actions; yellow for approved highlights; red for error/destructive and explicitly approved brand accents. Exact values, neutrals, focus/contrast/disabled states and any type change require review in this phase. Do not guess them during source implementation or copy an old override stylesheet.

Task 2 supplies food hierarchy and quantity/publication facts. Give units, package sizes, minimums, fees, seller grouping and pickup/delivery an explicit placement; never hide authoritative information for a screenshot match. Check long BG/EN copy and real food images.

At the batch end recheck the full adapted screen set, interaction/transaction regressions, accessibility and relevant performance. Remove Shop marks/names and restricted/reference-only data/assets from release paths. Keep comparison history in authorized evidence/Git history, not another shipping frontend. Brand approval is separate from the remaining service/dashboard completion.

## 7. Merchant and administration

Task 2 proposes operational navigation and representative screens from product.md: business context, listing drafts/publication, stock, order queues/recovery, finance, inbox, team and platform review. Tasks 4-5 build initial publishing/order operations; Tasks 8-11 complete the workspaces.

These are new screens with explicit review, not automatic copies of an old dashboard or forced adaptations of buyer cards. Desktop supports operational density; mobile web supports usable forms and urgent operations. Share primitives/tokens where useful, not one huge shopper/merchant shell. A native handoff to the web dashboard is not native merchant parity.

## 8. Assets and review evidence

Keep restricted screenshots/recordings/fonts in authorized private or ignored local storage. Public Git can contain source URLs and nonsecret measurements/evidence IDs, not credentials, signed downloads or restricted collections. Preserve applicable licenses for permitted reuse.

Sanitized synthetic-data screenshots of our own UI can be regression artifacts when no restricted images/private data appear. Otherwise record a private evidence identifier. Keep source and implementation captures, interaction evidence when needed, browser/device/version, viewport/density, locale/fixture, commit and reviewer result. Stabilize fixture time/media/fonts rather than auto-accepting noisy comparisons.

[Playwright](https://playwright.dev/docs/test-snapshots) documents regression mechanics; [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) documents the native environment. Neither replaces actual source inspection or the owner's review.

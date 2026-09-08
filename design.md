# Frontend design specification

Build the buyer frontend from the selected Shop reference, not from an earlier Treido frontend. Match styling AND interactions: typography, geometry, colors, cards, navigation, sheets, transitions and flows. [product.md](product.md) defines features; [tasks.md](tasks.md) defines numbered implementation packages; [verification.md](verification.md) defines batch review. No generic ecommerce substitute.

## 1. Exact source

[Owner-selected Shop iOS capture on Mobbin](https://mobbin.com/apps/shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d/7b6adbde-de48-47c5-979b-f629f1eb87a9/screens)

Collection: `shop-ios-1f1a3d5b-cb65-4c7e-af4b-e4cdf1c03e4d`. Capture: `7b6adbde-de48-47c5-979b-f629f1eb87a9`.

Inspected on 2026-09-08: the selected capture lists **323 screens**. Eleven highlighted stills were accessible and inspected individually in the browser; their detail pages label them **iOS (393x852)**. The home screen's More info panel reports upload date **September 7, 2026**. This is an upload date, not proof of the app release date. Device model, OS/app version, pixel density, content-only viewport, font identities and motion remain unverified. Do not silently substitute another capture even when Mobbin labels this one Latest.

Full access is currently unavailable: the Mobbin connector reports that a paid plan is required, and the signed-in browser offers limited previews with an upgrade prompt. No purchase or restricted download was attempted. The inventory below is partial source evidence, not 323-screen or interaction parity. Missing access blocks the affected reference work, not independent catalog/operations preparation.

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
| Home | Launch, source tab model, shelves/cards and scroll | Launch/home stills inspected; transitions and scroll unverified |
| Discovery | Categories, facets, filter/sort sheets, result states | Chips visible in results; category/sheet states missing |
| Search | Entry/suggestions/results/clear/back/empty/recovery | One populated results still; remaining states missing |
| Store | Seller storefront, product entry and follow/save if present | One populated storefront still; actions unverified |
| Product | Images/options/quantity/add/save/unavailable states | One product and one reviews still; remaining states missing |
| Cart | Items, quantity/removal, empty, grouping and recovery | One seller cart overlay with discount error; remaining states missing |
| Checkout | Sign-in return, address/fulfillment, review/payment and return | Not captured |
| Account | Profile, saved items, addresses/settings and selling entry | One saved/collections still; identity/settings missing |
| Purchases | History/detail/tracking and issue entry | One tracking/detail still; history/recovery missing |
| Communication | Inbox/notification/support entry or explicit Treido-specific alternatives | Buyer assistant/voice stills only; merchant messaging/support missing |
| Desktop/tablet | Reviewed adaptation of the source buyer patterns | Separate composition required |
| Merchant/admin | Operational navigation, editors, queues, finance/team and privileged states | Task 2 defines from product.md, not Shop buyer parity |

Each entry records: requirement IDs, source/capture/screen IDs, logical viewport and density, fixture/state, entry/action/outcome, back/dismiss/keyboard/scroll, component owner, destination, named exceptions and review evidence. Classify as source-match, approved-platform-adaptation or Treido-specific. Required product functionality absent from Shop is not silently omitted.

Do not paint a fake iOS status bar into a website. Record system chrome/content viewport separately. Android/browser differences need specific decisions, not a blanket exemption from fidelity. Fonts/assets must be lawfully available; record permitted substitutions before claiming a match.

### Inspected source stills (partial, 2026-09-08)

All links below were opened from the selected capture's highlights and visually inspected. Descriptions identify visible structure; they are not pixel measurements or proof that a control was exercised. No restricted screenshot collection, personal order identifiers or reference assets were committed.

| Source screen | Visible state and structure | Treido mapping / missing evidence |
| --- | --- | --- |
| [Launch](https://mobbin.com/screens/3207d87f-9782-4798-b37b-d49812265939) | Purple surface, centered Shop wordmark, system status chrome | BUY-001; onboarding progression missing |
| [Home](https://mobbin.com/screens/eb9349cf-319e-4694-8a5b-5dc7bf1e25c9) | Avatar, Deals/Following/Saved shortcuts; tracking and connect-email banners; dark recently-viewed rail; store/product feed; floating icon navigation | BUY-001/002; tab destinations, full scroll, banners' actions missing |
| [Saved](https://mobbin.com/screens/b411a6d4-b51c-4da5-9a21-39ea459d98fd) | Collections/create-collection row, two-column saved products, heart controls, promotion badges, back/navigation | BUY-010; creation, selection, removal and empty states missing |
| [Storefront](https://mobbin.com/screens/0f1e8a5c-0dd7-4cdf-a250-61736c9f482f) | Hero/logo/rating, promotion strip, menu/search, Follow/share, category chips, horizontal recommendations, floating back/cart/navigation | BUY-004; follow/search/category/scroll transitions missing |
| [Product](https://mobbin.com/screens/47ce6015-c9bc-4d9b-9460-e43abd7be5d5) | Seller row, large image with next-image edge, title/rating, heart/share, price/promotion, quantity stepper | BUY-005; complete page, options/add, image interaction and unavailable state missing |
| [Cart overlay](https://mobbin.com/screens/f66151c9-42f3-48fe-8ead-6b032b5e1290) | Reduced product page above dark backdrop; seller cart, discount error, item/stepper/save-for-later, promotion progress, subtotal, checkout CTA, separate dismiss control | BUY-006; opening/dismiss motion, mutations, grouping and empty states missing |
| [Reviews](https://mobbin.com/screens/8f0ff393-457f-4e62-98f6-83ea7a968518) | Close/title, rating histogram, search/filter controls, stacked reviews with read-more/helpful/menu | BUY-010; filter/search/voting/reporting interactions missing |
| [Search results](https://mobbin.com/screens/37b59973-75fe-4059-a622-543e6de7ec07) | Query, filter and country/deal/following chips; horizontal seller cards; compact vertical product rows with ratings/prices/seller | BUY-003; entry, suggestions, filters, sort, empty/error and pagination missing |
| [Assistant answer](https://mobbin.com/screens/2c8d44e0-09ab-4362-b8ba-61c7c9aa5dc3) | Photo-based question, text response, horizontal product rails, follow-up composer and close | Source buyer AI; not merchant messaging or MER-010. Scope disposition required, no silent omission |
| [Voice loading](https://mobbin.com/screens/c90189a9-ccc7-47c0-b8ed-ac163265beb9) | Voice header/back/close, tall rounded panel, Almost ready state, speaker/microphone controls | Source buyer AI; permissions, audio, loading/recovery transitions missing; scope disposition required |
| [Order tracking](https://mobbin.com/screens/6b96514b-1c09-4262-b785-385a48c4153f) | Seller/arrival/progress, carrier tracking, order/items, manage/visit/details actions, delivery progress and floating navigation | BUY-008/009; history, management, carrier and recovery transitions missing |

Observed flow anchors for later authorized inspection: [Saved](https://mobbin.com/flows/75b26fee-826f-4403-9288-be499890cd72), [Store detail](https://mobbin.com/flows/ea05a60f-ccf7-427a-97b3-9c2bb9a5674c), [Store information](https://mobbin.com/flows/069d1098-37bd-4600-85ab-28342cf021ad), [Product detail](https://mobbin.com/flows/a99e7161-595d-466c-b0b1-bc1183f1d4d7), [Product photos](https://mobbin.com/flows/0f9653b4-5412-485a-a3a4-62bfb492a27e), [Purchasing](https://mobbin.com/flows/968f374e-69af-4adb-b913-0bb5c0e5e8b1), [Cart deletion](https://mobbin.com/flows/c5c9c07b-c093-4221-a2f8-44ca7c29ded0), [Product reviews](https://mobbin.com/flows/4e59dce2-d2a0-4f4e-ae16-54267243df75), [Search](https://mobbin.com/flows/4d0f0532-ce38-49b5-a94b-32e8ace4716c), [Filtering](https://mobbin.com/flows/0344c453-dece-4e8d-bb54-68f6e551b83f), [Assistant](https://mobbin.com/flows/d6910bbb-655d-44ad-842e-11da062a1e66), [Voice setup](https://mobbin.com/flows/2f492f6c-2db7-440b-8515-aa56a2d029e5), [Order tracking](https://mobbin.com/flows/d3bf7c94-4d9e-4298-a255-eaf177f9efd1). These links were visible on screen detail pages; their complete sequences/recordings have not been inspected. Link presence does not establish entry/action/outcome.

### Discovery slice proposed for Task 3

Scope: BUY-001 through BUY-005 plus local save/add feedback needed to navigate home -> search results or storefront -> product -> back. Include source shell/tab selection, feed scroll, search entry/suggestions/clear/no-results, category/filter/sort sheets with applied/cleared states, store follow/search, product image/options/quantity/stock states and overlay dismissal. Use the canonical implementation with isolated fixtures; later tasks connect persistence.

The source stills above provide candidate component families, not a ready-to-code specification. Before starting Task 3, obtain the missing sequence/state evidence; measure content viewport, type/font, spacing, cards, icon/navigation geometry, colors and overlay behavior; record permitted assets; then review this slice with the owner. Freeze each additional source ID within the same 323-screen capture and account for all screens before Task 6. Buyer assistant/voice are explicit scope decisions for that full capture, not silently excluded because Treido's current AI requirement is merchant-focused.

Proposed platform review: match source content at 393x852; review mobile web at 320/390/430 widths, browser chrome and keyboard/back separately; verify Android safe areas/system back in its actual app; compose tablet/desktop at 768/1024/1440 without stretching mobile screenshots. These are test targets, not inspected source dimensions or approved adaptations. Physical device and motion proof remains necessary. No frontend implementation is authorized by this proposal alone: the owner requested a stop before that stage.

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

### Operational presentation proposal (DEC-001/003, awaiting review)

Merchant desktop: persistent business selector and role-appropriate navigation; primary work area with queue filters, selectable rows and a detail/editor panel. Mobile web: compact business/title header, accessible navigation drawer, one queue or editor at a time, explicit back and persisted unsaved form state. No placeholder sales charts. Review representative populated/empty/error/forbidden states before implementation.

| Workspace navigation | Representative screen/state | Required action or evidence |
| --- | --- | --- |
| Overview / Начало | Attention queues: orders awaiting acceptance, low stock, failed fulfillment | Every count links to the exact filtered records; zero and unavailable differ |
| Catalog / Каталог | Draft editor, validation failures, published/archived list | BG/EN content, category/variant/media/unit sections; explicit publish summary and actionable field errors |
| Inventory / Наличности | On-hand/reserved/available, location/lot/expiry detail | Adjustment with reason and history; reserved stock cannot be edited away |
| Orders / Поръчки | Queue by commercial/payment/fulfillment state, order detail | Purchased snapshots, seller allocation, permitted next actions, repeated-action recovery |
| Fulfillment / Изпълнение | Pickup/delivery methods, windows and exceptions | Eligibility/capacity/fees shown from configured records |
| Customers and Inbox / Клиенти и Съобщения | Permissioned customer context and conversation | Unread/failed/retry states; durable service delivered in Task 9 |
| Finance / Финанси | Sales/refunds/fees/settlements with date filters | Drill to ledger/order evidence; unknown costs produce unavailable profit |
| Store / Магазин | Public identity, location/content preview | Preview and publish authorization; suspended-state explanation |
| Team and Settings / Екип и Настройки | Invitations/roles, business settings, Premium entitlement | Revoked membership clears context; financial/team actions require appropriate role |

Platform administration uses a separate permissioned shell: Businesses/verification, Catalog/moderation, Reports/reviews, Support/orders, Payments/reconciliation, Partners/dispatch, Promotions and Access/audit. Its default view is assigned or actionable queues. Representative review includes a business awaiting information, listing rejection with reason, an order with payment/refund mismatch and an operator denied a privileged action. Every exceptional write identifies the resource, reason, before/after state and audit record; refunds remain the canonical commerce command. Merchant status and operator authority are distinct.

Desktop/mobile layouts, exact density and navigation grouping above are proposals; no rendered operational design has been approved. Product requirements remain authoritative if later visual review changes the grouping.

## 8. Assets and review evidence

Keep restricted screenshots/recordings/fonts in authorized private or ignored local storage. Public Git can contain source URLs and nonsecret measurements/evidence IDs, not credentials, signed downloads or restricted collections. Preserve applicable licenses for permitted reuse.

Sanitized synthetic-data screenshots of our own UI can be regression artifacts when no restricted images/private data appear. Otherwise record a private evidence identifier. Keep source and implementation captures, interaction evidence when needed, browser/device/version, viewport/density, locale/fixture, commit and reviewer result. Stabilize fixture time/media/fonts rather than auto-accepting noisy comparisons.

[Playwright](https://playwright.dev/docs/test-snapshots) documents regression mechanics; [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/) documents the native environment. Neither replaces actual source inspection or the owner's review.

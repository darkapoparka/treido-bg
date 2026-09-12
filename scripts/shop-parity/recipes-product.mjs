const owner = "apps/web/src/features/discovery/product.tsx";
const shea = "/products/shea-butter";
const bag = "/products/shampoo-bag";
const top = { type: "scroll", y: 0 };
const click = (role, name) => ({ type: "click", role, name, exact: true });
const visible = (role, name) => ({
  type: "waitVisible",
  role,
  name,
  exact: true,
});
const anchor = (selector, y) => ({ type: "anchorSelector", selector, y });
const sheaHeading = visible("heading", "Shea Butter Exfoliating Body Wash");
const quantity = anchor(".quantity", 10);
const productTop = () => ({
  state: "shea-product-detail-top",
  actions: [sheaHeading, top],
});
const options = [
  sheaHeading,
  top,
  click("button", "More options"),
  visible("dialog", "More options"),
];
const offer = {
  type: "waitVisible",
  role: "dialog",
  name: /exclusive offer/,
};

// Twenty app-owned checkpoints, not twenty accepted screens. The original
// sequence contains changed products and promotion histories; those differences
// remain explicit. Flow 17's nine detail/variant checkpoints are still pending,
// including the unrelated apparel listing: never substitute Shea for that dress.
export const productRecipes = {
  18: {
    family: "product-gallery",
    owner,
    startUrl: shea,
    scenario: "home-welcome",
    frames: [
      productTop(),
      {
        state: "shea-fullscreen-first-photo",
        overlay: "dialog",
        actions: [
          click("button", "View product image 1"),
          visible("dialog", "Product photos"),
        ],
      },
      {
        state: "shea-fullscreen-testimonial-photo",
        overlay: "dialog",
        notes:
          "The source has two fullscreen stills and no recording. The real carousel's keyboard control selects photo 2; gesture and transition fidelity remain separate obligations.",
        actions: [{ type: "key", key: "ArrowRight" }],
      },
    ],
  },
  19: {
    family: "product-saving",
    owner,
    startUrl: shea,
    scenario: "home-welcome",
    frames: [
      productTop(),
      {
        state: "shea-saved-collection-picker",
        overlay: "dialog",
        notes:
          "The source also changes to a 20%-off promotion and adds an arrival estimate. Saving must not fabricate a promotion change; those catalog differences remain visible in the comparison.",
        actions: [
          click("button", "Save product"),
          visible("dialog", "Save to collection"),
        ],
      },
      {
        state: "shea-item-saved-toast",
        actions: [
          click("button", "Saved"),
          { type: "waitVisible", selector: ".product-saved-toast" },
        ],
      },
    ],
  },
  20: {
    family: "product-add-to-cart",
    owner,
    startUrl: bag,
    scenario: "home-welcome",
    frames: [
      {
        state: "bag-purchase-controls-description-reviews",
        actions: [visible("heading", "Shampoo Bar Bag"), quantity],
      },
      {
        state: "bag-added-quantity-and-disabled-buy-now",
        notes:
          "The 11.0167-second source recording shows a stable added state before the offer, including a product flight and temporary Added to cart label. Current code opens the offer immediately; dismissing it exposes the correct settled underlying state for diagnosis, not ordered-motion acceptance. Keep the missing intermediate animation/timing open.",
        actions: [
          click("button", "Add to cart"),
          offer,
          {
            type: "click",
            role: "button",
            name: /^Close /,
            withinDialog: true,
          },
          visible("button", "Open cart"),
          quantity,
        ],
      },
      {
        state: "bag-exclusive-offer-and-cart-summary",
        entry: { startUrl: bag, scenario: "home-welcome" },
        overlay: "dialog",
        notes:
          "Independent replay of the offer currently reached by Add to cart. The recording's intervening added state is not treated as an implemented transition.",
        actions: [
          visible("heading", "Shampoo Bar Bag"),
          quantity,
          click("button", "Add to cart"),
          offer,
        ],
      },
    ],
  },
  32: {
    family: "product-description",
    owner,
    startUrl: bag,
    scenario: "home-welcome",
    frames: [
      {
        state: "bag-description-preview",
        actions: [visible("heading", "Shampoo Bar Bag"), quantity],
      },
      {
        state: "shea-full-description-and-ingredients",
        entry: { startUrl: shea, scenario: "home-welcome" },
        overlay: "dialog",
        notes:
          "The source switches from the bag's mesh description to Shea's ingredients. Enter Shea explicitly; do not replace the bag's real description to manufacture continuity.",
        actions: [
          sheaHeading,
          anchor(".pdp-description", 14),
          click("button", "Read more"),
          visible("dialog", "Description"),
        ],
      },
    ],
  },
  37: {
    family: "product-contact",
    owner: "apps/web/src/features/discovery/reviews.tsx",
    startUrl: shea,
    scenario: "home-welcome",
    frames: [
      productTop(),
      {
        state: "shea-product-more-options",
        overlay: "dialog",
        actions: [click("button", "More options"), visible("dialog", "More options")],
      },
      {
        state: "kitsch-contact-links-and-address",
        overlay: "dialog",
        notes:
          "Only the app-owned contact panel is replayed. No website, social account, phone call, email or clipboard operation is executed by this capture.",
        actions: [click("button", "Contact KITSCH"), visible("dialog", "Contact KITSCH")],
      },
    ],
  },
  38: {
    family: "product-reporting",
    owner: "apps/web/src/features/discovery/reviews.tsx",
    startUrl: shea,
    scenario: "home-welcome",
    frames: [
      { state: "shea-more-options-before-report", overlay: "dialog", actions: options },
      {
        state: "product-report-no-reason",
        overlay: "dialog",
        actions: [click("button", "Report"), visible("dialog", "Report product")],
      },
      {
        state: "product-report-other-selected",
        overlay: "dialog",
        actions: [{ type: "check", role: "radio", name: "Other", exact: true }],
      },
      {
        state: "product-report-optional-notes-empty",
        overlay: "dialog",
        actions: [click("button", "Next"), visible("textbox", "Tell us more")],
      },
      {
        state: "product-report-optional-notes-testing",
        overlay: "dialog",
        actions: [
          { type: "fill", role: "textbox", name: "Tell us more", value: "testing" },
          { type: "blur", role: "textbox", name: "Tell us more" },
        ],
      },
      {
        state: "store-reported-product-concealed-and-confirmed",
        notes:
          "Submission only updates the isolated local preview; it does not transmit a real report. The source's returning promotion and previously saved Rice bundle remain catalog/history differences, not hidden pixels.",
        actions: [
          click("button", "Report"),
          { type: "waitUrl", url: "**/stores/kitsch?reported=shea-butter#all-products" },
          { type: "waitVisible", selector: ".product-reported-mark" },
          anchor(".store-grid-heading", 110),
        ],
      },
    ],
  },
};

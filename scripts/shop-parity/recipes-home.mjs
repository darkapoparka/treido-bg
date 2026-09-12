const top = { type: "scroll", y: 0 };
const click = (role, name) => ({ type: "click", role, name, exact: true });
const heading = (name) => ({
  type: "waitVisible",
  role: "heading",
  name,
  exact: true,
});
const anchor = (selector, y = 56) => ({
  type: "anchorSelector",
  selector,
  y,
});
const welcome = () => ({ state: "welcome-feed", actions: [top] });

// Entry changes are explicit: the frozen Home sequence combines different
// browsing histories. They are not represented as an invented UI transition.
export const homeRecipes = {
  2: {
    family: "home",
    owner: "apps/web/src/features/discovery/home.tsx",
    startUrl: "/",
    scenario: "home-welcome",
    frames: [
      welcome(),
      {
        state: "recently-viewed-shops",
        entry: { startUrl: "/?feed=recent-stores", scenario: "home-welcome" },
        notes:
          "Separate recorded browsing history; no captured transition from the welcome feed.",
        actions: [top],
      },
      {
        state: "recently-viewed-products-with-order",
        entry: { startUrl: "/products/u-see-me", scenario: "returning-home" },
        notes:
          "Reconstruct prior visits through product routes, not injected DOM or painted screenshots.",
        actions: [
          { type: "goto", url: "/products/round-sunglasses" },
          { type: "goto", url: "/products/cleo" },
          { type: "goto", url: "/?feed=recent-products" },
          top,
        ],
      },
      {
        state: "tracking-feed-drmtlgy",
        entry: { startUrl: "/?feed=tracking", scenario: "returning-home" },
        actions: [
          top,
          { type: "scrollElement", selector: ".home-shortcuts", x: 88 },
        ],
      },
      {
        state: "loaded-tea-accessories-feed",
        entry: { startUrl: "/", scenario: "home-welcome" },
        actions: [anchor(".campaign-tea")],
      },
      {
        state: "kitsch-campaign-feed",
        actions: [anchor(".campaign-kitsch")],
      },
    ],
  },
  3: {
    family: "home-notifications",
    owner: "apps/web/src/features/discovery/secondary.tsx",
    startUrl: "/",
    scenario: "home-welcome",
    frames: [
      welcome(),
      {
        state: "notifications-empty",
        actions: [
          click("button", "Notifications"),
          heading("Notifications"),
          top,
        ],
      },
    ],
  },
  4: {
    family: "home-deals",
    owner: "apps/web/src/features/discovery/deals.tsx",
    startUrl: "/",
    scenario: "home-welcome",
    frames: [
      welcome(),
      {
        state: "deals-rinse-syman",
        actions: [click("link", "Deals"), heading("Deals"), top],
      },
      {
        state: "deals-francesco-solid-hair",
        actions: [anchor(".deals-feed > section:nth-child(3)", 56)],
      },
    ],
  },
  5: {
    family: "following",
    owner: "apps/web/src/features/discovery/following.tsx",
    startUrl: "/",
    scenario: "following-empty",
    frames: [
      welcome(),
      {
        state: "following-empty-recommendation",
        notes:
          "The quilt record is incomplete; its existing page-local bookmark is not shared Saved acceptance.",
        actions: [click("link", "Following"), heading("Following"), top],
      },
      {
        state: "following-pura-products",
        entry: { startUrl: "/following", scenario: "following-pair" },
        notes:
          "Captured browsing-history change uses the isolated seed. Lemon Leaf/Santa Fe photography is partial; removed photographic control occlusions remain visual obligations, not comparison masks.",
        actions: [heading("Following"), top],
      },
      {
        state: "following-kitsch-and-older-pura",
        notes:
          "Earlier Pura photograph is partial and its title/price were not captured. No destination or service result is invented.",
        actions: [anchor('[data-following-post="kitsch"]', 54)],
      },
    ],
  },
  6: {
    family: "following",
    owner: "apps/web/src/features/discovery/following.tsx",
    startUrl: "/following",
    scenario: "following-pair",
    frames: [
      {
        state: "following-pura-products",
        actions: [heading("Following"), top],
      },
      {
        state: "following-manage-list",
        actions: [click("button", "Manage"), heading("Following list"), top],
      },
    ],
  },
  42: {
    family: "home-campaign-options",
    owner: "apps/web/src/features/discovery/home-campaigns.tsx",
    startUrl: "/",
    scenario: "home-welcome",
    frames: [
      { state: "kitsch-campaign-feed", actions: [anchor(".campaign-kitsch")] },
      {
        state: "pura-shop-options",
        overlay: "dialog",
        notes:
          "The campaign video advances in the capture. Its still-image background remains a visual/transition review obligation, not a masked region.",
        actions: [
          anchor(".campaign-pura"),
          click("button", "More options for Pura"),
          { type: "waitVisible", role: "dialog", name: "Pura", exact: true },
        ],
      },
      {
        state: "pura-not-interested-reasons",
        overlay: "dialog",
        actions: [click("button", "Not interested")],
      },
      {
        state: "pura-hidden-with-undo",
        actions: [click("button", "Want to see less of Pura")],
      },
    ],
  },
};

import { expect, test, type Page } from "@playwright/test";

const store = "/stores/kitsch";
const collection = `${store}/collections/best-sellers`;
const button = (page: Page, name: string) =>
  page.getByRole("button", { name, exact: true });
const dialog = (page: Page, name: string) =>
  page.getByRole("dialog", { name, exact: true });

async function openScenario(
  page: Page,
  baseURL: string | undefined,
  path: string,
  scenario = "home-welcome",
) {
  if (!baseURL)
    throw new Error("Storefront tests require the reference preview");
  await page.context().addCookies([
    {
      name: "shop-reference-scenario",
      value: scenario,
      url: baseURL,
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute(
    "data-reference-scenario",
    scenario,
  );
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
}

async function criteria(page: Page) {
  // These assertions inspect the committed main-frame URL, not DOM state.
  // Reading it through evaluate races a cross-document Forward restoration:
  // the page can correctly return while its previous JS context is destroyed.
  const params = new URL(page.url()).searchParams;
  return {
    min: params.get("min"),
    max: params.get("max"),
    sale: params.get("sale"),
    stock: params.get("stock"),
    sort: params.get("sort"),
    q: params.get("q"),
    filter: params.get("filter"),
  };
}

async function prepareStoreFilter(page: Page) {
  await page.locator("main img").evaluateAll(async (images) => {
    await document.fonts.ready;
    await Promise.all(
      images.map((image) => (image as HTMLImageElement).decode()),
    );
  });
  const trigger = button(page, "Filter store products");
  await trigger.evaluate((node) =>
    node.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await trigger.click({ trial: true });
  const scroll = await page.evaluate(() => scrollY);
  expect(scroll).toBeGreaterThan(0);
  await trigger.click();
  await expect(dialog(page, "Filter")).toBeVisible();
  return { trigger, scroll };
}

async function maximumPrice(page: Page, amount: number) {
  const maximum = page.getByRole("slider", { name: "Maximum price" });
  await maximum.focus();
  await maximum.press("Home");
  for (let value = 0; value < amount; value += 10)
    await maximum.press("ArrowRight");
  await expect(maximum).toHaveValue(String(amount));
  return maximum;
}

async function visitSaved(page: Page) {
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: "Saved", exact: true }).click();
  await expect(page).toHaveURL(/\/saved$/);
}

test("Kitsch store and collection use the captured source media geometry", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, store);
  const defaultHero = page.locator(".store-hero-kitsch");
  await expect(defaultHero).toHaveCount(1);
  await expect
    .poll(() =>
      defaultHero.evaluate(
        (element) => getComputedStyle(element).backgroundImage,
      ),
    )
    .toContain("store-kitsch-default-hero");
  await expect(
    page.locator('.store-recommendations a[href="/products/terracotta"] img'),
  ).toHaveAttribute(
    "src",
    "/api/reference-media/store-kitsch-terracotta-recommendation",
  );
  await page.goto("/stores/kitsch/collections/whats-new");
  const hero = page.locator(".store-collection-hero > img");
  await expect(hero).toHaveAttribute(
    "src",
    "/api/reference-media/collection-new-hero",
  );
  await expect(hero).toHaveCSS("height", "240px");
  await expect(
    page.locator(".product-grid .product-card").first().locator("img"),
  ).toHaveAttribute("src", "/api/reference-media/collection-new-summer-card");
  await expect(page.locator(".product-grid .rating > span").first()).toHaveCSS(
    "color",
    "rgb(8, 8, 8)",
  );
});

test("following Kitsch swaps to the captured followed storefront hero", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, store, "following-pair");
  const follow = page.locator(".store-actions .follow").first();
  await expect(follow).toBeVisible();
  if ((await follow.getAttribute("aria-pressed")) !== "true")
    await follow.click();
  await expect(follow).toHaveAttribute("aria-pressed", "true");
  const hero = page.locator(".store-hero-followed");
  await expect(hero).toHaveCount(1);
  await expect
    .poll(() =>
      hero.evaluate((element) => getComputedStyle(element).backgroundImage),
    )
    .toContain("store-kitsch-followed-hero");
});

test("store filter drafts do not change committed criteria or results before Done", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, store);
  const grid = page.locator(".store-all-products .product-grid");
  const before = await grid.innerText();
  const { trigger, scroll } = await prepareStoreFilter(page);
  await button(page, "On sale").click();
  await expect(button(page, "On sale")).toHaveAttribute("aria-pressed", "true");
  expect((await criteria(page)).sale).toBeNull();
  expect(await grid.innerText()).toBe(before);
  await page.keyboard.press("Escape");
  await expect(dialog(page, "Filter")).not.toBeVisible();
  await expect(page).toHaveURL(/\/stores\/kitsch$/);
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(scroll);
  await trigger.click();
  await expect(button(page, "On sale")).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await expect(button(page, "In-stock")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("nested Price Back and Forward preserve drafts, then Done consumes only the filter entries", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, "/following");
  await page.goto(store);
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  const { trigger, scroll } = await prepareStoreFilter(page);
  await button(page, "On sale").click();
  await dialog(page, "Filter")
    .getByRole("button", { name: "Price", exact: true })
    .click();
  await expect(dialog(page, "Price")).toBeVisible();
  const maximum = await maximumPrice(page, 380);
  await expect(maximum).toBeFocused();
  await expect(maximum).toHaveCSS("outline-style", "none");
  expect((await criteria(page)).max).toBeNull();
  await page.goBack();
  await expect(dialog(page, "Filter")).toBeVisible();
  await expect(button(page, "On sale")).toHaveAttribute("aria-pressed", "true");
  await expect(button(page, "Price")).toBeFocused();
  await page.goForward();
  await expect(dialog(page, "Price")).toBeVisible();
  await expect(page.getByRole("slider", { name: "Maximum price" })).toHaveValue(
    "380",
  );
  await button(page, "Done").click();
  await expect(dialog(page, "Price")).not.toBeVisible();
  await expect
    .poll(() => criteria(page))
    .toMatchObject({
      max: "380",
      sale: "1",
      filter: null,
    });
  await expect(trigger).toBeFocused();
  // Filtering can shorten the page; require its exact legal return position.
  const legalScroll = await page.evaluate(
    (saved) =>
      Math.min(
        saved,
        Math.max(0, document.documentElement.scrollHeight - innerHeight),
      ),
    scroll,
  );
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(legalScroll);
  await page.goBack();
  await expect(page).toHaveURL(/\/following$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/stores\/kitsch\?/);
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await expect(page.locator(".store-all-products")).toBeVisible();
  await expect(dialog(page, "Filter")).not.toBeVisible();
  await expect(dialog(page, "Price")).not.toBeVisible();
  await expect
    .poll(() => criteria(page))
    .toMatchObject({
      max: "380",
      sale: "1",
      filter: null,
    });
  const filteredCards = page.locator("#all-products .product-card");
  expect(await filteredCards.count()).toBeGreaterThanOrEqual(6);
  expect(
    await filteredCards.evaluateAll((cards) =>
      cards.slice(0, 6).map((card) => card.getAttribute("data-product-id")),
    ),
  ).toEqual([
    "rice-shampoo",
    "rice-conditioner",
    "rice-bundle",
    "shea-butter",
    "shampoo-bag",
    "terracotta",
  ]);
});

test("direct collection price filtering retains the collection and resets the native range", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, `${collection}?stock=0`);
  await button(page, "Price").click();
  await maximumPrice(page, 380);
  await button(page, "Reset").click();
  await expect(page.getByRole("slider", { name: "Minimum price" })).toHaveValue(
    "0",
  );
  await expect(page.getByRole("slider", { name: "Maximum price" })).toHaveValue(
    "2000",
  );
  await maximumPrice(page, 380);
  await button(page, "Done").click();
  await expect
    .poll(() => criteria(page))
    .toMatchObject({
      stock: "0",
      max: "380",
      filter: null,
    });
  await expect(
    page.getByRole("heading", { name: "Best Sellers", exact: true }),
  ).toBeVisible();
  await expect(button(page, "Price")).toBeFocused();
});

test("store search suggestions, results, filters and browser history retain the query", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, `${store}/search`);
  const input = page.getByRole("textbox", {
    name: "Search KITSCH",
    exact: true,
  });
  await input.fill("shampoo");
  await expect(page.locator(".store-search-suggestions a")).toHaveCount(3);
  await input.press("Enter");
  await expect(page.locator(".store-search-count")).toHaveText(
    "270 results from KITSCH",
  );
  await button(page, "Price").click();
  await maximumPrice(page, 380);
  await button(page, "Done").click();
  await expect
    .poll(() => criteria(page))
    .toMatchObject({
      q: "shampoo",
      max: "380",
      filter: null,
    });
  await expect(page.locator(".store-search-results")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/stores\/kitsch\/search$/);
  await page.goForward();
  await expect(input).toHaveValue("shampoo");
  await expect(page.locator(".store-search-results")).toBeVisible();
  expect((await criteria(page)).max).toBe("380");
});

test("the first collection prompt is caused by a real save and dismissal keeps that saved item", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, collection, "saved-empty");
  const save = button(page, "Save Rice Water Shampoo & Conditioner Combo");
  await expect(dialog(page, "Start your first collection")).not.toBeVisible();
  await save.click();
  await expect(dialog(page, "Start your first collection")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog(page, "Start your first collection")).not.toBeVisible();
  const unsave = button(page, "Unsave Rice Water Shampoo & Conditioner Combo");
  await expect(unsave).toBeFocused();
  await visitSaved(page);
  await expect(
    page.locator('.saved-grid [data-product-id="rice-bundle"]'),
  ).toBeVisible();
  await expect(page.locator(".collection-tile")).toHaveCount(0);
});

test("first-save creation uses the shared validated editor and reaches real Saved membership", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, collection, "saved-empty");
  await button(page, "Save Rice Water Shampoo & Conditioner Combo").click();
  await dialog(page, "Start your first collection")
    .getByRole("button", { name: "Create collection", exact: true })
    .click();
  const name = page.getByRole("textbox", {
    name: "Collection name",
    exact: true,
  });
  await expect(name).toBeFocused();
  await name.fill("   ");
  await expect(button(page, "Save")).toBeDisabled();
  await name.fill("Store picks");
  await button(page, "Save").click();
  await expect(
    page.getByRole("heading", { name: "Add from saved", exact: true }),
  ).toBeVisible();
  await button(page, "Add Rice Water Shampoo & Conditioner Combo").click();
  await button(page, "Done").click();
  await expect(
    page.getByRole("heading", { name: "Store picks", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('.saved-grid [data-product-id="rice-bundle"]'),
  ).toBeVisible();
  await visitSaved(page);
  await expect(page.locator(".collection-tile")).toHaveCount(1);
});

test("Follow persists through a real information-page visit without altering the cart", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, store);
  const before = await page.locator(".dock-cart-count").allTextContents();
  await button(page, "Follow").click();
  await expect(button(page, "Following")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page
    .getByRole("link", { name: "Store information", exact: true })
    .click();
  // Following exists on both pages; it cannot establish that navigation ended.
  await expect(page).toHaveURL(/\/stores\/kitsch\/info$/);
  await expect(
    page.getByRole("link", { name: "Close store information", exact: true }),
  ).toBeVisible();
  await expect(button(page, "Following")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.goBack();
  await expect(page).toHaveURL(/\/stores\/kitsch$/);
  await expect(page.locator(".store-page")).toBeVisible();
  await expect(button(page, "Following")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(await page.locator(".dock-cart-count").allTextContents()).toEqual(
    before,
  );
  await page.goForward();
  await expect(page).toHaveURL(/\/stores\/kitsch\/info$/);
  await expect(button(page, "Following")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("store collection and filter controls remain contained at 320, 393 and 430 pixels", async ({
  page,
  baseURL,
}) => {
  await openScenario(page, baseURL, collection);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    await button(page, "Filter collection").click();
    await expect(dialog(page, "Filter")).toBeVisible();
    await expect(button(page, "Done")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await dialog(page, "Filter")
      .getByRole("button", { name: "Price", exact: true })
      .click();
    await expect(
      page.getByRole("slider", { name: "Maximum price" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await button(page, "Done").click();
    await expect(dialog(page, "Price")).not.toBeVisible();
  }
  expect(errors).toEqual([]);
});

import { expect, test, type Page } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

async function open(page: Page) {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/explore");
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "Explore", exact: true }),
  ).toBeVisible();
}
async function inspect(page: Page, name: string) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) =>
        image.decode().catch(() => undefined),
      ),
    );
  });
  await test.info().attach(name, {
    body: await page.screenshot(),
    contentType: "image/png",
  });
}

test("Explore preserves the six captured departments and the ordered product shelves", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 793 });
  await open(page);
  await expect(page.locator(".explore-categories h3")).toHaveText([
    "Deals",
    "Beauty",
    "Women",
    "Men",
    "Home",
    "Fitness & nutrition",
  ]);
  await expect(page.locator(".editorial-hero strong")).toHaveText(
    "High-rotation summer dresses",
  );
  await expect(page.locator(".explore-shelf h2")).toHaveText([
    "Top rated in home ›",
    "Top rated in menswear ›",
    "New in beauty ›",
    "Top rated in womenswear ›",
  ]);
  const beautyProducts = page
    .locator(".explore-shelf")
    .nth(2)
    .locator(".product-media a");
  await expect(beautyProducts).toHaveCount(2);
  expect(
    await beautyProducts.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    ),
  ).toEqual(["/products/bubble-sunrise", "/products/bare-liquid"]);
  await inspect(page, "explore-departments");
  await page.locator(".explore-minis").evaluate((element) => {
    window.scrollBy(0, element.getBoundingClientRect().top - 28);
  });
  await inspect(page, "explore-minis-and-home-shelf");
  const photos = await page
    .locator(".explore-categories img")
    .evaluateAll((images) =>
      images.every(
        (image) =>
          (image as HTMLImageElement).complete &&
          (image as HTMLImageElement).naturalWidth > 0,
      ),
    );
  expect(photos).toBe(true);
});

test("the Mini heading opens the real catalogue and a Mini visit survives the return to Explore", async ({
  page,
}) => {
  await open(page);
  const minis = page.getByRole("link", {
    name: "Try something new",
    exact: true,
  });
  await minis.click();
  await expect(page).toHaveURL(/\/minis$/);
  await expect(
    page.getByRole("heading", { name: "Minis", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/explore$/);
  await page.locator('.explore-minis a[href="/minis/sol"]').click();
  await expect(page).toHaveURL(/\/minis\/sol$/);
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/\/minis\/sol$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/explore$/);
  await minis.click();
  await expect(page).toHaveURL(/\/minis$/);
  const recent = page.locator('.mini-recent a[href="/minis/sol"]');
  await expect(recent).toHaveCount(1);
  await expect(recent).toBeVisible();
  await expect(recent).toHaveAccessibleName("Sol: Browse by Voice");
  await page.reload();
  await expect(recent).toBeVisible();
});

test("Beauty retains every captured section and its saved product uses the shared buyer state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 793 });
  await open(page);
  await page.locator('.explore-categories a[href="/explore/Beauty"]').click();
  await expect(page).toHaveURL(/\/explore\/Beauty$/);
  await expect(
    page.getByRole("heading", { name: "Beauty", exact: true }),
  ).toBeVisible();
  // Flow 51 contains these three editorials and six section headings in order.
  await expect(page.locator(".editorial-hero strong")).toHaveText([
    "Summer curl routine",
    "Skincare starter set",
    "Vacation-ready nails",
  ]);
  await expect(page.locator(".explore-page h2")).toHaveText([
    "Top rated ›",
    "What’s new ›",
    "Scent & body",
    "Favorites for a reason",
    "Bestsellers ›",
    "Sweet deals",
  ]);
  await inspect(page, "beauty-category-top");
  await page
    .getByRole("button", {
      name: "Save Whip Volumizing Mousse",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("button", {
      name: "Unsave Whip Volumizing Mousse",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: "Saved", exact: true }).click();
  await expect(
    page.locator('.saved-grid [data-product-id="whip-mousse"]'),
  ).toBeVisible();
});

test("Explore and Beauty stay within the three reference widths and expose a working empty cart", async ({
  page,
}) => {
  await open(page);
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Open cart", exact: true }).click();
    const cart = page.getByRole("dialog", { name: "Your cart", exact: true });
    await expect(cart).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(cart).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Open cart", exact: true }),
    ).toBeFocused();
  }
  await page.locator('.explore-categories a[href="/explore/Beauty"]').click();
  await expect(page).toHaveURL(/\/explore\/Beauty$/);
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

const shea = "Shea Butter Exfoliating Body Wash";

test("the captured arrival entry keeps its offer after the real first-visit tip expires", async ({
  page,
}) => {
  await page.setViewportSize({ width: 393, height: 793 });
  await useReferenceScenario(page, "kitsch-product-arrival");
  await page.goto("/stores/kitsch");
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await page.locator("main img").evaluateAll(async (images) => {
    await document.fonts.ready;
    await Promise.all(
      images.map((image) => (image as HTMLImageElement).decode()),
    );
  });
  await page.locator(".store-grid-heading").evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + scrollY - 79,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".store-category-navigation")).toHaveClass(
    /is-pinned/,
  );
  await expect(page.locator(".store-compact-promotion")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Open cart", exact: true }),
  ).toHaveCount(0);
  await page
    .locator('#all-products a[href="/products/shea-butter"]')
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: shea, exact: true }),
  ).toBeVisible();
  await expect(page.locator(".product-price-alert-tip")).toBeVisible();
  await expect(page.locator(".product-deal")).toContainText(
    "Save $15 when you spend $50",
  );
  await expect(page.locator(".product-underlay > .store-row")).toContainText(
    "194.9K",
  );
  await expect(page.locator(".product-price-alert-tip")).not.toBeVisible({
    timeout: 7000,
  });
  await expect(page.locator(".product-deal")).toContainText(
    "Save $15 when you spend $50",
  );
  await expect(page.locator(".product-underlay > .store-row")).toContainText(
    "194.9K",
  );
  await page.locator(".product-deal").click();
  await expect(
    page.getByRole("dialog", { name: "Offer details", exact: true }),
  ).toContainText("Save $15 when you spend $50");
});

test("the separately captured settled entry starts at 20/195K without borrowing a Follow seed", async ({
  page,
}) => {
  await useReferenceScenario(page, "kitsch-product-settled");
  await page.goto("/products/shea-butter");
  await expect(
    page.getByRole("heading", { name: shea, exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await expect(page.locator(".product-price-alert-tip")).toHaveCount(0);
  await expect(page.locator(".product-deal")).toContainText(
    "Save $20 when you spend $50",
  );
  await expect(page.locator(".product-underlay > .store-row")).toContainText(
    "195K",
  );
  await page.reload();
  await expect(page.locator(".product-deal")).toContainText(
    "Save $20 when you spend $50",
  );
  await expect(page.locator(".product-underlay > .store-row")).toContainText(
    "195K",
  );
  await expect(page.locator(".product-price-alert-tip")).toHaveCount(0);
});

test("saving in the later captured offer entry changes membership without changing the offer", async ({
  page,
}) => {
  await useReferenceScenario(page, "kitsch-product-saving-offer");
  await page.goto("/products/shea-butter");
  await expect(
    page.getByRole("heading", { name: shea, exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  const deal = page.locator(".product-deal");
  const store = page.locator(".product-underlay > .store-row");
  await expect(deal).toContainText("20% off your order");
  await expect(deal).toContainText("Applied at checkout");
  await expect(store).toContainText("195.2K");
  await expect(
    page.getByText("Arrives as soon as Sun, Aug 2", { exact: true }).first(),
  ).toBeVisible();
  await expect(page.locator(".product-price")).toHaveText("$14.00");
  await page.getByRole("button", { name: "Save product", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Save to collection", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await expect(page.locator(".product-saved-toast")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Save product", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(deal).toContainText("20% off your order");
  await expect(store).toContainText("195.2K");
  await expect(page.locator(".product-price")).toHaveText("$14.00");
  await deal.click();
  await expect(
    page.getByRole("dialog", { name: "Offer details", exact: true }),
  ).toContainText(
    "20% off your order. Applied at checkout. This is a reference offer.",
  );
});

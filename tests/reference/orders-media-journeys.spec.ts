import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test("manual order recommendations open their canonical products and retain a saved selection", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-manual");
  await page.goto("/orders/REF-manual-shirt");
  const tire = page.locator(".product-card").filter({
    has: page.locator('a.product-copy[href="/products/order-tire-trim"]'),
  });
  await expect(tire).toContainText("Chemical Guys");
  await tire.getByRole("button", { name: /^Save Tire\+Trim/ }).click();
  await expect(
    tire.getByRole("button", { name: /^Unsave Tire\+Trim/ }),
  ).toBeVisible();
  await tire.locator(".product-copy").click();
  await expect(page).toHaveURL(/\/products\/order-tire-trim$/);
  await expect(
    page.getByRole("heading", {
      name: "Tire+Trim Gel Plastic and Rubber High-Glo…",
      exact: true,
    }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    tire.getByRole("button", { name: /^Unsave Tire\+Trim/ }),
  ).toBeVisible();
});

test("later captured manual delivery yields to local unmark and mark actions", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-manual-delivered");
  await page.goto("/orders/REF-manual-shirt?history=delivered-later");
  await expect(
    page.getByText("Arrived at 5:09 PM", { exact: true }),
  ).toBeVisible();
  await expect(
    page.locator(".tracking-detail .product-copy").first(),
  ).toHaveAttribute("href", "/products/home-drmtlgy-eye");
  await page
    .getByRole("button", { name: "Unmark as delivered", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Label created", exact: true }),
  ).toBeVisible();
  await expect(page).not.toHaveURL(/[?&]history=/);
  await expect(
    page.locator(".tracking-detail .product-copy").first(),
  ).toHaveAttribute("href", "/products/order-tire-trim");
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  await expect(
    page.getByText("Arrived at 7:34 PM", { exact: true }),
  ).toBeVisible();
});

test("tracking map follows delivery state and returns through its connected hide/show history", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-transit");
  await page.goto("/orders/REF-1001?view=tracking&map=1");
  const map = page.locator(".tracking-map");
  const geography = map.locator(":scope > img");
  await expect(geography).toHaveAttribute(
    "src",
    "/api/reference-media/order-tracking-map-transit",
  );
  await expect(map.locator(":scope > svg")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  await expect(geography).toHaveAttribute(
    "src",
    "/api/reference-media/order-tracking-map-delivered",
  );
  await expect(map.locator(":scope > svg")).toBeAttached();
  await page.locator(".tracking-status-card").click();
  await expect(map).toHaveCount(0);
  await page.goBack();
  await expect(geography).toHaveAttribute(
    "src",
    "/api/reference-media/order-tracking-map-delivered",
  );
  await page
    .getByRole("button", { name: "Unmark as delivered", exact: true })
    .click();
  await expect(geography).toHaveAttribute(
    "src",
    "/api/reference-media/order-tracking-map-transit",
  );
  await expect(map.locator(":scope > svg")).toHaveCount(0);
});

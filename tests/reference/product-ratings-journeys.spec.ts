import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

const title =
  "Midi Shirtdress in Ultrasoft Cotton | Estate Blue/Open Air/White";

test("the dress ratings link never inherits a different product's review text", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/products/midi-shirtdress");
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await page.locator(".review-link").click();
  await expect(page).toHaveURL(/\/products\/midi-shirtdress\/reviews$/);
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "4.5 out of 5 stars", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "Individual reviews were not included for this product",
  );
  await expect(page.getByText("2 ratings", { exact: false })).toBeVisible();
  await expect(page.locator(".review-item")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Helpful/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Go back", exact: true }).click();
  await expect(page).toHaveURL(/\/products\/midi-shirtdress$/);
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
});

test("a missing product cannot open the default Shea reviews", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  const response = await page.goto("/products/not-in-the-catalog/reviews");
  expect(response?.status()).toBe(404);
  await expect(page.locator(".review-item")).toHaveCount(0);
});

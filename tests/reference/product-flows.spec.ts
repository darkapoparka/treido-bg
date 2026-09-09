import { test, expect } from "@playwright/test";

test("product gallery closes through browser history and restores its trigger", async ({
  page,
}) => {
  await page.goto("/products/shea-butter");
  const trigger = page.getByRole("button", {
    name: "View product image 1",
    exact: true,
  });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Product photos" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show photo 2", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Show photo 2", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goBack();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("product saving chooses a collection and retains its membership", async ({
  page,
}) => {
  await page.goto("/products/shea-butter");
  await page.getByRole("button", { name: "Save product", exact: true }).click();
  await page
    .getByRole("button", { name: "Create collection", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Collection name" })
    .fill("Body care");
  await page
    .getByRole("button", { name: "Create collection", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Item saved" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "View", exact: true }).click();
  await expect(page).toHaveURL(/\/saved$/);
  await expect(page.getByText("Body care", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Body care", exact: true }).click();
  await expect(
    page
      .getByRole("link", {
        name: "Shea Butter Exfoliating Body Wash",
        exact: true,
      })
      .first(),
  ).toBeVisible();
});

test("review search and helpful selection affect the selected review", async ({
  page,
}) => {
  await page.goto("/products/shea-butter/reviews");
  await page.getByRole("textbox", { name: "Search reviews" }).fill("nice");
  await expect(page.locator(".review-card")).toHaveCount(4);
  const review = page.locator(".review-card").first();
  await review.getByRole("button", { name: "Helpful", exact: true }).click();
  await expect(
    review.getByRole("button", { name: "Helpful (1) ✓", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .locator(".review-card")
      .nth(1)
      .getByRole("button", { name: "Helpful", exact: true }),
  ).toBeVisible();
});

import { test, expect, type Page } from "@playwright/test";

async function openCheckout(page: Page) {
  await page.goto("/products/shampoo-bag");
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.getByRole("button", { name: "Open cart", exact: true }).click();
  await page.getByRole("link", { name: "Continue to checkout" }).click();
}

test("initial access sheet survives Strict Mode and closes one history entry", async ({
  page,
}) => {
  await page.goto("/minis");
  await page
    .getByRole("link", { name: /Sol: Browse by Voice/ })
    .first()
    .click();
  const permission = page.getByRole("dialog");
  await expect(permission).toBeVisible();
  // Exercise a render opportunity after mount-effect replay, not just first paint.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  await expect(permission).toBeVisible();
  await page.goBack();
  await expect(permission).not.toBeVisible();
  await expect(page).toHaveURL(/\/minis\/sol$/);
});

test("nested billing Back and Cancel preserve the payment editor", async ({
  page,
}) => {
  await openCheckout(page);
  await page.getByRole("button", { name: /Pay another way/ }).click();
  const payment = page.getByRole("dialog", {
    name: "Payment methods",
    exact: true,
  });
  await expect(payment).toBeVisible();
  await payment
    .getByRole("textbox", { name: "Nickname (optional)" })
    .fill("Reference billing draft");
  await payment
    .getByRole("button", { name: /Use a different address/ })
    .click();
  const billing = page.getByRole("dialog", {
    name: "Billing address",
    exact: true,
  });
  await expect(billing).toBeVisible();
  await page.goBack();
  await expect(billing).not.toBeVisible();
  await expect(payment).toBeVisible();
  await expect(
    payment.getByRole("textbox", { name: "Nickname (optional)" }),
  ).toHaveValue("Reference billing draft");
  await payment
    .getByRole("button", { name: /Use a different address/ })
    .click();
  await billing.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(billing).not.toBeVisible();
  await expect(payment).toBeVisible();
  await expect(
    payment.getByRole("button", { name: /Use a different address/ }),
  ).toBeFocused();
});

test("replacement order confirmation remains open and updates only the selected order", async ({
  page,
}) => {
  await page.goto("/orders/REF-1001");
  await expect(
    page.getByText("Review your order", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Order options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  const confirmation = page.getByRole("dialog", {
    name: "Mark as delivered?",
    exact: true,
  });
  await expect(confirmation).toBeVisible();
  await confirmation
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  await expect(confirmation).not.toBeVisible();
  await expect(
    page.getByText("Review your order", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Buy again", exact: true }),
  ).toBeVisible();
});

test("filter Back visits the parent sheet before dismissing", async ({
  page,
}) => {
  await page.goto("/search?q=Jeans");
  await page.getByRole("button", { name: "Filter", exact: true }).click();
  await page.getByRole("button", { name: /Sort by/ }).click();
  await expect(
    page.getByRole("dialog", { name: "Sort by", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("dialog", { name: "Sort by", exact: true }),
  ).not.toBeVisible();
  await expect(
    page.getByRole("dialog", { name: "Filter", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/\/search\?q=Jeans$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

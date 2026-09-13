import { expect, test } from "@playwright/test";

import { useReferenceScenario } from "./helpers";

test("payment field helpers preserve entered values and let the buyer correct the card name", async ({
  page,
}) => {
  await useReferenceScenario(page, "checkout");
  await page.goto("/checkout?store=kitsch");
  await page.getByRole("button", { name: /^Payment/ }).click();
  await page.getByRole("button", { name: /Pay another way/ }).click();
  const editor = page.getByRole("dialog", {
    name: "Payment methods",
    exact: true,
  });
  const name = editor.getByRole("textbox", {
    name: "Name on card",
    exact: true,
  });
  await expect(name).toHaveValue("Alex Smith");
  await editor
    .getByRole("textbox", { name: "Card number", exact: true })
    .fill("4242424242424242");
  await editor
    .getByRole("textbox", { name: "Security code", exact: true })
    .fill("123");
  await editor
    .getByRole("button", { name: "Clear name on card", exact: true })
    .click();
  await expect(name).toBeEmpty();
  await expect(name).toBeFocused();
  await name.fill("Alex Smith");
  const help = editor.getByRole("button", {
    name: "About security code",
    exact: true,
  });
  await help.click();
  await expect(editor.getByRole("status")).toContainText(
    "3 or 4 digit security code",
  );
  await help.click();
  await expect(editor.getByRole("status")).toHaveCount(0);
  await editor.getByRole("button", { name: /^Bill to/ }).click();
  await expect(
    editor.locator(".source-billing-options .selected"),
  ).toContainText("Alex Smith, 1226 University Dr");
  await expect(
    editor.locator(".source-billing-options .selected"),
  ).toContainText("+16502137552");
  await expect(
    editor.getByRole("textbox", { name: "Card number", exact: true }),
  ).toHaveValue("4242424242424242");
  await expect(
    editor.getByRole("textbox", { name: "Security code", exact: true }),
  ).toHaveValue("123");
  await editor.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(
    page.getByRole("button", { name: /Pay another way/ }),
  ).toBeFocused();
});

test("captured confirmation opens related products and keeps receipt sharing available after scrolling", async ({
  page,
  context,
}) => {
  await useReferenceScenario(page, "checkout");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/orders/REF-1001/confirmation");
  await page
    .getByRole("link", { name: "Black Conditioner Bar Bag", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/products\/black-conditioner-bag/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Order confirmed", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "View order receipt", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Email address", exact: true })
    .scrollIntoViewIfNeeded();
  const share = page.getByRole("button", {
    name: "Share receipt",
    exact: true,
  });
  await expect(share).toBeInViewport();
  await share.click();
  await expect(page.getByRole("status")).toHaveText("Receipt link copied");
});

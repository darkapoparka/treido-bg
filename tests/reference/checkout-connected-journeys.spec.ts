import { expect, test } from "@playwright/test";

import { useReferenceScenario } from "./helpers";

test("checkout keeps delivery and payment expanded together and re-quotes a selected method", async ({
  page,
}) => {
  await useReferenceScenario(page, "checkout");
  await page.goto("/checkout?store=kitsch");
  for (const name of [/^Ship to/, /^Shipping/, /^Plan/, /^Payment/]) {
    await page.getByRole("button", { name }).click();
  }
  await expect(
    page.locator('.checkout-section-toggle[aria-expanded="true"]'),
  ).toHaveCount(4);
  await expect(
    page.getByText("Installments unavailable", { exact: true }),
  ).toBeVisible();
  await page.getByRole("radio", { name: /Priority Shipping/ }).check();
  await expect(
    page.getByRole("button", { name: /Pay now \$15\.74/ }),
  ).toBeEnabled();
  await expect(
    page.locator('.checkout-section-toggle[aria-expanded="true"]'),
  ).toHaveCount(4);

  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    const pay = await page.locator(".checkout-pay").boundingBox();
    expect(pay).not.toBeNull();
    expect(pay!.x).toBeGreaterThanOrEqual(0);
    expect(pay!.x + pay!.width).toBeLessThanOrEqual(width);
  }
});

test("initial checkout address has compact details, preserves edits through Back and Forward, and reaches card entry", async ({
  page,
}) => {
  await useReferenceScenario(page, "checkout");
  await page.goto("/checkout?store=kitsch&stage=address-search");
  await page
    .getByRole("textbox", { name: "Search address" })
    .fill("1226 University Dr, Menlo");
  await page.getByRole("button", { name: /^1226 University Dr/ }).click();
  await expect(page).toHaveURL(/stage=address$/);
  await expect(page.locator(".source-selected-address")).toContainText(
    "1226 University Dr",
  );
  const first = page.getByRole("textbox", { name: "First name", exact: true });
  const last = page.getByRole("textbox", { name: "Last name", exact: true });
  await expect(first).toBeEmpty();
  await expect(last).toBeEmpty();
  await first.fill("Alex");
  await last.fill("Smith");
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Address", exact: true }),
  ).toHaveValue("1226 University Dr");
  await expect(first).toHaveValue("Alex");
  await page.goBack();
  await expect(page).toHaveURL(/stage=address-search$/);
  await expect(
    page.getByRole("textbox", { name: "Search address" }),
  ).toBeVisible();
  await page.goForward();
  await expect(page).toHaveURL(/stage=address$/);
  await expect(first).toHaveValue("Alex");
  await expect(last).toHaveValue("Smith");
  await page
    .getByRole("button", { name: "Continue to payment details", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Add a card", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Go back", exact: true }).click();
  await expect(first).toHaveValue("Alex");
  await expect(last).toHaveValue("Smith");
});

test("phone-code URL survives reload without implying a code was sent to an unknown number", async ({
  page,
}) => {
  await useReferenceScenario(page, "checkout");
  await page.goto("/checkout?store=kitsch&stage=phone");
  await page
    .getByRole("textbox", { name: "Phone number", exact: true })
    .fill("6502137552");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/stage=phone&verification=code$/);
  await expect(
    page.getByRole("heading", { name: "Confirm it’s you", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Confirm it’s you", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Security code", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Enter your security code to continue.", { exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Add phone number", exact: true }),
  ).toBeVisible();
});

test("review address default, cancel and delete keep one default and restore a usable trigger", async ({
  page,
}) => {
  await useReferenceScenario(page, "checkout");
  await page.goto("/checkout?store=kitsch");
  await page.getByRole("button", { name: /^Ship to/ }).click();
  await page.getByRole("button", { name: /Use a different address/ }).click();
  const editor = page.getByRole("dialog", { name: "Add address", exact: true });
  await editor
    .getByRole("textbox", { name: "Address", exact: true })
    .fill("1226 University Dr, Menlo");
  await editor.locator(".source-address-result").click();
  await editor
    .getByRole("button", { name: "Save address", exact: true })
    .click();
  const addresses = page.locator(".checkout-addresses .address-radio");
  await expect(addresses).toHaveCount(2);
  await page.getByRole("button", { name: /Set .* as default address/ }).click();
  await expect(page.locator(".checkout-addresses .default-pill")).toHaveCount(
    1,
  );
  await expect(
    page.locator(".checkout-addresses .selected .default-pill"),
  ).toBeVisible();
  const options = page.locator(
    ".checkout-addresses .selected .context-trigger",
  );
  await options.click();
  await page.locator(".checkout-context-menu .danger-text").click();
  const confirmation = page.getByRole("dialog", {
    name: "Delete address",
    exact: true,
  });
  await confirmation
    .getByRole("button", { name: "Cancel", exact: true })
    .click();
  await expect(addresses).toHaveCount(2);
  await expect(options).toBeFocused();
  await options.click();
  await page.locator(".checkout-context-menu .danger-text").click();
  await confirmation
    .getByRole("button", { name: "Delete", exact: true })
    .click();
  await expect(addresses).toHaveCount(1);
  await expect(page.locator(".checkout-addresses .default-pill")).toHaveCount(
    1,
  );
  await expect(options).toBeFocused();
  await expect(
    page.getByRole("button", { name: /Pay now \$10\.82/ }),
  ).toBeEnabled();
});

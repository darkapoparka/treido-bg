import { expect, test, type Page } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 393, height: 793 });
});

async function openTrackingEditor(page: Page) {
  await page
    .getByRole("button", { name: "Edit tracking details", exact: true })
    .click();
  const editor = page.getByRole("dialog", {
    name: "Edit tracking details",
    exact: true,
  });
  await expect(editor).toBeVisible();
  return editor;
}

test("source detail status yields to local delivery changes and keeps the source recommendation order", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-waiting");
  await page.goto("/orders/REF-1001?state=waiting");
  await expect(page.locator(".order-status")).toContainText(
    "Waiting for details",
  );
  await page
    .getByRole("button", { name: "Order options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark order as delivered", exact: true })
    .click();
  await expect(page.locator(".order-status")).toContainText("Delivered Aug 1");
  await expect(page.locator(".order-status [data-order-phase]")).toHaveCount(0);
  await expect(page).not.toHaveURL(/[?&]state=/);
  await expect(page.locator(".review-invitation")).toBeVisible();
  const products = page.locator(".product-rail .product-copy");
  await expect(products.nth(0)).toHaveAttribute(
    "href",
    "/products/black-conditioner-bag",
  );
  await expect(products.nth(1)).toHaveAttribute(
    "href",
    "/products/chocolate-body-bag",
  );
  await page
    .getByRole("button", { name: "Order options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Unmark as delivered", exact: true })
    .click();
  await expect(page.locator(".order-status")).toContainText("In transit");
  await expect(page.locator(".review-invitation")).toHaveCount(0);
  await expect(
    page.locator('.order-status [data-order-phase="transit"]'),
  ).toBeVisible();
});

test("tracking edit discards cancelled text, disables unchanged save and restores the delivery preview", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-transit");
  await page.goto("/orders/REF-1001?view=tracking&state=in-transit&map=1");
  // Geometry belongs to the interactive page. The initial SSR fieldset is
  // inert while the App Router finishes the mount and its initial scrolling.
  await expect(page.locator("[data-shop-interactive]").first()).toHaveAttribute(
    "data-shop-interactive",
    "true",
  );
  const preview = page.locator(".delivery-preview");
  await preview.evaluate((node) =>
    window.scrollBy(0, node.getBoundingClientRect().top - 33),
  );
  const initialY = await preview.evaluate(
    (node) => node.getBoundingClientRect().top,
  );
  expect(initialY).toBeGreaterThanOrEqual(20);
  expect(initialY).toBeLessThanOrEqual(46);
  let editor = await openTrackingEditor(page);
  await expect(
    editor.getByRole("button", {
      name: "Update tracking details",
      exact: true,
    }),
  ).toBeDisabled();
  await editor
    .getByLabel("Package name", { exact: true })
    .fill("Discard this draft");
  await editor
    .getByRole("button", { name: "Close Edit tracking details", exact: true })
    .click();
  await expect(editor).not.toBeVisible();
  editor = await openTrackingEditor(page);
  await expect(editor.getByLabel("Package name", { exact: true })).toHaveValue(
    "Shampoo Bar Bag",
  );
  await editor
    .getByLabel("Package name", { exact: true })
    .fill("Shampoo Bar Bag KITSCH");
  await editor
    .getByRole("button", { name: "Update tracking details", exact: true })
    .click();
  await expect(editor).not.toBeVisible();
  await expect(page.getByRole("status")).toContainText("Changes saved");
  const y = await preview.evaluate((node) => node.getBoundingClientRect().top);
  expect(y).toBeGreaterThanOrEqual(20);
  expect(y).toBeLessThanOrEqual(46);
  editor = await openTrackingEditor(page);
  await expect(editor.getByLabel("Package name", { exact: true })).toHaveValue(
    "Shampoo Bar Bag KITSCH",
  );
  await page.goBack();
  await expect(editor).not.toBeVisible();
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Delivered Aug 1", exact: true }),
  ).toBeVisible();
  await expect(page).not.toHaveURL(/[?&]state=/);
});

test("manual package validates carrier selection and email forwarding remains an explicit boundary", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-waiting");
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
  });
  await page.goto("/orders?view=manual");
  await page
    .getByRole("button", { name: "More order options", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Add order manually", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Add order", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Open email app", exact: true })
    .click();
  const boundary = page.getByRole("dialog", {
    name: "Email forwarding unavailable",
    exact: true,
  });
  await expect(boundary).toContainText("No request was sent");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await boundary
    .getByRole("button", { name: "Back to preview", exact: true })
    .click();
  await page.getByLabel("Tracking number", { exact: true }).fill("68448512123");
  await page
    .getByLabel("Package name", { exact: true })
    .fill("Loose Fit Printed T-Shirt");
  await page.getByLabel("Carrier", { exact: true }).fill("DHL");
  await expect(
    page.getByRole("heading", { name: "Recommended carriers", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Add order", exact: true }),
  ).not.toBeVisible();
  await page
    .getByRole("button", { name: "DHL eCommerce", exact: true })
    .click();
  await expect(page.getByLabel("Carrier", { exact: true })).toHaveValue(
    "DHL eCommerce",
  );
  await expect(
    page.getByRole("button", { name: "Add order", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Add order", exact: true }).click();
  await expect(page).toHaveURL(/\/orders\?view=manual$/);
  const first = page.locator(".tracking-card").first();
  await expect(first).toContainText("Loose Fit Printed T-Shirt");
  await expect(first).toContainText("Label created");
  await first.click();
  await expect(page.locator(".tracking-carrier")).toContainText(
    "DHL eCommerce",
  );
  await expect(page.locator(".tracking-carrier")).toContainText("68448512123");
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Delivered today", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Unmark as delivered", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Label created", exact: true }),
  ).toBeVisible();
  expect(writes).toEqual([]);
});

test("archive action removes the active card and the archived order can be restored through navigation", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-waiting");
  await page.goto("/orders/REF-1001?state=waiting");
  await page
    .getByRole("button", { name: "Order options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Archive order", exact: true })
    .click();
  await page.getByRole("link", { name: "Orders", exact: true }).click();
  await expect(page.locator(".tracking-card")).toHaveCount(0);
  await page
    .getByRole("button", { name: "More order options", exact: true })
    .click();
  await page
    .getByRole("link", { name: "View order archive", exact: true })
    .click();
  const archived = page.locator(".archive-order-row");
  await expect(archived).toContainText("Ordered Jul 27");
  await expect(archived).toContainText("KITSCH · 1 item · $10.82");
  await archived.click();
  await page
    .getByRole("button", { name: "Order options", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Unarchive order", exact: true })
    .click();
  await page.getByRole("link", { name: "Orders", exact: true }).click();
  await expect(page.locator(".tracking-card")).toHaveCount(1);
});

test("delivered card opens the review editor, retains local edits and supports deletion without publication", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-delivered");
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
  });
  await page.goto("/orders");
  await page.locator(".tracking-card").click();
  await expect(page).toHaveURL(/\/orders\/REF-1001\/review$/);
  await expect(
    page.getByRole("button", { name: "5 stars", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "3 stars", exact: true }).click();
  await page
    .getByLabel("Tell us about the product", { exact: true })
    .fill("Love it!");
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Edit your review", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "It has not been published",
  );
  await page.getByRole("link", { name: "Close review", exact: true }).click();
  await page.locator(".review-invitation").click();
  await expect(
    page.getByLabel("Tell us about the product", { exact: true }),
  ).toHaveValue("Love it!");
  await expect(
    page.getByRole("button", { name: "4 stars", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("button", { name: "Review options", exact: true })
    .click();
  await page
    .getByRole("dialog", { name: "Your review", exact: true })
    .getByRole("button", { name: "Delete", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Review your order", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Tell us about the product", { exact: true }),
  ).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Submit", exact: true }),
  ).toBeDisabled();
  expect(writes).toEqual([]);
});

test("delivery history keeps all recorded events in order and closes with browser Back", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-delivered");
  await page.goto("/orders/REF-1001?view=tracking&map=1");
  await page
    .getByRole("button", { name: "View all activity", exact: true })
    .click();
  const activity = page.getByRole("dialog", {
    name: "Delivery progress",
    exact: true,
  });
  await expect(activity.locator(".source-activity > div")).toHaveCount(9);
  await expect(activity.locator(".source-activity strong").first()).toHaveText(
    "Successfully delivered",
  );
  await expect(activity.locator(".source-activity strong").last()).toHaveText(
    "Parcel data submitted to carrier",
  );
  await activity.evaluate((node) => node.scrollTo(0, node.scrollHeight));
  await expect(
    activity.getByText("Parcel data submitted to carrier", { exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(activity).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "View all activity", exact: true }),
  ).toBeFocused();
});

for (const width of [320, 393, 430]) {
  test(`order and manual-entry surfaces stay within ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 793 });
    await useReferenceScenario(page, "orders-transit");
    for (const route of ["/orders/REF-1001?state=in-transit", "/orders/new"]) {
      await page.goto(route);
      await expect(
        page.locator('[data-shop-interactive="true"]').first(),
      ).toBeAttached();
      const sizes = await page.evaluate(() => ({
        width: window.innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(sizes.scroll).toBeLessThanOrEqual(sizes.width + 1);
    }
  });
}

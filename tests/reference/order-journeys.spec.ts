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
  await editor.evaluate(async (node) => {
    await Promise.all(
      node
        .getAnimations()
        .map((animation) => animation.finished.catch(() => undefined)),
    );
  });
  const editorGeometry = await editor.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });
  expect(editorGeometry.x).toBeGreaterThanOrEqual(-1);
  expect(editorGeometry.x).toBeLessThanOrEqual(1);
  expect(editorGeometry.y).toBeGreaterThanOrEqual(-1);
  expect(editorGeometry.y).toBeLessThanOrEqual(1);
  expect(editorGeometry.width).toBeGreaterThanOrEqual(392);
  expect(editorGeometry.width).toBeLessThanOrEqual(394);
  expect(editorGeometry.height).toBeGreaterThanOrEqual(792);
  expect(editorGeometry.height).toBeLessThanOrEqual(794);
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

test("captured Amazon label tracking keeps a compact carrier handoff at mobile widths", async ({
  page,
}) => {
  await useReferenceScenario(page, "orders-transit");
  await page.goto("/orders/REF-1001?view=tracking&progress=label");
  await expect(page.locator("[data-shop-interactive]").first()).toHaveAttribute(
    "data-shop-interactive",
    "true",
  );
  const carrier = page.locator(".tracking-carrier");
  await expect(carrier).toHaveAttribute("data-carrier-mark", "amazon");
  await expect(carrier).toContainText("Amazon Logistics");
  await expect(carrier).toContainText("TBA333200762603");

  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    const geometry = await page.evaluate(() => {
      const carrierCard =
        document.querySelector<HTMLElement>(".tracking-carrier");
      const orderCard = document.querySelector<HTMLElement>(
        ".tracking-order-card",
      );
      if (!carrierCard || !orderCard)
        throw new Error("Tracking continuation cards are missing");
      const carrierRect = carrierCard.getBoundingClientRect();
      const orderRect = orderCard.getBoundingClientRect();
      return {
        carrierHeight: carrierRect.height,
        continuationGap: orderRect.top - carrierRect.bottom,
        documentWidth: document.documentElement.scrollWidth,
      };
    });
    expect(geometry.carrierHeight).toBeGreaterThanOrEqual(138);
    expect(geometry.carrierHeight).toBeLessThanOrEqual(142);
    expect(geometry.continuationGap).toBeGreaterThanOrEqual(14);
    expect(geometry.continuationGap).toBeLessThanOrEqual(18);
    expect(geometry.documentWidth).toBeLessThanOrEqual(width + 1);
  }

  await page.setViewportSize({ width: 393, height: 793 });
  const preview = page.locator(".delivery-preview");
  await preview.evaluate((node) =>
    window.scrollBy(0, node.getBoundingClientRect().top - 12),
  );
  const recommendationGap = await page.evaluate(() => {
    const heading = [...document.querySelectorAll<HTMLElement>("h2")].find(
      (node) => node.textContent?.includes("Popular at KITSCH"),
    );
    const firstCard = document.querySelector<HTMLElement>(
      ".product-rail .product-card",
    );
    if (!heading || !firstCard)
      throw new Error("Order recommendation continuation is missing");
    return (
      firstCard.getBoundingClientRect().top -
      heading.getBoundingClientRect().bottom
    );
  });
  expect(recommendationGap).toBeGreaterThanOrEqual(8);
  expect(recommendationGap).toBeLessThanOrEqual(10);
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

  const moreOptions = page.getByRole("button", {
    name: "More order options",
    exact: true,
  });
  await moreOptions.click();
  let menu = page.getByRole("dialog", { name: "More options", exact: true });
  const closeMenu = menu.getByRole("button", {
    name: "Close More options",
    exact: true,
  });
  await expect(closeMenu).toBeVisible();
  const closeSize = await closeMenu.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(closeSize.width).toBeGreaterThanOrEqual(23);
  expect(closeSize.width).toBeLessThanOrEqual(25);
  expect(closeSize.height).toBeGreaterThanOrEqual(23);
  expect(closeSize.height).toBeLessThanOrEqual(25);
  await closeMenu.click();
  await expect(menu).not.toBeVisible();
  await expect(moreOptions).toBeFocused();

  await moreOptions.click();
  menu = page.getByRole("dialog", { name: "More options", exact: true });
  await menu
    .getByRole("link", { name: "Add order manually", exact: true })
    .click();

  const fields = page.locator(".account-form > .form-field");
  await expect(fields).toHaveCount(3);
  const fieldGeometry = await fields.evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      };
    }),
  );
  for (const field of fieldGeometry) {
    expect(field.left).toBeGreaterThanOrEqual(15);
    expect(field.right).toBeLessThanOrEqual(378);
    expect(field.height).toBeGreaterThanOrEqual(57);
    expect(field.height).toBeLessThanOrEqual(59);
  }
  expect(
    Math.max(...fieldGeometry.map((field) => field.width)) -
      Math.min(...fieldGeometry.map((field) => field.width)),
  ).toBeLessThanOrEqual(1);

  const addOrder = page.getByRole("button", { name: "Add order", exact: true });
  await expect(addOrder).toBeDisabled();
  const forwardingGeometry = await page
    .locator(".forward-orders button, .forward-orders a")
    .evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }),
    );
  for (const control of forwardingGeometry) {
    expect(control.left).toBeGreaterThanOrEqual(0);
    expect(control.right).toBeLessThanOrEqual(393);
  }

  const openEmail = page.getByRole("button", {
    name: "Open email app",
    exact: true,
  });
  await openEmail.click();
  const boundary = page.getByRole("dialog", {
    name: "Email forwarding unavailable",
    exact: true,
  });
  await expect(boundary).toContainText("No request was sent");
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await boundary
    .getByRole("button", { name: "Back to preview", exact: true })
    .click();
  await expect(boundary).not.toBeVisible();
  await expect(openEmail).toBeFocused();

  await page.getByLabel("Tracking number", { exact: true }).fill("68448512123");
  await page
    .getByLabel("Package name", { exact: true })
    .fill("Loose Fit Printed T-Shirt");
  await page.getByLabel("Carrier", { exact: true }).fill("DHL");
  await expect(
    page.getByRole("heading", { name: "Recommended carriers", exact: true }),
  ).toBeVisible();
  await expect(addOrder).not.toBeVisible();

  const carrierRows = page.locator(".carrier-search .account-row");
  expect(await carrierRows.count()).toBeGreaterThanOrEqual(6);
  const carrierGeometry = await carrierRows.evaluateAll((nodes) =>
    nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        height: rect.height,
      };
    }),
  );
  for (const row of carrierGeometry) {
    expect(row.left).toBeGreaterThanOrEqual(15);
    expect(row.right).toBeLessThanOrEqual(378);
    expect(row.height).toBeGreaterThanOrEqual(66);
    expect(row.height).toBeLessThanOrEqual(68);
  }
  expect(
    Math.max(...carrierGeometry.map((row) => row.height)) -
      Math.min(...carrierGeometry.map((row) => row.height)),
  ).toBeLessThanOrEqual(1);

  const carrierArtwork = carrierRows.locator("img.dhl-mark");
  expect(await carrierArtwork.count()).toBeGreaterThanOrEqual(5);
  for (let index = 0; index < (await carrierArtwork.count()); index += 1) {
    const artwork = carrierArtwork.nth(index);
    await expect(artwork).toHaveAttribute(
      "src",
      "/api/reference-media/widget-dhl-logo",
    );
    await expect
      .poll(() =>
        artwork.evaluate((image) =>
          image instanceof HTMLImageElement ? image.naturalWidth : 0,
        ),
      )
      .toBeGreaterThan(0);
  }

  await page
    .getByRole("button", { name: "DHL eCommerce", exact: true })
    .click();
  await expect(page.getByLabel("Carrier", { exact: true })).toHaveValue(
    "DHL eCommerce",
  );
  await expect(addOrder).toBeEnabled();
  const enabledStyle = await addOrder.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
    };
  });
  expect(enabledStyle.backgroundColor).toBe("rgb(85, 50, 235)");
  expect(enabledStyle.color).toBe("rgb(255, 255, 255)");

  await addOrder.click();
  await expect(page).toHaveURL(/\/orders\?view=manual$/);
  const first = page.locator(".tracking-card").first();
  await expect(first).toContainText("Loose Fit Printed T-Shirt");
  await expect(first).toContainText("Label created");
  const manualCard = await first.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { height: rect.height };
  });
  expect(manualCard.height).toBeGreaterThanOrEqual(107);
  expect(manualCard.height).toBeLessThanOrEqual(109);
  await expect(
    first.locator('img[src="/api/reference-media/order-manual-parcel"]'),
  ).toBeVisible();
  await expect(first.locator('[data-order-phase="label"] svg')).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Go back", exact: true }),
  ).toBeVisible();

  const buyAgain = page.locator(".orders-buy-again > a");
  const buyAgainGeometry = await buyAgain.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  expect(buyAgainGeometry.width).toBeGreaterThanOrEqual(111);
  expect(buyAgainGeometry.width).toBeLessThanOrEqual(113);
  expect(buyAgainGeometry.height).toBeGreaterThanOrEqual(111);
  expect(buyAgainGeometry.height).toBeLessThanOrEqual(113);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(394);

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
  await page
    .getByLabel("Tell us about the product", { exact: true })
    .fill("Love it");
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
  ).toHaveValue("Love it");
  await expect(
    page.getByRole("button", { name: "5 stars", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");

  const reviewOptions = page.getByRole("button", {
    name: "Review options",
    exact: true,
  });
  await reviewOptions.click();
  let reviewMenu = page.getByRole("dialog", {
    name: "Your review",
    exact: true,
  });
  await reviewMenu
    .getByRole("button", { name: "Close Your review", exact: true })
    .click();
  await expect(reviewMenu).not.toBeVisible();
  await expect(reviewOptions).toBeFocused();

  await reviewOptions.click();
  reviewMenu = page.getByRole("dialog", {
    name: "Your review",
    exact: true,
  });
  await reviewMenu.getByRole("button", { name: "Delete", exact: true }).click();
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
  await activity.evaluate(async (node) => {
    await Promise.all(
      node
        .getAnimations()
        .map((animation) => animation.finished.catch(() => undefined)),
    );
  });
  const activityGeometry = await activity.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    };
  });
  expect(activityGeometry.x).toBeGreaterThanOrEqual(15);
  expect(activityGeometry.x).toBeLessThanOrEqual(17);
  expect(activityGeometry.y).toBeGreaterThanOrEqual(245);
  expect(activityGeometry.y).toBeLessThanOrEqual(249);
  expect(activityGeometry.width).toBeGreaterThanOrEqual(360);
  expect(activityGeometry.width).toBeLessThanOrEqual(362);
  expect(activityGeometry.height).toBeGreaterThanOrEqual(510);
  expect(activityGeometry.height).toBeLessThanOrEqual(514);
  await expect(
    activity.locator('[aria-label="Close Delivery progress"]'),
  ).toBeHidden();
  await expect(
    page.locator(".delivery-preview .delivery-destination"),
  ).toHaveCount(0);
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

test("the short-height manual form keeps every required control reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await useReferenceScenario(page, "orders-waiting");
  await page.goto("/orders/new");

  const requiredControls = [
    page.getByLabel("Tracking number", { exact: true }),
    page.getByLabel("Package name", { exact: true }),
    page.getByLabel("Carrier", { exact: true }),
    page.getByRole("button", { name: "Open email app", exact: true }),
    page.getByRole("link", {
      name: "Track orders automatically instead",
      exact: true,
    }),
  ];
  for (const control of requiredControls) {
    await control.scrollIntoViewIfNeeded();
    await expect(control).toBeVisible();
    const rect = await control.evaluate((node) => {
      const box = node.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom };
    });
    expect(rect.top).toBeGreaterThanOrEqual(-1);
    expect(rect.bottom).toBeLessThanOrEqual(569);
  }

  await page.getByLabel("Tracking number", { exact: true }).fill("68448512123");
  await page
    .getByLabel("Package name", { exact: true })
    .fill("Loose Fit Printed T-Shirt");
  await page.getByLabel("Carrier", { exact: true }).fill("DHL");
  await page
    .getByRole("button", { name: "DHL eCommerce", exact: true })
    .click();
  const submit = page.getByRole("button", { name: "Add order", exact: true });
  await submit.scrollIntoViewIfNeeded();
  await expect(submit).toBeEnabled();
  const submitRect = await submit.evaluate((node) => {
    const box = node.getBoundingClientRect();
    return { top: box.top, bottom: box.bottom };
  });
  expect(submitRect.top).toBeGreaterThanOrEqual(-1);
  expect(submitRect.bottom).toBeLessThanOrEqual(569);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
});

for (const width of [320, 393, 430]) {
  test(`order and manual-entry surfaces stay within ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 793 });
    await useReferenceScenario(page, "orders-transit");
    for (const route of [
      "/orders/REF-1001?state=in-transit",
      "/orders/new",
      "/orders?view=manual",
    ]) {
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

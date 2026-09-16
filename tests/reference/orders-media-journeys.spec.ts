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
  const manualContinuationGeometry = await page
    .locator(".tracking-empty")
    .evaluate((empty) => {
      const carrier = document.querySelector<HTMLElement>(".tracking-carrier");
      const panel = document.querySelector<HTMLElement>(
        ".tracking-action-panel",
      );
      const deals = [...document.querySelectorAll<HTMLElement>("h2")].find(
        (node) => node.textContent?.includes("Your deals"),
      );
      const heading = empty.querySelector<HTMLElement>("h2");
      const copy = empty.querySelector<HTMLElement>("p");
      const action = empty.querySelector<HTMLElement>(".muted-button");
      if (!carrier || !panel || !deals || !heading || !copy || !action)
        throw new Error("Manual tracking continuation is incomplete");
      const carrierRect = carrier.getBoundingClientRect();
      const emptyRect = empty.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const dealsRect = deals.getBoundingClientRect();
      const headingRect = heading.getBoundingClientRect();
      const copyRect = copy.getBoundingClientRect();
      const actionRect = action.getBoundingClientRect();
      return {
        carrierGap: emptyRect.top - carrierRect.bottom,
        emptyHeight: emptyRect.height,
        contentInset: headingRect.left - emptyRect.left,
        headingToCopy: copyRect.top - headingRect.bottom,
        copyToAction: actionRect.top - copyRect.bottom,
        panelGap: panelRect.top - emptyRect.bottom,
        dealsGap: dealsRect.top - panelRect.bottom,
      };
    });
  expect(manualContinuationGeometry.carrierGap).toBeGreaterThanOrEqual(12);
  expect(manualContinuationGeometry.carrierGap).toBeLessThanOrEqual(14);
  expect(manualContinuationGeometry.emptyHeight).toBeGreaterThanOrEqual(151);
  expect(manualContinuationGeometry.emptyHeight).toBeLessThanOrEqual(153);
  expect(manualContinuationGeometry.contentInset).toBeGreaterThanOrEqual(16);
  expect(manualContinuationGeometry.contentInset).toBeLessThanOrEqual(18);
  expect(manualContinuationGeometry.headingToCopy).toBeGreaterThanOrEqual(1);
  expect(manualContinuationGeometry.headingToCopy).toBeLessThanOrEqual(3);
  expect(manualContinuationGeometry.copyToAction).toBeGreaterThanOrEqual(15);
  expect(manualContinuationGeometry.copyToAction).toBeLessThanOrEqual(17);
  expect(manualContinuationGeometry.panelGap).toBeGreaterThanOrEqual(12);
  expect(manualContinuationGeometry.panelGap).toBeLessThanOrEqual(14);
  expect(manualContinuationGeometry.dealsGap).toBeGreaterThanOrEqual(27);
  expect(manualContinuationGeometry.dealsGap).toBeLessThanOrEqual(29);
  await expect(page).not.toHaveURL(/[?&]history=/);
  await expect(
    page.locator(".tracking-detail .product-copy").first(),
  ).toHaveAttribute("href", "/products/order-tire-trim");
  await page
    .getByRole("button", { name: "Mark as delivered", exact: true })
    .click();
  const confetti = page.locator(".delivery-confetti");
  await expect(confetti).toBeVisible();
  await expect(confetti.locator("i")).toHaveCount(35);
  const celebrationGeometry = await confetti.evaluate((node) => {
    const particles = [...node.querySelectorAll("i")].map((particle) => {
      const rect = particle.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    });
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    return {
      position: style.position,
      pointerEvents: style.pointerEvents,
      width: rect.width,
      height: rect.height,
      firstTop: Math.min(...particles.map((particle) => particle.top)),
      lastBottom: Math.max(...particles.map((particle) => particle.bottom)),
    };
  });
  expect(celebrationGeometry.position).toBe("fixed");
  expect(celebrationGeometry.pointerEvents).toBe("none");
  expect(celebrationGeometry.width).toBeGreaterThanOrEqual(392);
  expect(celebrationGeometry.width).toBeLessThanOrEqual(394);
  expect(celebrationGeometry.height).toBeGreaterThanOrEqual(792);
  expect(celebrationGeometry.height).toBeLessThanOrEqual(794);
  expect(celebrationGeometry.firstTop).toBeGreaterThanOrEqual(94);
  expect(celebrationGeometry.firstTop).toBeLessThanOrEqual(100);
  expect(celebrationGeometry.lastBottom).toBeGreaterThanOrEqual(396);
  expect(celebrationGeometry.lastBottom).toBeLessThanOrEqual(405);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(394);
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

import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test("tracking illustration advances through recorded stages without changing the URL", async ({
  page,
}) => {
  await useReferenceScenario(page, "onboarding-new");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/onboarding?step=updates&journey=new");
  const demo = page.locator("[data-tracking-demo]");
  const video = demo.locator(
    'video[data-video-key="onboarding-status-motion"]',
  );
  await expect(video).toHaveAttribute("data-video-ready", "true");
  await video.evaluate((element: HTMLVideoElement) => {
    element.pause();
    element.currentTime = 1;
  });
  await expect(demo).toHaveAttribute("data-tracking-demo", "Order placed");
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 3.5;
  });
  await expect(demo).toHaveAttribute("data-tracking-demo", "In transit");
  await expect(demo).toContainText("ETA: Monday Sep 1");
  await page.screenshot({
    path: test.info().outputPath("tracking-in-transit.png"),
  });
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 5.5;
  });
  await expect(demo).toHaveAttribute("data-tracking-demo", "Out for delivery");
  await video.evaluate((element: HTMLVideoElement) => {
    element.currentTime = 7.5;
  });
  await expect(demo).toHaveAttribute("data-tracking-demo", "Delivered");
  await expect(page).toHaveURL(/step=updates&journey=new$/);
  await expect(
    page.getByRole("button", { name: "Get tracking updates", exact: true }),
  ).toBeVisible();
});

test("intro headlines share one history entry and reduced motion keeps source stills", async ({
  page,
}) => {
  await useReferenceScenario(page, "onboarding-new");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/onboarding");
  const heading = page.locator("[data-intro-headline]");
  await expect(heading).toHaveAttribute("data-intro-headline", "0");
  await page.clock.pauseAt(
    new Date(await page.evaluate(() => Date.now() + 100)),
  );
  const historyLength = await page.evaluate(() => history.length);
  await page.clock.fastForward(2250);
  await expect(heading).toContainText("Track your orders");
  await page.screenshot({
    path: test.info().outputPath("intro-track-headline.png"),
  });
  await page.clock.fastForward(1750);
  await expect(heading).toContainText("Discover your next");
  expect(await page.evaluate(() => history.length)).toBe(historyLength);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(heading).toHaveAttribute("data-intro-headline", "0");
  await page.clock.fastForward(8000);
  await expect(heading).toHaveAttribute("data-intro-headline", "0");
  await page.goto("/onboarding?step=updates");
  await expect(page.locator("[data-tracking-demo]")).toHaveAttribute(
    "data-tracking-demo",
    "Delivered",
  );
});

test("Sol exposes Almost ready and leaving it cancels the pending greeting", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto("/minis");
  await page.goto("/minis/sol?sol=connecting");
  await expect(page.locator('[data-sol-phase="connecting"]')).toBeVisible();
  await page.clock.pauseAt(
    new Date(await page.evaluate(() => Date.now() + 100)),
  );
  await page.clock.fastForward(2400);
  await expect(
    page.getByRole("status", { name: "Almost ready" }),
  ).toBeVisible();
  await page.screenshot({
    path: test.info().outputPath("sol-almost-ready.png"),
  });
  await page.goBack();
  await page.clock.fastForward(5000);
  await expect(page).toHaveURL(/\/minis$/);
  await page.goForward();
  await expect(page.locator('[data-sol-phase="ready"]')).toBeVisible();
  await page.clock.fastForward(500);
  await expect(page.locator('[data-sol-phase="greeting"]')).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Type instead", exact: true }),
  ).toBeEnabled();
});

test("Saved header preview follows selection and cancels without replaying", async ({
  page,
}) => {
  await useReferenceScenario(page, "saved-pair");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/saved");
  await page
    .getByRole("button", { name: "Create collection", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Collection name", exact: true })
    .fill("Motion collection");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Add Shea Butter Exfoliating Body Wash",
      exact: true,
    })
    .click();
  const incoming = page.locator(".saved-preview-incoming");
  await expect(incoming).toBeVisible();
  const photo = await incoming.boundingBox();
  const header = await page.locator(".saved-heading").boundingBox();
  expect(photo?.width).toBe(32);
  expect(photo?.height).toBe(32);
  expect(photo?.y).toBeGreaterThanOrEqual(header?.y ?? 0);
  expect((photo?.y ?? 0) + 32).toBeLessThanOrEqual(
    (header?.y ?? 0) + (header?.height ?? 0) + 24,
  );
  await expect(page.locator(".saved-selection-flight")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(incoming).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(incoming).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "Remove Shea Butter Exfoliating Body Wash",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", {
      name: "Add Rice Water Shampoo & Conditioner Combo",
      exact: true,
    })
    .click();
  await expect(page.locator(".saved-preview-outgoing")).toHaveCount(1);
  await expect(incoming).toHaveAttribute("alt", "2 selected items");
  await page.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.locator(".saved-selection-preview")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Motion collection", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".saved-grid > article")).toHaveCount(2);
});

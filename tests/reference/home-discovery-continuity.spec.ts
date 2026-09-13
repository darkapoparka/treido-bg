import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test("Home mixed history uses the shared product save and recent-history navigation", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-recent-shops");
  await page.goto("/?feed=recent-stores");
  const history = page.getByRole("region", {
    name: "Recently viewed shops",
    exact: true,
  });
  await expect(history.locator("[data-recent-id]")).toHaveCount(4);
  await expect(
    history.locator('[data-recent-id="shea-butter"] img'),
  ).toHaveAttribute("src", "/api/reference-media/shea");
  const save = history.getByRole("button", {
    name: "Save Shea Butter Exfoliating Body Wash",
    exact: true,
  });
  await save.click();
  await expect(
    history.getByRole("button", {
      name: "Unsave Shea Butter Exfoliating Body Wash",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await history
    .getByRole("link", { name: "Recently viewed", exact: true })
    .click();
  await expect(page).toHaveURL(/\/search\?view=recent$/);
  const expanded = page.locator(".recent-history-grid");
  await expect(expanded.locator("[data-recent-id]")).toHaveCount(4);
  await expect(
    expanded.getByRole("button", {
      name: "Unsave Shea Butter Exfoliating Body Wash",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goBack();
  await expect(
    history.getByRole("button", {
      name: "Unsave Shea Butter Exfoliating Body Wash",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(() =>
      history
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
});

test("Deals categories remain reachable after feed scrolling and category Back navigation", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/");
  await page.getByRole("link", { name: "Deals", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Deals", exact: true }),
  ).toBeVisible();
  const filters = page.getByLabel("Deal categories", { exact: true });
  const thirdStore = page.locator(".deals-feed > section").nth(2);
  await thirdStore.evaluate((element) =>
    element.scrollIntoView({ block: "start" }),
  );
  await expect.poll(async () => (await filters.boundingBox())?.y).toBe(0);
  await filters.getByRole("link", { name: "Men", exact: true }).click();
  await expect(page).toHaveURL(/\/search\?q=Men$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/deals$/);
  await expect(filters).toBeInViewport();
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  }
});

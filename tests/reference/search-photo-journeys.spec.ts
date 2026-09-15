import { expect, test, type Page } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

const button = (page: Page, name: string) =>
  page.getByRole("button", { name, exact: true });

async function openPhotoHistory(page: Page) {
  await useReferenceScenario(page, "search-photo");
  await page.goto("/search");
  await expect(
    page.locator('[data-shop-interactive="true"]').first(),
  ).toBeAttached();
  await expect(
    page.locator('[data-captured-search-continuation="photo"]'),
  ).toBeVisible();
}

test("photo history keeps the source-bounded fourth fragment and chooser sheet at mobile widths", async ({
  page,
}) => {
  await openPhotoHistory(page);
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    const fragment = page.locator(
      '[data-captured-search-continuation="photo"]',
    );
    const geometry = await fragment.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return {
        width: bounds.width,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(geometry.width).toBeGreaterThanOrEqual(15);
    expect(geometry.width).toBeLessThanOrEqual(17);
    expect(geometry.overflow).toBe(false);
  }

  await button(page, "Add photos").click();
  const chooser = page.getByRole("dialog", { name: "Add photos", exact: true });
  await expect(chooser).toBeVisible();
  const chooserGeometry = await chooser.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const firstRow = element.querySelector<HTMLElement>(".account-row");
    const rowStyle = firstRow ? getComputedStyle(firstRow) : null;
    return {
      height: bounds.height,
      bottom: bounds.bottom,
      rowTextAlign: rowStyle?.textAlign,
      rowWidth: firstRow?.getBoundingClientRect().width ?? 0,
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  expect(chooserGeometry.height).toBeLessThanOrEqual(195);
  expect(chooserGeometry.bottom).toBeLessThanOrEqual(793);
  expect(chooserGeometry.rowTextAlign).toBe("left");
  expect(chooserGeometry.rowWidth).toBeGreaterThan(250);
  expect(chooserGeometry.overflow).toBe(false);
});

test("the captured example naturally reaches the bounded photo answer", async ({
  page,
}) => {
  await openPhotoHistory(page);
  await button(page, "Add photos").click();
  await button(page, "Use captured cap example").click();
  await expect(page.getByRole("img", { name: "Selected photo" })).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Search products", exact: true }),
  ).toBeFocused();
  await button(page, "Submit search").click();
  await expect(page).toHaveURL(/\/assistant\?example=photo$/);
  await expect(
    page.locator('[data-photo-recommendation="source-bounded-third"]'),
  ).toBeVisible();
});

test("the partial third recommendation stays bounded, invents no destination, and restores focus", async ({
  page,
}) => {
  await useReferenceScenario(page, "search-photo");
  await page.goto("/assistant?example=photo");
  const fragment = page.locator(
    '[data-photo-recommendation="source-bounded-third"]',
  );
  await fragment.scrollIntoViewIfNeeded();
  await expect(fragment).toBeVisible();
  await expect(fragment.locator("a")).toHaveCount(0);
  const trigger = fragment.getByRole("button", {
    name: "View source-bounded recommendation",
    exact: true,
  });
  const width = await fragment.evaluate(
    (element) => element.getBoundingClientRect().width,
  );
  expect(width).toBeGreaterThanOrEqual(54);
  expect(width).toBeLessThanOrEqual(56);

  await trigger.click();
  const boundary = page.getByRole("dialog", {
    name: "Source-bounded recommendation",
    exact: true,
  });
  await expect(boundary).toBeVisible();
  await expect(boundary).toContainText(
    "complete seller, title, destination, variants, and inventory",
  );
  await boundary
    .getByRole("button", { name: /^Close / })
    .click();
  await expect(boundary).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("photo answer edit search and Back preserve history without horizontal overflow", async ({
  page,
}) => {
  await useReferenceScenario(page, "search-photo");
  await page.goto("/assistant?example=photo");
  for (const width of [320, 393, 430]) {
    await page.setViewportSize({ width, height: 793 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    expect(overflow).toBe(false);
  }
  await page.getByRole("link", { name: "Edit search", exact: true }).click();
  await expect(page).toHaveURL(/\/search$/);
  await expect(
    page.locator('[data-captured-search-continuation="photo"]'),
  ).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/assistant\?example=photo$/);
  await expect(
    page.locator('[data-photo-recommendation="source-bounded-third"]'),
  ).toBeVisible();
});

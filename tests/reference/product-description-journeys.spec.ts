import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

for (const id of ["shampoo-bag", "shea-butter"] as const) {
  test(`${id} preserves its own description, paragraph layout and return focus`, async ({
    page,
  }) => {
    await useReferenceScenario(page, "home-welcome");
    await page.goto(`/products/${id}`);
    await expect(
      page.locator('[data-shop-interactive="true"]').first(),
    ).toBeAttached();
    const preview = page.locator(".pdp-description");
    const paragraphs = preview.locator(":scope > p");
    const readMore = preview.getByRole("button", {
      name: "Read more",
      exact: true,
    });
    await expect(paragraphs).toHaveCount(2);
    await expect(readMore).toHaveCount(1);
    await expect(paragraphs.last()).toContainText(
      id === "shampoo-bag"
        ? "Our patented design preserves the life..."
        : "Small plant-derived exfoliants gently exfoliate to reveal softer skin...",
    );

    for (const width of [320, 393, 430]) {
      await page.setViewportSize({ width, height: 793 });
      await expect(readMore).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.setViewportSize({ width: 393, height: 793 });
    if (id === "shampoo-bag") {
      await expect(paragraphs.last()).toHaveCSS("margin-top", "16px");
    }
    await readMore.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await readMore.click({ trial: true });
    const scroll = await page.evaluate(() => scrollY);
    expect(scroll).toBeGreaterThan(0);
    await readMore.click();
    const dialog = page.getByRole("dialog", {
      name: "Description",
      exact: true,
    });
    await expect(dialog).toBeVisible();
    if (id === "shampoo-bag") {
      await expect(dialog).toContainText(
        "Our patented design preserves the life of your bar.",
      );
      await expect(dialog).not.toContainText("Ingredients:");
    } else {
      await expect(dialog.getByRole("list")).toBeVisible();
      await expect(dialog.getByRole("listitem")).toHaveCount(4);
      await expect(dialog).toContainText("Ingredients:");
      await expect(dialog).toContainText("Fragrance: Almond & Cherry");
      await expect(dialog).not.toContainText("Mesh fabric");
    }
    await page.goBack();
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(`/products/${id}$`));
    await expect(readMore).toBeFocused();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(scroll);
    await readMore.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(readMore).toBeFocused();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(scroll);
  });
}

import { test, expect, type Locator } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

async function settled(dialog: Locator) {
  await expect(dialog).toBeVisible();
  await dialog.evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished),
    );
  });
}

test("sheet padding stays open while a geometric backdrop click closes and restores focus", async ({
  page,
}) => {
  await page.goto("/products/shea-butter");
  const trigger = page.getByRole("button", {
    name: "More options",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "More options",
    exact: true,
  });
  await settled(dialog);
  const bounds = await dialog.boundingBox();
  if (!bounds) throw new Error("Dialog has no bounds");
  await page.mouse.click(bounds.x + 3, bounds.y + bounds.height / 2);
  await expect(dialog).toBeVisible();
  await page.mouse.click(bounds.x + bounds.width / 2, bounds.y - 20);
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("dragging a sheet header dismisses it without losing the originating route", async ({
  page,
}) => {
  await page.goto("/products/shea-butter");
  const trigger = page.getByRole("button", {
    name: "More options",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "More options",
    exact: true,
  });
  await settled(dialog);
  const header = await dialog.locator(".sheet-header").boundingBox();
  if (!header) throw new Error("Missing drag header");
  await page.mouse.move(header.x + 50, header.y + 12);
  await page.mouse.down();
  await page.mouse.move(header.x + 50, header.y + 132, { steps: 8 });
  await page.mouse.up();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page).toHaveURL(/\/products\/shea-butter$/);
});

test("campaign following and not-interested undo retain the full card", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("region", { name: "Pura campaign" });
  await card.getByRole("button", { name: "More options for Pura" }).click();
  const dialog = page.getByRole("dialog", { name: "Pura", exact: true });
  await settled(dialog);
  await expect(page.locator(".home-shortcuts")).toBeInViewport();
  await dialog.getByRole("button", { name: "Follow", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "Following", exact: true }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Not interested", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Want to see less of Pura", exact: true })
    .click();
  await expect(
    card.getByRole("button", { name: "Undo", exact: true }),
  ).toBeVisible();
  expect((await card.boundingBox())?.height).toBe(630);
  await card.getByRole("button", { name: "Undo", exact: true }).click();
  await expect(
    card.getByRole("button", { name: "More options for Pura" }),
  ).toBeVisible();
  await expect(
    card.getByRole("button", { name: "Undo", exact: true }),
  ).toHaveCount(0);
});

test("all five gallery photos are reachable and reduced motion removes sheet entry animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/products/shea-butter");
  await page
    .getByRole("button", { name: "View product image 1", exact: true })
    .click();
  const photos = page.getByRole("dialog", {
    name: "Product photos",
    exact: true,
  });
  await expect(photos.getByRole("button", { name: /Show photo/ })).toHaveCount(
    5,
  );
  await photos
    .getByRole("button", { name: "Show photo 5", exact: true })
    .click();
  await expect(photos.locator(".lightbox-swipe img")).toHaveAttribute(
    "src",
    "/api/reference-media/shea-gallery-shower",
  );
  await page.goBack();
  await page.getByRole("button", { name: "More options", exact: true }).click();
  const options = page.getByRole("dialog", {
    name: "More options",
    exact: true,
  });
  await expect(options).toBeVisible();
  expect(
    await options.evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("Home reflects the actual journey instead of always showing seeded history", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("main.home-page")).toHaveAttribute(
    "data-feed",
    "welcome",
  );
  await expect(page.getByLabel("Recently viewed products")).not.toBeVisible();
  await expect(page.locator(".delivery-card")).not.toBeVisible();
  await expect(page.locator(".home-campaign").first()).toHaveAccessibleName(
    "PRINCESS POLLY campaign",
  );
  await page.goto("/products/cleo");
  await expect(
    page.getByRole("link", { name: "Home", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page.getByLabel("Recently viewed products")).toBeVisible();
});

test("the returning campaign uses six real product cards and preserves saving", async ({
  page,
}) => {
  await page.goto("/?journey=returning");
  const campaign = page.getByRole("region", { name: "DRMTLGY campaign" });
  await expect(campaign.locator(".campaign-product")).toHaveCount(6);
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link"),
  ).toHaveCount(3);
  await expect
    .poll(() =>
      campaign
        .locator(".campaign-product img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  const save = campaign.locator(".save-button").first();
  await expect(save).toHaveAttribute("aria-pressed", "false");
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  for (const width of [320, 430]) {
    await page.setViewportSize({ width, height: 793 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("the captured Pura context preserves its continuation, actual hide/Undo and an empty Cart", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-pura-options");
  await page.goto("/?feed=pura-options");
  const campaigns = page.locator(".home-campaigns > .home-campaign");
  await expect(campaigns).toHaveCount(2);
  await expect(campaigns.nth(0)).toHaveAccessibleName("Pura campaign");
  await expect(campaigns.nth(1)).toHaveAccessibleName("DRMTLGY campaign");
  await page
    .getByRole("button", { name: "More options for Pura", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Not interested", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Want to see less of Pura", exact: true })
    .click();
  const undo = campaigns
    .nth(0)
    .getByRole("button", { name: "Undo", exact: true });
  await expect(undo).toBeVisible();
  await expect(campaigns.nth(0).locator(".campaign-art")).toHaveAttribute(
    "inert",
    "",
  );
  await page.getByRole("button", { name: "Open cart", exact: true }).click();
  const cart = page.getByRole("dialog", { name: "Your cart", exact: true });
  await expect(
    cart.getByRole("heading", { name: "Your cart is empty", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(cart).not.toBeVisible();
  await expect(undo).toBeVisible();
  await undo.click();
  await expect(
    campaigns
      .nth(0)
      .getByRole("button", { name: "More options for Pura", exact: true }),
  ).toBeVisible();
  await expect(campaigns.nth(1)).toHaveAccessibleName("DRMTLGY campaign");
});

test("the shared Kitsch continuation contains only Carpe's captured identity and artwork", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/");
  const carpe = page.locator(".campaign-kitsch + .campaign-carpe");
  await expect(carpe).toHaveAccessibleName("Carpe campaign");
  await expect(carpe.locator(".campaign-brand")).toHaveAttribute(
    "href",
    "/stores/carpe",
  );
  await expect(carpe.locator(".campaign-brand img")).toHaveAttribute(
    "src",
    "/api/reference-media/home-carpe-wordmark",
  );
  await expect(
    carpe.locator(".campaign-product, .campaign-rating, .campaign-price"),
  ).toHaveCount(0);
  await carpe
    .getByRole("button", { name: "More options for Carpe", exact: true })
    .click();
  const options = page.getByRole("dialog", { name: "Carpe", exact: true });
  await options.getByRole("button", { name: "Follow", exact: true }).click();
  await expect(
    options.getByRole("button", { name: "Following", exact: true }),
  ).toBeVisible();
});

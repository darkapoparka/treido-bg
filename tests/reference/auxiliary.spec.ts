import { test, expect } from "@playwright/test";

test("onboarding artwork has visible dimensions and stages follow browser history", async ({
  page,
}) => {
  await page.goto("/onboarding?step=preferences");
  const art = page.locator(".preference-onboarding-art");
  await expect(art.locator("img")).toHaveCount(11);
  await expect
    .poll(async () => art.evaluate((el) => el.getBoundingClientRect().width))
    .toBeGreaterThan(300);
  await expect
    .poll(async () =>
      art
        .locator("img")
        .first()
        .evaluate((el) => (el as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(async () =>
      art
        .locator("img")
        .first()
        .evaluate((el) => el.getBoundingClientRect().width),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Everything", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page).toHaveURL(/step=tracking/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "What are you shopping for?" }),
  ).toBeVisible();
});

test("photo assistant entry retains a local preview and opens the captured answer", async ({
  page,
}) => {
  await page.goto("/search");
  await page.getByRole("button", { name: "Add photos", exact: true }).click();
  await page.getByRole("button", { name: "Use captured cap example" }).click();
  await expect(page.getByAltText("Selected photo")).toBeVisible();
  await page.getByRole("button", { name: "Submit search" }).click();
  await expect(
    page.getByRole("heading", { name: "Find me a baseball cap like this" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Assistant steps/ }).click();
  await expect(page.getByText("Searched for products")).toBeVisible();
});

test("captured outfit selection changes the product family", async ({
  page,
}) => {
  await page.goto("/minis/look");
  await page.getByRole("button", { name: "Choose Photo", exact: true }).click();
  await page.getByRole("button", { name: "Use reference outfit" }).click();
  await page.getByRole("button", { name: "View captured matches" }).click();
  const products = page.locator("[data-look-selection]");
  await expect(
    products.locator('a[href="/products/look-sculpt"]').first(),
  ).toBeVisible();
  await page
    .getByRole("button", {
      name: "Women’s Black Crew Neck T-shirt",
      exact: true,
    })
    .click();
  await expect(
    products.locator('a[href="/products/look-black-crew"]').first(),
  ).toBeVisible();
  await expect(products.locator('a[href="/products/look-sculpt"]')).toHaveCount(
    0,
  );
  await expect(page.locator("body")).not.toContainText(/â€™|â€¦|dÃ©/);
});

test("captured skin result keeps existing source products", async ({
  page,
}) => {
  await page.goto("/minis/skin");
  await page.getByRole("button", { name: "Analyze My Skin" }).click();
  await page.getByRole("button", { name: "Share", exact: true }).click();
  await page.getByRole("button", { name: "View reference example" }).click();
  await expect(
    page.getByRole("heading", { name: "Overall Skin Summary" }),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/products/skin-anua"]').first(),
  ).toBeVisible();
});

test("gift questions retain source result rows after local access preview", async ({
  page,
}) => {
  await page.goto("/minis/gift");
  await page.getByRole("button", { name: /Let’s Begin/ }).click();
  await page.getByRole("button", { name: "Friend", exact: true }).click();
  await page.getByRole("button", { name: "Creative", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Under $50", exact: true }).click();
  await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page.getByRole("button", { name: "Agree", exact: true }).click();
  await page.getByRole("button", { name: "View captured gift ideas" }).click();
  await expect(page.locator(".gift-result-row")).toHaveCount(3);
  await expect(page.locator('a[href="/products/gift-logic"]')).toBeVisible();
});

test("people draft follows nickname and birthday browser stages", async ({
  page,
}) => {
  await page.goto("/account/people");
  await page.getByRole("button", { name: "Add someone new" }).click();
  await page
    .getByRole("textbox", { name: "Nickname", exact: true })
    .fill("Taylor");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Add Taylor’s birthday" }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("textbox", { name: "Nickname", exact: true }),
  ).toHaveValue("Taylor");
});

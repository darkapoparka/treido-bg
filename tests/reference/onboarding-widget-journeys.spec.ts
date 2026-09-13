import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test("new shopper keeps the chosen captured example through splash, email and preferences", async ({
  page,
}) => {
  await useReferenceScenario(page, "onboarding-new");
  await page.goto("/onboarding?step=splash&journey=new&reference=captured");
  await page.getByRole("link", { name: "Get Started", exact: true }).click();
  await page
    .getByRole("link", { name: "Continue to sign in", exact: true })
    .click();
  await expect(page).toHaveURL(/reference=captured.*journey=new/);
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("alexsmith.mobbin+3@gmail.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Verification code", exact: true })
    .fill("530547");
  await expect(
    page.getByRole("heading", {
      name: "What are you shopping for?",
      exact: true,
    }),
  ).toBeVisible({ timeout: 12000 });
  await page.getByRole("button", { name: "Everything", exact: true }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Track all of your orders in one place",
      exact: true,
    }),
  ).toBeVisible();
});

test("widget links open the corresponding local order and return to the same previews", async ({
  page,
}) => {
  await useReferenceScenario(page, "order-widgets");
  await page.goto("/widgets");
  for (const size of ["large", "medium", "small"]) {
    await page
      .getByRole("link", {
        name: `Open KITSCH order from ${size} widget`,
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(/\/orders\/REF-1001$/);
    await expect(
      page.getByText("Waiting for details", { exact: true }),
    ).toBeVisible();
    await page.goBack();
    await expect(page.locator(`.widget-${size}`)).toBeVisible();
  }
  await page
    .getByRole("link", {
      name: "Open delivered T-shirt order from large widget",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/orders\/REF-manual-shirt\?view=tracking$/);
  await expect(
    page.getByRole("heading", { name: "Delivered today", exact: true }),
  ).toBeVisible();
});

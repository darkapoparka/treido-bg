import { expect, test, type Page } from "@playwright/test";
import type { ReferenceScenarioName } from "../../apps/web/src/features/catalog/reference/scenarios";

export async function useReferenceScenario(
  page: Page,
  name: ReferenceScenarioName,
) {
  const url = test.info().project.use.baseURL;
  if (!url || !["127.0.0.1", "localhost"].includes(new URL(url).hostname))
    throw new Error("Reference fixtures require a configured local preview");
  await page
    .context()
    .addCookies([
      {
        name: "shop-reference-scenario",
        value: name,
        url,
        httpOnly: true,
        sameSite: "Lax",
      },
    ]);
}

// Flow 20 opens the exclusive offer after adding the bag. Flow 21's cart starts
// after that offer is dismissed; clicking through a modal is not a real journey.
export async function addShampooBag(page: Page) {
  await page.goto("/products/shampoo-bag");
  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  const offer = page.getByRole("dialog", { name: /exclusive offer/ });
  await expect(offer).toBeVisible();
  await offer.getByRole("button", { name: /^Close / }).click();
  await expect(offer).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open cart", exact: true }),
  ).toBeVisible();
}

export async function openBagCart(page: Page) {
  await addShampooBag(page);
  await page.getByRole("button", { name: "Open cart", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Your cart", exact: true }),
  ).toBeVisible();
}

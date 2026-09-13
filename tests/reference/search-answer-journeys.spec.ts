import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

test("Jeans results open the captured answer over their exact query and return through Back and Forward", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/search?q=Jeans");
  const results = page.locator("[data-result-id]");
  await expect(results.nth(0)).toHaveAttribute(
    "data-result-id",
    "carpenter-jeans",
  );
  await expect(results.nth(1)).toHaveAttribute(
    "data-result-id",
    "heritage-jeans",
  );
  const trigger = page.getByRole("button", {
    name: "View answer for Jeans",
    exact: true,
  });
  await trigger.click();
  const answer = page.getByRole("dialog", {
    name: "Jeans answer",
    exact: true,
  });
  await expect(answer).toBeVisible();
  await expect(page).toHaveURL(/q=Jeans&answer=jeans/);
  await expect(
    answer.getByRole("heading", { name: "Jeans", exact: true }),
  ).toBeFocused();
  await page.goBack();
  await expect(answer).not.toBeVisible();
  await expect(page).toHaveURL(/\/search\?q=Jeans$/);
  await expect(trigger).toBeFocused();
  await page.goForward();
  await expect(answer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(answer).not.toBeVisible();
  await expect(page).toHaveURL(/\/search\?q=Jeans$/);
  await expect(trigger).toBeFocused();
});

test("answer feedback submits locally and closes only its child sheet", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/search?q=Jeans");
  await page
    .getByRole("button", { name: "View answer for Jeans", exact: true })
    .click();
  const answer = page.getByRole("dialog", {
    name: "Jeans answer",
    exact: true,
  });
  const positive = answer.getByRole("button", {
    name: "Give positive feedback",
    exact: true,
  });
  await positive.click();
  const feedback = page.getByRole("dialog", { name: "Feedback", exact: true });
  await expect(feedback).toBeVisible();
  const second = feedback.getByRole("button", { name: /^Like URBAN STRAIGHT/ });
  await second.click();
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await feedback
    .getByRole("textbox", {
      name: "Share any thoughts about the entire response",
      exact: true,
    })
    .fill("Nice response");
  await feedback.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(feedback).not.toBeVisible();
  await expect(answer).toBeVisible();
  await expect(positive).toHaveAttribute("aria-pressed", "true");
  await expect(positive).toBeFocused();
  await expect(
    answer.getByText("Thanks for your feedback", { exact: true }),
  ).toBeVisible();
  await answer
    .getByRole("button", { name: "Close assistant", exact: true })
    .click();
  await expect(answer).not.toBeVisible();
  await expect(page).toHaveURL(/\/search\?q=Jeans$/);
});

test("nested filter choices retain the results underlay until the root filter closes", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/search?q=Jeans");
  const first = page.locator("[data-result-id]").first();
  await expect(first).toHaveAttribute("data-result-id", "carpenter-jeans");
  await page.getByRole("button", { name: "Filter", exact: true }).click();
  const filter = page.getByRole("dialog", { name: "Filter", exact: true });
  await filter
    .getByRole("checkbox", { name: "Your deals", exact: true })
    .check();
  await expect(first).toHaveAttribute("data-result-id", "carpenter-jeans");
  await filter.getByRole("button", { name: /Sort by/ }).click();
  const sort = page.getByRole("dialog", { name: "Sort by", exact: true });
  await sort
    .getByRole("button", { name: "Highest → Lowest Price", exact: true })
    .click();
  await sort.getByRole("button", { name: "Done", exact: true }).click();
  await expect(filter).toBeVisible();
  await expect(first).toHaveAttribute("data-result-id", "carpenter-jeans");
  await filter.getByRole("button", { name: "Done", exact: true }).click();
  await expect(filter).not.toBeVisible();
  await expect(page).toHaveURL(/deals=true/);
  await expect(first).not.toHaveAttribute("data-result-id", "carpenter-jeans");
});

test("Your deals toggles immediately and stays committed through quick filter reopen", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/search?q=Jeans");
  for (const selected of [true, false, true, false]) {
    await page.getByRole("button", { name: "Filter", exact: true }).click();
    const sheet = page.getByRole("dialog", { name: "Filter", exact: true });
    const deals = sheet.getByRole("checkbox", {
      name: "Your deals",
      exact: true,
    });
    await deals.setChecked(selected);
    if (selected) await expect(deals).toBeChecked();
    else await expect(deals).not.toBeChecked();
    await sheet.getByRole("button", { name: "Done", exact: true }).click();
    await expect(sheet).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Your deals", exact: true }),
    ).toHaveAttribute("aria-pressed", String(selected));
    expect(new URL(page.url()).searchParams.has("deals")).toBe(selected);
  }
});
test("saving an answer recommendation updates the shared Saved library", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  await page.goto("/search?q=Jeans");
  await page
    .getByRole("button", { name: "View answer for Jeans", exact: true })
    .click();
  const answer = page.getByRole("dialog", {
    name: "Jeans answer",
    exact: true,
  });
  const card = answer.locator('[data-answer-product="city-duaa-denim"]');
  await card
    .getByRole("button", { name: /^Save Men’s Duaa Neptune Denim/ })
    .click();
  await expect(
    card.getByRole("button", { name: /^Unsave Men’s Duaa Neptune Denim/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await answer
    .getByRole("button", { name: "Close assistant", exact: true })
    .click();
  await expect(answer).not.toBeVisible();
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.getByRole("link", { name: "Saved", exact: true }).click();
  await expect(
    page.locator('.saved-grid [data-product-id="city-duaa-denim"]'),
  ).toBeVisible();
});

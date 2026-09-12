import { expect, test } from "@playwright/test";

// Observe the invariant at showModal itself. Waiting for a timer or polling for
// a history marker before Back would conceal the race this test must detect.
test("visible filter sheets own history before immediate Back, including reopen and nesting", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const showModal = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function () {
      this.dataset.historyAtOpen = window.history.state?.shopSheet ?? "missing";
      return showModal.call(this);
    };
  });
  const path = "/search?q=Jeans&q=Shampoo&ratings=4&ratings=5";
  await page.goto(path);
  await expect(page.locator('[data-shop-interactive="true"]').first()).toBeAttached();
  const filter = page.getByRole("button", { name: "Filter", exact: true });
  const root = page.getByRole("dialog", { name: "Filter", exact: true });
  const child = page.getByRole("dialog", { name: "Sort by", exact: true });
  const initialHistoryLength = await page.evaluate(() => history.length);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    await filter.click();
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute("data-history-at-open", /^sheet-/);
    expect(await page.evaluate(() => history.length)).toBe(initialHistoryLength + 1);
    await page.goBack();
    await expect(root).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(`${path.replace(/[?&]/g, "\\$&")}$`));
    await expect(filter).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  }

  await filter.click();
  const sort = root.getByRole("button", { name: /Sort by/ });
  await sort.click();
  await expect(child).toBeVisible();
  await expect(child).toHaveAttribute("data-history-at-open", /^sheet-/);
  expect(await child.getAttribute("data-history-at-open")).not.toBe(
    await root.getAttribute("data-history-at-open"),
  );
  await page.goBack();
  await expect(child).not.toBeVisible();
  await expect(root).toBeVisible();
  await expect(sort).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.goBack();
  await expect(root).not.toBeVisible();
  await expect(filter).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Search products" })).toHaveValue("Jeans");
  expect(await page.evaluate(() => window.history.state?.shopSheet)).toBeUndefined();
});

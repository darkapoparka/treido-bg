import { test, expect } from "@playwright/test";
test("production bootstrap renders without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Treido bootstrap");
  await expect(
    page.getByRole("heading", { name: "Treido bootstrap" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Web foundation. Product screens and services are not implemented.",
    ),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.waitForLoadState("networkidle");
  await page.screenshot({
    path: "test-results/bootstrap-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

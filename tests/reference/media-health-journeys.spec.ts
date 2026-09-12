import { mkdir, writeFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";
import { useReferenceScenario } from "./helpers";

// Ordinary same-origin requests only. Preserve response status and body when
// the preview rejects media; never rewrite a URL or disable an access check.
test("reference media and hydration remain available through the canonical routes", async ({
  page,
}) => {
  await useReferenceScenario(page, "home-welcome");
  const failures: { path: string; status?: number; error?: string }[] = [];
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.hostname === "127.0.0.1" && response.status() >= 400)
      failures.push({ path: url.pathname, status: response.status() });
  });
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (url.hostname === "127.0.0.1")
      failures.push({
        path: url.pathname,
        error: request.failure()?.errorText,
      });
  });
  const media = [];
  for (const key of ["assistant-cap", "shea-gallery-shower"]) {
    const response = await page.request.get(`/api/reference-media/${key}`);
    media.push({
      key,
      status: response.status(),
      contentType: response.headers()["content-type"],
      errorBody: response.ok()
        ? undefined
        : (await response.text()).slice(0, 512),
    });
  }
  await page.goto("/explore");
  await expect
    .soft(page.locator('[data-shop-interactive="true"]').first())
    .toBeAttached();
  const images = await page
    .locator(".explore-categories img")
    .evaluateAll(async (elements) =>
      Promise.all(
        elements.map(async (element) => {
          const image = element as HTMLImageElement;
          await image.decode().catch(() => undefined);
          return {
            path: new URL(image.currentSrc || image.src).pathname,
            decoded: image.complete && image.naturalWidth > 0,
          };
        }),
      ),
    );
  await mkdir(".qa/shop-parity/media-review", { recursive: true });
  await writeFile(
    ".qa/shop-parity/media-review/report.json",
    JSON.stringify(
      { commit: process.env.GITHUB_SHA, media, failures, errors, images },
      null,
      2,
    ),
  );
  for (const item of media)
    expect.soft(item, JSON.stringify(item)).toMatchObject({ status: 200 });
  expect.soft(images.length).toBeGreaterThan(0);
  expect.soft(images.filter((image) => !image.decoded)).toEqual([]);
  expect.soft(failures).toEqual([]);
  expect.soft(errors).toEqual([]);
});

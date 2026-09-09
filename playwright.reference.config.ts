import { defineConfig } from "@playwright/test";

// Stop the other web runtime before using REFERENCE_DEV=1: Next shares .next.
const development = process.env.REFERENCE_DEV === "1";
// Build first for the default production run. Media is deliberately acquired.
export default defineConfig({
  testDir: "./tests/reference",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  use: {
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    baseURL: "http://127.0.0.1:3103",
    viewport: { width: 393, height: 793 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `pnpm --filter @treido/web exec next ${development ? "dev" : "start"} --hostname 127.0.0.1 --port 3103`,
    url: "http://127.0.0.1:3103",
    env: { SHOP_REFERENCE_PREVIEW: "1", VERCEL_ENV: "preview" },
    reuseExistingServer: false,
    timeout: 60_000,
  },
});

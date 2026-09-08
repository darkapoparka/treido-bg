import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: false,
  retries: 0,
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    baseURL: "http://127.0.0.1:3100",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm start:web",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});

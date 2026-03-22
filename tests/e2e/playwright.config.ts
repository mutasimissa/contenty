import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./specs",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:8000",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  reporter: [["html", { open: "never" }]],
  webServer: undefined, // Server started externally
});

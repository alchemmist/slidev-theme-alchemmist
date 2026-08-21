import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  testMatch: /.*\.spec\.ts/,
  use: {
    baseURL: "http://127.0.0.1:4173",
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 720 },
  },
  webServer: [
    {
      command:
        "pnpm build && pnpm exec vite preview example --host 127.0.0.1 --port 4173",
      port: 4173,
      reuseExistingServer: false,
      timeout: 120000,
    },
    {
      command:
        "pnpm exec slidev build example/fixtures/chrome-transition.md --out dist && pnpm exec vite preview example/fixtures --host 127.0.0.1 --port 4174",
      port: 4174,
      reuseExistingServer: false,
      timeout: 120000,
    },
    {
      command:
        "pnpm exec slidev build example/fixtures/qr-links.md --out qr-dist && pnpm exec vite preview example/fixtures --outDir qr-dist --host 127.0.0.1 --port 4175",
      port: 4175,
      reuseExistingServer: false,
      timeout: 120000,
    },
  ],
});

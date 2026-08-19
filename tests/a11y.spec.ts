import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("demo has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .include(".slidev-layout.intro")
    .analyze();
  const violations = results.violations.filter(
    ({ impact }) => impact === "critical" || impact === "serious",
  );
  expect(violations).toEqual([]);
});

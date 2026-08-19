import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("demo has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .include(".alchemmist-frame.cover")
    .analyze();
  const violations = results.violations.filter(
    ({ impact }) => impact === "critical" || impact === "serious",
  );
  expect(violations).toEqual([]);
});

import { expect, test } from "@playwright/test";

test("renders theme chrome and shared frame", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".alchemmist-frame.cover")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".alchemmist-pagination")).toContainText("2");
  await expect(page.locator(".slidev-footer")).toBeVisible();
  await expect(page.locator(".alchemmist-frame.section")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
});

import { expect, test } from "@playwright/test";

const supportsSnapshots = process.platform === "darwin";

test("preserves the original intro and chrome", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".slidev-layout.intro")).toBeVisible();
  if (supportsSnapshots)
    await expect(page).toHaveScreenshot("intro.png", {
      animations: "disabled",
    });
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Slide number")).toContainText("2");
  await expect(page.locator(".slidev-footer")).toBeVisible();
  if (supportsSnapshots)
    await expect(page).toHaveScreenshot("center.png", {
      animations: "disabled",
    });
});

test("shows footer and pagination on the fourth demo slide", async ({
  page,
}) => {
  await page.goto("/4");
  await expect(page.getByLabel("Slide number")).toContainText("4");
  await expect(page.locator(".slidev-footer")).toBeVisible();
});

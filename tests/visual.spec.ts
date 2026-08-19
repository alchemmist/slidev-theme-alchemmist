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

test("keeps media panels inside the active slide", async ({ page }) => {
  await page.goto("/4");

  const panel = page.locator(
    ".alchemmist-frame.image-right .alchemmist-image-panel",
  );
  const bounds = await panel.boundingBox();

  expect(bounds).not.toBeNull();
  expect(bounds!.width).toBeGreaterThan(300);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1280);
});

test("preserves presentation-scale type and quote composition", async ({
  page,
}) => {
  await page.goto("/1");
  const coverSize = Number.parseFloat(
    await page
      .locator(".alchemmist-frame.cover h1")
      .evaluate((element) => getComputedStyle(element).fontSize),
  );
  expect(coverSize).toBeGreaterThanOrEqual(52);

  await page.goto("/5");
  const quote = await page.locator(".alchemmist-quote").boundingBox();
  expect(quote).not.toBeNull();
  expect(quote!.width).toBeGreaterThanOrEqual(720);
  expect(quote!.height).toBeGreaterThanOrEqual(180);
});

for (const slide of [1, 2, 3, 4, 5, 6]) {
  test(`matches the approved composition for slide ${slide}`, async ({
    page,
  }) => {
    await page.goto(`/${slide}`);
    await expect(page.locator(".slidev-slide-container")).toHaveScreenshot(
      `demo-slide-${slide}.png`,
      { animations: "disabled", maxDiffPixelRatio: 0.025 },
    );
  });
}

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

test("lays out sticker cards inside the context board", async ({ page }) => {
  await page.goto("/8");
  const stickers = page.locator(".alchemmist-sticker");
  await expect(stickers).toHaveCount(4);
  await expect
    .poll(() =>
      stickers.evaluateAll((elements) =>
        elements.every((element) =>
          element.style.getPropertyValue("--sticker-x"),
        ),
      ),
    )
    .toBe(true);

  await expect
    .poll(() =>
      stickers.evaluateAll((elements) => {
        const boxes = elements.map((element) =>
          element.getBoundingClientRect(),
        );

        return boxes.some((left, index) =>
          boxes
            .slice(index + 1)
            .some(
              (right) =>
                left.left < right.right &&
                left.right > right.left &&
                left.top < right.bottom &&
                left.bottom > right.top,
            ),
        );
      }),
    )
    .toBe(false);
});

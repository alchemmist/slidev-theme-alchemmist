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

test("drops the current sticker from above", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/8");
  await expect(page.locator(".alchemmist-sticker")).toHaveCount(4);
  await page.keyboard.press("ArrowRight");

  const surface = page.locator(
    ".alchemmist-sticker.slidev-vclick-current .alchemmist-sticker__surface",
  );
  await expect(surface).toBeVisible();
  await expect
    .poll(() =>
      surface.evaluate((element) => getComputedStyle(element).animationName),
    )
    .toMatch(/^alchemmist-sticker-drop/);
});

test("allows sticker shadows to extend beyond the board", async ({ page }) => {
  await page.goto("/8");
  await expect(page.locator(".alchemmist-sticker")).toHaveCount(4);

  const board = page.locator(".alchemmist-sticker-board");
  const sticker = page.locator(".alchemmist-sticker").first();

  await expect
    .poll(() => board.evaluate((element) => getComputedStyle(element).overflow))
    .toBe("visible");
  await expect
    .poll(() =>
      sticker.evaluate((element) => Number(getComputedStyle(element).zIndex)),
    )
    .toBeGreaterThan(0);
});

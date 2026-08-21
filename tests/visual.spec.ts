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

test("reveals chrome after a split image slide finishes transitioning", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://127.0.0.1:4174/");
  await expect(page.locator(".slidev-layout.image-right")).toBeVisible();
  await expect(page.locator(".alchemmist-footer-host")).toHaveCSS(
    "opacity",
    "0",
  );

  await page.keyboard.press("ArrowRight");
  const enteringSlide = page.locator('.slidev-page-2[class*="-enter-active"]');
  const pagination = page.locator('.slidev-page-2 [aria-label="Slide number"]');
  await expect(enteringSlide).toBeVisible();
  const layoutFrame = page
    .locator(".alchemmist-layout-frame")
    .filter({ hasText: "Slide with chrome" });
  const frameHeightDuringTransition = await layoutFrame.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  await expect(page.locator(".alchemmist-footer-host")).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(pagination).toHaveCSS("opacity", "0");
  await expect
    .poll(() =>
      page
        .getByLabel("Slide number")
        .evaluateAll(
          (elements) =>
            elements.filter((element) => !element.closest(".slidev-page"))
              .length,
        ),
    )
    .toBe(0);

  await expect(enteringSlide).toHaveCount(0);
  const footerHost = page.locator(".alchemmist-footer-host");
  await expect(footerHost).toHaveCount(1);
  await expect(footerHost).toHaveCSS("transition-duration", "0.24s");
  await expect(footerHost).toBeVisible();
  await expect(footerHost).toHaveCSS("opacity", "1");
  await expect(pagination).toHaveCSS("opacity", "1");
  const frameHeightAfterTransition = await layoutFrame.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  expect(
    Math.abs(frameHeightDuringTransition - frameHeightAfterTransition),
  ).toBeLessThan(1);
  await expect(
    page.locator(".slidev-page-2 .alchemmist-layout-frame"),
  ).toHaveCSS("transition-duration", "0.24s");

  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".slidev-layout.image-right")).toBeVisible();
  await expect(page.locator(".alchemmist-footer-host")).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(
    page.locator('.slidev-page-1[class*="-enter-active"]'),
  ).toHaveCount(0);

  await page.keyboard.press("ArrowRight");
  const repeatedEnteringSlide = page.locator(
    '.slidev-page-2[class*="-enter-active"]',
  );
  await expect(repeatedEnteringSlide).toBeVisible();
  await expect(page.locator(".alchemmist-footer-host")).toHaveCSS(
    "opacity",
    "0",
  );
  await expect(pagination).toHaveCSS("opacity", "0");
  await expect(repeatedEnteringSlide).toHaveCount(0);
  await expect(page.locator(".alchemmist-footer-host")).toBeVisible();
  await expect(pagination).toHaveCSS("opacity", "1");
});

test("centers oversized images in the center layout", async ({ page }) => {
  await page.goto("/2");
  const layout = page.locator(".slidev-page-2 .slidev-layout.center");
  const image = layout.locator(".slidev-image");

  await layout.locator(".my-auto").evaluate((element) => {
    const oversizedImage = document.createElement("div");
    oversizedImage.className = "slidev-image";
    oversizedImage.style.height = "1rem";
    oversizedImage.style.width = "500%";
    element.append(oversizedImage);
  });

  const centers = await Promise.all(
    [layout, image].map((locator) =>
      locator.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left + rect.width / 2;
      }),
    ),
  );

  expect(Math.abs(centers[0] - centers[1])).toBeLessThan(1);
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

test("generates icon-backed QR links from URLs", async ({ page }) => {
  await page.goto("http://127.0.0.1:4175/");

  const links = page.locator(".alchemmist-qr-link");
  await expect(links).toHaveCount(3);
  await expect
    .poll(() =>
      links.evaluateAll((elements) =>
        elements.every((element) => {
          const image = element.querySelector<HTMLImageElement>(
            ".alchemmist-qr-code__image",
          );
          return Boolean(
            image?.complete &&
            image.naturalWidth > 0 &&
            image.src.startsWith("data:image/svg+xml"),
          );
        }),
      ),
    )
    .toBe(true);

  const sizes = await links.evaluateAll((elements) =>
    elements.map(
      (element) =>
        element.querySelector(".alchemmist-qr-code")?.getBoundingClientRect()
          .width,
    ),
  );
  expect(sizes[0]).toBeGreaterThan(Number(sizes[1]) * 1.5);
  expect(sizes[1]).toBeCloseTo(Number(sizes[2]), 1);
  const geometry = await links.evaluateAll((elements) =>
    elements.map((element) => {
      const label = element.querySelector("a")?.getBoundingClientRect();
      const qrRoot = element.querySelector(".alchemmist-qr-code");
      const qr = element
        .querySelector(".alchemmist-qr-code__canvas")
        ?.getBoundingClientRect();
      const quietZone = Number.parseFloat(
        getComputedStyle(qrRoot as Element).getPropertyValue(
          "--qr-code-quiet-zone",
        ),
      );
      return {
        expectedLabelLeft:
          Number(qr?.left) + (Number(qr?.width) * quietZone) / 100,
        labelBottom: label?.bottom,
        labelLeft: label?.left,
        qrTop: qr?.top,
      };
    }),
  );
  for (const item of geometry) {
    expect(Number(item.labelBottom)).toBeLessThan(Number(item.qrTop));
    expect(Number(item.labelLeft)).toBeCloseTo(
      Number(item.expectedLabelLeft),
      1,
    );
  }
  await expect(links.locator("a")).toHaveCount(3);
  await expect(links.locator("a img")).toHaveCount(0);
  await expect(links.locator("code")).toHaveCount(0);
  await expect(links.locator("a")).toHaveText(["Demo", "Source", "Blog"]);
});

test("uses one visual language for quote and QR links", async ({ page }) => {
  await page.goto("/3");
  await page.addStyleTag({ content: "a { transition: none !important; }" });
  const quoteLink = page.locator(".alchemmist-quote a");
  await expect(quoteLink).toHaveCSS("color", "rgb(107, 114, 128)");
  await quoteLink.hover();
  await expect(quoteLink).toHaveCSS("color", "rgb(58, 185, 213)");

  await page.goto("http://127.0.0.1:4175/");
  await page.addStyleTag({ content: "a { transition: none !important; }" });
  const qrLink = page.locator(".alchemmist-qr-link a").first();
  await expect(qrLink).toHaveCSS("color", "rgb(107, 114, 128)");
  await qrLink.hover();
  await expect(qrLink).toHaveCSS("color", "rgb(58, 185, 213)");
});

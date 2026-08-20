import { describe, expect, it } from "vitest";
import { placeStickers, type StickerSize } from "../theme/stickers";

const boundingRect = (
  placement: ReturnType<typeof placeStickers>[number],
  sticker: StickerSize,
) => {
  const angle = (Math.abs(placement.rotation) * Math.PI) / 180;
  const width =
    (sticker.width * Math.cos(angle) + sticker.height * Math.sin(angle)) *
    placement.scale;
  const height =
    (sticker.width * Math.sin(angle) + sticker.height * Math.cos(angle)) *
    placement.scale;
  return {
    bottom: placement.y + (sticker.height * placement.scale + height) / 2,
    left: placement.x - (width - sticker.width * placement.scale) / 2,
    right: placement.x + (sticker.width * placement.scale + width) / 2,
    top: placement.y - (height - sticker.height * placement.scale) / 2,
  };
};

describe("sticker placement", () => {
  const container = { height: 360, width: 560 };
  const stickers = [
    { height: 92, width: 170 },
    { height: 84, width: 170 },
    { height: 96, width: 170 },
    { height: 104, width: 170 },
    { height: 82, width: 170 },
  ];
  const options = {
    colorCount: 5,
    gap: 10,
    maxRotation: 3,
    seed: "format-quorum",
  };

  it("is deterministic and uses every palette color before repeating", () => {
    const first = placeStickers(container, stickers, options);
    const second = placeStickers(container, stickers, options);

    expect(first).toEqual(second);
    expect(new Set(first.map(({ colorIndex }) => colorIndex))).toHaveLength(5);
    expect(first.some(({ rotation }) => rotation < 0)).toBe(true);
    expect(first.some(({ rotation }) => rotation > 0)).toBe(true);
  });

  it("keeps stickers inside the board without intersections", () => {
    const placements = placeStickers(container, stickers, options);
    const rects = placements.map((placement, index) =>
      boundingRect(placement, stickers[index]),
    );

    for (const rect of rects) {
      expect(rect.left).toBeGreaterThanOrEqual(0);
      expect(rect.top).toBeGreaterThanOrEqual(0);
      expect(rect.right).toBeLessThanOrEqual(container.width);
      expect(rect.bottom).toBeLessThanOrEqual(container.height);
    }

    for (const [index, left] of rects.entries()) {
      for (const right of rects.slice(index + 1)) {
        const intersects =
          left.left < right.right &&
          left.right > right.left &&
          left.top < right.bottom &&
          left.bottom > right.top;
        expect(intersects).toBe(false);
      }
    }
  });

  it("scales crowded boards instead of overlapping cards", () => {
    const crowded = placeStickers(
      { height: 180, width: 280 },
      Array.from({ length: 12 }, () => ({ height: 90, width: 170 })),
      options,
    );

    expect(crowded.every(({ scale }) => scale < 1)).toBe(true);
  });
});

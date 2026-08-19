import { describe, expect, it } from "vitest";
import { isChromeVisible, resolveCorner } from "../theme/config";

describe("theme config", () => {
  it("resolves canonical and legacy positions", () => {
    expect(resolveCorner({ paginationPosition: "bottom-left" })).toBe(
      "bottom-left",
    );
    expect(resolveCorner({ paginationX: "l", paginationY: "t" })).toBe(
      "top-left",
    );
  });

  it("gives slide visibility settings precedence", () => {
    expect(isChromeVisible("footer", 2, 5, { footer: false }, {})).toBe(false);
    expect(
      isChromeVisible("pagination", 2, 5, {}, { paginationPagesDisabled: [2] }),
    ).toBe(false);
    expect(isChromeVisible("pagination", 2, 5, {}, {})).toBe(true);
  });
});

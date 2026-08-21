import { describe, expect, it } from "vitest";
import { resolveSplitImageColumns } from "../theme/splitImage";

describe("split image columns", () => {
  it("places a left image before the remaining content", () => {
    expect(resolveSplitImageColumns("left", "50%")).toBe(
      "minmax(0, 50%) minmax(0, 1fr)",
    );
  });

  it("places a right image after the remaining content", () => {
    expect(resolveSplitImageColumns("right", "60%")).toBe(
      "minmax(0, 1fr) minmax(0, 60%)",
    );
  });
});

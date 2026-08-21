import { describe, expect, it } from "vitest";
import {
  resolveSplitImageColumns,
  SPLIT_IMAGE_BACKGROUND_SIZE,
} from "../theme/splitImage";

describe("split image columns", () => {
  it("fits images to the full slide height without vertical cropping", () => {
    expect(SPLIT_IMAGE_BACKGROUND_SIZE).toBe("auto 100%");
  });

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

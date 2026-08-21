import { describe, expect, it } from "vitest";
import { resolveAssetUrl } from "../theme/assets";

describe("asset URLs", () => {
  it("does not prepend the deployment base twice", () => {
    const base = "/eosp/lectures/06-lecture-en/";
    const source = "/assets/bad-readme.png";
    const resolved = resolveAssetUrl(source, base);

    expect(resolveAssetUrl(resolved, base)).toBe(resolved);
  });
});

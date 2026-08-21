export type SplitImageSide = "left" | "right";

export function resolveSplitImageColumns(
  side: SplitImageSide,
  imageWidth: string,
): string {
  const imageColumn = `minmax(0, ${imageWidth})`;
  const contentColumn = "minmax(0, 1fr)";

  return side === "left"
    ? `${imageColumn} ${contentColumn}`
    : `${contentColumn} ${imageColumn}`;
}

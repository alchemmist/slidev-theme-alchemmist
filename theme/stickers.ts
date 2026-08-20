export interface StickerSize {
  height: number;
  width: number;
}

export interface StickerPlacement {
  colorIndex: number;
  rotation: number;
  scale: number;
  x: number;
  y: number;
}

const hashSeed = (value: string) => {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const createRandom = (seed: string) => {
  let state = hashSeed(seed) || 1;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const shuffledIndexes = (count: number, random: () => number) => {
  const indexes = Array.from({ length: count }, (_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [indexes[index], indexes[target]] = [indexes[target], indexes[index]];
  }

  return indexes;
};

const shuffledColorIndexes = (
  count: number,
  colorCount: number,
  seed: string,
) => {
  const random = createRandom(`${seed}:colors`);
  const result: number[] = [];

  while (result.length < count)
    result.push(...shuffledIndexes(colorCount, random));

  return result.slice(0, count);
};

export const placeStickers = (
  container: StickerSize,
  stickers: StickerSize[],
  options: {
    colorCount: number;
    gap: number;
    maxRotation: number;
    seed: string;
  },
): StickerPlacement[] => {
  if (!stickers.length) return [];

  const random = createRandom(`${options.seed}:positions`);
  const colors = shuffledColorIndexes(
    stickers.length,
    options.colorCount,
    options.seed,
  );
  const rotations = stickers.map(
    () => (random() * 2 - 1) * options.maxRotation,
  );
  const rotatedSizes = stickers.map((sticker, index) => {
    const angle = (Math.abs(rotations[index]) * Math.PI) / 180;
    return {
      height:
        sticker.width * Math.sin(angle) + sticker.height * Math.cos(angle),
      width: sticker.width * Math.cos(angle) + sticker.height * Math.sin(angle),
    };
  });
  const largest = rotatedSizes.reduce(
    (result, size) => ({
      height: Math.max(result.height, size.height),
      width: Math.max(result.width, size.width),
    }),
    { height: 0, width: 0 },
  );
  let columns = 1;
  let rows = stickers.length;
  let scale = 0;

  for (
    let candidateColumns = 1;
    candidateColumns <= stickers.length;
    candidateColumns += 1
  ) {
    const candidateRows = Math.ceil(stickers.length / candidateColumns);
    const candidateCellWidth = container.width / candidateColumns;
    const candidateCellHeight = container.height / candidateRows;
    const candidateScale = Math.max(
      0,
      Math.min(
        1,
        (candidateCellWidth - options.gap * 2) / largest.width,
        (candidateCellHeight - options.gap * 2) / largest.height,
      ),
    );

    if (candidateScale > scale) {
      columns = candidateColumns;
      rows = candidateRows;
      scale = candidateScale;
    }
  }

  const cellWidth = container.width / columns;
  const cellHeight = container.height / rows;
  const cells = shuffledIndexes(stickers.length, random);

  return stickers.map((sticker, index) => {
    const cell = cells[index];
    const column = cell % columns;
    const row = Math.floor(cell / columns);
    const rotated = {
      height: rotatedSizes[index].height * scale,
      width: rotatedSizes[index].width * scale,
    };
    const horizontalSpace = Math.max(
      0,
      cellWidth - rotated.width - options.gap * 2,
    );
    const verticalSpace = Math.max(
      0,
      cellHeight - rotated.height - options.gap * 2,
    );
    const rotatedLeft =
      column * cellWidth + options.gap + random() * horizontalSpace;
    const rotatedTop =
      row * cellHeight + options.gap + random() * verticalSpace;

    return {
      colorIndex: colors[index],
      rotation: rotations[index],
      scale,
      x: rotatedLeft + (rotated.width - sticker.width * scale) / 2,
      y: rotatedTop + (rotated.height - sticker.height * scale) / 2,
    };
  });
};

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { placeStickers } from "../theme/stickers";

const props = withDefaults(
  defineProps<{
    gap?: number;
    maxRotation?: number;
    maxWidth?: string;
    minWidth?: string;
    seed?: string | number;
    width?: string;
  }>(),
  {
    gap: 12,
    maxRotation: 5,
    maxWidth: "16.5rem",
    minWidth: "13.5rem",
    seed: "alchemmist",
  },
);

const palette = [
  "var(--alchemmist-sticker-yellow, #fff1a8)",
  "var(--alchemmist-sticker-blue, #d9edff)",
  "var(--alchemmist-sticker-pink, #ffdce5)",
  "var(--alchemmist-sticker-mint, #d9f4df)",
  "var(--alchemmist-sticker-violet, #e9dfff)",
  "var(--alchemmist-sticker-peach, #ffe0b5)",
];
const board = ref<HTMLElement>();
let resizeObserver: ResizeObserver | undefined;
let mutationObserver: MutationObserver | undefined;
let frame = 0;

const layout = () => {
  const element = board.value;

  if (!element) return;

  const stickers = Array.from(
    element.querySelectorAll<HTMLElement>(":scope > .alchemmist-sticker"),
  );

  if (!stickers.length || !element.clientWidth || !element.clientHeight) return;

  for (const sticker of stickers) {
    if (props.width) {
      sticker.style.setProperty("--sticker-width", props.width);
      sticker.style.setProperty("--sticker-min-width", props.width);
      sticker.style.setProperty("--sticker-max-width", props.width);
    } else {
      sticker.style.removeProperty("--sticker-width");
      sticker.style.setProperty("--sticker-min-width", props.minWidth);
      sticker.style.setProperty("--sticker-max-width", props.maxWidth);
    }
  }

  const placements = placeStickers(
    { height: element.clientHeight, width: element.clientWidth },
    stickers.map((sticker) => ({
      height: sticker.offsetHeight,
      width: sticker.offsetWidth,
    })),
    {
      colorCount: palette.length,
      gap: props.gap,
      maxRotation: props.maxRotation,
      seed: String(props.seed),
    },
  );

  for (const [index, sticker] of stickers.entries()) {
    const placement = placements[index];
    sticker.style.setProperty("--sticker-color", palette[placement.colorIndex]);
    sticker.style.setProperty("--sticker-rotation", `${placement.rotation}deg`);
    sticker.style.setProperty("--sticker-scale", String(placement.scale));
    sticker.style.setProperty("--sticker-x", `${placement.x}px`);
    sticker.style.setProperty("--sticker-y", `${placement.y}px`);
  }
};

const scheduleLayout = () => {
  window.cancelAnimationFrame(frame);
  frame = window.requestAnimationFrame(layout);
};

onMounted(async () => {
  await nextTick();
  scheduleLayout();
  resizeObserver = new ResizeObserver(scheduleLayout);
  resizeObserver.observe(board.value!);
  mutationObserver = new MutationObserver(scheduleLayout);
  mutationObserver.observe(board.value!, { childList: true });
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frame);
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
});
</script>

<template>
  <div ref="board" class="alchemmist-sticker-board">
    <slot />
  </div>
</template>

<style scoped>
.alchemmist-sticker-board {
  height: 100%;
  min-height: 16rem;
  overflow: visible;
  position: relative;
  width: 100%;
}
</style>

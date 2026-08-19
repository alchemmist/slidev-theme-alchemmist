<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import type { Corner } from "../theme/config";

const props = withDefaults(
  defineProps<{
    classNames?: string | string[];
    position?: Corner;
    x?: "l" | "r";
    y?: "t" | "b";
  }>(),
  {
    position: undefined,
  },
);

const { $slidev } = useSlideContext();
const position = computed<Corner>(
  () =>
    props.position ??
    `${props.y === "b" ? "bottom" : "top"}-${props.x === "l" ? "left" : "right"}`,
);
const classes = computed(() => [
  props.classNames,
  position.value.endsWith("left") ? "left-0" : "right-0",
  position.value.startsWith("bottom") ? "bottom-0" : "top-0",
]);
const current = computed(() => $slidev.nav.currentPage);
const total = computed(() => $slidev.nav.total);
</script>

<template>
  <div
    class="absolute p-2 text-xs mono-text"
    :class="classes"
    style="color: rgba(0, 0, 0, 0.5); display: flex; gap: 0.5em; padding: 1.5em"
    aria-label="Slide number"
  >
    <span style="font-size: 1.8em">{{ current }}</span> /
    <span style="font-size: 1.4em">{{ total }}</span>
  </div>
</template>

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
const classes = computed(() => [props.classNames, `is-${position.value}`]);
const current = computed(() => $slidev.nav.currentPage);
const total = computed(() => $slidev.nav.total);
</script>

<template>
  <div
    class="alchemmist-pagination mono-text"
    :class="classes"
    aria-label="Slide number"
  >
    <span class="alchemmist-pagination__current">{{ current }}</span>
    <span aria-hidden="true">/</span>
    <span>{{ total }}</span>
  </div>
</template>

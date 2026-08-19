<script setup lang="ts">
import { computed } from "vue";
import type { StyleValue } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";

const props = withDefaults(
  defineProps<{
    class?: string;
    gap?: string | number;
    layoutClass?: string;
    leftClass?: string;
    leftWidth?: string | number;
    rightClass?: string;
  }>(),
  {
    gap: "2rem",
    leftWidth: "1fr",
  },
);

const style = computed<StyleValue>(() => ({
  "--columns-gap": typeof props.gap === "number" ? `${props.gap}px` : props.gap,
  "--columns-template": `${typeof props.leftWidth === "number" ? `${props.leftWidth}fr` : props.leftWidth} minmax(0, 1fr)`,
}));
</script>

<template>
  <SlideFrame :frame-class="['two-cols', layoutClass]">
    <div class="alchemmist-columns" :style="style">
      <div :class="['alchemmist-columns__left', props.class, leftClass]">
        <slot />
      </div>
      <div :class="['alchemmist-columns__right', props.class, rightClass]">
        <slot name="right" />
      </div>
    </div>
  </SlideFrame>
</template>

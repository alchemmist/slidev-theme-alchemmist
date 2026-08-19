<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    contentAlign?: "start" | "center" | "end";
    contentWidth?: string | number;
    frameClass?: string | string[];
    padded?: boolean;
  }>(),
  {
    contentAlign: "start",
    padded: true,
  },
);

const width = computed(() => {
  if (typeof props.contentWidth === "number") return `${props.contentWidth}px`;
  return props.contentWidth;
});
</script>

<template>
  <div class="alchemmist-frame" :class="frameClass">
    <div
      class="slidev-layout alchemmist-frame__content"
      :class="[`is-${contentAlign}`, { 'is-padded': padded }]"
      :style="{ maxWidth: width }"
    >
      <slot />
    </div>
  </div>
</template>

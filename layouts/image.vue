<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";

const props = defineProps({
  image: String,
  backgroundSize: {
    type: String,
    default: "cover",
  },
  opacity: {
    type: Number,
    default: 0,
  },
});

const style = computed(() =>
  handleBackground(props.image, false, props.backgroundSize),
);

const gradientStyle = computed(() => {
  const o = Math.min(Math.max(props.opacity, 0), 1);

  const strong = Math.min(o * 1.4, 1);
  const medium = Math.min(o * 0.9, 1);

  return {
    background: `
        radial-gradient(
        ellipse 80% 55% at center,
        rgba(0, 0, 0, ${Math.min(o * 1.6, 1)}) 0%,
        rgba(0, 0, 0, ${o}) 25%,
        rgba(0, 0, 0, ${o * 0.6}) 45%,
        rgba(0, 0, 0, ${o * 0.25}) 65%,
        rgba(0, 0, 0, 0) 85%
      )
    `,
  };
});
</script>

<template>
  <div
    class="slidev-layout w-full h-full relative flex items-center justify-center"
    :style="style"
  >
    <div v-if="opacity > 0" class="absolute inset-0" :style="gradientStyle" />

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

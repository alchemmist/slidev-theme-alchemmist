<script setup lang="ts">
import { computed } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";
import { backgroundStyle } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    background?: string;
    backgroundDim?: number | boolean;
    backgroundPosition?: string;
    backgroundSize?: string;
    contentWidth?: string | number;
  }>(),
  {
    backgroundDim: true,
  },
);

const style = computed(() =>
  backgroundStyle(props.background, {
    dim: props.backgroundDim,
    position: props.backgroundPosition,
    size: props.backgroundSize,
  }),
);
</script>

<template>
  <SlideFrame
    content-align="center"
    :content-width="contentWidth"
    frame-class="cover"
    :style="style"
    ><slot
  /></SlideFrame>
</template>

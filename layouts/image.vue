<script setup lang="ts">
import { computed } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";
import { backgroundStyle } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    backgroundSize?: string;
    image?: string;
    imageDim?: number;
    opacity?: number;
  }>(),
  {
    backgroundSize: "cover",
    imageDim: 0,
  },
);

const style = computed(() =>
  backgroundStyle(props.image, {
    dim: props.imageDim || props.opacity,
    size: props.backgroundSize,
  }),
);
</script>

<template>
  <SlideFrame
    content-align="center"
    :padded="false"
    frame-class="image"
    :style="style"
    ><slot
  /></SlideFrame>
</template>

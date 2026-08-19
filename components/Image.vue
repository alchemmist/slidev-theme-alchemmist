<script setup lang="ts">
import { computed } from "vue";
import { resolveAssetUrl } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    alt?: string;
    backgroundSize?: "contain" | "cover" | "fill" | "none" | "scale-down";
    class?: string;
    src: string;
    width?: string | number;
  }>(),
  {
    alt: "",
    backgroundSize: "contain",
    width: "100%",
  },
);

const source = computed(() => resolveAssetUrl(props.src));
const width = computed(() =>
  typeof props.width === "number" ? `${props.width}px` : props.width,
);
</script>

<template>
  <img
    :src="source"
    :alt="alt"
    :class="['alchemmist-image', props.class]"
    :style="{ width, objectFit: backgroundSize }"
  />
</template>

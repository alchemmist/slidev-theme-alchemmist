<script setup lang="ts">
import { computed, ref } from "vue";
import { resolveAssetUrl } from "../theme/assets";
import { backgroundStyle } from "../theme/assets";

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
const aspect = ref<number>();

if (typeof window !== "undefined") {
  const image = new window.Image();
  image.src = source.value;
  image.onload = () => {
    aspect.value = image.naturalWidth / image.naturalHeight;
  };
}

const style = computed(() => ({
  ...backgroundStyle(source.value, { size: props.backgroundSize }),
  aspectRatio: aspect.value,
  width: width.value,
}));
</script>

<template>
  <div
    :class="['slidev-image', props.class]"
    :style="style"
    role="img"
    :aria-label="alt"
  />
</template>

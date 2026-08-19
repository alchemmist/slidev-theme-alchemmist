<script setup lang="ts">
import { ref, computed } from "vue";
import { handleBackground } from "../layoutHelper";

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "" },
  class: { type: String, default: "" },
  width: { type: String, default: "100%" },
  backgroundSize: { type: String, default: "contain" },
  dim: { type: Boolean, default: false },
  style: { type: Object as () => Record<string, string>, default: () => ({}) },
});

const resolvedSrc = computed(() => {
  const base = import.meta.env.BASE_URL || "/"
  const srcPath = props.src.startsWith("/") ? props.src.slice(1) : props.src
  return `${base}${srcPath}`
})

const imgAspect = ref<number | null>(null)
const loadImage = () => {
  const img = new Image()
  img.src = resolvedSrc.value
  img.onload = () => {
    imgAspect.value = img.naturalHeight / img.naturalWidth
  }
}
loadImage()

const backgroundStyle = computed(() => {
  const style: Record<string, string> = {
    ...handleBackground(resolvedSrc.value, props.dim, props.backgroundSize),
    width: props.width ?? "100%",
    ...props.style,
  }

  if (imgAspect.value) {
    style.aspectRatio = `${1 / imgAspect.value}`
  }

  return style
})
</script>

<template>
  <div
    :class="['slidev-image', props.class]"
    :style="backgroundStyle"
    role="img"
    :aria-label="alt"
  />
</template>


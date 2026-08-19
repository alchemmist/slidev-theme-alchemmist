<script setup lang="ts">
import { computed, useAttrs } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";
import { backgroundStyle } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    class?: string;
    image?: string;
    imagePosition?: string;
    imageShadow?: boolean;
    imageSize?: string;
    imageWidth?: string | number;
    leftWidth?: string | number;
  }>(),
  {
    imagePosition: "center",
    imageSize: "cover",
    leftWidth: "1fr",
  },
);

const attrs = useAttrs();
const legacyPosition = computed(
  () => attrs["background-position"] as string | undefined,
);
const legacyShadow = computed(
  () => attrs.shadow === true || attrs.shadow === "true",
);
const imageStyle = computed(() => ({
  ...backgroundStyle(props.image, {
    position: legacyPosition.value ?? props.imagePosition,
    size: props.imageSize,
  }),
  boxShadow:
    props.imageShadow || legacyShadow.value
      ? "0.6rem 0 1.4rem rgb(0 0 0 / 18%)"
      : undefined,
}));
const columns = computed(() => {
  const image =
    typeof props.imageWidth === "number"
      ? `${props.imageWidth}px`
      : (props.imageWidth ?? props.leftWidth);
  return `${image} minmax(0, 1fr)`;
});
</script>

<template>
  <SlideFrame :padded="false" frame-class="image-left">
    <div
      class="alchemmist-image-layout"
      :style="{ '--image-columns': columns }"
    >
      <div class="alchemmist-image-panel" :style="imageStyle" />
      <div class="alchemmist-panel-content is-padded" :class="props.class">
        <slot />
      </div>
    </div>
  </SlideFrame>
</template>

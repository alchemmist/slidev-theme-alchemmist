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
    position: props.imagePosition ?? legacyPosition.value,
    size: props.imageSize,
  }),
  boxShadow:
    props.imageShadow || legacyShadow.value
      ? "-0.6rem 0 1.4rem rgb(0 0 0 / 18%)"
      : undefined,
}));
const columns = computed(
  () =>
    `${typeof props.leftWidth === "number" ? `${props.leftWidth}fr` : props.leftWidth} minmax(0, 1fr)`,
);
</script>

<template>
  <SlideFrame :padded="false" frame-class="image-right">
    <div
      class="alchemmist-image-layout"
      :style="{ '--image-columns': columns }"
    >
      <div
        class="slidev-layout alchemmist-frame__content is-padded"
        :class="props.class"
      >
        <slot />
      </div>
      <div class="alchemmist-image-panel" :style="imageStyle" />
    </div>
  </SlideFrame>
</template>

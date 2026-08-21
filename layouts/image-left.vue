<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { handleBackground, resolveAssetUrl } from "../layoutHelper";
import {
  resolveSplitImageColumns,
  SPLIT_IMAGE_BACKGROUND_SIZE,
} from "../theme/splitImage";

const props = defineProps({
  image: {
    type: String,
  },
  class: {
    type: String,
  },
});

const attrs = useAttrs();

const backgroundPosition = computed(
  () => attrs["background-position"] ?? "right",
);
const imageWidth = computed(() => String(attrs["image-width"] ?? "50%"));
const gridStyle = computed(() => ({
  gridTemplateColumns: resolveSplitImageColumns("left", imageWidth.value),
}));

const style = computed(() => {
  const background = handleBackground(
    resolveAssetUrl(props.image),
    false,
    SPLIT_IMAGE_BACKGROUND_SIZE,
  );

  return {
    ...background,
    backgroundPosition: `${backgroundPosition.value} center`,
  };
});
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div class="grid w-full h-full auto-rows-fr" :style="gridStyle">
      <div
        class="alchemmist-split-image alchemmist-split-image--left w-full h-full"
        :style="style"
      />
      <div
        class="slidev-layout default alchemmist-split-image-content"
        :class="props.class"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

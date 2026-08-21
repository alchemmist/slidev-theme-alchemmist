<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { handleBackground, resolveAssetUrl } from "../layoutHelper";

const props = defineProps({
  image: {
    type: String,
  },
  class: {
    type: String,
  },
  backgroundSize: {
    type: String,
    default: "cover",
  },
});

const attrs = useAttrs();

const backgroundPosition = computed(
  () => attrs["background-position"] ?? "right",
);

const style = computed(() => {
  const background = handleBackground(
    resolveAssetUrl(props.image),
    false,
    props.backgroundSize,
  );

  return {
    ...background,
    backgroundPosition: `${backgroundPosition.value} center`,
  };
});
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div class="grid grid-cols-2 w-full h-full auto-rows-fr">
      <div
        class="alchemmist-split-image alchemmist-split-image--left w-full h-full"
        :style="style"
      />
      <div class="slidev-layout default" :class="props.class">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAttrs, computed } from "vue";
import { handleBackground, resolveAssetUrl } from "../layoutHelper";

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
  () => attrs["background-position"] ?? "left",
);

const style = computed(() => {
  if (!props.image) return {};

  const baseStyle = handleBackground(
    resolveAssetUrl(props.image),
    false,
    "cover", // ✅ ВСЕГДА cover
  );

  return {
    ...baseStyle,
    backgroundPosition: `${backgroundPosition.value} center`,
  };
});
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div class="grid grid-cols-2 w-full h-full auto-rows-fr">
      <div class="slidev-layout image-right" :class="props.class">
        <slot />
      </div>
      <div
        class="alchemmist-split-image alchemmist-split-image--right w-full h-full"
        :style="style"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";

const props = withDefaults(
  defineProps<{
    allow?: string;
    gap?: string;
    sandbox?: string;
    scale?: number;
    title?: string;
    url: string;
  }>(),
  {
    gap: "2rem",
    scale: 1,
    title: "Embedded content",
  },
);

const frameStyle = computed(() => ({
  height: `${100 / props.scale}%`,
  transform: `scale(${props.scale})`,
  width: `${100 / props.scale}%`,
}));
</script>

<template>
  <SlideFrame :padded="false" frame-class="iframe-left">
    <div class="alchemmist-image-layout" :style="{ gap }">
      <iframe
        class="alchemmist-iframe"
        :src="url"
        :title="title"
        :allow="allow"
        :sandbox="sandbox"
        :style="frameStyle"
      />
      <div class="slidev-layout alchemmist-frame__content is-padded">
        <slot />
      </div>
    </div>
  </SlideFrame>
</template>

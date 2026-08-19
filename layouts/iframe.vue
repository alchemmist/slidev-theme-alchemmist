<script setup lang="ts">
import { computed } from "vue";
import SlideFrame from "../components/internal/SlideFrame.vue";

const props = withDefaults(
  defineProps<{
    allow?: string;
    sandbox?: string;
    scale?: number;
    title?: string;
    url: string;
  }>(),
  {
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
  <SlideFrame :padded="false" frame-class="iframe">
    <iframe
      class="alchemmist-iframe"
      :src="url"
      :title="title"
      :allow="allow"
      :sandbox="sandbox"
      :style="frameStyle"
    />
  </SlideFrame>
</template>

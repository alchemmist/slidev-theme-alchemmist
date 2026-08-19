<script setup lang="ts">
import { computed } from "vue";
import Marker from "./Marker.vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    label: string;
    tone?: "amber" | "blue" | "coral" | "emerald" | "rose" | "violet";
  }>(),
  {
    tone: "violet",
  },
);

const style = computed(() =>
  props.color ? { "--marker-color": props.color } : undefined,
);
</script>

<template>
  <Marker :class="`is-${tone}`" :style="style">{{ label }}</Marker>
</template>

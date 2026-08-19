<script setup lang="ts">
import { computed } from "vue";

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
  <span
    class="alchemmist-section-marker"
    :class="`is-${tone}`"
    :style="style"
    >{{ label }}</span
  >
</template>

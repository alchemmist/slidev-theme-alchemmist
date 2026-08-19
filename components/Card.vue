<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    content?: string;
    monoHead?: boolean;
    monoText?: boolean;
    monoTitle?: boolean;
    title?: string;
    tone?: "accent" | "neutral" | "success" | "warning" | "danger";
  }>(),
  {
    color: "#9ca3af",
    tone: "neutral",
  },
);

const headerColor = computed(() => {
  const hex = props.color.replace("#", "");
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},0.2)`;
});
</script>

<template>
  <div class="w-fit bg-white shadow-card p-0 rounded-none">
    <div
      v-if="title"
      :class="[monoTitle || monoHead ? 'font-mono' : '', 'px-4 py-2']"
      :style="{ backgroundColor: headerColor, color: '#000' }"
    >
      {{ title }}
    </div>
    <div :class="['p-4 text-gray-800', monoText ? 'font-mono' : '']">
      <p v-if="content">{{ content }}</p>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.shadow-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

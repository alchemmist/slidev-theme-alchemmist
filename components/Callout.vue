<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    type?: "note" | "tip" | "important" | "warning" | "caution";
  }>(),
  {
    type: "note",
  },
);
</script>

<template>
  <aside class="alchemmist-callout" :class="`is-${type}`">
    <strong class="alchemmist-callout__title">{{ title ?? type }}</strong>
    <div><slot /></div>
  </aside>
</template>

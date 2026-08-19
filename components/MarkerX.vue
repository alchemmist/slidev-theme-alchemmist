<script setup lang="ts">
import SectionMarker from "./SectionMarker.vue";

defineProps<{
  color?: string;
  title: string;
}>();
</script>

<template>
  <SectionMarker :color="color" :label="title" />
</template>

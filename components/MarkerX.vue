<template>
  <Marker :style="{ color }">
    {{ title }}
  </Marker>
</template>

<script setup lang="ts">
defineProps<{
  color?: string;
  title: string;
}>();
</script>

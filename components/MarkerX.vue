<template>
  <Marker :style="{ color }">
    {{ title }}
  </Marker>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  color: string;
}>();
</script>

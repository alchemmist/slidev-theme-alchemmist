<template>
  <SlideFrame content-align="center" frame-class="end"
    ><slot>END</slot></SlideFrame
  >
</template>

<script setup lang="ts">
import SlideFrame from "../components/internal/SlideFrame.vue";
</script>

<style scoped>
:deep(.slidev-layout) {
  background: #111;
  color: #fff;
}
</style>

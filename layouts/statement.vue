<template>
  <SlideFrame
    content-align="center"
    :content-width="contentWidth"
    frame-class="statement"
    ><slot
  /></SlideFrame>
</template>

<script setup lang="ts">
import SlideFrame from "../components/internal/SlideFrame.vue";

defineProps<{ contentWidth?: string | number }>();
</script>

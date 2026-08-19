<template>
  <SlideFrame :padded="false" frame-class="full"><slot /></SlideFrame>
</template>

<script setup lang="ts">
import SlideFrame from "../components/internal/SlideFrame.vue";
</script>

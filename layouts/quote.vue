<template>
  <div class="alchemmist-layout-frame">
    <div class="slidev-layout quote w-full h-full">
      <slot />
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";

const ctx = useSlideContext();

const date = computed(() => ctx.frontmatter?.date ?? "");
</script>

<style scoped>
.quote {
  position: relative;
}
</style>

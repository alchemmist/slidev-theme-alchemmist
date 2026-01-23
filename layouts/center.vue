<template>
  <div class="slidev-layout center h-full grid place-content-center">
    <div class="my-auto">
      <slot />
      <Footer :date="date" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue'
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const ctx = useSlideContext()

const date = computed(() => ctx.frontmatter?.date ?? '')
</script>

<style scoped>
.quote {
  position: relative;
}
</style>

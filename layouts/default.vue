<template>
  <div class="alchemmist-layout-frame">
    <div class="slidev-layout default w-full">
      <Pagination x="r" y="t" class-names="text-gray-400" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '../components/Pagination.vue'
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

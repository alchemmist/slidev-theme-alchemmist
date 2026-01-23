<template>
  <div class="slidev-layout default">
    <Pagination x="r" y="t" class-names="text-gray-400" />
    <slot />
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

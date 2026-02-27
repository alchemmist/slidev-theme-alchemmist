<template>
  <Pagination
    v-if="showPagination"
    :x="$slidev.themeConfigs.paginationX"
    :y="$slidev.themeConfigs.paginationY"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import Pagination from './components/Pagination.vue'

const { $slidev } = useSlideContext()
const { currentSlideRoute } = useNav()

const currentFrontmatter = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

const showPagination = computed(() => {
  const isSlidePaginationHidden = currentFrontmatter.value.pagination === false
    || currentFrontmatter.value.hidePagination === true

  if (isSlidePaginationHidden)
    return false

  if ($slidev.nav.currentPage === $slidev.nav.total + 1)
    return false

  const disabledPages = $slidev.themeConfigs.paginationPagesDisabled
  if (Array.isArray(disabledPages) && disabledPages.includes($slidev.nav.currentPage))
    return false

  return Boolean($slidev.themeConfigs.paginationX || $slidev.themeConfigs.paginationY)
})
</script>

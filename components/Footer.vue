<template>
  <footer class="slidev-footer">
    <div class="left" v-if="!hideLogos">
      <img src="/assets/cu-logo.svg" alt="Central University" />
      <img src="/assets/cpm-logo.svg" alt="Center of pedagogical excellence" />
      <img src="/assets/in-science-senter-logo.svg" alt="In center of science" />
    </div>

    <div v-if="!hideDate && date" class="right mono-text">
      {{ date }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{
  hideDate?: boolean
  hideLogos?: boolean
}>()

const { $slidev, $frontmatter } = useSlideContext()

const date = computed(() => $frontmatter.date ?? $slidev.configs.date ?? '')

const hideLogos = computed(() => props.hideLogos ?? $frontmatter.hideLogos ?? false)
const hideDate = computed(() => props.hideDate ?? $frontmatter.hideDate ?? false)
</script>

<style scoped>
.slidev-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slidev-footer .left img {
  height: 1.5rem;
}

.left {
  display: flex;
  gap: 1cm;
}

.slidev-footer .right {
  font-size: 0.9rem;
  color: var(--slidev-footer-color, #555);
}
</style>


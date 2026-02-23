<template>
  <AlchemmistFooter logo-src="/assets/cu-logo.svg" logo-alt="Central University">
    <template #right>
      <span class="mono-text">{{ date }}</span>
    </template>
  </AlchemmistFooter>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev, $frontmatter } = useSlideContext()

const date = computed(() => $frontmatter.date ?? $slidev.configs.date ?? '')
</script>

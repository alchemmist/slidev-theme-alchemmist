<template>
  <div
    class="github-alert"
    :class="variant.wrapper"
  >
    <div class="github-alert-icon" :class="variant.icon">
      <component :is="variant.iconComponent" />
    </div>

    <div class="github-alert-content">
      <div class="github-alert-title" :class="variant.title">
        {{ variant.titleText }}
      </div>
      <div class="github-alert-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'info' | 'tip' | 'important' | 'warning' | 'caution'
}>()

const variants = {
  info: {
    titleText: 'Note',
    wrapper: 'border-blue-500',
    title: 'text-blue-600',
    icon: 'text-blue-600',
    iconComponent: {
      render() {
        return 'ℹ️'
      },
    },
  },
  tip: {
    titleText: 'Tip',
    wrapper: 'border-sky-500',
    title: 'text-sky-600',
    icon: 'text-sky-600',
    iconComponent: {
      render() {
        return '💡'
      },
    },
  },
  important: {
    titleText: 'Important',
    wrapper: 'border-violet-500',
    title: 'text-violet-600',
    icon: 'text-violet-600',
    iconComponent: {
      render() {
        return '❗'
      },
    },
  },
  warning: {
    titleText: 'Warning',
    wrapper: 'border-yellow-500',
    title: 'text-yellow-600',
    icon: 'text-yellow-600',
    iconComponent: {
      render() {
        return '⚠️'
      },
    },
  },
  caution: {
    titleText: 'Caution',
    wrapper: 'border-orange-500',
    title: 'text-orange-600',
    icon: 'text-orange-600',
    iconComponent: {
      render() {
        return '⛔'
      },
    },
  },
}

const variant = computed(() => variants[props.type])
</script>

<style scoped>
.github-alert {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-left-width: 4px;
  border-radius: 0.5rem;
  background-color: white;
}

.github-alert-icon {
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin-top: 0.15rem;
}

.github-alert-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.github-alert-title {
  font-weight: 600;
}

.github-alert-body {
  font-size: 0.95rem;
  color: #374151;
}
</style>


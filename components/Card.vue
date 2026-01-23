<template>
  <div class="max-w-md bg-white shadow-card p-0 rounded-none">
    <div 
      v-if="title" 
      :class="[monoHead ? 'font-mono' : '', 'px-4 py-2']"
      :style="{ backgroundColor: headerColor, color: '#000' }"
    >
      {{ title }}
    </div>
    <div :class="['p-4 text-gray-800', monoText ? 'font-mono' : '']">
      <p v-if="content">{{ content }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  color: { type: String, default: '#9ca3af' },
  monoText: { type: Boolean, default: false },
  monoHead: { type: Boolean, default: false }
})

const headerColor = computed(() => {
  const hex = props.color.replace('#','')
  const r = parseInt(hex.substring(0,2),16)
  const g = parseInt(hex.substring(2,4),16)
  const b = parseInt(hex.substring(4,6),16)
  return `rgba(${r},${g},${b},0.2)`
})
</script>

<style scoped>
.shadow-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>


<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { handleBackground, resolveAssetUrl } from '../layoutHelper'
import Footer from '../components/Footer.vue'

const props = defineProps({
  image: {
    type: String,
  },
  class: {
    type: String,
  },
})

const attrs = useAttrs()

const backgroundPosition = computed(
  () => attrs['background-position'] ?? 'left'
)

const hasShadow = computed(() => !!attrs['shadow'])

const style = computed(() => {
  if (!props.image)
    return {}

  const baseStyle = handleBackground(
    resolveAssetUrl(props.image),
    false,
    'cover', // ✅ ВСЕГДА cover
  )

  return {
    ...baseStyle,
    backgroundPosition: `${backgroundPosition.value} center`,
    ...(hasShadow.value
      ? { boxShadow: '10px 0 20px rgba(0,0,0,0.3)' }
      : {}),
  }
})
</script>

<template>
  <div class="grid grid-cols-2 w-full h-full auto-rows-fr">
    <div class="slidev-layout image-right" :class="props.class">
      <slot />
      <Footer hide-date hide-logos />
    </div>
    <div class="w-full h-full" :style="style" />
  </div>
</template>


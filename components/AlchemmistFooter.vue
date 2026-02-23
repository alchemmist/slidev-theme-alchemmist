<template>
  <footer class="slidev-footer">
    <div v-if="showLeft" class="slidev-footer-left">
      <slot name="left">
        <img
          v-if="resolvedLogoSrc"
          :src="resolvedLogoSrc"
          :alt="resolvedLogoAlt"
          class="slidev-footer-logo"
        >
      </slot>
    </div>

    <div v-if="showRight" class="slidev-footer-right mono-text">
      <slot name="right">
        {{ resolvedDate }}
      </slot>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

interface FooterProps {
  hideDate?: boolean
  hideLogos?: boolean
  logoSrc?: string
  logoAlt?: string
  date?: string
}

const props = defineProps<FooterProps>()

const { $slidev, $frontmatter } = useSlideContext()

const resolvedLogoSrc = computed(() => {
  return props.logoSrc ?? $frontmatter.footerLogo ?? $slidev.themeConfigs.footerLogo ?? ''
})

const resolvedLogoAlt = computed(() => {
  return props.logoAlt ?? $frontmatter.footerLogoAlt ?? $slidev.themeConfigs.footerLogoAlt ?? 'Footer logo'
})

const resolvedDate = computed(() => {
  return props.date ?? $frontmatter.date ?? $slidev.configs.date ?? ''
})

const hideLogos = computed(() => {
  return props.hideLogos ?? $frontmatter.hideLogos ?? $slidev.themeConfigs.footerHideLogos ?? false
})

const hideDate = computed(() => {
  return props.hideDate ?? $frontmatter.hideDate ?? $slidev.themeConfigs.footerHideDate ?? false
})

const showLeft = computed(() => !hideLogos.value && Boolean(resolvedLogoSrc.value))
const showRight = computed(() => !hideDate.value && Boolean(resolvedDate.value))
</script>

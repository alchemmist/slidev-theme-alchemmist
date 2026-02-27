<template>
  <div
    v-if="showFooter"
    ref="footerHost"
    class="alchemmist-footer-host"
  >
    <component :is="resolvedFooterComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import AlchemmistFooter from './components/AlchemmistFooter.vue'

const FOOTER_HEIGHT_VAR = '--alchemmist-footer-height'

const { $slidev } = useSlideContext()
const { currentSlideRoute } = useNav()
const footerHost = ref<HTMLDivElement | null>(null)
const footerComponentModules = import.meta.glob('/components/**/*.vue')
const currentFrontmatter = computed(() => currentSlideRoute.value?.meta?.slide?.frontmatter ?? {})

const footerComponentByName = new Map<string, ReturnType<typeof defineAsyncComponent>>()

for (const [path, loadComponent] of Object.entries(footerComponentModules)) {
  const fileName = path.split('/').pop()

  if (!fileName?.endsWith('.vue'))
    continue

  const componentName = fileName.slice(0, -4)
  footerComponentByName.set(componentName, defineAsyncComponent(loadComponent))
}

let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

const showFooter = computed(() => {
  if ($slidev.themeConfigs.footer === false)
    return false

  const isSlideFooterHidden = currentFrontmatter.value.footer === false
    || currentFrontmatter.value.hideFooter === true

  if (isSlideFooterHidden)
    return false

  if ($slidev.nav.currentPage === $slidev.nav.total + 1)
    return false

  const disabledPages = $slidev.themeConfigs.footerPagesDisabled

  if (Array.isArray(disabledPages) && disabledPages.includes($slidev.nav.currentPage))
    return false

  return true
})

const resolvedFooterComponent = computed(() => {
  const customFooterName = $slidev.themeConfigs.footerComponent

  if (typeof customFooterName === 'string') {
    const componentByName = footerComponentByName.get(customFooterName)

    if (componentByName)
      return componentByName
  }

  return AlchemmistFooter
})

const setFooterHeightVar = (value: number) => {
  if (typeof document === 'undefined')
    return

  const normalizedValue = Number.isFinite(value) ? Math.max(0, value) : 0
  document.documentElement.style.setProperty(FOOTER_HEIGHT_VAR, `${normalizedValue.toFixed(2)}px`)
}

const updateFooterHeight = () => {
  const host = footerHost.value

  if (!host) {
    setFooterHeightVar(0)
    return
  }

  const rectHeight = host.getBoundingClientRect().height
  const offsetHeight = host.offsetHeight

  let slideScale = 1
  if (typeof document !== 'undefined') {
    const cssScale = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--slidev-slide-scale'),
    )
    if (Number.isFinite(cssScale) && cssScale > 0)
      slideScale = cssScale
  }

  const scaledOffsetHeight = offsetHeight * slideScale
  const measuredHeight = Math.min(
    Number.isFinite(rectHeight) ? rectHeight : Number.POSITIVE_INFINITY,
    Number.isFinite(scaledOffsetHeight) ? scaledOffsetHeight : Number.POSITIVE_INFINITY,
  )

  const finalHeight = Number.isFinite(measuredHeight)
    ? measuredHeight
    : (Number.isFinite(rectHeight) ? rectHeight : offsetHeight)

  setFooterHeightVar(finalHeight)
}

const disconnectObservers = () => {
  resizeObserver?.disconnect()
  resizeObserver = null

  mutationObserver?.disconnect()
  mutationObserver = null
}

const reconnectObservers = () => {
  disconnectObservers()

  const host = footerHost.value

  if (!host)
    return

  if (typeof ResizeObserver === 'undefined')
    updateFooterHeight()
  else {
    resizeObserver = new ResizeObserver(updateFooterHeight)
    resizeObserver.observe(host)
  }

  if (typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver(updateFooterHeight)
    mutationObserver.observe(host, { childList: true, subtree: true, attributes: true, characterData: true })
  }
}

watch(showFooter, async (isVisible) => {
  if (!isVisible) {
    disconnectObservers()
    setFooterHeightVar(0)
    return
  }

  await nextTick()
  reconnectObservers()
  updateFooterHeight()
}, { immediate: true })

onMounted(() => {
  updateFooterHeight()
})

onBeforeUnmount(() => {
  disconnectObservers()
  setFooterHeightVar(0)
})
</script>

<style scoped>
.alchemmist-footer-host {
  position: absolute;
  bottom: 0;
  left: var(--slide-padding-inline, 2rem);
  right: var(--slide-padding-inline, 2rem);
  padding: 1rem;
  box-sizing: border-box;
}
</style>

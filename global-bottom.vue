<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";
import { useNav, useSlideContext } from "@slidev/client";
import AlchemmistFooter from "./components/AlchemmistFooter.vue";
import { isChromeVisible } from "./theme/config";
import type { SlideChromeFrontmatter, ThemeConfig } from "./theme/config";

const { $slidev } = useSlideContext();
const { currentSlideRoute } = useNav();
const host = ref<HTMLElement>();
const modules = import.meta.glob<Record<string, unknown>>(
  "/components/**/*.vue",
);
const components = new Map<string, ReturnType<typeof defineAsyncComponent>>();

for (const [path, loader] of Object.entries(modules)) {
  const name = path
    .split("/")
    .pop()
    ?.replace(/\.vue$/, "");
  if (name)
    components.set(name, defineAsyncComponent(loader as () => Promise<never>));
}

const frontmatter = computed<SlideChromeFrontmatter>(
  () =>
    (
      currentSlideRoute.value?.meta?.slide as
        { frontmatter?: SlideChromeFrontmatter } | undefined
    )?.frontmatter ?? {},
);
const config = computed<ThemeConfig>(() => $slidev.themeConfigs ?? {});
const visible = computed(() =>
  isChromeVisible(
    "footer",
    $slidev.nav.currentPage,
    $slidev.nav.total,
    frontmatter.value,
    config.value,
  ),
);
const component = computed(() => {
  const name = config.value.footerComponent;
  return name ? (components.get(name) ?? AlchemmistFooter) : AlchemmistFooter;
});

let observer: ResizeObserver | undefined;

function setHeight(value: number) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--alchemmist-footer-height",
    `${Math.max(0, value)}px`,
  );
}

function connect() {
  observer?.disconnect();
  if (!host.value) {
    setHeight(0);
    return;
  }
  setHeight(host.value.offsetHeight);
  if (typeof ResizeObserver === "undefined") return;
  observer = new ResizeObserver(() => setHeight(host.value?.offsetHeight ?? 0));
  observer.observe(host.value);
}

watch(
  visible,
  async (value) => {
    if (!value) {
      observer?.disconnect();
      setHeight(0);
      return;
    }
    await nextTick();
    connect();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  setHeight(0);
});
</script>

<template>
  <div v-if="visible" ref="host" class="alchemmist-footer-host">
    <component :is="component" />
  </div>
</template>

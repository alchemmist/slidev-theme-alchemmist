<script setup lang="ts">
import { computed } from "vue";
import { useNav, useSlideContext } from "@slidev/client";
import Pagination from "./components/Pagination.vue";
import { isChromeVisible, resolveCorner } from "./theme/config";
import { useDeferredChromeVisibility } from "./theme/chromeTransition";
import type { SlideChromeFrontmatter, ThemeConfig } from "./theme/config";

const { $slidev } = useSlideContext();
const { currentSlideRoute } = useNav();

const frontmatter = computed<SlideChromeFrontmatter>(
  () =>
    (
      currentSlideRoute.value?.meta?.slide as
        { frontmatter?: SlideChromeFrontmatter } | undefined
    )?.frontmatter ?? {},
);
const config = computed<ThemeConfig>(() => $slidev.themeConfigs ?? {});
const desiredVisibility = computed(() =>
  isChromeVisible(
    "pagination",
    $slidev.nav.currentPage,
    $slidev.nav.total,
    frontmatter.value,
    config.value,
  ),
);
const visible = useDeferredChromeVisibility(desiredVisibility);
</script>

<template>
  <Transition name="alchemmist-chrome">
    <Pagination v-if="visible" :position="resolveCorner(config)" />
  </Transition>
</template>

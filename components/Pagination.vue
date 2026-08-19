<script setup lang="ts">
import { computed, PropType } from "vue";
import { useSlideContext } from "@slidev/client";

const { $slidev } = useSlideContext();

const {
  classNames: classNamesTransferred,
  x,
  y,
} = defineProps({
  classNames: [Array, String] as PropType<string[] | string>,
  x: { default: "r", type: String as PropType<"l" | "r"> },
  y: { default: "t", type: String as PropType<"b" | "t"> },
});

const classNames = computed(() => [
  ...(classNamesTransferred
    ? Array.isArray(classNamesTransferred)
      ? classNamesTransferred
      : [classNamesTransferred]
    : []),
  x === "l" && "left-0",
  x === "r" && "right-0",
  y === "t" && "top-0",
  y === "b" && "bottom-0",
]);

const current = computed(() => {
  if ($slidev.isPrint) return $slidev.print?.pageIndex + 1;
  return $slidev.nav.currentPage;
});

const total = computed(() => {
  if ($slidev.isPrint) return $slidev.print?.total;
  return $slidev.nav.total;
});
</script>

<template>
  <div
    class="absolute p-2 text-xs mono-text"
    :class="classNames"
    style="color: rgba(0, 0, 0, 0.5); display: flex; gap: 0.5em; padding: 1.5em"
  >
    <span style="font-size: 1.8em">{{ current }}</span> /
    <span style="font-size: 1.4em">{{ total }}</span>
  </div>
</template>

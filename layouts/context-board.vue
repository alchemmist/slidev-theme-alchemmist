<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();
const gap = computed(() => String(attrs.gap ?? "2.5rem"));
const split = computed(() => String(attrs.split ?? "46%"));
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div
      class="slidev-layout context-board"
      :style="{
        '--context-board-gap': gap,
        '--context-board-split': split,
      }"
    >
      <header class="context-board__header">
        <slot />
      </header>
      <section class="context-board__context">
        <slot name="left" />
      </section>
      <section class="context-board__board">
        <slot name="right" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.context-board {
  box-sizing: border-box;
  display: grid;
  gap: 1.5rem var(--context-board-gap);
  grid-template-columns:
    minmax(0, var(--context-board-split))
    minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  width: 100%;
}

.context-board__header {
  grid-column: 1 / -1;
}

.context-board__context,
.context-board__board {
  min-height: 0;
}

.context-board__context {
  padding-right: calc(var(--context-board-gap) / 2);
}

.context-board__board {
  border-left: 1px solid rgb(0 0 0 / 18%);
  padding-left: calc(var(--context-board-gap) / 2);
}
</style>

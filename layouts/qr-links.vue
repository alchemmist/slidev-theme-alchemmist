<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();
const gap = computed(() => String(attrs.gap ?? "3.5rem"));
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div
      class="slidev-layout alchemmist-qr-links"
      :class="{ 'alchemmist-qr-links--with-title': $slots.title }"
      :style="{ '--qr-links-gap': gap }"
    >
      <header v-if="$slots.title" class="alchemmist-qr-links__title">
        <slot name="title" />
      </header>
      <div class="alchemmist-qr-links__body">
        <section class="alchemmist-qr-links__primary">
          <slot />
        </section>
        <section class="alchemmist-qr-links__secondary">
          <slot name="right" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alchemmist-qr-links {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  height: 100%;
  width: 100%;
}

.alchemmist-qr-links--with-title {
  grid-template-rows: auto minmax(0, 1fr);
}

.alchemmist-qr-links__title {
  align-self: start;
}

.alchemmist-qr-links__body {
  align-items: center;
  display: grid;
  gap: var(--qr-links-gap);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  min-height: 0;
}

.alchemmist-qr-links__primary {
  --qr-link-icon-size: 3.5rem;
  --qr-link-label-size: 1.4rem;
  --qr-link-size: 18rem;
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 0;
}

.alchemmist-qr-links__secondary {
  --qr-link-icon-size: 2.35rem;
  --qr-link-label-size: 1rem;
  --qr-link-size: 10.5rem;
  align-items: start;
  display: grid;
  gap: 2.25rem 1.6rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
}
</style>

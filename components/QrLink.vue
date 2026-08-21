<script setup lang="ts">
import { computed } from "vue";
import QrCode from "./QrCode.vue";

const props = withDefaults(
  defineProps<{
    alt?: string;
    href: string;
    iconSrc?: string;
    label: string;
  }>(),
  {
    alt: undefined,
    iconSrc: undefined,
  },
);

const altText = computed(() => props.alt || `QR code for ${props.label}`);
</script>

<template>
  <div class="alchemmist-qr-link">
    <a :href="href" target="_blank" rel="noopener noreferrer">
      <b>{{ label }}</b>
    </a>
    <QrCode :value="href" :icon-src="iconSrc" :alt="altText" />
  </div>
</template>

<style scoped>
.alchemmist-qr-link {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  font-family: "CMU-Typewriter", "Symbols Nerd Font", monospace;
  min-width: 0;
}

.alchemmist-qr-link a {
  font-size: var(--qr-link-label-size, 1.15rem);
  margin-bottom: 0.8rem;
  max-width: 100%;
}
</style>

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
    <QrCode :value="href" :icon-src="iconSrc" :alt="altText">
      <template #label>
        <a :href="href" target="_blank" rel="noopener noreferrer">
          <b>{{ label }}</b>
        </a>
      </template>
    </QrCode>
  </div>
</template>

<style scoped>
.alchemmist-qr-link {
  font-family: "CMU-Typewriter", "Symbols Nerd Font", monospace;
  min-width: 0;
}

.alchemmist-qr-link a {
  font-size: var(--qr-link-label-size, 1.15rem);
  max-width: 100%;
}
</style>

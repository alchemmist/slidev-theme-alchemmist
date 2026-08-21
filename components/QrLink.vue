<script setup lang="ts">
import { computed } from "vue";
import QrCode from "./QrCode.vue";

const props = withDefaults(
  defineProps<{
    alt?: string;
    display?: string;
    href: string;
    iconSrc?: string;
    label: string;
  }>(),
  {
    alt: undefined,
    display: undefined,
    iconSrc: undefined,
  },
);

const displayText = computed(
  () =>
    props.display ?? props.href.replace(/^https?:\/\//, "").replace(/\/$/, ""),
);
const altText = computed(() => props.alt || `QR code for ${props.label}`);
</script>

<template>
  <div class="alchemmist-qr-link">
    <QrCode :value="href" :icon-src="iconSrc" :alt="altText" />
    <b>{{ label }}</b>
    <a :href="href" target="_blank" rel="noopener noreferrer">
      <code>{{ displayText }}</code>
    </a>
  </div>
</template>

<style scoped>
.alchemmist-qr-link {
  align-items: center;
  color: #111;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.alchemmist-qr-link b {
  font-size: var(--qr-link-label-size, 1.15rem);
  margin-top: 0.8rem;
}

.alchemmist-qr-link a {
  max-width: 100%;
}

.alchemmist-qr-link code {
  background: transparent;
  color: #666;
  display: block;
  font-family: var(--slidev-code-font-family);
  font-size: var(--qr-link-address-size, 0.72rem);
  overflow-wrap: anywhere;
  padding: 0;
  text-align: center;
}
</style>

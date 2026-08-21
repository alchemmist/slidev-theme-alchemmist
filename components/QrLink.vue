<script setup lang="ts">
import { computed } from "vue";
import { resolveAssetUrl } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    alt: string;
    display?: string;
    href: string;
    iconSrc: string;
    label: string;
    src: string;
  }>(),
  {
    display: undefined,
  },
);

const qrSource = computed(() => resolveAssetUrl(props.src));
const iconSource = computed(() => resolveAssetUrl(props.iconSrc));
const displayText = computed(
  () =>
    props.display ?? props.href.replace(/^https?:\/\//, "").replace(/\/$/, ""),
);
</script>

<template>
  <div class="alchemmist-qr-link">
    <div class="alchemmist-qr-link__code">
      <img class="alchemmist-qr-link__image" :src="qrSource" :alt="alt" />
      <span class="alchemmist-qr-link__icon" aria-hidden="true">
        <img :src="iconSource" alt="" />
      </span>
    </div>
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

.alchemmist-qr-link__code {
  height: var(--qr-link-size, 12rem);
  position: relative;
  width: var(--qr-link-size, 12rem);
}

.alchemmist-qr-link__image {
  display: block;
  height: 100%;
  width: 100%;
}

.alchemmist-qr-link__icon {
  align-items: center;
  background: #fff;
  border-radius: 0.45rem;
  display: flex;
  height: var(--qr-link-icon-size, 2.6rem);
  justify-content: center;
  left: 50%;
  padding: 0.35rem;
  position: absolute;
  top: 50%;
  translate: -50% -50%;
  width: var(--qr-link-icon-size, 2.6rem);
}

.alchemmist-qr-link__icon img {
  display: block;
  height: 100%;
  object-fit: contain;
  width: 100%;
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
  font-size: var(--qr-link-address-size, 0.72rem);
  overflow-wrap: anywhere;
  padding: 0;
  text-align: center;
}
</style>

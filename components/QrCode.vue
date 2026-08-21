<script setup lang="ts">
import { computed } from "vue";
import { renderSVG } from "uqr";
import { resolveAssetUrl } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    alt?: string;
    iconSrc?: string;
    value: string;
  }>(),
  {
    alt: "QR code",
    iconSrc: undefined,
  },
);

const iconSource = computed(() =>
  props.iconSrc ? resolveAssetUrl(props.iconSrc) : undefined,
);
const source = computed(() => {
  const svg = renderSVG(props.value, {
    border: 2,
    ecc: props.iconSrc ? "H" : "M",
  });
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
});
</script>

<template>
  <div class="alchemmist-qr-code">
    <img
      v-if="source"
      class="alchemmist-qr-code__image"
      :src="source"
      :alt="alt"
    />
    <span v-if="iconSource" class="alchemmist-qr-code__icon" aria-hidden="true">
      <img :src="iconSource" alt="" />
    </span>
  </div>
</template>

<style scoped>
.alchemmist-qr-code {
  height: var(--qr-link-size, 12rem);
  position: relative;
  width: var(--qr-link-size, 12rem);
}

.alchemmist-qr-code__image {
  display: block;
  height: 100%;
  width: 100%;
}

.alchemmist-qr-code__icon {
  align-items: center;
  background: #fff;
  border: 20px solid #111;
  border-radius: 0.45rem;
  display: flex;
  height: var(--qr-link-icon-size, 2.6rem);
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  translate: -50% -50%;
  width: var(--qr-link-icon-size, 2.6rem);
}

.alchemmist-qr-code__icon img {
  display: block;
  height: var(--qr-link-icon-fill, 68%);
  object-fit: contain;
  width: var(--qr-link-icon-fill, 68%);
}
</style>

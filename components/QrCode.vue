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
const qr = computed(() => {
  const svg = renderSVG(props.value, {
    border: 2,
    ecc: props.iconSrc ? "H" : "M",
  });
  const viewBoxSize = Number(svg.match(/viewBox="0 0 (\d+) \d+"/)?.[1]);
  const matrixOffset = Number(svg.match(/<path[^>]+d="M(\d+),/)?.[1]);
  const quietZone = `${(matrixOffset / viewBoxSize) * 100}%`;
  return {
    quietZone,
    source: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
  };
});
</script>

<template>
  <div
    class="alchemmist-qr-code"
    :style="{ '--qr-code-quiet-zone': qr.quietZone }"
  >
    <div v-if="$slots.label" class="alchemmist-qr-code__label">
      <slot name="label" />
    </div>
    <div class="alchemmist-qr-code__canvas">
      <img class="alchemmist-qr-code__image" :src="qr.source" :alt="alt" />
      <span
        v-if="iconSource"
        class="alchemmist-qr-code__icon"
        aria-hidden="true"
      >
        <img :src="iconSource" alt="" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.alchemmist-qr-code {
  width: var(--qr-link-size, 12rem);
}

.alchemmist-qr-code__label {
  margin-bottom: 0.8rem;
  margin-left: var(--qr-code-quiet-zone);
}

.alchemmist-qr-code__canvas {
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
  border-radius: 0.45rem;
  box-shadow: 0 0.16rem 0.45rem rgb(17 17 17 / 30%);
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

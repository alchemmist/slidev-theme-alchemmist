<template>
  <div class="alchemmist-sticker">
    <div class="alchemmist-sticker__surface">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.alchemmist-sticker {
  position: absolute;
  transform: translate3d(var(--sticker-x, 0), var(--sticker-y, 0), 0)
    scale(var(--sticker-scale, 1));
  transform-origin: top left;
  transition:
    opacity 180ms ease,
    transform 260ms ease;
  max-width: var(--sticker-max-width, 16.5rem);
  min-width: var(--sticker-min-width, 13.5rem);
  width: var(--sticker-width, max-content);
  z-index: 1;
}

.alchemmist-sticker__surface {
  background: var(--sticker-color, #fff1a8);
  border: 1px solid rgb(0 0 0 / 8%);
  border-radius: 0.35rem;
  box-shadow: 0 0.65rem 1.3rem rgb(0 0 0 / 14%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 5.8rem;
  padding: 0.95rem 1.1rem;
  transform: rotate(var(--sticker-rotation, 0deg));
}

.alchemmist-sticker.slidev-vclick-current .alchemmist-sticker__surface {
  animation: alchemmist-sticker-drop 520ms cubic-bezier(0.22, 0.78, 0.3, 1.12)
    both;
}

@keyframes alchemmist-sticker-drop {
  0% {
    transform: translateY(-9rem) rotate(var(--sticker-rotation, 0deg))
      scale(0.92);
  }

  72% {
    transform: translateY(0.45rem) rotate(var(--sticker-rotation, 0deg))
      scale(1.02);
  }

  100% {
    transform: translateY(0) rotate(var(--sticker-rotation, 0deg)) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .alchemmist-sticker.slidev-vclick-current .alchemmist-sticker__surface {
    animation: none;
  }
}

.alchemmist-sticker__surface :deep(> b),
.alchemmist-sticker__surface :deep(> strong) {
  font-size: var(--sticker-title-font-size, 1.3rem);
}

.alchemmist-sticker__surface :deep(> span) {
  font-size: var(--sticker-body-font-size, 0.98rem);
  line-height: 1.25;
  margin-top: 0.32rem;
  opacity: 0.7;
}
</style>

<template>
  <div class="alchemmist-layout-frame">
    <div class="slidev-layout end w-full h-full">
      <slot>END</slot>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.slidev-layout.end {
  @apply text-white text-opacity-85 text-xl tracking-widest bg-black h-full text-center grid place-content-center select-none;
}
</style>

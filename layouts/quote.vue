<template>
  <div class="alchemmist-layout-frame">
    <div class="slidev-layout quote w-full h-full">
      <slot />
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.quote {
  position: relative;
}
</style>

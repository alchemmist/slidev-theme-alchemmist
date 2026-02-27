<!--
  Usage:

```md
---
layout: two-cols
---

# Left

This shows on the left

::right::

# Right

This shows on the right
```

-->

<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const props = defineProps({
  class: {
    type: String,
  },
  layoutClass: {
    type: String,
  },
})

const attrs = useAttrs()
const gap = computed(() => attrs.gap ?? '20px')
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div
      class="slidev-layout two-columns w-full h-full grid grid-cols-2"
      :class="props.layoutClass"
      :style="{ columnGap: gap }"
    >
      <div class="col-left" :class="props.class">
        <slot />
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

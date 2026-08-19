<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="alchemmist-layout-frame">
    <div class="slidev-layout cover w-full" :style="style">
      <div class="my-auto w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

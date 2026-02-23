<script setup lang="ts">
import { useAttrs, computed, ref, onMounted, reactive } from "vue";

const props = defineProps({
  class: String,
  layoutClass: String,
});

const attrs = useAttrs();
const gap = computed(() => attrs.gap ?? "20px");
</script>

<template>
  <div class="flex center h-[calc(100%_-_50px)]" >
    <div
      class="slidev-layout two-cols-header w-full"
      :class="layoutClass"
      :style="{ columnGap: gap }"
    >
      <div class="col-header">
        <slot />
      </div>
      <div class="col-left" :class="props.class">
        <slot name="left" />
      </div>
      <div class="col-right" :class="props.class">
        <slot name="right" />
      </div>
      <div class="col-bottom" :class="props.class">
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.two-cols-header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto auto;
  gap: 0;
  height: auto;
}

.col-header {
  grid-column: 1 / 3;
  align-self: start;
}

.col-left {
  grid-column: 1 / 2;
  align-self: start;
}

.col-right {
  grid-column: 2 / 3;
  align-self: start;
}

.col-bottom {
  grid-column: 1 / 3;
  align-self: end;
}
</style>

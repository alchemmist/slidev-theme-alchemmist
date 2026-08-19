<script setup lang="ts">
import Callout from "./Callout.vue";

const props = defineProps<{
  type: "info" | "tip" | "important" | "warning" | "caution";
}>();

const type = props.type === "info" ? "note" : props.type;
</script>

<template>
  <Callout :type="type"><slot /></Callout>
</template>

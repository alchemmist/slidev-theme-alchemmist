<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    color?: string;
    content?: string;
    monoHead?: boolean;
    monoText?: boolean;
    monoTitle?: boolean;
    title?: string;
    tone?: "accent" | "neutral" | "success" | "warning" | "danger";
  }>(),
  {
    tone: "neutral",
  },
);

const style = computed(() =>
  props.color ? { "--card-accent": props.color } : undefined,
);
</script>

<template>
  <article class="alchemmist-card" :class="`is-${tone}`" :style="style">
    <header
      v-if="title"
      class="alchemmist-card__title"
      :class="{ 'mono-text': monoTitle || monoHead }"
    >
      {{ title }}
    </header>
    <div class="alchemmist-card__body" :class="{ 'mono-text': monoText }">
      <p v-if="content">{{ content }}</p>
      <slot />
    </div>
  </article>
</template>

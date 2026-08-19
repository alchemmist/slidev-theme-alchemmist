<script setup lang="ts">
import { computed } from "vue";
import { resolveAssetUrl } from "../theme/assets";

const props = withDefaults(
  defineProps<{
    author: string;
    avatar?: string;
    source?: string;
    sourceUrl?: string;
    text?: string;
    type?: string;
    year?: string;
  }>(),
  {
    type: "Essay",
  },
);

const avatarUrl = computed(() => resolveAssetUrl(props.avatar));
</script>

<template>
  <figure class="alchemmist-quote">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="author"
      class="alchemmist-quote__avatar"
    />
    <blockquote class="alchemmist-quote__body">
      <div class="alchemmist-quote__text mono-text">
        <slot>{{ text }}</slot>
      </div>
    </blockquote>
    <figcaption>
      <strong>{{ author }}</strong>
      <span v-if="source" class="alchemmist-quote__source">
        {{ type }}
        <a v-if="sourceUrl" :href="sourceUrl">“{{ source }}”</a>
        <span v-else>“{{ source }}”</span
        ><template v-if="year">, {{ year }}</template>
      </span>
    </figcaption>
  </figure>
</template>

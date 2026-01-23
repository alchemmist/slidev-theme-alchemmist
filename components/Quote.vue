<template>
  <div class="flex items-start gap-4 max-w-3xl">
    <img
      :src="avatarUrl"
      :alt="props.author"
      class="w-25 h-25 rounded-full object-cover"
    />
    <div class="flex flex-col border-l-4 border-gray-500 bg-gray-100 p-4">
      <p class="italic mono-text">«{{ props.text }}»</p>
      <span class="mt-2 font-semibold text-gray-800 text-sm">{{
        props.author
      }}</span>
      <span class="text-sm text-gray-400" v-if="props.source">
        {{ props.type }}
        <a
          v-if="props.sourceUrl"
          :href="props.sourceUrl"
          class="text-gray-500 hover:text-gray-800"
          >«{{ props.source }}»</a
        >
        <span v-else>{{ props.source }}</span
        >, {{ props.year }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  author: { type: String, required: true },
  source: { type: String, default: "" },
  sourceUrl: { type: String, default: "" },
  year: { type: String, default: "" },
  type: { type: String, default: "Essay" },
  avatar: { type: String, default: "" },
});

const avatarUrl = computed(() => {
  if (!props.avatar) return "";
  return props.avatar.startsWith("/")
    ? import.meta.env.BASE_URL + props.avatar.slice(1)
    : props.avatar;
});
</script>

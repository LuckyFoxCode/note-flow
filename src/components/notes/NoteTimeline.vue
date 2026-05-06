<script setup lang="ts">
import type { Category, Note } from '@/types';
import NoteDateGroup from './NoteDateGroup.vue';

const props = defineProps<{
  currentCategory: Category;
  timelineData: { date: string; notes: Note[] }[];
}>();
</script>

<template>
  <div
    class="absolute top-24 bottom-2 left-2 z-10 w-0.75"
    :style="{ background: `${props.currentCategory?.categoryColor}20` }"
  />
  <NoteDateGroup
    :timeline-data="timelineData"
    :current-category="currentCategory"
  />
</template>

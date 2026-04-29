<script setup lang="ts">
import { IconCircle } from '@/assets/icons';
import type { Category } from '@/types';
import { computed } from 'vue';

const { category } = defineProps<{
  category: Category;
}>();

const formatDate = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr);

  const isToday =
    date.getDay() === today.getDay() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return 'Today';

  return new Intl.DateTimeFormat('en-US').format(date);
};

const progress = computed(() => {
  const notes = category.categoryNotes;

  if (!notes || notes.length === 0) return 0;
  const completed = notes.filter((note) => note.completed).length;

  return Math.round((completed / notes.length) * 100);
});
</script>
<template>
  <li>
    <router-link
      :to="`/categories/${category.slug}`"
      class="focus-within:border-accent border-border shadow-border category-link flex w-full flex-col rounded-lg border-2 px-2 py-2 shadow transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-lg md:p-1"
      :style="{ '--category-color': category.categoryColor }"
    >
      <div class="mb-10 flex w-full items-center justify-between">
        <h3 class="mr-5 text-sm md:text-base 2xl:text-lg">{{ category.name }}</h3>
        <IconCircle
          :percentage="progress"
          :color="category.categoryColor"
        />
      </div>
      <div class="text-text-secondary flex w-full justify-end text-xs md:text-sm 2xl:text-base">
        <span
          class="rounded-lg border-t px-2 py-1"
          :style="{
            borderColor: category.categoryColor,
            boxShadow: `-2px -2px 8px -3px ${category.categoryColor}`,
          }"
          >{{ formatDate(category.createdAt) }}</span
        >
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.category-link:hover {
  box-shadow: 0 5px 8px -3px var(--category-color);
}
</style>

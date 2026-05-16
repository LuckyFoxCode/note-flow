<script setup lang="ts">
import { IconGauge, IconNote, IconRate, IconWidget } from '@/assets/icons';
import { useCategoryStore } from '@/store';
import type { Note } from '@/types';
import { computed } from 'vue';
import StatCard from './StatCard.vue';

const props = defineProps<{
  totalNotes: Note[];
}>();

const categoryStore = useCategoryStore();

const totalCategories = computed(() => categoryStore.categories.length);

const rates = computed(() => {
  if (!props.totalNotes.length) return 0;

  const completeNotes = props.totalNotes.filter((note) => note.completed).length;
  return (completeNotes / props.totalNotes.length) * 100;
});

const mostActiveCategory = computed(() => {
  const categories = categoryStore.categories;

  if (!categories.length) return '';

  return categories.reduce((prev, current) => {
    const prevCount = prev.categoryNotes?.length || 0;
    const currentCount = current.categoryNotes?.length || 0;

    return currentCount > prevCount ? current : prev;
  }).name;
});
</script>

<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
    <StatCard
      title="total categories"
      :description="totalCategories"
      :icon="IconWidget"
      color="var(--color-amber-500)"
    />

    <StatCard
      title="total notes"
      :description="totalNotes.length"
      :icon="IconNote"
      color="var(--color-pink-500)"
    />

    <StatCard
      title="completion rate"
      :description="Math.round(rates)"
    >
      <IconGauge :percentage="Math.round(rates)" />
    </StatCard>

    <StatCard
      title="most active category"
      :description="mostActiveCategory"
      :icon="IconRate"
      color="var(--color-accent)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category, Note } from '@/types';
import NoteCard from './NoteCard.vue';

const props = defineProps<{
  currentCategory: Category;
  timelineData: { date: string; notes: Note[] }[];
}>();

const getDayLabel = (dateStr: string) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';

  return new Date(dateStr)
    .toLocaleDateString('en-US', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    })
    .toUpperCase();
};

const getFullDate = (dateStr: string) => {
  if (getDayLabel(dateStr) === 'Today' || getDayLabel(dateStr) === 'Yesterday') {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
  });
};
</script>

<template>
  <ul
    class="relative flex min-h-0 w-full flex-1 flex-col content-start gap-5 overflow-y-auto bg-transparent py-2 pr-2"
  >
    <li
      v-for="data in props.timelineData"
      :key="data.date"
      class="relative flex flex-col pl-6 md:pl-8"
    >
      <h3 class="flex items-center gap-x-1">
        <span
          class="text-text-main text-lg opacity-80"
          :style="{ color: currentCategory?.categoryColor }"
          >{{ getDayLabel(data.date) }},</span
        >
        <span class="text-text-secondary text-sm">{{ getFullDate(data.date) }}</span>
      </h3>
      <div
        class="absolute top-3 left-2.5 z-20 flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
      >
        <div
          class="size-2.5 rounded-full"
          :style="{ backgroundColor: currentCategory?.categoryColor }"
        />
      </div>

      <TransitionGroup
        name="list"
        tag="ul"
        class="3xl:grid-cols-5 uw:grid-cols-4 grid w-full gap-2 py-2 md:grid-cols-2 xl:grid-cols-3"
      >
        <NoteCard
          v-for="note in data.notes"
          :key="note.id"
          :note="note"
          :get-day-label="getDayLabel"
        />
      </TransitionGroup>
    </li>
  </ul>
</template>
<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

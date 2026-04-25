<script setup lang="ts">
import type { State } from '@/App.vue';
import { IconArrowLeft, IconPin } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { RADIO_COLORS } from '@/consts';
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

const openOverlay = inject<(type: 'category' | 'note') => void>('openOverlay');
const state = inject<State>('state');

const currentCategory = computed(() =>
  state?.categories.find((category) => category.slug === slug),
);

const timelineData = computed(() => {
  if (!currentCategory.value?.categoryNotes) return [];

  const notes = currentCategory.value.categoryNotes;
  const groups: Record<string, typeof notes> = {};

  notes.forEach((note) => {
    const dateKey = new Date(note.createdAt).toISOString().split('T')[0] as string;

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(note);
  });

  return Object.keys(groups)
    .map((date) => ({
      date,
      notes: groups[date]?.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

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

// const getFullDate = (dateStr: string) => {
//   return new Date(dateStr).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: '2-digit',
//     weekday: 'long',
//   });
// };

const handleOpenOverlay = () => {
  if (openOverlay) {
    openOverlay('note');
  }
};

const timelineGradient = computed(() => {
  const colors = RADIO_COLORS.join(', ');
  return `repeating-linear-gradient(to bottom, ${colors}, ${RADIO_COLORS[0]} 1440px)`;
});
</script>

<template>
  <section class="relative flex h-screen flex-col gap-1">
    <TheHeader
      :style="{
        borderColor: currentCategory?.categoryColor,
      }"
    >
      <div class="flex items-center gap-x-1">
        <button
          type="button"
          class="focus-within:text-accent hover:text-accent-lime cursor-pointer transition-colors duration-200 outline-none"
          @click="router.back()"
        >
          <IconArrowLeft class="size-6" />
        </button>
        <h2 class="capitalize md:text-2xl">{{ slug }}</h2>
      </div>
    </TheHeader>
    <button
      class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
      @click="handleOpenOverlay"
    >
      add note
    </button>
    <div
      class="bg-accent absolute top-24 bottom-2 left-2 z-10 w-1"
      :style="{
        background: timelineGradient,
        boxShadow: `0 0 10px ${currentCategory?.categoryColor}33`,
      }"
    />
    <ul
      class="relative flex min-h-0 w-full flex-1 flex-col content-start gap-5 overflow-y-auto bg-transparent py-2"
    >
      <li
        v-for="date in timelineData"
        :key="date.date"
        class="relative flex flex-col pl-8"
      >
        <h3
          class="text-lg"
          :style="{ color: currentCategory?.categoryColor }"
        >
          {{ getDayLabel(date.date) }}
        </h3>
        <div
          class="absolute top-1 left-2.5 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />

        <ul
          class="3xl:grid-cols-5 uw:grid-cols-4 grid w-full gap-2 py-2 md:grid-cols-2 xl:grid-cols-3"
        >
          <li
            v-for="note in date.notes"
            :key="note.id"
            class="border-border flex flex-col rounded-lg border p-2"
          >
            <div class="mb-7 flex items-center gap-x-1.5">
              <h4 class="text-text-main flex-1">{{ note.title }}</h4>
              <IconPin
                :class="[
                  'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
                  note.pinned ? 'text-error' : 'text-border',
                ]"
              />
            </div>
            <div class="text-text-secondary mb-7 text-sm">{{ note.content }}</div>
            <ul class="flex w-full items-center justify-end gap-x-1">
              <li
                v-for="tag in note.tag"
                :key="tag"
                class="rounded-lg border px-1.5 py-1 text-xs"
                :style="{
                  backgroundColor: `${note.categoryColor}20`,
                  color: note.categoryColor,
                  borderColor: note.categoryColor,
                }"
              >
                {{ tag }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

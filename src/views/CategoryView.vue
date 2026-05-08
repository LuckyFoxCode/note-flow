<script setup lang="ts">
import { IconArrowLeft } from '@/assets/icons';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import EntityActionBar from '@/components/EntityActionBar.vue';
import { NoteTimeline } from '@/components/notes';
import TheHeader from '@/components/TheHeader.vue';
import { PRIORITY_FILTER_OPTIONS, SORT_NOTE_OPTIONS } from '@/consts';
import { useCategoryStore, useUiStore } from '@/store';
import type { Category } from '@/types';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const categoriesStore = useCategoryStore();

const slug = route.params.slug as string;

const currentCategory = computed(
  () => categoriesStore.categories.find((category) => category.slug === slug) as Category,
);

const timelineData = computed(() => {
  const allNotes = currentCategory.value.categoryNotes;
  if (!allNotes) return [];

  const isNewest = categoriesStore.noteSort === 'newest';
  const priorityFilter = categoriesStore.priorityFilter;

  const filteredNotes = allNotes.filter((note) => {
    if (priorityFilter === 'all') return true;
    return note.priority === priorityFilter;
  });

  const groups: Record<string, typeof allNotes> = {};

  filteredNotes.forEach((note) => {
    const dateKey = new Date(note.createdAt).toISOString().split('T')[0] as string;

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(note);
  });

  return Object.entries(groups)
    .map(([date, groupNotes]) => ({
      date,
      notes: [...groupNotes].sort((a, b) => {
        if (uiStore.isPinned) {
          const pinnedDiff = Number(b.pinned) - Number(a.pinned);

          if (pinnedDiff !== 0) return pinnedDiff;
        }

        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();

        return isNewest ? timeB - timeA : timeA - timeB;
      }),
    }))
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();

      return isNewest ? timeB - timeA : timeA - timeB;
    });
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
    <EntityActionBar>
      <BaseButton
        title="add note"
        type="button"
        class="w-full md:w-fit"
        @click="uiStore.openOverlay('note', null)"
      />
      <BaseSelect v-model="categoriesStore.noteSort">
        <option
          v-for="option in SORT_NOTE_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </BaseSelect>
      <BaseSelect v-model="categoriesStore.priorityFilter">
        <option
          v-for="option in PRIORITY_FILTER_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </BaseSelect>
      <BaseCheckbox />
    </EntityActionBar>
    <NoteTimeline
      :current-category="currentCategory"
      :timeline-data="timelineData"
    />
  </section>
</template>

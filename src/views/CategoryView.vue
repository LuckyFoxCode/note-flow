<script setup lang="ts">
import { IconArrowLeft } from '@/assets/icons';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import EntityActionBar from '@/components/EntityActionBar.vue';
import { NoteTimeline } from '@/components/notes';
import TheHeader from '@/components/TheHeader.vue';
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

  return Object.entries(groups)
    .map(([date, groupNotes]) => ({
      date,
      notes: [...groupNotes].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
      <BaseSelect>
        <option
          disabled
          value="default"
        >
          Date
        </option>

        <option
          value="Newest"
          selected
        >
          Newest
        </option>
        <option value="Oldest">Oldest</option>
      </BaseSelect>
      <BaseSelect>
        <option
          disabled
          value="default"
        >
          Priority
        </option>
        <option
          value="All"
          selected
        >
          All
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </BaseSelect>
    </EntityActionBar>
    <NoteTimeline
      :current-category="currentCategory"
      :timeline-data="timelineData"
    />
  </section>
</template>

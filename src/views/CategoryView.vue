<script setup lang="ts">
import { IconArchive, IconArrowLeft, IconChecked, IconPen, IconPin } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { PRIORITY_CONFIG } from '@/consts';
import { useCategoryStore, useUiStore } from '@/store';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const categoriesStore = useCategoryStore();

const slug = route.params.slug as string;

const currentCategory = computed(() =>
  categoriesStore.categories.find((category) => category.slug === slug),
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
      @click="uiStore.openOverlay('note', null)"
    >
      add note
    </button>
    <div
      class="bg-accent absolute top-24 bottom-2 left-2 z-10 w-0.75"
      :style="{
        background: currentCategory?.categoryColor,
        boxShadow: `0 0 8px 6px ${currentCategory?.categoryColor}33`,
      }"
    />
    <ul
      class="relative flex min-h-0 w-full flex-1 flex-col content-start gap-5 overflow-y-auto bg-transparent py-2 pr-2"
    >
      <li
        v-for="date in timelineData"
        :key="date.date"
        class="relative flex flex-col pl-6 md:pl-8"
      >
        <h3 class="flex items-center gap-x-1">
          <span
            class="text-lg"
            :style="{ color: currentCategory?.categoryColor }"
            >{{ getDayLabel(date.date) }},</span
          >
          <span class="text-text-secondary text-sm">{{ getFullDate(date.date) }}</span>
        </h3>
        <div
          class="absolute top-3 left-2.5 z-20 flex size-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white"
        >
          <div
            class="size-2 rounded-full"
            :style="{ backgroundColor: currentCategory?.categoryColor }"
          />
        </div>

        <ul
          class="3xl:grid-cols-5 uw:grid-cols-4 grid w-full gap-2 py-2 md:grid-cols-2 xl:grid-cols-3"
        >
          <li
            v-for="note in date.notes"
            :key="note.id"
            class="border-border flex flex-col gap-y-5 rounded-lg border p-2"
          >
            <div class="flex items-center gap-x-1.5">
              <h4 class="text-text-main flex-1">{{ note.title }}</h4>
              <div class="flex items-center gap-x-1">
                <IconPen
                  class="hover:text-accent-lime text-text-secondary/70 size-5 cursor-pointer transition-colors duration-200"
                  @click="uiStore.openOverlay('note', note)"
                />
                <IconArchive
                  :class="[
                    'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
                    note.archived ? 'text-[#ff9500]' : 'text-text-secondary/70',
                  ]"
                  @click="categoriesStore.toggleNoteField(note.categoryId, note.id, 'archived')"
                />
                <IconChecked
                  :class="[
                    'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
                    note.completed ? 'text-accent-lime' : 'text-text-secondary/70',
                  ]"
                  @click="categoriesStore.toggleNoteField(note.categoryId, note.id, 'completed')"
                />
                <IconPin
                  :class="[
                    'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
                    note.pinned ? 'text-error' : 'text-text-secondary/30',
                  ]"
                  @click="categoriesStore.toggleNoteField(note.categoryId, note.id, 'pinned')"
                />
              </div>
            </div>
            <div class="text-text-secondary flex-1 text-sm">{{ note.content }}</div>
            <div class="flex flex-col items-end gap-y-2">
              <div
                class="w-fit rounded-lg border px-1.5 py-1 text-xs capitalize"
                :style="{
                  color: PRIORITY_CONFIG[note.priority].color,
                  borderColor: PRIORITY_CONFIG[note.priority].color,
                  backgroundColor: `${PRIORITY_CONFIG[note.priority].color}20`,
                }"
              >
                {{ note.priority }}
              </div>
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
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

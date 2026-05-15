<script setup lang="ts">
import { CategoryTable, ChartsSection, StatsDashboard } from '@/components/statistics';
import TheHeader from '@/components/TheHeader.vue';
import { useDateTime } from '@/composables';
import { useCategoryStore } from '@/store';
import { computed } from 'vue';

const categoryStore = useCategoryStore();
const { currentTime } = useDateTime();

const totalNotes = computed(() => categoryStore.categories.flatMap((note) => note.categoryNotes));
</script>

<template>
  <section class="flex h-dvh flex-col gap-x-1 gap-y-5 overflow-hidden">
    <TheHeader class="shrink-0">
      <span>Statistics Page</span>
    </TheHeader>
    <div class="no-scrollbar min-h-0 flex-1 overflow-y-auto px-2">
      <div class="grid content-start gap-y-5">
        <div class="flex flex-col">
          <h3 class="text-lg font-medium">NoteFlow Dashboard Statistics</h3>
          <p class="text-text-secondary text-sm">{{ currentTime }}</p>
        </div>

        <StatsDashboard :total-notes="totalNotes" />
        <ChartsSection :total-notes="totalNotes" />
        <CategoryTable />
      </div>
    </div>
  </section>
</template>

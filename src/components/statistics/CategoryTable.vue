<script setup lang="ts">
import { useCategoryStore } from '@/store';
import { computed } from 'vue';

const categoryStore = useCategoryStore();

const categories = computed(() =>
  categoryStore.categories.map((category) => {
    return {
      nameCategory: category.name,
      colorCategory: category.categoryColor,
      totalNotes: category.categoryNotes.length,
      completed: category.categoryNotes.filter((n) => n.completed).length,
    };
  }),
);

interface TableHeader {
  label: string;
  key: string;
}

const tableHeaders: TableHeader[] = [
  { label: 'Name', key: 'name' },
  { label: 'Color Tag', key: 'color' },
  { label: 'Total Notes', key: 'total' },
  { label: 'Completed', key: 'completed' },
  { label: 'Progress Bar', key: 'progress' },
];

const calculatePercentage = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};
</script>
<template>
  <div
    class="border-border/30 bg-bg hidden w-full overflow-hidden rounded-xl border-2 shadow-sm md:inline"
  >
    <div class="border-border border-b px-3 py-4 lg:px-6">
      <h2 class="text-text-main text-lg font-semibold">Category Progress Details</h2>
    </div>

    <div class="">
      <table class="w-full border-collapse text-left">
        <thead class="bg-code-bg/50">
          <tr class="border-border text-text-main/80 border-b text-sm">
            <th
              v-for="header in tableHeaders"
              :key="header.key"
              class="border-border/20 px-1.5 py-2.5 text-center font-medium not-last:border-r-2 first:text-left last:text-left xl:px-6 xl:py-4"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-border divide-y">
          <tr
            v-for="category in categories"
            :key="category.nameCategory"
            class="hover:bg-code-bg transition-colors"
          >
            <td class="text-text-main/50 px-1.5 py-2.5 text-sm xl:px-6 xl:py-4">
              {{ category.nameCategory }}
            </td>
            <td class="px-1.5 py-2.5 xl:px-6 xl:py-4">
              <div
                class="mx-auto flex w-fit items-center gap-2 rounded-full border-2 px-2 py-1 font-mono text-xs"
                :style="{
                  backgroundColor: `${category.colorCategory}15`,
                  borderColor: `${category.colorCategory}30`,
                }"
              >
                <span
                  class="h-2 w-2 rounded-full"
                  :style="{ backgroundColor: category.colorCategory }"
                ></span>
                <span :style="{ color: `${category.colorCategory}95` }">{{
                  category.colorCategory
                }}</span>
              </div>
            </td>
            <td class="text-text-main/50 px-1.5 py-2.5 text-center text-sm xl:px-6 xl:py-4">
              {{ category.totalNotes }}
            </td>
            <td class="text-text-main/50 px-1.5 py-2.5 text-center text-sm xl:px-6 xl:py-4">
              {{ category.completed }}
            </td>
            <td class="px-1.5 py-2.5 xl:px-6 xl:py-4">
              <div class="flex min-w-50 items-center gap-4">
                <div
                  class="relative h-2.5 w-full overflow-hidden rounded-full"
                  :style="{ background: `${category.colorCategory}30` }"
                >
                  <div
                    class="absolute top-0 left-0 h-full transition-all duration-500"
                    :style="{
                      width: `${calculatePercentage(category.completed, category.totalNotes)}%`,
                      backgroundColor: category.colorCategory,
                    }"
                  ></div>
                </div>
                <div
                  class="text-text-main/50 flex items-center gap-2 text-xs font-medium whitespace-nowrap"
                >
                  <span>{{ category.completed }}/{{ category.totalNotes }}</span>
                  <span class="w-8 text-right"
                    >{{ calculatePercentage(category.completed, category.totalNotes) }}%</span
                  >
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

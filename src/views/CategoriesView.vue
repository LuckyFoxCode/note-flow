<script setup lang="ts">
import CategoryItem from '@/components/CategoryItem.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useCategoryStore, useUiStore } from '@/store';

const categoriesStore = useCategoryStore();
const uiStore = useUiStore();
</script>

<template>
  <section class="flex h-screen flex-col gap-1">
    <TheHeader>
      <span>Categories Page</span>
    </TheHeader>
    <div>
      <button
        class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
        @click="uiStore.openOverlay('category')"
      >
        add category
      </button>
    </div>
    <ul
      v-if="categoriesStore.categories.length"
      class="grid min-h-0 flex-1 grid-cols-1 content-start gap-2 overflow-y-auto p-1 md:grid-cols-2 md:px-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:gap-4"
    >
      <CategoryItem
        v-for="category in categoriesStore.categories"
        :key="category.id"
        :category="category"
      />
    </ul>
    <span v-else>Empty categories</span>
  </section>
</template>

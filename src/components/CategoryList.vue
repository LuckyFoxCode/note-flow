<script setup lang="ts">
import { useCategoryStore } from '@/store';
import CategoryItem from './CategoryItem.vue';

const categoriesStore = useCategoryStore();
</script>

<template>
  <TransitionGroup
    name="list"
    tag="ul"
    class="grid min-h-0 flex-1 grid-cols-1 content-start gap-2 overflow-y-auto p-1 md:grid-cols-2 md:px-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:gap-4"
  >
    <template v-if="categoriesStore.categories.length">
      <CategoryItem
        v-for="category in categoriesStore.categories"
        :key="category.id"
        :category="category"
      />
    </template>
    <span v-else>Empty categories</span>
  </TransitionGroup>
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

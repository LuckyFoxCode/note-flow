<script setup lang="ts">
import type { State } from '@/App.vue';
import TheHeader from '@/components/TheHeader.vue';
import { inject } from 'vue';

const openOverlay = inject<() => void>('openOverlay');
const state = inject<State>('state');
</script>

<template>
  <section class="flex flex-col gap-1">
    <TheHeader>
      <span>Notes Page</span>
    </TheHeader>
    <button
      class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
      @click="openOverlay"
    >
      add category
    </button>
    <ul
      v-if="state?.categories.length"
      class="grid grid-cols-1 gap-1 px-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:gap-4"
    >
      <li
        v-for="category in state?.categories"
        :key="category.id"
      >
        <router-link
          :to="`/categories/${category.slug}`"
          class="focus-within:border-accent border-border shadow-border category-link flex w-full flex-col rounded-lg border-2 px-2 py-2 shadow transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-lg md:p-4"
          :style="{ '--category-color': category.categoryColor }"
        >
          <div class="mb-10 flex w-full items-start justify-between">
            <span class="mr-5 text-lg">{{ category.name }}</span>
            <div
              class="flex size-15 items-center justify-center rounded-full border-4"
              :style="{ borderColor: category.categoryColor }"
            >
              <span>0%</span>
            </div>
          </div>
          <div class="flex w-full justify-end">
            <span class="">21.04.26</span>
          </div>
        </router-link>
      </li>
    </ul>
    <span v-else>Empty categories</span>
  </section>
</template>

<style scoped>
.category-link:hover {
  box-shadow: 0 5px 8px -3px var(--category-color);
}
</style>

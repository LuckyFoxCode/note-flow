<script setup lang="ts">
import type { State } from '@/App.vue';
import { IconCircle } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { inject, ref } from 'vue';

const openOverlay = inject<() => void>('openOverlay');
const state = inject<State>('state');

const formatDate = (date: Date) => {
  const today = new Date();

  const isToday =
    date.getDay() === today.getDay() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return 'Today';

  return new Intl.DateTimeFormat('en-US').format(date);
};
const percentageCount = ref(0);

const onClickCount = () => {
  percentageCount.value = percentageCount.value + 5;
};
</script>

<template>
  <section class="flex flex-col gap-1">
    <TheHeader>
      <span>Notes Page</span>
    </TheHeader>
    <div>
      <button
        class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
        @click="openOverlay"
      >
        add category
      </button>
      <button
        class="border"
        @click="onClickCount"
      >
        Click {{ percentageCount }}
      </button>
    </div>
    <ul
      v-if="state?.categories.length"
      class="grid grid-cols-1 gap-1 px-1 md:grid-cols-2 md:gap-2 md:px-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:gap-4"
    >
      <li
        v-for="category in state?.categories"
        :key="category.id"
      >
        <router-link
          :to="`/categories/${category.slug}`"
          class="focus-within:border-accent border-border shadow-border category-link flex w-full flex-col rounded-lg border-2 px-2 py-2 shadow transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-lg md:p-1"
          :style="{ '--category-color': category.categoryColor }"
        >
          <div class="mb-10 flex w-full items-center justify-between">
            <h3 class="mr-5 text-sm md:text-base 2xl:text-lg">{{ category.name }}</h3>
            <IconCircle
              :percentage="percentageCount"
              :color="category.categoryColor"
            />
          </div>
          <div class="text-text-secondary flex w-full justify-end text-xs md:text-sm 2xl:text-base">
            <span>{{ formatDate(category.createdAt) }}</span>
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

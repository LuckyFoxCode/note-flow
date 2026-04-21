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
      class="flex flex-wrap items-center gap-1.5"
    >
      <li
        v-for="category in state?.categories"
        :key="category.id"
      >
        <router-link
          :to="`/categories/${category.slug}`"
          class="hover:border-accent-lime focus-within:border-accent border-border flex w-fit items-center rounded-lg border-2 px-2 py-1 transition-colors duration-200 outline-none"
        >
          <div class="mr-1 size-3 rounded-full bg-lime-500" />
          <span class="mr-5 text-lg">{{ category.name }}</span>
          <span class="font-medium text-rose-500">{{ category.noteCount }}</span>
        </router-link>
      </li>
    </ul>
    <span v-else>Empty categories</span>
  </section>
</template>

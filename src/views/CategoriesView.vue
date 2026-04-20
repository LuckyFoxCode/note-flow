<script setup lang="ts">
import type { State } from '@/App.vue';
import { inject } from 'vue';

const openOverlay = inject<() => void>('openOverlay');
const state = inject<State>('state');
</script>

<template>
  <section class="flex flex-col gap-1">
    <span>Notes Page</span>
    <button
      class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
      @click="openOverlay"
    >
      add category
    </button>
    <ul>
      <li
        v-for="category in state?.categories"
        :key="category.id"
      >
        <router-link :to="`/categories/${category.slug}`">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </section>
</template>

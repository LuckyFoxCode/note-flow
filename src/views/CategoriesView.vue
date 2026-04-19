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
      class="rounded-lg border-2 bg-slate-800 p-2 text-white"
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

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { useDateTime } from '@/composables';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const { currentTime } = useDateTime();
</script>

<template>
  <section class="flex h-dvh flex-col">
    <TheHeader>
      <span>Home page</span>
    </TheHeader>
    <div class="flex flex-1 flex-col p-2">
      <h1 class="w-fit text-2xl">NoteFlow Dashboard</h1>
      <div
        class="border-border/20 bg-border/10 shadow-border/30 m-auto rounded-lg border-2 p-3 shadow-lg"
      >
        <div
          class="border-accent-lime/30 text-text-secondary flex flex-col items-center gap-y-2 border-b-2 pb-4"
        >
          <span class="text-2xl capitalize md:text-4xl">
            Hello,
            <span class="text-accent-lime">{{ authStore.currentUser?.username }}</span>
            !
          </span>
          <span class="text-xl md:text-3xl">Keep your notes flowing.</span>
          <span class="text-text-secondary/30 md:text-xl">{{ currentTime }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

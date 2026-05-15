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
      <h1 class="text-2xl">NoteFlow Dashboard</h1>
      <div class="m-auto">
        <div
          class="border-border/30 text-text-secondary flex flex-col items-center gap-y-2 border-b-2 pb-4"
        >
          <span class="capitalize">Hello, {{ authStore.currentUser?.username }}!</span>
          <span>Keep your notes flowing.</span>
          <span class="text-text-secondary/50">{{ currentTime }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

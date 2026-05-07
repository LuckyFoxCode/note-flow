<script setup lang="ts">
import { useUiStore } from '@/store';

const uiStore = useUiStore();
</script>

<template>
  <label
    for="pinned"
    class="border-border text-text-secondary focus-within:border-accent hover:border-accent-lime relative flex h-full cursor-pointer items-center rounded-lg border-2 px-2 transition-colors duration-200"
  >
    <span class="mr-2 select-none">Pinned:</span>
    <input
      id="pinned"
      v-model="uiStore.isPinned"
      name="pinned"
      type="checkbox"
      class="peer sr-only"
    />
    <div
      class="border-border peer-checked:bg-accent size-4 rounded-sm border-2 bg-transparent transition-colors duration-200 peer-checked:border-transparent"
    />
  </label>
</template>

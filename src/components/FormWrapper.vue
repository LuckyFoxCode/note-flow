<script setup lang="ts">
import { IconClosed } from '@/assets/icons';
import { useUiStore } from '@/store';

defineProps<{ title: string }>();

const uiStore = useUiStore();
</script>

<template>
  <div
    class="bg-surface border-border text-text-main mx-2 flex w-full flex-col rounded-lg border px-2 py-3 shadow-lg md:mx-0 md:w-100"
  >
    <div class="mb-3 flex items-center gap-x-2">
      <div class="bg-accent/50 flex size-6 animate-pulse items-center justify-center rounded-full">
        <div class="bg-accent size-3 rounded-full" />
      </div>
      <h2 class="flex flex-1 text-center text-2xl">{{ title }}</h2>
      <button
        type="button"
        class="group outline-none"
        @click="uiStore.closeOverlay"
      >
        <IconClosed
          class="hover:text-accent-lime group-focus-within:text-accent size-8 cursor-pointer transition-colors duration-200"
        />
      </button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.pulse-scale {
  animation: pulse-scale 1s ease-in-out infinite;
}
</style>

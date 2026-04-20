<script setup lang="ts">
import { IconFox } from '@/assets/icons';

const { compact } = defineProps<{ compact: boolean }>();
</script>

<template>
  <div class="border-border w-full border-b">
    <router-link
      to="/"
      class="hover:text-accent-lime focus-within:border-accent flex items-center justify-center gap-x-1 rounded-lg border-2 border-transparent py-2 transition-colors duration-200 outline-none"
    >
      <IconFox class="size-6" />
      <span v-if="compact">LuckyFoxCode</span>
    </router-link>
  </div>
</template>

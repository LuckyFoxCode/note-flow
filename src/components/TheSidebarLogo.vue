<script setup lang="ts">
import { IconFox } from '@/assets/icons';

const { compact } = defineProps<{ compact: boolean }>();
</script>

<template>
  <div class="border-border w-full border-b">
    <router-link
      to="/"
      class="hover:text-accent focus-within: flex items-center justify-center gap-x-1 rounded-lg border border-transparent py-2 transition-colors outline-none focus-within:border-blue-500"
    >
      <IconFox class="size-6" />
      <span v-if="compact">LuckyFoxCode</span>
    </router-link>
  </div>
</template>

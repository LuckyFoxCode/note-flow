<script setup lang="ts">
import { IconFox } from '@/assets/icons';

const { isOpenSidebar } = defineProps<{ isOpenSidebar: boolean }>();
</script>

<template>
  <a
    href="#"
    class="hover:text-accent border-border flex w-full items-center justify-center gap-x-1 border-b py-2 transition"
  >
    <IconFox class="size-6" />
    <span v-if="isOpenSidebar">LuckyFoxCode</span>
  </a>
</template>

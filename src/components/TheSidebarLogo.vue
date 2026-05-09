<script setup lang="ts">
import { IconLogo } from '@/assets/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { compact } = defineProps<{ compact: boolean }>();

const route = useRoute();
const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <div class="border-border w-full border-b">
    <component
      :is="isHomePage ? 'div' : 'router-link'"
      to="/"
      :class="[
        'flex items-center gap-x-1 rounded-lg border-2 border-transparent px-1.5 py-2 transition-colors duration-200 outline-none',
        { 'cursor-default': isHomePage, 'focus:border-accent hover:text-accent-lime': !isHomePage },
      ]"
    >
      <IconLogo class="size-6 shrink-0" />
      <span v-if="compact">NoteFlow</span>
    </component>
  </div>
</template>

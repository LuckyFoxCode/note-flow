<script setup lang="ts">
import { IconFilter } from '@/assets/icons';

const model = defineModel<string>();
</script>

<template>
  <div
    class="border-border focus-within:border-accent hover:border-accent-lime text-text-secondary relative h-full w-fit cursor-pointer rounded-lg border-2 transition-colors duration-200"
  >
    <IconFilter class="pointer-events-none absolute top-1/2 right-2 flex size-4 -translate-y-1/2" />
    <select
      v-model="model"
      class="h-full appearance-none pr-7 pl-2 capitalize outline-none"
    >
      <slot />
    </select>
  </div>
</template>

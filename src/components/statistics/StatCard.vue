<script setup lang="ts">
import { type Component } from 'vue';

defineProps<{
  title: string;
  description: string | number;
  icon?: Component;
  color?: string;
}>();
</script>

<template>
  <div
    class="border-border/30 bg-code-bg/50 shadow-code-bg flex items-center justify-between gap-x-3 rounded-lg border-2 p-2 shadow-md md:p-3 lg:p-5"
  >
    <div
      class="flex w-full items-center gap-x-2"
      :style="color ? { '--card-color': `var(--color-${color})` } : {}"
    >
      <div
        v-if="icon"
        class="flex size-12 items-center justify-center rounded-lg bg-(--card-color)/10 p-3 text-(--card-color)/50"
      >
        <component
          :is="icon"
          class="size-10"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-text-secondary text-sm capitalize">{{ title }}</span>
        <span class="text-text-main text-lg font-medium">{{ description }}</span>
      </div>
    </div>
    <slot />
  </div>
</template>

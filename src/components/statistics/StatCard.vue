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
      :style="color ? { '--card-color': color } : {}"
    >
      <div
        v-if="icon"
        class="flex size-12 items-center justify-center rounded-lg p-3"
        :style="
          color
            ? {
                backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
                color: `color-mix(in srgb, ${color} 50%, transparent)`,
              }
            : {}
        "
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

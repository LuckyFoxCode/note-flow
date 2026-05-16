<script setup lang="ts">
defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div
    class="bg-code-bg/20 border-border/30 flex flex-col items-center gap-y-3 rounded-lg border-2 p-3"
  >
    <span class="flex items-center gap-x-3 text-2xl">
      <slot name="icon" />
      {{ value }}
    </span>
    <span class="text-text-secondary/40 text-sm capitalize">{{ title }}</span>
  </div>
</template>

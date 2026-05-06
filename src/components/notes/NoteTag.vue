<script setup lang="ts">
import type { Note } from '@/types';

const props = defineProps<{
  note: Note;
  tag: string;
}>();
</script>

<template>
  <li
    class="border-border rounded-lg border px-1.5 py-1 text-xs"
    :style="{
      color: `${props.note.categoryColor}80`,
      borderColor: `${props.note.categoryColor}33`,
    }"
  >
    {{ props.tag }}
  </li>
</template>

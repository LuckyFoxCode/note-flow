<script setup lang="ts">
import { IconPen } from '@/assets/icons';
import { PRIORITY_CONFIG } from '@/consts';
import type { Note } from '@/types';
import NoteActions from './NoteActions.vue';
import NoteTag from './NoteTag.vue';

const props = defineProps<{
  note: Note;
  getDayLabel: (dateStr: string) => string;
}>();

const isEditedNote = (note: Note) => {
  if (!note.updatedAt || !note.createdAt) return false;

  return new Date(note.updatedAt).getTime() > new Date(note.createdAt).getTime();
};
</script>

<template>
  <li class="border-border bg-code-bg/30 flex flex-col gap-y-5 rounded-lg border p-2">
    <div class="flex items-center gap-x-1.5">
      <h4 class="text-text-main flex-1">{{ props.note.title }}</h4>
      <NoteActions :note="props.note" />
    </div>
    <div class="text-text-secondary flex-1 text-sm">{{ props.note.content }}</div>
    <div class="flex flex-col items-end gap-y-2">
      <div
        class="w-fit rounded-lg px-1.5 py-1 text-xs capitalize"
        :style="{
          color: PRIORITY_CONFIG[props.note.priority].color,
          borderColor: PRIORITY_CONFIG[props.note.priority].color,
          backgroundColor: `${PRIORITY_CONFIG[props.note.priority].color}20`,
        }"
      >
        {{ props.note.priority }}
      </div>
      <div class="flex w-full gap-x-1">
        <span
          v-if="isEditedNote(props.note)"
          class="text-text-secondary/30 flex w-fit items-center text-xs"
        >
          <IconPen class="mr-0.5 size-3" />
          {{ getDayLabel(props.note.updatedAt) }}
        </span>
        <ul class="flex w-full items-center justify-end gap-x-1">
          <NoteTag
            v-for="tag in props.note.tags"
            :key="tag"
            :tag="tag"
            :note="note"
          />
        </ul>
      </div>
    </div>
  </li>
</template>

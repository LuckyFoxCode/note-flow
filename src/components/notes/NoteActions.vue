<script setup lang="ts">
import { IconArchive, IconChecked, IconPen, IconPin } from '@/assets/icons';
import { useCategoryStore, useUiStore } from '@/store';
import type { Note } from '@/types';
import { useRoute } from 'vue-router';

const props = defineProps<{
  note: Note;
}>();

const route = useRoute();
const uiStore = useUiStore();
const categoriesStore = useCategoryStore();
</script>

<template>
  <div class="flex items-center gap-x-1">
    <IconPen
      v-if="route.name === 'Category'"
      class="hover:text-accent-lime text-text-secondary/70 size-5 cursor-pointer transition-colors duration-200"
      @click="uiStore.openOverlay('note', props.note)"
    />
    <IconArchive
      :class="[
        'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
        props.note.archived ? 'text-[#ff9500]' : 'text-text-secondary/70',
      ]"
      @click="categoriesStore.toggleNoteField(props.note.categoryId, props.note.id, 'archived')"
    />
    <IconChecked
      :class="[
        'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
        props.note.completed ? 'text-accent-lime' : 'text-text-secondary/70',
      ]"
      @click="categoriesStore.toggleNoteField(props.note.categoryId, props.note.id, 'completed')"
    />
    <IconPin
      :class="[
        'hover:text-accent-lime size-5 cursor-pointer transition-colors duration-200',
        props.note.pinned ? 'text-error' : 'text-text-secondary/30',
      ]"
      @click="categoriesStore.toggleNoteField(props.note.categoryId, props.note.id, 'pinned')"
    />
  </div>
</template>

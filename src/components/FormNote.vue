<script setup lang="ts">
import { PRIORITY_CONFIG } from '@/consts';
import { useCategoryStore, useUiStore } from '@/store';
import { Priority, type Category, type Note } from '@/types';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import FormWrapper from './FormWrapper.vue';

const route = useRoute();
const categoriesStore = useCategoryStore();
const uiStore = useUiStore();

const inputRef = ref<HTMLInputElement | null>(null);
const noteData = reactive({ title: '', content: '', tags: '' });

const selectedPriority = ref<Priority>(Priority.Easy);

const priorityOptions = Object.entries(PRIORITY_CONFIG).map(([value, config]) => ({
  value: value as Priority,
  ...config,
}));

const currentPriority = computed(() => selectedPriority.value);

const currentSlug = route.params.slug;

const currentCategory: Category = categoriesStore.categories.find(
  (category) => category.slug === currentSlug,
) as Category;

const isValidForm = computed(() => {
  const hasTitle = noteData.title.trim().length > 0;
  const hasContent = noteData.content.trim().length > 0;
  const hasTags = noteData.tags.trim().length > 0;

  return hasTitle && hasContent && hasTags;
});

const isEditMode = computed(() => !!uiStore.editingNote);

const fillForm = (note: Note | null) => {
  if (note) {
    noteData.title = note.title;
    noteData.content = note.content;
    noteData.tags = note.tags.join(', ');
    selectedPriority.value = note.priority;
  } else {
    noteData.title = '';
    noteData.content = '';
    noteData.tags = '';
    selectedPriority.value = Priority.Easy;
  }
};

const onSubmit = () => {
  const tagsArray = noteData.tags
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t !== '');

  if (isEditMode.value && uiStore.editingNote) {
    categoriesStore.updateNote(uiStore.editingNote.categoryId, uiStore.editingNote.id, {
      title: noteData.title,
      content: noteData.content,
      tags: tagsArray,
      priority: selectedPriority.value,
      updatedAt: new Date().toISOString(),
    });
  } else {
    const newNote: Note = {
      id: crypto.randomUUID(),
      tags: tagsArray,
      categoryId: currentCategory.id,
      categoryColor: currentCategory.categoryColor,
      completed: false,
      content: noteData.content,
      pinned: false,
      archived: false,
      title: noteData.title,
      priority: currentPriority.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    categoriesStore.addNote(currentSlug as string, newNote);
  }

  noteData.title = '';
  noteData.content = '';
  noteData.tags = '';

  uiStore.closeOverlay();
};

onMounted(() => {
  inputRef.value?.focus();
});

watch(
  () => uiStore.editingNote,
  (newNote) => {
    fillForm(newNote);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <FormWrapper title="Form Note">
    <form
      class="flex w-full flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <BaseInput
        ref="inputRef"
        v-model="noteData.title"
        type="text"
        maxlength="25"
        placeholder="New note..."
      />
      <BaseInput
        v-model="noteData.content"
        type="text"
        maxlength="75"
        placeholder="Description..."
      />
      <BaseInput
        v-model="noteData.tags"
        type="text"
        placeholder="Tag..."
      />
      <select
        v-model="selectedPriority"
        class="border-border text-text-secondary focus-within:border-accent appearance-none rounded-lg border-2 px-3 py-1.5 transition-colors outline-none"
      >
        <option
          v-for="opt in priorityOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <BaseButton
        title="submit"
        type="submit"
        class="text-text-secondary"
        :disabled="!isValidForm"
      />
    </form>
  </FormWrapper>
</template>

<script setup lang="ts">
import type { State } from '@/App.vue';
import { PRIORITY_CONFIG } from '@/consts';
import { Priority, type Category, type Note } from '@/types';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import FormWrapper from './FormWrapper.vue';

const emit = defineEmits<{
  'add-note': [categorySlug: string, note: Note];
}>();

const route = useRoute();
const state = inject<State>('state');

const inputRef = ref<HTMLInputElement | null>(null);
const noteData = reactive({ title: '', content: '', tag: '' });

const selectedPriority = ref<Priority>(Priority.Easy);

const priorityOptions = Object.entries(PRIORITY_CONFIG).map(([value, config]) => ({
  value: value as Priority,
  ...config,
}));

const currentPriority = computed(() => selectedPriority.value);

const currentSlug = route.params.slug;

const currentCategory: Category = state?.categories.find(
  (category) => category.slug === currentSlug,
) as Category;

const isValidForm = computed(() => {
  const hasTitle = noteData.title.trim().length > 0;
  const hasContent = noteData.content.trim().length > 0;
  const hasTags = noteData.tag.trim().length > 0;

  return hasTitle && hasContent && hasTags;
});

const onSubmit = () => {
  const tagsArray = noteData.tag
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t !== '');

  const newNote: Note = {
    id: crypto.randomUUID(),
    tag: tagsArray,
    categoryId: currentCategory.id,
    categoryColor: currentCategory.categoryColor,
    completed: false,
    content: noteData.content,
    pinned: false,
    title: noteData.title,
    priority: currentPriority.value,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  emit('add-note', currentSlug as string, newNote);

  noteData.title = '';
  noteData.content = '';
  noteData.tag = '';
};

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <FormWrapper title="Form Note">
    <form
      class="flex w-full flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      {{ currentPriority }}
      <input
        ref="inputRef"
        v-model="noteData.title"
        type="text"
        maxlength="25"
        placeholder="New note..."
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <input
        v-model="noteData.content"
        type="text"
        maxlength="75"
        placeholder="Description..."
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <input
        v-model="noteData.tag"
        type="text"
        placeholder="Tag..."
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <select
        v-model="selectedPriority"
        class="border-border text-text-secondary appearance-none rounded-lg border-2 px-3 py-1.5 outline-none"
      >
        <option
          v-for="opt in priorityOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <button
        :disabled="!isValidForm"
        type="submit"
        class="hover:border-accent-lime border-border text-text-secondary focus-within:border-accent cursor-pointer rounded-lg border-2 px-3 py-1.5 text-lg capitalize transition-colors duration-200 outline-none disabled:cursor-not-allowed"
      >
        submit
      </button>
    </form>
  </FormWrapper>
</template>

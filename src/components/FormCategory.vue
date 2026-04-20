<script setup lang="ts">
import type { Category } from '@/types';
import { slugify } from '@/utils';
import { ref } from 'vue';

const categoryValue = ref('');

const emit = defineEmits<{
  'add-category': [category: Category];
}>();

const onSubmit = () => {
  const slug = slugify(categoryValue.value);
  const newCategory: Category = {
    id: crypto.randomUUID(),
    name: categoryValue.value,
    slug,
    noteCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  emit('add-category', newCategory);
  categoryValue.value = '';
};
</script>

<template>
  <div
    class="bg-surface border-border text-text-main mx-2 flex w-full flex-col rounded-lg border px-2 py-3 shadow-lg md:mx-0 md:w-100"
  >
    <h2 class="mb-3 text-xl">Form category</h2>
    <form
      class="flex flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <input
        v-model.trim="categoryValue"
        type="text"
        placeholder="Add new category..."
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <button
        :disabled="categoryValue.length < 1"
        type="submit"
        class="hover:border-accent-lime border-border text-text-secondary focus-within:border-accent cursor-pointer rounded-lg border-2 px-3 py-1.5 text-lg capitalize transition-colors duration-200 outline-none disabled:cursor-not-allowed"
      >
        submit
      </button>
    </form>
  </div>
</template>

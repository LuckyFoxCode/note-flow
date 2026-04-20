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
    class="bg-bg-form border-border mx-2 flex w-full flex-col rounded-lg border px-2 py-3 shadow-md md:mx-0 md:w-100"
  >
    <h2 class="text-text mb-3 text-xl">Form category</h2>
    <form
      class="flex flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <input
        v-model.trim="categoryValue"
        type="text"
        placeholder="Add new category..."
        class="rounded-lg border border-slate-600 px-3 py-1.5 transition-colors duration-200 outline-none placeholder:text-slate-500 focus-within:border-blue-500"
      />
      <button
        :disabled="categoryValue.length < 1"
        type="submit"
        class="hover:border-accent cursor-pointer rounded-lg border border-slate-600 px-3 py-1.5 transition-colors duration-200 outline-none placeholder:text-slate-500 focus-within:border-blue-500 disabled:cursor-not-allowed"
      >
        submit
      </button>
    </form>
  </div>
</template>

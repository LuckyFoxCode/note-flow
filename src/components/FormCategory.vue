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
  <div class="bg-bg-form flex w-100 flex-col rounded-lg border-2 px-2 py-3">
    <h2 class="text-text text-xl">Form category</h2>
    <form
      class="flex flex-col gap-y-1"
      @submit.prevent="onSubmit"
    >
      <input
        v-model.trim="categoryValue"
        type="text"
        placeholder="Add new category..."
        class="border"
      />
      <button
        type="submit"
        class="border"
      >
        submit
      </button>
    </form>
  </div>
</template>

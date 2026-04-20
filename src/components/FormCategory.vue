<script setup lang="ts">
import type { Category } from '@/types';
import { slugify } from '@/utils';
import { onMounted, ref } from 'vue';
import FormWrapper from './FormWrapper.vue';

const categoryValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  'add-category': [category: Category];
}>();

const onSubmit = () => {
  if (!categoryValue.value.trim() || categoryValue.value.length > 25) return;

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

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <FormWrapper title="Form category">
    <form
      class="flex flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <input
        ref="inputRef"
        v-model.trim="categoryValue"
        type="text"
        maxlength="25"
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
  </FormWrapper>
</template>

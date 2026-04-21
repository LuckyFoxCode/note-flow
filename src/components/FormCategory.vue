<script setup lang="ts">
import type { Category } from '@/types';
import { slugify } from '@/utils';
import { onMounted, ref } from 'vue';
import FormWrapper from './FormWrapper.vue';

const categoryValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const selectedColor = ref('#3b82f6');
const radioColors = ref([
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#06b6d4',
  '#6366f1',
  '#84cc16',
  '#f97316',
]);

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
      <div class="flex items-center justify-between">
        <label
          v-for="color in radioColors"
          :key="color"
          class="relative cursor-pointer"
        >
          <input
            v-model="selectedColor"
            class="pointer-events-none absolute opacity-0"
            type="radio"
            :value="color"
            name="category-color"
          />
          <div
            class="flex size-6 items-center justify-center rounded-full"
            :style="{ backgroundColor: color }"
          >
            <div
              :class="[
                'size-4 rounded-full transition-colors duration-200',
                { 'bg-border': selectedColor === color },
              ]"
            />
          </div>
        </label>
      </div>
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

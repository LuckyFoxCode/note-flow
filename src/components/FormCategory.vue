<script setup lang="ts">
import { RADIO_COLORS } from '@/consts';
import { useCategoryStore, useUiStore } from '@/store';
import type { Category } from '@/types';
import { slugify } from '@/utils';
import { computed, onMounted, ref } from 'vue';
import FormWrapper from './FormWrapper.vue';

const categoriesStore = useCategoryStore();
const uiStore = useUiStore();

const categoryValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const selectedColor = ref('#3b82f6');

const onSubmit = () => {
  if (!categoryValue.value.trim() || categoryValue.value.length > 25) return;

  const slug = slugify(categoryValue.value);
  const currentColor = computed(() => selectedColor.value);

  const newCategory: Category = {
    id: crypto.randomUUID(),
    name: categoryValue.value,
    slug,
    noteCount: 0,
    categoryColor: currentColor.value,
    categoryNotes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  categoriesStore.addCategory(newCategory);
  categoryValue.value = '';
  uiStore.closeOverlay();
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
          v-for="color in RADIO_COLORS"
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

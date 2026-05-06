<script setup lang="ts">
import { RADIO_COLORS } from '@/consts';
import { useCategoryStore, useUiStore } from '@/store';
import type { Category } from '@/types';
import { slugify } from '@/utils';
import { onMounted, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import FormWrapper from './FormWrapper.vue';

const categoriesStore = useCategoryStore();
const uiStore = useUiStore();

const categoryValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const selectedColor = ref('#3b82f6');

const onSubmit = () => {
  if (!categoryValue.value.trim() || categoryValue.value.length > 25) return;

  const slug = slugify(categoryValue.value);

  const newCategory: Category = {
    id: crypto.randomUUID(),
    name: categoryValue.value,
    slug,
    noteCount: 0,
    categoryColor: selectedColor.value,
    categoryNotes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
      <BaseInput
        ref="inputRef"
        v-model="categoryValue"
        type="text"
        maxlength="25"
        placeholder="Add new category..."
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
      <BaseButton
        title="submit"
        type="submit"
        :disabled="categoryValue.length < 1"
      />
    </form>
  </FormWrapper>
</template>

import { MOCK_CATEGORIES } from '@/consts';
import type { Category, Note } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>(MOCK_CATEGORIES);

  function addCategory(category: Category) {
    categories.value.push(category);
  }

  function addNote(categorySlug: string, note: Note) {
    categories.value = categories.value.map((category) => {
      if (category.slug === categorySlug) {
        return {
          ...category,
          categoryNotes: [...category.categoryNotes, note],
        };
      }
      return category;
    });
  }

  return { categories, addCategory, addNote };
});

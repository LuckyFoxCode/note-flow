import { MOCK_CATEGORIES } from '@/consts';
import type { Category, Note } from '@/types';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore(
  'categories',
  () => {
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

    function togglePinnedNote(categoryId: string, noteId: string) {
      const category = categories.value.find((category) => category.id === categoryId);
      if (!category) return;

      const note = category.categoryNotes.find((note) => note.id === noteId);

      if (!note) return;
      note.pinned = !note.pinned;
    }

    return { categories, addCategory, addNote, togglePinnedNote };
  },
  {
    persist: {
      key: 'category-store',
      pick: ['categories'],
    },
  },
);

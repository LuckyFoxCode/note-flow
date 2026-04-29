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

    type NoteToggleFields = 'pinned' | 'completed' | 'archived';

    function findNote(categoryId: string, noteId: string): Note | undefined {
      const category = categories.value.find((category) => category.id === categoryId);
      return category?.categoryNotes.find((note) => note.id === noteId);
    }

    function toggleNoteField(categoryId: string, noteId: string, field: NoteToggleFields) {
      const note = findNote(categoryId, noteId);

      if (note) note[field] = !note[field];
    }

    return {
      categories,
      addCategory,
      addNote,
      toggleNoteField,
    };
  },
  {
    persist: {
      key: 'category-store',
      pick: ['categories'],
    },
  },
);

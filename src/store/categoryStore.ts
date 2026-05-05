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

    function removeCategory(categoryId: string) {
      return (categories.value = categories.value.filter((category) => category.id !== categoryId));
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

    function updateNote(categoryId: string, noteId: string, updateNote: Partial<Note>) {
      categories.value = categories.value.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            categoryNotes: category.categoryNotes.map((note) => {
              if (note.id === noteId) {
                return {
                  ...note,
                  ...updateNote,
                };
              }
              return note;
            }),
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
      removeCategory,
      updateNote,
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

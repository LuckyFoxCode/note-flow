import { MOCK_CATEGORIES } from '@/consts';
import type { Category, Note, SortCategoryOption, SortNoteOption } from '@/types';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCategoryStore = defineStore(
  'categories',
  () => {
    const categories = ref<Category[]>(MOCK_CATEGORIES);

    const categorySort = ref<SortCategoryOption>('newest');
    const noteSort = ref<SortNoteOption>('newest');

    const sortedCategories = computed(() => {
      const list = [...categories.value];

      switch (categorySort.value) {
        case 'newest':
          return list.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        case 'oldest':
          return list.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );
        case 'percentage':
          return list.sort((a, b) => {
            const getProgress = (category: Category) => {
              if (category.categoryNotes.length === 0) return 0;

              const completed = category.categoryNotes.filter((note) => note.completed).length;
              return (completed / category.categoryNotes.length) * 100;
            };
            return getProgress(b) - getProgress(a);
          });
        default:
          return list;
      }
    });

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
      noteSort,
      categorySort,
      categories,
      sortedCategories,
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
      pick: ['categories', 'categorySort', 'noteSort'],
    },
  },
);

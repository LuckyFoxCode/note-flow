import type { Note } from '@/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUiStore = defineStore(
  'ui',
  () => {
    type FormType = 'category' | 'note';
    type ThemeType = 'light' | 'dark';

    const theme = ref<ThemeType>('dark');
    const editingNote = ref<Note | null>(null);

    watch(
      theme,
      (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.style.backgroundColor = '';
      },
      { immediate: true },
    );

    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const isMobile = ref(mobileQuery.matches);
    const isCollapsed = ref(false);
    const isOpenOverlay = ref(false);
    const isActiveForm = ref<FormType>('category');
    const isPinned = ref(false);

    function toggleTheme() {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
    }

    function openOverlay(type: FormType, note: Note | null = null) {
      isActiveForm.value = type;
      editingNote.value = note;
      isOpenOverlay.value = true;
    }

    function closeOverlay() {
      isOpenOverlay.value = false;
      editingNote.value = null;
    }

    function toggleSidebar() {
      isCollapsed.value = !isCollapsed.value;
    }

    function handleMediaChange(event: MediaQueryListEvent | MediaQueryList) {
      isMobile.value = event.matches;
    }

    function initMediaWatcher() {
      mobileQuery.addEventListener('change', handleMediaChange);
    }
    return {
      theme,
      isMobile,
      isPinned,
      editingNote,
      isCollapsed,
      isActiveForm,
      isOpenOverlay,
      openOverlay,
      toggleTheme,
      closeOverlay,
      toggleSidebar,
      initMediaWatcher,
    };
  },
  {
    persist: {
      key: 'ui-store',
      pick: ['theme', 'isCollapsed', 'isPinned'],
    },
  },
);

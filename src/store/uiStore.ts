import type { Note } from '@/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

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

    const isToastVisible = ref(false);
    const toastMessage = ref('');
    const toastType = ref<ToastType>('success');
    const toastDuration = ref(3000);
    let timeoutId: number | null = null;

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

    function showToast(message: string, type: ToastType = 'success') {
      if (timeoutId) clearTimeout(timeoutId);

      toastMessage.value = message;
      toastType.value = type;
      isToastVisible.value = true;

      timeoutId = window.setTimeout(() => {
        isToastVisible.value = false;
      }, toastDuration.value);
    }

    return {
      theme,
      isMobile,
      isPinned,
      toastType,
      editingNote,
      isCollapsed,
      toastMessage,
      isActiveForm,
      isOpenOverlay,
      toastDuration,
      isToastVisible,
      showToast,
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

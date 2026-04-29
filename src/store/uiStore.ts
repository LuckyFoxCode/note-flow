import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUiStore = defineStore(
  'ui',
  () => {
    type FormType = 'category' | 'note';
    type ThemeType = 'light' | 'dark';

    const theme = ref<ThemeType>('dark');

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

    function toggleTheme() {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
    }

    function openOverlay(type: FormType) {
      isActiveForm.value = type;
      isOpenOverlay.value = true;
    }

    function closeOverlay() {
      isOpenOverlay.value = false;
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
      pick: ['theme', 'isCollapsed'],
    },
  },
);

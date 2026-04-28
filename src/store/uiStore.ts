import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  type FormType = 'category' | 'note';

  const mobileQuery = window.matchMedia('(max-width: 639px)');
  const isMobile = ref(mobileQuery.matches);
  const isCollapsed = ref(false);
  const isOpenOverlay = ref(false);
  const isActiveForm = ref<FormType>('category');

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
    isMobile,
    isCollapsed,
    isActiveForm,
    isOpenOverlay,
    openOverlay,
    closeOverlay,
    toggleSidebar,
    initMediaWatcher,
  };
});

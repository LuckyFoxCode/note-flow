<script setup lang="ts">
import { onMounted, provide, reactive, ref } from 'vue';
import FormCategory from './components/FormCategory.vue';
import FormNote from './components/FormNote.vue';
import TheOverlay from './components/TheOverlay.vue';
import TheSidebar from './components/TheSidebar.vue';
import { MOCK_CATEGORIES } from './consts';
import type { Category, Note } from './types';

export interface State {
  categories: Category[];
}

type FormType = 'category' | 'note';

const mobileMediaQuery = window.matchMedia('(max-width: 639px)');
const isMobile = ref(mobileMediaQuery.matches);
const isCollapsed = ref(false);
const isOpenOverlay = ref(false);
const isActiveForm = ref<FormType>('category');

const state = reactive<State>({
  categories: MOCK_CATEGORIES,
});

const handleMediaChange = (event: MediaQueryListEvent) => {
  isMobile.value = event.matches;
};

const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);

const addCategory = (category: Category) => {
  state.categories.push(category);
  isOpenOverlay.value = false;
};

const addNote = (categorySlug: string, note: Note) => {
  state.categories = state.categories.map((category) => {
    if (category.slug === categorySlug) {
      return {
        ...category,
        categoryNotes: [...category.categoryNotes, note],
      };
    }
    return category;
  });

  isOpenOverlay.value = false;
};

const openOverlay = (type: FormType) => {
  isOpenOverlay.value = true;
  isActiveForm.value = type;
};

const closedOverlay = () => {
  isOpenOverlay.value = false;
};

provide('openOverlay', openOverlay);
provide('closedOverlay', closedOverlay);
provide('state', state);

onMounted(() => mobileMediaQuery.addEventListener('change', handleMediaChange));
</script>

<template>
  <div class="relative flex h-screen">
    <div
      v-if="isCollapsed && isMobile"
      class="bg-surface/70 fixed inset-0 top-0 left-0 z-40 h-full w-full backdrop-blur-xs md:hidden"
      @click="isCollapsed = false"
    />
    <TheSidebar
      :is-collapsed="isCollapsed"
      @toggle-sidebar="toggleSidebar"
    />
    <main class="ml-10 w-full md:ml-0">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheOverlay v-if="isOpenOverlay">
      <FormCategory
        v-if="isActiveForm === 'category'"
        @add-category="addCategory"
      />
      <FormNote
        v-else
        @add-note="addNote"
      />
    </TheOverlay>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<!--
filter state
take categoryID
push newNote
-->

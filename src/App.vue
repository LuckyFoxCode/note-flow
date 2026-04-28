<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import FormCategory from './components/FormCategory.vue';
import FormNote from './components/FormNote.vue';
import TheOverlay from './components/TheOverlay.vue';
import TheSidebar from './components/TheSidebar.vue';
import { useUiStore } from './store';

const uiStore = useUiStore();
const { isCollapsed, isMobile } = storeToRefs(uiStore);

onMounted(() => uiStore.initMediaWatcher);
</script>

<template>
  <div class="relative flex h-screen">
    <div
      v-if="isCollapsed && isMobile"
      class="bg-surface/70 fixed inset-0 top-0 left-0 z-40 h-full w-full backdrop-blur-xs md:hidden"
      @click="isCollapsed = false"
    />
    <TheSidebar />
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
    <TheOverlay v-if="uiStore.isOpenOverlay">
      <FormCategory v-if="uiStore.isActiveForm === 'category'" />
      <FormNote v-else />
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

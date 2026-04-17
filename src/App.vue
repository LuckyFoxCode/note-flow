<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import TheSidebar from './components/TheSidebar.vue';

const isMobile = ref(false);
const isCollapsed = ref(false);
const mediaQuery = window.matchMedia('(max-width: 639px)');

const handleMediaChange = (event: MediaQueryListEvent) => {
  isMobile.value = event.matches;
};

const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);

onMounted(() => {
  isMobile.value = mediaQuery.matches;
  mediaQuery.addEventListener('change', handleMediaChange);
});

onUnmounted(() => {
  mediaQuery.removeEventListener('change', handleMediaChange);
});
</script>

<template>
  <div class="relative flex h-screen">
    <div
      v-if="isCollapsed && isMobile"
      class="fixed inset-0 top-0 left-0 z-40 h-full w-full bg-slate-950/80 md:hidden"
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

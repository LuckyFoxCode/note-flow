<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TheOverlay from './components/TheOverlay.vue';
import TheSidebar from './components/TheSidebar.vue';

const mobileMediaQuery = window.matchMedia('(max-width: 639px)');
const isMobile = ref(mobileMediaQuery.matches);
const isCollapsed = ref(false);
const isOpenOverlay = ref(true);

const handleMediaChange = (event: MediaQueryListEvent) => {
  isMobile.value = event.matches;
};

const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);

onMounted(() => mobileMediaQuery.addEventListener('change', handleMediaChange));
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
    <TheOverlay v-if="isOpenOverlay"> FormCategory </TheOverlay>
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

<script setup lang="ts">
import { ref } from 'vue';
import TheSidebar from './components/TheSidebar.vue';

const isMobileOpen = ref(true);
</script>

<template>
  <div class="relative flex h-screen">
    <div
      v-if="isMobileOpen"
      class="fixed inset-0 top-0 left-0 z-40 h-full w-full bg-slate-950/80 md:hidden"
      @click="isMobileOpen = false"
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

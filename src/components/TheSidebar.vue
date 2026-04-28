<script setup lang="ts">
import { IconBurger, IconMoon, IconSun } from '@/assets/icons';
import { useTheme } from '@/composables';
import { useUiStore } from '@/store';
import TheSidebarLogo from './TheSidebarLogo.vue';
import TheSidebarNav from './TheSidebarNav.vue';

const uiStore = useUiStore();
const { toggle, theme } = useTheme();
</script>

<template>
  <aside
    :class="[
      'border-border bg-bg fixed top-0 left-0 z-50 flex h-full flex-col items-center gap-y-4 border-r transition-[width,transform] duration-200',
      'md:relative md:translate-x-0 md:pb-1',
      uiStore.isCollapsed ? 'w-40 lg:w-60' : 'w-10',
    ]"
  >
    <TheSidebarLogo :compact="uiStore.isCollapsed" />
    <TheSidebarNav :compact="uiStore.isCollapsed" />
    <div class="border-border mt-auto flex w-full flex-col gap-y-1 border-t pt-2">
      <button
        class="sidebar-btn"
        @click="uiStore.toggleSidebar"
      >
        <IconBurger class="size-5 transition-transform duration-200 group-active:scale-90" />
      </button>
      <button
        class="sidebar-btn flex w-full cursor-pointer justify-center py-1"
        @click="toggle"
      >
        <transition
          name="fade-rotate"
          mode="out-in"
        >
          <component
            :is="theme === 'dark' ? IconMoon : IconSun"
            :key="theme"
            class="size-5"
          />
        </transition>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.fade-rotate-enter-active,
.fade-rotate-leave-active {
  transition: all 0.2s ease;
}

.fade-rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.fade-rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>

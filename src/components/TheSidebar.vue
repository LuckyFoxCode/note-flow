<script setup lang="ts">
import { IconBurger, IconMoon, IconSun } from '@/assets/icons';
import { useTheme } from '@/composables';
import TheSidebarLogo from './TheSidebarLogo.vue';
import TheSidebarNav from './TheSidebarNav.vue';

const { isCollapsed } = defineProps<{ isCollapsed: boolean }>();

const emit = defineEmits(['toggleSidebar']);

const { toggle, theme } = useTheme();
</script>

<template>
  <aside
    :class="[
      'border-border bg-bg fixed top-0 left-0 z-50 flex h-full flex-col items-center gap-y-4 border-r transition-[width,transform] duration-200',
      'md:relative md:translate-x-0 md:pb-1',
      isCollapsed ? 'w-40 lg:w-60' : 'w-10',
    ]"
  >
    <TheSidebarLogo :compact="isCollapsed" />
    <TheSidebarNav :compact="isCollapsed" />
    <div class="flex w-full flex-col gap-y-1">
      <button
        class="sidebar-btn flex w-full cursor-pointer justify-center py-1"
        @click="emit('toggleSidebar')"
      >
        <IconBurger class="size-5" />
      </button>
      <button
        class="sidebar-btn flex w-full cursor-pointer justify-center py-1"
        @click="toggle"
      >
        <component
          :is="theme === 'dark' ? IconMoon : IconSun"
          class="size-5"
        />
      </button>
    </div>
  </aside>
</template>

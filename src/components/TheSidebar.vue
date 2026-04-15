<script setup lang="ts">
import { IconBurger, IconMoon, IconSun } from '@/assets/icons';
import { useTheme } from '@/composables';
import { ref } from 'vue';
import TheSidebarLogo from './TheSidebarLogo.vue';
import TheSidebarNav from './TheSidebarNav.vue';

const { toggle, theme } = useTheme();

const isOpenSidebar = ref(true);

function toggleSidebar() {
  isOpenSidebar.value = !isOpenSidebar.value;
}
</script>

<template>
  <aside
    :class="isOpenSidebar ? 'w-60' : 'w-10'"
    class="border-border flex flex-col items-center gap-y-4 border-r transition-[width]"
  >
    <TheSidebarLogo :is-open-sidebar="isOpenSidebar" />
    <TheSidebarNav :is-open-sidebar="isOpenSidebar" />
    <div class="flex w-full flex-col gap-y-1">
      <button
        class="hover:border-accent hover:text-accent flex w-full cursor-pointer justify-center rounded-lg border-2 border-transparent py-1 transition"
        @click="toggle"
      >
        <component
          :is="theme === 'dark' ? IconMoon : IconSun"
          class="size-5"
        />
      </button>
      <button
        class="hover:border-accent hover:text-accent flex w-full cursor-pointer justify-center rounded-lg border-2 border-transparent py-1 transition"
        @click="toggleSidebar"
      >
        <IconBurger class="size-5" />
      </button>
    </div>
  </aside>
</template>

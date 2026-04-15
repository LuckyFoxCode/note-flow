<script setup lang="ts">
import TheSidebarLogo from './TheSidebarLogo.vue';
import TheSidebarNav from './TheSidebarNav.vue';
</script>

<template>
  <aside
    class="dark:border-border border-border flex w-full max-w-60 flex-col items-center gap-y-4 border-r"
  >
    <TheSidebarLogo />
    <TheSidebarNav />
  </aside>
</template>

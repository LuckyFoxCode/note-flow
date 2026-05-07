<script setup lang="ts">
import { IconLogout } from '@/assets/icons';
import { router } from '@/routers';

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push({ name: 'Auth' });
}
</script>

<template>
  <header class="border-border flex h-11.25 w-full items-center justify-between border-b px-2">
    <slot />
    <button
      type="button"
      aria-label="Logout"
      class="group focus:border-accent flex cursor-pointer items-center justify-center rounded-lg border-2 border-transparent p-1 transition-colors duration-200 outline-none"
      @click="logout"
    >
      <IconLogout
        class="text-text-secondary group-hover:text-accent-lime size-5 transition-colors duration-200"
      />
    </button>
  </header>
</template>

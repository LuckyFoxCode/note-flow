<script setup lang="ts">
import { IconLogout } from '@/assets/icons';
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';

const authStore = useAuthStore();
const uiStore = useUiStore();

function logout() {
  authStore.currentUser = null;
  localStorage.removeItem('token');
  uiStore.showToast('Logged out successfully. See you soon!', 'info');
  router.push({ name: 'SignIn' });
}
</script>

<template>
  <header class="border-border flex h-11.25 w-full items-center justify-between border-b px-2">
    <slot />
    <div class="flex items-center gap-x-2">
      <div
        class="avatar border-accent-lime/30 flex size-7 items-center justify-center overflow-hidden rounded-full border"
      >
        <img
          v-if="authStore.currentUser?.avatarUrl"
          :src="authStore.currentUser?.avatarUrl"
          alt="Avatar"
          class="size-full"
        />
        <span
          v-else
          class="text-sm capitalize"
          >{{ authStore.currentUser?.username.slice(0, 1) }}</span
        >
      </div>
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
    </div>
  </header>
</template>

<style scoped>
.avatar {
  box-shadow: 0px 0px 10px var(--color-border);
}
</style>

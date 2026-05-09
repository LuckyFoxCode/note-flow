<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import TheHeader from '@/components/TheHeader.vue';
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import type { User } from '@/types';

const authStore = useAuthStore();
const uiStore = useUiStore();
const currentUser = authStore.currentUser as User;

function removeUser(id: string) {
  authStore.remove(id);
  uiStore.showToast(`Your account has been deleted`, 'success');
  router.push({ name: 'SignUp' });
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <TheHeader>
      <span>Settings Page</span>
    </TheHeader>
    <BaseButton
      type="button"
      title="Delete account"
      class="w-fit"
      @click="removeUser(currentUser.id)"
    />
  </section>
</template>

<script setup lang="ts">
import { IconPen, IconUser } from '@/assets/icons';
import BaseButton from '@/components/BaseButton.vue';
import TheHeader from '@/components/TheHeader.vue';
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import type { User } from '@/types';
import { ref } from 'vue';

const authStore = useAuthStore();
const uiStore = useUiStore();

const currentUser = authStore.currentUser as User;
const isEdited = ref(false);
const inptRef = ref<HTMLInputElement | null>(null);

function removeUser(id: string) {
  authStore.remove(id);
  uiStore.showToast(`Your account has been deleted`, 'success');
  router.push({ name: 'SignUp' });
}
</script>

<template>
  <section class="relative flex h-dvh flex-col gap-2">
    <TheHeader>
      <span>Settings Page</span>
    </TheHeader>

    <span class="text-text-main/10 absolute top-1/2 left-1/2 -translate-1/2 text-[160px]"
      >Settings Page</span
    >

    <div
      class="border-border/30 shadow-border bg-bg/85 z-10 m-auto flex h-125 w-175 flex-col items-end gap-y-4 rounded-lg border-2 p-4 shadow-lg"
    >
      <h2 class="w-full text-2xl">Profile</h2>
      <div class="flex w-full flex-1 flex-col px-2 py-3">
        <div class="flex items-center gap-x-0.5">
          <IconUser class="size-5" />
          <input
            ref="inptRef"
            v-model="currentUser.username"
            type="text"
            :disabled="isEdited"
            class="text-text-secondary focus:border-accent rounded-md border-b-2 border-transparent px-1 text-lg capitalize transition-colors duration-200 outline-none"
          />

          <button
            class="focus:border-accent hover:border-accent-lime cursor-pointer rounded-lg border-2 border-transparent px-1 py-0.5 transition-colors duration-200 outline-none"
          >
            <IconPen class="text-border size-4" />
          </button>
        </div>
      </div>
      <BaseButton
        type="button"
        title="Delete account"
        class="w-fit"
        @click="removeUser(currentUser.id)"
      />
    </div>
  </section>
</template>

<style scoped>
input {
  field-sizing: content;
  width: auto;
  min-width: 20px;
}
</style>

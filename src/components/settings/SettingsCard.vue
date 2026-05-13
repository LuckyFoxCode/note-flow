<script setup lang="ts">
import { IconLetter, IconLock, IconUser } from '@/assets/icons';
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import { storeToRefs } from 'pinia';
import BaseButton from '../BaseButton.vue';
import EditableField from './EditableField.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();

const { currentUser } = storeToRefs(authStore);

const userFields = [
  { key: 'username', label: 'Username', icon: IconUser, type: 'text' },
  { key: 'email', label: 'Email', icon: IconLetter, type: 'email' },
  { key: 'password', label: 'Password', icon: IconLock, type: 'password' },
] as const;

function removeUser(id: string) {
  authStore.remove(id);
  uiStore.showToast(`Your account has been deleted`, 'success');
  router.push({ name: 'SignUp' });
}
</script>

<template>
  <div
    class="border-border/30 shadow-border bg-bg/85 z-10 m-auto flex h-125 w-175 flex-col items-end gap-y-4 rounded-lg border-2 p-4 shadow-lg"
  >
    <h2 class="w-full text-2xl">Profile</h2>
    <div
      v-if="currentUser"
      class="flex w-full flex-1 flex-col px-2 py-3"
    >
      <EditableField
        v-for="field in userFields"
        :key="field.key"
        v-model="currentUser[field.key]"
        :label-icon="field.icon"
        :type="field.type"
      />
    </div>
    <BaseButton
      v-if="currentUser"
      type="button"
      title="Delete account"
      class="w-fit"
      @click="removeUser(currentUser.id)"
    />
  </div>
</template>

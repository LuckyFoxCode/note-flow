<script setup lang="ts">
import { IconKey, IconLetter, IconUser } from '@/assets/icons';
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import BaseButton from '../BaseButton.vue';
import EditableField from './EditableField.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();

const { currentUser } = storeToRefs(authStore);

const fileRef = ref<HTMLInputElement | null>(null);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;

  const file = target.files?.[0];

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result as string;

      authStore.updateAvatar(base64String);
    };
  }
}

const userFields = [
  { key: 'username', label: 'Username', icon: IconUser, type: 'text' },
  { key: 'email', label: 'Email', icon: IconLetter, type: 'email' },
  { key: 'password', label: 'Password', icon: IconKey, type: 'password' },
] as const;

function removeUser(id: string) {
  authStore.remove(id);
  uiStore.showToast(`Your account has been deleted`, 'success');
  router.push({ name: 'SignUp' });
}
</script>

<template>
  <div
    class="border-border/30 shadow-border bg-bg/85 z-10 m-auto flex w-full flex-col items-end gap-y-4 rounded-lg border-2 p-4 shadow-lg md:w-150"
  >
    <h2 class="w-full text-2xl">Profile</h2>
    <div
      v-if="currentUser"
      class="flex w-full flex-1 flex-col gap-y-4 px-2 py-3"
    >
      <div>
        <img
          :src="currentUser.avatarUrl"
          alt="Avatar"
          class="size-32 rounded-full"
        />
      </div>
      <input
        ref="fileRef"
        type="file"
        accept="image/*"
        class="border-border/60 rounded-lg border-2"
        @change="handleFileChange"
      />
      <EditableField
        v-for="field in userFields"
        :key="field.key"
        v-model="currentUser[field.key]"
        :label-icon="field.icon"
        :type="field.type"
        :label="field.label"
      />
    </div>
    <BaseButton
      v-if="currentUser"
      type="button"
      title="Delete account"
      class="border-error/20 text-error/70 w-fit"
      @click="removeUser(currentUser.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { IconCamera, IconClosed, IconKey, IconLetter, IconUser } from '@/assets/icons';
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
    class="border-border/30 md:shadow-border bg-bg/85 z-10 m-auto flex w-full flex-col items-end gap-y-4 rounded-lg border-2 px-2 pb-2 shadow-lg md:w-150 md:gap-y-10 md:p-4"
  >
    <div
      v-if="currentUser"
      class="flex w-full flex-1 flex-col gap-y-4 pt-3"
    >
      <div class="border-border/50 flex justify-center border-b-2 pb-5">
        <div
          class="group border-border avatar relative flex size-32 items-center justify-center overflow-hidden rounded-full border-2"
        >
          <label
            for="file-input"
            class="border-border/30 focus-within:border-accent bg-bg absolute top-1/2 left-1/2 flex w-fit -translate-1/2 cursor-pointer rounded-lg border-2 p-3 opacity-0 transition-all duration-200 group-hover:opacity-100 focus-within:opacity-100"
          >
            <input
              id="file-input"
              ref="fileRef"
              type="file"
              accept="image/*"
              class="absolute -z-10 w-px opacity-0"
              @change="handleFileChange"
            />
            <IconCamera class="text-accent-lime size-6" />
          </label>
          <button
            v-if="currentUser.avatarUrl"
            class="hover:text-error focus:text-accent absolute top-5 right-2 -translate-y-1/2 cursor-pointer opacity-0 transition-all outline-none group-hover:opacity-100"
            @click="authStore.removeAvatar"
          >
            <IconClosed class="size-6" />
          </button>
          <img
            v-if="currentUser.avatarUrl"
            :src="currentUser.avatarUrl"
            alt="Avatar"
            class="h-full w-full object-cover"
          />
          <span
            v-else
            class="text-3xl capitalize"
          >
            {{ currentUser.username.slice(0, 1) }}</span
          >
        </div>
      </div>
      <h2 class="w-full md:text-xl">Account settings:</h2>

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
      class="border-error/20 text-error/70 w-fit text-sm"
      @click="removeUser(currentUser.id)"
    />
  </div>
</template>

<style scoped>
.avatar {
  box-shadow: 0px 0px 15px var(--color-border);
}
</style>

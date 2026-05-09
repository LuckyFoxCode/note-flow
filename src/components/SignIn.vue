<script setup lang="ts">
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import type { SignInData } from '@/types';
import { onMounted, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import FormWrapper from './FormWrapper.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();

const form = ref<SignInData>({ email: '', password: '' });
const inputRef = ref<HTMLInputElement | null>(null);

const onSubmit = () => {
  const userData = { ...form.value };

  const success = authStore.login(userData);

  if (success) {
    uiStore.showToast(`Great to see you again, ${authStore.currentUser?.username}!`, 'success');
    router.push({ name: 'Home' });
  } else {
    uiStore.showToast('Invalid email or password', 'error');
  }
};
onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <FormWrapper
    title="Sign In"
    description="Don't have an account?"
    link="Create"
    :to="{ name: 'SignUp' }"
  >
    <form
      class="flex w-full flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <BaseInput
        ref="inputRef"
        v-model="form.email"
        type="email"
        placeholder="Email"
      />
      <BaseInput
        v-model="form.password"
        type="password"
        minlength="4"
        placeholder="Password"
      />
      <BaseButton
        title="submit"
        type="submit"
      />
    </form>
  </FormWrapper>
</template>

<script setup lang="ts">
import { router } from '@/routers';
import { useAuthStore, useUiStore } from '@/store';
import type { SignUpData, User } from '@/types';
import { onMounted, ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import FormWrapper from './FormWrapper.vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
const form = ref<SignUpData>({ username: '', email: '', password: '' });
const inputRef = ref<HTMLInputElement | null>(null);

const isValidate = () => {
  const { username, email, password } = form.value;

  if (username.trim().length < 2) {
    uiStore.showToast('Username must be at least 2 characters', 'warning');
    return false;
  }

  if (!email.trim() || !email.includes('@')) {
    uiStore.showToast('Please enter a valid email address', 'warning');
    return false;
  }

  if (password.length < 6) {
    uiStore.showToast('Password must be at least 6 characters', 'warning');
    return false;
  }

  return true;
};

const onSubmit = () => {
  if (!isValidate()) return;

  const newUser: User = {
    ...form.value,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const result = authStore.register(newUser);

  if (result.success) {
    uiStore.showToast('Registration successful! Please login.', 'success');
    router.push({ name: 'SignIn' });
  } else {
    uiStore.showToast(result.message as string, 'error');
  }
};
onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <FormWrapper
    title="Sign Up"
    description="Already have an account?"
    link="Login"
    :to="{ name: 'SignIn' }"
  >
    <form
      class="flex w-full flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <BaseInput
        ref="inputRef"
        v-model="form.username"
        type="text"
        maxlength="15"
        placeholder="Username"
      />
      <BaseInput
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

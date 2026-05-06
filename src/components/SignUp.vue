<script setup lang="ts">
import { router } from '@/routers';
import { onMounted, ref } from 'vue';
import BaseInput from './BaseInput.vue';
import FormWrapper from './FormWrapper.vue';

const form = ref({ username: '', email: '', password: '' });
const inputRef = ref<HTMLInputElement | null>(null);

const onSubmit = () => {
  const userData = { ...form.value };
  localStorage.setItem('user', JSON.stringify(userData));

  const fakeToken = btoa(form.value.email + Date.now());
  localStorage.setItem('token', fakeToken);

  router.push({ name: 'Home' });
};
onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <FormWrapper title="Sign Up">
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
      <button
        type="submit"
        class="hover:border-accent-lime border-border text-text-secondary focus-within:border-accent cursor-pointer rounded-lg border-2 px-3 py-1.5 text-lg capitalize transition-colors duration-200 outline-none disabled:cursor-not-allowed"
      >
        submit
      </button>
    </form>
  </FormWrapper>
</template>

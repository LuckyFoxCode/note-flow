<script setup lang="ts">
import { router } from '@/routers';
import { ref } from 'vue';
import FormWrapper from './FormWrapper.vue';

const form = ref({ username: '', email: '', password: '' });

const onSubmit = () => {
  const userData = { ...form.value };
  localStorage.setItem('user', JSON.stringify(userData));

  const fakeToken = btoa(form.value.email + Date.now());
  localStorage.setItem('token', fakeToken);

  router.push({ name: 'Home' });
};
</script>

<template>
  <FormWrapper title="Sign Up">
    <form
      class="flex w-full flex-col gap-y-2"
      @submit.prevent="onSubmit"
    >
      <input
        ref="inputRef"
        v-model="form.username"
        type="text"
        maxlength="15"
        placeholder="Username"
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
      />
      <input
        v-model="form.password"
        type="password"
        minlength="4"
        placeholder="Password"
        class="border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-colors duration-200 outline-none"
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

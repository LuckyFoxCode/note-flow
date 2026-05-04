<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { router } from '@/routers';
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push({ name: 'Auth' });
}
</script>

<template>
  <section>
    <TheHeader>
      <span>Home page</span>
    </TheHeader>
    <button
      class="bg-surface text-text-main border-border hover:border-accent-lime w-full cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 md:w-fit"
      @click="logout"
    >
      LogOut
    </button>
  </section>
</template>

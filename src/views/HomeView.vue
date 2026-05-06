<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
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
    <BaseButton
      title="LogOut"
      type="button"
      class="w-full md:w-fit"
      @click="logout"
    />
  </section>
</template>

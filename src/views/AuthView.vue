<script setup lang="ts">
import SignUp from '@/components/SignUp.vue';
import TheOverlay from '@/components/TheOverlay.vue';
</script>

<template>
  <section class="flex h-full w-full items-center justify-center">
    <TheOverlay>
      <SignUp />
    </TheOverlay>
  </section>
</template>

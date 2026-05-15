<script setup lang="ts">
import { SettingsCard } from '@/components/settings';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <section class="relative flex h-dvh flex-col">
    <TheHeader>
      <span>Settings Page</span>
    </TheHeader>
    <SettingsCard />
  </section>
</template>

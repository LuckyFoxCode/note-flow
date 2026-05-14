<script setup lang="ts">
import { SettingsCard } from '@/components/settings';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <section class="relative flex h-dvh flex-col gap-2 px-2 md:px-0">
    <TheHeader>
      <span>Settings Page</span>
    </TheHeader>
    <span
      class="text-text-main/10 absolute top-1/2 left-1/2 hidden -translate-1/2 lg:inline lg:text-7xl xl:text-[160px]"
    >
      Settings Page
    </span>
    <SettingsCard />
  </section>
</template>

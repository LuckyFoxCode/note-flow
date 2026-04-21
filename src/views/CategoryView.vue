<script setup lang="ts">
import { IconArrowLeft } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;
</script>

<template>
  <section>
    <TheHeader>
      <div class="flex items-center gap-x-1">
        <button
          type="button"
          class="focus-within:text-accent hover:text-accent-lime cursor-pointer transition-colors duration-200 outline-none"
          @click="router.back()"
        >
          <IconArrowLeft class="size-6" />
        </button>
        <h2 class="capitalize md:text-2xl">{{ slug }}</h2>
      </div>
    </TheHeader>
  </section>
</template>

<script setup lang="ts">
import type { State } from '@/App.vue';
import { IconArrowLeft } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

const state = inject<State>('state');
const currentCategory = computed(() =>
  state?.categories.find((category) => category.slug === slug),
);
</script>

<template>
  <section>
    <TheHeader
      :style="{
        borderColor: currentCategory?.categoryColor,
        boxShadow: `0 8px 16px ${currentCategory?.categoryColor}4d`,
      }"
    >
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

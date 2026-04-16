<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goToHome = () => router.push('/');
</script>

<template>
  <section class="relative flex h-full w-full flex-col items-center justify-center">
    <span
      class="text-text/10 absolute top-1/2 left-1/2 z-0 -translate-1/2 text-[160px] md:text-[256px] lg:text-[512px]"
      >404</span
    >
    <div class="z-10 flex w-fit flex-col items-center justify-center gap-y-4 px-1">
      <h2 class="text-4xl md:text-8xl">Page not found</h2>
      <p class="text-text/60 text-center md:w-3/4 md:text-3xl lg:w-2/3">
        The page you're looking for doesn't exist. Go back to your notes.
      </p>
      <button
        type="button"
        class="cursor-pointer rounded-lg border-2 border-transparent bg-blue-700 px-4 py-2 text-xl transition-colors duration-200 outline-none focus-within:border-slate-100 hover:border-slate-200"
        @click="goToHome"
      >
        Back to homepage
      </button>
    </div>
  </section>
</template>

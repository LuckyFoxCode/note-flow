<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;
</script>

<template>
  <section>
    <h2 class="text-2xl capitalize">{{ slug }}</h2>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import CategoryList from '@/components/CategoryList.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useUiStore } from '@/store';

const uiStore = useUiStore();
</script>

<template>
  <section class="flex h-screen flex-col gap-1">
    <TheHeader>
      <span>Categories Page</span>
    </TheHeader>
    <div>
      <BaseButton
        title="add category"
        type="button"
        @click="uiStore.openOverlay('category')"
      />
    </div>
    <CategoryList />
  </section>
</template>

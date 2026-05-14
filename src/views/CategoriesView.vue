<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import CategoryList from '@/components/CategoryList.vue';
import EntityActionBar from '@/components/EntityActionBar.vue';
import TheHeader from '@/components/TheHeader.vue';
import { SORT_CATEGORY_OPTIONS } from '@/consts';

import { useCategoryStore, useUiStore } from '@/store';

const uiStore = useUiStore();
const categoryStore = useCategoryStore();
</script>

<template>
  <section class="flex h-screen flex-col gap-1">
    <TheHeader>
      <span>Categories Page</span>
    </TheHeader>
    <EntityActionBar>
      <BaseButton
        title="add category"
        class="text-text-secondary"
        type="button"
        @click="uiStore.openOverlay('category')"
      />
      <BaseSelect v-model="categoryStore.categorySort">
        <option
          v-for="option in SORT_CATEGORY_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </BaseSelect>
    </EntityActionBar>
    <CategoryList />
  </section>
</template>

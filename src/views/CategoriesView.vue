<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import CategoryList from '@/components/CategoryList.vue';
import EntityActionBar from '@/components/EntityActionBar.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useUiStore } from '@/store';

const uiStore = useUiStore();
</script>

<template>
  <section class="flex h-screen flex-col gap-1">
    <TheHeader>
      <span>Categories Page</span>
    </TheHeader>
    <EntityActionBar>
      <BaseButton
        title="add category"
        type="button"
        @click="uiStore.openOverlay('category')"
      />
      <BaseSelect>
        <option
          disabled
          value="default"
        >
          Filter
        </option>

        <option
          value="Newest"
          selected
        >
          Newest
        </option>
        <option value="Oldest">Oldest</option>
        <option value="Percentage">Percentage</option>
      </BaseSelect>
    </EntityActionBar>
    <CategoryList />
  </section>
</template>

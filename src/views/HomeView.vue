<script setup lang="ts">
import { IconAddFolder, IconChart, IconChecked } from '@/assets/icons';
import DashboardCard from '@/components/DashboardCard.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useDateTime } from '@/composables';
import { useAuthStore, useCategoryStore, useUiStore } from '@/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();
const { currentTime } = useDateTime();
const categoryStore = useCategoryStore();

const { categories } = storeToRefs(categoryStore);

const totalCategories = computed(() => categories.value.length);

const totalCompletedCategories = computed(
  () =>
    categories.value.filter((category) => {
      const notes = category.categoryNotes;

      if (notes.length === 0) return false;

      return notes.every((note) => note.completed);
    }).length,
);

const totalProgress = computed(() => {
  const notes = categories.value.flatMap((cat) => cat.categoryNotes);

  if (notes.length === 0) return 0;

  const total = (notes.filter((note) => note.completed).length / notes.length) * 100;
  return Math.round(total);
});

const openCategoryCreation = () => {
  router.push({ name: 'Categories' });
  uiStore.openOverlay('category');
};
</script>

<template>
  <section class="flex h-dvh flex-col">
    <TheHeader>
      <span>Home page</span>
    </TheHeader>
    <div class="flex flex-1 flex-col p-2">
      <h1 class="w-fit text-2xl">NoteFlow Dashboard</h1>
      <div
        class="border-border/20 bg-border/10 shadow-border/30 m-auto rounded-lg border-2 p-3 shadow-lg"
      >
        <div
          class="border-accent-lime/30 text-text-secondary mb-4 flex flex-col items-center gap-y-2 border-b-2 pb-4"
        >
          <span class="text-2xl capitalize md:text-4xl">
            Hello,
            <span class="text-accent-lime">{{ authStore.currentUser?.username }}</span>
            !
          </span>
          <span class="text-center text-lg md:text-3xl">Keep your category and notes flowing.</span>
          <span class="text-text-secondary/30 md:text-xl">{{ currentTime }}</span>
        </div>
        <div class="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-3 md:gap-y-0">
          <DashboardCard
            title="new category"
            :value="totalCategories"
          >
            <template #icon>
              <button
                class="focus:border-accent group bg-accent/5 border-accent/5 cursor-pointer rounded-lg border-2 p-2 transition-colors duration-200 outline-none"
                @click="openCategoryCreation"
              >
                <IconAddFolder
                  class="text-accent group-hover:text-accent-lime size-6 transition-colors duration-200"
                />
              </button>
            </template>
          </DashboardCard>
          <DashboardCard
            title="total completed"
            :value="totalCompletedCategories"
          >
            <template #icon>
              <div class="bg-accent/5 border-accent/5 rounded-lg border-2 p-2">
                <IconChecked class="text-accent size-6" />
              </div>
            </template>
          </DashboardCard>

          <DashboardCard
            title="total progress"
            :value="`${totalProgress}%`"
          >
            <template #icon>
              <div class="bg-accent/5 border-accent/5 rounded-lg border-2 p-2">
                <IconChart class="text-accent size-6" />
              </div>
            </template>
          </DashboardCard>
        </div>
      </div>
    </div>
  </section>
</template>

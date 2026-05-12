<script setup lang="ts">
import { NoteCard } from '@/components/notes';
import TheHeader from '@/components/TheHeader.vue';
import { useCategoryStore } from '@/store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const categoryStore = useCategoryStore();

const route = useRoute();

console.log(route.name);

const notes = computed(() =>
  categoryStore.categories.flatMap((note) => note.categoryNotes).filter((note) => note.archived),
);
</script>

<template>
  <section>
    <TheHeader>
      <span>Archive Page</span>
    </TheHeader>
    <div class="overflow-hidden p-4">
      <TransitionGroup
        v-if="notes.length"
        tag="ul"
        name="list"
        class="3xl:grid-cols-5 uw:grid-cols-4 grid w-full gap-2 py-2 md:grid-cols-2 md:gap-3.5 lg:gap-5 xl:grid-cols-3"
      >
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
        />
      </TransitionGroup>
      <span v-else>Empty archive</span>
    </div>
  </section>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

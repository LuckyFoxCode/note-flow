<script setup lang="ts">
import { IconPen } from '@/assets/icons';
import { nextTick, ref, type Component } from 'vue';

interface Props {
  labelIcon: Component;
  type?: string;
}

defineProps<Props>();
const model = defineModel<string>({ required: true });

const isEdited = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

async function toggleEdit() {
  isEdited.value = !isEdited.value;

  if (isEdited.value) {
    await nextTick();
    inputRef.value?.focus();
  }
}
</script>

<template>
  <div class="flex items-center gap-x-0.5">
    <component
      :is="labelIcon"
      class="size-6"
    />
    <input
      ref="inputRef"
      v-model.lazy="model"
      :type="type"
      :disabled="!isEdited"
      class="text-text-secondary focus:border-accent rounded-md border-b-2 border-transparent px-1 text-lg transition-colors duration-200 outline-none"
      @keydown.enter.prevent="toggleEdit"
      @blur="isEdited = false"
    />

    <button
      class="focus:border-accent hover:border-accent-lime cursor-pointer rounded-lg border-2 border-transparent px-1 py-0.5 transition-colors duration-200 outline-none"
      @click="toggleEdit"
    >
      <IconPen class="text-border size-4" />
    </button>
  </div>
</template>

<style scoped>
input {
  field-sizing: content;
  width: auto;
  min-width: 20px;
}
</style>

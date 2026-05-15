<script setup lang="ts">
import { computed, nextTick, ref, type Component } from 'vue';

interface Props {
  labelIcon: Component;
  label: string;
  type?: 'text' | 'email' | 'password';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});
const model = defineModel<string>({ required: true });

const isEdited = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const isPasswordVisible = ref(false);
const isPasswordField = computed(() => props.type === 'password');

const inputType = computed(() => {
  if (!isPasswordField.value) return 'text';
  return isPasswordVisible.value ? 'text' : 'password';
});

async function toggleEdit() {
  isEdited.value = !isEdited.value;

  if (isEdited.value) {
    if (isPasswordField.value) {
      isPasswordVisible.value = true;
    }
    await nextTick();
    inputRef.value?.focus();
  } else {
    if (isPasswordField.value) {
      isPasswordVisible.value = false;
    }
  }
}
</script>

<template>
  <div class="text-text-secondary/50 bg-border/30 flex flex-col rounded-lg px-1 md:px-2">
    <span class="md:text-lg">{{ label }}:</span>
    <div class="flex justify-between">
      <div class="flex items-center md:gap-x-0.5">
        <component
          :is="labelIcon"
          class="size-4 md:size-6"
        />
        <input
          ref="inputRef"
          v-model.lazy="model"
          :type="inputType"
          :disabled="!isEdited"
          class="text-text-main/70 focus:border-accent rounded-md border-b-2 border-transparent px-1 transition-colors duration-200 outline-none md:text-lg"
          @keydown.enter.prevent="toggleEdit"
        />
      </div>

      <button
        class="focus:border-accent hover:border-accent-lime flex cursor-pointer items-center gap-x-2 rounded-lg border-2 border-transparent px-1 py-0.5 text-sm transition-colors duration-200 outline-none md:text-base"
        @click="toggleEdit"
      >
        {{ isPasswordField ? (isEdited ? 'Save' : 'Change password') : isEdited ? 'Save' : 'Edit' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  field-sizing: content;
  width: auto;
  min-width: 20px;
}
</style>

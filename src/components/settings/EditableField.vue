<script setup lang="ts">
import { IconPen } from '@/assets/icons';
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
  <div class="text-text-secondary/50 flex flex-col">
    <span class="text-lg">{{ label }}:</span>
    <div class="flex justify-between">
      <div class="flex items-center gap-x-0.5">
        <component
          :is="labelIcon"
          class="size-6"
        />
        <input
          ref="inputRef"
          v-model.lazy="model"
          :type="inputType"
          :disabled="!isEdited"
          class="text-text-main/70 focus:border-accent rounded-md border-b-2 border-transparent px-1 text-lg transition-colors duration-200 outline-none"
          @keydown.enter.prevent="toggleEdit"
        />
      </div>

      <button
        class="focus:border-accent hover:border-accent-lime flex cursor-pointer items-center gap-x-2 rounded-lg border-2 border-transparent px-1 py-0.5 transition-colors duration-200 outline-none"
        @click="toggleEdit"
      >
        <IconPen
          v-if="!isPasswordField || isEdited"
          class="size-4"
        />
        <!-- true                             1                                   2 -->
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

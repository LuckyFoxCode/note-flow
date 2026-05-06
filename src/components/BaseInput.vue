<script setup lang="ts">
import { ref, type InputHTMLAttributes } from 'vue';

const model = defineModel<string>();
const props = defineProps<{
  placeholder: string;
  class?: string;
  minlenght?: number | string;
  maxlength?: number | string;
  type?: InputHTMLAttributes['type'];
}>();

const inputElement = ref<HTMLInputElement | null>(null);

defineExpose({
  focus: () => inputElement.value?.focus(),
});
</script>

<template>
  <input
    ref="inputElement"
    v-model.trim="model"
    :type="props.type"
    :maxlength="props.maxlength"
    :placeholder="props.placeholder"
    :class="[
      'border-border placeholder:text-text-secondary focus-within:border-accent rounded-lg border-2 px-3 py-1.5 text-lg transition-all duration-200 outline-none',
      props.class,
    ]"
  />
</template>

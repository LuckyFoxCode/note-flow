<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

const props = defineProps<{
  title: string;
  type: ButtonHTMLAttributes['type'];
  class?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<template>
  <button
    :type="type"
    :disabled="props.disabled"
    :class="[
      'hover:border-accent-lime border-border text-text-secondary focus-within:border-accent cursor-pointer rounded-lg border-2 px-3 py-1.5 capitalize transition-all duration-200 outline-none disabled:cursor-not-allowed',
      props.class,
    ]"
    @click="emit('click', $event)"
  >
    {{ props.title }}
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  percentage: number;
  color?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#3b82f6',
  size: 'w-24 h-12', // Высота в два раза меньше ширины для полукруга
});

const radius = 40;
// Половина длины окружности для полукруга
const arcLength = Math.PI * radius;

const offset = computed(() => {
  // Вычисляем отступ: от полной дуги отнимаем процент заполнения
  return arcLength - (props.percentage / 100) * arcLength;
});
</script>

<template>
  <div :class="['relative flex flex-col items-center justify-end overflow-hidden', size]">
    <svg
      viewBox="0 0 100 50"
      class="w-full"
    >
      <path
        d="M 10,50 A 40,40 0 0 1 90,50"
        fill="none"
        stroke-width="8"
        stroke-linecap="round"
        class="stroke-border"
      />

      <path
        d="M 10,50 A 40,40 0 0 1 90,50"
        fill="none"
        :stroke="color"
        stroke-width="8"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-out"
        :style="{
          strokeDasharray: arcLength,
          strokeDashoffset: offset,
        }"
      />
    </svg>

    <div class="text-accent/80 absolute -bottom-1 text-center font-bold">
      <slot>{{ percentage }}%</slot>
    </div>
  </div>
</template>

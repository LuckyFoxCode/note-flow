<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  percentage: number;
  color?: string;
  size?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: '#3b82f6',
  size: 'w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 2xl:w-20 2xl:h-20',
});

const radius = 40;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference - (props.percentage / 100) * circumference;
});
</script>

<template>
  <div :class="['relative flex items-center justify-center', size]">
    <svg
      viewBox="0 0 100 100"
      class="h-full w-full -rotate-90 transform"
    >
      <circle
        cx="50"
        cy="50"
        :r="radius"
        stroke-width="6"
        fill="transparent"
        class="stroke-border"
      />
      <circle
        cx="50"
        cy="50"
        :r="radius"
        stroke-width="6"
        fill="transparent"
        stroke-linecap="round"
        class="transition-all duration-700 ease-in-out"
        :stroke="color"
        :style="{
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }"
      />
    </svg>

    <div class="text-text absolute text-[10px] font-bold sm:text-xs">
      <slot>{{ percentage }}%</slot>
    </div>
  </div>
</template>

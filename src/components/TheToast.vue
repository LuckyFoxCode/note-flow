<script setup lang="ts">
import { useUiStore } from '@/store';

const uiStore = useUiStore();
</script>

<template>
  <transition name="toast">
    <div
      v-if="uiStore.isToastVisible"
      class="text-text-main fixed right-5 bottom-5 z-100 flex items-center gap-x-3 rounded-lg border px-4 py-3 shadow-2xl backdrop-blur-md"
      :class="{
        'border-success bg-success/10': uiStore.toastType === 'success',
        'border-error bg-error/10': uiStore.toastType === 'error',
      }"
    >
      <span class="text-sm font-medium">{{ uiStore.toastMessage }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>

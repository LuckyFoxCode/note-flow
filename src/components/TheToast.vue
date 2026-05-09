<script setup lang="ts">
import { IconChecked, IconFire, IconInfo, IconWarning } from '@/assets/icons';
import { useUiStore } from '@/store';

const uiStore = useUiStore();
</script>

<template>
  <transition name="toast">
    <div
      v-if="uiStore.isToastVisible"
      :key="uiStore.toastMessage"
      class="fixed right-5 bottom-5 z-100 flex items-center gap-x-2 overflow-hidden rounded-lg border-2 p-4 shadow-2xl backdrop-blur-md"
      :class="{
        'border-success/20 bg-success/10 text-success': uiStore.toastType === 'success',
        'border-error/20 bg-error/10 text-error': uiStore.toastType === 'error',
        'border-amber-600/20 bg-amber-600/10 text-amber-600': uiStore.toastType === 'warning',
        'border-accent/20 bg-accent/10 text-accent': uiStore.toastType === 'info',
      }"
    >
      <div
        class="absolute right-0 bottom-0 h-0.5 bg-current/60"
        :style="{
          animation: `progress ${uiStore.toastDuration}ms linear forwards`,
        }"
      />
      <div class="shrink-0">
        <IconChecked
          v-if="uiStore.toastType === 'success'"
          class="text-success size-6"
        />
        <IconFire
          v-else-if="uiStore.toastType === 'error'"
          class="text-error size-6"
        />
        <IconWarning
          v-else-if="uiStore.toastType === 'warning'"
          class="size-6 text-amber-600"
        />
        <IconInfo
          v-else-if="uiStore.toastType === 'info'"
          class="text-accent size-6"
        />
      </div>
      <span class="text-sm font-medium">{{ uiStore.toastMessage }}</span>
    </div>
  </transition>
</template>

<style>
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

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>

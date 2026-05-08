<script setup lang="ts">
import TheOverlay from '@/components/TheOverlay.vue';
</script>

<template>
  <section class="flex h-full w-full items-center justify-center">
    <TheOverlay>
      <router-view v-slot="{ Component, route }">
        <transition name="slider">
          <component
            :is="Component"
            :key="route.path"
          />
        </transition>
      </router-view>
    </TheOverlay>
  </section>
</template>

<style scoped>
.slider-leave-active {
  position: absolute;
}

.slider-enter-active,
.slider-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slider-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slider-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>

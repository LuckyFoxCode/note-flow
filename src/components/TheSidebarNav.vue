<script setup lang="ts">
import { NAV_ITEM } from '@/consts';

const { compact } = defineProps<{ compact: boolean }>();
</script>

<template>
  <nav class="w-full flex-1">
    <ul class="flex flex-col gap-y-1">
      <li
        v-for="item in NAV_ITEM"
        :key="item.name"
      >
        <router-link
          v-slot="{ isExactActive }"
          :to="{ name: item.name }"
          class="group focus-within:border-accent hover:bg-surface text-text-secondary flex items-center gap-x-2 rounded-lg border-2 border-transparent px-1.5 py-2 transition-colors duration-200 outline-none"
          active-class="bg-surface"
        >
          <component
            :is="item.icon"
            :class="[
              'size-6 transition-colors duration-200',
              isExactActive ? 'text-accent-lime' : 'group-hover:text-accent-lime',
            ]"
          />
          <span
            v-if="compact"
            :class="[isExactActive ? 'text-text-main font-medium' : 'font-normal']"
            class="text-sm font-medium transition-all"
            >{{ item.name }}</span
          >
        </router-link>
      </li>
    </ul>
  </nav>
</template>

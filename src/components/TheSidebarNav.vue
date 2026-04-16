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
          class="flex items-center gap-x-1 rounded-lg border border-transparent px-1.5 py-2 transition-colors outline-none focus-within:border-blue-500 hover:bg-slate-600 hover:text-white"
          active-class="bg-active-nav text-white"
        >
          <component
            :is="item.icon"
            :class="['size-6', isExactActive ? 'text-lime-300' : '']"
          />
          <span v-if="compact">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { NAV_ITEM } from '@/consts';

const { isOpenSidebar } = defineProps<{ isOpenSidebar: boolean }>();
</script>

<template>
  <nav class="w-full flex-1">
    <ul class="flex flex-col gap-y-1">
      <li
        v-for="item in NAV_ITEM"
        :key="item.text"
      >
        <a
          :href="item.href"
          class="flex items-center gap-x-1 rounded-lg p-2 transition hover:border-transparent hover:bg-slate-600 hover:text-white"
          :class="item.active ? 'bg-active-nav text-white' : ''"
        >
          <component
            :is="item.icon"
            class="size-6"
            :class="item.active ? 'text-lime-300' : ''"
          />
          <span v-if="isOpenSidebar">{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

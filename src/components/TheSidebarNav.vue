<script setup lang="ts">
import { NAV_ITEM } from '@/consts';
</script>

<template>
  <nav class="w-full">
    <ul class="flex flex-col gap-y-1">
      <li
        v-for="item in NAV_ITEM"
        :key="item.text"
      >
        <a
          :href="item.href"
          class="flex items-center gap-x-1 rounded-lg px-4 py-2 transition hover:border-transparent hover:bg-slate-600"
          :class="item.active ? 'bg-slate-700' : ''"
        >
          <component
            :is="item.icon"
            class="size-5"
          />
          <span>{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { IconNote, IconRate, IconWidget } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <section>
    <TheHeader class="mb-5">
      <span>Statistics Page</span>
    </TheHeader>
    <div class="grid grid-rows-4 px-2">
      <div class="flex flex-col">
        <h3 class="text-lg font-medium">NoteFlow Dashboard Statistics</h3>
        <p class="text-text-secondary text-sm">Friday, May 7, 2026, 13:43 PM</p>
      </div>

      <div class="grid grid-cols-4 gap-x-5">
        <div
          class="border-border bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-5 shadow-md"
        >
          <div class="bg-border flex size-12 items-center justify-center rounded-lg p-3">
            <IconWidget class="text-text-main/70 size-10" />
          </div>
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm capitalize">total categories</span>
            <span class="text-text-main text-lg font-medium">10</span>
          </div>
        </div>

        <div
          class="border-border bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-5 shadow-md"
        >
          <div class="bg-border flex size-12 items-center justify-center rounded-lg p-3">
            <IconNote class="text-text-main/70 size-10" />
          </div>
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm capitalize">total notes</span>
            <span class="text-text-main text-lg font-medium">100</span>
          </div>
        </div>

        <div
          class="border-border bg-code-bg/50 shadow-code-bg flex items-center justify-between gap-x-3 rounded-lg border-2 p-5 shadow-md"
        >
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm capitalize">completion rate</span>
            <span class="text-text-main text-lg font-medium">52%</span>
          </div>
          <div class="bg-border flex size-12 items-center justify-center rounded-lg p-3">
            <IconNote class="text-text-main/70 size-10" />
          </div>
        </div>

        <div
          class="border-border bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-5 shadow-md"
        >
          <div class="bg-accent/10 flex size-12 items-center justify-center rounded-lg p-3">
            <IconRate class="text-accent/70 size-10" />
          </div>
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm capitalize">most active category</span>
            <span class="text-text-main text-lg font-medium capitalize">frontend essensials</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IconGauge, IconNote, IconRate, IconWidget } from '@/assets/icons';
import TheHeader from '@/components/TheHeader.vue';
import { useCategoryStore } from '@/store';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Bar, Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, Title, CategoryScale, LinearScale);

const categoryStore = useCategoryStore();

const windowWidth = ref(window.innerWidth);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => window.addEventListener('resize', updateWidth));
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const fontSize = computed(() => {
  if (windowWidth.value < 768) return 14;
  return 16;
});

const chartData = computed<ChartData<'doughnut'>>(() => ({
  labels: categoryStore.categories.map((category) => category.name),
  datasets: [
    {
      backgroundColor: categoryStore.categories.map((category) => category.categoryColor),
      data: categoryStore.categories.map((category) => category.categoryNotes.length),
    },
  ],
}));

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '40%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: fontSize.value,
        },
      },
    },
  },
};

const currentTime = ref('');
let timer: ReturnType<typeof setInterval>;

const updateTime = () => {
  const now = new Date();

  const datePart = Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(now);

  const dateTime = Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  currentTime.value = `${datePart}, ${dateTime}`;
};

onMounted(() => {
  updateTime();

  timer = setInterval(updateTime, 60000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const totalCategories = computed(() => categoryStore.categories.length);
const totalNotes = computed(() => categoryStore.categories.flatMap((note) => note.categoryNotes));
const completeNotes = totalNotes.value.filter((note) => note.completed).length;
const rates = (completeNotes / totalNotes.value.length) * 100;

const mostActiveCategory = computed(() => {
  const categories = categoryStore.categories;

  if (!categories.length) return '';

  return categories.reduce((prev, current) => {
    const prevCount = prev.categoryNotes?.length || 0;
    const currentCount = current.categoryNotes?.length || 0;

    return currentCount > prevCount ? current : prev;
  }).name;
});

const categories = computed(() =>
  categoryStore.categories.map((category) => {
    return {
      nameCategory: category.name,
      colorCategory: category.categoryColor,
      totalNotes: category.categoryNotes.length,
      completed: category.categoryNotes.filter((n) => n.completed).length,
    };
  }),
);

const stats = totalNotes.value.reduce(
  (acc, note) => {
    acc[note.priority] = (acc[note.priority] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

const barData = computed<ChartData<'bar'>>(() => ({
  labels: ['Easy', 'Medium', 'Hard'],
  datasets: [
    {
      label: 'Priority',
      data: Object.values(stats),
      backgroundColor: ['#00c7be', '#ff9500', '#ff453a'],
      borderRadius: 4,
    },
  ],
}));

const barOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawTicks: false,
        color: '#2c2c2e',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

interface TableHeader {
  label: string;
  key: string;
}

const tableHeaders: TableHeader[] = [
  { label: 'Name', key: 'name' },
  { label: 'Color Tag', key: 'color' },
  { label: 'Total Notes', key: 'total' },
  { label: 'Completed', key: 'completed' },
  { label: 'Progress Bar', key: 'progress' },
];

const calculatePercentage = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};
</script>

<template>
  <section class="flex h-dvh flex-col gap-x-1 gap-y-5 overflow-hidden">
    <TheHeader class="shrink-0">
      <span>Statistics Page</span>
    </TheHeader>
    <div class="no-scrollbar min-h-0 flex-1 overflow-y-auto px-2">
      <div class="grid content-start gap-y-5">
        <div class="flex flex-col">
          <h3 class="text-lg font-medium">NoteFlow Dashboard Statistics</h3>
          <p class="text-text-secondary text-sm">{{ currentTime }}</p>
        </div>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div
            class="border-border/30 bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-2 shadow-md md:p-3 lg:p-5"
          >
            <div class="flex size-12 items-center justify-center rounded-lg bg-amber-500/10 p-3">
              <IconWidget class="size-10 text-amber-500/60" />
            </div>
            <div class="flex flex-col">
              <span class="text-text-secondary text-sm capitalize">total categories</span>
              <span class="text-text-main text-lg font-medium">{{ totalCategories }}</span>
            </div>
          </div>

          <div
            class="border-border/30 bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-2 shadow-md md:p-3 lg:p-5"
          >
            <div class="flex size-12 items-center justify-center rounded-lg bg-pink-500/10 p-3">
              <IconNote class="size-10 text-pink-500/60" />
            </div>
            <div class="flex flex-col">
              <span class="text-text-secondary text-sm capitalize">total notes</span>
              <span class="text-text-main text-lg font-medium">{{ totalNotes.length }}</span>
            </div>
          </div>

          <div
            class="border-border/30 bg-code-bg/50 shadow-code-bg flex items-center justify-between gap-x-3 rounded-lg border-2 p-2 shadow-md md:p-3 lg:p-5"
          >
            <div class="flex flex-col">
              <span class="text-text-secondary text-sm capitalize">completion rate</span>
              <span class="text-text-main text-lg font-medium">{{ Math.round(rates) }}%</span>
            </div>
            <IconGauge :percentage="Math.round(rates)" />
          </div>

          <div
            class="border-border/30 bg-code-bg/50 shadow-code-bg flex items-center gap-x-3 rounded-lg border-2 p-2 shadow-md md:p-3 lg:p-5"
          >
            <div class="bg-accent/10 flex size-12 items-center justify-center rounded-lg p-3">
              <IconRate class="text-accent/70 size-10" />
            </div>
            <div class="flex flex-col">
              <span class="text-text-secondary text-sm capitalize">most active category</span>
              <span class="text-text-main text-lg font-medium capitalize">
                {{ mostActiveCategory }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div class="border-border/30 rounded-lg border-2 px-4 pt-4">
            <h3 class="text-text-main/40 text-sm">Notes by Category</h3>
            <h2 class="mb-4 text-xl font-bold">Category Distribution</h2>
            <div class="w-full py-2">
              <Doughnut
                :data="chartData"
                :options="chartOptions"
              />
            </div>
          </div>
          <div class="border-border/30 flex flex-col rounded-lg border-2 px-4 pt-4">
            <h3 class="text-text-main/40 text-sm">Notes by Priority</h3>
            <h2 class="mb-4 text-xl font-bold">Priority Breakdown</h2>
            <div class="flex-1 py-2">
              <Bar
                :data="barData"
                :options="barOptions"
              />
            </div>
          </div>
        </div>

        <div
          class="border-border/30 bg-bg hidden w-full overflow-hidden rounded-xl border-2 shadow-sm md:inline"
        >
          <div class="border-border border-b px-3 py-4 lg:px-6">
            <h2 class="text-text-main text-lg font-semibold">Category Progress Details</h2>
          </div>

          <div class="">
            <table class="w-full border-collapse text-left">
              <thead class="bg-code-bg/50">
                <tr class="border-border text-text-main/80 border-b text-sm">
                  <th
                    v-for="header in tableHeaders"
                    :key="header.key"
                    class="border-border/20 px-1.5 py-2.5 text-center font-medium not-last:border-r-2 first:text-left last:text-left xl:px-6 xl:py-4"
                  >
                    {{ header.label }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-border divide-y">
                <tr
                  v-for="category in categories"
                  :key="category.nameCategory"
                  class="hover:bg-code-bg transition-colors"
                >
                  <td class="text-text-main/50 px-1.5 py-2.5 text-sm xl:px-6 xl:py-4">
                    {{ category.nameCategory }}
                  </td>
                  <td class="px-1.5 py-2.5 xl:px-6 xl:py-4">
                    <div
                      class="mx-auto flex w-fit items-center gap-2 rounded-full border-2 px-2 py-1 font-mono text-xs"
                      :style="{
                        backgroundColor: `${category.colorCategory}15`,
                        borderColor: `${category.colorCategory}30`,
                      }"
                    >
                      <span
                        class="h-2 w-2 rounded-full"
                        :style="{ backgroundColor: category.colorCategory }"
                      ></span>
                      <span :style="{ color: `${category.colorCategory}95` }">{{
                        category.colorCategory
                      }}</span>
                    </div>
                  </td>
                  <td class="text-text-main/50 px-1.5 py-2.5 text-center text-sm xl:px-6 xl:py-4">
                    {{ category.totalNotes }}
                  </td>
                  <td class="text-text-main/50 px-1.5 py-2.5 text-center text-sm xl:px-6 xl:py-4">
                    {{ category.completed }}
                  </td>
                  <td class="px-1.5 py-2.5 xl:px-6 xl:py-4">
                    <div class="flex min-w-50 items-center gap-4">
                      <div
                        class="relative h-2.5 w-full overflow-hidden rounded-full"
                        :style="{ background: `${category.colorCategory}30` }"
                      >
                        <div
                          class="absolute top-0 left-0 h-full transition-all duration-500"
                          :style="{
                            width: `${calculatePercentage(category.completed, category.totalNotes)}%`,
                            backgroundColor: category.colorCategory,
                          }"
                        ></div>
                      </div>
                      <div
                        class="text-text-main/50 flex items-center gap-2 text-xs font-medium whitespace-nowrap"
                      >
                        <span>{{ category.completed }}/{{ category.totalNotes }}</span>
                        <span class="w-8 text-right"
                          >{{ calculatePercentage(category.completed, category.totalNotes) }}%</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

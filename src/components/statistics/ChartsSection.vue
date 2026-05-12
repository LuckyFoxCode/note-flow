<script setup lang="ts">
import { useCategoryStore } from '@/store';
import type { Note } from '@/types';
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

const props = defineProps<{
  totalNotes: Note[];
}>();

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

const stats = props.totalNotes.reduce(
  (acc, note) => {
    acc[note.priority] = (acc[note.priority] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

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
</script>

<template>
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
</template>

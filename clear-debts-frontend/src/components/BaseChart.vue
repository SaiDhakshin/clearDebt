<template>
    <component :is="chartComponent" :data="chartData" ></component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar, Line, Pie, Doughnut} from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  LineController,
  PointElement,
} from 'chart.js';

// Register needed components globally
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  LineController,
  PointElement
);

const props = defineProps<{
    chartType: 'bar' | 'line' | 'pie' | 'doughnut';
    chartData: any;
    chartOptions?: any;
}>();

const chartComponent = computed(() => {
    switch(props.chartType) {
        case 'bar':
            return Bar;
        case 'line':
            return Line;
        case 'pie':
            return Pie;
        case 'doughnut':
            return Doughnut;
        default:
            return Bar;
    }
})

</script>
<template>
    <div>
        <div class="dropdown-wrapper">
            <select class="dropdown" v-model="selectedCharttype">
                <option value="bar">Bar</option>
                <option value="pie">Pie</option>
                <option value="line">Line</option>
            </select>
        </div>
        <BaseChart :chartType="selectedCharttype" :chartData="chartData" />
    </div>
</template>

<script setup lang="ts">
import BaseChart from '@/components/BaseChart.vue';
import { createDebtBarChart, createDebtPieChart,  createDebtLineChart, } from '@/utils/chartFactory';
import { useDebtStore } from '@/stores/debtStore';
import { ref, computed } from 'vue';

const debtStore = useDebtStore();
const debts = computed(() => debtStore.debts);
const selectedCharttype = ref<'bar' | 'pie' | 'line' | 'doughnut'>('bar');

const chartData = computed(() => {
    if(selectedCharttype.value === 'bar') {
        return createDebtBarChart(debts.value);
    } else if(selectedCharttype.value === 'pie') {
        return createDebtPieChart(debts.value);
    } else if(selectedCharttype.value === 'line') {
        return createDebtLineChart(debts.value);
    }

    return createDebtBarChart(debts.value);
})
</script>
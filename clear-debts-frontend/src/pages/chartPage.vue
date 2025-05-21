<template>
    <div>
        <div class="dropdown-wrapper">
            <select class="dropdown" v-model="selectedCharttype">
                <option :value="type" :key="type" v-for="type in chartTypes">{{ type }}</option>
            </select>            
        </div>
        <div class="dropdown-wrapper">
            <label for="">Type: </label>
            <select class="dropdown" v-model="selectedViewType">
                <option :value="view.toLowerCase()" :key="view" v-for="view in chartView">{{ view }}</option>
            </select>            
        </div>
        <div class="dropdown-wrapper">
            <label for="">Debt: </label>
            <select class="dropdown" v-model="selectedDebtId">
                <option value="0" >Select</option>
                <option :value="debt.id" :key="debt.id" v-for="debt in debts">{{ debt.name }}</option>
            </select>            
        </div>
        <BaseChart :chartType="selectedCharttype" :chartData="chartData" />
    </div>
</template>

<script setup lang="ts">
import BaseChart from '@/components/BaseChart.vue';
import { createDebtBarChart, createDebtPieChart,  createDebtLineChart, createDebtPayoffLineChart, } from '@/utils/chartFactory';
import { useDebtStore } from '@/stores/debtStore';
import { ref, computed } from 'vue';
import type { Ref } from 'vue';

const debtStore = useDebtStore();
const debts = computed(() => debtStore.debts);
const selectedCharttype = ref<'bar' | 'pie' | 'line' | 'doughnut'>('bar');
const selectedViewType: Ref<string> = ref('summary');
const chartTypes = ['bar', 'pie', 'line'];
const chartView = ['Select', 'Summary', 'Amorization'];
const selectedDebtId = ref<number | null>(0);
const selectedDebt = computed(() => {
    return  debts.value.find((debt: any) => debt.id === selectedDebtId.value) || null;
})

const chartData = computed(() => {
    if(selectedViewType.value === 'summary') {
        if(selectedCharttype.value === 'bar') {
            return createDebtBarChart(debts.value);
        } else if(selectedCharttype.value === 'pie') {
            return createDebtPieChart(debts.value);
        } else if(selectedCharttype.value === 'line') {
            return createDebtLineChart(debts.value);
        }
    } else if(selectedViewType.value === 'amorization') {
        selectedCharttype.value = 'line';
        return createDebtPayoffLineChart(selectedDebt.value);
    }

    return createDebtBarChart(debts.value);
})
</script>
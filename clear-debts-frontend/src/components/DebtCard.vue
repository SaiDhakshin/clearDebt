<template>
    <div class="debt-card">
        <h2 class="debt-card-title">{{ debt.name }}</h2>
        <p class="text-gray-600 font-bold danger">Due Date: {{ debt?.dueDate?.toDateString() }}</p>
        <div class="text-right">
            <p class="text-red-600 font-bold">Total: {{ formatCurrency(debt.totalAmount) }} @ {{ debt.interestRate }}%</p>
            <!-- <p class="text-red-600 font-bold">Current Balance: ₹{{ debt.currentBalance }}</p>
            <p class="text-red-600 font-bold">Interest rate: {{ debt.interestRate }}%</p> -->
        </div>
        <div class="text-left">
            <p class="text-red-600 font-bold">Paying {{ formatCurrency(debt.monthlyPayment) }}/month — {{ formatCurrency(debt.currentBalance) }} remaining</p>
        </div>
        <div class="progress-section w-full">
            <div class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progress + '%'}"></div>
            </div>
            <p class="text-sm font-semibold success mt-1">{{ progress.toFixed(1) }}% paid off</p>
        </div>
        <div> 
            <p class="text-red-600 font-bold success">Payoff Date: {{ new Date(debt.payoffDate).toDateString() }}</p>
        </div>
        <div>
            <button class="danger-button" @click="$emit('delete', debt.id)">Delete</button>
            <button class="action-button" @click="$emit('edit', debt)">Edit</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Debt } from '@/types/Debt';
import { formatCurrency } from '@/utils/currencyFormat';
import { computed } from 'vue';

const props = defineProps<{
    debt: Debt;
}>();

const progress = computed(() => {
    if (props.debt.currentBalance && props.debt.totalAmount) {
        return ((props.debt.totalAmount - props.debt.currentBalance) / props.debt.totalAmount) * 100;
    }
    return 0;
});
</script>

<style>
.debt-card {
    background-color: #ECEFCA;
    border-radius: 10px;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.progress-bar-container {
    width: 100%;
    height: 8px;
    background-color: #d1d5db;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;
}

.progress-bar {
    height: 100%;
    background-color: #10b981;
    transition: width 0.3s ease-in-out;
}
</style>
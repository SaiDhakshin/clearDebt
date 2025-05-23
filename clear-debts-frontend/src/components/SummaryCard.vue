<template>
    <div class="summary-card debt-card">
        <h2>Debt Summary</h2>
        <div>
            <div>Total Debt: {{ formatCurrency(totalDebt) }}</div>
        </div>
        <div>
            <div>Total Interest: {{ totalInterest }}%</div>
        </div>
        <div>
            <div>Monthly Payment: {{ formatCurrency(monthlyPayment) }}</div>
        </div>
        <div>
            <div class="danger">Next Due Date: {{ new Date(nextDueDate).toDateString() }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatCurrency } from '@/utils/currencyFormat';
defineProps<{
    totalDebt: string,
    monthlyPayment: string,
    nextDueDate: string,
    totalInterest: string,
}>();


</script>

<style>
.summary-card {
    padding: 15px;
    margin: 15px;
}
</style>
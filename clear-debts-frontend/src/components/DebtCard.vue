<template>
    <div class="debt-card">
        <h2 class="debt-card-title">{{ debt.name }}</h2>
        <p class="text-gray-600 font-bold danger">Due Date: {{ debt?.dueDate?.toDateString() }}</p>
        <div class="text-right">
            <p class="text-red-600 font-bold">Total: ₹{{ debt.totalAmount }} @ {{ debt.interestRate }}%</p>
            <!-- <p class="text-red-600 font-bold">Current Balance: ₹{{ debt.currentBalance }}</p>
            <p class="text-red-600 font-bold">Interest rate: {{ debt.interestRate }}%</p> -->
        </div>
        <div>
            <p class="text-red-600 font-bold">Paying ₹{{ debt.monthlyPayment }}/month — ₹{{ debt.currentBalance }} remaining</p>
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

defineProps<{
    debt: Debt;
}>();
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
</style>
<template>
    <div class="debt-card">
        <h2 class="debt-card-title">{{ debt.name }}</h2>
        <p class="text-gray-600 font-bold danger">Due Date: {{ debt.dueDate.toDateString() }}</p>
        <div class="text-right">
            <p class="text-red-600 font-bold">Total: {{ debt.totalAmount }}</p>
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
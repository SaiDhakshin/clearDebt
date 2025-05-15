
<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue';
import DebtCard from '@/components/DebtCard.vue';
import { useRouter } from 'vue-router';
import { useDebtStore } from '@/stores/debtStore';
import { onMounted, computed } from 'vue';

const router = useRouter();
const DebtStore = useDebtStore();

const debts = computed(() => DebtStore.debts);

onMounted(() => {
    DebtStore.loadDebts();
});
</script>

<template>
    <DefaultLayout>
        <header class="bg-white shadow p-4 text-xl font-bold">
            <h1 class="text-xl font-bold">Clear Debts</h1>
        </header>

        <!-- Main content -->
         <div class="space-y-4">
            <p>Welcome to your debt dashboard! <button class="primary button" @click="router.push('/add')">Add Debt</button><button class="secondary button" @click="router.push('/graph')">Show graph</button></p>
            <div v-if="debts.length" class="debt-card-container">
                <DebtCard
                    v-for="debt in debts"
                    :key="debt.id"
                    :debt="debt"
                    @delete="() => DebtStore.deleteDebt(debt.id)"
                    @edit="() => router.push({ name: 'edit', params: { id: debt.id } })"
                />
            </div>
            <div v-else>
                <p>No Debts to show</p>
            </div>

         </div>
         <footer class="bg-white border-t p-4 text-sm text-center text-gray-500">
            <slot name="footer">
                &copy; 2025 ClearDebts Inc
            </slot>
        </footer>
    </DefaultLayout>
</template>

<style>
.debt-card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    background-color: #213448;
    padding: 15px;
}
</style>
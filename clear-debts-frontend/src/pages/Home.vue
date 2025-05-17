
<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue';
import DebtCard from '@/components/DebtCard.vue';
import { useRouter } from 'vue-router';
import { useDebtStore } from '@/stores/debtStore';
import { onMounted, computed, ref, watch } from 'vue';
import { usePayoffPlanner } from '@/composables/usePayoffPlanner';
import SortDropdown from '@/components/SortDropdown.vue';

const router = useRouter();
const DebtStore = useDebtStore();
const { getStrategy } = usePayoffPlanner();

const debts = computed(() => DebtStore.debts);
// Debt sort
const sortOption = ref('name_asc');
const sortOptions = [
    { label: 'Select', value: '' },
    { label: 'Name ↑', value: 'name_asc' },
    { label: 'Name ↓', value: 'name_desc' },
    { label: 'Amount ↑', value: 'totalAmount_asc' },
    { label: 'Amount ↓', value: 'totalAmount_desc' },
    { label: 'Due Date ↑', value: 'dueDate_asc' },
    { label: 'Due Date ↓', value: 'dueDate_desc' },
]

const sortedDebts = computed(() => {
    const [field,direction] = sortOption.value.split('_');
    return [...debts.value].sort((a,b) => {
        let valA = a[field];
        let valB = b[field];

        if(field === 'amount') {
            valA = parseFloat(valA.replace(/[^0-9.-]+/g,""));
            valB = parseFloat(valB.replace(/[^0-9.-]+/g,""));
        } else if(field === 'duedate') {
            valA = new Date(valA).getTime();
            valB = new Date(valB).getTime();
        }

        if(valA < valB) return direction === 'asc' ? -1 : 1;
        if(valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    })
})
// Startegy sort
const strategyOption = ref('');
const strategyOptions = [
    {label: 'Select', value: ''},
    {label: 'Snowball (Lowest Balance)', value: 'snowball'},
    {label: 'Avalanche (High Interest)', value: 'avalanche'},
]

const plannedDebts = computed(() => {
    return getStrategy(strategyOption.value);
})

const displayDebts = computed(() => {
    if(strategyOption.value) {
        return plannedDebts.value;
    }

    return sortedDebts.value;
})

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
            <p>Welcome to your debt dashboard! <button class="primary button" @click="router.push('/add')">Add Debt</button>
                <button class="secondary button" @click="router.push('/graph')">Show graph</button>
                <SortDropdown v-model="sortOption" label="Sort: " :options="sortOptions" />
                <SortDropdown v-model="strategyOption" label="Strategy: " :options="strategyOptions" />
                {{ strategyOption }}
            </p>
            <div v-if="debts.length" class="debt-card-container">
                <DebtCard
                    v-for="debt in displayDebts"
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
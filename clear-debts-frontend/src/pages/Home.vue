
<script setup>
import DefaultLayout from '@/layout/DefaultLayout.vue';
import DebtCard from '@/components/DebtCard.vue';
import { useRouter } from 'vue-router';
import { useDebtStore } from '@/stores/debtStore';
import { onMounted, computed, ref } from 'vue';
import SortDropdown from '@/components/SortDropdown.vue';

const router = useRouter();
const DebtStore = useDebtStore();

const debts = computed(() => DebtStore.debts);
const sortOption = ref('name_asc');
const sortOptions = [
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
                <SortDropdown v-model="sortOption" label="Sort: " :options="sortOptions"/>
            </p>
            <div v-if="debts.length" class="debt-card-container">
                <DebtCard
                    v-for="debt in sortedDebts"
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
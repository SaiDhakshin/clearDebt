<template>
    <DefaultLayout>
        <header class="bg-white shadow p-4 text-xl font-bold">
            <h1 class="text-xl font-bold">{{ isEdit ? 'Update' : 'Add' }} Debt</h1>
        </header>

        <div class="debt-form">
            <form @submit.prevent="submitDebt">
                <div class="input-group">
                    <label for="name" class="block font-semi-bold mb-1">Name</label>
                    <input type="text" v-model="Debt.name" required class="border p-2 rounded"
                        @input="setDebtValue('name', Debt.name)"
                        @change="setDebtValue('name', Debt.name)" />
                    <p v-if="validationErrors.name" class="danger">
                        {{ validationErrors.name }}
                    </p>
                </div>
                <div class="input-group">
                    <label for="totalAmount" class="block font-semi-bold mb-1">Amount</label>
                    <input type="text" v-model="Debt.totalAmount" required class="border p-2 rounded"
                    @input="setDebtValue('totalAmount', Debt.totalAmount)"
                    @blur="setDebtValue('totalAmount', Debt.totalAmount)" />
                    <p v-if="validationErrors.totalAmount" class="danger">
                        {{ validationErrors.totalAmount }}
                    </p>
                </div>
                <div class="input-group">
                    <label for="dueDate" class="block font-semi-bold mb-1">Due Date</label>
                    <Datepicker v-model="Debt.dueDate" :enable-time-picker="false" hide-input-icon
                        @input="setDebtValue('dueDate', Debt.dueDate)"
                        @blur="setDebtValue('dueDate', Debt.dueDate)"/>
                    <p v-if="validationErrors.dueDate" class="danger">
                        {{ validationErrors.dueDate }}
                    </p>
                </div>
                <button type="submit" class="rounded py-2 px-4 primary-button">
                    {{ isEdit ? 'Update' : 'Add' }} Debt
                </button>
            </form>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DefaultLayout from '@/layout/DefaultLayout.vue';
import { useDebtStore } from '@/stores/debtStore';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useValidation } from '@/composables/useValidation';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const isEdit = computed(() => !!route?.params?.id);

const Debt = ref({
    id: '0',
    name: '',
    totalAmount: 0,
    dueDate: new Date(),
});

const DebtStore = useDebtStore();
const debts = computed(() => DebtStore.debts);

onMounted(() => {
    if(isEdit.value) {
        const toEditDebt = debts.value.find((debt: any) => debt.id === route.params.id);
        if(toEditDebt) {
            Debt.value = { ...toEditDebt };
        } else {
            console.error('Debt not found');
            router.push('/');
        }
    }
})

// Initialize the reusable validation hook
const { values, validationErrors, validate, setValue } = useValidation(Debt);

const submitDebt = () => {
    if(validate()){
        if(isEdit.value){
            DebtStore.updateDebt(Debt.value);
        } else {
            Debt.value.id = Date.now().toString(); // Generate a unique ID
            // Here you would typically send the data to your backend API
            DebtStore.addDebt(Debt.value);
            console.log('Debt submitted:', Debt.value);
            // After submission, redirect to the home page or another page
        }
        router.push('/');
    }
};

const setDebtValue = (key: string, value: any) => {
    setValue(key, value);
};

</script>

<style>
.dp__main {
    width: unset;
}
</style>
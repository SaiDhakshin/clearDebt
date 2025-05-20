<template>
  <DefaultLayout>
    <header class="bg-white shadow p-4 text-xl font-bold">
      <h1 class="text-xl font-bold">{{ isEdit ? "Update" : "Add" }} Debt</h1>
    </header>

    <div class="debt-form">
      <form @submit.prevent="submitDebt">
        <div class="input-group">
          <label for="name" class="block font-semi-bold mb-1">Name</label>
          <input
            type="text"
            v-model="Debt.name"
            required
            class="border p-2 rounded"
            @input="setDebtValue('name', Debt.name)"
            @change="setDebtValue('name', Debt.name)"
          />
          <p v-if="validationErrors.name" class="danger">
            {{ validationErrors.name }}
          </p>
        </div>
        <div class="input-group">
          <label for="totalAmount" class="block font-semi-bold mb-1"
            >Amount</label
          >
          <input
            type="text"
            v-model="Debt.totalAmount"
            required
            class="border p-2 rounded"
            @input="setDebtValue('totalAmount', Debt.totalAmount)"
            @blur="setDebtValue('totalAmount', Debt.totalAmount)"
          />
          <p v-if="validationErrors.totalAmount" class="danger">
            {{ validationErrors.totalAmount }}
          </p>
        </div>
        <div class="input-group">
          <label for="dueDate" class="block font-semi-bold mb-1"
            >Due Date</label
          >
          <Datepicker
            v-model="Debt.dueDate"
            :enable-time-picker="false"
            hide-input-icon
            @input="setDebtValue('dueDate', Debt.dueDate)"
            @blur="setDebtValue('dueDate', Debt.dueDate)"
          />
          <p v-if="validationErrors.dueDate" class="danger">
            {{ validationErrors.dueDate }}
          </p>
        </div>
        <div class="input-group">
          <label for="totalAmount" class="block font-semi-bold mb-1"
            >Interest Rate (p.a)</label
          >
          <input
            type="text"
            v-model="Debt.interestRate"
            required
            class="border p-2 rounded"
            @input="setDebtValue('interestRate', Debt.interestRate)"
            @blur="setDebtValue('interestRate', Debt.interestRate)"
          />
          <p v-if="validationErrors.interestRate" class="danger">
            {{ validationErrors.interestRate }}
          </p>
        </div>
        <div class="input-group">
          <label for="totalAmount" class="block font-semi-bold mb-1"
            >Monthly Payment</label
          >
          <input
            type="text"
            v-model="Debt.monthlyPayment"
            required
            class="border p-2 rounded"
            @input="setDebtValue('monthlyPayment', Debt.monthlyPayment)"
            @blur="setDebtValue('monthlyPayment', Debt.monthlyPayment)"
          />
          <p v-if="validationErrors.monthlyPayment" class="danger">
            {{ validationErrors.monthlyPayment }}
          </p>
        </div>
        <div class="input-group">
          <label for="dueDate" class="block font-semi-bold mb-1"
            >Start Date</label
          >
          <Datepicker
            v-model="Debt.startDate"
            :enable-time-picker="false"
            hide-input-icon
            @input="setDebtValue('startDate', Debt.startDate)"
            @blur="setDebtValue('startDate', Debt.startDate)"
          />
          <p v-if="validationErrors.startDate" class="danger">
            {{ validationErrors.startDate }}
          </p>
        </div>
        <div class="input-group">
          <label for="totalAmount" class="block font-semi-bold mb-1"
            >Payment frequency</label
          >
          <select class="dropdown" v-model="Debt.paymentFrequency">
              <option v-for="option in paymentFrequencies" :value="option.value" :key="option.value">
                  {{ option.label }}
              </option>
          </select>
          <p v-if="validationErrors.paymentFrequency" class="danger">
            {{ validationErrors.paymentFrequency }}
          </p>
        </div>
        <div class="input-group">
          <label for="totalAmount" class="block font-semi-bold mb-1"
            >Current balance</label
          >
          <input
            type="text"
            v-model="Debt.currentBalance"
            required
            class="border p-2 rounded"
            @input="setDebtValue('currentBalance', Debt.currentBalance)"
            @blur="setDebtValue('currentBalance', Debt.currentBalance)"
          />
          <p v-if="validationErrors.currentBalance" class="danger">
            {{ validationErrors.currentBalance }}
          </p>
        </div>
        <button type="submit" class="rounded py-2 px-4 primary button">
          {{ isEdit ? "Update" : "Add" }} Debt
        </button>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import { useDebtStore } from "@/stores/debtStore";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useValidation } from "@/composables/useValidation";
import { onMounted } from "vue";
import { useDebtCalculator } from "@/composables/useDebtCalculator";
import SortDropdown from "@/components/SortDropdown.vue";

const router = useRouter();
const route = useRoute();
const isEdit = computed(() => !!route?.params?.id);

const Debt: any = ref({
  id: "0",
  name: "",
  totalAmount: 0,
  dueDate: new Date(),
  interestRate: 2,
  monthlyPayment: 0,
  startDate: new Date(),
  paymentFrequency: 'monthly',
  currentBalance: 0,
});

const paymentFrequencies = [
  { label: "Monthly", value: 'monthly' },
  { label: "Bi-weekly", value: 'bi-weekly' },
  { label: "Weekly", value: 'weekly' },
];

const DebtStore = useDebtStore();
const debts = computed(() => DebtStore.debts);

onMounted(() => {
  if (isEdit.value) {
    const toEditDebt = debts.value.find(
      (debt: any) => debt.id === route.params.id
    );
    if (toEditDebt) {
      Debt.value = { ...toEditDebt };
    } else {
      console.error("Debt not found");
      router.push("/");
    }
  }
});

// Initialize the reusable validation hook
const { values, validationErrors, validate, setValue } = useValidation(Debt);
const skipKeys: string[] = ["interestAmount", "totalInterestPaid", "monthsToPayoff","amortizationSchedule"]

const submitDebt = () => {
  if (validate(skipKeys)) {
    const enrichedDebt = useDebtCalculator(Debt.value);
    if (isEdit.value) {
      DebtStore.updateDebt(enrichedDebt);
    } else {
      enrichedDebt.id = Date.now().toString(); // Generate a unique ID
      // Here you would typically send the data to your backend API
      DebtStore.addDebt(enrichedDebt);
      console.log("Debt submitted:", enrichedDebt);
      // After submission, redirect to the home page or another page
    }
    router.push("/");
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

import { defineStore } from "pinia";
import type { Debt } from '@/types/Debt';
import { ref } from 'vue';
import { DebtService } from "@/services/DebtService";

export const useDebtStore = defineStore('debt', () => {

    const debts = ref<Debt[]>([]);

    function loadDebts() {
        debts.value = DebtService.getAll();
    }

    function addDebt(debt: Debt) {
        DebtService.add(debt);
        loadDebts();
    }

    function deleteDebt(id: string) {
        DebtService.delete(id);
        loadDebts();
    }

    function updateDebt(updatedDebt: Debt) {
        DebtService.update(updatedDebt);
        loadDebts();
    }

    return {
        debts,
        loadDebts,
        addDebt,
        deleteDebt,
        updateDebt
    }

})
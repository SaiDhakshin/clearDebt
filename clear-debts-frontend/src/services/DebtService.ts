import type { Debt } from "../types/Debt";

let debts: Debt[] = [];

export const DebtService = {
    add(debt: Debt) {
        console.log("Adding debt:", debt);
        debts.push(debt);
    },

    getAll(): Debt[] {
        console.log("Getting all debts:", debts);
        return debts;
    },

    delete(id: string) {
        console.log("Deleting debt with id:", id);
        debts = debts.filter(debt => debt.id !== id);
    },

    update(updatedDebt: Debt) {
        debts = debts.map(debt => debt.id === updatedDebt.id ? updatedDebt : debt);
        console.log("Updated debts:", debts);
    }
}
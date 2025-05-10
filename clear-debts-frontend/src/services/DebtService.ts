import type { Debt } from "../types/Debt";

const storageKey = "debts";

export const DebtService = {
    add(debt: Debt) {
        const debts = this.getAll();
        console.log("Adding debt:", debt);
        debts.push(debt);
        this.saveAll(debts);
    },

    getAll(): Debt[] {
        const debts = localStorage.getItem(storageKey);
        console.log("Getting all debts:", debts);
        const parsed = debts ? JSON.parse(debts) : [];
        return parsed.map((debt: any) => ({
            ...debt,
            dueDate: new Date(debt.dueDate)
        }))
    },

    delete(id: string) {
        console.log("Deleting debt with id:", id);
        const debts = this.getAll().filter(debt => debt.id !== id);
        this.saveAll(debts);
    },

    update(updatedDebt: Debt) {
        const debts = this.getAll().map(debt => debt.id === updatedDebt.id ? updatedDebt : debt);
        console.log("Updated debts:", debts);
        this.saveAll(debts);
    },

    saveAll(debts: Debt[]) {
        console.log("Saving all debts:", debts);
        localStorage.setItem(storageKey, JSON.stringify(debts));
    },
}
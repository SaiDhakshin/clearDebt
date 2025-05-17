import type { Debt } from '@/types/Debt';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function createDebtBarChart(debts: Debt[]) {
    return {
        labels: debts.map((debt: Debt) => debt.name),
        datasets: [
            {
                label: 'Remaining Balance',
                data: debts.map((debt: Debt) => debt.remainingBalance || debt.totalAmount),
                backgroundColor: debts.map(() => getRandomColor()),
            }
        ]
    }
}

export function createDebtPieChart(debts: Debt[]) {
    return {
        labels: debts.map((debt: Debt) => debt.name),
        datasets: [
            {
                label: 'Debt Distribution',
                data: debts.map((debt: Debt) => debt.remainingBalance || debts.totalAmount),
                backgroundColor: debts.map(() => getRandomColor()),
                borderWidth: 1
            }
        ]
    }
}

export function createDebtLineChart(debts: Debt[]) {
    return {
        labels: debts.map((debt: Debt) => debt.name),
        datasets: [
            {
                label: "Remaining balance trend",
                data: debts.map((debt: Debt) => debt.remaningBalance || debt.totalAmount),
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.1
            }
        ]
    }
}
import type { Debt } from "@/types/Debt";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function createDebtBarChart(debts: Debt[]) {
  return {
    labels: debts.map((debt: Debt) => debt.name),
    datasets: [
      {
        label: "Remaining Balance",
        data: debts.map(
          (debt: Debt) => debt.currentBalance || debt.totalAmount
        ),
        backgroundColor: debts.map(() => getRandomColor()),
      },
    ],
  };
}

export function createDebtPieChart(debts: Debt[]) {
  return {
    labels: debts.map((debt: Debt) => debt.name),
    datasets: [
      {
        label: "Debt Distribution",
        data: debts.map(
          (debt: Debt) => debt.currentBalance || debt.totalAmount
        ),
        backgroundColor: debts.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  };
}

export function createDebtLineChart(debts: Debt[]) {
  return {
    labels: debts.map((debt: Debt) => debt.name),
    datasets: [
      {
        label: "Remaining balance trend",
        data: debts.map(
          (debt: Debt) => debt.currentBalance || debt.totalAmount
        ),
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.1,
      },
    ],
  };
}

export function createDebtPayoffLineChart(debt: Debt) {
  const labels = debt?.amortizationSchedule?.map((entry: any) => new Date(entry.paymentDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric'}))

  return {
    labels,
    datasets: [{
      label: 'Remaining Balance',
      borderColor: '#42A5F5',
      backgroundColor: 'rgba(66, 165, 245, 0.2)',
      data: debt?.amortizationSchedule.map((entry: any) => entry.remainingBalance),
      fill: true,
      tension: 0.3
    }]
  }
}

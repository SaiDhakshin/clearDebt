import type { Debt } from "@/types/Debt";

export function getDashboardMetrics(debts: any) {
    let totalDebt = 0;
    let totalInterest = 0;
    let earliestPayment: Date | null = null;
    let monthlySum = 0;

    debts?.forEach((debt: Debt) => {
        totalDebt += Number(debt.currentBalance ?? debt.totalAmount);
        totalInterest += Number(debt.interestRate ?? 0);
        monthlySum += Number(debt.monthlyPayment ?? 0);

        const nextDate = debt.amortizationSchedule?.[0]?.paymentDate;
        if(nextDate && (!earliestPayment || new Date(nextDate) < earliestPayment)) {
            earliestPayment = new Date(nextDate);
        }
    });

    return {
        totalDebt,
        totalInterest,
        avgMonthly: debts?.length ? monthlySum / debts?.length : 0,
        nextPaymentDate: earliestPayment,
    }
}
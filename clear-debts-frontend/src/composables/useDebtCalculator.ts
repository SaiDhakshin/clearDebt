import type { Debt, amortizationEntry } from "@/types/Debt";

export function useDebtCalculator(debt: Debt) {
    const enrichDebt = {...debt};

    const interestRatePerMonth = (debt.interestRate / 100) / 12;
    let balance = debt.currentBalance || debt.totalAmount;
    const monthlyPayment = debt.monthlyPayment;

    let totalInterestPaid = 0;
    let months = 0;
    const schedule: amortizationEntry[] = [];
    let currentDate = new Date(debt.startDate);

    while(balance > 0 && months < 1000) {
        const interest = balance * interestRatePerMonth;
        const principal = Math.min(monthlyPayment - interest, balance);

        balance -= principal;
        totalInterestPaid += interest;

        schedule.push({
            month: months + 1,
            paymentDate: new Date(currentDate),
            principalPaid: principal,
            interestPaid: interest,
            remainingBalance: Math.max(balance,0)
        })

        // Move to the next payment date
        currentDate.setMonth(currentDate.getMonth() + 1);
        months++;
    }

    enrichDebt.interestAmount = enrichDebt.totalAmount - enrichDebt.currentBalance;
    enrichDebt.totalInterestPaid  = parseFloat(totalInterestPaid.toFixed(2));
    enrichDebt.monthsToPayoff = months;
    enrichDebt.payoffDate = schedule[months - 1].paymentDate;
    enrichDebt.amortizationSchedule = schedule;

    return enrichDebt;
}
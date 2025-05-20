import type { Debt, amortizationEntry } from "@/types/Debt";

function getPaymentsPerYear(frequency: Debt["paymentFrequency"]) {
    switch(frequency) {
        case 'weekly': return 52;
        case 'bi-weekly': return 26;
        case 'monthly': return 12;
        default: return 12; // Default to monthly if not recognized 
    }
}

function advanceDate(date: Date, frequency: Debt["paymentFrequency"]) {
    const newDate = new Date(date);

    switch(frequency) {
        case 'weekly':
            newDate.setDate(newDate.getDate() + 7);
            break;
        case 'bi-weekly':
            newDate.setDate(newDate.getDate() + 14);
            break;
        case 'monthly':
        default:
            newDate.setMonth(newDate.getMonth() + 1);
            break;
    }

    return newDate;
}

export function useDebtCalculator(debt: Debt) {
    const enrichDebt = {...debt};

    const paymentsPerYear = getPaymentsPerYear(debt.paymentFrequency);
    const interestRatePerPeriod = (debt.interestRate / 100) / paymentsPerYear;
    let balance = debt.currentBalance || debt.totalAmount;
    const monthlyPayment = debt.monthlyPayment;

    let totalInterestPaid = 0;
    let months = 0;
    const schedule: amortizationEntry[] = [];
    let currentDate = new Date(debt.startDate);

    while(balance > 0 && months < 1000) {
        const interest = balance * interestRatePerPeriod;
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
        currentDate = advanceDate(currentDate, debt.paymentFrequency);
        months++;
    }

    enrichDebt.interestAmount = enrichDebt.totalAmount - enrichDebt.currentBalance;
    enrichDebt.totalInterestPaid  = parseFloat(totalInterestPaid.toFixed(2));
    enrichDebt.monthsToPayoff = months;
    enrichDebt.payoffDate = schedule[months - 1].paymentDate;
    enrichDebt.amortizationSchedule = schedule;

    return enrichDebt;
}
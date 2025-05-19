export interface amortizationEntry {
    month: number;
    paymentDate: Date;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
}

export interface Debt {
  id: string;
  name: string;
  totalAmount: number;
  dueDate: Date;
  interestRate: number;
  monthlyPayment: number;
  startDate: Date;
  paymentFrequency: "monthly" | "weekly" | "bi-weekly";
  currentBalance: number;
  // Calculated fields (added after user submits)
  interestAmount: number;
  totalInterestPaid: number;
  monthsToPayoff: number;
  payoffDate: Date;
  amortizationSchedule: amortizationEntry[];
}

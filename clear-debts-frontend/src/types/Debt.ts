export interface Debt {
    id: string,
    name: string,
    totalAmount: number,
    dueDate: Date,
    interestRate: number,
    monthlyPayment: number,
    startDate: Date,
    paymentFrequency: 'monthly' | 'weekly' | 'bi-weekly',
    currentBalance: number,
}
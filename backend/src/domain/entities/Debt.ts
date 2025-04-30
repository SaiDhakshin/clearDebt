export interface DebtProps {
    id: string;
    name: string;
    totalAmount: number;
    dueDate: Date;
}

export class Debt {
    constructor(public props: DebtProps) {}

    pay(amount: number) {
        this.props.totalAmount -= amount;
    }

    isCleared(): boolean {
        return this.props.totalAmount <= 0;
    }
}
import { Debt } from '../../domain/entities/Debt';
import { DebtRepository } from '../../infrastructure/repositories/DebtRepository';

export class DebtService {
    constructor(private debtRepository: DebtRepository) {}

    createDebt(name: string, totalAmount: number, dueDate: Date): Debt{
        const debt = this.debtRepository.create(name,totalAmount,dueDate);
        return debt;
    }

    listsDebts(): Debt[] {
        return this.debtRepository.getAll();
    }
}
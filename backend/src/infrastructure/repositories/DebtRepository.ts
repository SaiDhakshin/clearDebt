import { Debt } from '../../domain/entities/Debt'
import { DebtId } from '../../domain/value-objects/DebtId'

export class DebtRepository{
    private debts: Debt[] = [];

    create(name: string, totalAmount: number, dueDate: Date){
        const newDebt = new Debt({
            id: DebtId.generate(),
            name,
            totalAmount,
            dueDate
        })

        this.debts.push(newDebt);
        return newDebt;
    }

    getAll(){
        return this.debts;
    }
}
import { Request, Response } from 'express';
import { DebtRepository } from '../../infrastructure/repositories/DebtRepository';
import { DebtService } from '../../application/services/DebtService';

const debtRepo = new DebtRepository();
const debtService = new DebtService(debtRepo);

export class DebtController {
    static getAllDebts(req: Request, res: Response) {
        const debts = debtService.listsDebts();
        res.status(200).json(debts);
    }

    static addDebt(req: Request, res: Response) {
        const { name, totalAmount, dueDate } = req.body;
        const debt = debtService.createDebt(name, totalAmount, new Date(dueDate));
        res.status(201).json(debt);
    }
}

import { Router } from 'express';
import { DebtController } from '../controllers/DebtController';

export const debtRouter = Router();

debtRouter.get('/', DebtController.getAllDebts);
debtRouter.post('/', DebtController.addDebt);
import express from 'express';
import cors from 'cors';
import { debtRouter } from '../presentation/routes/debtRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/debts', debtRouter);
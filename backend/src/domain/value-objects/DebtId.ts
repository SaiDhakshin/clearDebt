import { v4 as uuidv4 } from 'uuid';

export class DebtId {
    static generate(): string {
        return uuidv4();
    }
}
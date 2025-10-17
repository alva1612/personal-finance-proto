export class TransactionModel {
    id?: number;
    amount: number;
    description?: string;
    date: Date;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    
    walletId: number;

    constructor(partial: Partial<TransactionModel>) {
        Object.assign(this, partial);
    }
}

export class CreateTransactionDto extends TransactionModel {
    constructor(partial: Partial<CreateTransactionDto>) {
        super(partial);
    }
}

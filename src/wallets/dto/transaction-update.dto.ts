import { CategoryType } from "generated/prisma";

interface Transaction {
    amount: number;
    category: {
        categoryType: CategoryType;
    }
}

export interface TransactionUpdateDto {
    walletId: number;
    oldTransaction: Transaction;
    newTransaction: Transaction;
}
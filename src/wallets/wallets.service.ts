import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { prisma } from 'src/prisma.client';
import { CategoryType } from 'generated/prisma';
import { WalletRecordResult } from './wallet.types';
import { TransactionUpdateDto } from './dto/transaction-update.dto';

@Injectable()
export class WalletsService {
  create(createWalletDto: CreateWalletDto) {
    return this.getClient().wallet.create({
      data: createWalletDto,
    });
  }

  findAll() {
    return this.getClient().wallet.findMany();
  }

  findOne(id: number) {
    return this.getClient().wallet.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateWalletDto: Partial<UpdateWalletDto>) {
    console.log({ id, updateWalletDto })
    return this.getClient().wallet.update({
      where: { id },
      data: updateWalletDto,
    });
  }

  remove(id: number) {
    return this.getClient().wallet.delete({
      where: { id },
    });
  }

  async runRecord(transactionData: WalletRecordResult) {
    const isExpense = transactionData.category.categoryType === CategoryType.EXPENSE;
    const wallet = await this.findOne(transactionData.walletId);
    console.log({wallet, transactionData, isExpense})
    return this.update(transactionData.walletId, {
      balance: this.calculateNewBalance(wallet.balance, transactionData.amount, isExpense)
    })
  }

  async updateTransaction(updateTransactionDto: TransactionUpdateDto) {
    console.log({updateTransactionDto})
    const { walletId, oldTransaction } = updateTransactionDto;

    const wallet = await this.findOne(walletId);
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const isExpense = oldTransaction.category.categoryType === CategoryType.EXPENSE;

    return this.update(walletId, {
      balance: this.calculateNewBalance(wallet.balance, this.calculateUpdateAmountImpact(updateTransactionDto), isExpense)
    });
  }

  calculateUpdateAmountImpact(updateTransactionDto: TransactionUpdateDto): number {
    const { oldTransaction, newTransaction } = updateTransactionDto;
    const isExpense = oldTransaction.category.categoryType === CategoryType.EXPENSE;

    const amountDifference = oldTransaction.amount - newTransaction.amount;
    return isExpense ? -amountDifference : amountDifference;
  }

  calculateNewBalance(currentBalance, amount, isExpense): number {
    console.log({currentBalance, amount, isExpense})
    const amountDifference = isExpense ? -amount : amount;
    return currentBalance + amountDifference;
  }

  getClient() {
    return prisma;
  }
}

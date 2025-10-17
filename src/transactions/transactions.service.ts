import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { prisma } from 'src/prisma.client';
import { producer } from 'src/kafka.producer';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TransactionsService {
  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.getClient().record.create({
      data: createTransactionDto,
      include: { category: true }
    });
    await producer.connect();
    await producer.send({
      topic: 'transaction_created',
      messages: [{
        value: JSON.stringify(transaction)
      }]
    });
    return transaction;
  }

  findAll() {
    return this.getClient().record.findMany();
  }

  findOne(id: number) {
    return this.getClient().record.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const oldTransaction = await this.getClient().record.findUnique({
      where: { id },
      include: { category: true }
    });
    const newTransaction = await this.getClient().record.update({
      where: { id },
      data: updateTransactionDto,
      include: { category: true }
    });

    if (oldTransaction?.walletId !== newTransaction.walletId) {
      throw new Error('Changing wallet is not supported yet');
    }
    if (oldTransaction?.category.categoryType !== newTransaction.category.categoryType) {
      throw new Error('Changing category type is not supported yet');
    }

    await producer.connect();
    await producer.send({
      topic: 'transaction_updated',
      messages: [{
        value: JSON.stringify({ walletId: oldTransaction.walletId, oldTransaction, newTransaction })
      }]
    });
  }

  remove(id: number) {
    return this.getClient().record.delete({
      where: { id },
    });
  }

  getClient() {
    return prisma
  }
}

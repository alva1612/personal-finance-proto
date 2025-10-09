import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { prisma } from 'src/prisma.client';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return this.getClient().transaction.create({
      data: createTransactionDto,
    });
  }

  findAll() {
    return this.getClient().transaction.findMany();
  }

  findOne(id: number) {
    return this.getClient().transaction.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.getClient().transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.getClient().transaction.delete({
      where: { id },
    });
  }

  getClient() {
    return prisma
  }
}

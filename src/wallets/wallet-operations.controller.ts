import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRecordResult } from './wallet.types';
import { TransactionUpdateDto } from './dto/transaction-update.dto';

@Controller()
export class WalletOperationsController {
  constructor(private readonly walletsService: WalletsService) {}

  @MessagePattern('createWallet')
  create(@Payload() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @MessagePattern('findAllWallets')
  findAll() {
    return this.walletsService.findAll();
  }

  @MessagePattern('findOneWallet')
  findOne(@Payload() id: number) {
    return this.walletsService.findOne(id);
  }

  @MessagePattern('removeWallet')
  remove(@Payload() id: number) {
    return this.walletsService.remove(id);
  }

  @MessagePattern('transaction_created')
  async handleTransactionCreated(@Payload() message: WalletRecordResult) {
    console.log({message})
    const wallet = await this.walletsService.runRecord(message);
    console.log('Received transaction:', message);
  }

  @MessagePattern('transaction_updated')
  update(@Payload() updateWalletDto: TransactionUpdateDto) {
    return this.walletsService.updateTransaction(updateWalletDto);
  }
}

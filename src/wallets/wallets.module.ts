import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletOperationsController } from './wallet-operations.controller';
import { WalletsController } from './wallets.controller';

@Module({
  controllers: [WalletOperationsController, WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}

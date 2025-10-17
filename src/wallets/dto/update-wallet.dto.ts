import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  id: number;
  constructor(partial: Partial<UpdateWalletDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

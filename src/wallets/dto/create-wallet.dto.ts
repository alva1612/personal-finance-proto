export class WalletModel {
    id?: number;
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<WalletModel>) {
        Object.assign(this, partial);
    }
}

export class CreateWalletDto extends WalletModel {
    constructor(partial: Partial<CreateWalletDto>) {
        super(partial);
    }
}

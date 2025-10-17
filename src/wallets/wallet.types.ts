import { Prisma } from "generated/prisma";
import { prisma } from "src/prisma.client";

export type WalletRecordResult =  Prisma.Result<typeof prisma.record, { include: {category: true} } , 'create'>
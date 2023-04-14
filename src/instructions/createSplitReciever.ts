import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateSplitRecieverArgs {
  individualSplitAmount: BN
}

export interface CreateSplitRecieverAccounts {
  split: PublicKey
  splitWallet: PublicKey
  authority: PublicKey
  receiver: PublicKey
  receiverWallet: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.u64("individualSplitAmount")])

export function createSplitReciever(
  args: CreateSplitRecieverArgs,
  accounts: CreateSplitRecieverAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.split, isSigner: false, isWritable: true },
    { pubkey: accounts.splitWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.receiver, isSigner: false, isWritable: true },
    { pubkey: accounts.receiverWallet, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([12, 86, 181, 46, 236, 2, 124, 137])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      individualSplitAmount: args.individualSplitAmount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

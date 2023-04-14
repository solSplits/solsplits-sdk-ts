import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateSplitReceiverArgs {
  amount: BN
}

export interface UpdateSplitReceiverAccounts {
  split: PublicKey
  splitWallet: PublicKey
  authority: PublicKey
  receiver: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.u64("amount")])

export function updateSplitReceiver(
  args: UpdateSplitReceiverArgs,
  accounts: UpdateSplitReceiverAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.split, isSigner: false, isWritable: true },
    { pubkey: accounts.splitWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.receiver, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([222, 51, 78, 252, 13, 151, 136, 173])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      amount: args.amount,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

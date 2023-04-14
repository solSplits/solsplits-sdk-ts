import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface UpdateSplitArgs {
  public: boolean
}

export interface UpdateSplitAccounts {
  config: PublicKey
  split: PublicKey
  authority: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([borsh.bool("public")])

export function updateSplit(
  args: UpdateSplitArgs,
  accounts: UpdateSplitAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.config, isSigner: false, isWritable: true },
    { pubkey: accounts.split, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([56, 99, 213, 74, 47, 72, 16, 202])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      public: args.public,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

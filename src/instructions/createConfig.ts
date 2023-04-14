import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateConfigAccounts {
  config: PublicKey
  authority: PublicKey
  treasury: PublicKey
  systemProgram: PublicKey
}

export function createConfig(accounts: CreateConfigAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.config, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.treasury, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([201, 207, 243, 114, 75, 111, 47, 189])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

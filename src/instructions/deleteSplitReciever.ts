import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeleteSplitRecieverAccounts {
  split: PublicKey
  splitWallet: PublicKey
  authority: PublicKey
  receiver: PublicKey
  systemProgram: PublicKey
}

export function deleteSplitReciever(accounts: DeleteSplitRecieverAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.split, isSigner: false, isWritable: true },
    { pubkey: accounts.splitWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.receiver, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([26, 218, 184, 165, 44, 76, 90, 204])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

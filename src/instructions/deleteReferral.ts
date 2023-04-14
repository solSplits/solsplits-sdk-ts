import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DeleteReferralAccounts {
  config: PublicKey
  authority: PublicKey
  referral: PublicKey
  systemProgram: PublicKey
}

export function deleteReferral(accounts: DeleteReferralAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.config, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.referral, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([56, 71, 252, 105, 78, 122, 111, 12])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

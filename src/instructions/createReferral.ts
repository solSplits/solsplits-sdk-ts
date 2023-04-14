import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CreateReferralArgs {
  kind: number
  feeFlat: BN
  feePercentage: BN
  owner: PublicKey
}

export interface CreateReferralAccounts {
  config: PublicKey
  authority: PublicKey
  referral: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u8("kind"),
  borsh.u64("feeFlat"),
  borsh.u64("feePercentage"),
  borsh.publicKey("owner"),
])

export function createReferral(
  args: CreateReferralArgs,
  accounts: CreateReferralAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.config, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.referral, isSigner: true, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([61, 17, 240, 245, 172, 66, 159, 232])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      kind: args.kind,
      feeFlat: args.feeFlat,
      feePercentage: args.feePercentage,
      owner: args.owner,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

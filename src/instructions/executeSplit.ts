import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ExecuteSplitArgs {
  lamports: boolean
  feePayer: boolean
}

export interface ExecuteSplitAccounts {
  config: PublicKey
  split: PublicKey
  splitWallet: PublicKey
  authority: PublicKey
  authorityTokenAccount: PublicKey
  feeWallet: PublicKey
  feeTokenAccount: PublicKey
  referral: PublicKey
  receiver0: PublicKey
  receiver1: PublicKey
  receiver2: PublicKey
  receiver3: PublicKey
  receiver4: PublicKey
  receiver5: PublicKey
  receiver6: PublicKey
  receiver7: PublicKey
  receiver8: PublicKey
  receiver9: PublicKey
  receiver0Wallet: PublicKey
  receiver1Wallet: PublicKey
  receiver2Wallet: PublicKey
  receiver3Wallet: PublicKey
  receiver4Wallet: PublicKey
  receiver5Wallet: PublicKey
  receiver6Wallet: PublicKey
  receiver7Wallet: PublicKey
  receiver8Wallet: PublicKey
  receiver9Wallet: PublicKey
  mint: PublicKey
  splitTokenAccount: PublicKey
  receiver0WalletTokenAccount: PublicKey
  receiver1WalletTokenAccount: PublicKey
  receiver2WalletTokenAccount: PublicKey
  receiver3WalletTokenAccount: PublicKey
  receiver4WalletTokenAccount: PublicKey
  receiver5WalletTokenAccount: PublicKey
  receiver6WalletTokenAccount: PublicKey
  receiver7WalletTokenAccount: PublicKey
  receiver8WalletTokenAccount: PublicKey
  receiver9WalletTokenAccount: PublicKey
  tokenProgram: PublicKey
  associatedTokenProgram: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.bool("lamports"),
  borsh.bool("feePayer"),
])

export function executeSplit(
  args: ExecuteSplitArgs,
  accounts: ExecuteSplitAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.config, isSigner: false, isWritable: true },
    { pubkey: accounts.split, isSigner: false, isWritable: true },
    { pubkey: accounts.splitWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    {
      pubkey: accounts.authorityTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.feeWallet, isSigner: false, isWritable: true },
    { pubkey: accounts.feeTokenAccount, isSigner: false, isWritable: true },
    { pubkey: accounts.referral, isSigner: false, isWritable: false },
    { pubkey: accounts.receiver0, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver1, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver2, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver3, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver4, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver5, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver6, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver7, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver8, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver9, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver0Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver1Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver2Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver3Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver4Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver5Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver6Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver7Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver8Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.receiver9Wallet, isSigner: false, isWritable: true },
    { pubkey: accounts.mint, isSigner: false, isWritable: true },
    { pubkey: accounts.splitTokenAccount, isSigner: false, isWritable: true },
    {
      pubkey: accounts.receiver0WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver1WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver2WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver3WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver4WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver5WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver6WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver7WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver8WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: accounts.receiver9WalletTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    {
      pubkey: accounts.associatedTokenProgram,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([6, 45, 171, 40, 49, 129, 23, 89])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      lamports: args.lamports,
      feePayer: args.feePayer,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}

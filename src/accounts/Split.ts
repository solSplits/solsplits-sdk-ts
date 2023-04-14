import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SplitFields {
  authority: PublicKey
  wallet: PublicKey
  public: boolean
  totalReceivers: number
  totalSplitAmount: BN
  id: BN
  bump: number
}

export interface SplitJSON {
  authority: string
  wallet: string
  public: boolean
  totalReceivers: number
  totalSplitAmount: string
  id: string
  bump: number
}

export class Split {
  readonly authority: PublicKey
  readonly wallet: PublicKey
  readonly public: boolean
  readonly totalReceivers: number
  readonly totalSplitAmount: BN
  readonly id: BN
  readonly bump: number

  static readonly discriminator = Buffer.from([
    166, 254, 141, 46, 23, 221, 129, 195,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.publicKey("wallet"),
    borsh.bool("public"),
    borsh.u8("totalReceivers"),
    borsh.u64("totalSplitAmount"),
    borsh.u128("id"),
    borsh.u8("bump"),
  ])

  constructor(fields: SplitFields) {
    this.authority = fields.authority
    this.wallet = fields.wallet
    this.public = fields.public
    this.totalReceivers = fields.totalReceivers
    this.totalSplitAmount = fields.totalSplitAmount
    this.id = fields.id
    this.bump = fields.bump
  }

  static async fetch(c: Connection, address: PublicKey): Promise<Split | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(PROGRAM_ID)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[]
  ): Promise<Array<Split | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(PROGRAM_ID)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): Split {
    if (!data.slice(0, 8).equals(Split.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Split.layout.decode(data.slice(8))

    return new Split({
      authority: dec.authority,
      wallet: dec.wallet,
      public: dec.public,
      totalReceivers: dec.totalReceivers,
      totalSplitAmount: dec.totalSplitAmount,
      id: dec.id,
      bump: dec.bump,
    })
  }

  toJSON(): SplitJSON {
    return {
      authority: this.authority.toString(),
      wallet: this.wallet.toString(),
      public: this.public,
      totalReceivers: this.totalReceivers,
      totalSplitAmount: this.totalSplitAmount.toString(),
      id: this.id.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: SplitJSON): Split {
    return new Split({
      authority: new PublicKey(obj.authority),
      wallet: new PublicKey(obj.wallet),
      public: obj.public,
      totalReceivers: obj.totalReceivers,
      totalSplitAmount: new BN(obj.totalSplitAmount),
      id: new BN(obj.id),
      bump: obj.bump,
    })
  }
}

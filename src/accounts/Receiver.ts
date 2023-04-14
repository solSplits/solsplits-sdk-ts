import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ReceiverFields {
  split: PublicKey
  parentSplit: PublicKey
  authority: PublicKey
  treasury: PublicKey
  individualSplitAmount: BN
  bump: number
}

export interface ReceiverJSON {
  split: string
  parentSplit: string
  authority: string
  treasury: string
  individualSplitAmount: string
  bump: number
}

export class Receiver {
  readonly split: PublicKey
  readonly parentSplit: PublicKey
  readonly authority: PublicKey
  readonly treasury: PublicKey
  readonly individualSplitAmount: BN
  readonly bump: number

  static readonly discriminator = Buffer.from([
    114, 15, 132, 64, 170, 10, 171, 215,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("split"),
    borsh.publicKey("parentSplit"),
    borsh.publicKey("authority"),
    borsh.publicKey("treasury"),
    borsh.u64("individualSplitAmount"),
    borsh.u8("bump"),
  ])

  constructor(fields: ReceiverFields) {
    this.split = fields.split
    this.parentSplit = fields.parentSplit
    this.authority = fields.authority
    this.treasury = fields.treasury
    this.individualSplitAmount = fields.individualSplitAmount
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<Receiver | null> {
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
  ): Promise<Array<Receiver | null>> {
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

  static decode(data: Buffer): Receiver {
    if (!data.slice(0, 8).equals(Receiver.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Receiver.layout.decode(data.slice(8))

    return new Receiver({
      split: dec.split,
      parentSplit: dec.parentSplit,
      authority: dec.authority,
      treasury: dec.treasury,
      individualSplitAmount: dec.individualSplitAmount,
      bump: dec.bump,
    })
  }

  toJSON(): ReceiverJSON {
    return {
      split: this.split.toString(),
      parentSplit: this.parentSplit.toString(),
      authority: this.authority.toString(),
      treasury: this.treasury.toString(),
      individualSplitAmount: this.individualSplitAmount.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: ReceiverJSON): Receiver {
    return new Receiver({
      split: new PublicKey(obj.split),
      parentSplit: new PublicKey(obj.parentSplit),
      authority: new PublicKey(obj.authority),
      treasury: new PublicKey(obj.treasury),
      individualSplitAmount: new BN(obj.individualSplitAmount),
      bump: obj.bump,
    })
  }
}

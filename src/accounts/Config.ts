import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ConfigFields {
  authority: PublicKey
  treasury: PublicKey
  splitsCreated: BN
  bump: number
}

export interface ConfigJSON {
  authority: string
  treasury: string
  splitsCreated: string
  bump: number
}

export class Config {
  readonly authority: PublicKey
  readonly treasury: PublicKey
  readonly splitsCreated: BN
  readonly bump: number

  static readonly discriminator = Buffer.from([
    155, 12, 170, 224, 30, 250, 204, 130,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.publicKey("treasury"),
    borsh.u128("splitsCreated"),
    borsh.u8("bump"),
  ])

  constructor(fields: ConfigFields) {
    this.authority = fields.authority
    this.treasury = fields.treasury
    this.splitsCreated = fields.splitsCreated
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<Config | null> {
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
  ): Promise<Array<Config | null>> {
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

  static decode(data: Buffer): Config {
    if (!data.slice(0, 8).equals(Config.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Config.layout.decode(data.slice(8))

    return new Config({
      authority: dec.authority,
      treasury: dec.treasury,
      splitsCreated: dec.splitsCreated,
      bump: dec.bump,
    })
  }

  toJSON(): ConfigJSON {
    return {
      authority: this.authority.toString(),
      treasury: this.treasury.toString(),
      splitsCreated: this.splitsCreated.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: ConfigJSON): Config {
    return new Config({
      authority: new PublicKey(obj.authority),
      treasury: new PublicKey(obj.treasury),
      splitsCreated: new BN(obj.splitsCreated),
      bump: obj.bump,
    })
  }
}

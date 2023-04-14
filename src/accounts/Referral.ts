import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ReferralFields {
  owner: PublicKey
  kind: number
  feePercentage: BN
  feeFlat: BN
  currentFees: BN
  lastWithdrawlDate: BN
}

export interface ReferralJSON {
  owner: string
  kind: number
  feePercentage: string
  feeFlat: string
  currentFees: string
  lastWithdrawlDate: string
}

export class Referral {
  readonly owner: PublicKey
  readonly kind: number
  readonly feePercentage: BN
  readonly feeFlat: BN
  readonly currentFees: BN
  readonly lastWithdrawlDate: BN

  static readonly discriminator = Buffer.from([
    30, 235, 136, 224, 106, 107, 49, 64,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("owner"),
    borsh.u8("kind"),
    borsh.u64("feePercentage"),
    borsh.u64("feeFlat"),
    borsh.u64("currentFees"),
    borsh.i64("lastWithdrawlDate"),
  ])

  constructor(fields: ReferralFields) {
    this.owner = fields.owner
    this.kind = fields.kind
    this.feePercentage = fields.feePercentage
    this.feeFlat = fields.feeFlat
    this.currentFees = fields.currentFees
    this.lastWithdrawlDate = fields.lastWithdrawlDate
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<Referral | null> {
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
  ): Promise<Array<Referral | null>> {
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

  static decode(data: Buffer): Referral {
    if (!data.slice(0, 8).equals(Referral.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Referral.layout.decode(data.slice(8))

    return new Referral({
      owner: dec.owner,
      kind: dec.kind,
      feePercentage: dec.feePercentage,
      feeFlat: dec.feeFlat,
      currentFees: dec.currentFees,
      lastWithdrawlDate: dec.lastWithdrawlDate,
    })
  }

  toJSON(): ReferralJSON {
    return {
      owner: this.owner.toString(),
      kind: this.kind,
      feePercentage: this.feePercentage.toString(),
      feeFlat: this.feeFlat.toString(),
      currentFees: this.currentFees.toString(),
      lastWithdrawlDate: this.lastWithdrawlDate.toString(),
    }
  }

  static fromJSON(obj: ReferralJSON): Referral {
    return new Referral({
      owner: new PublicKey(obj.owner),
      kind: obj.kind,
      feePercentage: new BN(obj.feePercentage),
      feeFlat: new BN(obj.feeFlat),
      currentFees: new BN(obj.currentFees),
      lastWithdrawlDate: new BN(obj.lastWithdrawlDate),
    })
  }
}

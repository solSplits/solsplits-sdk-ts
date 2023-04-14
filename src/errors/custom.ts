export type CustomError =
  | SplitNotEmpty
  | SplitIsPrivate
  | SplitAmountExceeded
  | IncorrectSplitAccount
  | IncorrectSplitAmounts
  | IncorrectreceiverAccount
  | InvalidReceiverIndex

export class SplitNotEmpty extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "SplitNotEmpty"

  constructor(readonly logs?: string[]) {
    super("6000: ")
  }
}

export class SplitIsPrivate extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "SplitIsPrivate"

  constructor(readonly logs?: string[]) {
    super("6001: ")
  }
}

export class SplitAmountExceeded extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "SplitAmountExceeded"

  constructor(readonly logs?: string[]) {
    super("6002: ")
  }
}

export class IncorrectSplitAccount extends Error {
  static readonly code = 6003
  readonly code = 6003
  readonly name = "IncorrectSplitAccount"

  constructor(readonly logs?: string[]) {
    super("6003: ")
  }
}

export class IncorrectSplitAmounts extends Error {
  static readonly code = 6004
  readonly code = 6004
  readonly name = "IncorrectSplitAmounts"

  constructor(readonly logs?: string[]) {
    super("6004: ")
  }
}

export class IncorrectreceiverAccount extends Error {
  static readonly code = 6005
  readonly code = 6005
  readonly name = "IncorrectreceiverAccount"

  constructor(readonly logs?: string[]) {
    super("6005: ")
  }
}

export class InvalidReceiverIndex extends Error {
  static readonly code = 6006
  readonly code = 6006
  readonly name = "InvalidReceiverIndex"

  constructor(readonly logs?: string[]) {
    super("6006: ")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new SplitNotEmpty(logs)
    case 6001:
      return new SplitIsPrivate(logs)
    case 6002:
      return new SplitAmountExceeded(logs)
    case 6003:
      return new IncorrectSplitAccount(logs)
    case 6004:
      return new IncorrectSplitAmounts(logs)
    case 6005:
      return new IncorrectreceiverAccount(logs)
    case 6006:
      return new InvalidReceiverIndex(logs)
  }

  return null
}

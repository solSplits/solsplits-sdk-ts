export type { ConfigFields, ConfigJSON } from "./accounts/Config"
export type { SplitFields, SplitJSON } from "./accounts/Split"
export type { ReceiverFields, ReceiverJSON } from "./accounts/Receiver"
export type { ReferralFields, ReferralJSON } from "./accounts/Referral"
export type { CreateConfigAccounts } from "./instructions/createConfig"
export type { UpdateConfigAccounts } from "./instructions/updateConfig"
export type { DeleteConfigAccounts } from "./instructions/deleteConfig"
export type { CreateSplitArgs, CreateSplitAccounts } from "./instructions/createSplit"
export type { UpdateSplitArgs, UpdateSplitAccounts } from "./instructions/updateSplit"
export type { DeleteSplitAccounts } from "./instructions/deleteSplit"
export type {
  CreateSplitRecieverArgs,
  CreateSplitRecieverAccounts,
} from "./instructions/createSplitReciever"
export type {
  UpdateSplitReceiverArgs,
  UpdateSplitReceiverAccounts,
} from "./instructions/updateSplitReceiver"
export type { DeleteSplitRecieverAccounts } from "./instructions/deleteSplitReciever"
export type { ExecuteSplitArgs, ExecuteSplitAccounts } from "./instructions/executeSplit"
export type {
  CreateReferralArgs,
  CreateReferralAccounts,
} from "./instructions/createReferral"
export type {
  UpdateReferralArgs,
  UpdateReferralAccounts,
} from "./instructions/updateReferral"
export type { DeleteReferralAccounts } from "./instructions/deleteReferral"

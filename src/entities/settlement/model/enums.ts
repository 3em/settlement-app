import type { iSettlement } from 'entities/settlement/model/types'

export enum SettlementStatus {
  SUBMITTED = 'submitted',
  COUNTER_OFFERED = 'counter-offered',
  SETTLED = 'settled',
  UNSETTLED = 'unsettled'
}

export enum SettlementResponse {
  AGREE = 'agree',
  DISPUTE = 'dispute'
}

export const DEFAULT_SETTLEMENT_DATA: iSettlement = {
  amount: 0,
  response: null,
  status: SettlementStatus.UNSETTLED,
  counterOffer: null
}

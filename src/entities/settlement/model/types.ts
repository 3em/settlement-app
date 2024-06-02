import type {
  SettlementResponse,
  SettlementStatus
} from 'entities/settlement/model/enums'

/**
 * Settlement data model
 */
export type iSettlement<T extends object = object> = T & {
  amount: number,
  response: `${SettlementResponse}` | null,
  status: `${SettlementStatus}`,
  counterOffer: number | null
}

/**
 * Request data model
 */
export type iSettlementRequest = Partial<Pick<iSettlement, 'amount' | 'response' | 'counterOffer'>>

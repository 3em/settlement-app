import { DEFAULT_SETTLEMENT_DATA } from 'entities/settlement/model/enums'

/**
 * Check if data is iSettlement type
 * @param data
 */
export const hasAllSettlementKeys = (data: unknown) => {
  if (typeof data !== 'object' || Array.isArray(data) || !data) return false

  const objKeys = Object.keys(data)

  return objKeys.length === Object.keys(DEFAULT_SETTLEMENT_DATA).length &&
    objKeys.every(key => key in DEFAULT_SETTLEMENT_DATA)
}

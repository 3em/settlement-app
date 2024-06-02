import type {
  iSettlement,
  iSettlementRequest
} from 'entities/settlement/model/types'
import { abstractApi } from 'shared/lib/axios'
import { HttpMethod } from 'shared/model/enums'

const url = '/settlement'

/**
 * Get settlement data
 */
export const getSettlement = async () => {
  return await abstractApi<iSettlement>(
    HttpMethod.GET,
    url
  )
}

/**
 * Post settlement data
 * @param data
 */
export const postSettlement = async (data: iSettlementRequest) => {
  return await abstractApi<iSettlement>(
    HttpMethod.POST,
    url,
    {
      data
    }
  )
}

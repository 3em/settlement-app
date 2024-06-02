import { NextApiRequest, NextApiResponse } from 'next'
import { sendEventToAllClients } from './events'
import type { iSettlement } from 'entities/settlement/model/types'
import { SettlementResponse, SettlementStatus } from 'entities/settlement/model/enums'
import type { ResponseData } from 'shared/model/types'
import { ResponseStatus } from 'shared/model/enums'

let settlementData: iSettlement = {
  amount: 0,
  response: null,
  status: SettlementStatus.UNSETTLED,
  counterOffer: null,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<iSettlement>>
) => {
  if (req.method === 'GET') {

    res.status(200).json({
      status: ResponseStatus.SUCCESS,
      data: settlementData
    })

  } else if (req.method === 'POST') {

    const { amount, response, counterOffer } = req.body

    if (amount !== undefined) {
      settlementData.status = SettlementStatus.SUBMITTED
      settlementData.amount = amount
      settlementData.counterOffer = null
    }

    if (response !== undefined) {
      settlementData.response = response
      settlementData.status = response === SettlementResponse.AGREE
        ? SettlementStatus.SETTLED
        : SettlementStatus.UNSETTLED
    }

    if (counterOffer !== undefined) {
      settlementData.counterOffer = counterOffer
      settlementData.status = SettlementStatus.COUNTER_OFFERED
      settlementData.response = SettlementResponse.DISPUTE
    }

    sendEventToAllClients(settlementData)
    res.status(200).json({
      status: ResponseStatus.SUCCESS,
      data: settlementData
    })
  } else {
    res.status(405).end()
  }
}

export default handler

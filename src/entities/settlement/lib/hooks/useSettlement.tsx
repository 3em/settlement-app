import {
  useCallback,
  useEffect,
  useState
} from 'react'
import isEqual from 'lodash.isequal'
import type { iSettlementRequest } from 'entities/settlement/model/types'
import {
  DEFAULT_SETTLEMENT_DATA,
  SettlementResponse
} from 'entities/settlement/model/enums'
import {
  getSettlement,
  postSettlement
} from 'entities/settlement/api'
import { ResponseStatus } from 'shared/model/enums'
import { hasAllSettlementKeys } from 'entities/settlement/lib/utils/hasAllSettlementKeys'

/**
 * Hook for settlement data
 * @param isPartyA
 */
export const useSettlement = (isPartyA = false) => {
  const [data, setData] = useState(DEFAULT_SETTLEMENT_DATA)

  /**
   * Fetch data on mount
   * If isPartyB
   * - Open SSE connection for data fetching
   */
  useEffect(() => {
    fetchData()

    if (isPartyA) return

    const eventSource = new EventSource('/api/events')
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data)

      if (!hasAllSettlementKeys(newData)) return

      setData(newData)
    }

    return () => {
      eventSource.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Fetch data method
   * - if withCompare
   * - will compare state data vs response data and return boolean state of isDataEqual
    * @param withCompare
   */
  const fetchData = async (withCompare = false) => {
    let isDataEqual = true
    const { status, data: newData } = await getSettlement()

    if (status === ResponseStatus.ERROR) return

    if (withCompare) {
      isDataEqual = isEqual(newData, data)
      setData(newData)
      return isDataEqual
    }

    setData(newData)
  }

  /**
   * Post settlement data handler
   */
  const handleSubmit = useCallback(async (requestData: iSettlementRequest) => {
    const { status, data: newData } = await postSettlement(requestData)

    if (status === ResponseStatus.ERROR) return

    setData(newData)
  }, [])

  /**
   * Result block
   * - if on process show general data info depends on Party
   * - if data response agree show common agreement result
   * @constructor
   */
  const ResultBlock = () => {
    return (
      <div className='mt-4'>
        <h3 className='text-xl font-semibold'>
          {data.response !== SettlementResponse.AGREE
            ? 'Current Status:'
            : `Agreement reached with amount ${data.amount}!`
          }
        </h3>
        {data.response !== SettlementResponse.AGREE && (
          <>
            <p>
              Amount:&nbsp;
              {data.amount}
            </p>
            {isPartyA && !!data.counterOffer
              ? <p>
                Counter Offer:&nbsp;
                {data.counterOffer}
              </p>
              : null}
          </>
        )}
      </div>
    )
  }

  return {
    handleSubmit,
    fetchData,
    ResultBlock,
    setData,
    data,
    isAgree: data.response === SettlementResponse.AGREE
  }
}

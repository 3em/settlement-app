import { useMemo } from 'react'
import { useSettlement } from 'entities/settlement/lib/hooks/useSettlement'
import { AmountForm } from 'entities/settlement/ui/AmountForm'
import { SettlementStatus } from 'entities/settlement/model/enums'

export const PartyA = () => {
  const {
    data,
    ResultBlock,
    handleSubmit,
    fetchData,
    isAgree
  } = useSettlement(true)

  /**
   * Return fetchData handler if data was already submitted
   * need for blocking fetchData on first submit
   */
  const handleFetchData = useMemo(() => {
    return data.status === SettlementStatus.SUBMITTED ? fetchData : undefined
  }, [data.status, fetchData])

  return (
    <div className='p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl mb-4 font-semibold'>
        Party A
      </h2>
      {!isAgree && (
        <AmountForm
          submitKey='amount'
          handleSubmit={handleSubmit}
          fetchData={handleFetchData}
        />
      )}
      {ResultBlock()}
    </div>
  )
}

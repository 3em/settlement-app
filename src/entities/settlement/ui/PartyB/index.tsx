import { useMemo } from 'react'
import clsx from 'clsx'
import { useSettlement } from 'entities/settlement/lib/hooks/useSettlement'
import {
  SettlementResponse,
  SettlementStatus
} from 'entities/settlement/model/enums'
import { AmountForm } from 'entities/settlement/ui/AmountForm'

export const PartyB = () => {
  const {
    ResultBlock,
    handleSubmit,
    data,
    isAgree
  } = useSettlement()

  /**
   * Handle agreement
   */
  const handleAgree = () => {
    handleSubmit({ response: SettlementResponse.AGREE })
  }

  /**
   * Disable status, when PartyB send request
   */
  const disabled = useMemo(() => {
    return data.status !== SettlementStatus.SUBMITTED
  }, [data.status])

  return (
    <div className='p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl mb-4 font-semibold'>
        Party B
      </h2>
      {ResultBlock()}
      {!isAgree && (
        <>
          <AmountForm
            submitKey='counterOffer'
            buttonText='Submit Counter Offer'
            handleSubmit={handleSubmit}
            disabled={disabled}
          />
          <button
            disabled={disabled}
            onClick={handleAgree}
            className={clsx(
              'px-4 py-2 bg-green-500 text-white rounded mr-2 mt-4',
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            )}
          >
            Agree
          </button>
        </>
      )}
    </div>
  )
}

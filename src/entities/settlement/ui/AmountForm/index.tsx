import {
  memo,
  useMemo,
  useRef,
  useState
} from 'react'
import type {
  FormEvent,
  MutableRefObject
} from 'react'
import clsx from 'clsx'
import debounce from 'lodash.debounce'
import type { iSettlementRequest } from 'entities/settlement/model/types'

interface iAmountFormProps {
  handleSubmit: (requestData: iSettlementRequest) => Promise<void>,
  submitKey: keyof Omit<iSettlementRequest, 'response'>,
  fetchData?: (withCompare?: boolean) => Promise<boolean | undefined>,
  disabled?: boolean,
  buttonText?: string
}

export const AmountForm = memo(({
  submitKey,
  handleSubmit,
  fetchData,
  disabled = false,
  buttonText = 'Submit'
}: iAmountFormProps) => {
  const [amount, setAmount] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  /**
   * Submit amount data
   * @param e
   */
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    if (disabled) return
    setShowAlert(false)

    /**
     * If fetchData exist in props call it before submitting.
     * Result from fetch show isDataEqual at state vs response.
     * If not equal - show alert and block submit
      */
    if (fetchData) {
      const isDataEqual = await fetchData(true)
      if (typeof isDataEqual === 'undefined') return

      setShowAlert(!isDataEqual)
      inputRef.current.focus()
      if (!isDataEqual) return
    }

    await handleSubmit({
      [submitKey]: amount
    })

    setAmount(0)
  }

  /**
   * Debounce changing data state
   */
  const onChangeAmount = useMemo(() => (
    debounce(setAmount, 200)
  ), [])

  return (
    <form
      name='amountForm'
      onSubmit={onSubmitHandler}
      className='mt-4'
    >
      <input
        key={amount}
        ref={inputRef}
        autoFocus={!disabled}
        disabled={disabled}
        type='number'
        defaultValue={amount}
        onChange={e => onChangeAmount(Number(e.target.value))}
        className='border p-2 mb-4 w-full'
      />
      {showAlert
        ? (
          <div
            className='bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mb-4'
            role='alert'
          >
            <div className='flex items-center'>
              <svg
                className='fill-current h-5 w-5 text-teal-500 mr-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
              </svg>
              <div>
                <p className='font-bold'>
                  The data has changed.
                </p>
                <p className='text-sm'>
                  Please check the changed data before submitting.
                </p>
              </div>
              <button
                type='button'
                className='ml-auto'
                onClick={() => setShowAlert(false)}
              >
                <svg
                  className='fill-current h-6 w-6 text-teal-500 hover:text-teal-600'
                  role='button'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <title>
                    Close
                  </title>
                  <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                </svg>
              </button>
            </div>
          </div>
        )
        : null}
      <button
        disabled={disabled}
        type='submit'
        className={clsx(
          'px-4 py-2 bg-blue-500 text-white rounded mr-2',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        )}
      >
        {buttonText}
      </button>
    </form>
  )
})

AmountForm.displayName = 'AmountForm'

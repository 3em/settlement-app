import { useState } from 'react'
import dynamic from 'next/dynamic'

const PartyALazy = dynamic(() => import('entities/settlement').then((mod) => mod.PartyA))
const PartyBLazy = dynamic(() => import('entities/settlement').then((mod) => mod.PartyB))

export const HomePage = () => {
  const [party, setParty] = useState<'A' | 'B' | null>(null)

  if (!party) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-3xl font-semibold mb-6'>
          Choose your role
        </h1>
        <div className='flex space-x-4'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={() => setParty('A')}
          >
            Party A
          </button>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            onClick={() => setParty('B')}
          >
            Party B
          </button>
        </div>
      </div>
    )
  }

  return party === 'A' ? <PartyALazy /> : <PartyBLazy />
}

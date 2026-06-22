import Essentials from '@/components/modules/home/offer/toggle/Electronics'
import { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div className="py-8 text-center text-gray-400">Loading...</div>}>
        <Essentials></Essentials>
      </Suspense>
    </div>
  )
}

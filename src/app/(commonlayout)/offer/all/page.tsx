import OrganicFood from '@/components/modules/home/offer/toggle/All'
import { Suspense } from 'react'

export default function page() {
  return (
    <div>
      <Suspense fallback={<div className="py-8 text-center text-gray-400">Loading...</div>}>
        <OrganicFood></OrganicFood>
      </Suspense>
    </div>
  )
}

import PricingPlans from '@/components/BrandDashboard/dashboard/PricingPlans'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className=" mt-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-black">Pricing Plans</h2>
          <p className="text-gray-600">
            Chose the Plan that fits your campaign needs
          </p>
        </div>
      </div>
      <PricingPlans></PricingPlans>
    </div>
  )
}

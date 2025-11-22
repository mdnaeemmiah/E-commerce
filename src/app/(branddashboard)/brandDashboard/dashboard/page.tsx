
import DActive from '@/components/BrandDashboard/dashboard/DActive';
import DRecent from '@/components/BrandDashboard/dashboard/DRecent';
import React from 'react'

const stats = [
  { label: 'Active Campaigns', value: "$1251 K", value1: "2 Expiring Soon" },
  { label: 'Total Redemptions', value: 6500, value1: "+12% from last month" },
  { label: 'Campaign Spent', value:"$3,420", value1: "+$512 platform fees (15%) "},
  { label: 'Conversion Rate', value: "8.4%", value1: "+12% from last month"},
];


export default function page() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
            {/* Icon and Text Layout */}
            <div className="md:text-[18px] text-[20px] text-[#333333]   w-40">{stat.label}</div>
            {/* Value */}
            <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
              {stat.value}
            </div>
            <div className="text-[16px]">
              {stat.value1}
            </div>
          </div>
        ))}
      </div>
      <DActive></DActive>
      <DRecent></DRecent>
    </div>
  )
}

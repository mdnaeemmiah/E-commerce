import GenerateQr from '@/components/BrandDashboard/dashboard/GenerateQr';
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoQrCodeOutline } from 'react-icons/io5';

const stats = [
    { label: 'Total QR Codes', value: 3, value1: "2 Active,1 paused" },
    { label: 'Total Scans', value: "$3,500", value1: "$2,270 spent (65%)" },
    { label: 'Scan-to-Conversion', value: "$3,420", value1: "15% on $2,270 spent" },
];


export default function page() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between mt-4">
                <div className="mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold mb-2 text-black">QR Code Generator</h2>
                    <p className="text-gray-600">
                        Generate and manage QR Codes for your campaigns
                    </p>
                </div>
                <div>
                    <button className="cursor-pointer text-black border border-gray-200 shadow-md rounded-md p-2 flex items-center gap-2">
                        <IoQrCodeOutline /> Generate Campaign QR
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-8">
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
            <GenerateQr></GenerateQr>
        </div>
    )
}

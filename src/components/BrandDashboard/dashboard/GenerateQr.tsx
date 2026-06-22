"use client";

import { FiDownload, FiShare2, FiCopy } from "react-icons/fi";
import { MdQrCode2 } from "react-icons/md";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";

const STATIC_CARDS = [
  { title: "Summer Splash Rebate", subtitle: "Get cashback on qualifying purchases", date: "2024-06-01", scans: 842, conversions: 342, rate: "40.6%" },
  { title: "Premium Brand Launch", subtitle: "Exclusive launch offer for new customers", date: "2024-07-15", scans: 510, conversions: 189, rate: "37.1%" },
  { title: "Winter Glow Sale", subtitle: "Seasonal rebate for all products", date: "2024-05-01", scans: 210, conversions: 56, rate: "26.7%" },
];

export default function GenerateQr() {
  const cards = STATIC_CARDS;

  return (
    <div className="p-6 w-full mx-auto border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Generated QR Code</h2>
      <p className="text-sm text-gray-600 mb-4">Manage and track your campaign QR codes</p>

      <div className="space-y-4">
        {cards.map((card, i) => (
          <div key={i} className="border rounded-xl border-gray-300 p-4 flex flex-col sm:flex-row items-start justify-between shadow-sm bg-white">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                <MdQrCode2 size={64} className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
                <p className="text-xs text-gray-500">Created: {card.date}</p>
                <div className="flex flex-col sm:flex-row gap-10 mt-3 text-sm">
                  <div><p className="text-gray-600">Total Scans</p><p className="font-semibold">{card.scans}</p></div>
                  <div><p className="text-gray-600">Conversions</p><p className="font-semibold">{card.conversions}</p></div>
                  <div><p className="text-gray-600">Rate</p><p className="font-semibold">{card.rate}</p></div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end items-end flex-row md:flex-col lg:flex-row md:gap-2 mt-4 sm:mt-0">
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2"><FiDownload /> Download</button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2"><FiShare2 /> Share</button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2"><FiCopy /> Copy Link</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { FiBarChart2, FiPause, FiPlay } from "react-icons/fi";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";
import Pagination from "@/components/modules/shared/Pagination";

const STATIC_CAMPAIGNS = [
  {
    id: 1,
    title: "Summer Splash Rebate",
    status: "active",
    paused: false,
    tags: ["Rebate", "Summer"],
    created_at: "2024-06-01",
    end_date: "2024-08-31",
    budget: 5000,
    spent_amount: 3250,
    current_redemptions: 342,
  },
  {
    id: 2,
    title: "Premium Brand Launch",
    status: "active",
    paused: false,
    tags: ["Launch", "Review"],
    created_at: "2024-07-15",
    end_date: "2024-09-30",
    budget: 8000,
    spent_amount: 3600,
    current_redemptions: 189,
  },
  {
    id: 3,
    title: "Winter Glow Sale",
    status: "paused",
    paused: true,
    tags: ["Seasonal"],
    created_at: "2024-05-01",
    end_date: "2024-07-01",
    budget: 2000,
    spent_amount: 400,
    current_redemptions: 56,
  },
];

export default function Campaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;
  const campaigns = STATIC_CAMPAIGNS;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 md:p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">All Campaigns</h2>
      <p className="text-sm text-gray-500 mt-1">Manage your active and paused campaigns</p>

      <div className="mt-6 flex flex-col gap-5">
        {campaigns.map((item, i) => (
          <div key={i} className="w-full border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${item.paused ? "bg-gray-100 text-gray-600 border-gray-300" : "bg-blue-100 text-blue-600 border-blue-300"}`}>
                    {item.status}
                  </span>
                  {item.tags?.map((t, index) => (
                    <span key={index} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-300">{t}</span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Created: {item.created_at}. Expires: {item.end_date}</p>
              </div>
              <div className="flex gap-3 sm:gap-2 flex-wrap sm:flex-nowrap">
                <button className="flex items-center gap-1 border border-gray-300 hover:bg-gray-100 transition px-3 py-1.5 rounded-lg text-sm">
                  <FiBarChart2 size={16} /> Analytics
                </button>
                <button className="flex items-center gap-1 border border-gray-300 hover:bg-gray-100 transition px-3 py-1.5 rounded-lg text-sm">
                  {item.paused ? <><FiPlay size={16} /> Resume</> : <><FiPause size={16} /> Pause</>}
                </button>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold text-gray-800">${item.budget}</p>
              </div>
              <div className="text-left sm:text-center">
                <p className="text-sm text-gray-500">Spent</p>
                <p className="font-semibold text-gray-800">${item.spent_amount}</p>
                <p className="text-xs text-gray-500">{Math.round((item.spent_amount / item.budget) * 100)}% used</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">Redemptions</p>
                <p className="font-semibold text-gray-800">{item.current_redemptions}</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.round((item.spent_amount / item.budget) * 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
}

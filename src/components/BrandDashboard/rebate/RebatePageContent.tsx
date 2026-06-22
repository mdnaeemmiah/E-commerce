"use client";

import Link from "next/link";
import { MdAdd, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";

const stats = [
  { label: "Total Saving", value: "$12,450", change: "+8.2%", up: true },
  { label: "Earning", value: "$34,200", change: "+12.5%", up: true },
  { label: "Avg. Rebate", value: "$15.20", change: "-2.1%", up: false },
  { label: "Claim Rate", value: "68.2%", change: "+4.0%", up: true },
];

const campaigns = [
  {
    id: "#REB-004521",
    name: "Summer Splash Rebate",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    budget: "$600.00",
    spent: 65,
    spentColor: "bg-red-400",
    claims: 124,
    rate: "78%",
  },
  {
    id: "#REB-004812",
    name: "Premium Brand Launch",
    status: "Launched",
    statusColor: "bg-blue-100 text-blue-700",
    budget: "$1,600.00",
    spent: 45,
    spentColor: "bg-[#3E3EDF]",
    claims: 342,
    rate: "92%",
  },
  {
    id: "#REB-005001",
    name: "Winter Glow Sale",
    status: "Paused",
    statusColor: "bg-yellow-100 text-yellow-700",
    budget: "$200.00",
    spent: 20,
    spentColor: "bg-yellow-400",
    claims: 56,
    rate: "100%",
  },
];

const perfStats = [
  { label: "Total Spend", value: "$12,450" },
  { label: "Claim Rate", value: "68.2%" },
  { label: "Avg. Duration", value: "14m" },
  { label: "Total Claims", value: "4.2k" },
];

export default function RebatePageContent() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rebates</h1>
        <Link
          href="/brandDashboard/rebate/wizard"
          className="flex items-center gap-2 bg-[#3E3EDF] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3232c0] transition"
        >
          <MdAdd size={18} />
          Create New Campaign
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">{s.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${s.up ? "text-green-600" : "text-red-500"}`}>
              {s.up ? <MdTrendingUp size={14} /> : <MdTrendingDown size={14} />}
              {s.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Active Campaigns</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {campaigns.map((c, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 hover:bg-gray-50 gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">{c.name}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${c.statusColor}`}>{c.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{c.id}</p>
                {/* Progress bar */}
                <div className="mt-2 w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${c.spentColor}`} style={{ width: `${c.spent}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-1">{c.spent}% of budget used</p>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Budget</p>
                  <p className="font-semibold text-gray-800">{c.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Claims</p>
                  <p className="font-semibold text-gray-800">{c.claims}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Claim Rate</p>
                  <p className="font-semibold text-[#3E3EDF]">{c.rate}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">
          Rebate Campaign Performance:
          <span className="font-normal text-gray-400 ml-2">
            See how your campaigns are performing based on spend, offers, and fulfillment.
          </span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {perfStats.map((p, i) => (
            <div key={i}>
              <p className="text-2xl font-bold text-gray-900">{p.value}</p>
              <p className="text-xs text-gray-400 mt-1">{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

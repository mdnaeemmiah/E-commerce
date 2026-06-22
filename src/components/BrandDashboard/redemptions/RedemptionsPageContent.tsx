"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdAccountBalanceWallet, MdPeople, MdPayment,
  MdVisibility, MdCheckCircle, MdCancel, MdSearch
} from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import profileImg from "@/app/assets/auth/Ellipse 2.png";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";

type Tab = "Pending" | "Approved" | "Rejected" | "Expired" | "Manual Review";

const TABS: Tab[] = ["Pending", "Approved", "Rejected", "Expired", "Manual Review"];

const ALL_REDEMPTIONS = [
  {
    id: "r1284",
    user: "Alex Sterling",
    avatar: profileImg,
    campaign: "Summer Cashback",
    campaignImg: rect,
    receipt: "WFM-2024-1284",
    claimedTier: "Gold Tier",
    amount: "$15.00",
    submitted: "May 10, 2024",
    status: "Pending" as Tab,
  },
  {
    id: "r1285",
    user: "Maya Vance",
    avatar: profileImg,
    campaign: "Discount Cashback",
    campaignImg: img2,
    receipt: "TGT-2024-1285",
    claimedTier: "Silver Tier",
    amount: "$4.50",
    submitted: "May 11, 2024",
    status: "Pending" as Tab,
  },
  {
    id: "r1286",
    user: "Julian Drake",
    avatar: profileImg,
    campaign: "Citing Rewards",
    campaignImg: img3,
    receipt: "CVS-2024-1286",
    claimedTier: "Gold Tier",
    amount: "$28.40",
    submitted: "May 12, 2024",
    status: "Manual Review" as Tab,
  },
  {
    id: "r1287",
    user: "Sarah Blake",
    avatar: profileImg,
    campaign: "Summer Cashback",
    campaignImg: rect,
    receipt: "WFM-2024-1287",
    claimedTier: "Bronze Tier",
    amount: "$8.00",
    submitted: "May 13, 2024",
    status: "Approved" as Tab,
  },
  {
    id: "r1288",
    user: "Carlos Mendez",
    avatar: profileImg,
    campaign: "Discount Cashback",
    campaignImg: img2,
    receipt: "TGT-2024-1288",
    claimedTier: "Gold Tier",
    amount: "$22.00",
    submitted: "May 14, 2024",
    status: "Rejected" as Tab,
  },
];

const statusStyle: Record<Tab, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-600",
  Expired: "bg-gray-100 text-gray-500",
  "Manual Review": "bg-blue-100 text-[#3E3EDF]",
};

export default function RedemptionsPageContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Pending");
  const [search, setSearch] = useState("");

  const filtered = ALL_REDEMPTIONS.filter(
    (r) =>
      r.status === activeTab &&
      (r.user.toLowerCase().includes(search.toLowerCase()) ||
        r.campaign.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[22px] font-bold text-gray-900">Redemptions</h1>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage and verify cashback claims across all active campaigns.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 flex-wrap">
          {[
            { icon: <MdAccountBalanceWallet size={16} className="text-[#3E3EDF]" />, label: "BALANCE", value: "$3,440.93", bg: "bg-[#EEF0FF]" },
            { icon: <MdPeople size={16} className="text-green-600" />, label: "ALSO STARTING", value: "4.2k", bg: "bg-green-50" },
            { icon: <MdPayment size={16} className="text-purple-600" />, label: "TOTAL PAID", value: "$12,482", bg: "bg-purple-50" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
              <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{s.label}</p>
                <p className="text-sm font-bold text-gray-800">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto pb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition -mb-px ${
              activeTab === tab
                ? "border-[#3E3EDF] text-[#3E3EDF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <MdSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user or campaign..."
            className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm outline-none focus:border-[#3E3EDF] bg-white"
          />
        </div>
        {[["Last 30 Days"], ["Tier: All"]].map(([label]) => (
          <button key={label} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-2 rounded-xl hover:bg-gray-50 bg-white">
            {label} <FiChevronDown size={14} />
          </button>
        ))}
        {activeTab === "Manual Review" && (
          <Link
            href="/brandDashboard/redemptions/review"
            className="ml-auto flex items-center gap-1.5 bg-[#3E3EDF] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#3232c0] transition"
          >
            Open Review Queue
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden sm:grid grid-cols-7 px-5 py-3 bg-gray-50 text-[11px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">User</div>
          <div>Campaign</div>
          <div>Receipt</div>
          <div>Claimed Tier</div>
          <div>Submitted</div>
          <div>Status</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No {activeTab.toLowerCase()} redemptions found.
            </div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="grid grid-cols-1 sm:grid-cols-7 px-5 py-4 items-center gap-2 hover:bg-gray-50 transition">
                {/* User */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                    <Image src={r.avatar} alt={r.user} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{r.user}</p>
                    <p className="text-xs text-gray-400">{r.receipt}</p>
                  </div>
                </div>

                {/* Campaign */}
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0">
                    <Image src={r.campaignImg} alt={r.campaign} fill className="object-cover" />
                  </div>
                  <p className="text-xs text-gray-700 font-medium line-clamp-1">{r.campaign}</p>
                </div>

                {/* Receipt */}
                <p className="text-xs text-gray-500 font-mono">{r.receipt}</p>

                {/* Tier */}
                <div>
                  <span className="text-[11px] font-bold bg-[#EEF0FF] text-[#3E3EDF] px-2.5 py-1 rounded-full">
                    {r.claimedTier}
                  </span>
                </div>

                {/* Submitted */}
                <p className="text-xs text-gray-500">{r.submitted}</p>

                {/* Status + Actions */}
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyle[r.status]}`}>
                    {r.status === "Pending" ? "● PENDING" :
                     r.status === "Approved" ? "✓ APPROVED" :
                     r.status === "Manual Review" ? "⚑ REVIEW" :
                     r.status === "Rejected" ? "✕ REJECTED" : r.status.toUpperCase()}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    <Link
                      href={`/brandDashboard/redemptions/${r.id}`}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                    >
                      <MdVisibility size={14} className="text-[#3E3EDF]" />
                    </Link>
                    {r.status === "Pending" && (
                      <>
                        <button className="w-7 h-7 rounded-lg border border-green-200 flex items-center justify-center hover:bg-green-50 transition">
                          <MdCheckCircle size={14} className="text-green-500" />
                        </button>
                        <button className="w-7 h-7 rounded-lg border border-red-200 flex items-center justify-center hover:bg-red-50 transition">
                          <MdCancel size={14} className="text-red-400" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
            Showing {filtered.length} of 1,200 Redemptions
          </p>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FiChevronLeft size={13} />
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-bold ${p === 1 ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FiChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

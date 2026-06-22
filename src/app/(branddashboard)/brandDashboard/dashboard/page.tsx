"use client";

import { MdShoppingBag, MdAccountBalance, MdLocalOffer, MdCardGiftcard, MdStar, MdCreditCard, MdBarChart } from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";

const rebateCards = [
  {
    icon: <MdShoppingBag size={22} className="text-[#3E3EDF]" />,
    label: "VERIFIED PURCHASES",
    value: "1,284",
    change: "+12.5%",
    positive: true,
    bar: (
      <div className="flex gap-1 mt-3">
        <div className="h-1.5 rounded-full bg-[#3E3EDF] w-16" />
        <div className="h-1.5 rounded-full bg-gray-200 flex-1" />
      </div>
    ),
  },
  {
    icon: <MdAccountBalance size={22} className="text-[#3E3EDF]" />,
    label: "REBATE SPEND",
    value: "$14,200",
    change: "+4.2%",
    positive: true,
    bar: (
      <div className="flex gap-1 mt-3 items-end h-6">
        {[3, 5, 4, 8, 6, 10, 7].map((h, i) => (
          <div key={i} className={`w-4 rounded-sm ${i === 5 ? "bg-[#3E3EDF]" : "bg-gray-200"}`} style={{ height: `${h * 2.4}px` }} />
        ))}
      </div>
    ),
  },
  {
    icon: <MdLocalOffer size={22} className="text-[#3E3EDF]" />,
    label: "COST PER PURCHASE",
    value: "$11.05",
    change: "-2.1%",
    positive: false,
    sub: "Industry benchmark: $14.50",
    bar: null,
  },
  {
    icon: <MdCardGiftcard size={22} className="text-[#3E3EDF]" />,
    label: "AVERAGE REBATE PAID",
    value: "$15.20",
    change: "+0.5%",
    positive: true,
    bar: (
      <div className="mt-3">
        <div className="h-1.5 rounded-full bg-gray-200 w-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full w-3/4" />
        </div>
      </div>
    ),
  },
];

const reviewCards = [
  {
    icon: <MdStar size={26} className="text-[#3E3EDF]" />,
    label: "TOTAL REVIEWS",
    value: "452",
    sub: "18% from last month",
    subPositive: true,
    bgIcon: "bg-[#EEF0FF]",
  },
  {
    icon: <MdCreditCard size={26} className="text-[#3E3EDF]" />,
    label: "REVIEW SPEND",
    value: "$2,260",
    sub: "Budget utilization: 84%",
    subPositive: false,
    bgIcon: "bg-[#EEF0FF]",
  },
  {
    icon: <MdBarChart size={26} className="text-[#3E3EDF]" />,
    label: "COST PER REVIEW",
    value: "$5.00",
    sub: "Targeting: $4.50",
    subPositive: false,
    bgIcon: "bg-[#EEF0FF]",
  },
];

const campaigns = [
  {
    name: "Spring Runner 500 Launch",
    id: "#REB-004521",
    img: "https://via.placeholder.com/36x36/FF6B6B/fff?text=S",
    type: "REBATE",
    typeBg: "bg-blue-100 text-blue-700",
    status: "Active",
    statusDot: "bg-green-500",
    spend: "$4,500.00",
    remaining: "Remaining: $1.2k",
    activity: "342 Purchases",
    activitySub: "92% Claim Rate",
    activitySubColor: "text-blue-600",
  },
  {
    name: "Elite Chrono Review Blitz",
    id: "#REV-009923",
    img: "https://via.placeholder.com/36x36/555/fff?text=E",
    type: "REVIEW",
    typeBg: "bg-green-100 text-green-700",
    status: "Active",
    statusDot: "bg-green-500",
    spend: "$1,200.00",
    remaining: "Remaining: $800",
    activity: "84 Reviews",
    activitySub: "4.8 Avg Rating",
    activitySubColor: "text-gray-500",
  },
  {
    name: "Summer Shades Discount",
    id: "#REB-004812",
    img: "https://via.placeholder.com/36x36/F0A500/fff?text=S",
    type: "REBATE",
    typeBg: "bg-blue-100 text-blue-700",
    status: "Paused",
    statusDot: "bg-yellow-400",
    spend: "$850.00",
    remaining: "Budget Capped",
    activity: "56 Purchases",
    activitySub: "100% Fulfilled",
    activitySubColor: "text-gray-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Welcome back, Adrian</h1>
          <p className="text-sm text-gray-500 mt-0.5">Here&apos;s what&apos;s happening with your campaigns today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition">
            <MdStar size={16} className="text-[#3E3EDF]" />
            Set Up Reviews
          </button>
          <button className="flex items-center gap-2 bg-[#3E3EDF] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#3232c0] transition">
            <MdCardGiftcard size={16} />
            Set Up Rebates
          </button>
        </div>
      </div>

      {/* Rebate Snapshot */}
      <div>
        <h2 className="text-xs font-semibold tracking-widest text-gray-500 mb-4 uppercase">Rebate Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rebateCards.map((card, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center">
                  {card.icon}
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                  {card.change}
                </span>
              </div>
              <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase mt-3">{card.label}</p>
              <p className="text-[26px] font-bold text-gray-900 mt-1">{card.value}</p>
              {card.sub && <p className="text-xs text-gray-400 mt-1">{card.sub}</p>}
              {card.bar}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          You control your daily spend and reward values — performance updates based on your campaign setup.
        </p>
      </div>

      {/* Review Snapshot */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Review Snapshot</h2>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
              <FiChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviewCards.map((card, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${card.bgIcon} flex items-center justify-center flex-shrink-0`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">{card.label}</p>
                <p className="text-[24px] font-bold text-gray-900 leading-tight">{card.value}</p>
                <p className={`text-xs mt-0.5 ${card.subPositive ? "text-green-500" : "text-gray-400"}`}>
                  {card.subPositive && "↑ "}{card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Active Campaigns</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              All Types <FiChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              Last 30 Days <FiChevronDown size={13} />
            </button>
          </div>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-5 px-6 py-3 bg-gray-50 text-[11px] font-semibold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Campaign Name</div>
          <div>Type</div>
          <div>Status</div>
          <div>Spend</div>
        </div>

        {/* Campaign rows */}
        <div className="divide-y divide-gray-100">
          {campaigns.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-5 px-6 py-4 items-center gap-2 hover:bg-gray-50 transition">
              {/* Name */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-400">ID: {c.id}</p>
                </div>
              </div>
              {/* Type */}
              <div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded ${c.typeBg}`}>{c.type}</span>
              </div>
              {/* Status */}
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${c.statusDot}`} />
                <span className="text-sm text-gray-600">{c.status}</span>
              </div>
              {/* Spend */}
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.spend}</p>
                <p className="text-xs text-gray-400">{c.remaining}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Showing 3 of 12 Active Campaigns</p>
          <button className="text-[#3E3EDF] text-sm font-semibold hover:underline">See All Activity</button>
        </div>
      </div>
    </div>
  );
}

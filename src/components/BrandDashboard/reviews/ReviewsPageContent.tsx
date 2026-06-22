"use client";

import Image from "next/image";
import Link from "next/link";
import { MdStar, MdAdd, MdEdit, MdBarChart, MdTrendingUp, MdRateReview } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

const stats = [
  { label: "REVIEWS", value: "12", icon: <MdRateReview size={20} className="text-[#3E3EDF]" />, bg: "bg-[#EEF0FF]" },
  { label: "TOTAL REVENUE", value: "$450.00", icon: <MdBarChart size={20} className="text-green-600" />, bg: "bg-green-50" },
  { label: "BASKET RATINGS", value: "1,240", icon: <MdStar size={20} className="text-yellow-500" />, bg: "bg-yellow-50" },
  { label: "REVIEW SPEND", value: "$2,850.00", icon: <MdTrendingUp size={20} className="text-purple-600" />, bg: "bg-purple-50" },
  { label: "REVIEW RATING", value: "$2.30", icon: <MdStar size={20} className="text-orange-500" />, bg: "bg-orange-50" },
];

const campaigns = [
  {
    id: "rev-1",
    name: "NeoWatch Series 5 Launch",
    date: "October 5, 2024",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    views: 483,
    spend: "$1108.60",
    img: rect,
  },
  {
    id: "rev-2",
    name: "Acoustic Pro Refresh",
    date: "October 5, 2024",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    views: 245,
    spend: "$878.50",
    img: img2,
  },
  {
    id: "rev-3",
    name: "PureFlow Kettle Beta",
    date: "October 29, 2024",
    status: "Paused",
    statusColor: "bg-yellow-100 text-yellow-700",
    views: 154,
    spend: "$354.20",
    img: img3,
  },
];

const distribution = [
  { region: "North America", pct: 64, color: "bg-[#3E3EDF]" },
  { region: "Europe", pct: 22, color: "bg-indigo-300" },
  { region: "Asia", pct: 9, color: "bg-indigo-200" },
  { region: "Other", pct: 5, color: "bg-gray-200" },
];

export default function ReviewsPageContent() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Review Performance</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Optimise and manage your review acquisition workflows.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-[#3E3EDF] text-[#3E3EDF] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#EEF0FF] transition">
            <MdBarChart size={16} />
            Review Management
          </button>
          <Link
            href="/brandDashboard/reviews/wizard"
            className="flex items-center gap-2 bg-[#3E3EDF] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#3232c0] transition"
          >
            <MdAdd size={16} />
            Create Review Campaign
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{s.label}</p>
              <p className="text-[16px] font-bold text-gray-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Campaigns */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Active Campaigns</h2>
        </div>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-5 px-6 py-3 bg-gray-50 text-[11px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Campaign Name</div>
          <div>Status</div>
          <div>Total Views</div>
          <div>Spend</div>
        </div>

        <div className="divide-y divide-gray-100">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="grid grid-cols-1 sm:grid-cols-5 px-6 py-4 items-center gap-2 hover:bg-gray-50 transition"
            >
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <Image src={c.img} alt={c.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.date}</p>
                </div>
              </div>
              <div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.statusColor}`}>
                  ● {c.status}
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-700">{c.views}</div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">{c.spend}</p>
                <div className="flex gap-1.5">
                  <Link
                    href={`/brandDashboard/reviews/${c.id}`}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <MdEdit size={14} className="text-[#3E3EDF]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
            Showing 3 of 3 Campaigns
          </p>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FiChevronLeft size={13} />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#3E3EDF] text-white text-xs font-bold flex items-center justify-center">1</button>
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-xs">2</button>
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
              <FiChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Distribution */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-1">
          Campaign Distribution
        </h2>
        <p className="text-xs text-gray-400 mb-5">
          Review volume spread across active geographic zones and user segments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Percentages */}
          <div className="space-y-3">
            {distribution.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{d.region}</span>
                  <span className="font-bold text-gray-800">{d.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart visual */}
          <div className="flex items-end gap-2 h-24 justify-center">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <div
                key={i}
                className={`rounded-t-md flex-1 transition-all ${
                  i === 5 ? "bg-[#3E3EDF]" : i % 2 === 0 ? "bg-indigo-200" : "bg-indigo-100"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

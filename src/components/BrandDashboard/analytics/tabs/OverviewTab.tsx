"use client";

import Image from "next/image";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

const perfData = [
  { month: "Jan", rebates: 18, revenue: 12 },
  { month: "Feb", rebates: 22, revenue: 16 },
  { month: "Mar", rebates: 19, revenue: 14 },
  { month: "Apr", rebates: 28, revenue: 22 },
  { month: "May", rebates: 32, revenue: 26 },
  { month: "Jun", rebates: 30, revenue: 24 },
  { month: "Jul", rebates: 38, revenue: 30 },
  { month: "Aug", rebates: 42, revenue: 34 },
];

const categoryData = [
  { name: "Snacks", value: 38, color: "#3E3EDF" },
  { name: "Beverages", value: 24, color: "#818cf8" },
  { name: "Health", value: 20, color: "#a5b4fc" },
  { name: "Other", value: 18, color: "#e0e7ff" },
];

const topCampaigns = [
  { name: "Summer Cashback", img: rect, spend: "$4,200", change: "+18%" },
  { name: "Nitro Cold Brew", img: img2, spend: "$2,100", change: "+8%" },
  { name: "Green Earth", img: img3, spend: "$1,850", change: "-2%" },
  { name: "Kettle Snacks", img: rect, spend: "$980", change: "+5%" },
];

const transactions = [
  { user: "Alex Sterling", img: profileImg, campaign: "Summer Cashback", date: "Oct 26, 2024", amount: "$15.00", status: "Approved" },
  { user: "Maya Vance", img: profileImg, campaign: "Nitro Cashback", date: "Jun 25, 2024", amount: "$4.99", status: "Pending" },
  { user: "Julian Drake", img: profileImg, campaign: "Final Replenish", date: "Jun 25, 2024", amount: "$28.50", status: "Reject" },
];

const statusColor: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Reject: "bg-red-100 text-red-500",
};

const topStats = [
  { label: "COST/REBATE", value: "$2.45", change: "+3.1%", up: true },
  { label: "REBATES ↑", value: "18.2%", change: "+5%", up: true },
  { label: "REVENUE ↑", value: "12.5%", change: "+2%", up: true },
  { label: "CONVERSION", value: "24.1%", change: "+1.2%", up: true },
  { label: "ACTIVE USERS", value: "4.8k", change: "+0.4k", up: true },
];

export default function OverviewTab() {
  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {topStats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-[20px] font-black text-gray-900 mt-0.5">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${s.up ? "text-green-600" : "text-red-500"}`}>
              {s.up ? <MdTrendingUp size={13} /> : <MdTrendingDown size={13} />}
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">Performance Trends</h3>
          <span className="text-xs text-gray-400">Last 90 Days ▾</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={perfData}>
            <defs>
              <linearGradient id="rebG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E3EDF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3E3EDF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontSize: 12 }} />
            <Area type="monotone" dataKey="rebates" stroke="#3E3EDF" strokeWidth={2} fill="url(#rebG)" name="Rebates" />
            <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2} fill="url(#revG)" name="Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Campaigns + Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Campaigns */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Top Campaigns</h3>
            <span className="text-xs text-[#3E3EDF] font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            {topCampaigns.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0">
                  <Image src={c.img} alt={c.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{c.name}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#3E3EDF] rounded-full" style={{ width: `${60 - i * 12}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-gray-800">{c.spend}</p>
                  <p className={`text-[10px] font-semibold ${c.change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{c.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Category Distribution</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                  {categoryData.map((_, i) => <Cell key={i} fill={categoryData[i].color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {categoryData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-gray-600">{d.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Recent Transaction Flow</h3>
          <span className="text-xs text-[#3E3EDF] font-semibold cursor-pointer">See All</span>
        </div>
        <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Customer</div>
          <div>Campaign</div>
          <div>Date</div>
          <div>Amount / Status</div>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.map((t, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-5 px-5 py-3 items-center gap-2 hover:bg-gray-50 transition">
              <div className="col-span-2 flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image src={t.img} alt={t.user} fill className="object-cover" />
                </div>
                <p className="text-xs font-semibold text-gray-800">{t.user}</p>
              </div>
              <p className="text-xs text-gray-500">{t.campaign}</p>
              <p className="text-xs text-gray-400">{t.date}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-800">{t.amount}</p>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${statusColor[t.status]}`}>{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

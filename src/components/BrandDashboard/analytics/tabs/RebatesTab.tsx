"use client";

import Image from "next/image";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { MdTrendingUp } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";

const funnelData = [
  { month: "Jan", rebates: 140, revenue: 80 },
  { month: "Feb", rebates: 180, revenue: 120 },
  { month: "Mar", rebates: 160, revenue: 110 },
  { month: "Apr", rebates: 220, revenue: 160 },
  { month: "May", rebates: 280, revenue: 200 },
  { month: "Jun", rebates: 260, revenue: 190 },
  { month: "Jul", rebates: 310, revenue: 230 },
  { month: "Aug", rebates: 350, revenue: 260 },
];

const spendData = [
  { name: "Summer Cashback", spend: 4200 },
  { name: "New Product Launch", spend: 3100 },
  { name: "Flash Discount", spend: 2800 },
  { name: "Green Wellness", spend: 1900 },
];

const campaigns = [
  { id: "#REB-001", name: "Summer Cashback", img: rect, claims: 2342, budget: "$64,200", rate: "88%", status: "Active" },
  { id: "#REB-002", name: "NitrFuel Promo", img: img2, claims: 1206, budget: "$31,200", rate: "72%", status: "Active" },
  { id: "#REB-003", name: "Today Not", img: img3, claims: 984, budget: "$41,200", rate: "65%", status: "Paused" },
  { id: "#REB-004", name: "Bee Brand Starter", img: rect, claims: 530, budget: "$21,200", rate: "58%", status: "Active" },
];

const statusStyle: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
};

const topStats = [
  { label: "REDEMPTION RATE", value: "450%", change: "+12%", up: true },
  { label: "CLAIM RATE", value: "8.2%", change: "+1.1%", up: true },
  { label: "AVG REBATE", value: "$12.40", change: "+$0.50", up: true },
  { label: "COST / CLAIM", value: "$2.15", change: "-$0.10", up: true },
  { label: "CONVERSION", value: "24%", change: "+2%", up: true },
];

export default function RebatesTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Performance Console</h2>
        <p className="text-sm text-gray-400 mt-0.5">Rebate campaign analytics and performance metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {topStats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-[20px] font-black text-gray-900 mt-0.5">{s.value}</p>
            <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${s.up ? "text-green-600" : "text-red-500"}`}>
              <MdTrendingUp size={13} />{s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Funnel + Spend by Campaign */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Campaign Funnel</h3>
            <span className="text-xs text-gray-400">Active Performance</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={funnelData}>
              <defs>
                <linearGradient id="rG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3E3EDF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3E3EDF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="vG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="rebates" stroke="#3E3EDF" strokeWidth={2} fill="url(#rG)" name="Rebates" />
              <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2} fill="url(#vG)" name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Spend by Campaign</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={spendData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Spend"]} />
              <Bar dataKey="spend" fill="#3E3EDF" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Campaign Performance */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Detailed Campaign Performance</h3>
        </div>
        <div className="hidden sm:grid grid-cols-6 px-5 py-2.5 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Campaign</div>
          <div>Claims</div>
          <div>Budget</div>
          <div>Rate</div>
          <div>Status</div>
        </div>
        <div className="divide-y divide-gray-100">
          {campaigns.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-6 px-5 py-3.5 items-center gap-2 hover:bg-gray-50 transition">
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0">
                  <Image src={c.img} alt={c.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.id}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-800">{c.claims.toLocaleString()}</p>
              <p className="text-xs text-gray-600">{c.budget}</p>
              <div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3E3EDF] rounded-full" style={{ width: c.rate }} />
                  </div>
                  <span className="text-xs font-semibold text-[#3E3EDF]">{c.rate}</span>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full self-start ${statusStyle[c.status]}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

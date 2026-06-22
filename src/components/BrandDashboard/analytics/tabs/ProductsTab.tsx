"use client";

import Image from "next/image";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { MdTrendingUp } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";

const claimTrendData = [
  { month: "Jan", claims: 60 }, { month: "Feb", claims: 85 },
  { month: "Mar", claims: 72 }, { month: "Apr", claims: 110 },
  { month: "May", claims: 140 }, { month: "Jun", claims: 125 },
  { month: "Jul", claims: 170 }, { month: "Aug", claims: 200 },
];

const categorySpend = [
  { name: "Snacks", value: 40, color: "#3E3EDF" },
  { name: "Beverages", value: 28, color: "#6366f1" },
  { name: "Health", value: 20, color: "#a5b4fc" },
  { name: "Organic", value: 12, color: "#e0e7ff" },
];

const completionData = [
  { month: "Jan", volume: 45 }, { month: "Feb", volume: 62 },
  { month: "Mar", volume: 55 }, { month: "Apr", volume: 80 },
  { month: "May", volume: 98 }, { month: "Jun", volume: 88 },
  { month: "Jul", volume: 112 }, { month: "Aug", volume: 130 },
];

const products = [
  { name: "Organic Sourdough Mull...", img: rect, claims: 3421, revenue: "$29,150", change: "+14%", up: true },
  { name: "Altradale Street Muesli", img: img2, claims: 2100, revenue: "$18,200", change: "+9%", up: true },
  { name: "Keto Building Training", img: img3, claims: 1804, revenue: "$15,400", change: "-3%", up: false },
  { name: "Wild Berry Mix", img: img4, claims: 1240, revenue: "$9,800", change: "+6%", up: true },
];

const topStats = [
  { label: "TOTAL SKUs", value: "1,284" },
  { label: "ORGANIC MATCH", value: "4.52" },
  { label: "CLAIM RATE", value: "94.2%" },
];

export default function ProductsTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Product Performance</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Track claim inventory, redemption velocity, and spend distribution across active product catalogues.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {topStats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-[22px] font-black text-gray-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Claim Trends */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Product Claim Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={claimTrendData}>
            <defs>
              <linearGradient id="ctG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E3EDF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3E3EDF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
            <Area type="monotone" dataKey="claims" stroke="#3E3EDF" strokeWidth={2.5} fill="url(#ctG)" name="Claims" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Spending by Category + Review Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Spending Product Category</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={categorySpend} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="value" strokeWidth={0}>
                    {categorySpend.map((_, i) => <Cell key={i} fill={categorySpend[i].color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm font-black text-gray-900">$245k</p>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {categorySpend.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-gray-600">{d.name}</span>
                  </div>
                  <span className="font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Review Completion Volume</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
              <Bar dataKey="volume" fill="#818cf8" radius={[4, 4, 0, 0]} name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Product Performance Table</h3>
          <div className="flex gap-2 text-xs">
            <button className="border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50">Filter</button>
            <button className="border border-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-50">Export</button>
          </div>
        </div>
        <div className="hidden sm:grid grid-cols-5 px-5 py-2.5 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">Product</div>
          <div>Claims</div>
          <div>Revenue</div>
          <div>Change</div>
        </div>
        <div className="divide-y divide-gray-100">
          {products.map((p, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-5 px-5 py-3.5 items-center gap-2 hover:bg-gray-50 transition">
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <p className="text-xs font-semibold text-gray-800 line-clamp-1">{p.name}</p>
              </div>
              <p className="text-xs font-bold text-gray-800">{p.claims.toLocaleString()}</p>
              <p className="text-xs text-gray-600">{p.revenue}</p>
              <div className={`flex items-center gap-1 text-xs font-semibold ${p.up ? "text-green-600" : "text-red-500"}`}>
                <MdTrendingUp size={13} className={p.up ? "" : "rotate-180"} />
                {p.change}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">Showing 4 of 12 products</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { MdStar } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";

const volumeData = [
  { month: "Jan", reviews: 80 }, { month: "Feb", reviews: 110 },
  { month: "Mar", reviews: 95 }, { month: "Apr", reviews: 140 },
  { month: "May", reviews: 190 }, { month: "Jun", reviews: 170 },
  { month: "Jul", reviews: 220 }, { month: "Aug", reviews: 260 },
];

const starData = [
  { stars: "1★", count: 12 }, { stars: "2★", count: 28 },
  { stars: "3★", count: 65 }, { stars: "4★", count: 180 },
  { stars: "5★", count: 320 },
];

const sentimentData = [
  { name: "Positive", value: 82, color: "#3E3EDF" },
  { name: "Neutral", value: 11, color: "#818cf8" },
  { name: "Negative", value: 7, color: "#e0e7ff" },
];

const topProducts = [
  { name: "Nitro Cold Brew", img: img2, reviews: 4.9, count: 312, spend: "$2,080" },
  { name: "Kettle Sea Salt", img: rect, reviews: 4.7, count: 241, spend: "$1,620" },
  { name: "Green Powder", img: img3, reviews: 4.5, count: 198, spend: "$1,340" },
];

const topStats = [
  { label: "TOTAL REVIEWS", value: "1,284" },
  { label: "REVIEW SPEND", value: "$14.2k" },
  { label: "AVG RATING", value: "4.8 ★" },
  { label: "COST / REVIEW", value: "$2.15" },
  { label: "COMPLETION", value: "78%" },
];

export default function ReviewsTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Review Analytics Dashboard</h2>
        <p className="text-sm text-gray-400 mt-0.5">Track review quality, volume, and sentiment across campaigns.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {topStats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-[20px] font-black text-gray-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Volume Trend + Star Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Review Volume Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="rvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3E3EDF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3E3EDF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
              <Area type="monotone" dataKey="reviews" stroke="#3E3EDF" strokeWidth={2.5} fill="url(#rvG)" name="Reviews" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Star Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={starData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stars" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
              <Bar dataKey="count" fill="#3E3EDF" radius={[6, 6, 0, 0]} name="Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment + Top Reviewed Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Sentiment */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Sentiment Analysis</h3>
          <div className="flex items-center gap-6">
            <div className="relative">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {sentimentData.map((_, i) => <Cell key={i} fill={sentimentData[i].color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-black text-gray-900">82%</p>
                  <p className="text-[9px] text-gray-400">Positive</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {sentimentData.map((d, i) => (
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

        {/* Top Reviewed Products */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Top Reviewed Products</h3>
            <span className="text-xs text-[#3E3EDF] font-semibold cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MdStar size={12} className="text-yellow-400" />
                    <span className="text-[10px] text-gray-500">{p.reviews} · {p.count} reviews</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-[#3E3EDF] shrink-0">{p.spend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

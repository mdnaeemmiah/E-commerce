"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

const retentionData = [
  { month: "Jan", users: 8200 }, { month: "Feb", users: 8800 },
  { month: "Mar", users: 8400 }, { month: "Apr", users: 9600 },
  { month: "May", users: 10800 }, { month: "Jun", users: 10200 },
  { month: "Jul", users: 11400 }, { month: "Aug", users: 12400 },
];

const ltvData = [
  { month: "Jan", ltv: 95 }, { month: "Feb", ltv: 108 },
  { month: "Mar", ltv: 102 }, { month: "Apr", ltv: 124 },
  { month: "May", ltv: 138 }, { month: "Jun", ltv: 132 },
  { month: "Jul", ltv: 141 }, { month: "Aug", ltv: 142 },
];

const segments = [
  { name: "Loyal", value: 42, color: "#3E3EDF" },
  { name: "Active", value: 28, color: "#6366f1" },
  { name: "At Risk", value: 18, color: "#a5b4fc" },
  { name: "Churned", value: 12, color: "#e0e7ff" },
];

const cohorts = [
  { cohort: "Jan 2024", m0: "100%", m1: "82%", m2: "74%", m3: "68%", m4: "62%", m5: "58%" },
  { cohort: "Feb 2024", m0: "100%", m1: "79%", m2: "71%", m3: "65%", m4: "60%", m5: "—" },
  { cohort: "Mar 2024", m0: "100%", m1: "84%", m2: "76%", m3: "70%", m4: "—", m5: "—" },
  { cohort: "Apr 2024", m0: "100%", m1: "80%", m2: "72%", m3: "—", m4: "—", m5: "—" },
  { cohort: "May 2024", m0: "100%", m1: "77%", m2: "—", m3: "—", m4: "—", m5: "—" },
  { cohort: "Jun 2024", m0: "100%", m1: "—", m2: "—", m3: "—", m4: "—", m5: "—" },
];

const getCohortBg = (val: string) => {
  if (val === "—") return "bg-gray-50 text-gray-300";
  const n = parseInt(val);
  if (n >= 80) return "bg-[#3E3EDF] text-white";
  if (n >= 70) return "bg-indigo-300 text-white";
  if (n >= 60) return "bg-indigo-200 text-indigo-900";
  return "bg-indigo-100 text-indigo-700";
};

const geo = [
  { region: "New York", pct: 28, bar: 90 },
  { region: "Los Angeles", pct: 22, bar: 70 },
  { region: "Chicago", pct: 15, bar: 50 },
  { region: "San Francisco", pct: 12, bar: 40 },
  { region: "Berlin", pct: 9, bar: 30 },
];

const topStats = [
  { label: "ACTIVE USERS", value: "12.4k", change: "+8.2%", up: true },
  { label: "AVG LTV", value: "$142.50", change: "+$12", up: true },
  { label: "RETENTION", value: "64%", change: "+3%", up: true },
  { label: "NPS SCORE", value: "12", change: "+2", up: true },
  { label: "CHURN RATE", value: "2.4%", change: "-0.3%", up: true },
];

export default function CustomersTab() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Customer Analytics</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          Track customer quality, retention and engagement distribution across active user segments of all campaigns.
        </p>
      </div>

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

      {/* Retention Chart + Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">User Retention Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} formatter={(v: number) => [`${v.toLocaleString()}`, "Users"]} />
              <Line type="monotone" dataKey="users" stroke="#3E3EDF" strokeWidth={2.5} dot={false} name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Segments</h3>
          <div className="relative mx-auto" style={{ width: 120, height: 120 }}>
            <PieChart width={120} height={120}>
              <Pie data={segments} cx="50%" cy="50%" innerRadius={32} outerRadius={55} dataKey="value" strokeWidth={0}>
                {segments.map((_, i) => <Cell key={i} fill={segments[i].color} />)}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm font-black text-gray-900">12.4k</p>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            {segments.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-gray-600">{s.name}</span>
                </div>
                <span className="font-bold text-gray-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Acquisition Cohort Retention */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Acquisition Cohort / Retention (%)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-3 py-2 text-gray-500 font-semibold">Cohort</th>
                {["Month 0", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5"].map((m) => (
                  <th key={m} className="px-3 py-2 text-gray-400 font-semibold text-center">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cohorts.map((row, i) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">{row.cohort}</td>
                  {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, j) => (
                    <td key={j} className="px-1 py-1 text-center">
                      <span className={`inline-block w-14 py-1.5 rounded-lg text-[10px] font-bold ${getCohortBg(val)}`}>
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Reach + LTV Maturity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Geographic Reach</h3>
          <div className="space-y-3">
            {geo.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{g.region}</span>
                  <span className="font-bold text-gray-800">{g.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#3E3EDF] rounded-full" style={{ width: `${g.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">LTV Maturity Curve</h3>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={ltvData}>
              <defs>
                <linearGradient id="ltvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3E3EDF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3E3EDF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} formatter={(v: number) => [`$${v}`, "LTV"]} />
              <Area type="monotone" dataKey="ltv" stroke="#3E3EDF" strokeWidth={2.5} fill="url(#ltvG)" name="LTV" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

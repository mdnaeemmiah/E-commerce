"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EarningsData {
  month: string;
  earnings: number;
}

const yearlyData: Record<number, EarningsData[]> = {
  2024: [
    { month: "Jan", earnings: 4200 },
    { month: "Feb", earnings: 6100 },
    { month: "Mar", earnings: 8300 },
    { month: "Apr", earnings: 9200 },
    { month: "May", earnings: 8800 },
    { month: "Jun", earnings: 8600 },
    { month: "Jul", earnings: 9000 },
    { month: "Aug", earnings: 4500 },
    { month: "Sep", earnings: 3200 },
    { month: "Oct", earnings: 8000 },
    { month: "Nov", earnings: 8900 },
    { month: "Dec", earnings: 8700 },
  ],
  2025: [
    { month: "Jan", earnings: 4200 },
    { month: "Feb", earnings: 3900 },
    { month: "Mar", earnings: 8240 },
    { month: "Apr", earnings: 9600 },
    { month: "May", earnings: 8800 },
    { month: "Jun", earnings: 8700 },
    { month: "Jul", earnings: 8900 },
    { month: "Aug", earnings: 4600 },
    { month: "Sep", earnings: 3200 },
    { month: "Oct", earnings: 8100 },
    { month: "Nov", earnings: 8800 },
    { month: "Dec", earnings: 8700 },
  ],
  2023: [
    { month: "Jan", earnings: 4200 },
    { month: "Feb", earnings: 3900 },
    { month: "Mar", earnings: 8240 },
    { month: "Apr", earnings: 9600 },
    { month: "May", earnings: 8800 },
    { month: "Jun", earnings: 8700 },
    { month: "Jul", earnings: 8900 },
    { month: "Aug", earnings: 4600 },
    { month: "Sep", earnings: 3200 },
    { month: "Oct", earnings: 8100 },
    { month: "Nov", earnings: 8800 },
    { month: "Dec", earnings: 8700 },
  ],
  2022: [
    { month: "Jan", earnings: 4200 },
    { month: "Feb", earnings: 3900 },
    { month: "Mar", earnings: 8240 },
    { month: "Apr", earnings: 9600 },
    { month: "May", earnings: 8800 },
    { month: "Jun", earnings: 8700 },
    { month: "Jul", earnings: 8900 },
    { month: "Aug", earnings: 4600 },
    { month: "Sep", earnings: 3200 },
    { month: "Oct", earnings: 8100 },
    { month: "Nov", earnings: 8800 },
    { month: "Dec", earnings: 8700 },
  ],
};

export default function DEarning() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const data = yearlyData[selectedYear];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-semibold text-[#1F1D1D]">Earnings</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 text-sm rounded-md px-3 py-1 focus:ring-2 focus:ring-[#3E3EDF]"
        >
          {Object.keys(yearlyData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="h-64 md:h-84">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Earnings"]}
              cursor={{ fill: "rgba(59,130,246,0.1)" }}
            />
            <Bar dataKey="earnings" fill="#3E3EDF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

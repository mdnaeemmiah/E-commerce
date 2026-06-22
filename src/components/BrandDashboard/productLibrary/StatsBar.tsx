"use client";

import { MdInventory2, MdCheckCircle, MdWarning } from "react-icons/md";

const stats = [
  {
    icon: <MdInventory2 size={22} className="text-[#3E3EDF]" />,
    label: "TOTAL PRODUCTS",
    value: "1,284",
    bg: "bg-[#EEF0FF]",
  },
  {
    icon: <MdCheckCircle size={22} className="text-green-600" />,
    label: "ACTIVE LISTINGS",
    value: "12",
    bg: "bg-green-50",
  },
  {
    icon: <MdWarning size={22} className="text-orange-500" />,
    label: "OUT OF STOCK",
    value: "42",
    bg: "bg-orange-50",
  },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
            {s.icon}
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">{s.label}</p>
            <p className="text-[26px] font-bold text-gray-900 leading-tight">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

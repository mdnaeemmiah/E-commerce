"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdStar, MdBlock, MdCheckCircle, MdSearch } from "react-icons/md";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import SuspendModal from "./SuspendModal";
import profileImg from "@/app/assets/auth/Ellipse 2.png";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";

const MOCK: Record<string, {
  id: string; name: string; email: string; phone: string;
  status: "Active" | "Suspended"; score: number; ltv: string;
  claims: number; joined: string; review: string;
}> = {
  c1: { id: "c1", name: "Alexander Knight", email: "a.knight@portfolio.com", phone: "+1 (555) 012-9921", status: "Active", score: 95, ltv: "$12,482.00", claims: 42, joined: "Jan 2024", review: "The product quality is exceptional. Every detail has been thought through meticulously, from packaging to taste." },
  c2: { id: "c2", name: "Helena Sterling", email: "h.sterling@nexus.io", phone: "+44 20 7946 0134", status: "Active", score: 87, ltv: "$4,290.50", claims: 15, joined: "Mar 2024", review: "Fantastic experience overall. Will definitely purchase again and recommend to friends and family." },
  c3: { id: "c3", name: "Marcus Aurelius", email: "marcusaurelius.m@gmail.com", phone: "+1-555-321-9867", status: "Suspended", score: 95, ltv: "$980.50", claims: 4, joined: "Jun 2024", review: "The products are consistently great. I appreciate how the brand maintains quality across their entire range." },
  c4: { id: "c4", name: "Maya Thornton", email: "maya.t@creative.studio", phone: "+61 2 9876 5432", status: "Active", score: 92, ltv: "$3,400.00", claims: 20, joined: "Nov 2023", review: "Absolutely love the range. Everything I've tried has been top tier." },
  c5: { id: "c5", name: "Ryan Cho", email: "ryan.cho@email.com", phone: "+1 (555) 887-2201", status: "Active", score: 71, ltv: "$540.00", claims: 2, joined: "Oct 2024", review: "Good product, delivery was quick." },
};

const submissions = [
  { store: "Apple Store - Union Square", img: rect, date: "Nov 4, Dec 2024", amount: "$1,489.00", status: "APPROVED" as const },
  { store: "Best Buy Digital", img: img2, date: "Nov 4, Dec 2024", amount: "$345.50", status: "PENDING" as const },
  { store: "Sweetgreen - NYC", img: img3, date: "4 Oct, 4382 1900", amount: "$19.40", status: "AUDITED" as const },
];

const statusStyle = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  AUDITED: "bg-red-100 text-red-600",
};

const spendData = [
  { month: "Jan", a: 60, b: 40 },
  { month: "Feb", a: 100, b: 60 },
  { month: "Mar", a: 80, b: 50 },
  { month: "Apr", a: 140, b: 80 },
  { month: "May", a: 110, b: 70 },
  { month: "Jun", a: 160, b: 90 },
];

type Tab = "Overview";
const TABS: Tab[] = ["Overview"];

export default function CustomerProfile({ id }: { id: string }) {
  const router = useRouter();
  const customer = MOCK[id] ?? MOCK["c3"];
  const [status, setStatus] = useState<"Active" | "Suspended">(customer.status);
  const [modal, setModal] = useState(false);

  const handleToggle = () => { setStatus((s) => (s === "Active" ? "Suspended" : "Active")); setModal(false); };

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-gray-400 flex items-center gap-1">
        <span className="cursor-pointer hover:text-[#3E3EDF] flex items-center gap-1" onClick={() => router.push("/brandDashboard/customers")}>
          <MdArrowBack size={14} /> Customer Profile
        </span>
      </nav>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Profile header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gray-200">
              <Image src={profileImg} alt={customer.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h1 className="text-[20px] font-bold text-gray-900">{customer.name}</h1>
              <p className="text-sm text-gray-500">{customer.email}</p>
              <p className="text-xs text-gray-400">{customer.phone}</p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-center">
              {/* Score badge */}
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Score</p>
                <p className="text-[22px] font-black text-gray-900">{customer.score}</p>
              </div>
              <button
                onClick={() => setModal(true)}
                className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition ${
                  status === "Active"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-[#3E3EDF] text-white hover:bg-[#3232c0]"
                }`}
              >
                {status === "Active" ? <MdBlock size={15} /> : <MdCheckCircle size={15} />}
                {status === "Active" ? "Suspend Account" : "Unsuspend Account"}
              </button>
            </div>
          </div>

          {/* Status + quick stats */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {status}
            </span>
            {[
              { label: "LTV", value: customer.ltv },
              { label: "Claims", value: customer.claims.toString() },
              { label: "Member Since", value: customer.joined },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1">
                <span className="text-[10px] text-gray-400 font-semibold uppercase">{s.label}:</span>
                <span className="text-xs font-bold text-gray-800">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab */}
        <div className="flex border-b border-gray-100 px-5">
          {TABS.map((t) => (
            <button key={t} className="px-4 py-3 text-sm font-bold text-[#3E3EDF] border-b-2 border-[#3E3EDF] -mb-px">
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {/* Recent Receipt Submissions */}
          <div className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">Recent Receipt Submissions</h3>
              <div className="flex gap-2">
                <button className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <MdSearch size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {submissions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <Image src={s.img} alt={s.store} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{s.store}</p>
                    <p className="text-[10px] text-gray-400">{s.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">{s.amount}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Rated Review */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 mb-2">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Top Rated Review</h4>
                <div className="flex gap-0.5 ml-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MdStar key={i} size={12} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                &ldquo;{customer.review}&rdquo;
              </p>
            </div>
          </div>

          {/* Customer Insights chart */}
          <div className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-1">Customer Insights</h3>
            <p className="text-[11px] text-gray-400 mb-4">Spend history (last 6 months)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={spendData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} hide />
                <Tooltip contentStyle={{ borderRadius: 10, border: "none", fontSize: 11 }} />
                <Bar dataKey="a" fill="#3E3EDF" radius={[3, 3, 0, 0]} />
                <Bar dataKey="b" fill="#a5b4fc" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Mini stats */}
            <div className="mt-4 space-y-2">
              {[
                { label: "Shopper Score", value: `${customer.score}/100` },
                { label: "Lifetime Value", value: customer.ltv },
                { label: "Redemptions", value: customer.claims.toString() },
              ].map((s, i) => (
                <div key={i} className="flex justify-between text-xs py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">{s.label}</span>
                  <span className="font-bold text-gray-800">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <SuspendModal
          customerName={customer.name}
          mode={status === "Active" ? "suspend" : "unsuspend"}
          onConfirm={handleToggle}
          onCancel={() => setModal(false)}
        />
      )}
    </div>
  );
}

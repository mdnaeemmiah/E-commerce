"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdSearch, MdPeople, MdStar, MdTrendingUp, MdPayment,
  MdFilterList, MdCircle,
} from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SuspendModal from "./SuspendModal";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

type Status = "Active" | "Suspended";
type Filter = "All" | "Active" | "Suspended";

const INITIAL_CUSTOMERS = [
  {
    id: "c1",
    name: "Alexander Knight",
    memberId: "NB-9001",
    email: "a.knight@portfolio.com",
    phone: "+1 (555) 012-9921",
    claims: 42,
    rewards: "$12,482.00",
    status: "Active" as Status,
    lastActivity: "2 mins ago",
    img: profileImg,
  },
  {
    id: "c2",
    name: "Helena Sterling",
    memberId: "NB-4412",
    email: "h.sterling@nexus.io",
    phone: "+44 20 7946 0134",
    claims: 15,
    rewards: "$4,290.50",
    status: "Active" as Status,
    lastActivity: "1 hour ago",
    img: profileImg,
  },
  {
    id: "c3",
    name: "Julian Rossi",
    memberId: "NB-1182",
    email: "rossi@vanguard.co",
    phone: "+1 (555) 321-0012",
    claims: 0,
    rewards: "$0.00",
    status: "Suspended" as Status,
    lastActivity: "5 days ago",
    img: profileImg,
  },
  {
    id: "c4",
    name: "Maya Thornton",
    memberId: "NB-7729",
    email: "maya.t@creative.studio",
    phone: "+61 2 9876 5432",
    claims: 8,
    rewards: "$2,150.75",
    status: "Active" as Status,
    lastActivity: "12 mins ago",
    img: profileImg,
  },
];

const activity = [
  { dot: "bg-green-500", label: "New Batch Verified", desc: "428 new members onboarded via API" },
  { dot: "bg-blue-500", label: "High-Value Claim", desc: "Julian Rossi processed $4,200.00 claim" },
  { dot: "bg-red-500", label: "Protocol Alert", desc: "3 Suspicious activity logs detected" },
];

export default function CustomersPageContent() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [modal, setModal] = useState<{ id: string; name: string; mode: "suspend" | "unsuspend" } | null>(null);

  const visible = customers.filter((c) => {
    const matchFilter = filter === "All" || c.status === filter;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleToggle = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "Suspended" ? "Active" : "Suspended" } : c
      )
    );
    setModal(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900">Customer Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage institutional ledgers and member status.</p>
        </div>
        {/* Filter: All / Active / Suspended */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 self-start">
          {(["All", "Active", "Suspended"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition ${
                filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: <MdPeople size={18} className="text-[#3E3EDF]" />, bg: "bg-[#EEF0FF]",
            label: "TOTAL MEMBERS", value: "12,482",
            sub: <span className="text-green-600 font-semibold">↑ +6.2% from last month</span>,
          },
          {
            icon: <MdTrendingUp size={18} className="text-green-600" />, bg: "bg-green-50",
            label: "ACTIVE PORTFOLIO", value: "91.8%",
            sub: <span className="text-gray-400">Institutional Grade</span>,
          },
          {
            icon: <MdPayment size={18} className="text-purple-600" />, bg: "bg-purple-50",
            label: "TOTAL REWARDS", value: "$241,093",
            sub: <span className="text-[#3E3EDF] font-semibold">⬜ Distributed</span>,
          },
          {
            icon: <MdStar size={18} className="text-yellow-500" />, bg: "bg-yellow-50",
            label: "AVERAGE CLAIMS", value: "8.4",
            sub: <span className="text-green-600 font-semibold">↑ Per Member</span>,
          },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>{s.icon}</div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className="text-[26px] font-black text-gray-900 leading-tight mt-0.5">{s.value}</p>
            <p className="text-[11px] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Customer Ledger + Activity Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Ledger */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Ledger header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="text-[15px] font-bold text-gray-900">Customer Ledger</h2>
              <span className="text-[9px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full tracking-wide">
                LIVE DATA
              </span>
            </div>
            <div className="relative">
              <MdSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Customer"
                className="border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs outline-none focus:border-[#3E3EDF] w-44"
              />
            </div>
          </div>

          {/* Table head */}
          <div className="hidden sm:grid grid-cols-7 px-5 py-3 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Contact Information</div>
            <div>Claims</div>
            <div>Rewards Earned</div>
            <div>Status</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {visible.map((c) => (
              <div key={c.id} className="grid grid-cols-1 sm:grid-cols-7 px-5 py-4 items-center gap-2 hover:bg-gray-50 transition">
                {/* Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image src={c.img} alt={c.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                    <p className="text-[10px] text-gray-400">Member ID: {c.memberId}</p>
                  </div>
                </div>
                {/* Contact */}
                <div className="col-span-2">
                  <p className="text-xs text-gray-700">{c.email}</p>
                  <p className="text-[10px] text-gray-400">{c.phone}</p>
                </div>
                {/* Claims */}
                <p className="text-sm font-bold text-gray-800">{c.claims}</p>
                {/* Rewards */}
                <p className="text-sm font-bold text-[#3E3EDF]">{c.rewards}</p>
                {/* Status + Actions */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">{c.lastActivity}</p>
                  <div className="flex gap-1.5">
                    <Link
                      href={`/brandDashboard/customers/${c.id}`}
                      className="text-[10px] font-bold bg-[#EEF0FF] text-[#3E3EDF] px-2.5 py-1 rounded-lg hover:bg-[#dde0ff] transition"
                    >
                      Take Action
                    </Link>
                    <button
                      onClick={() =>
                        setModal({
                          id: c.id,
                          name: c.name,
                          mode: c.status === "Suspended" ? "unsuspend" : "suspend",
                        })
                      }
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition ${
                        c.status === "Suspended"
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-red-50 text-red-500 hover:bg-red-100"
                      }`}
                    >
                      {c.status === "Suspended" ? "Unsuspend" : "Suspend"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {visible.length === 0 && (
              <div className="text-center py-10 text-sm text-gray-400">No customers found.</div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400">
              Showing 1 to {visible.length} of 12,482 members
            </p>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <FiChevronLeft size={13} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-7 h-7 rounded-lg text-xs font-bold ${
                    p === 1 ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <FiChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Activity Pulse */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 h-fit">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Activity Pulse</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <MdCircle size={8} className={`${a.dot.replace("bg-", "text-")} mt-1.5 shrink-0`} />
                <div>
                  <p className="text-xs font-bold text-gray-800">{a.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modal && (
        <SuspendModal
          customerName={modal.name}
          mode={modal.mode}
          onConfirm={() => handleToggle(modal.id)}
          onCancel={() => setModal(null)}
        />
      )}
    </div>
  );
}

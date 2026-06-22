"use client";

import { useState } from "react";
import {
  MdAdd, MdCreditCard, MdAccountBalance, MdArrowUpward,
  MdArrowDownward, MdRefresh, MdChevronRight, MdCalendarToday,
} from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";

/* ─── Types ─── */
type TxStatus = "Succeeded" | "Pending" | "Failed" | "COMPLETED" | "PROCESSING";
type View = "overview" | "history";

/* ─── Mini Transaction list (overview) ─── */
const MINI_TXS = [
  { date: "Oct 24, 2023", desc: "Wallet Auto-Reload", amount: "+$5,000.00", positive: true, status: "COMPLETED" as TxStatus },
  { date: "Oct 22, 2023", desc: "Campaign: Q4 Brand Launch", amount: "-$1,240.50", positive: false, status: "PROCESSING" as TxStatus },
  { date: "Oct 19, 2023", desc: "API Usage Premium Tier", amount: "-$450.00", positive: false, status: "COMPLETED" as TxStatus },
  { date: "Oct 15, 2023", desc: "Manual Deposit - Wire", amount: "+$10,000.00", positive: true, status: "COMPLETED" as TxStatus },
];

/* ─── Full Transaction history ─── */
type TxType = "Wallet Top-up" | "Campaign Spend" | "Refund";
const FULL_TXS: { date: string; time: string; type: TxType; amount: string; positive: boolean; method: string; status: TxStatus }[] = [
  { date: "Oct 24, 2023", time: "10:42 AM", type: "Wallet Top-up", amount: "+$5,000.00", positive: true, method: "Bank Transfer ACH", status: "Succeeded" },
  { date: "Oct 23, 2023", time: "02:13 PM", type: "Campaign Spend", amount: "-$1,240.50", positive: false, method: "Visa •••• 9012", status: "Succeeded" },
  { date: "Oct 22, 2023", time: "09:09 AM", type: "Campaign Spend", amount: "-$3,500.00", positive: false, method: "Mastercard •••• 4455", status: "Pending" },
  { date: "Oct 21, 2023", time: "05:30 PM", type: "Refund", amount: "+$450.00", positive: true, method: "Visa •••• 9012", status: "Failed" },
  { date: "Oct 20, 2023", time: "11:15 AM", type: "Campaign Spend", amount: "-$8,900.00", positive: false, method: "Bank Transfer", status: "Succeeded" },
];

/* ─── Helpers ─── */
const miniStatusStyle: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700",
  PROCESSING: "bg-orange-100 text-orange-600",
};

const fullStatusStyle: Record<string, string> = {
  Succeeded: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-600",
};

const typeIcon: Record<TxType, React.ReactNode> = {
  "Wallet Top-up": <MdArrowUpward size={14} className="text-green-600" />,
  "Campaign Spend": <MdArrowDownward size={14} className="text-red-500" />,
  "Refund": <MdRefresh size={14} className="text-[#3E3EDF]" />,
};

/* ─── Component ─── */
export default function WalletPageContent() {
  const [view, setView] = useState<View>("overview");
  const [autoReload, setAutoReload] = useState(true);
  const [threshold, setThreshold] = useState("$ 500");
  const [reloadAmt, setReloadAmt] = useState("$ 5000");

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900">Billing &amp; Wallet</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("overview")}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${view === "overview" ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setView("history")}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${view === "history" ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            Transaction History
          </button>
        </div>
      </div>

      {/* ══════════ OVERVIEW ══════════ */}
      {view === "overview" && (
        <div className="space-y-5">
          {/* Balance card */}
          <div className="bg-[#3E3EDF] rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-2">
                  Available Balance
                </p>
                <p className="text-[40px] font-black text-white leading-none">$42,850.00</p>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                <button className="bg-white text-[#3E3EDF] text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition self-start flex items-center gap-2">
                  <MdAdd size={16} />
                  Add Funds
                </button>
                <p className="text-[11px] text-white/40 mt-1">
                  SOVEREIGN ID: •••• 8842
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white/70">Usage This Month</p>
                  <p className="text-[10px] text-white/50">October 1 – October 24</p>
                </div>
                <p className="text-lg font-black text-white">$12,480</p>
              </div>

              {/* Spending limit bar */}
              <div>
                <div className="flex justify-between text-[10px] text-white/60 mb-1.5">
                  <span>Spending Limit</span>
                  <span>$15,000</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: "83%" }} />
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Active Claims</p>
                  <p className="text-xl font-black text-white">248</p>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Avg. Claim</p>
                  <p className="text-xl font-black text-white">$50.32</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto Reload + Transaction History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Auto Reload */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center">
                  <MdRefresh size={18} className="text-[#3E3EDF]" />
                </div>
                <h2 className="text-[15px] font-bold text-gray-900">Auto Reload</h2>
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-5">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Enable Smart Reload</p>
                  <p className="text-xs text-gray-400">Automatically top-up balance</p>
                </div>
                <button
                  onClick={() => setAutoReload(!autoReload)}
                  className={`relative w-11 h-6 rounded-full overflow-hidden transition-colors shrink-0 ${autoReload ? "bg-[#3E3EDF]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoReload ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
                    Low Balance Threshold
                  </label>
                  <input
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-[#3E3EDF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">
                    Reload Amount
                  </label>
                  <input
                    value={reloadAmt}
                    onChange={(e) => setReloadAmt(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-[#3E3EDF]"
                  />
                </div>
              </div>
            </div>

            {/* Transaction History mini */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-gray-900">Transaction History</h2>
                <button
                  onClick={() => setView("history")}
                  className="text-xs font-bold text-[#3E3EDF] hover:underline"
                >
                  View All
                </button>
              </div>

              {/* Mini table header */}
              <div className="grid grid-cols-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase pb-2 border-b border-gray-100 mb-1">
                <div>Date</div>
                <div>Description</div>
                <div className="text-right">Amount / Status</div>
              </div>

              <div className="divide-y divide-gray-50">
                {MINI_TXS.map((tx, i) => (
                  <div key={i} className="grid grid-cols-3 py-3 items-center gap-1">
                    <p className="text-[11px] text-gray-400">{tx.date}</p>
                    <p className="text-xs font-medium text-gray-700 line-clamp-1">{tx.desc}</p>
                    <div className="text-right space-y-0.5">
                      <p className={`text-xs font-bold ${tx.positive ? "text-green-600" : "text-gray-800"}`}>
                        {tx.amount}
                      </p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${miniStatusStyle[tx.status]}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-bold text-gray-900">Payment Methods</h2>
              <button className="text-xs font-bold text-[#3E3EDF] flex items-center gap-1 hover:underline">
                <MdAdd size={14} /> Add New
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  icon: <MdCreditCard size={18} className="text-white" />,
                  bg: "bg-gray-800",
                  label: "Corporate Visa",
                  sub: "Expires 12/26 · Default",
                  last: "9012",
                },
                {
                  icon: <MdAccountBalance size={18} className="text-white" />,
                  bg: "bg-[#3E3EDF]",
                  label: "Chase Business Checking",
                  sub: "Account ending in •••• 4402",
                  last: "4402",
                },
              ].map((pm, i) => (
                <div key={i} className="flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-3.5 hover:bg-gray-50 transition cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl ${pm.bg} flex items-center justify-center shrink-0`}>
                    {pm.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {pm.label} •••• {pm.last}
                    </p>
                    <p className="text-xs text-gray-400">{pm.sub}</p>
                  </div>
                  <MdChevronRight size={20} className="text-gray-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ TRANSACTION HISTORY ══════════ */}
      {view === "history" && (
        <div className="space-y-5">
          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center">
            {["All Types", "Status"].map((f) => (
              <button key={f} className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-2 rounded-xl hover:bg-gray-50 bg-white">
                {f} <FiChevronDown size={14} />
              </button>
            ))}
            <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-2 rounded-xl hover:bg-gray-50 bg-white ml-auto">
              <MdCalendarToday size={14} className="text-gray-400" />
              Oct 1 – Oct 31, 2023
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Balance</p>
              <p className="text-[28px] font-black text-gray-900">$142,850.00</p>
              <p className="text-xs text-green-600 font-semibold mt-1">↑ +12%</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Spend</p>
              <p className="text-[28px] font-black text-gray-900">$54,210.30</p>
              <p className="text-xs text-gray-400 mt-1">of $80k Limit</p>
            </div>
            <div className="bg-[#3E3EDF] rounded-2xl p-5 text-white">
              <p className="text-[11px] font-bold opacity-70 uppercase tracking-wider mb-1">Upcoming Payout</p>
              <p className="text-[28px] font-black">$12,400.00</p>
              <p className="text-xs opacity-60 mt-1">Dec 01</p>
            </div>
          </div>

          {/* Full transactions table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-[15px] font-bold text-gray-900">Transaction History</h2>
            </div>

            {/* Table head */}
            <div className="hidden sm:grid grid-cols-5 px-5 py-3 bg-gray-50 text-[10px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
              <div>Date</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Method</div>
              <div>Status</div>
            </div>

            <div className="divide-y divide-gray-100">
              {FULL_TXS.map((tx, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-5 px-5 py-4 items-center gap-2 hover:bg-gray-50 transition">
                  {/* Date */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{tx.date}</p>
                    <p className="text-[10px] text-gray-400">{tx.time}</p>
                  </div>
                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === "Wallet Top-up" ? "bg-green-50" :
                      tx.type === "Refund" ? "bg-[#EEF0FF]" : "bg-red-50"
                    }`}>
                      {typeIcon[tx.type]}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{tx.type}</p>
                  </div>
                  {/* Amount */}
                  <p className={`text-sm font-black ${tx.positive ? "text-green-600" : "text-gray-800"}`}>
                    {tx.amount}
                  </p>
                  {/* Method */}
                  <div className="flex items-center gap-1.5">
                    <MdCreditCard size={14} className="text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-600">{tx.method}</p>
                  </div>
                  {/* Status */}
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full self-start ${fullStatusStyle[tx.status]}`}>
                    {tx.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
              <p className="text-[11px] text-gray-400">Showing 1-10 of 2,481 transactions</p>
              <div className="flex gap-1">
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <FiChevronLeft size={13} />
                </button>
                {[1, 2, 3].map((p) => (
                  <button key={p} className={`w-7 h-7 rounded-lg text-xs font-bold ${p === 1 ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    {p}
                  </button>
                ))}
                <span className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">...</span>
                <button className="w-7 h-7 rounded-lg border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">248</button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <FiChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

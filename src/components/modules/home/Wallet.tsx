"use client";

import { useState, useEffect } from "react";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";

const STATIC_DATA = {
  walletPayment: { balance: 42.50, currency: "USD" },
  rewards: [
    { id: 1, title: "Summer Cashback", amount: 5.00, date: "Oct 24, 2024", status: "Credited" },
    { id: 2, title: "Nitro Brew Promo", amount: 3.50, date: "Oct 18, 2024", status: "Credited" },
    { id: 3, title: "Green Earth Rebate", amount: 8.00, date: "Oct 10, 2024", status: "Pending" },
  ],
  transactionHistory: [
    { id: 1, desc: "Withdrawal", amount: -10.00, date: "Oct 20, 2024" },
    { id: 2, desc: "Reward Credit", amount: +5.00, date: "Oct 18, 2024" },
  ],
};

export default function Wallet() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [walletPayment, setWalletPayment] = useState<any>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    // API calls disabled — static mode
    setWalletPayment(STATIC_DATA.walletPayment);
    setRewards(STATIC_DATA.rewards);
    setTransactionHistory(STATIC_DATA.transactionHistory);
  }, []);

  return (
    <div className="py-8 space-y-4">

        {/* Balance */}
        <div className="bg-[#3E3EDF] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3 opacity-80">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            <p className="text-sm font-semibold tracking-wide">Available Balance</p>
          </div>
          <p className="text-4xl font-black">${walletPayment?.balance?.toFixed(2) ?? "0.00"}</p>
          <p className="text-xs opacity-50 mt-1">{walletPayment?.currency}</p>
        </div>

        {/* Reward History */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <div className="w-6 h-6 rounded-full border-2 border-[#3E3EDF] flex items-center justify-center">
              <span className="text-[#3E3EDF] text-xs font-black">$</span>
            </div>
            <p className="text-sm font-bold text-gray-700">Reward History</p>
          </div>
          <div className="divide-y divide-gray-100">
            {rewards.map((r) => (
              <div key={r.id} className="flex justify-between items-center px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#3E3EDF]">+${r.amount.toFixed(2)}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${r.status === "Credited" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Wallet */}
        <button className="w-full border border-[#3E3EDF] text-[#3E3EDF] font-semibold py-4 rounded-2xl hover:bg-indigo-50 transition text-sm">
          View Full Wallet
        </button>
    </div>
  );
}

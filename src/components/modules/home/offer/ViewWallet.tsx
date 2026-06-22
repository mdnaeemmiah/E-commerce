import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";

const STATIC_WALLET = {
  balance: 42.50,
  currency: "USD",
  rewards: [
    { id: 1, campaign: "Summer Cashback", amount: 5.00, date: "Oct 24, 2024", status: "Credited" },
    { id: 2, campaign: "Nitro Brew Promo", amount: 3.50, date: "Oct 18, 2024", status: "Credited" },
    { id: 3, campaign: "Green Earth Rebate", amount: 8.00, date: "Oct 10, 2024", status: "Pending" },
  ],
};

export default function ViewWallet() {
  const [walletPayment, setWalletPayment] = useState<typeof STATIC_WALLET | null>(null);

  // API call disabled — static mode
  // const getWalletPayment = async () => {
  //   const token = localStorage.getItem("access_token");
  //   const response = await baseApi.get(ENDPOINTS.walletPayment, { headers: { Authorization: `Bearer ${token}` } });
  //   setWalletPayment(response.data);
  // };

  useEffect(() => {
    setWalletPayment(STATIC_WALLET);
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Balance Card */}
      <div className="bg-linear-to-r from-[#3E3EDF] to-indigo-500 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <IoWalletOutline size={20} className="opacity-80" />
          <p className="text-sm font-semibold opacity-80">Available Balance</p>
        </div>
        <p className="text-[32px] font-black leading-none">
          ${walletPayment?.balance.toFixed(2) ?? "0.00"}
        </p>
        <p className="text-xs opacity-60 mt-1">{walletPayment?.currency ?? "USD"}</p>
      </div>

      {/* Rewards List */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <AiOutlineDollarCircle size={18} className="text-[#3E3EDF]" />
          <h3 className="text-sm font-bold text-gray-800">Reward History</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {walletPayment?.rewards.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">{r.campaign}</p>
                <p className="text-xs text-gray-400">{r.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+${r.amount.toFixed(2)}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === "Credited" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/wallet"
        className="block text-center text-sm font-semibold text-[#3E3EDF] border border-[#3E3EDF] py-3 rounded-xl hover:bg-[#EEF0FF] transition"
      >
        View Full Wallet
      </Link>
    </div>
  );
}

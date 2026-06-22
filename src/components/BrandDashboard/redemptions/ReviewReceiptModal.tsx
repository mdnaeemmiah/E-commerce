"use client";

import { useState } from "react";
import Image from "next/image";
import { MdClose, MdCheckCircle } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";

type Props = { onClose: () => void; receiptId?: string; customer?: string; };

const ITEMS = [
  { name: "KETTLE CHIPS", amount: "$3.16", match: true },
  { name: "TRADER JOES", amount: "$1.30", match: true },
  { name: "PRICE: PROM...", amount: "$4.50", match: false },
];

export default function ReviewReceiptModal({ onClose, receiptId = "TXN-9402", customer = "Alex Sterling" }: Props) {
  const [feedback, setFeedback] = useState("");
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-[15px] font-bold text-gray-900">Review Receipt #{receiptId}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <MdClose size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Receipt image strip */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-4">
              <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                <Image src={rect} alt="Receipt" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">WHOLEFOODS MARKET</p>
                <div className="mt-2 space-y-1">
                  {[
                    { k: "Customer", v: "Summer Solstice Cashback" },
                    { k: "Redemption", v: customer },
                    { k: "Date", v: "Oct 26, 2021 — To: 12" },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="text-gray-400">{r.k}</span>
                      <span className="font-semibold text-gray-700">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Items */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Receipt Items</p>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {ITEMS.map((item, i) => (
                    <tr key={i} className="px-4">
                      <td className="px-4 py-2.5 text-xs font-medium text-gray-700">{item.name}</td>
                      <td className="px-4 py-2.5 text-xs font-bold text-gray-800 text-right">{item.amount}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.match ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}>
                          {item.match ? "MATCH" : "REVIEW"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Total</span>
                <span className="text-sm font-black text-gray-900">$23.17</span>
              </div>
            </div>
          </div>

          {/* OCR Extracted Data */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              ⓘ OCR Extracted Data
            </p>
            <div className="bg-[#EEF0FF] border border-[#3E3EDF]/20 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-800">Kettle Chips 550g</p>
                <p className="text-[10px] text-gray-500">SKU: KETCH-550 · Line item confirmed</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#3E3EDF]">$6.99</p>
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">MATCH</span>
              </div>
            </div>
          </div>

          {/* Auditor Feedback */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Auditor Feedback
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add reviewer notes or flags..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleApprove}
            className={`w-full flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-xl transition ${
              approved ? "bg-green-500 text-white" : "bg-[#3E3EDF] text-white hover:bg-[#3232c0]"
            }`}
          >
            <MdCheckCircle size={18} />
            {approved ? "Approved!" : "Approve & Reward"}
          </button>
        </div>
      </div>
    </div>
  );
}

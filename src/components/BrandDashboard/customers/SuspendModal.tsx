"use client";

import { MdWarning } from "react-icons/md";

type Props = {
  customerName: string;
  mode: "suspend" | "unsuspend";
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SuspendModal({ customerName, mode, onConfirm, onCancel }: Props) {
  const isSuspend = mode === "suspend";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-7 text-center">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
          <MdWarning size={26} className="text-red-500" />
        </div>

        <h2 className="text-[16px] font-bold text-gray-900 mb-3">
          {isSuspend ? "Suspend Customer Account?" : "Unsuspend Customer Account?"}
        </h2>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {isSuspend
            ? `Are you sure you want to suspend this shopper from all rebate and review offers for your brand? This action will prevent them from participating in future campaigns.`
            : `Are you sure you want to unsuspend this shopper from all rebate and review offers for your brand? This action will prevent them from participating in future campaigns.`}
        </p>

        <button
          onClick={onConfirm}
          className="w-full text-sm font-bold bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition mb-2"
        >
          {isSuspend ? "Suspend Customer" : "Unsuspend Customer"}
        </button>
        <button
          onClick={onCancel}
          className="w-full text-sm font-semibold text-gray-500 py-2 hover:text-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

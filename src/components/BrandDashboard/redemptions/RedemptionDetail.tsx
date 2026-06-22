"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdCheckCircle, MdFlag, MdAdd } from "react-icons/md";
import { useState } from "react";
import profileImg from "@/app/assets/auth/Ellipse 2.png";
import rect from "@/app/assets/dashboard/Rectangle 923.png";

const MOCK: Record<string, {
  id: string; campaignName: string; customer: string; status: string;
  amount: string; date: string; flags: number; notes: string[];
}> = {
  r1284: { id: "r1284", campaignName: "Premium Snack Rewards Program", customer: "Marcus Aurelius", status: "Approved", amount: "$15.00", date: "Oct 26, 2024", flags: 3, notes: [] },
  r1285: { id: "r1285", campaignName: "Discount Cashback", customer: "Maya Vance", status: "Pending", amount: "$4.50", date: "May 11, 2024", flags: 0, notes: [] },
  r1286: { id: "r1286", campaignName: "Citing Rewards", customer: "Julian Drake", status: "Manual Review", amount: "$28.40", date: "May 12, 2024", flags: 2, notes: [] },
};

const LIFECYCLE = [
  { label: "Reservation Created", date: "Oct 26, 2024", amount: "$1.50", done: true },
  { label: "Purchase Made", date: "Oct 28, 2024", amount: "$1.50", done: true },
  { label: "Receipt Uploaded", date: "Oct 29, 2024", amount: "$1.50", done: true },
  { label: "OCR Match Successful", date: "Oct 29, 2024", amount: "$1.50", done: true },
  { label: "Manual Review Approved", date: "Oct 29, 2024", amount: "$1.50", done: true },
  { label: "Payout Issued", date: "Oct 29, 2024", amount: "$1.50", done: true },
];

const statusStyle: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Rejected: "bg-red-100 text-red-600 border border-red-200",
  "Manual Review": "bg-blue-100 text-[#3E3EDF] border border-blue-200",
};

export default function RedemptionDetail({ id }: { id: string }) {
  const router = useRouter();
  const redemption = MOCK[id] ?? MOCK["r1284"];
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>(redemption.notes);

  return (
    <div className="p-4 md:p-6 space-y-5  mx-auto">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-gray-400 flex items-center gap-1">
        <span className="cursor-pointer hover:text-[#3E3EDF] flex items-center gap-1" onClick={() => router.push("/brandDashboard/redemptions")}>
          <MdArrowBack size={14} /> Redemptions
        </span>
        <span>/</span>
        <span className="text-gray-700 font-medium">#{redemption.id.replace("r", "")}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Redemption #{redemption.id.replace("r", "")}</h1>
          <p className="text-sm text-gray-400">Campaign: {redemption.campaignName}</p>
        </div>
        <span className={`text-sm font-bold px-4 py-1.5 rounded-full self-start sm:self-center ${statusStyle[redemption.status] ?? "bg-gray-100 text-gray-500"}`}>
          ● Status: {redemption.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left — Lifecycle + Notes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Transaction Lifecycle */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                Transaction Lifecycle
              </h2>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                EVIDENCE SECTION · MINIMAL
              </span>
            </div>

            <div className="space-y-0">
              {LIFECYCLE.map((step, i) => (
                <div key={i} className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? "bg-[#3E3EDF]" : "bg-gray-200"}`}>
                      <MdCheckCircle size={16} className="text-white" />
                    </div>
                    {i < LIFECYCLE.length - 1 && (
                      <div className="w-0.5 bg-[#3E3EDF]/30 flex-1 my-1" style={{ minHeight: 24 }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-800">{step.label}</p>
                      <span className="text-xs font-bold text-[#3E3EDF]">{step.amount}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flags + Internal Notes */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            {redemption.flags > 0 && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <MdFlag size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-semibold text-red-600">{redemption.flags} Flags Raised</p>
                <p className="text-xs text-red-400 ml-auto">This receipt was not manually validated by the agent.</p>
              </div>
            )}

            <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-3">
              Internal Notes
            </h2>
            <div className="space-y-2 mb-3">
              {notes.length === 0 && (
                <p className="text-xs text-gray-400">No notes yet. Add one below.</p>
              )}
              {notes.map((n, i) => (
                <div key={i} className="bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-700">{n}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && note.trim()) { setNotes([...notes, note.trim()]); setNote(""); } }}
                placeholder="Add a note..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#3E3EDF]"
              />
              <button
                onClick={() => { if (note.trim()) { setNotes([...notes, note.trim()]); setNote(""); } }}
                className="flex items-center gap-1 bg-[#3E3EDF] text-white text-xs font-bold px-3 py-2.5 rounded-xl hover:bg-[#3232c0] transition"
              >
                <MdAdd size={14} /> Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Right — Customer + Evidence */}
        <div className="space-y-4">
          {/* Customer Profile */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">
              Customer Profile
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image src={profileImg} alt={redemption.customer} fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{redemption.customer}</p>
                <p className="text-xs text-gray-400">Verified Customer</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              {[
                { label: "Amount", value: redemption.amount },
                { label: "Submitted", value: redemption.date },
                { label: "Campaign", value: redemption.campaignName },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-700 text-right max-w-[60%] line-clamp-1">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
                Receipt Evidence
              </h2>
            </div>
            <div className="relative w-full h-44">
              <Image src={rect} alt="Receipt" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-end p-3">
                <span className="text-white text-[10px] font-bold bg-black/50 px-2 py-1 rounded">
                  WFM-2024-{id}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="flex-1 text-sm font-semibold border border-red-300 text-red-500 py-2.5 rounded-xl hover:bg-red-50 transition">
              Reject
            </button>
            <button className="flex-1 text-sm font-semibold bg-[#3E3EDF] text-white py-2.5 rounded-xl hover:bg-[#3232c0] transition">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

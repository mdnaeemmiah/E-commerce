"use client";

import { useState } from "react";
import Image from "next/image";
import { MdFlag, MdVisibility, MdCheckCircle, MdCancel } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReviewReceiptModal from "./ReviewReceiptModal";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

const QUEUE = [
  { id: "q1", user: "Diana", userId: "Jade Andres", campaign: "Artisan Blend", issue: "OCR Mismatch", submitted: "Oct 24, 24:20", priority: "High" as const },
  { id: "q2", user: "Michael", userId: "Reed Michaels", campaign: "Proud Blend", issue: "Unclear SKU", submitted: "Oct 23, 24:20", priority: "Medium" as const },
  { id: "q3", user: "Jamison", userId: "Jamison Blg", campaign: "Tag Upgrade Offering", issue: "Duplicate SKU", submitted: "Oct 23, 24:20", priority: "Medium" as const },
  { id: "q4", user: "Sarah", userId: "Andris Rumble", campaign: "Green Earth Botanics", issue: "OCR Mismatch", submitted: "Oct 23, 24:20", priority: "Medium" as const },
];

const priorityStyle = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-yellow-100 text-yellow-700",
};

type FilterPriority = "All" | "High Priority" | "Medium Priority";

export default function ManualReviewQueue() {
  const [filter, setFilter] = useState<FilterPriority>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = QUEUE.filter((r) => {
    if (filter === "High Priority") return r.priority === "High";
    if (filter === "Medium Priority") return r.priority === "Medium";
    return true;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-gray-900">Redemptions Hub</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          REDEMPTION REVIEW QUEUE — Processing outstanding approval status
        </p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap gap-4">
        {[
          { value: "48", label: "Pending Reviews", color: "text-gray-900" },
          { value: "95%", label: "Approval Rate", color: "text-green-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-sm text-center">
            <p className={`text-[28px] font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}

        {/* Priority filters */}
        <div className="flex gap-2 items-center ml-auto flex-wrap">
          {(["All", "High Priority", "Medium Priority"] as FilterPriority[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                filter === f ? "bg-[#3E3EDF] text-white border-[#3E3EDF]" : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f === "High Priority" && <MdFlag className="inline mr-1 text-red-400" size={12} />}
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="hidden sm:grid grid-cols-6 px-5 py-3 bg-gray-50 text-[11px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
          <div className="col-span-2">User</div>
          <div>Campaign</div>
          <div>Issue</div>
          <div>Submitted</div>
          <div>Priority / Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filtered.map((r) => (
            <div key={r.id} className="grid grid-cols-1 sm:grid-cols-6 px-5 py-4 items-center gap-2 hover:bg-gray-50 transition">
              {/* User */}
              <div className="col-span-2 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image src={profileImg} alt={r.user} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.user}</p>
                  <p className="text-xs text-gray-400">{r.userId}</p>
                </div>
              </div>

              {/* Campaign */}
              <p className="text-xs text-gray-700 font-medium">{r.campaign}</p>

              {/* Issue */}
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${r.issue.includes("OCR") ? "bg-orange-100 text-orange-600" : r.issue.includes("Duplicate") ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"}`}>
                  {r.issue}
                </span>
              </div>

              {/* Submitted */}
              <p className="text-xs text-gray-500">{r.submitted}</p>

              {/* Priority + Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${priorityStyle[r.priority]}`}>
                  {r.priority}
                </span>
                <div className="flex gap-1 ml-auto">
                  <button
                    onClick={() => { setSelectedId(r.id); setModalOpen(true); }}
                    className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition"
                    title="Review Receipt"
                  >
                    <MdVisibility size={14} className="text-[#3E3EDF]" />
                  </button>
                  <button className="w-7 h-7 rounded-lg border border-green-200 flex items-center justify-center hover:bg-green-50 transition">
                    <MdCheckCircle size={14} className="text-green-500" />
                  </button>
                  <button className="w-7 h-7 rounded-lg border border-red-200 flex items-center justify-center hover:bg-red-50 transition">
                    <MdCancel size={14} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
            Showing {filtered.length} of 48 Results
          </p>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"><FiChevronLeft size={13} /></button>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-bold ${p === 1 ? "bg-[#3E3EDF] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{p}</button>
            ))}
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"><FiChevronRight size={13} /></button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {modalOpen && (
        <ReviewReceiptModal
          receiptId={`TXN-${selectedId?.replace("q", "940")}`}
          onClose={() => { setModalOpen(false); setSelectedId(null); }}
        />
      )}
    </div>
  );
}

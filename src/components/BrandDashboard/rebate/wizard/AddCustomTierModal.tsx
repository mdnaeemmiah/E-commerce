"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";

export interface Tier {
  id: string;
  name: string;
  badging: string;
  rebateType: "%" | "$";
  rebateAmount: string;
  minPurchase: string;
  claimLimitPerUser: string;
  totalClaimLimit: string;
  fulfillmentSpeed: string;
}

interface Props {
  onAdd: (tier: Tier) => void;
  onClose: () => void;
}

const FULFILLMENT_OPTIONS = ["Instant", "1-3 Business Days", "3-5 Business Days", "1 Week"];

export default function AddCustomTierModal({ onAdd, onClose }: Props) {
  const [form, setForm] = useState<Omit<Tier, "id">>({
    name: "",
    badging: "",
    rebateType: "%",
    rebateAmount: "",
    minPurchase: "",
    claimLimitPerUser: "",
    totalClaimLimit: "",
    fulfillmentSpeed: "Instant",
  });

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleAdd = () => {
    if (!form.name || !form.rebateAmount || !form.minPurchase) return;
    onAdd({ ...form, id: Date.now().toString() });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Add Custom Tier</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Tier Identity */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Tier Identity</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Tier Name</label>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Bronze, Silver, Gold"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Tier Badging</label>
                <input
                  value={form.badging}
                  onChange={(e) => set("badging", e.target.value)}
                  placeholder="e.g. 🥉 Bronze Member"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                />
              </div>
            </div>
          </div>

          {/* Reward Logic */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Reward Logic</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Rebate Type</label>
                <div className="flex gap-2">
                  {(["%", "$"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm((f) => ({ ...f, rebateType: t }))}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg border transition ${
                        form.rebateType === t
                          ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#3E3EDF]"
                      }`}
                    >
                      {t === "%" ? "Percentage %" : "Fixed Amount $"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">
                    Rebate Amount ({form.rebateType})
                  </label>
                  <input
                    type="number"
                    value={form.rebateAmount}
                    onChange={(e) => set("rebateAmount", e.target.value)}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Min Purchase Amount ($)</label>
                  <input
                    type="number"
                    value={form.minPurchase}
                    onChange={(e) => set("minPurchase", e.target.value)}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Financial Controls */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Financial Controls</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Claim Limit / User</label>
                <input
                  type="number"
                  value={form.claimLimitPerUser}
                  onChange={(e) => set("claimLimitPerUser", e.target.value)}
                  placeholder="e.g. 1"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Total Claim Limit</label>
                <input
                  type="number"
                  value={form.totalClaimLimit}
                  onChange={(e) => set("totalClaimLimit", e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
                />
              </div>
            </div>
          </div>

          {/* Incentives */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Incentives</h4>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Fulfillment Speed</label>
              <select
                value={form.fulfillmentSpeed}
                onChange={(e) => set("fulfillmentSpeed", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
              >
                {FULFILLMENT_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2 rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!form.name || !form.rebateAmount || !form.minPurchase}
            className="flex-1 bg-[#3E3EDF] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#3232c0] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Tier
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MdLock, MdAdd, MdDelete, MdWarning, MdToggleOn, MdToggleOff } from "react-icons/md";
import AddCustomTierModal, { Tier } from "./AddCustomTierModal";

export interface Step3Data {
  totalBudget: string;
  maxContribution: string;
  tiers: Tier[];
  failsafe: boolean;
}

interface Props {
  data: Step3Data;
  onChange: (data: Step3Data) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Budget({ data, onChange, onNext, onBack }: Props) {
  const [showModal, setShowModal] = useState(false);

  const set = (key: keyof Step3Data, value: string | boolean | Tier[]) =>
    onChange({ ...data, [key]: value });

  const addTier = (tier: Tier) => {
    set("tiers", [...data.tiers, tier]);
    setShowModal(false);
  };

  const removeTier = (id: string) =>
    set("tiers", data.tiers.filter((t) => t.id !== id));

  const totalBudget = parseFloat(data.totalBudget) || 0;
  const hasErrors = data.tiers.some((t) => !t.rebateAmount || !t.minPurchase);

  const allocatedAmount = data.tiers.reduce(
    (acc, t) => acc + (parseFloat(t.rebateAmount) || 0) * (parseFloat(t.claimLimitPerUser || "1")),
    0
  );
  const allocatedPercent = totalBudget > 0 ? Math.min(100, (allocatedAmount / totalBudget) * 100) : 0;

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Budget &amp; Offers Configuration</h2>
        <p className="text-sm text-gray-400 mt-1">
          Set your total campaign budget and define reward tiers for qualifying purchases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1">
        {/* Left — form (wider) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Budget inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#EEF0FF] border border-[#3E3EDF]/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <MdLock size={15} className="text-[#3E3EDF]" />
                <p className="text-[11px] font-bold tracking-widest text-[#3E3EDF] uppercase">
                  Total Campaign Budget
                </p>
              </div>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">$</span>
                <input
                  type="number"
                  value={data.totalBudget}
                  onChange={(e) => set("totalBudget", e.target.value)}
                  placeholder="2450.00"
                  className="w-full border border-[#3E3EDF]/30 rounded-lg pl-7 pr-3 py-2.5 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/40 bg-white"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Last Campaign: $2,000.00</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                Max Per User
              </p>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-sm">$</span>
                <input
                  type="number"
                  value={data.maxContribution}
                  onChange={(e) => set("maxContribution", e.target.value)}
                  placeholder="50.00"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Max contribution per user</p>
            </div>
          </div>

          {/* Reward Logic / Tiers table */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h3 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                Reward Logic
              </h3>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-xs font-semibold text-[#3E3EDF] border border-[#3E3EDF] px-3 py-1.5 rounded-lg hover:bg-[#EEF0FF] transition"
              >
                <MdAdd size={14} />
                Add Tier
              </button>
            </div>

            {data.tiers.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                No tiers added yet. Click &quot;Add Tier&quot; to get started.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-[11px] font-bold tracking-wider text-gray-400 uppercase border-b border-gray-100">
                      <th className="px-4 py-3 text-left">Tier Name</th>
                      <th className="px-4 py-3 text-left">Min Purchase</th>
                      <th className="px-4 py-3 text-left">Rebate</th>
                      <th className="px-4 py-3 text-left">Claim Limit</th>
                      <th className="px-4 py-3 text-left">Fulfillment</th>
                      <th className="px-4 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.tiers.map((tier) => {
                      const hasError = !tier.rebateAmount || !tier.minPurchase;
                      return (
                        <tr key={tier.id} className={`${hasError ? "bg-red-50" : "hover:bg-gray-50"} transition`}>
                          <td className="px-4 py-3 font-semibold text-gray-800">
                            <div className="flex items-center gap-1.5">
                              {hasError && <MdWarning size={14} className="text-red-500 flex-shrink-0" />}
                              <span>{tier.name || <span className="text-red-400 text-xs">Required</span>}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            ${tier.minPurchase || <span className="text-red-400 text-xs">Required</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {tier.rebateType}
                            {tier.rebateAmount || <span className="text-red-400 text-xs">Required</span>}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{tier.claimLimitPerUser || "—"}</td>
                          <td className="px-4 py-3 text-gray-600">{tier.fulfillmentSpeed}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => removeTier(tier.id)}
                              className="text-red-400 hover:text-red-600 transition"
                            >
                              <MdDelete size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Failsafe toggle */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Failsafe Contribution</p>
              <p className="text-xs text-gray-400">Auto-pause campaign when budget runs out</p>
            </div>
            <button
              onClick={() => set("failsafe", !data.failsafe)}
              className="text-[#3E3EDF] transition"
            >
              {data.failsafe ? (
                <MdToggleOn size={36} className="text-[#3E3EDF]" />
              ) : (
                <MdToggleOff size={36} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Right — Budget Summary Card */}
        <div className="space-y-4">
          <div className="bg-[#3E3EDF] text-white rounded-2xl p-5 shadow-md">
            <p className="text-[11px] font-bold tracking-widest uppercase opacity-80 mb-2">
              Budget &amp; Tiers
            </p>
            <p className="text-[32px] font-bold leading-none">
              ${totalBudget > 0 ? totalBudget.toFixed(2) : "0.00"}
            </p>
            <p className="text-xs opacity-70 mt-1">Total Campaign Budget</p>

            {/* Allocation bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs opacity-80 mb-1">
                <span>Allocated</span>
                <span>{allocatedPercent.toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${Math.min(100, allocatedPercent)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs opacity-70 mt-1">
                <span>${allocatedAmount.toFixed(2)}</span>
                <span>${(totalBudget - allocatedAmount).toFixed(2)} left</span>
              </div>
            </div>
          </div>

          {/* Tier summary */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
              Discount Tiers
            </p>
            {data.tiers.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No tiers configured yet</p>
            ) : (
              <div className="space-y-2">
                {data.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{tier.name}</p>
                      <p className="text-[10px] text-gray-400">Min: ${tier.minPurchase}</p>
                    </div>
                    <p className="text-sm font-bold text-[#3E3EDF]">
                      {tier.rebateType}{tier.rebateAmount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Max per user */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              Max Per User
            </p>
            <p className="text-xl font-bold text-gray-900">
              ${parseFloat(data.maxContribution || "0").toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Products
        </button>
        <button
          onClick={onNext}
          disabled={data.tiers.length === 0 || hasErrors || !data.totalBudget}
          className="text-sm bg-[#3E3EDF] text-white px-5 py-2 rounded-lg hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Final Review →
        </button>
      </div>

      {showModal && <AddCustomTierModal onAdd={addTier} onClose={() => setShowModal(false)} />}
    </div>
  );
}

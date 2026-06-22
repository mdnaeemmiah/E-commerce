"use client";

import Image from "next/image";
import { MdCheckCircle, MdRocketLaunch, MdAccountBalanceWallet, MdPeople, MdBarChart, MdTrendingUp } from "react-icons/md";
import { Step1Data } from "./Step1Basics";
import { Step2Data } from "./Step2Products";
import { Step3Data } from "./Step3Budget";
import { StaticImageData } from "next/image";

import img1 from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import img7 from "@/app/assets/saved/8380003.jpg";
import img8 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

const MOCK_PRODUCTS: Record<string, { name: string; img: StaticImageData }> = {
  p1: { name: "Kettle Sea Salt Chips", img: img1 },
  p2: { name: "Nitro Cold Brew", img: img2 },
  p3: { name: "Premium Sparkling Water", img: img3 },
  p4: { name: "Wild Berry Trail Mix", img: img4 },
  p5: { name: "Zesty Lime Sparkler", img: img5 },
  p6: { name: "Dark Cacao Bar", img: img6 },
  p7: { name: "Honey Almond Granola", img: img7 },
  p8: { name: "Organic Green Tea", img: img8 },
};

interface Props {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  onBack: () => void;
  onPublish: () => void;
}

export default function Step4Review({ step1, step2, step3, onBack, onPublish }: Props) {
  const totalBudget = parseFloat(step3.totalBudget) || 0;
  const allocatedAmount = step3.tiers.reduce(
    (acc, t) =>
      acc + (parseFloat(t.rebateAmount) || 0) * (parseFloat(t.claimLimitPerUser || "1")),
    0
  );
  const allOk =
    !!step1.campaignName &&
    step2.selectedProducts.length > 0 &&
    !!step3.totalBudget &&
    step3.tiers.length > 0;

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Rebate Wizard: Final Review</h2>
        <p className="text-sm text-gray-400 mt-1">
          Review your campaign before publishing. You can go back to make changes.
        </p>
      </div>

      {/* Main three columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Campaign Identity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">
            Campaign Identity
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#EEF0FF] flex-shrink-0">
              <Image src={profileImg} alt="Campaign" fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm truncate">
                {step1.campaignName || "Untitled Campaign"}
              </p>
              <p className="text-xs text-gray-400">
                {step1.startDate || "Aug 6"} → {step1.endDate || "Ongoing"}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 border-t border-gray-100 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Type</span>
              <span className="font-semibold text-gray-800 capitalize">{step1.campaignType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                  step1.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step1.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Credits</span>
              <span className="font-semibold text-gray-800">${step1.credits || "0"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Failsafe</span>
              <span
                className={`font-semibold text-xs ${step3.failsafe ? "text-green-600" : "text-gray-400"}`}
              >
                {step3.failsafe ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          {step1.description && (
            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-3 leading-relaxed">
              {step1.description}
            </p>
          )}
        </div>

        {/* Budget & Tiers */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-3">
            Budget &amp; Tiers
          </h3>
          <div className="bg-[#3E3EDF] text-white rounded-xl p-4 mb-4 text-center">
            <p className="text-[28px] font-bold leading-none">${totalBudget.toFixed(2)}</p>
            <p className="text-xs opacity-70 mt-1">Total Campaign Budget</p>
          </div>

          <div className="space-y-2 mb-4">
            {step3.tiers.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-2">No tiers configured</p>
            ) : (
              step3.tiers.map((tier) => (
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
              ))
            )}
          </div>

          {/* Allocation bar */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Allocated</span>
              <span>
                {totalBudget > 0
                  ? `${((allocatedAmount / totalBudget) * 100).toFixed(0)}%`
                  : "0%"}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3E3EDF] rounded-full transition-all"
                style={{
                  width: `${totalBudget > 0 ? Math.min(100, (allocatedAmount / totalBudget) * 100) : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>${allocatedAmount.toFixed(2)} allocated</span>
              <span>${(totalBudget - allocatedAmount).toFixed(2)} remaining</span>
            </div>
          </div>
        </div>

        {/* External Products */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">
            External Products{" "}
            <span className="text-[#3E3EDF] normal-case tracking-normal">
              ({step2.selectedProducts.length})
            </span>
          </h3>
          {step2.selectedProducts.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">No products selected</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {step2.selectedProducts.map((id) => {
                const p = MOCK_PRODUCTS[id];
                if (!p) return null;
                return (
                  <div key={id} className="text-center">
                    <div className="relative w-full h-14 rounded-lg overflow-hidden mb-1">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                    <p className="text-[9px] text-gray-500 leading-tight line-clamp-2">{p.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Financial Essentials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {[
          {
            icon: <MdAccountBalanceWallet size={18} className="text-[#3E3EDF]" />,
            label: "Total Budget",
            value: `$${totalBudget.toFixed(2)}`,
            bg: "bg-[#EEF0FF]",
          },
          {
            icon: <MdPeople size={18} className="text-green-600" />,
            label: "Products",
            value: `${step2.selectedProducts.length} SKUs`,
            bg: "bg-green-50",
          },
          {
            icon: <MdBarChart size={18} className="text-orange-500" />,
            label: "Tiers",
            value: `${step3.tiers.length} configured`,
            bg: "bg-orange-50",
          },
          {
            icon: <MdTrendingUp size={18} className="text-purple-600" />,
            label: "Max Per User",
            value: `$${parseFloat(step3.maxContribution || "0").toFixed(2)}`,
            bg: "bg-purple-50",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3"
          >
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</p>
              <p className="text-sm font-bold text-gray-800">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          { label: "Campaign name set", ok: !!step1.campaignName },
          { label: "Products selected", ok: step2.selectedProducts.length > 0 },
          { label: "Budget configured", ok: !!step3.totalBudget },
          { label: "At least 1 tier", ok: step3.tiers.length > 0 },
        ].map((c, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
              c.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500"
            }`}
          >
            <MdCheckCircle size={13} className={c.ok ? "text-green-500" : "text-red-400"} />
            {c.label}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Budget
        </button>
        <div className="flex gap-3">
          <button className="text-sm text-[#3E3EDF] border border-[#3E3EDF] px-4 py-2 rounded-lg hover:bg-[#EEF0FF] font-semibold transition">
            Save as Draft
          </button>
          <button
            onClick={onPublish}
            disabled={!allOk}
            className="flex items-center gap-2 text-sm bg-[#3E3EDF] text-white px-5 py-2 rounded-lg hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MdRocketLaunch size={16} />
            Publish Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { MdWallet, MdTrendingUp, MdLightbulb } from "react-icons/md";

export interface ReviewStep3Data {
  dailyBudget: string;
}

interface Props {
  data: ReviewStep3Data;
  onChange: (d: ReviewStep3Data) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewWizardStep3({ data, onChange, onNext, onBack }: Props) {
  const daily = parseFloat(data.dailyBudget) || 0;
  const costPerReview = 2.5;
  const reviewsPerDay = daily > 0 ? Math.floor(daily / costPerReview) : 0;
  const weeklyReach = reviewsPerDay * 7;
  const roImpact = daily > 0 ? "+12.4%" : "—";
  const walletBalance = 1420.5;

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Budget &amp; Performance</h2>
        <p className="text-sm text-gray-400 mt-1">
          Define your daily investment and project your campaign reach.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left */}
        <div className="space-y-4">
          {/* Daily Budget input */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Daily Review Budget
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
              <input
                type="number"
                value={data.dailyBudget}
                onChange={(e) => onChange({ dailyBudget: e.target.value })}
                placeholder="25.00"
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MdWallet size={14} className="text-[#3E3EDF]" />
                Wallet Balance: ${walletBalance.toFixed(2)}
              </div>
              <button className="text-xs font-bold text-[#3E3EDF] hover:underline">
                Top Up
              </button>
            </div>
          </div>

          {/* Cost per review card */}
          <div className="bg-[#3E3EDF] text-white rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Your Plan</p>
            <p className="text-2xl font-bold">
              Cost per Review: ${costPerReview.toFixed(2)}
            </p>
            <p className="text-xs opacity-60 mt-1">
              Current premium rate for 5+ campaigns.
            </p>
          </div>
        </div>

        {/* Right — Performance Estimator */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <MdTrendingUp size={18} className="text-[#3E3EDF]" />
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Performance Estimator
            </p>
          </div>

          {/* Est. reviews per day */}
          <div className="text-center py-4 border-b border-gray-100 mb-4">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
              Estimated Reviews Per Day
            </p>
            <p className="text-[48px] font-black text-gray-900 leading-none">{reviewsPerDay}</p>
            <p className="text-xs text-gray-400 mt-1">
              Based on your ${daily.toFixed(2)} daily budget
            </p>
          </div>

          <div className="space-y-3">
            {/* Weekly reach */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500 font-medium">Weekly Reach</span>
                <span className="font-bold text-gray-800">~{weeklyReach} Reviews</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (weeklyReach / 70) * 100)}%` }}
                />
              </div>
            </div>

            {/* RO Impact */}
            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-xs text-gray-500 font-medium">Est. RO Impact</span>
              <span className="text-sm font-bold text-green-600">{roImpact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mt-4">
        <MdLightbulb size={16} className="text-[#3E3EDF] shrink-0 mt-0.5" />
        <p className="text-xs text-gray-600 leading-relaxed">
          <span className="font-bold text-[#3E3EDF]">Pro Tip: Scaling Performance</span> — Most 5A growth strategies see a 20% higher conversion rate when the daily budget is set above $50.00. Consider increasing your cap to maximise high-intent customer traffic.
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Products
        </button>
        <button
          onClick={onNext}
          disabled={!data.dailyBudget || daily <= 0}
          className="text-sm bg-[#3E3EDF] text-white px-6 py-2.5 rounded-xl hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Survey →
        </button>
      </div>
    </div>
  );
}

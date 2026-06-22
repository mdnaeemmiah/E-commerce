"use client";

import { MdLightbulb } from "react-icons/md";

export interface ReviewStep1Data {
  campaignName: string;
  isActive: boolean;
  description: string;
}

interface Props {
  data: ReviewStep1Data;
  onChange: (d: ReviewStep1Data) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function ReviewWizardStep1({ data, onChange, onNext, onCancel }: Props) {
  const set = (k: keyof ReviewStep1Data, v: string | boolean) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Create Review Campaign</h2>
        <p className="text-sm text-gray-400 mt-1">
          Configure your basic campaign details to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        {/* Left form */}
        <div className="lg:col-span-3 space-y-5">
          {/* Campaign Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Campaign Name
            </label>
            <input
              type="text"
              value={data.campaignName}
              onChange={(e) => set("campaignName", e.target.value)}
              placeholder="e.g. Summer Wellness & Nutrition Drive 2024"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
            />
          </div>

          {/* Campaign Status */}
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">Campaign Status</p>
              <p className="text-xs text-gray-400">Toggle to activate immediately on launch</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  data.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                }`}
              >
                {data.isActive ? "Active" : "Inactive"}
              </span>
              <button
                onClick={() => set("isActive", !data.isActive)}
                className={`relative w-10 h-5 rounded-full overflow-hidden transition-colors shrink-0 ${
                  data.isActive ? "bg-[#3E3EDF]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    data.isActive ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Short Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Enter the goals and focus of this campaign..."
              rows={5}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white resize-none"
            />
          </div>
        </div>

        {/* Right info panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Blue tip card */}
          <div className="bg-[#3E3EDF] text-white rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <MdLightbulb size={20} className="shrink-0 mt-0.5 opacity-80" />
              <p className="text-sm font-semibold leading-snug">
                Authenticity drives conversion 3x better than generic ads.
              </p>
            </div>
            <p className="text-xs opacity-70 leading-relaxed">
              Setup your campaign once description for your item here, then add the specific brand voice guidelines for each product.
            </p>
          </div>

          {/* Steps breakdown */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
            {[
              { label: "Defining Basics", active: true },
              { label: "Product Structure", active: false },
              { label: "Reward Structure", active: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    item.active
                      ? "bg-[#3E3EDF] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
                <p
                  className={`text-sm font-medium ${
                    item.active ? "text-[#3E3EDF]" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          ← Cancel &amp; Exit
        </button>
        <button
          onClick={onNext}
          disabled={!data.campaignName.trim()}
          className="text-sm bg-[#3E3EDF] text-white px-6 py-2.5 rounded-xl hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Products →
        </button>
      </div>
    </div>
  );
}

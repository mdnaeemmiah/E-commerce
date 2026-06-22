"use client";

import { useState } from "react";
import { MdCloudUpload, MdCalendarToday } from "react-icons/md";

export interface Step1Data {
  campaignName: string;
  campaignType: "rebate" | "review";
  isActive: boolean;
  credits: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function Step1Basics({ data, onChange, onNext, onCancel }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const set = (key: keyof Step1Data, value: string | boolean) =>
    onChange({ ...data, [key]: value });

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col min-h-[500px]">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Campaign Fundamentals</h2>
        <p className="text-sm text-gray-400 mt-1">
          Define the core identity and setup of your rebate campaign — this is what customers and the system use to recognise your campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left — Identity & Scope */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Identity &amp; Scope</h3>

          {/* Campaign Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">Campaign Name</label>
            <input
              type="text"
              value={data.campaignName}
              onChange={(e) => set("campaignName", e.target.value)}
              placeholder="e.g. Summer Splash Rebate"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
            />
          </div>

          {/* Campaign Condition toggle */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">Campaign Condition</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  data.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                }`}
              >
                {data.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <button
              onClick={() => set("isActive", !data.isActive)}
              className={`relative w-10 h-5 rounded-full overflow-hidden transition-colors shrink-0 ${data.isActive ? "bg-[#3E3EDF]" : "bg-gray-300"}`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  data.isActive ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Campaign Type */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Campaign Type</label>
            <div className="flex gap-3">
              {(["rebate", "review"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => set("campaignType", type)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition capitalize ${
                    data.campaignType === type
                      ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#3E3EDF]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Campaign Duration</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-gray-400 mb-1">Start Date</p>
                <div className="relative">
                  <MdCalendarToday
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={data.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 mb-1">End Date</p>
                <div className="relative">
                  <MdCalendarToday
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    value={data.endDate}
                    onChange={(e) => set("endDate", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg pl-8 pr-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Description</label>
            <textarea
              value={data.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the campaign goals and offers..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white resize-none"
            />
          </div>
        </div>

        {/* Right — Campaign Condition + Credits + Logo */}
        <div className="space-y-4">
          {/* Campaign Condition card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Campaign Condition</h3>
              <span
                className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                  data.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {data.isActive ? "● Active" : "○ Inactive"}
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {data.isActive
                ? "Your campaign is live and accepting participant claims. Toggle the switch to pause."
                : "Campaign is paused. Toggle active to start accepting claims."}
            </p>
            {data.campaignName && (
              <p className="text-sm font-semibold text-gray-800 mt-3 border-t border-gray-100 pt-3">
                &ldquo;{data.campaignName}&rdquo;
              </p>
            )}
            {(data.startDate || data.endDate) && (
              <p className="text-xs text-gray-400 mt-1">
                {data.startDate || "—"} → {data.endDate || "Ongoing"}
              </p>
            )}
          </div>

          {/* Credits */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Campaign Credits</h3>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Credits Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  value={data.credits}
                  onChange={(e) => set("credits", e.target.value)}
                  placeholder="100"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30 bg-white"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Credits used to fund rebate rewards.</p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Campaign Logo</h3>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
                dragOver ? "border-[#3E3EDF] bg-[#EEF0FF]" : "border-gray-200 bg-white"
              }`}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imagePreview} alt="Logo" className="h-24 mx-auto object-contain rounded-lg" />
              ) : (
                <>
                  <MdCloudUpload size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-500">Drag &amp; Drop Images</p>
                  <p className="text-xs text-gray-400 mt-0.5">or</p>
                  <label className="mt-2 inline-block cursor-pointer text-xs font-semibold text-[#3E3EDF] border border-[#3E3EDF] px-3 py-1 rounded-lg hover:bg-[#EEF0FF] transition">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
        <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Cancel &amp; Exit
        </button>
        <div className="flex gap-3">
          <button className="text-sm text-[#3E3EDF] border border-[#3E3EDF] px-4 py-2 rounded-lg hover:bg-[#EEF0FF] font-semibold transition">
            Save &amp; Exit
          </button>
          <button
            onClick={onNext}
            disabled={!data.campaignName.trim()}
            className="text-sm bg-[#3E3EDF] text-white px-5 py-2 rounded-lg hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue to Products →
          </button>
        </div>
      </div>
    </div>
  );
}

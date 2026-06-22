"use client";

import { useState } from "react";
import { MdStar, MdStarOutline, MdAutoAwesome, MdAdd, MdSmartphone, MdThumbUp, MdFormatAlignLeft } from "react-icons/md";

export interface ReviewStep4Data {
  includeRating: boolean;
  includeWritten: boolean;
  includeRecommend: boolean;
  customQuestions: string[];
}

interface Props {
  data: ReviewStep4Data;
  onChange: (d: ReviewStep4Data) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewWizardStep4({ data, onChange, onNext, onBack }: Props) {
  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const addQuestion = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    onChange({ ...data, customQuestions: [...data.customQuestions, trimmed] });
    setCustomInput("");
    setShowCustomInput(false);
  };

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Review Survey Setup</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-lg">
          Configure the questions shoppers will answer after their purchase. Our AI has pre-selected the most effective metrics for your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Left — Questions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MdAutoAwesome size={15} className="text-[#3E3EDF]" />
            <p className="text-[11px] font-bold text-[#3E3EDF] uppercase tracking-widest">
              AI Suggested Framework
            </p>
          </div>

          {/* Overall Rating */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center shrink-0">
                <MdStarOutline size={18} className="text-[#3E3EDF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Overall Rating</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Shoppers provide a 1-5 star rating of the product.
                </p>
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <MdStarOutline key={i} size={20} className="text-gray-300" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Written Experience */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center shrink-0">
                <MdFormatAlignLeft size={18} className="text-[#3E3EDF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Written Experience</p>
                <p className="text-xs text-gray-400 mt-0.5 italic">
                  &quot;How would you describe your experience with this product?&quot;
                </p>
                <div className="mt-3 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-300 bg-gray-50">
                  Type your answer here...
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Likelihood */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] flex items-center justify-center shrink-0">
                <MdThumbUp size={18} className="text-[#3E3EDF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Recommendation Likelihood</p>
                <p className="text-xs text-gray-400 mt-0.5 italic">
                  &quot;Would you recommend this product to a friend?&quot;
                </p>
                <div className="flex gap-2 mt-3">
                  {["Definitely", "Maybe", "No"].map((opt) => (
                    <span
                      key={opt}
                      className="text-xs font-medium border border-gray-300 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Custom questions */}
          {data.customQuestions.map((q, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 text-sm text-gray-700">
              {q}
            </div>
          ))}

          {/* Add Custom Question */}
          {showCustomInput ? (
            <div className="border border-gray-200 rounded-2xl p-4 space-y-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addQuestion()}
                placeholder="Type custom question..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#3E3EDF]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={addQuestion}
                  className="text-xs font-semibold bg-[#3E3EDF] text-white px-3 py-1.5 rounded-lg"
                >
                  Add
                </button>
                <button
                  onClick={() => { setShowCustomInput(false); setCustomInput(""); }}
                  className="text-xs font-semibold border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-5 text-sm font-semibold text-gray-400 hover:border-[#3E3EDF] hover:text-[#3E3EDF] transition"
            >
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center">
                <MdAdd size={16} />
              </div>
              + ADD CUSTOM QUESTION
            </button>
          )}
        </div>

        {/* Right — Mobile Preview */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MdSmartphone size={15} className="text-gray-400" />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Live Shopper Preview
            </p>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-64">
            <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                {/* Phone header */}
                <div className="bg-[#3E3EDF] px-5 py-4 flex items-center justify-between">
                  <p className="text-white text-sm font-bold tracking-wide">YourBrand</p>
                  <button className="text-white/60 text-sm font-light">✕</button>
                </div>

                <div className="px-5 py-5 space-y-5">
                  {/* Title */}
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900 leading-snug">
                      Tell us about your<br />experience
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Unlock your $15.00 cashback after review.
                    </p>
                  </div>

                  {/* Stars */}
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Overall Rating
                    </p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        i < 4
                          ? <MdStar key={i} size={22} className="text-[#3E3EDF]" />
                          : <MdStarOutline key={i} size={22} className="text-gray-300" />
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Your Experience
                    </p>
                    <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-[11px] text-gray-600 bg-gray-50 min-h-[50px] leading-relaxed">
                      The quality exceeded my expectations. Shipping was fast...
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Recommendation
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 text-[11px] font-bold bg-[#3E3EDF] text-white rounded-xl py-2">
                        Yes, definitely
                      </button>
                      <button className="flex-1 text-[11px] font-bold border border-gray-200 text-gray-500 rounded-xl py-2">
                        Not really
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3E3EDF] rounded-full w-4/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-First note */}
            <div className="flex items-center gap-2 mt-3 px-1">
              <div className="w-7 h-7 rounded-full bg-[#3E3EDF] flex items-center justify-center shrink-0">
                <MdSmartphone size={14} className="text-white" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-700">Mobile-First Response</p>
                <p className="text-[10px] text-gray-400">Optimised for 98% conversion on iOS/Android.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Rewards
        </button>
        <div className="flex items-center gap-5">
          <span className="text-xs text-gray-400">Draft saved 2m ago</span>
          <button
            onClick={onNext}
            className="text-sm bg-[#3E3EDF] text-white px-7 py-2.5 rounded-xl hover:bg-[#3232c0] font-semibold transition"
          >
            Review &amp; Launch
          </button>
        </div>
      </div>
    </div>
  );
}

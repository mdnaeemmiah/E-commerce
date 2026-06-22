"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ReviewWizardStep1, { ReviewStep1Data } from "@/components/BrandDashboard/reviews/wizard/ReviewWizardStep1";
import ReviewWizardStep2, { ReviewStep2Data } from "@/components/BrandDashboard/reviews/wizard/ReviewWizardStep2";
import ReviewWizardStep3, { ReviewStep3Data } from "@/components/BrandDashboard/reviews/wizard/ReviewWizardStep3";
import ReviewWizardStep4, { ReviewStep4Data } from "@/components/BrandDashboard/reviews/wizard/ReviewWizardStep4";
import ReviewWizardStep5 from "@/components/BrandDashboard/reviews/wizard/ReviewWizardStep5";

const STEPS = [
  { label: "Basic Info" },
  { label: "Products" },
  { label: "Budget" },
  { label: "Survey" },
  { label: "Review & Publish" },
];

const DEFAULT_STEP1: ReviewStep1Data = { campaignName: "", isActive: true, description: "" };
const DEFAULT_STEP2: ReviewStep2Data = { selectedProducts: [] };
const DEFAULT_STEP3: ReviewStep3Data = { dailyBudget: "" };
const DEFAULT_STEP4: ReviewStep4Data = {
  includeRating: true,
  includeWritten: true,
  includeRecommend: true,
  customQuestions: [],
};

export default function ReviewWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<ReviewStep1Data>(DEFAULT_STEP1);
  const [step2, setStep2] = useState<ReviewStep2Data>(DEFAULT_STEP2);
  const [step3, setStep3] = useState<ReviewStep3Data>(DEFAULT_STEP3);
  const [step4, setStep4] = useState<ReviewStep4Data>(DEFAULT_STEP4);

  const handlePublish = () => {
    toast.success("Review campaign published successfully!");
    router.push("/brandDashboard/reviews");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={i} className="flex items-center shrink-0">
                <button
                  onClick={() => done && setStep(num)}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition ${
                      done
                        ? "bg-[#3E3EDF] border-[#3E3EDF] text-white"
                        : active
                        ? "border-[#3E3EDF] text-[#3E3EDF] bg-white"
                        : "border-gray-200 text-gray-400 bg-white"
                    }`}
                  >
                    {done ? "✓" : num}
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${
                      active ? "text-[#3E3EDF]" : done ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-12 sm:w-20 mx-1 mt-[-12px] ${
                      done ? "bg-[#3E3EDF]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {step === 1 && (
            <ReviewWizardStep1
              data={step1}
              onChange={setStep1}
              onNext={() => setStep(2)}
              onCancel={() => router.push("/brandDashboard/reviews")}
            />
          )}
          {step === 2 && (
            <ReviewWizardStep2
              data={step2}
              onChange={setStep2}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <ReviewWizardStep3
              data={step3}
              onChange={setStep3}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <ReviewWizardStep4
              data={step4}
              onChange={setStep4}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <ReviewWizardStep5
              step1={step1}
              step2={step2}
              step3={step3}
              step4={step4}
              onBack={() => setStep(4)}
              onPublish={handlePublish}
            />
          )}
        </div>
      </div>
    </div>
  );
}

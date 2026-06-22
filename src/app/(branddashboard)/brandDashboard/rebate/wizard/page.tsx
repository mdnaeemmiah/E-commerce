"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Step1Basics, { Step1Data } from "@/components/BrandDashboard/rebate/wizard/Step1Basics";
import Step2Products, { Step2Data } from "@/components/BrandDashboard/rebate/wizard/Step2Products";
import Step3Budget, { Step3Data } from "@/components/BrandDashboard/rebate/wizard/Step3Budget";
import Step4Review from "@/components/BrandDashboard/rebate/wizard/Step4Review";

const STEPS = [
  { label: "Campaign Basics" },
  { label: "Select Products" },
  { label: "Budget & Offers" },
  { label: "Final Review" },
];

const DEFAULT_STEP1: Step1Data = {
  campaignName: "",
  campaignType: "rebate",
  isActive: true,
  credits: "",
  description: "",
  startDate: "",
  endDate: "",
};

const DEFAULT_STEP2: Step2Data = { selectedProducts: [] };

const DEFAULT_STEP3: Step3Data = {
  totalBudget: "",
  maxContribution: "",
  tiers: [],
  failsafe: false,
};

export default function WizardPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>(DEFAULT_STEP1);
  const [step2, setStep2] = useState<Step2Data>(DEFAULT_STEP2);
  const [step3, setStep3] = useState<Step3Data>(DEFAULT_STEP3);

  const handlePublish = () => {
    toast.success("Campaign published successfully!");
    router.push("/brandDashboard/rebate");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className=" mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((s, i) => {
            const num = i + 1;
            const active = step === num;
            const done = step > num;
            return (
              <div key={i} className="flex items-center">
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
                  <span className={`text-xs font-semibold whitespace-nowrap ${active ? "text-[#3E3EDF]" : done ? "text-gray-600" : "text-gray-400"}`}>
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-16 sm:w-24 mx-1 mt-[-12px] ${done ? "bg-[#3E3EDF]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {step === 1 && (
            <Step1Basics
              data={step1}
              onChange={setStep1}
              onNext={() => setStep(2)}
              onCancel={() => router.push("/brandDashboard/rebate")}
            />
          )}
          {step === 2 && (
            <Step2Products
              data={step2}
              onChange={setStep2}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3Budget
              data={step3}
              onChange={setStep3}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4Review
              step1={step1}
              step2={step2}
              step3={step3}
              onBack={() => setStep(3)}
              onPublish={handlePublish}
            />
          )}
        </div>
      </div>
    </div>
  );
}

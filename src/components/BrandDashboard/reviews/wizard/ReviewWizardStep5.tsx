"use client";

import Image, { StaticImageData } from "next/image";
import { MdCheckCircle, MdRocketLaunch, MdStar, MdEdit, MdAutoAwesome, MdShoppingBag } from "react-icons/md";
import { ReviewStep1Data } from "./ReviewWizardStep1";
import { ReviewStep2Data } from "./ReviewWizardStep2";
import { ReviewStep3Data } from "./ReviewWizardStep3";
import { ReviewStep4Data } from "./ReviewWizardStep4";

import img1 from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import img7 from "@/app/assets/saved/8380003.jpg";
import img8 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";

const PRODUCTS: Record<string, { name: string; category: string; price: string; img: StaticImageData }> = {
  p1: { name: "PureZen Magnesium", category: "Wellness Category", price: "$34.99", img: img1 },
  p2: { name: "NitroFuel Pre-Workout", category: "Performance Category", price: "$49.00", img: img2 },
  p3: { name: "Greens Pro Powder", category: "Nutritional Category", price: "$42.50", img: img3 },
  p4: { name: "Retro: Scope X1", category: "Electronics", price: "$65.00", img: img4 },
  p5: { name: "Oracle Summer", category: "Nathan Accessories", price: "$45.00", img: img5 },
  p6: { name: "Vital Essence Serum", category: "Health & Beauty", price: "$58.00", img: img6 },
  p7: { name: "Chronus Smart More", category: "Orbit Tec", price: "$199.00", img: img7 },
  p8: { name: "Vendant Office Suite", category: "Supported Labs", price: "$55.00", img: img8 },
};

interface Props {
  step1: ReviewStep1Data;
  step2: ReviewStep2Data;
  step3: ReviewStep3Data;
  step4: ReviewStep4Data;
  onBack: () => void;
  onPublish: () => void;
}

export default function ReviewWizardStep5({ step1, step2, step3, step4, onBack, onPublish }: Props) {
  const daily = parseFloat(step3.dailyBudget) || 0;
  const costPerReview = 2.5;
  const reviewsPerDay = daily > 0 ? Math.floor(daily / costPerReview) : 0;
  const duration = 30;
  const totalInvestment = daily * duration;
  const allOk = !!step1.campaignName && step2.selectedProducts.length > 0 && daily > 0;

  const surveyConfig = [
    {
      icon: <MdStar size={18} className="text-[#3E3EDF]" />,
      label: "Rating System",
      desc: "Standard 5-star quantitative rating with mandatory photo verification requirement enabled.",
      enabled: step4.includeRating,
    },
    {
      icon: <MdEdit size={18} className="text-[#3E3EDF]" />,
      label: "Detailed Testimonials",
      desc: "Long-form narrative input. Minimum 150 characters enforced for quality and SEO benefit.",
      enabled: step4.includeWritten,
    },
    {
      icon: <MdAutoAwesome size={18} className="text-[#3E3EDF]" />,
      label: "Custom Attributes",
      desc: "Packaging Quality\nFlavour Profile Accuracy\nDelivery Speed Experience",
      enabled: step4.includeRecommend,
    },
  ];

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Review Your Campaign</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-xl">
          Please ensure all financial and product details are accurate before proceeding to go live. Once published, the budget will be reserved for immediate distribution.
        </p>
      </div>

      {/* Campaign Identity + Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Campaign Identity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[#EEF0FF] flex items-center justify-center">
              <MdShoppingBag size={11} className="text-[#3E3EDF]" />
            </div>
            <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
              Campaign Identity
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Campaign Name
              </p>
              <p className="text-[18px] font-bold text-gray-900">
                {step1.campaignName || "Untitled Campaign"}
              </p>
            </div>

            {step1.description && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Description
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">{step1.description}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold border border-gray-300 text-gray-600 px-3 py-1 rounded-full">
                ● READY TO LAUNCH
              </span>
              <span className="text-[10px] font-bold border border-gray-300 text-gray-600 px-3 py-1 rounded-full">
                DURATION: {duration} DAYS
              </span>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="bg-[#3E3EDF] text-white rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <MdShoppingBag size={11} className="text-white" />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider opacity-80">
              Financials
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                Daily Review Budget
              </p>
              <p className="text-[28px] font-black leading-none">
                ${daily > 0 ? daily.toLocaleString() : "0"}
                <span className="text-sm font-normal opacity-60 ml-1">/ day</span>
              </p>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                Estimated Reviews
              </p>
              <p className="text-[28px] font-black leading-none">
                {reviewsPerDay}
                <span className="text-sm font-normal opacity-60 ml-1">per day</span>
              </p>
            </div>
            <div className="border-t border-white/20 pt-4">
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                Total Commitment
              </p>
              <p className="text-[20px] font-black leading-none">
                ${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Products */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full bg-[#EEF0FF] flex items-center justify-center">
            <MdShoppingBag size={11} className="text-[#3E3EDF]" />
          </div>
          <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
            Selected Products
          </h3>
        </div>

        {step2.selectedProducts.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No products selected.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {step2.selectedProducts.map((id) => {
              const p = PRODUCTS[id];
              if (!p) return null;
              return (
                <div key={id}>
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-2">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {p.category} · {p.price}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Survey Configuration */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded-full bg-[#EEF0FF] flex items-center justify-center">
            <MdStar size={11} className="text-[#3E3EDF]" />
          </div>
          <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">
            Review Survey Configuration
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {surveyConfig.map((item, i) => (
            <div key={i} className={`${!item.enabled ? "opacity-40" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <p className="text-sm font-bold text-gray-800">{item.label}</p>
              </div>
              <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-5 border-t border-gray-100 gap-4">
        <div className="flex items-center gap-2">
          <MdCheckCircle
            size={20}
            className={allOk ? "text-green-500" : "text-gray-300"}
          />
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {allOk ? "Everything looks good. Ready to go live?" : "Please complete all required steps."}
            </p>
            <p className="text-xs text-gray-400">
              Campaign verified against current inventory and credit limits.
            </p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 font-medium transition"
          >
            Save as Draft
          </button>
          <button
            onClick={onPublish}
            disabled={!allOk}
            className="flex items-center gap-2 text-sm bg-[#3E3EDF] text-white px-6 py-2.5 rounded-xl hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <MdRocketLaunch size={15} />
            Publish Review Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

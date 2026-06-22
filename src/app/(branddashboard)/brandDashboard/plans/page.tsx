"use client";

import { MdCheckCircle, MdRadioButtonUnchecked, MdInfo, MdRocketLaunch } from "react-icons/md";

const plans = [
  {
    name: "Starter",
    tag: null,
    sub: "Recommended under ~$1,000/month spend",
    price: "$39",
    period: "/month",
    highlight: false,
    sectionLabel: null,
    features: [
      { text: "1 active rebate campaign", checked: true },
      { text: "Unlimited products", checked: true },
      { text: "Fixed offer types", checked: true },
      { text: "OCR receipt verification", checked: true },
      { text: "Fraud protection & duplicate checks", checked: true },
      { text: "Review campaigns & export", checked: true },
      { text: "Shopper data: Anonymous", checked: false },
    ],
    cta: "Get Started",
    ctaStyle: "border border-[#3E3EDF] text-[#3E3EDF] hover:bg-[#EEF0FF]",
  },
  {
    name: "Pro",
    tag: "MOST POPULAR",
    sub: "Recommended for ~$1,000 – $6,000/month spend",
    price: "$199",
    period: "/month",
    highlight: true,
    sectionLabel: "EVERYTHING IN STARTER, PLUS:",
    features: [
      { text: "3 active rebate campaigns", checked: true },
      { text: "Shopper identity access", checked: true },
      { text: "Review campaigns & export", checked: true },
      { text: "Per-product & per-campaign insights", checked: true },
      { text: "Re-contact customers outside Nibbl", checked: true },
    ],
    cta: "Upgrade to Pro",
    ctaStyle: "bg-[#3E3EDF] text-white hover:bg-[#3232c0]",
  },
  {
    name: "Scale",
    tag: null,
    sub: "Recommended for $5,000+/month spend",
    price: "$999",
    period: "/month",
    highlight: false,
    sectionLabel: "EVERYTHING IN PRO, PLUS:",
    features: [
      { text: "10 active rebate campaigns", checked: true },
      { text: "Built for high monthly volume", checked: true },
      { text: "Future API access", checked: true },
      { text: "Future integrations", checked: true },
      { text: "Lowest fees at scale", checked: true, emphasis: true },
    ],
    cta: "Get Started",
    ctaStyle: "border border-[#3E3EDF] text-[#3E3EDF] hover:bg-[#EEF0FF]",
  },
];

const feeRows = [
  {
    icon: <MdRocketLaunch size={16} className="text-gray-500" />,
    bg: "bg-gray-100",
    plan: "Starter",
    fee: "20%",
    review: "$5",
    highlight: false,
  },
  {
    icon: <MdRocketLaunch size={16} className="text-white" />,
    bg: "bg-[#3E3EDF]",
    plan: "Pro",
    fee: "15%",
    review: "$4",
    highlight: true,
  },
  {
    icon: <MdRocketLaunch size={16} className="text-white" />,
    bg: "bg-emerald-700",
    plan: "Scale",
    fee: "10%",
    review: "$3",
    highlight: false,
  },
];

export default function PlansPage() {
  return (
    <div className="p-4 md:p-8  mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-3 pt-4">
        <h1 className="text-[38px] md:text-[44px] font-black text-gray-900 leading-tight">
          Simple pricing.{" "}
          <span className="text-[#3E3EDF]">Real results.</span>
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          You fund the shopper reward. We charge a small fee on top.<br />
          You only pay when a real shopper is rewarded.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 flex flex-col gap-5 transition ${
              plan.highlight
                ? "border-[#3E3EDF] shadow-2xl shadow-[#3E3EDF]/15 bg-white z-10"
                : "border-gray-200 bg-white shadow-sm"
            }`}
          >
            {/* Most popular badge */}
            {plan.tag && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="bg-[#3E3EDF] text-white text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                  {plan.tag}
                </span>
              </div>
            )}

            {/* Plan name + price */}
            <div>
              <p className="text-[15px] font-bold text-gray-800">{plan.name}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{plan.sub}</p>
              <div className="flex items-end gap-1 mt-3">
                <span className="text-[34px] font-black text-gray-900 leading-none">{plan.price}</span>
                <span className="text-sm text-gray-400 mb-0.5">{plan.period}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5 flex-1">
              {plan.sectionLabel && (
                <p className="text-[10px] font-black text-[#3E3EDF] uppercase tracking-widest pb-1">
                  {plan.sectionLabel}
                </p>
              )}
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  {f.checked ? (
                    <MdCheckCircle size={16} className="text-[#3E3EDF] shrink-0 mt-0.5" />
                  ) : (
                    <MdRadioButtonUnchecked size={16} className="text-gray-300 shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm leading-snug ${
                      f.checked ? "text-gray-700" : "text-gray-400"
                    } ${"emphasis" in f && f.emphasis ? "font-bold text-[#3E3EDF]" : ""}`}
                  >
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-xl text-sm font-bold transition ${plan.ctaStyle}`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* How fees work */}
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-[22px] font-bold text-gray-900">How fees work</h2>
          <div className="w-10 h-0.5 bg-[#3E3EDF] mx-auto rounded-full mt-2" />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <div>Plan</div>
            <div className="text-center">Fee on rewards</div>
            <div className="text-center">Per review</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {feeRows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl ${row.bg} flex items-center justify-center shrink-0`}>
                    {row.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{row.plan}</span>
                </div>
                <div className="text-center">
                  <span
                    className={`text-sm font-black px-4 py-1.5 rounded-lg ${
                      row.highlight ? "bg-[#EEF0FF] text-[#3E3EDF]" : "text-gray-800"
                    }`}
                  >
                    {row.fee}
                  </span>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-black ${row.highlight ? "text-[#3E3EDF]" : "text-gray-800"}`}>
                    {row.review}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent billing note */}
        <div className="flex items-start gap-2 px-1">
          <MdInfo size={15} className="text-gray-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-400 leading-relaxed">
            <span className="font-bold">Transparent Billing:</span> You only fund the rewards actually claimed by verified shoppers. Our service fee is calculated as a percentage of the reward amount distributed. Review fees are only charged for successfully verified product reviews.
          </p>
        </div>
      </div>
    </div>
  );
}

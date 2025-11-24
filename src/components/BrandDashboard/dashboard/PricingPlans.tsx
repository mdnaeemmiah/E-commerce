"use client";

import { FaBuilding } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

// Swiper Modules
import { Pagination } from "swiper/modules";

export default function PricingPlans() {
    const plans = [
        {
            title: "Free",
            price: "$0",
            period: "/month",
            fee: "20% platform free",
            description: "Beast for trial campaigns to test NIbbiAI",
            features: [
                "1 brand max",
                "Basic dashboard",
                "All offer types supported",
                "Real-time OCR receipt scanning",
                "Anti-fraud protections",
                "User account required",
                "Nibbl Wallet for shoppers",
                "No access to shopper data",
                "Campaign expiration controls",
            ],
            button: "Update to Free ",
        },
        {
            title: "Pro",
            price: "$99",
            period: "/month",
            fee: "15% platform fee",
            description: "Best for feedback, reviews, and shopper re-engagement",
            features: [
                "Everything in Free",
                "Access to shopper emails & phone",
                "Branded SMS/email campaigns",
                "Branded onboarding with logo",
                "Shopper notifications",
                "AI-powered review collection",
                "Review summarization tool",
                "Campaign fallback logic",
                "Brand Activation Kit included",
            ],
            button: "Update to Pro",
        },
        {
            title: "Scale",
            price: "$499",
            period: "/month",
            fee: "10% platform fee",
            description: "Best for discovery-focused brands scaling across regions",
            features: [
                "Everything in Pro",
                "Multi-campaign management",
                "Store & region-level targeting",
                "Advanced dashboard with filters",
                "Upload brand assets",
                "Data exports (CSV)",
                "API access for integrations",
                "NibblSmart™ Optimization",
                "Geo Notifications",
            ],
            button: "Update to Scale",
        },
        {
            title: "Enterprise",
            price: "$999",
            period: "/month",
            fee: "10% platform fee",
            description: "Best for high-volume brands and agencies",
            features: [
                "Everything in Scale",
                "3 brands included (+$250 each)",
                "Shared wallet across brands",
                "Team/agency dashboards",
                "Bulk campaign duplication",
                "Smart tier throttling",
                "Advanced NibblSmart™ logic",
                "Priority support",
            ],
            button: "Update to Enterprise",
        },
    ];

    return (
        <div className="w-full py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>

            {/* Swiper Slider */}
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1} // Default mobile
                breakpoints={{
                    640: { slidesPerView: 1.2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2.5 },
                }}
                className="pb-10"
            >
                {plans.map((plan, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 h-full">
                            <div className="text-center">

                                <div className="flex justify-center">
                                    <FaBuilding className="text-gray-700 text-xl" />
                                </div>
                                <h3 className="text-xl font-semibold">{plan.title}</h3>

                                <p className="text-3xl font-bold">
                                    {plan.price}
                                    <span className="text-gray-600 text-lg">{plan.period}</span>
                                </p>

                                <p className="text-red-500 text-sm font-semibold">{plan.fee}</p>

                                <p className="text-gray-500 mt-2 mb-6 text-sm">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-2 text-sm text-gray-700">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-green-600 font-bold">✔</span> {f}
                                    </li>
                                ))}
                            </ul>

                            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                                {plan.button}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

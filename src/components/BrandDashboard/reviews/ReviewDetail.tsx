"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdStar, MdArrowBack } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import profileImg from "@/app/assets/auth/Ellipse 2.png";

const MOCK_REVIEWS: Record<string, {
  id: string;
  campaignName: string;
  reviewer: string;
  date: string;
  rating: number;
  text: string;
  product: string;
  sku: string;
  price: string;
  status: string;
  relatedCampaign: string;
}> = {
  "rev-1": {
    id: "rev-1",
    campaignName: "NeoWatch Series 5 Launch",
    reviewer: "Marcus Aurelius",
    date: "Oct 04, 2024",
    rating: 5,
    text: "The crunch on these chips is incomparable. I love that they use real sea salt without it being overwhelming. Definitely my new go-to snack.",
    product: "Kettle Sea Salt Chips",
    sku: "KTL-18-41",
    price: "$6.99",
    status: "$1.00 Cashback",
    relatedCampaign: "Full Snack Refresh",
  },
  "rev-2": {
    id: "rev-2",
    campaignName: "Acoustic Pro Refresh",
    reviewer: "Marcus Aurelius",
    date: "Oct 04, 2024",
    rating: 5,
    text: "The crunch on these chips is incomparable. I love that they use real sea salt without it being overwhelming. Definitely my new go-to snack.",
    product: "Acoustic Pro Refresh",
    sku: "ACP-22-01",
    price: "$89.99",
    status: "$1.00 Cashback",
    relatedCampaign: "Full Snack Refresh",
  },
  "rev-3": {
    id: "rev-3",
    campaignName: "PureFlow Kettle Beta",
    reviewer: "Marcus Aurelius",
    date: "Oct 29, 2024",
    rating: 4,
    text: "Great product overall. The quality is impressive and the design is sleek. Would definitely recommend to friends and family.",
    product: "PureFlow Kettle",
    sku: "PKB-33-07",
    price: "$45.00",
    status: "$2.00 Cashback",
    relatedCampaign: "Kitchen Essentials",
  },
};

export default function ReviewDetail({ id }: { id: string }) {
  const router = useRouter();
  const review = MOCK_REVIEWS[id] ?? MOCK_REVIEWS["rev-1"];

  return (
    <div className="p-4 md:p-6 space-y-6 mx-auto">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-gray-400 flex items-center gap-1">
        <span
          className="cursor-pointer hover:text-[#3E3EDF] flex items-center gap-1"
          onClick={() => router.push("/brandDashboard/reviews")}
        >
          <MdArrowBack size={14} />
          Reviews
        </span>
        <span>/</span>
        <span className="text-gray-700 font-medium">{review.reviewer}</span>
      </nav>

      <h1 className="text-[22px] font-bold text-gray-900">
        Review Detail: {review.campaignName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Review Summary */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
              Review Summary
            </h2>
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>

          {/* Reviewer */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src={profileImg} alt={review.reviewer} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{review.reviewer}</p>
              <div className="flex gap-0.5 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Review text */}
          <p className="text-sm text-gray-600 leading-relaxed italic border-l-4 border-[#3E3EDF] pl-4 bg-[#EEF0FF]/40 py-3 rounded-r-xl">
            &ldquo;{review.text}&rdquo;
          </p>

          {/* Campaign Stats */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Campaign Stats
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Campaign</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{review.campaignName}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Related</p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">{review.relatedCampaign}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Status</p>
                <p className="text-sm font-semibold text-[#3E3EDF] mt-0.5">{review.status}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">Rating</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MdStar size={14} className="text-yellow-400" />
                  <p className="text-sm font-semibold text-gray-800">{review.rating}.0 / 5.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product card */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="relative w-full h-44">
              <Image src={rect} alt={review.product} fill className="object-cover" />
              <span className="absolute top-3 left-3 bg-[#3E3EDF] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                FEATURED
              </span>
            </div>
            <div className="p-4">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">
                {review.product}
              </p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-[10px] text-gray-400">SKU</p>
                  <p className="text-xs font-semibold text-gray-700">{review.sku}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Price</p>
                  <p className="text-xs font-semibold text-gray-700">{review.price}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/brandDashboard/reviews")}
            className="w-full border border-gray-200 text-gray-600 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
          >
            ← Back to Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

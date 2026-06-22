"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PendingRewards from "@/components/modules/home/offer/PendingRewards";
import Toggle from "@/components/modules/home/offer/toggle/Toggle";
import UploadScan from "@/components/modules/home/offer/UploadScan";
import { MdSearch } from "react-icons/md";

export default function OfferPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim()) router.push(`/offer/all?value=${encodeURIComponent(search)}`);
  };

  return (
    <div className="px-4 md:px-12 lg:px-40 py-6 space-y-8">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Offers...."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-[#3E3EDF] bg-white shadow-sm"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#3E3EDF] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-[#3232c0] transition"
        >
          Search
        </button>
      </div>

      {/* Your Rewards (tabs + swiper) */}
      <div>
        <Toggle />
      </div>

      {/* Your Pending Rewards */}
      <PendingRewards />

      {/* Recent Offer */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Offer</h2>
        <UploadScan />
      </div>
    </div>
  );
}

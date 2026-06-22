"use client";

import { useState } from "react";
import { MdSearch, MdTune } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import StatsBar from "@/components/BrandDashboard/productLibrary/StatsBar";
import ProductGrid from "@/components/BrandDashboard/productLibrary/ProductGrid";

export default function ProductLibraryPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-[22px] font-bold text-gray-900">Product Library</h1>
      </div>

      {/* Stats */}
      <StatsBar />

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-[#3E3EDF] transition bg-white"
          />
        </div>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 transition bg-white">
          <MdTune size={18} />
          Filters
        </button>
      </div>

      {/* Product Grid */}
      <ProductGrid />

      {/* Footer: count + pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <p className="text-[12px] text-gray-400 font-medium">
          Showing 8 of 1,256 products
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
          >
            <FiChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-[13px] font-semibold transition ${
                currentPage === page
                  ? "bg-[#3E3EDF] text-white"
                  : "border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 transition"
          >
            <FiChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

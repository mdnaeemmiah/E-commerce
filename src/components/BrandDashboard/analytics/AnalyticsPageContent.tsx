"use client";

import { useState } from "react";
import OverviewTab from "./tabs/OverviewTab";
import RebatesTab from "./tabs/RebatesTab";
import ReviewsTab from "./tabs/ReviewsTab";
import ProductsTab from "./tabs/ProductsTab";
import CustomersTab from "./tabs/CustomersTab";

type Tab = "Overview" | "Rebates" | "Reviews" | "Products" | "Customers";
const TABS: Tab[] = ["Overview", "Rebates", "Reviews", "Products", "Customers"];

export default function AnalyticsPageContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Analytics Hub</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Monitor your full campaign performance and business metrics.
          </p>
        </div>
        <span className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg self-start sm:self-center">
          Last 90 Days ▾
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-0 border-b border-gray-200 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition -mb-px ${
              activeTab === tab
                ? "border-[#3E3EDF] text-[#3E3EDF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && <OverviewTab />}
      {activeTab === "Rebates" && <RebatesTab />}
      {activeTab === "Reviews" && <ReviewsTab />}
      {activeTab === "Products" && <ProductsTab />}
      {activeTab === "Customers" && <CustomersTab />}
    </div>
  );
}

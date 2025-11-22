"use client";
import { FiChevronRight } from "react-icons/fi";

export default function DActive() {
  const campaigns = [1, 2, 3, 4]; // demo repeat items

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">Active Campaigns</h2>
      <p className="text-sm text-gray-500 mt-1">
        Your currently running campaigns
      </p>

      {/* List */}
      <div className="mt-5 flex flex-col gap-3">
        {campaigns.map((item, index) => (
          <div
            key={index}
            className="w-full border border-gray-200 rounded-lg px-4 py-4 bg-white hover:shadow-sm transition"
          >
            <div className="flex justify-between items-start">
              {/* Left */}
              <div>
                <h3 className="font-semibold text-gray-800">
                  Winter Sale -20% Off
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  456 redemptions • Expires in 5 days
                </p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-semibold text-gray-800">$750 / $1,000</p>
                <p className="text-xs text-gray-500 mt-1">Budget Used</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

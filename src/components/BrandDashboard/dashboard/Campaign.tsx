"use client";

import { FiBarChart2, FiPause, FiPlay } from "react-icons/fi";

export default function Campaign() {
  const campaigns = [
    {
      title: "Winter Sale - 20% Off",
      status: "Active",
      tags: ["20% Off"],
      budget: 1000,
      spent: 750,
      redemptions: 150,
      created: "2024-01-01",
      expires: "2025-02-15",
      paused: false,
    },
    {
      title: "BOGO Coffee Promotion",
      status: "Paused",
      tags: ["BOGO"],
      budget: 500,
      spent: 320,
      redemptions: 456,
      created: "2024-01-01",
      expires: "2025-02-15",
      paused: true,
    },
    {
      title: "BOGO Coffee Promotion",
      status: "Paused",
      tags: ["BOGO"],
      budget: 500,
      spent: 320,
      redemptions: 456,
      created: "2024-01-01",
      expires: "2025-02-15",
      paused: true,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 md:p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">All Campaign</h2>
      <p className="text-sm text-gray-500 mt-1">
        Manage your active and passed campaigns
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {campaigns.map((item, i) => (
          <div
            key={i}
            className="w-full border border-gray-200 rounded-xl p-5 bg-white"
          >
            {/* Top section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      item.paused
                        ? "bg-gray-100 text-gray-600 border-gray-300"
                        : "bg-blue-100 text-blue-600 border-blue-300"
                    }`}
                  >
                    {item.status}
                  </span>

                  {item.tags.map((t, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Created: {item.created}. Expires: {item.expires}
                </p>
              </div>

              {/* Right buttons */}
              <div className="flex gap-3 sm:gap-2 flex-wrap sm:flex-nowrap">
                <button className="flex items-center gap-1 border border-gray-300 hover:bg-gray-100 transition px-3 py-1.5 rounded-lg text-sm w-full sm:w-auto justify-center sm:justify-start">
                  <FiBarChart2 size={16} />
                  Analytics
                </button>

                <button className="flex items-center gap-1 border border-gray-300 hover:bg-gray-100 transition px-3 py-1.5 rounded-lg text-sm w-full sm:w-auto justify-center sm:justify-start">
                  {item.paused ? (
                    <>
                      <FiPlay size={16} /> Resume
                    </>
                  ) : (
                    <>
                      <FiPause size={16} /> Pause
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Budget / Spent / Redemptions */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold text-gray-800">${item.budget}</p>
              </div>

              <div className="text-left sm:text-center">
                <p className="text-sm text-gray-500">Spent</p>
                <p className="font-semibold text-gray-800">${item.spent}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((item.spent / item.budget) * 100)}% used
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-500">Redemptions</p>
                <p className="font-semibold text-gray-800">
                  {item.redemptions}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full"
                style={{
                  width: `${Math.round((item.spent / item.budget) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

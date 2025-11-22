"use client";

export default function DRecent() {
  const activities = [
    {
      title: "Redemption",
      desc: "Winter Sale campaign redeemed",
      time: "1 minute ago",
    },
    {
      title: "Review",
      desc: "New 5-star review received",
      time: "2 minutes ago",
    },
    {
      title: "Redemption",
      desc: "BOGO Coffee Promotion redeemed",
      time: "5 minutes ago",
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl my-6 p-6 border border-gray-200">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      <p className="text-sm text-gray-500 mt-1">
        Latest redemptions and updates
      </p>

      {/* Activity List */}
      <div className="mt-5 flex flex-col gap-5">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start w-full"
          >
            {/* Left side */}
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
            </div>

            {/* Right side time */}
            <p className="text-sm text-gray-500 whitespace-nowrap">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

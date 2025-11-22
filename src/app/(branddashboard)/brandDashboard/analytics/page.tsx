import Analytics from "@/components/BrandDashboard/dashboard/Analytics";

const stats = [
  { label: 'Revenue', value: 3, value1: "+12% from last month" },
  { label: 'Total Scans', value: "$3,500", value1: "New customers" },
  { label: 'Scan-to-Conversion', value: "$3,420", value1: "+12% from last month" },
  { label: 'Return Rate', value: "$3,420", value1: "Within 30 dayes" },
];

export default function page() {
  return (
    <div>
      <div className=" mt-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-black">Analytics & Insights</h2>
          <p className="text-gray-600">
            Generate and manage QR Codes for you campaigns
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
            {/* Icon and Text Layout */}
            <div className="md:text-[18px] text-[20px] text-[#333333]   w-40">{stat.label}</div>
            {/* Value */}
            <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
              {stat.value}
            </div>
            <div className="text-[16px]">
              {stat.value1}
            </div>
          </div>
        ))}
      </div>
      <Analytics></Analytics>
    </div>
  )
}

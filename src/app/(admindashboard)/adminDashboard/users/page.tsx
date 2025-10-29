import UserTable from "@/components/adminDashboard/dashboard/UserTable";

const stats = [
  { label: 'Total Earnings', value: "$1251 K", },
  { label: 'Total Users', value: 6500, },
  { label: 'Total Brand', value: 740, },
];


export default function page() {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow rounded-2xl md:p-4 p-4 lg:p-6 border border-[#B9DAFE]">
            {/* Icon and Text Layout */}
            <div className="md:text-[18px] text-[20px] text-[#333333]   w-40">{stat.label}</div>
            {/* Value */}
            <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
      <UserTable></UserTable>
    </div>
  )
}

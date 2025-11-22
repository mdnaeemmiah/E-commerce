import Campaign from "@/components/BrandDashboard/dashboard/Campaign";
import { FaPlus } from "react-icons/fa";

const stats = [
    { label: 'Total Campaigns', value: 3, value1: "2 Active,1 paused" },
    { label: 'Total Budget', value: "$3,500", value1: "$2,270 spent (65%)" },
    { label: 'Campaign Spent', value: "$3,420", value1: "15% on $2,270 spent" },
];


export default function page() {
    return (
        <div>
            <div className="flex justify-between mt-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-black">Campaigns Management</h2>
                    <p className="text-gray-600">
                        Create and mange your rebate campaigns
                    </p>
                </div>
                <div>
                    <button className="bg-[#3E3EDF] cursor-pointer text-white rounded-md p-2 ml-2 flex items-center gap-2">
                        <FaPlus /> Create Campaign
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-8">
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

            <Campaign></Campaign>
        </div>
    )
}

import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';
import { FiCamera, FiImage, FiUpload, FiWatch } from 'react-icons/fi';
import { RiHomeLine } from 'react-icons/ri';

import { FaStar, FaUserFriends } from "react-icons/fa";

interface HistoryItem {
  id: number;
  title: string;
  amount: string;
  date: string;
  store: string;
  status: "Verified" | "Pending" | "Rejected" | "Bonus Earned";
  description?: string;
}

const data: HistoryItem[] = [
  {
    id: 1,
    title: "Rebate Verified",
    amount: "$1.00 added to wallet",
    store: "Whole Foods Market",
    date: "Apr 2, 2025",
    status: "Verified",
  },
  {
    id: 2,
    title: "Receipt Pending Review",
    amount: "",
    store: "Whole Foods Market",
    date: "Apr 2, 2025",
    status: "Pending",
  },
  {
    id: 3,
    title: "Review Rejected",
    amount: "$1.00",
    store: "Whole Foods Market",
    date: "Apr 2, 2025",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Referral Bonus",
    amount: "$5.00 Added",
    store: "Your friend completed their first review!",
    date: "",
    status: "Bonus Earned",
  },
];

interface Receipt {
    name: string;
    date: string;
    status: 'verified' | 'pending' | 'rejected';
}

const receipts: Receipt[] = [
    { name: "Noosa 50$ Rebates", date: "Apr 2, 2025", status: "verified" },
    { name: "LaCroix Grapefruit", date: "Apr 5, 2025", status: "pending" },
    { name: "Driscoll Strawberries", date: "Apr 8, 2025", status: "rejected" },
];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "Pending":
        return <FiWatch className="text-white text-xl bg-[#FF9400] rounded-full p-1 w-5 h-5" />;
      case "Rejected":
        return <FaStar className="text-yellow-400 text-xl" />;
      case "Bonus Earned":
        return <FaUserFriends className="text-indigo-500 text-xl" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Rejected":
        return "text-red-500";
      case "Bonus Earned":
        return "text-indigo-500";
      default:
        return "";
    }
  };



const Scan: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-6">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Your rewards Hub</h2>
            </div>

            {/* Pending Rebates Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 ">
                <div className='flex gap-2'>
                    <FiWatch size={24} color="#3E3EDF" />
                    <h3 className="text-[18px] font-medium">Pending Rebates</h3>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
                        <span>Noosa 50$ Rebates</span>
                        <button className="bg-[#3E3EDF] text-white px-4 py-2 rounded">Upload Receipt</button>
                    </div>
                    <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
                        <span>LaCroix Grapefruit</span>
                        <span className="text-[#00A671] font-semibold">Receipt Verified</span>
                    </div>
                    <p className='text-[#575757]'>Upload receipts to complete pending rebate offers.</p>
                </div>
            </div>

            {/* Earn More Section */}
            <div className="bg-[#E8E8FF] p-4 rounded-lg shadow-md mb-6 mt-10">
                <div className='text-center mb-2'>
                    <h3 className="text-[24px]  font-medium">Want to earn more?</h3>
                    <p>Completed quick reviews from any verified receipt an extra $1 per
                        review</p>
                </div>
                <div className="space-y-4 mt-8">
                    <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
                        <span>Lacroix Grapefruit 12pk</span>
                        <button className="bg-[#3E3EDF] text-white px-4 py-2 rounded">started Review</button>
                    </div>
                    <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
                        <span>Noosa Honey Youhut</span>
                        <button className="bg-[#3E3EDF] text-white px-4 py-2 rounded">started Review</button>
                    </div>
                    <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
                        <span>Driscoll Strawberries</span>
                        <button className="bg-[#3E3EDF] text-white px-4 py-2 rounded">started Review</button>
                    </div>
                </div>
            </div>

            {/* Receipt History Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 mt-10">
                <div className='flex gap-2'>
                    <RiHomeLine size={24} color="#3E3EDF" />
                    <h3 className="text-[18px] font-medium">Receipt History</h3>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
                        <span>Noosa 50$ Rebates</span>
                        <span className="text-[#00A671] font-semibold">Verified</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
                        <span>LaCroix Grapefruit</span>
                        <span className="text-[#D7930A] font-semibold">Pending</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
                        <span>LaCroix Grapefruit</span>
                        <span className="text-[#FF5C5C] font-semibold">Rejected</span>
                    </div>
                    <p className='text-[#575757]'>Recent receips are shown below- view update status anytime</p>
                </div>
            </div>



    <div className="bg-white rounded-2xl shadow-md   p-5">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 border-b  border-gray-300 last:border-none py-3"
        >
          {getStatusIcon(item.status)}
          <div className="flex-1">
            <p className="text-gray-800 font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">{item.amount}</p>
            <p className="text-sm text-gray-500">
              {item.store} {item.date && `- ${item.date}`}
            </p>
          </div>
          <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
            {item.status}
          </p>
        </div>
      ))}

      <button className="text-[#3E3EDF] text-[20px] font-semibold mt-3 w-full hover:underline ">
        View Full History
      </button>
    </div>





            {/* Invite Friends Section */}
            <div className="bg-white mt-10 p-4 rounded-lg shadow-md mb-6 text-center border-gray-100 border">
                <h3 className="text-2xl font-medium">Invite Friends, Earn $5</h3>
                <p className='text-[#575757] mb-2'>Get $5 when your friend uploads their first receipt and completes $5 in review.</p>
                <button className="bg-[#3E3EDF] text-[20px] cursor-pointer w-full text-white px-4 py-4 rounded mt-4">Next</button>
            </div>

            {/* Upload New Receipt Section */}
            <div className="bg-white p-4 rounded-lg shadow-md my-10 border-gray-100 border">
                <h3 className="text-2xl font-semibold text-center">Upload New Receipt</h3>
                <div className="flex space-x-4 mt-4 justify-center">
                    {/* Button with Camera Icon for "Take Photo" */}
                    <button className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center">
                        <FiCamera size={20} className="mr-2" /> {/* Camera Icon */}
                        Take Photo
                    </button>
                    {/* Button with Upload Icon */}
                    <button className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center">
                        <FiUpload size={20} className="mr-2" /> {/* Upload Icon */}
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Scan;

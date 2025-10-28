"use client";

import { FiEye } from "react-icons/fi";

export default function DTable() {
const transactions = [
  {
    id: "12345678",
    user: "Tamim",
    brand: "John Doe",
    amount: "$250",
    date: "16 Apr 2024",
  },
  {
    id: "12345679",
    user: "John",
    brand: "Acme Inc.",
    amount: "$500",
    date: "17 Apr 2024",
  },
  {
    id: "12345680",
    user: "Sarah",
    brand: "Tech Corp.",
    amount: "$350",
    date: "18 Apr 2024",
  },
  {
    id: "12345681",
    user: "Mike",
    brand: "Green Innovations",
    amount: "$450",
    date: "19 Apr 2024",
  },
  {
    id: "12345682",
    user: "Alice",
    brand: "Future Tech",
    amount: "$600",
    date: "20 Apr 2024",
  },
  {
    id: "12345683",
    user: "David",
    brand: "Global Solutions",
    amount: "$700",
    date: "21 Apr 2024",
  },
  {
    id: "12345684",
    user: "Emma",
    brand: "Innovative Products",
    amount: "$800",
    date: "22 Apr 2024",
  },
  {
    id: "12345685",
    user: "Chris",
    brand: "NextGen Industries",
    amount: "$900",
    date: "23 Apr 2024",
  },
  {
    id: "12345686",
    user: "Sophia",
    brand: "Smart Ventures",
    amount: "$1,000",
    date: "24 Apr 2024",
  },
  {
    id: "12345687",
    user: "Ethan",
    brand: "Eco Green",
    amount: "$1,200",
    date: "25 Apr 2024",
  },
];



  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full  mt-10">
      <h2 className="text-[22px] text-[#1F1D1D] font-semibold mb-4">Recent Transactions</h2>

      {/* Table wrapper with accessible aria-label */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" aria-label="Recent Transactions Table">
          <thead>
            <tr className="bg-[#3B46F1] text-white text-left text-sm">
              <th className="py-3 px-4 rounded-tl-lg">#Tr.ID</th>
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Brand Name</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 rounded-tr-lg text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((item) => (
                <tr
                  key={item.id}
                  className=" hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.user}</td>
                  <td className="py-3 px-4">{item.brand}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-[#3B46F1] hover:text-[#2e36c8] hover:scale-110 transition-transform"
                      aria-label="View Details"
                    >
                      <FiEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

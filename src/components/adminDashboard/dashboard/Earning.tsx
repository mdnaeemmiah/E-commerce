"use client";

import { useState, useEffect } from "react";
import { FiEye, FiSearch, FiCalendar } from "react-icons/fi";

export default function Earning() {
  const [searchDate, setSearchDate] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

  const transactions = [
    { id: "12345678", user: "Tamim", brand: "John Doe", amount: "$250", date: "2024-04-16" },
    { id: "12345679", user: "John", brand: "Acme Inc.", amount: "$500", date: "2024-04-17" },
    { id: "12345680", user: "Sarah", brand: "Tech Corp.", amount: "$350", date: "2024-04-18" },
    { id: "12345681", user: "Mike", brand: "Green Innovations", amount: "$450", date: "2024-04-19" },
    { id: "12345682", user: "Alice", brand: "Future Tech", amount: "$600", date: "2024-04-20" },
    { id: "12345683", user: "David", brand: "Global Solutions", amount: "$700", date: "2024-04-21" },
    { id: "12345684", user: "Emma", brand: "Innovative Products", amount: "$800", date: "2024-04-22" },
    { id: "12345685", user: "Chris", brand: "NextGen Industries", amount: "$900", date: "2024-04-23" },
    { id: "12345686", user: "Sophia", brand: "Smart Ventures", amount: "$1,000", date: "2024-04-24" },
    { id: "12345687", user: "Ethan", brand: "Eco Green", amount: "$1,200", date: "2024-04-25" },
  ];

  // Load saved filters from localStorage on mount
  useEffect(() => {
    const savedDate = localStorage.getItem("searchDate");
    const savedUser = localStorage.getItem("searchUser");
    const savedBrand = localStorage.getItem("searchBrand");

    if (savedDate) setSearchDate(savedDate);
    if (savedUser) setSearchUser(savedUser);
    if (savedBrand) setSearchBrand(savedBrand);
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("searchDate", searchDate);
    localStorage.setItem("searchUser", searchUser);
    localStorage.setItem("searchBrand", searchBrand);
  }, [searchDate, searchUser, searchBrand]);

  const filtered = transactions.filter(
    (item) =>
      (searchDate ? item.date === searchDate : true) &&
      item.user.toLowerCase().includes(searchUser.toLowerCase()) &&
      item.brand.toLowerCase().includes(searchBrand.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full mt-10">
      <div className="flex justify-between flex-col lg:flex-row">
        <h2 className="text-[22px] text-[#1F1D1D] font-semibold mb-5">
          Recent Transactions
        </h2>

        {/* Search Fields */}
        <div className="flex   flex-wrap items-center gap-3 mb-5">
          {/* Date Picker */}
          <div className="flex items-center border rounded-lg px-0 md:px-3 py-2  sm:w-auto">
            {/* <FiCalendar className="text-gray-500 mr-2" /> */}
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="outline-none text-sm text-gray-700 w-40 sm:w-48"
            />
          </div>

          {/* User Name Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
            <input
              type="text"
              placeholder="User Name"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="outline-none text-sm text-gray-700 w-32 sm:w-40"
            />
          </div>

          {/* Brand Name Field */}
          <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
            <input
              type="text"
              placeholder="Brand Name"
              value={searchBrand}
              onChange={(e) => setSearchBrand(e.target.value)}
              className="outline-none text-sm text-gray-700 w-32 sm:w-40"
            />
          </div>

          {/* Search Button */}
          <button className="bg-[#3B46F1]  text-white p-2 rounded-full hover:bg-[#2f35c9] transition">
            <FiSearch size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 text-sm text-gray-700 border-b last:border-none"
                >
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.user}</td>
                  <td className="py-3 px-4">{item.brand}</td>
                  <td className="py-3 px-4">{item.amount}</td>
                  <td className="py-3 px-4">{formatDate(item.date)}</td>
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

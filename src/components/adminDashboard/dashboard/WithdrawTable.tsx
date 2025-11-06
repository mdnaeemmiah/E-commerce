
"use client";

import Pagination from "@/components/modules/shared/Pagination";
import { useState, useEffect } from "react";
import { FiEye, FiSearch, FiX } from "react-icons/fi";

interface Transaction {
  id: string;
  user: string;
  email: string;
  number: string;
  bankName: string;
  accountType: string;
  accountNumber: string;
  withdrawAmount: string;
  status: string;
  date: string;
}

export default function WithdrawTable() {
  const [searchDate, setSearchDate] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample static data with new fields
  const transactions: Transaction[] = [
    { id: "1", user: "Tamim", email: "tamim@example.com", number: "01711-123456", bankName: "Bank A", accountType: "Savings", accountNumber: "1234567890", withdrawAmount: "$500", status: "Pending", date: "2024-04-16" },
    { id: "2", user: "John", email: "john@example.com", number: "01722-654321", bankName: "Bank B", accountType: "Current", accountNumber: "9876543210", withdrawAmount: "$300", status: "Approved", date: "2024-04-17" },
    { id: "3", user: "Sarah", email: "sarah@example.com", number: "01733-987654", bankName: "Bank C", accountType: "Savings", accountNumber: "1122334455", withdrawAmount: "$700", status: "Rejected", date: "2024-04-18" },
    { id: "4", user: "Mike", email: "mike@example.com", number: "01744-456789", bankName: "Bank D", accountType: "Current", accountNumber: "2233445566", withdrawAmount: "$1000", status: "Approved", date: "2024-04-19" },
    { id: "5", user: "Alice", email: "alice@example.com", number: "01755-111222", bankName: "Bank E", accountType: "Savings", accountNumber: "3344556677", withdrawAmount: "$200", status: "Pending", date: "2024-04-20" },
    { id: "6", user: "David", email: "david@example.com", number: "01766-333444", bankName: "Bank F", accountType: "Current", accountNumber: "4455667788", withdrawAmount: "$150", status: "Approved", date: "2024-04-21" },
    { id: "7", user: "Emma", email: "emma@example.com", number: "01777-555666", bankName: "Bank G", accountType: "Savings", accountNumber: "5566778899", withdrawAmount: "$900", status: "Rejected", date: "2024-04-22" },
    { id: "8", user: "Chris", email: "chris@example.com", number: "01788-777888", bankName: "Bank H", accountType: "Current", accountNumber: "6677889900", withdrawAmount: "$400", status: "Pending", date: "2024-04-23" },
    { id: "9", user: "Sophia", email: "sophia@example.com", number: "01799-999000", bankName: "Bank I", accountType: "Savings", accountNumber: "7788990011", withdrawAmount: "$600", status: "Approved", date: "2024-04-24" },
    { id: "10", user: "Ethan", email: "ethan@example.com", number: "01700-222333", bankName: "Bank J", accountType: "Current", accountNumber: "8899001122", withdrawAmount: "$500", status: "Rejected", date: "2024-04-25" },
  ];

  // Load filters from localStorage
  useEffect(() => {
    const savedDate = localStorage.getItem("searchDate");
    const savedUser = localStorage.getItem("searchUser");
    if (savedDate) setSearchDate(savedDate);
    if (savedUser) setSearchUser(savedUser);
  }, []);

  // Save filters to localStorage
  useEffect(() => {
    localStorage.setItem("searchDate", searchDate);
    localStorage.setItem("searchUser", searchUser);
  }, [searchDate, searchUser]);

  // Filtering
  const filtered = transactions.filter(
    (item) =>
      (searchDate ? item.date === searchDate : true) &&
      item.user.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-5 w-full mt-10">
        <div className="flex justify-between flex-col md:flex-row">
          <h2 className="text-[22px] text-[#1F1D1D] font-semibold mb-5">
            Withdraw Request List
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#3E3EDF] text-white text-left text-sm">
                <th className="py-3 px-4 rounded-tl-lg">#Sl</th>
                <th className="py-3 px-4">User Name</th>
                <th className="py-3 px-4">Bank Name</th>
                <th className="py-3 px-4">A/C Type</th>
                <th className="py-3 px-4">A/C Number</th>
                <th className="py-3 px-4">Withdraw Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-3 px-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-sm text-gray-700  last:border-none"
                  >
                    <td className="py-3 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="py-3 px-4">{item.user}</td>
                    <td className="py-3 px-4">{item.bankName}</td>
                    <td className="py-3 px-4">{item.accountType}</td>
                    <td className="py-3 px-4">{item.accountNumber}</td>
                    <td className="py-3 px-4">{item.withdrawAmount}</td>
                    <td className="py-3 px-4">{item.status}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-[#3B46F1] cursor-pointer hover:text-[#2e36c8] hover:scale-110 transition-transform"
                        onClick={() => setSelectedTransaction(item)}
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Popup Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[95%] max-w-md p-6 relative shadow-lg">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
            >
              <FiX size={22} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-center border-b pb-2">
              User Details
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>User ID:</strong> {selectedTransaction.id}</p>
              <p><strong>User Name:</strong> {selectedTransaction.user}</p>
              <p><strong>Email:</strong> {selectedTransaction.email}</p>
              <p><strong>Phone Number:</strong> {selectedTransaction.number}</p>
              <p><strong>Bank Name:</strong> {selectedTransaction.bankName}</p>
              <p><strong>Account Type:</strong> {selectedTransaction.accountType}</p>
              <p><strong>Account Number:</strong> {selectedTransaction.accountNumber}</p>
              <p><strong>Withdraw Amount:</strong> {selectedTransaction.withdrawAmount}</p>
              <p><strong>Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Join Date:</strong> {formatDate(selectedTransaction.date)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

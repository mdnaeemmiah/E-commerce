// "use client";

// import Pagination from "@/components/modules/shared/Pagination";
// import { useState, useEffect } from "react";
// import { FiEye, FiSearch, FiX } from "react-icons/fi";
// import jsPDF from "jspdf";

// interface Transaction {
//   id: string;
//   user: string;
//   brand: string;
//   amount: string;
//   date: string;
//   acNumber: string;
//   acHolder: string;
//   provider: string;
// }

// export default function Earning() {
//   const [searchDate, setSearchDate] = useState("");
//   const [searchUser, setSearchUser] = useState("");
//   const [searchBrand, setSearchBrand] = useState("");
//   const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

// const transactions: Transaction[] = [
//   { id: "12345678", user: "Tamim", brand: "John Doe", amount: "$250", date: "2024-04-16", acNumber: "**** **** **** *545", acHolder: "Tamim", provider: "XYZ" },
//   { id: "12345679", user: "John", brand: "Acme Inc.", amount: "$500", date: "2024-04-17", acNumber: "**** **** **** *432", acHolder: "John", provider: "ABC" },
//   { id: "12345680", user: "Sarah", brand: "Tech Corp.", amount: "$350", date: "2024-04-18", acNumber: "**** **** **** *321", acHolder: "Sarah", provider: "DEF" },
//   { id: "12345681", user: "Mike", brand: "Green Innovations", amount: "$450", date: "2024-04-19", acNumber: "**** **** **** *112", acHolder: "Mike", provider: "GHI" },
//   { id: "12345682", user: "Alice", brand: "Future Tech", amount: "$600", date: "2024-04-20", acNumber: "**** **** **** *987", acHolder: "Alice", provider: "JKL" },
//   { id: "12345683", user: "David", brand: "Global Solutions", amount: "$700", date: "2024-04-21", acNumber: "**** **** **** *256", acHolder: "David", provider: "MNO" },
//   { id: "12345684", user: "Emma", brand: "Innovative Products", amount: "$800", date: "2024-04-22", acNumber: "**** **** **** *789", acHolder: "Emma", provider: "PQR" },
//   { id: "12345685", user: "Chris", brand: "NextGen Industries", amount: "$900", date: "2024-04-23", acNumber: "**** **** **** *654", acHolder: "Chris", provider: "STU" },
//   { id: "12345686", user: "Sophia", brand: "Smart Ventures", amount: "$1,000", date: "2024-04-24", acNumber: "**** **** **** *321", acHolder: "Sophia", provider: "VWX" },
//   { id: "12345687", user: "Ethan", brand: "Eco Green", amount: "$1,200", date: "2024-04-25", acNumber: "**** **** **** *878", acHolder: "Ethan", provider: "YZA" },
// ];


//   // Load saved filters
//   useEffect(() => {
//     const savedDate = localStorage.getItem("searchDate");
//     const savedUser = localStorage.getItem("searchUser");
//     const savedBrand = localStorage.getItem("searchBrand");
//     if (savedDate) setSearchDate(savedDate);
//     if (savedUser) setSearchUser(savedUser);
//     if (savedBrand) setSearchBrand(savedBrand);
//   }, []);

//   // Save filters
//   useEffect(() => {
//     localStorage.setItem("searchDate", searchDate);
//     localStorage.setItem("searchUser", searchUser);
//     localStorage.setItem("searchBrand", searchBrand);
//   }, [searchDate, searchUser, searchBrand]);

//   const filtered = transactions.filter(
//     (item) =>
//       (searchDate ? item.date === searchDate : true) &&
//       item.user.toLowerCase().includes(searchUser.toLowerCase()) &&
//       item.brand.toLowerCase().includes(searchBrand.toLowerCase())
//   );

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const currentItems = filtered.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page: number) => setCurrentPage(page);

//   // PDF download
//   const handleDownload = () => {
//     if (!selectedTransaction) return;
//     const doc = new jsPDF();
//     doc.setFontSize(16);
//     doc.text("Transaction Details", 20, 20);
//     doc.setFontSize(12);
//     doc.text(`Transaction ID: ${selectedTransaction.id}`, 20, 40);
//     doc.text(`Date: ${selectedTransaction.date}`, 20, 50);
//     doc.text(`User Name: ${selectedTransaction.user}`, 20, 60);
//     doc.text(`A/C Number: ${selectedTransaction.acNumber}`, 20, 70);
//     doc.text(`A/C Holder: ${selectedTransaction.acHolder}`, 20, 80);
//     doc.text(`Transaction Amount: ${selectedTransaction.amount}`, 20, 90);
//     doc.text(`Provider Name: ${selectedTransaction.provider}`, 20, 100);
//     doc.save(`${selectedTransaction.id}.pdf`);
//   };

//   return (
//     <div>
//       <div className="bg-white shadow-md rounded-xl p-5 w-full mt-10">
//         <div className="flex justify-between flex-col lg:flex-row">
//           <h2 className="text-[22px] text-[#1F1D1D] font-semibold mb-5">
//             Recent Transactions
//           </h2>

//           {/* Search Fields */}
//           <div className="flex flex-wrap items-center gap-3 mb-5">
//             <div className="flex items-center border rounded-lg px-0 md:px-3 py-2 sm:w-auto">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={(e) => setSearchDate(e.target.value)}
//                 className="outline-none text-sm text-gray-700 w-40 sm:w-48"
//               />
//             </div>

//             <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="User Name"
//                 value={searchUser}
//                 onChange={(e) => setSearchUser(e.target.value)}
//                 className="outline-none text-sm text-gray-700 w-32 sm:w-40"
//               />
//             </div>

//             <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Brand Name"
//                 value={searchBrand}
//                 onChange={(e) => setSearchBrand(e.target.value)}
//                 className="outline-none text-sm text-gray-700 w-32 sm:w-40"
//               />
//             </div>

//             <button className="bg-[#3B46F1] text-white p-2 rounded-full hover:bg-[#2f35c9] transition">
//               <FiSearch size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-[#3B46F1] text-white text-left text-sm">
//                 <th className="py-3 px-4 rounded-tl-lg">#Tr.ID</th>
//                 <th className="py-3 px-4">User Name</th>
//                 <th className="py-3 px-4">Brand Name</th>
//                 <th className="py-3 px-4">Amount</th>
//                 <th className="py-3 px-4">Date</th>
//                 <th className="py-3 px-4 rounded-tr-lg text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
//                     No transactions found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="hover:bg-gray-50 text-sm text-gray-700 last:border-none"
//                   >
//                     <td className="py-3 px-4">{item.id}</td>
//                     <td className="py-3 px-4">{item.user}</td>
//                     <td className="py-3 px-4">{item.brand}</td>
//                     <td className="py-3 px-4">{item.amount}</td>
//                     <td className="py-3 px-4">{formatDate(item.date)}</td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         className="text-[#3B46F1] hover:text-[#2e36c8] hover:scale-110 transition-transform"
//                         onClick={() => setSelectedTransaction(item)}
//                       >
//                         <FiEye size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={handlePageChange}
//       />

//       {/* Popup Modal */}
//       {selectedTransaction && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl w-[95%] max-w-md p-6 relative shadow-lg">
//             <button
//               onClick={() => setSelectedTransaction(null)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
//             >
//               <FiX size={22} />
//             </button>

//             <h3 className="text-lg font-semibold mb-4 text-center border-b pb-2">
//               Transaction Details
//             </h3>

//             <div className="space-y-2 text-sm text-gray-700">
//               <p><strong>Transaction ID:</strong> #{selectedTransaction.id}</p>
//               <p><strong>Date:</strong> {selectedTransaction.date}</p>
//               <p><strong>User name:</strong> {selectedTransaction.user}</p>
//               <p><strong>A/C number:</strong> {selectedTransaction.acNumber}</p>
//               <p><strong>A/C holder name:</strong> {selectedTransaction.acHolder}</p>
//               <p><strong>Transaction amount:</strong> {selectedTransaction.amount}</p>
//               <p><strong>Provider name:</strong> {selectedTransaction.provider}</p>
//             </div>

//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={handleDownload}
//                 className="border border-[#3B46F1] text-[#3B46F1] px-5 py-2 rounded-lg hover:bg-[#f0f2ff] transition"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={() => window.print()}
//                 className="bg-[#3B46F1] text-white px-5 py-2 rounded-lg hover:bg-[#2f35c9] transition"
//               >
//                 Print
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import Pagination from "@/components/modules/shared/Pagination";
import { useState, useEffect } from "react";
import { FiEye, FiSearch, FiX } from "react-icons/fi";
import jsPDF from "jspdf";

// Define the Transaction interface
interface Transaction {
  id: string;
  user: string;
  brand: string;
  amount: string;
  date: string;
  acNumber: string;
  acHolder: string;
  provider: string;
}

export default function Earning() {
  const [searchDate, setSearchDate] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  
  // Use the Transaction type for selectedTransaction instead of 'any'
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Example transactions array
  const transactions: Transaction[] = [
    { id: "12345678", user: "Tamim", brand: "John Doe", amount: "$250", date: "2024-04-16", acNumber: "**** **** **** *545", acHolder: "Tamim", provider: "XYZ" },
    { id: "12345679", user: "John", brand: "Acme Inc.", amount: "$500", date: "2024-04-17", acNumber: "**** **** **** *432", acHolder: "John", provider: "ABC" },
    { id: "12345680", user: "Sarah", brand: "Tech Corp.", amount: "$350", date: "2024-04-18", acNumber: "**** **** **** *321", acHolder: "Sarah", provider: "DEF" },
    { id: "12345681", user: "Mike", brand: "Green Innovations", amount: "$450", date: "2024-04-19", acNumber: "**** **** **** *112", acHolder: "Mike", provider: "GHI" },
    { id: "12345682", user: "Alice", brand: "Future Tech", amount: "$600", date: "2024-04-20", acNumber: "**** **** **** *987", acHolder: "Alice", provider: "JKL" },
    { id: "12345683", user: "David", brand: "Global Solutions", amount: "$700", date: "2024-04-21", acNumber: "**** **** **** *256", acHolder: "David", provider: "MNO" },
    { id: "12345684", user: "Emma", brand: "Innovative Products", amount: "$800", date: "2024-04-22", acNumber: "**** **** **** *789", acHolder: "Emma", provider: "PQR" },
    { id: "12345685", user: "Chris", brand: "NextGen Industries", amount: "$900", date: "2024-04-23", acNumber: "**** **** **** *654", acHolder: "Chris", provider: "STU" },
    { id: "12345686", user: "Sophia", brand: "Smart Ventures", amount: "$1,000", date: "2024-04-24", acNumber: "**** **** **** *321", acHolder: "Sophia", provider: "VWX" },
    { id: "12345687", user: "Ethan", brand: "Eco Green", amount: "$1,200", date: "2024-04-25", acNumber: "**** **** **** *878", acHolder: "Ethan", provider: "YZA" },
  ];

  // Load saved filters
  useEffect(() => {
    const savedDate = localStorage.getItem("searchDate");
    const savedUser = localStorage.getItem("searchUser");
    const savedBrand = localStorage.getItem("searchBrand");
    if (savedDate) setSearchDate(savedDate);
    if (savedUser) setSearchUser(savedUser);
    if (savedBrand) setSearchBrand(savedBrand);
  }, []);

  // Save filters
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  // PDF download
  const handleDownload = () => {
    if (!selectedTransaction) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Transaction Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${selectedTransaction.id}`, 20, 40);
    doc.text(`Date: ${selectedTransaction.date}`, 20, 50);
    doc.text(`User Name: ${selectedTransaction.user}`, 20, 60);
    doc.text(`A/C Number: ${selectedTransaction.acNumber}`, 20, 70);
    doc.text(`A/C Holder: ${selectedTransaction.acHolder}`, 20, 80);
    doc.text(`Transaction Amount: ${selectedTransaction.amount}`, 20, 90);
    doc.text(`Provider Name: ${selectedTransaction.provider}`, 20, 100);
    doc.save(`${selectedTransaction.id}.pdf`);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-5 w-full mt-10">
        <div className="flex justify-between flex-col lg:flex-row">
          <h2 className="text-[22px] text-[#1F1D1D] font-semibold mb-5">
            Recent Transactions
          </h2>

          {/* Search Fields */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex items-center border rounded-lg px-0 md:px-3 py-2 sm:w-auto">
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="outline-none text-sm text-gray-700 w-40 sm:w-48"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
              <input
                type="text"
                placeholder="User Name"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="outline-none text-sm text-gray-700 w-32 sm:w-40"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 py-2 sm:w-auto">
              <input
                type="text"
                placeholder="Brand Name"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="outline-none text-sm text-gray-700 w-32 sm:w-40"
              />
            </div>

            <button className="bg-[#3B46F1] text-white p-2 rounded-full hover:bg-[#2f35c9] transition">
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-3 px-4 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 text-sm text-gray-700 last:border-none"
                  >
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.user}</td>
                    <td className="py-3 px-4">{item.brand}</td>
                    <td className="py-3 px-4">{item.amount}</td>
                    <td className="py-3 px-4">{formatDate(item.date)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        className="text-[#3B46F1] hover:text-[#2e36c8] hover:scale-110 transition-transform"
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
              Transaction Details
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Transaction ID:</strong> #{selectedTransaction.id}</p>
              <p><strong>Date:</strong> {selectedTransaction.date}</p>
              <p><strong>User name:</strong> {selectedTransaction.user}</p>
              <p><strong>A/C number:</strong> {selectedTransaction.acNumber}</p>
              <p><strong>A/C holder name:</strong> {selectedTransaction.acHolder}</p>
              <p><strong>Transaction amount:</strong> {selectedTransaction.amount}</p>
              <p><strong>Provider name:</strong> {selectedTransaction.provider}</p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDownload}
                className="border border-[#3B46F1] text-[#3B46F1] px-5 py-2 rounded-lg hover:bg-[#f0f2ff] transition"
              >
                Download
              </button>
              <button
                onClick={() => window.print()}
                className="bg-[#3B46F1] text-white px-5 py-2 rounded-lg hover:bg-[#2f35c9] transition"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

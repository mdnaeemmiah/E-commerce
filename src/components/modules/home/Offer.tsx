import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';

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

const Offer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold">Your rewards Hub</h2>
      </div>

      {/* Pending Rebates Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium">Pending Rebates</h3>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <span>Noosa 50$ Rebates</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Upload Receipt</button>
          </div>
          <div className="flex justify-between items-center">
            <span>LaCroix Grapefruit</span>
            <span className="text-green-500">Receipt Verified</span>
          </div>
        </div>
      </div>

      {/* Earn More Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium">Want to earn more?</h3>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <span>Lacroix Grapefruit 12pk</span>
            <button className="text-blue-500">Start Review</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Noosa Honey Yoghurt</span>
            <button className="text-blue-500">Start Review</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Driscoll Strawberries</span>
            <button className="text-blue-500">Start Review</button>
          </div>
        </div>
      </div>

      {/* Receipt History Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium">Receipt History</h3>
        <div className="space-y-4 mt-4">
          {receipts.map((receipt, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{receipt.name}</span>
              <span className={`flex items-center gap-2 ${
                receipt.status === 'verified' ? 'text-green-500' :
                receipt.status === 'pending' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {receipt.status === 'verified' && <FaCheckCircle />}
                {receipt.status === 'pending' && <FaRegClock />}
                {receipt.status === 'rejected' && <FaTimesCircle />}
                <span>{receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Friends Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-medium">Invite Friends, Earn $5</h3>
        <p>Get $5 when your friend uploads their first receipt and completes $5 in review.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Next</button>
      </div>

      {/* Upload New Receipt Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-medium">Upload New Receipt</h3>
        <div className="flex space-x-4 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Take Photo</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Take Photo</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;

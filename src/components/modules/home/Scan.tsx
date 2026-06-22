"use client";
import React, { useState } from "react";
import { FiCamera, FiUpload, FiWatch, FiX } from "react-icons/fi";
import { RiHomeLine } from "react-icons/ri";
import { FaCheckCircle, FaStar, FaUserFriends } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { toast } from "sonner";

const activityData = [
  {
    id: 1,
    title: "Rebate Verified-",
    amount: "$1.00 added to wallet",
    store: "Whole Foods Market - Apr 2, 2025",
    status: "Verified",
  },
  {
    id: 2,
    title: "Receipt Pending Review",
    amount: "",
    store: "Whole Foods Market - Apr 2, 2025",
    status: "Pending",
  },
  {
    id: 3,
    title: "Review Rejected-",
    amount: "$1.00",
    store: "Whole Foods Market - Apr 2, 2025",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Referral Bonus",
    amount: "$5.00 Added",
    store: "Your friend completed their first review!",
    status: "Bonus Earned",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Verified":
      return <FaCheckCircle className="text-green-500 text-xl mt-0.5" />;
    case "Pending":
      return (
        <FiWatch className="text-white text-xl bg-[#FF9400] rounded-full p-1 w-5 h-5 mt-0.5 shrink-0" />
      );
    case "Rejected":
      return <FaStar className="text-yellow-400 text-xl mt-0.5" />;
    case "Bonus Earned":
      return <FaUserFriends className="text-indigo-500 text-xl mt-0.5" />;
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
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!image) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setShowUploadPopup(false);
      setImage(null);
      setImagePreview(null);
      toast.success("Receipt uploaded successfully!");
    }, 1000);
  };

  return (
    <div className="py-6 mt-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Your Rewards Hub
        </h2>
      </div>

      {/* Pending Rebates */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6">
        <div className="flex gap-2 mb-4">
          <FiWatch size={22} color="#3E3EDF" />
          <h3 className="text-[18px] font-medium">Pending Rebates</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>Noosa 50$ Rebates</span>
            <label
              htmlFor="upload-input"
              className="bg-[#3E3EDF] cursor-pointer text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm"
            >
              <FiUpload size={16} />
              Upload Receipt
            </label>
            <input
              type="file"
              accept="image/*"
              id="upload-input"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                  const r = new FileReader();
                  r.onloadend = () => setImagePreview(r.result as string);
                  r.readAsDataURL(file);
                  setShowUploadPopup(true);
                }
              }}
            />
          </div>
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>LaCroix Grapefruit</span>
            <span className="text-[#00A671] font-semibold">Receipt Verified</span>
          </div>
          <p className="text-[#575757] text-sm">
            Upload receipts to complete pending rebate offers.
          </p>
        </div>
      </div>

      {/* Want to earn more */}
      <div className="bg-[#E8E8FF] p-4 rounded-lg shadow-md mb-6 mt-10">
        <div className="text-center mb-2">
          <h3 className="text-[24px] font-medium">Want to earn more?</h3>
          <p className="text-sm text-gray-600">
            Complete quick reviews from any verified receipt to earn an extra $1 per review.
          </p>
        </div>
        <div className="space-y-4 mt-8">
          {["Lacroix Grapefruit 12pk", "Noosa Honey Yogurt", "Driscoll Strawberries"].map(
            (item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3 border-gray-300"
              >
                <span>{item}</span>
                <button
                  onClick={() => setShowReviewPopup(true)}
                  className="bg-[#3E3EDF] text-white px-4 py-2 rounded cursor-pointer text-sm"
                >
                  Start Review
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Receipt History */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 mt-10">
        <div className="flex gap-2 mb-4">
          <RiHomeLine size={24} color="#3E3EDF" />
          <h3 className="text-[18px] font-medium">Receipt History</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>Noosa 50$ Rebates</span>
            <span className="text-[#00A671] font-semibold">Verified</span>
          </div>
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>Noosa 50$ Rebates</span>
            <span className="text-[#D7930A] font-semibold">Pending</span>
          </div>
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>Noosa 50$ Rebates</span>
            <span className="text-[#FF5C5C] font-semibold">Rejected</span>
          </div>
          <p className="text-[#575757] text-sm">
            Recent receipts are shown below- view update status anytime
          </p>
        </div>
      </div>

      {/* Activity History */}
      <div className="bg-white rounded-2xl shadow-md p-5 mt-6">
        <h3 className="text-[18px] font-medium mb-4">Activity History</h3>
        {activityData.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border-b border-gray-300 last:border-none py-3"
          >
            {getStatusIcon(item.status)}
            <div className="flex-1">
              <p className="text-gray-800 font-medium">{item.title}</p>
              {item.amount && <p className="text-sm text-gray-600">{item.amount}</p>}
              <p className="text-sm text-gray-500">{item.store}</p>
            </div>
            <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </p>
          </div>
        ))}
        <button className="text-[#3E3EDF] text-[18px] font-semibold mt-3 w-full hover:underline">
          View Full History
        </button>
      </div>

      {/* Invite Friends */}
      <div className="bg-white mt-10 p-4 rounded-lg shadow-md mb-6 text-center border-gray-100 border">
        <h3 className="text-2xl font-medium">Invite Friends, Earn $5</h3>
        <p className="text-[#575757] mb-2 text-sm">
          Get $5 when your friend uploads their first receipt and completes $5 in review.
        </p>
        <button
          onClick={() => setShowInvitePopup(true)}
          className="bg-[#3E3EDF] text-[20px] cursor-pointer w-full text-white px-4 py-4 rounded mt-4"
        >
          Next
        </button>
      </div>

      {/* Upload New Receipt */}
      <div className="bg-white p-4 rounded-lg shadow-md my-10 border-gray-100 border">
        <h3 className="text-2xl font-semibold text-center">Upload New Receipt</h3>
        <div className="flex space-x-4 mt-4 justify-center">
          <button className="bg-[#3E3EDF] cursor-pointer text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <FiCamera size={20} />
            Take Photo
          </button>
          <label
            htmlFor="upload-new-input"
            className="bg-[#3E3EDF] cursor-pointer text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <FiUpload size={20} />
            Upload photo
            <input
              type="file"
              accept="image/*"
              id="upload-new-input"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImage(file);
                  const r = new FileReader();
                  r.onloadend = () => setImagePreview(r.result as string);
                  r.readAsDataURL(file);
                  setShowUploadPopup(true);
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Review Popup */}
      {showReviewPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setShowReviewPopup(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full md:max-w-md lg:max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="space-y-5">
              <div className="flex flex-col items-start">
                <p className="text-gray-700 mb-2">
                  Hey there! How did you like the product?
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block bg-[#3E3EDF] text-white px-4 py-2 rounded-2xl shadow-sm">
                  It was delicious, and the whole bag was super fresh!
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-700">
                  Glad to hear it! What did you like most—taste, texture, or ingredients?
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block bg-[#3E3EDF] text-white px-4 py-2 rounded-2xl shadow-sm">
                  Mostly the great flavor.
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-700">
                  Would you purchase it again or recommend it to others?
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl mt-4 border border-gray-200">
                <p className="text-gray-800 text-sm mb-2 leading-relaxed">
                  The product was delicious and super fresh. I loved the great flavor. It's a tasty and healthy choice.
                </p>
                <button className="text-blue-600 text-sm underline hover:text-blue-800">
                  Edit
                </button>
              </div>
              <div className="mt-6 pt-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="Write message"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                  />
                  <button className="text-[#2b2bd4] p-2 rounded-lg transition">
                    <IoSend className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowReviewPopup(false)}
                className="text-gray-600 underline cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Popup */}
      {showInvitePopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setShowInvitePopup(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh] text-center">
            <h2 className="text-xl font-semibold mb-2">Invite Friends, Earn $5</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Get $5 when your friend uploads their first receipt and completes $5 in review.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Friend's full name"
                className="border border-gray-300 w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
              />
              <input
                type="text"
                placeholder="E-mail address or phone number"
                className="border border-gray-300 w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
              />
              <button className="bg-[#3E3EDF] text-white w-full py-3 rounded-md hover:bg-[#2e2edf] transition duration-200">
                Send Invite
              </button>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowInvitePopup(false)}
                className="text-gray-600 underline cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Confirm Popup */}
      {showUploadPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Upload Receipt</h3>
              <button
                onClick={() => {
                  setShowUploadPopup(false);
                  setImage(null);
                  setImagePreview(null);
                }}
              >
                <FiX size={20} className="text-gray-400" />
              </button>
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-contain rounded-lg mb-4 border border-gray-200"
              />
            )}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full flex items-center justify-center gap-2 bg-[#3E3EDF] text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              <IoSend size={16} />
              {uploading ? "Uploading..." : "Submit Receipt"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scan;

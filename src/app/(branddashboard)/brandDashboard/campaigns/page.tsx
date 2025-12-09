"use client";
import Campaign from "@/components/BrandDashboard/dashboard/Campaign";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import baseApi from "@/api/baseApi"; // Ensure baseApi is set up correctly
import { ENDPOINTS } from "@/api/endPoints"; // Ensure ENDPOINTS is set up
import { useRouter } from "next/navigation"; // Use Next.js router for page navigation
import { toast } from "sonner"; // For toast notifications


const stats = [
  { label: "Total Campaigns", value: 3, value1: "2 Active,1 paused" },
  { label: "Total Budget", value: "$3,500", value1: "$2,270 spent (65%)" },
  { label: "Campaign Spent", value: "$3,420", value1: "15% on $2,270 spent" },
];

export default function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    terms_conditions: "",
    offer_type: "percentage",
    discount_value: 20.0,
    min_purchase_amount: 0.0,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2025-02-15T23:59:59Z",
    budget: 1000.0,
    max_redemptions: 150,
    status: "active",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCampaignData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const router = useRouter();

    const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Assuming the token is stored in localStorage
      if (!token) {
        toast.error("Token not found, please login again.");
        return;
      }

      // Prepare request headers with authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Send the POST request to create a campaign
      const response = await baseApi.post(ENDPOINTS.createCampaigns, campaignData, {
        headers,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Campaign created successfully!");
        setIsPopupOpen(false); // Close the popup after success
        // router.push("/dashboard"); // Optionally redirect to the dashboard
      } else {
        toast.error("Failed to create campaign.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the campaign.");
    }
  };

  return (
    <div>
      <div className="flex justify-between mt-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-black">
            Campaigns Management
          </h2>
          <p className="text-gray-600">
            Create and manage your rebate campaigns
          </p>
        </div>
        <div>
          <button
            className="bg-[#3E3EDF] cursor-pointer text-white rounded-md p-2 ml-2 flex items-center gap-2"
            onClick={() => setIsPopupOpen(true)} // Open the popup
          >
            <FaPlus /> Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]"
          >
            {/* Icon and Text Layout */}
            <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
              {stat.label}
            </div>
            {/* Value */}
            <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
              {stat.value}
            </div>
            <div className="text-[16px]">{stat.value1}</div>
          </div>
        ))}
      </div>

      {/* Popup for Create Campaign */}
      {isPopupOpen && (
        <div className="fixed  inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] md:w-[70%] lg:w-[50%]  p-6 relative shadow-lg">
            <button
              onClick={() => setIsPopupOpen(false)} // Close the popup
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 cursor-pointer" 
            >
              <FiX size={22} />
            </button>
            <h3 className="text-lg font-semibold mb-6 text-center border-b pb-2 text-black">
              Create Campaign
            </h3>

            <div className="grid grid-cols-2 gap-4"> {/* 2-column grid */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={campaignData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={campaignData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Terms & Conditions</label>
                <input
                  type="text"
                  name="terms_conditions"
                  value={campaignData.terms_conditions}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Discount Value (%)</label>
                <input
                  type="number"
                  name="discount_value"
                  value={campaignData.discount_value}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Start Date</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={campaignData.start_date.slice(0, 16)} // Format to match input type
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">End Date</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={campaignData.end_date.slice(0, 16)} // Format to match input type
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Budget</label>
                <input
                  type="number"
                  name="budget"
                  value={campaignData.budget}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Max Redemptions</label>
                <input
                  type="number"
                  name="max_redemptions"
                  value={campaignData.max_redemptions}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="space-y-2 col-span-2"> {/* Making the Status input span both columns */}
                <label className="text-sm font-semibold">Status</label>
                <select
                  name="status"
                  value={campaignData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="inactive">Resume</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center ">
              <button
                onClick={handleSubmit} 
                className="bg-[#3E3EDF] cursor-pointer text-white rounded-md p-2 px-20"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Campaign></Campaign>
    </div>
  );
}

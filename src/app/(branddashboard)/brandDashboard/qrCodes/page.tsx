"use client";
import { useState, useEffect } from "react";
import GenerateQr from "@/components/BrandDashboard/dashboard/GenerateQr";
import { IoQrCodeOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";

const stats = [
  { label: "Total QR Codes", value: 3, value1: "2 Active, 1 paused" },
  { label: "Total Scans", value: "$3,500", value1: "$2,270 spent (65%)" },
  {
    label: "Scan-to-Conversion",
    value: "$3,420",
    value1: "15% on $2,270 spent",
  },
];

export default function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for managing popup visibility
  const [campaignData, setCampaignData] = useState<{ title: string; campaign_id: string | number | null }>({
    title: "",
    campaign_id: null, // Store the selected campaign ID
  });
  const [campaignTitles, setCampaignTitles] = useState<{ id: string | number; title: string }[]>([]); // Store the campaign titles fetched from API

  // Fetch campaigns data when the component mounts
  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await baseApi.get(ENDPOINTS.getAllCampaign);

        // console.log(response.data, "response");

        const campaigns = (response?.data as any)?.campaigns || [];

        // Map the campaigns to include both title and id
        const titles = campaigns.map((campaign:any) => ({
          id: campaign.id,
          title: campaign.title,
        }));

        setCampaignTitles(titles); // Set the campaign titles and ids to state
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaignData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;

    // Find the campaign id corresponding to the selected title
    const selectedCampaign = campaignTitles.find(
      (campaign) => campaign.title === value
    );

    setCampaignData({
      ...campaignData,
      title: value,
      campaign_id: selectedCampaign?.id || null, // Update campaign_id
    });
  };

  const handleSubmit = async () => {
    if (!campaignData.campaign_id) {
      console.error("No campaign selected");
      return;
    }

    try {
      // Send the campaign ID in the request
      const response = await baseApi.post(ENDPOINTS.generateCampaignQr, {
        campaign_id: campaignData.campaign_id, // Send the campaign_id
      });

      console.log("Campaign QR generated:", response.data);
      setIsPopupOpen(false); // Close the popup after submit
    } catch (error) {
      console.error("Error generating campaign QR:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold mb-2 text-black">
            QR Code Generator
          </h2>
          <p className="text-gray-600">
            Generate and manage QR Codes for your campaigns
          </p>
        </div>
        <div>
          <button
            onClick={() => setIsPopupOpen(true)} // Open the popup
            className="cursor-pointer text-black border border-gray-200 shadow-md rounded-md p-2 flex items-center gap-2"
          >
            <IoQrCodeOutline /> Generate Campaign QR
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mt-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]"
          >
            <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
              {stat.label}
            </div>
            <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
              {stat.value}
            </div>
            <div className="text-[16px]">{stat.value1}</div>
          </div>
        ))}
      </div>

      <GenerateQr />

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] md:w-[70%] lg:w-[50%] p-6 relative shadow-lg transform transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsPopupOpen(false)} // Close the popup
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 cursor-pointer"
            >
              <FiX size={22} />
            </button>
            <h3 className="text-lg font-semibold mb-6 text-center border-b pb-2 text-black">
              Create Campaign
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Single-column grid for better spacing */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">
                  Title
                </label>
                <select
                  name="title"
                  value={campaignData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Title</option>
                  {campaignTitles.map((campaign) => (
                    <option key={campaign.id} value={campaign.title}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit} // Submit the form data
                className="bg-[#3E3EDF] text-white rounded-md p-3 px-10 hover:bg-[#2a2ed6] transition-all duration-300 ease-in-out"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

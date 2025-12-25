"use client";
import Campaign from "@/components/BrandDashboard/dashboard/Campaign";
import { useState, useEffect } from "react";
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
  const [products, setProducts] = useState<any[]>([]);
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
    product: "", // Added product field
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await baseApi.get(ENDPOINTS.productList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.results && Array.isArray(data.results)) {
          setProducts(data.results);
        } else if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Create New Campaign</h3>
                <p className="text-sm text-gray-500 mt-1">Set up your campaign details and budget</p>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Section: Basic Info */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Campaign Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Product</label>
                    <select
                      name="product"
                      value={campaignData.product}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    >
                      <option value="">Choose a product...</option>
                      {Array.isArray(products) && products.map((product: any) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Campaign Title</label>
                    <input
                      type="text"
                      name="title"
                      value={campaignData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Summer Sale 2025"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      rows={2}
                      value={campaignData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your campaign..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Offer & Budget */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-t pt-6">Offer & Budget</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Discount Value (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="discount_value"
                        value={campaignData.discount_value}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none pl-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Total Budget ($)</label>
                    <input
                      type="number"
                      name="budget"
                      value={campaignData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Max Redemptions</label>
                    <input
                      type="number"
                      name="max_redemptions"
                      value={campaignData.max_redemptions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Schedule & Terms */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider border-t pt-6">Schedule & Terms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="datetime-local"
                      name="start_date"
                      value={campaignData.start_date.slice(0, 16)}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={campaignData.end_date.slice(0, 16)}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Terms & Conditions</label>
                    <input
                      type="text"
                      name="terms_conditions"
                      value={campaignData.terms_conditions}
                      onChange={handleInputChange}
                      placeholder="e.g. Valid for new customers only"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={campaignData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      <Campaign></Campaign>
    </div>
  );
}

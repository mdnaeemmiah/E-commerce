"use client";

import DActive from '@/components/BrandDashboard/dashboard/DActive';
import DRecent from '@/components/BrandDashboard/dashboard/DRecent';
import baseApi from "@/api/baseApi"; 
import { ENDPOINTS } from "@/api/endPoints"; 
import { useEffect, useState } from 'react';

interface DashboardResponse {
  active_campaigns: number;
  clips_issued: { today: number; total: number };
  redemptions: { today: number; total: number };
  reviews_collected: number;
  conversion_rate_percent: number;
  message: string;
}

export default function Page() {
  // State to hold the fetched data
  const [data, setData] = useState({
    activeCampaigns: 0,
    clipsIssuedToday: 0,
    clipsIssuedTotal: 0,
    redemptionsToday: 0,
    redemptionsTotal: 0,
    reviewsCollected: 0,
    conversionRate: 0,
    message: "",
  });

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi.get<DashboardResponse>(ENDPOINTS.brandDashboardHome); // Replace with your actual endpoint
        
        // Extract data from the response
        const {
          active_campaigns,
          clips_issued,
          redemptions,
          reviews_collected,
          conversion_rate_percent,
          message
        } = response.data;

        // Update state with fetched data
        setData({
          activeCampaigns: active_campaigns,
          clipsIssuedToday: clips_issued.today,
          clipsIssuedTotal: clips_issued.total,
          redemptionsToday: redemptions.today,
          redemptionsTotal: redemptions.total,
          reviewsCollected: reviews_collected,
          conversionRate: conversion_rate_percent,
          message: message,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6 mt-10">

        {/* Box 1: Active Campaigns */}
        <div className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
          <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
            Active Campaigns
          </div>
          <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
            {data.activeCampaigns}
          </div>
          <div className="text-[16px]">
            {data.message || "No active campaigns"}
          </div>
        </div>

        {/* Box 2: Total Redemptions */}
        <div className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
          <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
            Total Redemptions
          </div>
          <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
            {data.redemptionsTotal}
          </div>
          <div className="text-[16px]">
            {data.redemptionsToday > 0 ? `+${data.redemptionsToday} today` : "No redemptions"}
          </div>
        </div>

        {/* Box 3: Campaign Spent */}
        <div className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
          <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
            Campaign Spent
          </div>
          <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
            {`$${data.clipsIssuedTotal}`} {/* You can modify this to reflect actual campaign spending if needed */}
          </div>
          <div className="text-[16px]">
            {data.clipsIssuedTotal > 0 ? `+${data.clipsIssuedTotal} clips issued` : "No clips issued"}
          </div>
        </div>

        {/* Box 4: Conversion Rate */}
        <div className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
          <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
            Conversion Rate
          </div>
          <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
            {data.conversionRate}%
          </div>
          <div className="text-[16px]">
            {data.conversionRate > 0 ? `+${data.conversionRate}% this month` : "No conversion rate data"}
          </div>
        </div>

        {/* Box 5: Reviews Collected */}
        <div className="bg-white shadow rounded-2xl md:p-2 md:px-4 p-4 lg:p-6 border border-[#B9DAFE]">
          <div className="md:text-[18px] text-[20px] text-[#333333] w-40">
            Reviews Collected
          </div>
          <div className="text-[25px] lg:text-[32px] font-bold text-[#3E3EDF]">
            {data.reviewsCollected}
          </div>
          <div className="text-[16px]">
            {data.reviewsCollected > 0 ? `+${data.reviewsCollected} reviews collected` : "No reviews collected"}
          </div>
        </div>

      </div>

      <DActive />
      <DRecent />
    </div>
  );
}

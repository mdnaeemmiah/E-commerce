'use client';

import React, { useState, useEffect } from 'react';
import Fashion from './Fashion';
import Restaurant from './Restaurant';
import OrganicFood from './OrganicFood';
import Essentials from './Essentials';

export default function SettingsTabs() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState<'Fashion' | 'Restaurant' | 'Organic' | 'Essentials'>('Fashion');
  const [isClient, setIsClient] = useState(false);  // Client-side check to handle localStorage only on the client

  useEffect(() => {
    setIsClient(true);  // Set isClient to true when mounted on the client side

    // Get the active tab from localStorage when the component mounts
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab as 'Fashion' | 'Restaurant' | 'Organic' | 'Essentials');
    }
  }, []);

  // Store the active tab in localStorage whenever it changes
  useEffect(() => {
    if (isClient && activeTab) {
      localStorage.setItem('activeTab', activeTab);
    }
  }, [activeTab, isClient]);

  if (!isClient) {
    return null;  // Return null or a loading spinner until the component is mounted on the client side
  }

  return (
    <div className=" ">
      {/* Responsive Tab Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shadow-2xl p-3 rounded-2xl md:w-1/2">
        <button
          onClick={() => setActiveTab('Fashion')}
          className={`py-2 rounded w-full text-center cursor-pointer ${
            activeTab === 'Fashion' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
          }`}
        >
          Fashion
        </button>

        <button
          onClick={() => setActiveTab('Restaurant')}
          className={`py-2 rounded w-full text-center cursor-pointer ${
            activeTab === 'Restaurant' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
          }`}
        >
          Restaurant
        </button>

        <button
          onClick={() => setActiveTab('Organic')}
          className={`py-2 rounded w-full text-center cursor-pointer ${
            activeTab === 'Organic' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
          }`}
        >
          Organic food
        </button>

        <button
          onClick={() => setActiveTab('Essentials')}
          className={`py-2 rounded w-full text-center cursor-pointer ${
            activeTab === 'Essentials' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
          }`}
        >
          Essentials
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === 'Fashion' && <Fashion />}
        {activeTab === 'Restaurant' && <Restaurant />}
        {activeTab === 'Organic' && <OrganicFood />}
        {activeTab === 'Essentials' && <Essentials />}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Fashion from './Fashion';
import Food from './Food';
import Electronics from './Electronics';
import All from './All';

export default function SettingsTabs() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState<'Fashion' | 'Food' | 'All' | 'Electronics'>('Fashion');
  const [isClient, setIsClient] = useState(false);  // Client-side check to handle localStorage only on the client

  useEffect(() => {
    setIsClient(true);  // Set isClient to true when mounted on the client side

    // Get the active tab from localStorage when the component mounts
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab as 'Fashion' | 'Food' | 'All' | 'Electronics');
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
      <h2 className='text-2xl mb-4 font-semibold'>Your Rewards</h2>
      {/* Responsive Tab Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 shadow-sm p-3 rounded-2xl md:w-1/2">

        <button
          onClick={() => setActiveTab('All')}
          className={`py-2 rounded w-full text-center cursor-pointer ${activeTab === 'All' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
            }`}
        >
          All
        </button>

        <button
          onClick={() => setActiveTab('Fashion')}
          className={`py-2 rounded w-full text-center cursor-pointer ${activeTab === 'Fashion' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
            }`}
        >
          Fashion
        </button>

        <button
          onClick={() => setActiveTab('Food')}
          className={`py-2 rounded w-full text-center cursor-pointer ${activeTab === 'Food' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
            }`}
        >
          Food
        </button>



        <button
          onClick={() => setActiveTab('Electronics')}
          className={`py-2 rounded w-full text-center cursor-pointer ${activeTab === 'Electronics' ? 'bg-[#3E3EDF] text-white' : 'bg-[#FFF6FA] text-gray-700'
            }`}
        >
          Electronics
        </button>
      </div>

      {/* Tab Content */}
      <div className="">
        {activeTab === 'Fashion' && <Fashion />}
        {activeTab === 'Food' && <Food />}
        {activeTab === 'All' && <All />}
        {activeTab === 'Electronics' && <Electronics />}
      </div>
    </div>
  );
}

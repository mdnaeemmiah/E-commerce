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
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rewards</h2>
      {/* Pill tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(['All', 'Fashion', 'Food', 'Electronics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              activeTab === tab
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
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

"use client";
import { FiTrendingUp, FiMapPin, FiClock } from "react-icons/fi";
import { ReactNode } from "react";

export default function Analytics() {
  return (
    <div className=" bg-gray-50 border border-gray-300 rounded-lg p-4">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6">Campaign Performance</h2>

      {/* Campaign Cards Container */}
      <div className="space-y-4">

        {/* Single Campaign */}
        <div className="bg-white p-6  shadow-sm border border-gray-300 rounded-xl ">
          <h3 className="font-semibold text-lg mb-4">Winter Sale - 20% Off</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <StatItem label="Impressions" value="1,247" />
            <StatItem label="Clicks" value="456" />
            <StatItem label="Conversions" value="456" />
            <StatItem label="CVR" value="36.6%" />
          </div>
          <p className="mt-4 font-semibold text-green-600">ROI: 340%</p>
        </div>

        {/* 2nd campaign */}
        <div className="bg-white p-6  shadow-sm border border-gray-300 rounded-xl ">
          <h3 className="font-semibold text-lg mb-4">BOGO Coffee Promotion</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <StatItem label="Impressions" value="2,564" />
            <StatItem label="Clicks" value="555" />
            <StatItem label="Conversions" value="852" />
            <StatItem label="CVR" value="56.8%" />
          </div>
          <p className="mt-4 font-semibold text-green-600">ROI: 280%</p>
        </div>

        {/* 3rd campaign */}
        <div className="bg-white p-6  shadow-sm border border-gray-300 rounded-xl ">
          <h3 className="font-semibold text-lg mb-4">New Customer $10 Off</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <StatItem label="Impressions" value="15,247" />
            <StatItem label="Clicks" value="321" />
            <StatItem label="Conversions" value="753" />
            <StatItem label="CVR" value="56.5%" />
          </div>
          <p className="mt-4 font-semibold text-green-600">ROI: 420%</p>
        </div>
      </div>

      {/* Bottom Section (Grid) */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* Top Performing Locations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300  ">
          <div className="flex items-center gap-2 mb-4">
            <FiMapPin className="text-blue-600 text-xl" />
            <h3 className="text-lg font-semibold">Top Performing Locations</h3>
          </div>

          <LocationItem place="Downtown Seattle" value="$3,420" red="234" />
          <LocationItem place="Bellevue Square" value="$5,556" red="189" />
          <LocationItem place="Capitol Hill" value="$3,520" red="500" />
          <LocationItem place="Fremont" value="$3,820" red="123" />
        </div>

        {/* Peak Performing Times */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
          <div className="flex items-center gap-2 mb-4">
            <FiClock className="text-purple-600 text-xl" />
            <h3 className="text-lg font-semibold">Peak Performing Times</h3>
          </div>

          <TimeItem period="Weekends" sub="Saturday & Sunday" value="45% higher" />
          <TimeItem period="Lunch Hours" sub="11 AM - 2 PM" value="32% higher" />
          <TimeItem period="Evening Rush" sub="5 PM - 7 PM" value="28% higher" />
          <TimeItem period="Morning Coffee" sub="7 AM - 9 AM" value="22% higher" />
        </div>
      </div>
    </div>
  );
}
/* --- Reusable Components --- */

type StatItemProps = {
  label: string;
  value: ReactNode;
};

const StatItem = ({ label, value }: StatItemProps) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

type LocationItemProps = {
  place: string;
  value: string;
  red: number | string;
};

const LocationItem = ({ place, value, red }: LocationItemProps) => (
  <div className="flex justify-between py-2  last:border-none">
    <div>
      <p className="font-medium">{place}</p>
      <p className="text-sm text-gray-500">{red} redemptions</p>
    </div>
    <p className="font-semibold text-green-600">{value}</p>
  </div>
);

type TimeItemProps = {
  period: string;
  sub: string;
  value: string;
};

const TimeItem = ({ period, sub, value }: TimeItemProps) => (
  <div className="flex justify-between py-3  last:border-none">
    <div>
      <p className="font-medium">{period}</p>
      <p className="text-sm text-gray-500">{sub}</p>
    </div>
    <p className="text-blue-600 font-semibold">{value}</p>
  </div>
);


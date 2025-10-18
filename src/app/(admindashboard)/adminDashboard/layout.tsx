"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation"; // ✅ import usePathname
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaCog,
  FaHome,
  FaStore,
  FaGift,
} from "react-icons/fa";
import img1 from "@/app/assets/Group (1).png";
import img2 from "@/app/assets/Ellipse 87.png";
import img11 from "@/app/assets/Icon copy.png"
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ✅ current route

  // ✅ Menu items list
  const menuItems = [
    { href: "/vendorDashboard/dashboardOverview", label: "Dashboard Overview", icon: <FaHome /> },
    { href: "/vendorDashboard/userManagement", label: "User Management", icon: <FaUserCircle /> },
    { href: "/vendorDashboard/reward&campaign", label: "Reward & Campaign", icon: <FaGift /> },
    { href: "/vendorDashboard/userRedeemHistory", label: "User Redeem History", icon: <FaStore /> },
    { href: "/vendorDashboard/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside
        className={`fixed  rounded-2xl top-0 min-h-screen left-0 w-72 lg:w-80  bg-[#319EE1] text-white flex flex-col justify-between p-4 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between md:hidden mb-6 ">
            <div className="flex items-center space-x-2">
              <Image src={img1} alt="Logo" width={40} height={40} className="opacity-100" />
              <h1 className="font-bold text-lg">TrekBot.AI</h1>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={24} className="text-red-500 hover:scale-105" />
            </button>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center space-x-2 mb-20   gap-4">
            <Image src={img1} alt="Logo" width={50} height={45} className="opacity-100" />
            <h1 className="font-bold text-[20px]">TrekBot.AI</h1>
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 py-4 px-3 rounded-xl transition-colors duration-200
                    ${isActive
                      ? "bg-white text-[#319EE1] font-medium"
                      : "hover:bg-white hover:text-[#319EE1]"
                    }`}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile + Logout */}
        <div className="mt-6 p-4">
          <div className="flex items-center space-x-3">
            <Image
              src={img2}
              alt="User"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h2 className="font-semibold">Willy Smith</h2>
            </div>
          </div>
          <button className="mt-8 w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-200 justify-center ">
            <Link href="/" className="flex justify-center gap-4">
              <Image
                src={img11}
                alt="Description of the image"
                width={24}
                height={24}
              />
              <p className="text-xl text-[#319EE1]">Log out</p>
            </Link>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 w-full">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md border border-gray-300 bg-white"
          >
            <FaBars size={22} />
          </button>
          <h1 className="font-bold text-lg">TrekBot.AI</h1>
        </div>
        <div className="mt-2 overflow-y-scroll md:ml-72 lg:ml-82">
           <Toaster position="top-center" reverseOrder={false} />
          {children}
        </div>
      </main>
    </div>
  );
}

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
import img1 from "@/app/assets/auth/image3.png";
import img2 from "@/app/assets/auth/image3.png";
import img11 from "@/app/assets/auth/image3.png"
import { Toaster } from "react-hot-toast";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
  const pathname = usePathname();

  // ✅ Menu items list
  const menuItems = [
    { href: "/adminDashboard/dashboard", label: "Dashboard", icon: <FaHome /> },
    { href: "/adminDashboard/earnings", label: "Earnings", icon: <FaUserCircle /> },
    { href: "/adminDashboard/users", label: "Users", icon: <FaGift /> },
    { href: "/adminDashboard/brand", label: "Brand", icon: <FaStore /> },
    { href: "/adminDashboard/withdrawRequest", label: "Withdraw Request", icon: <FaCog /> },
    { href: "/adminDashboard/settings", label: "Settings", icon: <FaGift /> },
    { href: "/adminDashboard/support", label: "Support", icon: <FaGift /> },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <aside
        className={`fixed  rounded-2xl top-0 min-h-screen left-0 w-72 lg:w-80  bg-white text-[#3E3EDF] flex flex-col justify-between p-4 z-50 transform transition-transform duration-300
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
                      ? "bg-[#3E3EDF] text-white font-medium"
                      : "hover:bg-[#3E3EDF] hover:text-white"
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
       {/* ✅ Topbar (mobile + desktop) */}
        <div className="h-20 border-b border-[#B1B1B1] md:ml-72 lg:ml-80 bg-white px-4 flex items-center justify-between">
          {/* Left section: Hamburger + Profile */}
          <div className="flex items-center gap-4">
            {/* Hamburger menu (mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="block md:hidden p-2 rounded-md border border-gray-300 bg-white"
            >
              <FaBars size={22} />
            </button>
          </div>

          <div className="h-20 border-b border-[#B1B1B1] bg-white px-4 flex items-center justify-between gap-5">
            {/* ✅ Left: Profile section */}
            <div className="flex items-center gap-3 border border-[#B1B1B1] px-3 py-1 md:py-2 rounded-xl cursor-pointer hover:shadow-sm">
              <Image
                src={img2}
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full object-cover w-8 "
              />
              <div className="text-sm leading-tight ">
                <div className="font-medium text-black">Olivia Rhye</div>
                <div className="text-gray-500 text-xs">olivia@untitledui.com</div>
              </div>
              {/* <Image
                src={img3}
                alt="Dropdown Arrow"
                width={16}
                height={16}
                className=""
              /> */}
            </div>

            {/* ✅ Right: Notification + Settings */}
            <div className="flex items-center gap-4 ">
              <div className="relative z-50" >
                {/* 🔔 Bell Icon */}
                <IoNotificationsOutline
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent bubbling
                    setIsNotifOpen((prev) => !prev); // Toggle independently
                  }}
                  className="text-gray-600 hover:text-black cursor-pointer"
                  size={28}
                />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>

                {/* ✅ Notification Modal */}
                {isNotifOpen && (
                  <>
                    {/* Background Overlay */}
                    <div
                      className="fixed inset-0 bg-black opacity-50 z-[99]"
                      onClick={() => setIsNotifOpen(false)}
                    ></div>

                    {/* Popup Box */}
                    <div
                      className="fixed top-20 right-8 md:right-20 w-80 md:w-96  bg-white rounded-xl shadow-xl z-[100] p-4"
                      onClick={(e) => e.stopPropagation()} // Prevent closing on internal click
                    >
                      <h4 className="text-md font-semibold mb-4 text-[#E8632C]">Notifications</h4>

                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div key={n.id} className="flex items-start gap-3 p-2">
                              <div className="w-9 h-9 rounded-full overflow-hidden">
                                <Image
                                  src={n.avatar}
                                  alt={n.name}
                                  width={36}
                                  height={36}
                                  className="object-cover w-full h-full rounded-full"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700 leading-snug">
                                  <span className="font-semibold">{n.name}</span> {n.message}
                                </p>
                              </div>
                              <span className="text-xs text-gray-400">{n.time}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No new notifications.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Link href="/adminDashboard/settings">
                <IoSettingsOutline className="text-gray-600 hover:text-black cursor-pointer " size={24} />
              </Link>
            </div>
          </div>

        </div>
        <div className="mt-2 overflow-y-scroll md:ml-72 lg:ml-82">
           <Toaster position="top-center" reverseOrder={false} />
          {children}
        </div>
      </main>
    </div>
  );
}

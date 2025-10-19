"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";
import img1 from "@/app/assets/auth/Ellipse 2.png"; // profile
import img2 from "@/app/assets/auth/image_3-removebg-preview.png"; // logo
import { IoNotificationsOutline } from "react-icons/io5";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const pathname = usePathname();



    const notifications = [
        { id: 1, name: 'Helena', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
        { id: 2, name: 'Oscar', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
        { id: 3, name: 'Daniel', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
    ];


    const links = [
        { name: "Offer", path: "/offer" },
        { name: "Wallet", path: "/wallet" },
        { name: "Scan", path: "/scan" },
        { name: "Profile", path: "/profile" },
        { name: "Brand", path: "/brand" },
    ];

    return (
        <div className="">
            <nav className="flex justify-between items-center px-4 md:px-12 lg:px-40 py-4 bg-white shadow-sm relative">
                {/* Left - Logo */}
                <div className="flex items-center space-x-2">
                    <Image src={img2} alt="Logo" width={120} height={60} />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-10 text-gray-700 font-medium">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`px-3 py-1 rounded-md transition-colors duration-200 ${pathname === link.path
                                        ? "bg-[#3E3EDF] text-white" // ✅ active link background
                                        : "hover:text-[#3E3EDF]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right: Notification + Settings */}
                    <div className="flex items-center gap-4">
                        <div className="relative z-50">
                            {/* Bell Icon */}
                            <IoNotificationsOutline
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen((prev) => !prev);
                                }}
                                className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                                size={28}
                            />
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>

                            {/* Notification Modal */}
                            {isNotifOpen && (
                                <>
                                    <div className="fixed inset-0 bg-black opacity-50 z-[99]" onClick={() => setIsNotifOpen(false)}></div>
                                    <div className="fixed top-20 right-8 md:right-20 w-80 md:w-96 bg-white rounded-xl shadow-xl z-[100] p-4" onClick={(e) => e.stopPropagation()}>
                                        <h4 className="text-md font-semibold mb-4 text-[#E8632C]">Notifications</h4>
                                        <div className="space-y-3 max-h-60 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <div key={n.id} className="flex items-start gap-3 p-2">
                                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                                            <Image src={n.avatar} alt={n.name} width={36} height={36} className="object-cover w-full h-full rounded-full" />
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
                        <div className="flex gap-2">
                            <Image src={img1} alt="Dropdown Arrow" width={40} height={40} className="cursor-pointer" />
                        </div>
                    </div>
                </div>


                {/* Small Device Right Side */}
                <div className="flex md:hidden items-center space-x-4">
                    <div className="flex items-center gap-4">
                        <div className="relative z-50">
                            {/* Bell Icon */}
                            <IoNotificationsOutline
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen((prev) => !prev);
                                }}
                                className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                                size={28}
                            />
                            <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] rounded-full px-1">
                                2
                            </span>

                            {/* Notification Modal */}
                            {isNotifOpen && (
                                <>
                                    <div className="fixed inset-0 bg-black opacity-50 z-[99]" onClick={() => setIsNotifOpen(false)}></div>
                                    <div className="fixed top-20 right-8 md:right-20 w-80 md:w-96 bg-white rounded-xl shadow-xl z-[100] p-4" onClick={(e) => e.stopPropagation()}>
                                        <h4 className="text-md font-semibold mb-4 text-[#E8632C]">Notifications</h4>
                                        <div className="space-y-3 max-h-60 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <div key={n.id} className="flex items-start gap-3 p-2">
                                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                                            <Image src={n.avatar} alt={n.name} width={36} height={36} className="object-cover w-full h-full rounded-full" />
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
                    </div>

                    <Image
                        src={img1}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />

                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        {menuOpen ? (
                            <HiX className="text-2xl text-gray-700" />
                        ) : (
                            <HiMenuAlt3 className="text-2xl text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">
                        <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className={`block px-4 py-2 rounded-md transition-colors duration-200 ${pathname === link.path
                                            ? "bg-[#3E3EDF] text-white"
                                            : "hover:text-[#3E3EDF]"
                                            }`}
                                        onClick={() => setMenuOpen(false)} // closes after click
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {  useState } from "react";
import img1 from "@/app/assets/auth/Ellipse 2.png"; // profile
import img2 from "@/app/assets/auth/logo.png"; // logo
import { IoNotificationsOutline, IoSearchSharp, IoWalletOutline } from "react-icons/io5";
import ViewWallet from "../home/offer/ViewWallet";
import Search from "../home/offer/Search";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // state to toggle search input visibility
    const [isWalletVisible, setIsWalletVisible] = useState(false); // state to toggle wallet visibility

    const pathname = usePathname();


    const links = [
        { name: "Offer", path: "/offer" },
        { name: "Wallet", path: "/wallet" },
        { name: "Scan", path: "/scan" },
        { name: "Profile", path: "/profile" },
        // { name: "Brand", path: "/brand" },
    ];

    const toggleSearch = () => setIsSearchVisible(!isSearchVisible); // toggle search visibility
    const toggleWallet = () => setIsWalletVisible(!isWalletVisible); // toggle wallet visibility

    return (
        <div className="pt-[80px]"> {/* Prevents content overlap with fixed navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 lg:px-40 py-4 bg-white shadow-sm">
                {/* Left - Logo */}
                <Link href='/offer'>
                    <div className="flex items-center space-x-2 cursor-pointer">
                        <Image src={img2} alt="Logo" width={120} height={60} />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <ul className="flex space-x-10 text-gray-700 font-medium">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={`px-3 py-2 rounded-md transition-colors duration-200 ${pathname === link.path
                                        ? "bg-[#3E3EDF] text-white"
                                        : "hover:text-white hover:bg-[#3E3EDF]"}`
                                    }
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Search Icon */}
                    <div className="relative z-50">
                        <IoSearchSharp
                            className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                            onClick={toggleSearch} // toggle search input visibility on click
                        />
                    </div>

                    {/* Wallet Icon */}
                    <div className="relative z-50">
                        <IoWalletOutline
                            className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                            onClick={toggleWallet} // toggle wallet visibility on click
                        />
                    </div>

                    {/* Right: Notification + Profile */}
                    <div className="flex items-center gap-4">
                        <Link href='/profile/notifications'>
                            <div className="relative z-50">
                                <IoNotificationsOutline
                                    className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                                />
                                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] rounded-full px-1">
                                    2
                                </span>
                            </div>
                        </Link>
                        <div className="flex gap-2">
                            <Image src={img1} alt="Profile" width={40} height={40} className="cursor-pointer rounded-full" />
                        </div>
                    </div>

                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center space-x-4">

                    {/* Search Icon */}
                    <div className="relative z-50">
                        <IoSearchSharp
                            className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                            onClick={toggleSearch} // toggle search input visibility on click
                        />
                    </div>

                    {/* Wallet Icon */}
                    <div className="relative z-50">
                        <IoWalletOutline
                            className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                            onClick={toggleWallet} // toggle wallet visibility on click
                        />
                    </div>
                    <Link href='/profile/notifications'>
                        <div className="relative z-50">
                            <IoNotificationsOutline
                                className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                            />
                            <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] rounded-full px-1">
                                2
                            </span>
                        </div>
                    </Link>

                    {/* <Image
                        src={img1}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    /> */}

                    <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                        {menuOpen ? (
                            <HiX className="text-2xl text-gray-700" />
                        ) : (
                            <HiMenuAlt3 className="text-2xl text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute top-16 right-0 w-[50%] rounded-2xl bg-white shadow-md md:hidden z-50">
                        <ul className="flex flex-col items-center space-y-4 py-6 text-gray-700 font-medium">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className={`block px-4 py-2 rounded-md transition-colors duration-200 ${pathname === link.path
                                            ? "bg-[#3E3EDF] text-white"
                                            : "hover:text-white hover:bg-[#3E3EDF]"}`
                                        }
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* Search Input Field below Navbar */}
            {isSearchVisible && (
                <Search></Search>
            )}

            {/* Wallet Display Below Navbar */}
            {isWalletVisible && (
                <ViewWallet></ViewWallet>
            )}

            {/* Main Content Below */}
            <div className={`transition-all ${isSearchVisible || isWalletVisible ? 'mt-0' : 'mt-2'}`}></div>
        </div>
    );
}

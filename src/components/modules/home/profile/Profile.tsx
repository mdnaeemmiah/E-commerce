"use client";

import Image from "next/image";
import { FaUserEdit, FaBookmark, FaBell, FaSignOutAlt, FaTrashAlt, FaHeadset } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPolicy } from "react-icons/md";
import img1 from "@/app/assets/auth/Ellipse 2.png";
import { JSX, useState } from "react";
import Link from "next/link";

export default function Profile() {
    const [enabled, setEnabled] = useState(true);
    return (
        <div className=" md:w-[90%]  lg:w-[50%] mx-auto py-6 mt-4 md:mt-10">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-6">
                <Image src={img1} alt="Profile" width={80} height={80} className="rounded-full" />
                <h2 className="text-lg text-[#575757] font-semibold mt-2">Tamim Sarker</h2>
                <p className="text-sm text-gray-500">Tamim257@gmail.com</p>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <p className="text-[#575757] mb-2">Account Information</p>
                <Link href='/profile/editProfile'>
                    <ProfileItem icon={<FaUserEdit />} label="Edit Profile" />
                </Link>
                <Link href='/profile/savedOffer'>
                    <ProfileItem icon={<FaBookmark />} label="Saved" />
                </Link>
            </div>

            {/* Policy Center */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <p className="text-[#575757] mb-2">Policy Center</p>
                <Link href='/profile/Privacy'>
                    <ProfileItem icon={<MdPolicy />} label="Privacy Policy" />
                </Link>
                <Link href='/profile/term'>
                    <ProfileItem icon={<RiLockPasswordLine />} label="Terms & Condition" />
                </Link>

            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow p-4">
                <p className="text-[#575757]  mb-2">Settings</p>
                <div className="flex items-center justify-between py-3 cursor-pointer">
                    <Link href='/profile/notifications'>
                        <div className="flex  items-center gap-3 text-gray-700  ">
                            <FaBell />
                            <span>Notification</span>
                        </div>
                    </Link>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={enabled}
                            onChange={() => setEnabled(!enabled)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
                        <div
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-0"
                                }`}
                        ></div>
                    </label>
                </div>
                <Link href='/profile/helpSupport'><ProfileItem icon={<FaHeadset />} label="Help & Support" /></Link>
                <ProfileItem icon={<FaSignOutAlt />} label="Log Out" />
                <ProfileItem icon={<FaTrashAlt />} label="Delete Account" textColor="text-red-500" />
            </div>
        </div>
    );
}

// Reusable Profile Item Component
const ProfileItem = ({
    icon,
    label,
    textColor = "text-gray-700"
}: {
    icon: JSX.Element;
    label: string;
    textColor?: string;
}) => {
    return (
        <div className={`flex items-center justify-between py-3 hover:bg-gray-200  rounded-xl px-2   cursor-pointer ${textColor}`}>
            <div className="flex items-center gap-3 text-[#575757] ">
                {icon}
                <span>{label}</span>
            </div>
            <IoIosArrowForward className="text-gray-600" />
        </div>
    );
};

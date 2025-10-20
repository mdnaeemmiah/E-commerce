"use client";

import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img1 from "@/app/assets/auth/Ellipse 2.png";
import { FaCamera } from "react-icons/fa";

export default function EditProfile() {
    const [fullName, setFullName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow md:mt-40">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-left">Edit Profile</h2>

            {/* Profile Image */}
            <div className="flex justify-center mb-6 relative cursor-pointer">
                <Image
                    src={img1}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-[42%] bg-white rounded-full p-1 border shadow">
                    <FaCamera className="h-4 w-4 text-gray-700" />
                </div>
            </div>

            {/* Full Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* New Password */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="********"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4  py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div
                        className="absolute top-3 right-3 cursor-pointer text-gray-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2  border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div
                        className="absolute  top-3 right-3 cursor-pointer text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                className="w-full bg-indigo-600 text-white py-3 cursor-pointer rounded-md hover:bg-indigo-700 transition"
                onClick={() => {
                    // Handle Save
                    console.log("Saved:", { fullName, newPassword, confirmPassword });
                }}
            >
                Save & Change
            </button>
        </div>
    );
}

"use client";

import { FaStar, FaCamera } from "react-icons/fa";
import img1 from "@/app/assets/auth/image 3 (1).png"
import Image from "next/image";
import Link from "next/link";
import { FaSackDollar } from "react-icons/fa6";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full md:w-[60%] lg:w-[40%] text-center">
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <Image
                        src={img1}
                        alt="logo"
                        width={300}
                        height={200}
                    ></Image>
                </div>
                <p className="text-gray-500 mb-2 text-[20px] font-medium">Welcome to NIBBL.AI</p>

                <p className="text-[#575757] text-sm mb-8">
                    Discover instant rebates and rewards — no account needed.
                </p>

                {/* Features Section */}
                <div className="space-y-6 text-left">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4">
                        <div className="text-yellow-500 mt-2 md:mt-3">
                            <FaSackDollar className="text-3xl  md:text-5xl" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[24px] text-gray-800">Claim Instant Rebates</h3>
                            <p className="text-gray-500 text-[18px]">
                                Scan any participating product in-store to see if there’s a reward available.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4 mt-2 md:mt-3">
                        <div className="text-yellow-400 text-3xl  md:text-5xl">
                            <FaStar />
                        </div>
                        <div>
                            <h3 className="font-semibold text-[24px] text-gray-800">Earn A Bonus Review</h3>
                            <p className="text-gray-500  text-[18px]">
                                Upload your receipt and share feedback to earn extra cash.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4 mt-2 md:mt-3">
                        <div className="text-purple-500 text-3xl  md:text-5xl">
                            <FaCamera />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-[24px]">
                                No Account? You Can Still Earn
                            </h3>
                            <p className="text-gray-500 text-[18px]">
                                We’ll save your rewards — you can link PayPal or Venmo when you’re ready to cash out.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    <Link href='/scan'>
                        <button className="bg-[#4A3AFF] cursor-pointer text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#372bcc] transition">
                            Start Earning
                        </button>
                    </Link>
                    <Link href='/scan'>
                        <button className="border cursor-pointer border-[#4A3AFF] text-[#4A3AFF] font-semibold py-3 px-5 rounded-xl hover:bg-[#f3f1ff] transition">
                            Upload from Photos
                        </button>
                    </Link>
                </div>

                {/* Footer Links */}
                <div className="mt-6">
                    <p className="text-[#4A3AFF] text-[18px] font-medium ">
                        Browse Offers Nearby
                    </p>
                    <p className="text-gray-400 text-[16px] ">
                        Secure payouts via PayPal or Venmo once your rewards are verified.
                    </p>
                </div>

                {/* Sign Up */}
                <p className="text-gray-400 text-[16px] mt-8">
                    Created an account?{" "}
                    <Link href="/auth/register" className="text-[#4A3AFF] font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

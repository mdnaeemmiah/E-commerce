"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import img1 from "@/app/assets/auth/logo.png";

const ChangePass: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen mt-5 md:mt-0 px-2 md:px-4  pb-30">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-lg md:pb-15">
                <div className="flex  justify-center">
                    <Image
                        src={img1}
                        alt="Logo"
                        className="mb-6"
                        width={150}
                        height={150}
                    />
                </div>

                <h2 className="flex items-center text-2xl font-semibold  text-gray-700 mb-4 ">
                    <Link href='/adminDashboard/settings'><IoMdArrowBack className="mr-2" /></Link> Change Password
                </h2>
                <p className=" text-[16px] md:text-[20px] text-[#575757] mb-6">Your password must be 8-10 character long.</p>


                <form>
                    {/* Enter old password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700"
                        >
                            Enter old password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter old password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-5 text-gray-600 text-[20px]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Set new password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700"
                        >
                            Set new password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Set new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-5 text-gray-600 text-[20px]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700"
                        >
                            Re-enter new password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Re-enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-5 text-gray-600 text-[20px]"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Remember me / Forgot password */}
                    {/* <div className="flex items-center justify-between mb-6">
                        <Link
                            href="/auth/forgetPassword"
                            className="text-md text-indigo-600 hover:text-indigo-800"
                        >
                            Forgot password?
                        </Link>
                    </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-4 mt-2 md:mt-10  bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
                    >
                        Update password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePass;

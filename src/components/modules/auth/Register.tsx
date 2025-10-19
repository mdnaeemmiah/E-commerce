
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import img2 from "@/app/assets/auth/Google.png";
import Link from "next/link";

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen  px-4">
            <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-lg md:pb-15">
                <h2 className="text-[24px] md:text-[44px] font-semibold text-center text-gray-700 mb-2">
                    Sign In
                </h2>
                <p className="text-center text-[16px] md:text-[24px] text-[#575757] mb-4">It only takes a minute to create your
                    account</p>
                <form>
                    {/* Username */}
                    <div className="mb-4">
                        <label
                            htmlFor="fullname"
                            className="block text-md font-medium text-gray-700"
                        >
                            Full name
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullnaem"
                            className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter full name"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-md font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter password"
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
                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center text-md text-gray-700">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <Link
                            href="/auth/forgetPassword"
                            className="text-md text-indigo-600 hover:text-indigo-800"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-4  bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex items-center mt-5">
                    <div className="h-[1px] w-full bg-gray-300"></div>
                    <p className="mx-4 text-[#575757]">or</p>
                    <div className="h-[1px] w-full bg-gray-300"></div>
                </div>

                {/* Google & Apple Login */}
                <div className="space-y-4 mt-3 md:mt-5">
                    <button
                        className="flex text-black p-3 md:p-4 w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]"
                    >
                        <Image src={img2} alt="Icon" width={30} height={30} />
                        <span className="text-[16px] sm:text-base md:text-[18px] ">Continue with Google</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Register;

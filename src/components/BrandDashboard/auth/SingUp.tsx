
"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import img1 from "@/app/assets/auth/logo.png";
import Link from "next/link";
import img3 from "@/app/assets/auth/Frame 427319652.png";
import img2 from "@/app/assets/auth/Google.png";

const SingUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
            <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-lg md:pb-15">
                <Image
                    src={img1}
                    alt="Logo"
                    className="mb-6 mx-auto"
                    width={150}
                    height={150}
                />
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Sign In
                </h2>

                <form>
                    {/* full name */}
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-md font-medium text-gray-700"
                        >
                            Full name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter full name"
                        />
                    </div>

                    {/* Phone number */}
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-md font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter phone number"
                        />
                    </div>
                    {/* email */}
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
                    
                    {/* location */}
                    <div className="mb-4">
                        <label
                            htmlFor="location"
                            className="block text-md font-medium text-gray-700"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter location"
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
                            href="/adminAuth/forgetPassword"
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
                    <button
                        className="flex text-black p-3  w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]"
                    >
                        <Image src={img3} alt="Icon" width={35} height={30} />
                        <span className="text-[16px] sm:text-base md:text-[18px] ">Continue with Apple</span>
                    </button>
                </div>
                {/* Login Link */}
                <div className="mt-4 text-center">
                    <h1 className="text-[#828282]">You have an account ?<span className="font-semibold text-[#3E3EDF] cursor-pointer"> <Link href='/brandAuth/login'>Sign In</Link> </span></h1>
                </div>
            </div>
        </div>
    );
};

export default SingUp;

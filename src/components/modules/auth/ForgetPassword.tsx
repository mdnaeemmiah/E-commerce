"use client";

import Image from "next/image";
import img1 from "@/app/assets/auth/image3.png";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

const ForgetPassword: React.FC = () => {


    return (
        <div className="flex justify-center items-center min-h-screen  px-4">
            <div className="bg-white  p-6 rounded-lg shadow-md w-full max-w-lg md:pb-15">

                <div className="pt-10">
                    <h2 className="flex items-center text-2xl font-semibold text-center text-gray-700 mb-4 justify-center">
                        <IoMdArrowBack className="mr-2" /> Forgot Password
                    </h2>
                    <p className="text-center mb-10 text-[#575757]">Please enter your email address to reset
                        your password.</p>
                </div>

                <form>
                    {/* Username */}
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

                    {/* Submit */}
                    <Link href="/auth/otp">
                        <button
                            type="submit"
                            className="w-full cursor-pointer mt-6 py-4  bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
                        >
                            Send OTP
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;

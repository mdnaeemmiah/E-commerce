"use client";


import { IoMdArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const ResetPassword: React.FC = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen px-4 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <div className="pt-10">
                    <h2 className="flex items-center text-2xl font-semibold text-center text-gray-700 mb-4 justify-center">
                        <IoMdArrowBack className="mr-2 text-[#3E3EDF]" /> Reset Password
                    </h2>
                    <p className="text-center mb-10 text-[#575757]">
                        Your password must be 8–10 characters long.
                    </p>
                </div>

                <form>
                    <div className="space-y-6">
                        {/* Set Password */}
                        <div>
                            <label
                                htmlFor="password1"
                                className="block text-md font-medium text-gray-700"
                            >
                                Set Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword1 ? "text" : "password"}
                                    id="password1"
                                    name="password1"
                                    className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword1(!showPassword1)}
                                    className="absolute right-3 top-5 text-gray-600 text-[20px]"
                                >
                                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Re-enter Password */}
                        <div>
                            <label
                                htmlFor="password2"
                                className="block text-md font-medium text-gray-700"
                            >
                                Re-enter Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    id="password2"
                                    name="password2"
                                    className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Re-enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword2(!showPassword2)}
                                    className="absolute right-3 top-5 text-gray-600 text-[20px]"
                                >
                                    {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pb-8">
                            <button
                                type="submit"
                                className="w-full py-4 mt-2 bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all duration-300"
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

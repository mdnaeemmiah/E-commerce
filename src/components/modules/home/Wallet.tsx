"use client";

import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';


export default function Wallet() {
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10">
            {/* Wallet Header */}
            <div className="bg-[#3E3EDF] md:px-16 text-white w-[90%] md:max-w-4xl lg:max-w-5xl rounded-2xl p-6 shadow-lg md:h-60 lg:h-80 ">
                <div className="flex items-center space-x-2 mb-2 md:mt-10 lg:mt-20">
                    <FaWallet className="text-2xl" />
                    <h2 className="text-2xl font-semibold">Wallet</h2>
                </div>
                <p className="text-3xl font-bold md:mb-6 lg:mb-12">$51.25</p>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowWithdraw(true)}
                        className="flex-1 cursor-pointer border border-white text-white duration-300 hover:bg-white hover:text-black font-semibold py-2 rounded-md shadow-sm"
                    >
                        Withdraw
                    </button>
                    <button
                        onClick={() => setShowHistory(true)}
                        className="flex cursor-pointer items-center justify-center gap-2 flex-1 border border-white py-3 rounded-md font-semibold duration-300 hover:bg-white hover:text-black"
                    >
                        <IoWalletOutline className="text-xl" /> Wallet History
                    </button>
                </div>
            </div>

            {/* Recent Rewards */}
            <div className="bg-white w-[90%] md:max-w-3xl lg:max-w-4xl mt-12 rounded-xl shadow p-5">
                <h3 className="font-semibold mb-4 text-[24px]">Recent Rewards</h3>

                <div className="shadow-xl p-4 rounded-2xl mb-4">
                    {[
                        { label: "Rebate - Lesser Evil", amount: "$1.00" },
                        { label: "Rebate - Lesser Evil", amount: "$2.00" },
                        { label: "Rebate - Lesser Evil", amount: "$5.00" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center py-3 text-gray-700 border-b border-b-gray-300"
                        >
                            <span>{item.label}</span>
                            <div className="flex items-center ">
                                <span className="font-medium mr-2">{item.amount}</span>
                                <FaCheckCircle className="text-green-500 text-xl" />
                            </div>
                        </div>
                    ))}
                </div>


                <button className="mt-3 w-full py-4 cursor-pointer border border-gray-300 rounded-md text-[18px] font-medium hover:bg-gray-100">
                    View Full History
                </button>
            </div>

            {/* PayPal Options */}
            <div className="bg-white w-[90%] md:max-w-3xl lg:max-w-4xl mt-12 rounded-xl shadow p-5 text-center">
                <h3 className="font-semibold text-[24px]">PayPal Options</h3>
                <p className="text-gray-500 text-[18px] mb-4">
                    Choose where to receive your rewards
                </p>

                <button className="w-full mt-4 cursor-pointer bg-[#3E3EDF] text-white py-4 rounded-md font-semibold mb-2">
                    Sent To PayPal
                </button>
                <button className="w-full mt-4 border cursor-pointer border-gray-300 py-4 rounded-md text-[18px] font-medium hover:bg-gray-100">
                    Link Venmo Account
                </button>
            </div>

            {/* Withdraw Modal */}
            {showWithdraw && (
                <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-80"
                        onClick={() => setShowWithdraw(false)}
                    ></div>

                    {/* Modal */}
                    <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
                        <h3 className="text-[24px] md:text-2xl  font-semibold mb-4">
                            Withdraw Funds
                        </h3>
                        <p>Withdraw $47.50 to your payout method:</p>

                        <div className="flex flex-col items-center">
                            <button className="w-[70%] mt-4 cursor-pointer bg-[#3E3EDF] text-white py-3 rounded-md font-semibold mb-2">
                                Paypal
                            </button>
                            <button className="w-[70%] mt-4 border cursor-pointer border-gray-300 py-2 rounded-md text-[18px]  hover:bg-gray-100 mb-4">
                                Venmu
                            </button>
                            <p>Payouts typically land in 24–48 hours.</p>
                            <button
                                onClick={() => setShowWithdraw(false)}
                                className=" w-[40%] mt-4 cursor-pointer border-gray-300  text-black border  py-2 rounded-md  mb-2 hover:bg-gray-100">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Wallet History Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-80"
                        onClick={() => setShowHistory(false)}
                    ></div>

                    {/* Modal */}
                    <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg">

                        <h3 className="text-[24px] md:text-2xl font-semibold mb-4">
                            Transaction Summary
                        </h3>

                        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-2xl p-3  ">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center py-3 text-gray-700 border-b border-gray-200"
                                >
                                    <div className="">
                                        <p>Rebate</p>
                                        <p className="text-[#575757]">+ $40.00</p>
                                    </div>
                                    <span className="bg-[#15983B] text-[14px] text-white rounded-xl p-1 ">Completed</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setShowWithdraw(false)}
                                className=" w-[40%] mt-4 cursor-pointer border-gray-300  text-black border  py-2 rounded-md  mb-2 hover:bg-gray-100">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

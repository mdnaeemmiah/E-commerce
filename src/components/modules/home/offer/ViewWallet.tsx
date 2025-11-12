import Link from 'next/link'
import React from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { IoWalletOutline } from 'react-icons/io5'

export default function ViewWallet() {
    return (
        <div className='flex flex-col items-center  pt-6 '>
            <div className="bg-[#7676FF] md:px-16 text-white w-[90%] md:w-[90%] lg:w-[1550px]  rounded-2xl p-6 shadow-lg md:h-60 lg:h-80 ">
                <div className="flex flex-col items-center justify-center md:mt-10 lg:mt-15 md:mb-7 lg:mb-15 lg:gap-2">
                    {/* Wallet Header */}
                    <div className="flex items-center gap-2 mb-1">
                        <IoWalletOutline className="text-[24px]" />
                        <h2 className="md:text-2xl font-semibold">Wallet</h2>
                    </div>

                    {/* Balance Section */}
                    <div className="flex items-center justify-center gap-4 mb-5 md:mb-0">
                        <AiOutlineDollarCircle className="text-[27px] md:text-[28px]" />
                        <p className="md:text-2xl font-bold">51.25</p>
                    </div>
                </div>
                <div className="flex items-center justify-center text-center ">
                    <Link href='/wallet'
                        //   onClick={() => setShowWithdraw(true)}
                        className="w-full md:w-1/2 cursor-pointer border  border-white text-[16px]  duration-300  text-black font-medium py-2 md:py-3 rounded-xl  bg-white"
                    >
                        View Wallet
                    </Link>
                </div>
            </div>
        </div>
    )
}

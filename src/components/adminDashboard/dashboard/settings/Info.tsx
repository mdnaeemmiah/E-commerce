"use client";

import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import img1 from "@/app/assets/dashboard/Rectangle 923.png"
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png"
import Link from "next/link";

export default function Info() {
  return (
    <div className="  py-6 flex justify-center items-center">
      <div className="w-full  bg-white rounded-lg p-6 shadow-sm border border-gray-200 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 mb-10">
                <Link href='/adminDashboard/settings'><IoMdArrowBack className="text-xl cursor-pointer" /></Link>
                <h2 className="text-xl font-semibold text-gray-700">
                    Personal Information
                </h2>
            </div>
          <Link href='/adminDashboard/settings/edit' className="flex items-center cursor-pointer gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            <FaPen size={14} /> Edit Profile
          </Link>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Profile */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-indigo-500">
              <Image
                src={img2}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-gray-700 font-semibold">Profile</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>

          {/* Right: Info Form */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                defaultValue="Tamim"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                defaultValue="gddvc@gmail.com"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm text-gray-500 mb-1">Phone Number</label>
              <div className="flex">
                <div className="flex items-center gap-2 border border-gray-300 px-8 py-2 rounded-l-md  bg-[#3E3EDF]">
                  <Image
                    src={img1}
                    alt="flag"
                    width={24}
                    height={16}
                    className=""
                  />
                  <span className="text-sm text-white">+1242</span>
                </div>
                <input
                  type="text"
                  defaultValue="5735353"
                  className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

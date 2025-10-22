"use client";

import Image from "next/image";
import qrCode from "@/app/assets/auth/image 7.png"; // replace with your QR image path

export default function NotLogin() {
  return (
    <div className="flex flex-col justify-center items-center  mt-8 md:mt-30 px-4">
      {/* QR Code */}
      <div className="bg-white p-6 rounded-2xl ">
        <Image
          src={qrCode}
          alt="QR Code"
          width={350}
          height={180}
          className="rounded-lg"
        />
      </div>

      {/* Texts */}
      <h2 className="text-[28px] font-semibold mt-6 text-gray-900">
        Scan Barcode
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Scan product barcodes to find deals
      </p>

      {/* Button */}
      <button className="mt-8 bg-[#4C45F5] text-white font-medium py-3 px-8 rounded-xl w-full md:w-1/2 lg:w-1/3 cursor-pointer hover:bg-[#3b36d9] transition-all">
        Open scanner
      </button>
    </div>
  );
}

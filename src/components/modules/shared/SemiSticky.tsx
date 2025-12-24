"use client";

import img1 from "@/app/assets/home/bi_qr-code-scan.png";
import img2 from "@/app/assets/home/mage_camera.png";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function SemiSticky() {
  const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleCameraClick = () => {
//     fileInputRef.current?.click(); // Trigger the hidden file input
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // Do something with the file (e.g., upload or preview)
//       console.log("Selected file:", file);
//     }
//   };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 gap-8 flex justify-center items-center px-4 md:px-12 lg:px-40 py-4 bg-white shadow-2xl text-center">
      <Image
        alt="scan"
        src={img1}
        width={50}
        height={20}
        className="cursor-pointer"
      />

      {/* Camera / upload */}
      {/* <div  className="cursor-pointer">
        <Image alt="camera" src={img2} width={50} height={20} />
      </div> */}

      {/* Hidden file input */}
      <Link href="/scan">
      <div  className="cursor-pointer">
        <Image alt="camera" src={img2} width={50} height={20} />
      </div>
      </Link>
    </div>
  );
}

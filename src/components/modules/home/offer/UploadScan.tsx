import img1 from "@/app/assets/home/bi_qr-code-scan.png"
import img2 from "@/app/assets/home/mage_camera.png"
import Image from "next/image"

export default function UploadScan() {
  return (
    <div className='w-[90%] mx-auto lg:container mt-20 mb-10 flex items-center justify-center '>
      <div className="flex flex-col md:flex-row gap-6">
         <div className="border border-gray-100 w-56 p-6 rounded-2xl flex flex-col  items-center shadow">
            <Image
              src={img1}
              alt="qr"
              width={60}
              height={20}
            ></Image>
            <h1 className="text-[18px] font-semibold mt-4">Scan QR</h1>
            <p className="text-[#959595]">Earn rewards instantly</p>
         </div>
      <div className="border border-gray-100 w-56 p-6 rounded-2xl flex flex-col  items-center shadow">
            <Image
              src={img2}
              alt="qr"
              width={60}
              height={20}
            ></Image>
            <h1 className="text-[18px] font-semibold mt-4">Upload Receipt</h1>
            <p className="text-[#959595]">Get cashback</p>
         </div>
      </div>
    </div>
  )
}

// "use client";

// import Image from "next/image";
// import qrCode from "@/app/assets/auth/image 7.png";
// import { useState } from "react";
// import img3 from "@/app/assets/auth/Group 66.png"
// import img4 from "@/app/assets/auth/Vector (11).png"

// export default function NotLogin() {
//     const [showHistory, setShowHistory] = useState(false);
//     return (
//         <div className="flex flex-col justify-center items-center  mt-8 md:mt-30 px-4">
//             {/* QR Code */}
//             <div className="bg-white p-6 rounded-2xl ">
//                 <Image
//                     src={qrCode}
//                     alt="QR Code"
//                     width={350}
//                     height={180}
//                     className="rounded-lg"
//                 />
//             </div>

//             {/* Texts */}
//             <h2 className="text-[28px] font-semibold mt-6 text-gray-900">
//                 Scan Barcode
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//                 Scan product barcodes to find deals
//             </p>

//             {/* Button */}
//             <button className="mt-8 bg-[#4C45F5] text-white font-medium py-3 px-8 rounded-xl w-full md:w-1/2 lg:w-1/3 cursor-pointer hover:bg-[#3b36d9] transition-all">
//                 Open scanner
//             </button>

//             {showHistory && (
//                 <div className="fixed inset-0 z-50 flex justify-center items-center px-4">

//                     <div
//                         className="absolute inset-0 bg-black opacity-80"
//                         onClick={() => setShowHistory(false)}
//                     ></div>


//                     <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg">
//                         <h3 className="text-[20px] md:text-xl font-semibold mb-4 text-center">
//                             Enter your E-mail or Number
//                         </h3>


//                         <input
//                             type="text"
//                             placeholder="E-mail address or phone number"
//                             className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
//                         />


//                         <button className="w-full bg-[#3E3EDF] text-white py-3 rounded-lg cursor-pointer transition">
//                             Next
//                         </button>


//                         <div className="flex items-center my-4">
//                             <div className="flex-grow border-t border-gray-300"></div>
//                             <span className="mx-2 text-gray-500">or</span>
//                             <div className="flex-grow border-t border-gray-300"></div>
//                         </div>


//                         <div className="flex justify-center gap-4">
//                             <button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full  transition">
//                                 <Image src={img3} alt="Google" width={24} height={24} />
//                             </button>

//                             <button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full  transition">
//                                 <Image src={img4} alt="Apple" width={24} height={24} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }


"use client";

import Image from "next/image";
import { useState } from "react";
import qrCode from "@/app/assets/auth/image 7.png";
import img3 from "@/app/assets/auth/Group 66.png";
import img4 from "@/app/assets/auth/Vector (11).png";

export default function NotLogin() {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center mt-8 md:mt-30 px-4">
            {/* QR Code */}
            <div className="bg-white p-6 rounded-2xl">
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

            {/* Button (opens popup) */}
            <button
                onClick={() => setShowHistory(true)}
                className="mt-8 bg-[#4C45F5] text-white font-medium py-3 px-8 rounded-xl w-full md:w-1/2 lg:w-1/3 cursor-pointer hover:bg-[#3b36d9] transition-all"
            >
                Open scanner
            </button>

            {/* Popup Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-80"
                        onClick={() => setShowHistory(false)}
                    ></div>

                    {/* Modal Box */}
                    <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg">
                        <h3 className="text-[20px] md:text-xl font-semibold mb-4 text-center">
                            Enter your E-mail or Number
                        </h3>

                        <input
                            type="text"
                            placeholder="E-mail address or phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
                        />

                        <button className="w-full bg-[#3E3EDF] text-white py-3 rounded-lg cursor-pointer transition">
                            Next
                        </button>

                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-2 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full transition">
                                <Image src={img3} alt="Google" width={24} height={24} />
                            </button>
                            <button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full transition">
                                <Image src={img4} alt="Apple" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

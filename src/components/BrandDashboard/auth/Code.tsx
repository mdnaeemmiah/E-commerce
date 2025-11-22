
// "use client";

// import Image from "next/image";
// import img1 from "@/app/assets/auth/image3.png";
// import { IoMdArrowBack } from "react-icons/io";
// import { useState } from "react";
// import Link from "next/link";




// const Code: React.FC = () => {

//     const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//     const handleChange = (value: string, index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//         if (/^[0-9]?$/.test(value)) {
//             const newOtp = [...otp];
//             newOtp[index] = value;
//             setOtp(newOtp);

//             // Auto focus next input
//             if (value && index < 5) {
//                 const next = document.getElementById(`otp-${index + 1}`);
//                 next?.focus();
//             }
//         }
//     };

//     const handleBackspace = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === "Backspace") {
//             if (otp[index] === "") {
//                 // If the current field is empty, focus the previous field
//                 const prev = document.getElementById(`otp-${index - 1}`);
//                 if (prev) {
//                     prev.focus();
//                 }
//             }
//         }
//     };

//     const isOtpComplete = otp.every((digit) => digit !== ""); // Check if all OTP fields are filled





//     return (
//         <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
//             <div className="bg-white  p-6 rounded-lg shadow-md w-full max-w-lg md:pb-15">
//                 <Image
//                     src={img1}
//                     alt="Logo"
//                     className="mb-6 mx-auto"
//                     width={150}
//                     height={150}
//                 />
//                 <h2 className="flex items-center text-2xl font-semibold text-center text-gray-700 mb-4 justify-center">
//                     <IoMdArrowBack className="mr-2" /> Verify Email
//                 </h2>
//                 <p className="text-center mb-10 text-[#575757]">Please enter the otp we have sent you in your email.</p>

//                 <form>

//                     <div className="space-y-4">
//                         {/* OTP Code Boxes */}
//                         <div className="flex justify-center space-x-3.5 md:space-x-6">
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     id={`otp-${index}`}
//                                     type="text"
//                                     maxLength={1}
//                                     value={digit}
//                                     onChange={(e) => handleChange(e.target.value, index, e)}
//                                     onKeyDown={(e) => handleBackspace(index, e)}
//                                     className="w-10 md:w-14 h-10 md:h-14 text-center border border-gray-400 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-900 text-[#575757]"
//                                 />
//                             ))}
//                         </div>

//                         {/* Submit */}
//                         <Link href="/adminAuth/resetPassword">
//                             <button
//                                 type="submit"
//                                 className="w-full  cursor-pointer mt-6 py-3 md:py-4  bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
//                             >
//                                 Verify Email
//                             </button>
//                         </Link>
//                     </div>


//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Code;



"use client";

import Image from "next/image";
import img1 from "@/app/assets/auth/image3.png";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";

const Code: React.FC = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            if (value && index < 5) {
                const next = document.getElementById(`otp-${index + 1}`);
                next?.focus();
            }
        }
    };

    const handleBackspace = (index: number) => {
        // Simplified: removed unused 'event' parameter
        if (otp[index] === "") {
            // If the current field is empty, focus the previous field
            const prev = document.getElementById(`otp-${index - 1}`);
            if (prev) {
                prev.focus();
            }
        }
    };

    // If you want to use it in the future, you can enable the submit button or show some indication
    const isOtpComplete = otp.every((digit) => digit !== ""); // Check if all OTP fields are filled

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
            <div className="bg-white  p-6 rounded-lg shadow-md w-full max-w-lg md:pb-15">
                <Image
                    src={img1}
                    alt="Logo"
                    className="mb-6 mx-auto"
                    width={150}
                    height={150}
                />
                <h2 className="flex items-center text-2xl font-semibold text-center text-gray-700 mb-4 justify-center">
                    <IoMdArrowBack className="mr-2" /> Verify Email
                </h2>
                <p className="text-center mb-10 text-[#575757]">Please enter the otp we have sent you in your email.</p>

                <form>
                    <div className="space-y-4">
                        {/* OTP Code Boxes */}
                        <div className="flex justify-center space-x-3.5 md:space-x-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={() => handleBackspace(index)} // Simplified: removed 'event' parameter
                                    className="w-10 md:w-14 h-10 md:h-14 text-center border border-gray-400 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-900 text-[#575757]"
                                />
                            ))}
                        </div>

                        {/* Submit */}
                        <Link href="/adminAuth/resetPassword">
                            <button
                                type="submit"
                                className="w-full cursor-pointer mt-6 py-3 md:py-4 bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
                                disabled={!isOtpComplete} // Use isOtpComplete to disable the button until OTP is complete
                            >
                                Verify Email
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Code;

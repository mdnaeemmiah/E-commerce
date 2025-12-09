"use client";

import Image from "next/image";
import img1 from "@/app/assets/auth/image3.png";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define the component
const Code: React.FC = () => {
  // State for OTP input
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for tracking submission
  const [error, setError] = useState(""); // State for handling errors
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);

  // Handle change in OTP input
  const handleChange = (
    value: string,
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 4) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  // Handle backspace key press to focus on previous input
  const handleBackspace = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (otp[index] === "") {
        // If the current field is empty, focus the previous field
        const prev = document.getElementById(`otp-${index - 1}`);
        if (prev) {
          prev.focus();
        }
      }
    }
  };




  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Handle OTP submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isOtpComplete) {
      setError("Please complete the OTP.");
      return;
    }

    // Get email from localStorage
    const email = localStorage.getItem("email");
    if (!email) {
      setError("No email found in localStorage.");
      return;
    }

    setIsSubmitting(true);
    setError(""); // Clear previous errors

    try {
      // Send OTP and email to API for verification
      const response = await baseApi.post<{ reset_token: string }>(ENDPOINTS.verifyOtp, {
        email: email,
        otp: otp.join(""), // Join OTP array into a single string
      });

      if (response.status === 200) {
        const resetToken = response.data?.reset_token;

        if (!resetToken) {
          throw new Error("Reset token not received");
        }

        // ✅ Save token in localStorage
        localStorage.setItem("reset_token", resetToken);

        // Redirect to reset password page upon success
        toast.success("otp verified successfully!");

        setTimeout(() => {
          router.push("/brandAuth/resetPassword"); // Redirect to the OTP page
        });
      } else {
        // Handle error if verification fails
        const errorMessage =
          typeof response.data === "object" &&
          response.data !== null &&
          "message" in response.data
            ? (response.data as { message: string }).message
            : "OTP verification failed.";
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleResendCode = async () => {
  const email = localStorage.getItem("email");

  if (!email) {
    toast.error("Email not found. Please go back and try again.");
    return;
  }

  try {
    setIsResending(true);

    await baseApi.post(ENDPOINTS.forgetPassword, {
      email: email,
    });

    toast.success("OTP resent successfully!");
  } catch (error) {
    toast.error("Failed to resend OTP. Please try again.");
  } finally {
    setIsResending(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg md:pb-15">
        <Image
          src={img1}
          alt="Logo"
          className="mb-6 mx-auto"
          width={150}
          height={150}
        />
        <h2 className="flex items-center text-2xl font-semibold text-center text-gray-700 mb-4 justify-center">
          <Link href="/brandAuth/forgetPassword">
            <IoMdArrowBack className="mr-2 cursor-pointer text-[#3E3EDF]" />
          </Link>{" "}
          Verify Email
        </h2>
        <p className="text-center mb-10 text-[#575757]">
          Please enter the OTP we have sent you in your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* OTP Code Boxes */}
            <div className="flex justify-center space-x-4 md:space-x-7">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index, e)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  className="w-12 md:w-16 h-12 md:h-16 text-center border border-gray-400 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-900 text-[#575757]"
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 py-3 md:py-4 bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600 ${
                isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>

            {/* Error Message */}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-[#828282] flex justify-center gap-2">
              Haven’t got the email yet?{" "}
              <p>
                <span  onClick={handleResendCode} className="font-semibold text-[#319EE1] cursor-pointer">
                  Resend code
                </span>
              </p>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Code;

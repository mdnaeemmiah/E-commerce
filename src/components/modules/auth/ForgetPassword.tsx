"use client";

import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { toast } from "sonner";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Email input handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Simple email validation (checking for @ and .)
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsValidEmail(regex.test(value)); // Enable button when email is valid
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail) return; // Don't proceed if email is invalid

    setIsLoading(true); // Show loading state
    setError(""); // Reset previous errors

    const emailData = { email }; // Prepare email data to send

    try {
      // Make the API call with the email data
      const response = await baseApi.post(ENDPOINTS.forgetPassword, emailData);

      if (!response || response.status !== 200) {
        throw new Error("Something went wrong. Please try again.");
      }

      // Save the email in localStorage and redirect
      localStorage.setItem("email", email);

      // Success toast notification
      toast.success("OTP sent successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/auth/otp"); // Redirect to the OTP page
      }, 1000);
    } catch (error: any) {
      setError(error.message || "Failed to send OTP. Please try again.");

      // Error toast notification
      toast.error(error.message || "Failed to send OTP. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="bg-white  p-6 rounded-lg shadow-md w-full max-w-lg md:pb-15">
        <div className="pt-10">
          <h2 className="flex items-center text-2xl font-semibold text-gray-700 mb-4 justify-center">
            <Link href="/auth/login" className="flex items-center">
              <IoMdArrowBack className="mr-2" />
              Forgot Password
            </Link>
          </h2>
          <p className="text-center mb-10 text-[#575757]">
            Please enter your email address to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValidEmail || isLoading} // Default disabled state
            className={`w-full cursor-pointer mt-6 py-3 md:py-4 bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600`}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

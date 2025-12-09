
"use client";

import Image from "next/image";
import img1 from "@/app/assets/auth/image3.png";
import { IoMdArrowBack } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";

const ResetPassword: React.FC = () => {
  const router = useRouter();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validation
    if (password1.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password1 !== password2) {
      toast.error("Passwords do not match");
      return;
    }

    // ✅ Get reset token from localStorage
    const resetToken = localStorage.getItem("reset_token");
    if (!resetToken) {
      toast.error("Reset token not found. Please verify OTP again.");
      router.push("/brandAuth/forgetPassword");
      return;
    }

    setLoading(true);

    try {
      const response = await baseApi.post(ENDPOINTS.newPassword, {
        reset_token: resetToken,
        new_password: password1,
        confirm_password: password2,
      });

      if (response.status === 200) {
        toast.success("Password reset successfully 🎉");

        // ✅ Cleanup sensitive data
        localStorage.removeItem("reset_token");
        localStorage.removeItem("email");

        // ✅ Redirect to login
        setTimeout(() => {
          router.push("/brandAuth/login");
        }, 1500);
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <Image
          src={img1}
          alt="Logo"
          className="mb-6 mx-auto"
          width={150}
          height={150}
        />

        <h2 className="flex items-center justify-center text-2xl font-semibold text-gray-700 mb-4">
          <Link href="/brandAuth/code">
            <IoMdArrowBack className="mr-2 cursor-pointer text-[#3E3EDF]" />
          </Link>
          Reset Password
        </h2>

        <p className="text-center mb-10 text-[#575757]">
          Your password must be at least 8 characters long.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              Set Password
            </label>
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-3 top-5 text-gray-600 text-[20px]"
              >
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Re-enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-5 text-gray-600 text-[20px]"
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-2 text-white font-semibold rounded-xl transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3E3EDF] hover:bg-indigo-600"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

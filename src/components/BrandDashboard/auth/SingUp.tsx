"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import img1 from "@/app/assets/auth/logo.png";
import Link from "next/link";
import img3 from "@/app/assets/auth/Frame 427319652.png";
import img2 from "@/app/assets/auth/Google.png";
import baseApi from "@/api/baseApi"; // Make sure baseApi is set up correctly
import { ENDPOINTS } from "@/api/endPoints"; // Make sure ENDPOINTS is set up correctly
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await baseApi.post(ENDPOINTS.BrandRegister, {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        category: formData.category,
      });

      if (response.status === 201) {
        // setSuccessMessage("Registration successful! Redirecting to login...");
        toast.success("Registration successful! Redirecting to login...");

        setTimeout(() => {
          router.push("/brandAuth/login");
        }, 1000);
      }
    } catch (err) {
      setError("Failed to register, please try again.");
    //   console.error(err);
      toast.error("Failed to register, please try again."); // Show toast notification on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#707070] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:pb-15">
        <Image
          src={img1}
          alt="Logo"
          className="mb-6 mx-auto"
          width={150}
          height={150}
        />
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter full name"
            />
          </div>

          {/* Phone number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-md font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-gray-600 text-[20px]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-md font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full text-[#1F1D1D] p-3 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter location"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-md font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full text-gray-500 py-4 px-2 mt-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food</option>
              <option value="electronics">Electronics</option>
              <option value="organic_food">Organic Food</option>
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Accept terms & conditions
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-4 bg-[#3E3EDF] text-white font-semibold rounded-xl hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-3 text-center">{successMessage}</p>
        )}

        {/* Google & Apple Login */}
        <div className="space-y-4 mt-3 md:mt-5">
          <button className="flex text-black p-3 md:p-4 w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]">
            <Image src={img2} alt="Icon" width={30} height={30} />
            <span className="text-[16px] sm:text-base md:text-[18px]">
              Continue with Google
            </span>
          </button>
          <button className="flex text-black p-3 w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]">
            <Image src={img3} alt="Icon" width={35} height={30} />
            <span className="text-[16px] sm:text-base md:text-[18px]">
              Continue with Apple
            </span>
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <h1 className="text-[#828282]">
            You have an account?{" "}
            <span className="font-semibold text-[#3E3EDF] cursor-pointer">
              <Link href="/brandAuth/login">Sign In</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

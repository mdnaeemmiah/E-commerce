"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import img2 from "@/app/assets/auth/Google.png";
import Link from "next/link";
import img1 from "@/app/assets/auth/Frame 427319652.png";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await baseApi.post(ENDPOINTS.shopperRegister, formData);

      if (response.status === 201 || response.status === 200) {
        toast.success(
          "Registration successful! Please check your email to activate your account."
        );

        // Optional redirect to email info page
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to register, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:pb-15">
        <h2 className="text-[24px] md:text-[44px] font-semibold text-center text-gray-700 mb-2">
          Sign In
        </h2>
        <p className="text-center text-[16px] md:text-[24px] text-[#575757] mb-4">
          It only takes a minute to create your account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-xl"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-4 bg-[#3E3EDF] text-white rounded-xl"
          >
            {loading ? "Registering..." : "Sign In"}
          </button>
        </form>
                <div className="flex items-center mt-5">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <p className="mx-4 text-[#575757]">or</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>

        {/* Google & Apple Login */}
        <div className="space-y-4 mt-3 md:mt-5">
          <button className="flex text-black p-3 md:p-4 w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]">
            <Image src={img2} alt="Icon" width={30} height={30} />
            <span className="text-[16px] sm:text-base md:text-[18px] ">
              Continue with Google
            </span>
          </button>
          <button className="flex text-black p-3 md:p-4 w-full cursor-pointer hover:bg-gray-100 duration-300 items-center space-x-2 justify-center border border-gray-300 rounded-2xl outline-[#319EE1]">
            <Image src={img1} alt="Icon" width={35} height={30} />
            <span className="text-[16px] sm:text-base md:text-[18px] ">
              Continue with Apple
            </span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-[#828282]">
            You have an account ?
            <span className="font-semibold text-[#3E3EDF] cursor-pointer">
              {" "}
              <Link href="/auth/login">Sign in</Link>{" "}
            </span>
          </h1>
        </div>
      </div>
      
    </div>
  );
};

export default Register;

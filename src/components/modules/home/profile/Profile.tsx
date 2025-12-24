"use client";

import {
  FaUserEdit,
  FaBookmark,
  FaBell,
  FaSignOutAlt,
  FaTrashAlt,
  FaHeadset,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPolicy } from "react-icons/md";
import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { jwtDecode } from "jwt-decode";

// Define types for API responses
interface ProfileData {
  full_name: string;
  image?: string;
  email?: string;
}

interface DecodedToken {
  user_id: string | number;
  exp?: number;
}

export default function Profile() {
  const [enabled, setEnabled] = useState(true);
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    // Decode the token to extract the user_id
    let userId: string | number;
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      userId = decodedToken?.user_id;
    } catch (err) {
      toast.error("Invalid token, please login again.");
      console.error("Token decode error:", err);
      return;
    }

    if (!userId) {
      toast.error("User ID not found in token.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await baseApi.get<ProfileData>(
          `${ENDPOINTS.getShopperProfile}${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profileData = response.data;

        if (profileData) {
          setFullName(profileData.full_name || "");
          setEmail(profileData.email || "");
          if (profileData.image) {
            setProfileImage(profileData.image);
            setPreviewUrl(""); // Clear preview when loading backend image
          }
        }
      } catch (err) {
        toast.error("Failed to fetch profile. Please try again.");
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    // Remove the tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("You have been logged out successfully!");
    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <div className=" md:w-[90%]  lg:w-[50%] mx-auto py-6 mt-4 md:mt-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : profileImage ? (
            <img
              src={`http://10.10.7.85:8001${profileImage}`}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/default-image.png"
              alt="Default Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h2 className="text-lg text-[#575757] font-semibold mt-2">
          {fullName || "Guest User"}
        </h2>
        <p className="text-sm text-gray-500">{email || "No email available"}</p>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <p className="text-[#575757] mb-2">Account Information</p>
        <Link href="/profile/editProfile">
          <ProfileItem icon={<FaUserEdit />} label="Edit Profile" />
        </Link>
        <Link href="/profile/savedOffer">
          <ProfileItem icon={<FaBookmark />} label="Saved" />
        </Link>
      </div>

      {/* Policy Center */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <p className="text-[#575757] mb-2">Policy Center</p>
        <Link href="/profile/Privacy">
          <ProfileItem icon={<MdPolicy />} label="Privacy Policy" />
        </Link>
        <Link href="/profile/term">
          <ProfileItem
            icon={<RiLockPasswordLine />}
            label="Terms & Condition"
          />
        </Link>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-[#575757]  mb-2">Settings</p>
        <div className="flex items-center justify-between py-3 cursor-pointer">
          <Link href="/profile/notifications">
            <div className="flex  items-center gap-3 text-gray-700  ">
              <FaBell />
              <span>Notification</span>
            </div>
          </Link>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-300"></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>
        <Link href="/profile/helpSupport">
          <ProfileItem icon={<FaHeadset />} label="Help & Support" />
        </Link>
        <ProfileItem
          icon={<FaSignOutAlt />}
          label="Log Out"
          onClick={handleLogout}
        />
        <ProfileItem
          icon={<FaTrashAlt />}
          label="Delete Account"
          textColor="text-red-500"
        />
      </div>
    </div>
  );
}

// Reusable Profile Item Component
const ProfileItem = ({
  icon,
  label,
  textColor = "text-gray-700",
  onClick,
}: {
  icon: JSX.Element;
  label: string;
  textColor?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`flex items-center justify-between py-3 hover:bg-gray-200  rounded-xl px-2   cursor-pointer ${textColor}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 text-[#575757] ">
        {icon}
        <span>{label}</span>
      </div>
      <IoIosArrowForward className="text-gray-600" />
    </div>
  );
};

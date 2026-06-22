"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import profileImg from "@/app/assets/auth/Ellipse 2.png";
import { FiEye, FiEyeOff, FiChevronLeft } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

export default function EditProfile() {
  const router = useRouter();
  const [fullName, setFullName] = useState("Tamim Sarker");
  const [name, setName] = useState("Tamim");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
        >
          <FiChevronLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md">
            <Image src={profileImg} alt="Profile" fill className="object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3E3EDF] rounded-full flex items-center justify-center shadow-md">
            <MdEdit size={14} className="text-white" />
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        <hr className="border-gray-100" />

        {/* Old Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Old Password
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] focus:ring-2 focus:ring-indigo-100 transition pr-11"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showOld ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3E3EDF] focus:ring-2 focus:ring-indigo-100 transition pr-11"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <FiEyeOff size={17} /> : <FiEye size={17} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#3E3EDF] text-white font-semibold py-3.5 rounded-xl hover:bg-[#3232c0] transition disabled:opacity-50 mt-2 text-sm"
        >
          {loading ? "Saving..." : "Save & Change"}
        </button>
      </form>
    </div>
  );
}

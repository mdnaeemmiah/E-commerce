"use client";

import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function SettingsPage() {

  const settings = [
    { id: 1, title: "Personal Information", href: "/adminDashboard/settings/personalInfo" },
    { id: 2, title: "Change Password", href: "/adminDashboard/settings/changePassword" },
    { id: 3, title: "Terms & Condition", href: "/adminDashboard/settings/terms&conditions" },
    { id: 4, title: "Privacy Policy", href: "/adminDashboard/settings/privacy" },
    { id: 5, title: "FAQ", href: "/adminDashboard/settings/faq" },
  ];

  return (
    <div className=" flex justify-center items-start py-10 ">
      <div className="bg-white rounded-2xl shadow-sm w-full  p-4">
        {settings.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex justify-between items-center py-4 px-2 text-gray-700 hover:bg-gray-50 transition ${
              index !== settings.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <span className="text-[18px] text-[#575757]">{item.title}</span>
            <IoIosArrowForward className="text-gray-400 text-lg" />
          </Link>
        ))}
      </div>
    </div>
  );
}

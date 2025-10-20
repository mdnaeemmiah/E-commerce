"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";

export default function ContactUs() {
  const contacts = [
    { id: 1, icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com" },
    { id: 2, icon: <BsGlobe />, label: "Website", href: "https://www.example.com" },
    { id: 3, icon: <FaTwitter />, label: "Twitter", href: "https://twitter.com" },
    { id: 4, icon: <MdEmail />, label: "Email", href: "mailto:example@gmail.com" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 w-100">
        <h2 className="text-[24px] font-semibold mb-4">Contact Us</h2>

        <div className="flex flex-col gap-3">
          {contacts.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-4 text-sm font-bold text-gray-700 hover:shadow-sm hover:bg-gray-200 transition-all duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

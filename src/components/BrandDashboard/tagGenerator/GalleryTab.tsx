"use client";

import { useState } from "react";
import Image from "next/image";
import { MdDashboardCustomize } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import img7 from "@/app/assets/saved/8380003.jpg";
import img8 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";

type FilterType = "All" | "Stickers" | "Shelf Talkers" | "Neck Tags" | "Postcards";
const FILTERS: FilterType[] = ["All", "Stickers", "Shelf Talkers", "Neck Tags", "Postcards"];

type Template = {
  id: string;
  name: string;
  type: FilterType;
  img: ReturnType<typeof Object.assign>;
  dims: string;
  desc: string;
  customize: string;
  badges: { label: string; color: string }[];
};

const TEMPLATES: Template[] = [
  {
    id: "t1",
    name: "Retail Shelf Talker",
    type: "Shelf Talkers",
    img: rect,
    dims: `3" Flimsy`,
    desc: "durable cardstock, displayr...",
    customize: "2 Frame, ...",
    badges: [
      { label: "POPULAR", color: "bg-orange-500 text-white" },
      { label: "SWEET", color: "bg-pink-500 text-white" },
    ],
  },
  {
    id: "t2",
    name: "Sovereign Neck Hanger",
    type: "Neck Tags",
    img: img2,
    dims: `2" Round`,
    desc: "Die-cut half-hanger, premium matte finish...",
    customize: "2 Frame, x4 pcs",
    badges: [],
  },
  {
    id: "t3",
    name: "Campaign Sticker",
    type: "Stickers",
    img: img3,
    dims: `2" Round`,
    desc: "Die-cut half/hang, weather-resistant vinyl...",
    customize: "2 Round, x2 print",
    badges: [
      { label: "VETERANS DAY", color: "bg-[#3E3EDF] text-white" },
    ],
  },
  {
    id: "t4",
    name: "Direct Mail Postcard",
    type: "Postcards",
    img: img4,
    dims: `4"x6"`,
    desc: "glossy finish, perfect for...",
    customize: "2 Round, x2 sheet",
    badges: [
      { label: "DIRECT MAIL", color: "bg-teal-600 text-white" },
    ],
  },
  {
    id: "t5",
    name: "Mini Round Sticker",
    type: "Stickers",
    img: img5,
    dims: `1.5" Round`,
    desc: "Waterproof vinyl, bold color print...",
    customize: "4 designs, x10 pack",
    badges: [],
  },
  {
    id: "t6",
    name: "Premium Shelf Card",
    type: "Shelf Talkers",
    img: img6,
    dims: `4"x3"`,
    desc: "Laminated finish, wire shelf compatible...",
    customize: "2 Frame, x5 sheets",
    badges: [
      { label: "NEW", color: "bg-green-500 text-white" },
    ],
  },
  {
    id: "t7",
    name: "Hang Tag — Classic",
    type: "Neck Tags",
    img: img7,
    dims: `2.5"x4"`,
    desc: "Kraft paper, eco-friendly, string loop...",
    customize: "3 Frame, x8 pack",
    badges: [],
  },
  {
    id: "t8",
    name: "EDDM Mailer",
    type: "Postcards",
    img: img8,
    dims: `6.5"x9"`,
    desc: "USPS EDDM-ready, full bleed print...",
    customize: "Full bleed, x500",
    badges: [
      { label: "BEST VALUE", color: "bg-purple-600 text-white" },
    ],
  },
];

export default function GalleryTab() {
  const [filter, setFilter] = useState<FilterType>("All");

  const visible = TEMPLATES.filter((t) => filter === "All" || t.type === filter);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Asset Library
        </p>
        <h2 className="text-[22px] font-bold text-gray-900">Marketing Asset Templates</h2>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto pb-0">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition -mb-px ${
              filter === f
                ? "border-[#3E3EDF] text-[#3E3EDF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {visible.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group"
          >
            {/* Image */}
            <div className="relative w-full h-40 bg-gray-100">
              <Image src={t.img} alt={t.name} fill className="object-cover" />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {t.badges.map((b, i) => (
                  <span key={i} className={`text-[9px] font-black px-2 py-0.5 rounded-full ${b.color}`}>
                    {b.label}
                  </span>
                ))}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#3E3EDF]/0 group-hover:bg-[#3E3EDF]/10 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-[#3E3EDF] text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                  <MdDashboardCustomize size={14} />
                  Use Template
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-sm font-bold text-gray-900">{t.name}</p>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                {t.dims} {t.desc}
              </p>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                <MdDashboardCustomize size={13} className="text-gray-400 shrink-0" />
                <p className="text-[10px] text-gray-400">Customize: {t.customize}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

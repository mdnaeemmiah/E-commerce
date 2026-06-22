"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MdEdit, MdCampaign, MdStar } from "react-icons/md";

export type Product = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  campaigns: number;
  tags: string[];
  rating: number;
  company: string;
  campaignType: string;
  image?: StaticImageData | string | null;
  bgColor?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/brandDashboard/productLibrary/${product.id}`}>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
        {/* Image area */}
        <div
          className={`relative w-full h-36 flex items-center justify-center ${product.bgColor ?? "bg-gray-100"}`}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
              <MdCampaign size={30} className="text-white/70" />
            </div>
          )}
          {/* Edit icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-50 transition"
          >
            <MdEdit size={14} className="text-[#3E3EDF]" />
          </button>
          {/* Status badge */}
          <span
            className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              product.status === "ACTIVE"
                ? "bg-[#3E3EDF] text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {product.status}
          </span>
        </div>

        {/* Card body */}
        <div className="p-3 space-y-2">
          <p className="text-[13px] font-semibold text-gray-800 line-clamp-1">{product.name}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-medium bg-[#EEF0FF] text-[#3E3EDF] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Info row */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-50">
            <div className="flex items-center gap-1">
              <MdCampaign size={13} className="text-[#3E3EDF]" />
              <span>
                {product.campaigns} Campaign{product.campaigns !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <MdStar size={13} className="text-yellow-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Company row */}
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span className="truncate">{product.company}</span>
            <span className="bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded text-[10px]">
              {product.campaignType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

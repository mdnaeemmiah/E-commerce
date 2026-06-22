"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import {
  MdDelete,
  MdEdit,
  MdDescription,
  MdLabel,
  MdBuild,
  MdAdd,
  MdClose,
} from "react-icons/md";
import AliasManagementModal from "./AliasManagementModal";

type Campaign = {
  id: string;
  name: string;
  type: "REBATE" | "REVIEW";
  status: "Active" | "Paused" | "Ended";
  claims: number;
};

type TechSpec = {
  label: string;
  value: string;
};

type ProductDetail = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  subtitle: string;
  description: string;
  image?: StaticImageData | string | null;
  bgColor?: string;
  aliases: string[];
  campaigns: Campaign[];
  specs: TechSpec[];
};

export default function ProductDetailsView({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const [aliases, setAliases] = useState<string[]>(product.aliases);
  const [showAliasModal, setShowAliasModal] = useState(false);

  const statusDot: Record<Campaign["status"], string> = {
    Active: "bg-green-500",
    Paused: "bg-yellow-400",
    Ended: "bg-gray-400",
  };

  const typeBadge: Record<Campaign["type"], string> = {
    REBATE: "bg-blue-100 text-blue-700",
    REVIEW: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <nav className="text-[12px] text-gray-400 flex items-center gap-1">
          <span
            className="cursor-pointer hover:text-[#3E3EDF]"
            onClick={() => router.push("/brandDashboard/productLibrary")}
          >
            Product Library
          </span>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </nav>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 border border-red-300 text-red-500 text-[12px] font-semibold px-4 py-2 rounded-xl hover:bg-red-50 transition">
            <MdDelete size={16} />
            Delete
          </button>
          <button
            onClick={() => router.push(`/brandDashboard/productLibrary/${product.id}/edit`)}
            className="flex items-center gap-1.5 bg-[#3E3EDF] text-white text-[12px] font-semibold px-4 py-2 rounded-xl hover:bg-[#3232c0] transition"
          >
            <MdEdit size={16} />
            Edit Product
          </button>
        </div>
      </div>

      {/* Top section: Image + Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Product Image */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div
            className={`relative w-full h-64 flex items-center justify-center ${product.bgColor ?? "bg-gray-100"}`}
          >
            {product.image && (
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            )}
            <span
              className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full ${
                product.status === "ACTIVE"
                  ? "bg-[#3E3EDF] text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {product.status}
            </span>
          </div>
          <div className="p-5">
            <h1 className="text-[20px] font-bold text-gray-900">{product.name}</h1>
            <p className="text-[13px] text-gray-400 mt-1">{product.subtitle}</p>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-bold text-gray-800">Active Campaigns</h2>
            <button className="text-[12px] text-[#3E3EDF] font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {product.campaigns.map((camp) => (
              <div
                key={camp.id}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusDot[camp.status]}`} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-gray-700 line-clamp-1">{camp.name}</p>
                    <p className="text-[11px] text-gray-400">{camp.claims} Claims</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ml-2 flex-shrink-0 ${typeBadge[camp.type]}`}>
                  {camp.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description + Aliases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Product Description */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <h2 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-3">
            <MdDescription size={18} className="text-[#3E3EDF]" />
            Product Description
          </h2>
          <p className="text-[13px] text-gray-500 leading-relaxed">{product.description}</p>
        </div>

        {/* OCR Aliases */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[13px] font-bold text-gray-800 flex items-center gap-2">
              <MdLabel size={18} className="text-[#3E3EDF]" />
              OCR Aliases
            </h2>
            <button
              onClick={() => setShowAliasModal(true)}
              className="text-[12px] text-[#3E3EDF] font-semibold border border-[#3E3EDF] px-3 py-1 rounded-lg hover:bg-[#EEF0FF] transition flex items-center gap-1"
            >
              <MdAdd size={14} />
              Manage Aliases
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {aliases.map((alias, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-[#EEF0FF] text-[#3E3EDF] text-[12px] font-medium px-3 py-1 rounded-full"
              >
                {alias}
                <button
                  onClick={() => setAliases(aliases.filter((a) => a !== alias))}
                  className="hover:text-red-500 transition"
                >
                  <MdClose size={12} />
                </button>
              </span>
            ))}
            {aliases.length === 0 && (
              <p className="text-[12px] text-gray-400">No aliases added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <h2 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-4">
          <MdBuild size={18} className="text-[#3E3EDF]" />
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.specs.map((spec, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{spec.label}</p>
              <p className="text-[13px] font-semibold text-gray-800 mt-1">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {showAliasModal && (
        <AliasManagementModal
          productName={product.name}
          initialAliases={aliases}
          onClose={() => setShowAliasModal(false)}
          onSave={(updated) => {
            setAliases(updated);
            setShowAliasModal(false);
          }}
        />
      )}
    </div>
  );
}

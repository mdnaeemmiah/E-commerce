"use client";

import { useState } from "react";
import Image from "next/image";
import { MdSearch, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import img1 from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import img7 from "@/app/assets/saved/8380003.jpg";
import img8 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
import { StaticImageData } from "next/image";

export interface Step2Data {
  selectedProducts: string[];
}

const MOCK_PRODUCTS: { id: string; name: string; price: string; img: StaticImageData }[] = [
  { id: "p1", name: "Kettle Sea Salt Chips", price: "$89.99", img: img1 },
  { id: "p2", name: "Nitro Cold Brew", price: "$45.00", img: img2 },
  { id: "p3", name: "Premium Sparkling Water", price: "$12.99", img: img3 },
  { id: "p4", name: "Wild Berry Trail Mix", price: "$65.00", img: img4 },
  { id: "p5", name: "Zesty Lime Sparkler", price: "$32.50", img: img5 },
  { id: "p6", name: "Dark Cacao Bar", price: "$78.00", img: img6 },
  { id: "p7", name: "Honey Almond Granola", price: "$199.00", img: img7 },
  { id: "p8", name: "Organic Green Tea", price: "$55.00", img: img8 },
];

interface Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Products({ data, onChange, onNext, onBack }: Props) {
  const [search, setSearch] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  const toggle = (id: string) => {
    const sel = data.selectedProducts.includes(id)
      ? data.selectedProducts.filter((x) => x !== id)
      : [...data.selectedProducts, id];
    onChange({ selectedProducts: sel });
  };

  const filtered = MOCK_PRODUCTS.filter((p) => {
    if (showSelected && !data.selectedProducts.includes(p.id)) return false;
    return p.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Select Products</h2>
        <p className="text-sm text-gray-400 mt-1">
          Choose which products are eligible for this rebate campaign.
        </p>
        <p className="text-xs text-[#3E3EDF] mt-0.5">
          Recommend selecting products related to your campaign goals for maximum participation.
        </p>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
          />
        </div>
        <button
          onClick={() => setShowSelected(!showSelected)}
          className={`text-sm font-semibold px-4 py-2 rounded-lg border transition ${
            showSelected
              ? "bg-[#3E3EDF] text-white border-[#3E3EDF]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#3E3EDF]"
          }`}
        >
          {data.selectedProducts.length > 0
            ? `${data.selectedProducts.length} Selected`
            : "Show Selected"}
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {filtered.map((p) => {
          const selected = data.selectedProducts.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`relative rounded-2xl border-2 p-3 text-left transition hover:shadow-md ${
                selected
                  ? "border-[#3E3EDF] bg-[#EEF0FF]/60"
                  : "border-gray-100 bg-white hover:border-gray-300"
              }`}
            >
              <div className="absolute top-2 right-2 z-10">
                {selected ? (
                  <MdCheckBox size={20} className="text-[#3E3EDF]" />
                ) : (
                  <MdCheckBoxOutlineBlank size={20} className="text-gray-300" />
                )}
              </div>
              <div className="relative w-full h-20 rounded-lg overflow-hidden mb-2">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
              <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">{p.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{p.price}</p>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-4 text-center py-12 text-gray-400 text-sm">
            No products found.
          </div>
        )}
      </div>

      {/* Products selected count */}
      <p className="text-xs text-gray-400 mt-3">
        {data.selectedProducts.length} product{data.selectedProducts.length !== 1 ? "s" : ""} selected for campaign
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back to Basics
        </button>
        <button
          onClick={onNext}
          disabled={data.selectedProducts.length === 0}
          className="text-sm bg-[#3E3EDF] text-white px-5 py-2 rounded-lg hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Budget &amp; Offers →
        </button>
      </div>
    </div>
  );
}

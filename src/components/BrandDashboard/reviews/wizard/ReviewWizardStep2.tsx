"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { MdSearch, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

import img1 from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import img7 from "@/app/assets/saved/8380003.jpg";
import img8 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";

export interface ReviewStep2Data {
  selectedProducts: string[];
}

const PRODUCTS: { id: string; name: string; category: string; price: string; img: StaticImageData }[] = [
  { id: "p1", name: "Aura Ceramic Vase", category: "Home Decor", price: "$34.99", img: img1 },
  { id: "p2", name: "Delfin: Step Runner", category: "Footwear", price: "$89.00", img: img2 },
  { id: "p3", name: "Zenith Wireless Audio", category: "Electronics", price: "$129.00", img: img3 },
  { id: "p4", name: "Retro: Scope X1", category: "Electronics", price: "$65.00", img: img4 },
  { id: "p5", name: "Oracle Summer", category: "Nathan Accessories", price: "$45.00", img: img5 },
  { id: "p6", name: "Vital Essence Serum", category: "Health & Beauty", price: "$58.00", img: img6 },
  { id: "p7", name: "Chronus Smart More", price: "$199.00", category: "Orbit Tec", img: img7 },
  { id: "p8", name: "Vendant Office Suite", category: "Supported Labs", price: "$55.00", img: img8 },
];

interface Props {
  data: ReviewStep2Data;
  onChange: (d: ReviewStep2Data) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ReviewWizardStep2({ data, onChange, onNext, onBack }: Props) {
  const [search, setSearch] = useState("");

  const toggle = (id: string) => {
    const sel = data.selectedProducts.includes(id)
      ? data.selectedProducts.filter((x) => x !== id)
      : [...data.selectedProducts, id];
    onChange({ selectedProducts: sel });
  };

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-[500px]">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Select Products</h2>
        <p className="text-sm text-gray-400 mt-1">
          Choose which products reviewers will be asked about in this campaign.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]/30"
        />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[380px] pr-1 flex-1">
        {filtered.map((p) => {
          const selected = data.selectedProducts.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`relative rounded-2xl border-2 p-3 text-left transition hover:shadow-md ${
                selected
                  ? "border-[#3E3EDF] bg-[#EEF0FF]/50"
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
              <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2">
                <Image src={p.img} alt={p.name} fill className="object-cover" />
              </div>
              <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">{p.name}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{p.category}</p>
              <p className="text-xs font-bold text-[#3E3EDF] mt-0.5">{p.price}</p>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        {data.selectedProducts.length} product{data.selectedProducts.length !== 1 ? "s" : ""} selected
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 font-medium">
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={data.selectedProducts.length === 0}
          className="text-sm bg-[#3E3EDF] text-white px-6 py-2.5 rounded-xl hover:bg-[#3232c0] font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue to Budget →
        </button>
      </div>
    </div>
  );
}

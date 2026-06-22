"use client";

import Link from "next/link";
import { MdAdd } from "react-icons/md";
import ProductCard, { Product } from "./ProductCard";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";

const products: Product[] = [
  {
    id: 1,
    name: "Kettle Sea Salt Chips",
    status: "ACTIVE",
    campaigns: 2,
    tags: ["Snacks", "Cashback"],
    rating: 4.5,
    company: "Company 1",
    campaignType: "Rebate",
    image: rect,
  },
  {
    id: 2,
    name: "Nitro Cold Brew",
    status: "ACTIVE",
    campaigns: 1,
    tags: ["Coffee", "Rebate"],
    rating: 4.2,
    company: "Company 1",
    campaignType: "Review",
    image: img2,
  },
  {
    id: 3,
    name: "Wild Berry Trail Mix",
    status: "ACTIVE",
    campaigns: 2,
    tags: ["Snacks", "Rebate"],
    rating: 4.0,
    company: "Company 2",
    campaignType: "Rebate",
    image: null,
    bgColor: "bg-gradient-to-br from-purple-400 to-pink-400",
  },
  {
    id: 4,
    name: "Zesty Lime Sparkler",
    status: "ACTIVE",
    campaigns: 1,
    tags: ["Beverages", "New"],
    rating: 4.3,
    company: "Company 2",
    campaignType: "Rebate",
    image: null,
    bgColor: "bg-gradient-to-br from-teal-400 to-cyan-400",
  },
  {
    id: 5,
    name: "Honey Almond Granola",
    status: "INACTIVE",
    campaigns: 0,
    tags: ["Snacks"],
    rating: 3.8,
    company: "Company 1",
    campaignType: "None",
    image: null,
    bgColor: "bg-gradient-to-br from-amber-400 to-yellow-300",
  },
  {
    id: 6,
    name: "Dark Cacao Bar",
    status: "INACTIVE",
    campaigns: 1,
    tags: ["Chocolate", "Cashback"],
    rating: 4.1,
    company: "Company 3",
    campaignType: "Review",
    image: null,
    bgColor: "bg-gradient-to-br from-stone-700 to-stone-900",
  },
  {
    id: 7,
    name: "Sparkling Mango Juice",
    status: "ACTIVE",
    campaigns: 2,
    tags: ["Beverages", "Rebate"],
    rating: 4.6,
    company: "Company 2",
    campaignType: "Rebate",
    image: null,
    bgColor: "bg-gradient-to-br from-orange-400 to-yellow-400",
  },
  {
    id: 8,
    name: "Organic Green Tea",
    status: "ACTIVE",
    campaigns: 1,
    tags: ["Tea", "Organic"],
    rating: 4.4,
    company: "Company 3",
    campaignType: "Review",
    image: null,
    bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Add New Product card */}
      <Link href="/brandDashboard/productLibrary/add">
        <div className="border-2 border-dashed border-gray-300 rounded-2xl h-full min-h-[220px] flex flex-col items-center justify-center gap-3 hover:border-[#3E3EDF] hover:bg-[#EEF0FF]/40 transition cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-[#EEF0FF] flex items-center justify-center">
            <MdAdd size={26} className="text-[#3E3EDF]" />
          </div>
          <p className="text-[13px] font-semibold text-[#3E3EDF] text-center px-3">
            Add New Product
          </p>
        </div>
      </Link>
    </div>
  );
}

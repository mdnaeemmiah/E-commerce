"use client";

import { useState } from "react";
import Image from "next/image";
import { MdSearch, MdQrCode2, MdDownload, MdZoomIn, MdOpenInFull } from "react-icons/md";
import rect from "@/app/assets/dashboard/Rectangle 923.png";
import img2 from "@/app/assets/dashboard/IMG_8526[1] 1.png";
import img3 from "@/app/assets/home/image 3.png";
import img4 from "@/app/assets/home/2442F31B-698F-4BF6-BB32-6072B5FBA5AE 1.png";
import img5 from "@/app/assets/home/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1.png";
import img6 from "@/app/assets/home/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";

type Scope = "Entire Brand" | "Product Line / Collection" | "Specific Flavor / SKU";
type Style = "Playful/Punchy" | "Smart/Informative" | "Attribute-Focused" | "Add Custom Style";
type TagType = "Sticker" | "Neck Hanger" | "Shelf Talker" | "4x Postcard";

const PRODUCTS = [
  { id: "p1", name: "Pumpkin Spice Cookies", sku: "pumpkin-spice-001", img: rect },
  { id: "p2", name: "Sea Salt Brownie", sku: "sea-salt-001", img: img2 },
  { id: "p3", name: "Wild Berry Mix", sku: "wild-berry-001", img: img3 },
  { id: "p4", name: "Nitro Cold Brew", sku: "nitro-brew-001", img: img4 },
  { id: "p5", name: "Zesty Lime Sparkler", sku: "zesty-lime-001", img: img5 },
  { id: "p6", name: "Dark Cacao Bar", sku: "dark-cacao-001", img: img6 },
];

const STYLES: { key: Style; desc: string }[] = [
  { key: "Playful/Punchy", desc: "Tag of protein never felt less delicious" },
  { key: "Smart/Informative", desc: "Scan to discover rewards and product benefits." },
  { key: "Attribute-Focused", desc: "Plant-based. Non-GMO. Feel-good snacking." },
  { key: "Add Custom Style", desc: "Define your own brand voice and messaging guidelines." },
];

const TAG_TYPES: TagType[] = ["Sticker", "Neck Hanger", "Shelf Talker", "4x Postcard"];

const previewText: Record<Style, string> = {
  "Playful/Punchy": "Soft, sweet, and pumpkin spice-y, this cookie's a treat you can't resist!",
  "Smart/Informative": "Scan to discover rewards, product nutrition facts and exclusive offers.",
  "Attribute-Focused": "Plant-based. Non-GMO. 16g protein. Feel-good snacking redefined.",
  "Add Custom Style": "Your custom brand message will appear here after you define your style.",
};

export default function GeneratorTab() {
  const [scope, setScope] = useState<Scope>("Entire Brand");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>("p1");
  const [style, setStyle] = useState<Style>("Playful/Punchy");
  const [tagType, setTagType] = useState<TagType>("Shelf Talker");
  const [showAll, setShowAll] = useState(false);
  const [generated, setGenerated] = useState(false);

  const filtered = PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const visible = showAll ? filtered : filtered.slice(0, 2);
  const selectedProduct = PRODUCTS.find((p) => p.id === selected);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ─── Left: Form ─── */}
      <div className="space-y-6">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900">Tag Generator</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Configure your intelligent marketing tags for the seasonal campaign.
          </p>
        </div>

        {/* Step 01 */}
        <div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            <span className="text-[#3E3EDF]">01</span> &nbsp;Select Campaign Scope
          </p>
          <div className="space-y-2">
            {(["Entire Brand", "Product Line / Collection", "Specific Flavor / SKU"] as Scope[]).map((s) => (
              <label key={s} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${scope === s ? "border-[#3E3EDF]" : "border-gray-300"}`}>
                  {scope === s && <div className="w-2 h-2 rounded-full bg-[#3E3EDF]" />}
                </div>
                <span className="text-sm font-medium text-gray-700">{s}</span>
                <input type="radio" className="hidden" checked={scope === s} onChange={() => setScope(s)} />
              </label>
            ))}
          </div>
        </div>

        {/* Step 02 — Product Select */}
        <div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            <span className="text-[#3E3EDF]">02</span> &nbsp;Select Product
          </p>
          <div className="relative mb-3">
            <MdSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product library..."
              className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 text-sm outline-none focus:border-[#3E3EDF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={`relative rounded-xl border-2 p-2.5 text-left transition ${selected === p.id ? "border-[#3E3EDF] bg-[#EEF0FF]/40" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-2">
                  <Image src={p.img} alt={p.name} fill className="object-cover" />
                </div>
                <p className="text-xs font-semibold text-gray-800 line-clamp-1">{p.name}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{p.sku}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#3E3EDF] mt-2 hover:underline"
          >
            {showAll ? "Show Less" : `View All ${PRODUCTS.length} Products`}
          </button>

          {/* AI preview text */}
          <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
              AI-generated preview text
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">{previewText[style]}</p>
          </div>
        </div>

        {/* Step 03 */}
        <div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            <span className="text-[#3E3EDF]">03</span> &nbsp;Choose Messaging Style
          </p>
          <div className="space-y-2">
            {STYLES.map((s) => (
              <label
                key={s.key}
                className={`flex items-start gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${style === s.key ? "border-[#3E3EDF] bg-[#EEF0FF]/30" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${style === s.key ? "border-[#3E3EDF]" : "border-gray-300"}`}>
                  {style === s.key && <div className="w-2 h-2 rounded-full bg-[#3E3EDF]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.key}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
                </div>
                <input type="radio" className="hidden" checked={style === s.key} onChange={() => setStyle(s.key)} />
              </label>
            ))}
          </div>
        </div>

        {/* Step 04 */}
        <div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">
            <span className="text-[#3E3EDF]">04</span> &nbsp;Choose Tag Type
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TAG_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setTagType(t)}
                className={`py-3 text-sm font-semibold rounded-xl border transition ${tagType === t ? "bg-[#3E3EDF] text-white border-[#3E3EDF]" : "border-gray-200 text-gray-700 hover:border-[#3E3EDF] hover:text-[#3E3EDF]"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={() => setGenerated(true)}
          className="w-full bg-[#3E3EDF] text-white text-sm font-bold py-4 rounded-xl hover:bg-[#3232c0] transition"
        >
          Generate Tag Design
        </button>
      </div>

      {/* ─── Right: Live Preview ─── */}
      <div className="sticky top-6 self-start">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">
          {/* Preview header */}
          <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
            <p className="text-sm font-bold text-gray-700">Live Preview</p>
            <div className="flex gap-1.5">
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <MdZoomIn size={14} className="text-gray-400" />
              </button>
              <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                <MdOpenInFull size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Tag preview */}
          <div className="p-6 flex items-center justify-center min-h-[360px]">
            {selectedProduct ? (
              <div className="bg-gradient-to-b from-orange-500 to-amber-600 rounded-2xl w-56 overflow-hidden shadow-2xl">
                {/* Brand area */}
                <div className="relative w-full h-36 overflow-hidden">
                  <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-600/80" />
                  <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-0.5">
                    <p className="text-[9px] font-black text-orange-600 uppercase tracking-wide">
                      {tagType}
                    </p>
                  </div>
                </div>

                {/* Text area */}
                <div className="px-4 py-4 text-white">
                  <p className="text-[13px] font-black leading-tight mb-3">
                    {previewText[style]}
                  </p>
                  <div className="flex gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-[18px] font-black">16g</p>
                      <p className="text-[8px] font-bold opacity-70 uppercase">Plant Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[18px] font-black">10g</p>
                      <p className="text-[8px] font-bold opacity-70 uppercase">Fiber</p>
                    </div>
                  </div>

                  {/* QR code area */}
                  <div className="bg-white rounded-xl p-3 flex items-center gap-3">
                    <div className="w-14 h-14 bg-gray-900 rounded-lg flex items-center justify-center shrink-0">
                      <MdQrCode2 size={44} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-orange-600 uppercase tracking-wide">
                        Scan Here to
                      </p>
                      <p className="text-[9px] font-black text-orange-600 uppercase tracking-wide">
                        Learn More
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-[10px] font-black mt-3 uppercase tracking-widest opacity-70">
                    {selectedProduct.name}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <MdQrCode2 size={48} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a product to preview</p>
              </div>
            )}
          </div>

          {/* Export buttons */}
          <div className="flex gap-3 px-5 pb-5">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition">
              <MdDownload size={16} />
              Export PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition">
              <MdDownload size={16} />
              PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdCloudUpload, MdClose, MdSave } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

type TechSpec = { label: string; value: string };

type InitialData = {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  subtitle: string;
  description: string;
  aliases: string[];
  specs: TechSpec[];
};

export default function EditProductForm({ data }: { data: InitialData }) {
  const router = useRouter();

  const [productName, setProductName] = useState(data.name);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(data.status);
  const [aliases, setAliases] = useState<string[]>(data.aliases);
  const [aliasInput, setAliasInput] = useState("");
  const [flavorTags, setFlavorTags] = useState<string[]>([]);
  const [formatTags, setFormatTags] = useState<string[]>([]);
  const [flavorInput, setFlavorInput] = useState("");
  const [formatInput, setFormatInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [specs, setSpecs] = useState<TechSpec[]>(data.specs);

  const addTag = (
    input: string,
    setInput: (v: string) => void,
    tags: string[],
    setTags: (v: string[]) => void
  ) => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) setTags([...tags, trimmed]);
    setInput("");
  };

  const removeTag = (tag: string, tags: string[], setTags: (v: string[]) => void) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) setImagePreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const updateSpec = (index: number, field: "label" | "value", val: string) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: val } : s)));
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-gray-400 flex items-center gap-1">
        <span
          className="cursor-pointer hover:text-[#3E3EDF]"
          onClick={() => router.push("/brandDashboard/productLibrary")}
        >
          Product Library
        </span>
        <span>/</span>
        <span
          className="cursor-pointer hover:text-[#3E3EDF]"
          onClick={() => router.push(`/brandDashboard/productLibrary/${data.id}`)}
        >
          {data.name}
        </span>
        <span>/</span>
        <span className="text-gray-700 font-medium">Edit</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-gray-900">Edit Product</h1>
        {/* Status toggle */}
        <button
          onClick={() => setStatus((s) => (s === "ACTIVE" ? "INACTIVE" : "ACTIVE"))}
          className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition ${
            status === "ACTIVE"
              ? "bg-[#3E3EDF] text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {status}
        </button>
      </div>

      {/* Product Identity */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-[13px] font-bold text-[#3E3EDF] uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#3E3EDF] text-white text-[10px] flex items-center justify-center font-bold">
            1
          </span>
          Product Identity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Product Imagery
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleImageDrop}
              className={`border-2 border-dashed rounded-xl h-44 flex flex-col items-center justify-center gap-2 transition ${
                dragOver ? "border-[#3E3EDF] bg-[#EEF0FF]/40" : "border-gray-200 bg-gray-50"
              }`}
            >
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-contain rounded-xl p-2"
                />
              ) : (
                <>
                  <MdCloudUpload size={32} className="text-gray-300" />
                  <p className="text-[12px] text-gray-400 text-center px-4">
                    Drag and drop to replace image
                  </p>
                  <label className="cursor-pointer text-[12px] font-semibold text-[#3E3EDF] border border-[#3E3EDF] px-4 py-1.5 rounded-lg hover:bg-[#EEF0FF] transition">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          {/* OCR Aliases */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              OCR Aliases
            </label>
            <p className="text-[11px] text-gray-400 mb-3">
              Aliases help the OCR engine accurately match items from retailer receipts.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {aliases.map((alias, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 bg-[#EEF0FF] text-[#3E3EDF] text-[11px] font-medium px-2.5 py-1 rounded-full"
                >
                  {alias}
                  <button onClick={() => removeTag(alias, aliases, setAliases)}>
                    <MdClose size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={aliasInput}
                onChange={(e) => setAliasInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && addTag(aliasInput, setAliasInput, aliases, setAliases)
                }
                placeholder="Type alias and press Enter"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[12px] outline-none focus:border-[#3E3EDF]"
              />
              <button
                onClick={() => addTag(aliasInput, setAliasInput, aliases, setAliases)}
                className="bg-[#3E3EDF] text-white px-3 py-2 rounded-lg text-[12px] font-semibold hover:bg-[#3232c0]"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Product Name */}
        <div className="mt-5">
          <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#3E3EDF] transition"
          />
        </div>

        {/* Subtitle */}
        <div className="mt-4">
          <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Subtitle / Variant
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#3E3EDF] transition"
          />
        </div>

        {/* Product Description */}
        <div className="mt-4">
          <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#3E3EDF] transition resize-none"
          />
        </div>
      </div>

      {/* Core Attributes */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-[13px] font-bold text-[#3E3EDF] uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#3E3EDF] text-white text-[10px] flex items-center justify-center font-bold">
            2
          </span>
          Core Attributes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Category
            </label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#3E3EDF] appearance-none bg-white">
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="chocolate">Chocolate</option>
                <option value="tea">Tea & Coffee</option>
                <option value="organic">Organic</option>
              </select>
              <FiChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Sub-Category */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Sub-Category
            </label>
            <div className="relative">
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[13px] outline-none focus:border-[#3E3EDF] appearance-none bg-white">
                <option value="beverages">Beverages</option>
                <option value="juice">Juice</option>
                <option value="sparkling">Sparkling Water</option>
                <option value="energy">Energy Drinks</option>
                <option value="coffee">Cold Brew Coffee</option>
              </select>
              <FiChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Flavor */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Flavor
            </label>
            <div className="border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#3E3EDF] transition">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {flavorTags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-[#EEF0FF] text-[#3E3EDF] text-[11px] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag, flavorTags, setFlavorTags)}>
                      <MdClose size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={flavorInput}
                onChange={(e) => setFlavorInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  addTag(flavorInput, setFlavorInput, flavorTags, setFlavorTags)
                }
                placeholder="Eg: Vanilla, Berry, Citrus"
                className="w-full text-[12px] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-[12px] font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Format
            </label>
            <div className="border border-gray-200 rounded-xl px-3 py-2 focus-within:border-[#3E3EDF] transition">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {formatTags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-[#EEF0FF] text-[#3E3EDF] text-[11px] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag, formatTags, setFormatTags)}>
                      <MdClose size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={formatInput}
                onChange={(e) => setFormatInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  addTag(formatInput, setFormatInput, formatTags, setFormatTags)
                }
                placeholder="Eg: Jar, Box, Bottle"
                className="w-full text-[12px] outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-[13px] font-bold text-[#3E3EDF] uppercase tracking-wider mb-5 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#3E3EDF] text-white text-[10px] flex items-center justify-center font-bold">
            3
          </span>
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, i) => (
            <div key={i} className="space-y-1">
              <input
                type="text"
                value={spec.label}
                onChange={(e) => updateSpec(i, "label", e.target.value)}
                placeholder="Label (e.g. Flavor)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide outline-none focus:border-[#3E3EDF] bg-gray-50"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
                placeholder="Value"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] font-semibold text-gray-800 outline-none focus:border-[#3E3EDF]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pb-6">
        <button
          onClick={() => router.push(`/brandDashboard/productLibrary/${data.id}`)}
          className="flex-1 sm:flex-none sm:w-40 border border-gray-300 text-gray-600 text-[13px] font-semibold py-3 rounded-xl hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button className="flex-1 bg-[#3E3EDF] text-white text-[13px] font-semibold py-3 rounded-xl hover:bg-[#3232c0] transition flex items-center justify-center gap-2">
          <MdSave size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}

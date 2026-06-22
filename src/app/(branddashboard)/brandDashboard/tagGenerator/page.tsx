"use client";

import { useState } from "react";
import GeneratorTab from "@/components/BrandDashboard/tagGenerator/GeneratorTab";
import GalleryTab from "@/components/BrandDashboard/tagGenerator/GalleryTab";

type Tab = "Generator" | "Gallery";

export default function TagGeneratorPage() {
  const [tab, setTab] = useState<Tab>("Generator");

  return (
    <div className="p-4 md:p-6">
      {/* Tab nav */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {(["Generator", "Gallery"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition -mb-px ${
              tab === t
                ? "border-[#3E3EDF] text-[#3E3EDF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Generator" && <GeneratorTab />}
      {tab === "Gallery" && <GalleryTab />}
    </div>
  );
}

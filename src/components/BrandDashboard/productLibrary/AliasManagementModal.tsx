"use client";

import { useState } from "react";
import { MdClose, MdSmartToy } from "react-icons/md";

type Props = {
  productName: string;
  initialAliases: string[];
  onClose: () => void;
  onSave: (aliases: string[]) => void;
};

export default function AliasManagementModal({ productName, initialAliases, onClose, onSave }: Props) {
  const [aliases, setAliases] = useState<string[]>(initialAliases);
  const [input, setInput] = useState("");

  const addAlias = () => {
    const trimmed = input.trim();
    if (trimmed && !aliases.includes(trimmed)) {
      setAliases([...aliases, trimmed]);
    }
    setInput("");
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter((a) => a !== alias));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-900">{productName}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <MdClose size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* AI hint */}
          <div className="flex gap-3 bg-[#EEF0FF] rounded-xl p-4">
            <MdSmartToy size={22} className="text-[#3E3EDF] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-gray-600 leading-relaxed">
              Aliases help the OCR engine accurately match items from various retailer receipts (e.g. &quot;Kettle Chips&quot; to match this specific product in your inventory).
            </p>
          </div>

          {/* Current aliases */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Current Active Aliases
            </p>
            <div className="flex flex-wrap gap-2">
              {aliases.length === 0 ? (
                <p className="text-[12px] text-gray-400">No aliases yet.</p>
              ) : (
                aliases.map((alias, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 bg-[#EEF0FF] text-[#3E3EDF] text-[12px] font-medium px-3 py-1 rounded-full"
                  >
                    {alias}
                    <button
                      onClick={() => removeAlias(alias)}
                      className="hover:text-red-500 transition"
                    >
                      <MdClose size={13} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Add new alias */}
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Add New Alias
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAlias()}
                placeholder="Type alias name..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[12px] outline-none focus:border-[#3E3EDF] transition"
              />
              <button
                onClick={addAlias}
                className="bg-[#3E3EDF] text-white text-[12px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#3232c0] transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 text-[13px] font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(aliases)}
            className="flex-1 bg-[#3E3EDF] text-white text-[13px] font-semibold py-2.5 rounded-xl hover:bg-[#3232c0] transition"
          >
            Save Aliases
          </button>
        </div>
      </div>
    </div>
  );
}

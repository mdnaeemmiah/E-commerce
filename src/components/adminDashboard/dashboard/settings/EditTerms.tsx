"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaLink, FaCode } from "react-icons/fa";
import { IoIosArrowDown, IoMdArrowBack } from "react-icons/io";

export default function EditTerms() {
    const [fontSize, setFontSize] = useState("16");
    const [color, setColor] = useState("#000000");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderlined, setIsUnderlined] = useState(false);
    const [align, setAlign] = useState("left");

    const fontSizes = ["12", "14", "16", "18", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "68", "72", "76", "80", "84", "88", "92", "96", "100"];

    const handleBold = () => setIsBold(!isBold);
    const handleItalic = () => setIsItalic(!isItalic);
    const handleUnderline = () => setIsUnderlined(!isUnderlined);
    const handleAlign = (alignment: string) => setAlign(alignment);

    const getTextStyles = () => {
        let style = `${isBold ? "font-bold" : ""} ${isItalic ? "italic" : ""} ${isUnderlined ? "underline" : ""}`;
        if (align === "left") style += " text-left";
        if (align === "center") style += " text-center";
        if (align === "right") style += " text-right";
        return style;
    };

    return (
        <div className="mt-10">
            <div className="flex items-center gap-2 mb-10">
                <Link href='/brandDashboard/settings'><IoMdArrowBack className="text-xl cursor-pointer" /></Link>
                <h2 className="text-xl font-semibold text-gray-700">
                    Terms & Conditions
                </h2>
            </div>
            <div className=" w-full bg-white shadow-md rounded-lg md:p-6 mt-10">
                {/* Toolbar */}
                <div className="flex items-center gap-1 md:gap-2 bg-indigo-600 text-white px-4 py-2 rounded-t-lg">
                    {/* Font size dropdown */}
                    <div className="relative">
                        <select
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className="appearance-none bg-indigo-700 text-white px-3 py-1 pr-6 rounded-md outline-none cursor-pointer"
                        >
                            {fontSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        <IoIosArrowDown className="absolute right-2 top-2.5 text-sm pointer-events-none" />
                    </div>

                    {/* Text style buttons */}
                    <div className="flex items-center gap-3 text-white">
                        <button onClick={handleBold} className="hover:text-gray-200">
                            <FaBold />
                        </button>
                        <button onClick={handleItalic} className="hover:text-gray-200">
                            <FaItalic />
                        </button>
                        <button onClick={handleUnderline} className="hover:text-gray-200">
                            <FaUnderline />
                        </button>
                        <button onClick={() => handleAlign("left")} className="hover:text-gray-200">
                            <FaAlignLeft />
                        </button>
                        <button onClick={() => handleAlign("center")} className="hover:text-gray-200">
                            <FaAlignCenter />
                        </button>
                        <button onClick={() => handleAlign("right")} className="hover:text-gray-200">
                            <FaAlignRight />
                        </button>
                        <button className="hover:text-gray-200">
                            <FaLink />
                        </button>
                        <button className="hover:text-gray-200">
                            <FaCode />
                        </button>
                    </div>

                    {/* Color Picker with "T" label */}
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="border-0 rounded-full cursor-pointer"
                        />
                        <span className="text-white">T</span>
                    </div>
                </div>

                {/* Textarea */}
                <textarea
                    className={`${getTextStyles()} w-full h-80 border border-gray-300 rounded-b-lg p-4 mt-0 focus:outline-none `}
                    style={{ fontSize: `${fontSize}px`, color: color }}
                    placeholder="Write your terms and conditions here..."
                ></textarea>

            </div>
            <div  className='flex justify-end'>
                <button className="flex py-3  text-center  my-15 cursor-pointer gap-2 bg-indigo-600 text-white px-20 md:px-40 rounded-md hover:bg-indigo-700 transition ">
                    Update
                </button>
            </div>
        </div>
    );
}

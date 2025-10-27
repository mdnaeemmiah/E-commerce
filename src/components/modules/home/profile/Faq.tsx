"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is GamingPrice.com?",
      answer:
        "GamingPrice lets you upload a photo of your game and instantly see its current market value, powered by PriceCharting data.",
    },
    {
      question: "How does it work?",
      answer:
        "Just upload a clear image of your game — cover, spine, cartridge, or disc. Our AI recognizes the game and pulls real-time prices directly from PriceCharting.",
    },
    {
      question: "Where do the prices come from?",
      answer:
        "All price estimates are sourced from PriceCharting.com, one of the most trusted databases for retro and modern video game values.",
    },
    {
      question: "What conditions are supported?",
      answer: `You’ll get prices for all common conditions:\nLoose (cartridge or disc only)\nComplete in Box (CIB)\nSealed (brand new)`,
    },
    {
      question: "How often is data updated?",
      answer:
        "Prices are refreshed daily to reflect the latest market trends and sales data.",
    },
    {
      question: "Can I upload multiple games or lots?",
      answer:
        "Yes! You can upload photos showing single games or full lots — our AI will detect and value them individually.",
    },
    {
      question: "Can I trust the results?",
      answer:
        "Yes — every estimate is pulled directly from verified PriceCharting data and analyzed with AI image recognition for best accuracy.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes. It’s free for now. In the future, we might add a small paid plan to help cover AI and data costs—it will stay affordable.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" py-10 px-4 md:px-14 lg:px-8">
      <div className="md:max-w-4xl lg:max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold  text-black mb-10">
         FAQ
        </h1>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black shadow-2xl rounded-xl p-4 sm:p-6 transition-all duration-200"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <h2 className="text-lg sm:text-xl font-medium">{item.question}</h2>
                <span className="ml-4">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeIndex === index && (
                <p className="text-sm sm:text-base text-gray-400 mt-3 whitespace-pre-line">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/fake1.jpg",
  "/fake2.jpg",
  "/fake3.jpg",
  "/fake4.jpg",
  "/fake5.jpg",
];

export default function Slider() {
  const [current, setCurrent] = useState(2);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden">
      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 z-10 bg-white/70 hover:bg-white px-3 py-2 rounded-full shadow-md text-2xl"
      >
        ‹
      </button>

      {/* Image Container */}
      <div className="relative flex items-center justify-center w-full transition-transform duration-700 ease-in-out">
        {images.map((src, index) => {
          // distance from the current (center) image
          const offset = index - current;

          // Make sure it wraps properly at array edges
          const realOffset =
            offset < -Math.floor(images.length / 2)
              ? offset + images.length
              : offset > Math.floor(images.length / 2)
              ? offset - images.length
              : offset;

          // Positioning logic
          const translateX = realOffset * 220; // spacing between images
          const scale = realOffset === 0 ? 1.25 : 0.9;
          const opacity = realOffset === 0 ? 1 : 0.5;
          const zIndex = realOffset === 0 ? 10 : 5;

          return (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <Image
                src={src}
                alt={`carousel-${index}`}
                width={300}
                height={300}
                className="rounded-xl shadow-lg object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 z-10 bg-white/70 hover:bg-white px-3 py-2 rounded-full shadow-md text-2xl"
      >
        ›
      </button>
    </div>
  );
}

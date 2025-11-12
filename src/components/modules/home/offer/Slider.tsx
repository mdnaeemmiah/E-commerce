// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";

// import img1 from "@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
// import img2 from "@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";

// const offers = [
//   {
//     id: 1,
//     title: "Tech Essentials Sale",
//     image: img1,
//     expiration: "2025-02-28",
//     claimUrl: "#",
//     discount: "20%",
//     rating: 4.0,
//     reviews: 100,
//   },
//   {
//     id: 2,
//     title: "Happy Meal Deal",
//     image: img2,
//     expiration: "2025-01-30",
//     claimUrl: "#",
//     discount: "10%",
//     rating: 4.5,
//     reviews: 85,
//   },
//   {
//     id: 3,
//     title: "Gadget Master Deal",
//     image: img1,
//     expiration: "2025-03-15",
//     claimUrl: "#",
//     discount: "15%",
//     rating: 3.8,
//     reviews: 120,
//   },
//   {
//     id: 4,
//     title: "Winter Gear Sale",
//     image: img2,
//     expiration: "2025-11-20",
//     claimUrl: "#",
//     discount: "30%",
//     rating: 4.2,
//     reviews: 98,
//   },
//   {
//     id: 5,
//     title: "Smart Home Deals",
//     image: img1,
//     expiration: "2025-09-15",
//     claimUrl: "#",
//     discount: "25%",
//     rating: 4.1,
//     reviews: 75,
//   },
// ];

// export default function Slider() {
//   const visibleCards = 3;

//   // duplicate slides to create seamless infinite effect
//   const slides = [...offers, ...offers.slice(0, visibleCards)];
//   const [index, setIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(true);

//   // ✅ circular effect (infinite chain)
//   const nextSlide = () => {
//     if (index < offers.length - 1) { // Check if it's not the last slide
//       setIndex((prev) => prev + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (index > 0) { // Check if it's not the first slide
//       setIndex((prev) => prev - 1);
//     }
//   };

//   // handle transition reset when reaching cloned slides
//   useEffect(() => {
//     if (index === offers.length) {
//       const timer = setTimeout(() => {
//         setIsTransitioning(false);
//         setIndex(0);
//         setTimeout(() => setIsTransitioning(true), 20);
//       }, 500);
//       return () => clearTimeout(timer);
//     }
//   }, [index]);

//   return (
//     <div className="relative flex items-center justify-center py-4 overflow-hidden">
//       {/* Left Arrow */}
// <button
//   onClick={prevSlide}

//   className="absolute left-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-700 transition"
// >
//   <ChevronLeft size={20} />
// </button>

//       {/* Cards Container */}
//       <div
//         className={`flex gap-6 ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
//         style={{
//           transform: `translateX(-${index * (100 / visibleCards)}%)`,
//           width: `${(slides.length / visibleCards) * 100}%`,
//         }}
//       >
//         {slides.map((offer, i) => (
//           <div
//             key={i}
//             className="flex-shrink-0 w-2/6 md:w-[20%] lg:w-[20%] text-white overflow-hidden shadow-xl p-4 rounded-2xl"
//           >
//             <div className="relative">
//               <Image
//                 src={offer.image}
//                 alt={offer.title}
//                 width={300}
//                 height={300}
//                 className="rounded-t-xl object-cover w-full"
//               />
//               <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 text-sm font-semibold rounded-md">
//                 {offer.discount} OFF
//               </div>
//             </div>

//   <div className="pt-4 flex flex-col justify-center">
//     <div className="flex justify-between mb-2">
//       <p className="text-gray-500 text-sm">Beast By</p>
//       <p className="text-gray-500 text-sm">Expires {offer.expiration}</p>
//     </div>
//     <h3 className="text-[18px] mt-2 font-semibold text-[#2D2D2D] mb-1">{offer.title}</h3>
//     <h3 className="flex items-center gap-1 mb-2">
//       <div className="flex items-center gap-1 mb-1 text-[20px]">
//         <FaStar className="text-[#FF9F19]" />
//         <FaStar className="text-[#FF9F19]" />
//         <FaStar className="text-[#FF9F19]" />
//         <FaStar className="text-[#FF9F19]" />
//       </div>
//       <span className="font-semibold ml-2 text-black">{offer.rating}</span>
//       <span className="text-[#575757]">({offer.reviews})</span>
//     </h3>
//     <div className="flex">
//       <div className="grid grid-cols-2 gap-2 w-full">
//         <div>
//           <Link
//             href={offer.claimUrl}
//             className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg"
//           >
//             Claim offer
//           </Link>
//         </div>
//         <div>
//           <Link
//             href={`/offer/fashion/${offer?.id}`}
//             className="flex items-center justify-center mt-3 border border-[#3E3EDF] text-black hover:bg-indigo-600 hover:text-white px-1 py-2 rounded-lg"
//           >
//             View Offer
//           </Link>
//         </div>
//       </div>
//     </div>
//  </div>
// </div>
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         onClick={nextSlide}

//         className="absolute right-4 z-10 bg-neutral-800 text-white p-2 rounded-full hover:bg-neutral-700 transition"
//       >
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// }




import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

import img1 from "@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
import img2 from "@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: "Tech Essentials Sale",
    image: img1,
    expiration: "2025-02-28",
    claimUrl: "#",
    discount: "20%",
    rating: 4.0,
    reviews: 100,
  },
  {
    id: 2,
    title: "Happy Meal Deal",
    image: img2,
    expiration: "2025-01-30",
    claimUrl: "#",
    discount: "10%",
    rating: 4.5,
    reviews: 85,
  },
  {
    id: 3,
    title: "Gadget Master Deal",
    image: img1,
    expiration: "2025-03-15",
    claimUrl: "#",
    discount: "15%",
    rating: 3.8,
    reviews: 120,
  },
  {
    id: 4,
    title: "Winter Gear Sale",
    image: img2,
    expiration: "2025-11-20",
    claimUrl: "#",
    discount: "30%",
    rating: 4.2,
    reviews: 98,
  },
  {
    id: 5,
    title: "Smart Home Deals",
    image: img1,
    expiration: "2025-09-15",
    claimUrl: "#",
    discount: "25%",
    rating: 4.1,
    reviews: 75,
  },
];

export default function App() {
  return (
    <div className="relative py-2 overflow-hidden">
      {/* Swiper Container */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className="flex-shrink-0 text-white overflow-hidden shadow-xl p-4 rounded-xl">
              <div className="relative">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  className="rounded-t-xl object-cover w-full"
                />
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 text-sm font-semibold rounded-md">
                  {offer.discount} OFF
                </div>
              </div>

              <div className="pt-4 flex flex-col justify-center">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500 text-sm">Beast By</p>
                  <p className="text-gray-500 text-sm">Expires {offer.expiration}</p>
                </div>
                <h3 className="text-[18px] mt-2 font-semibold text-[#2D2D2D] mb-1">{offer.title}</h3>
                <h3 className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-1 mb-1 text-[20px]">
                    <FaStar className="text-[#FF9F19]" />
                    <FaStar className="text-[#FF9F19]" />
                    <FaStar className="text-[#FF9F19]" />
                    <FaStar className="text-[#FF9F19]" />
                  </div>
                  <span className="font-semibold ml-2 text-black">{offer.rating}</span>
                  <span className="text-[#575757]">({offer.reviews})</span>
                </h3>
                <div className="flex">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div>
                      <Link
                        href={offer.claimUrl}
                        className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg"
                      >
                        Claim offer
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={`/offer/fashion/${offer?.id}`}
                        className="flex items-center justify-center mt-3 border border-[#3E3EDF] text-black hover:bg-indigo-600 hover:text-white px-1 py-2 rounded-lg"
                      >
                        View Offer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Previous and Next Buttons */}
      <button
        className="absolute left-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-700 transition swiper-button-prev"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-700 transition swiper-button-next"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

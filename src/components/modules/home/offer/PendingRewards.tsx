
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaStar } from "react-icons/fa";

// import img1 from "@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
// import img2 from "@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";

// const offers = [
//   {
//     id: 1,
//     brand: "McDonald's",
//     title: "Happy Meal Deal",
//     image: img1,
//     expiration: "2024-01-30",
//     rating: 4.0,
//     reviews: 100,
//     buttonText: "Uploads Receipt",
//     buttonColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[16px]",
//     bonus: false,
//   },
//   {
//     id: 2,
//     brand: "McDonald's",
//     title: "Happy Meal Deal",
//     bonus: true,
//     image: img2,
//     expiration: "2024-01-30",
//     rating: 0,
//     reviews: 0,
//     buttonText: "Leave Review for $1",
//     buttonColor: "bg-[#FBDC40] hover:bg-yellow-500 text-black font-medium text-[16px]",
//   },
// ];

// const PendingRewards: React.FC = () => {
//   return (
//     <div className="w-[90%] mx-auto lg:container mt-20 mb-10">
//       <h2 className="text-2xl mb-4 font-semibold">Your Rewards</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {offers.map((offer) => (
//           <div
//             key={offer.id}
//             className="bg-white shadow-md hover:shadow-lg rounded-2xl flex items-center p-4 gap-4 transition-all duration-200"
//           >
//             {/* Left: Image */}
//             <div className="w-1/3 h-[150px]">
//               <Image
//                 src={offer.image}
//                 alt={offer.title}
//                 width={200}
//                 height={200}
//                 className="rounded-lg w-full h-full object-cover"
//               />
//             </div>

//             {/* Right: Details */}
//             <div className="flex flex-col h-[150px] justify-between flex-1">
//               <div>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <p>{offer.brand}</p>
//                   <p>Expires {offer.expiration}</p>
//                 </div>

//                 <h3 className="text-[18px] font-semibold text-gray-800 mt-3">
//                   {offer.title}
//                 </h3>

//                 {!offer.bonus && (
//                   <div className="flex items-center gap-2 mt-1">
//                     <div className="flex text-[#FF9F19] text-[20px] gap-1">
//                       {[...Array(4)].map((_, i) => (
//                         <FaStar key={i} />
//                       ))}
//                     </div>
//                     <span className="font-semibold text-gray-700 text-sm">
//                       {offer.rating.toFixed(2)}
//                     </span>
//                     <span className="text-gray-500 text-sm">
//                       ({offer.reviews})
//                     </span>
//                   </div>
//                 )}

//                 {offer.bonus && (
//                   <p className="text-sm text-gray-600 font-medium mt-1">
//                     Bonus Review
//                   </p>
//                 )}
//               </div>

//               {/* Button */}
//               <Link
//                 href="#"
//                 className={`mt-3  text-center py-2.5 rounded-lg text-sm ${offer.buttonColor}`}
//               >
//                 {offer.buttonText}
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingRewards;


"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import img1 from "@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
import img2 from "@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";

const offers = [
  {
    id: 1,
    brand: "McDonald's",
    title: "Happy Meal Deal",
    image: img1,
    expiration: "2024-01-30",
    rating: 4.0,
    reviews: 100,
    buttonText: "Uploads Receipt",
    buttonColor: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[16px]",
    bonus: false,
  },
  {
    id: 2,
    brand: "McDonald's",
    title: "Happy Meal Deal",
    bonus: true,
    image: img2,
    expiration: "2024-01-30",
    rating: 0,
    reviews: 0,
    buttonText: "Leave Review for $1",
    buttonColor: "bg-[#FBDC40] hover:bg-yellow-500 text-black font-medium text-[16px]",
  },
];

const PendingRewards: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto lg:container mt-20 mb-10">
      <h2 className="text-2xl mb-4 font-semibold">Your Pending Rewards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white shadow-md hover:shadow-lg rounded-2xl flex flex-col md:flex-row items-center p-4 gap-4 transition-all duration-200"
          >
            {/* Left: Image */}
            <div className="w-full md:w-1/3 h-[150px]">
              <Image
                src={offer.image}
                alt={offer.title}
                width={200}
                height={200}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>

            {/* Right: Details */}
            <div className="flex w-full flex-col h-[150px] justify-between flex-1 mt-4 md:mt-0">
              <div>
                <div className="flex justify-between text-sm text-gray-500">
                  <p>{offer.brand}</p>
                  <p>Expires {offer.expiration}</p>
                </div>

                <h3 className="text-[18px] font-semibold text-gray-800 mt-3">
                  {offer.title}
                </h3>

                {!offer.bonus && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-[#FF9F19] text-[20px] gap-1">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-700 text-sm">
                      {offer.rating.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-sm">({offer.reviews})</span>
                  </div>
                )}

                {offer.bonus && (
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    Bonus Review
                  </p>
                )}
              </div>

              {/* Button */}
              <Link
                href="#"
                className={`mt-3 text-center py-2.5 rounded-lg text-sm ${offer.buttonColor}`}
              >
                {offer.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRewards;

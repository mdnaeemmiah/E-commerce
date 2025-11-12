
// "use client";

// import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png';
// import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Pagination from '@/components/modules/shared/Pagination';
// import { FaStar } from 'react-icons/fa';

// const offers = [
//     {
//         id: 1,
//         title: 'Tech Essentials Sale',
//         image: img2,
//         expiration: '2025-02-28',
//         claimUrl: '#',
//         discount: '20%',
//         rating: 4.0,
//         reviews: 100
//     },
//     {
//         id: 2,
//         title: 'Happy Meal Deal',
//         image: img1,
//         expiration: '2025-01-30',
//         claimUrl: '#',
//         discount: '10%',
//         rating: 4.5,
//         reviews: 85
//     },
//     {
//         id: 3,
//         title: 'Gadget Master Deal',
//         image: img2,
//         expiration: '2025-03-15',
//         claimUrl: '#',
//         discount: '15%',
//         rating: 3.8,
//         reviews: 120
//     },
//     {
//         id: 4,
//         title: 'Winter Gear Sale',
//         image: img2,
//         expiration: '2025-11-20',
//         claimUrl: '#',
//         discount: '30%',
//         rating: 4.2,
//         reviews: 98
//     },
//     {
//         id: 5,
//         title: 'Smart Home Deals',
//         image: img1,
//         expiration: '2025-09-15',
//         claimUrl: '#',
//         discount: '25%',
//         rating: 4.1,
//         reviews: 75
//     },
//     {
//         id: 6,
//         title: 'Fashion Accessories Sale',
//         image: img2,
//         expiration: '2025-07-30',
//         claimUrl: '#',
//         discount: '40%',
//         rating: 3.9,
//         reviews: 65
//     },
//     {
//         id: 7,
//         title: 'Back to School Offer',
//         image: img1,
//         expiration: '2025-08-01',
//         claimUrl: '#',
//         discount: '50%',
//         rating: 4.3,
//         reviews: 110
//     },
//     {
//         id: 8,
//         title: 'Kitchen Essentials',
//         image: img2,
//         expiration: '2025-10-05',
//         claimUrl: '#',
//         discount: '20%',
//         rating: 4.4,
//         reviews: 90
//     },
//     {
//         id: 9,
//         title: 'Outdoor Adventure Sale',
//         image: img1,
//         expiration: '2025-06-15',
//         claimUrl: '#',
//         discount: '18%',
//         rating: 4.2,
//         reviews: 140
//     },
//     {
//         id: 10,
//         title: 'Fitness Gear Discounts',
//         image: img2,
//         expiration: '2025-12-01',
//         claimUrl: '#',
//         discount: '10%',
//         rating: 4.0,
//         reviews: 50
//     }
// ];

// const Food: React.FC = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 4;

//     // Calculate the total number of pages
//     const totalPages = Math.ceil(offers.length / itemsPerPage);

//     // Get the offers for the current page
//     const currentOffers = offers.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     // Handle page change
//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div className="mx-auto rounded-2xl flex flex-col items-center mb-10">

//             {/* Dynamically render the offers from the array */}
//             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  justify-center gap-6">
//                 {currentOffers.map((offer) => (
//                     <div key={offer.id} className="shadow-xl rounded-2xl">
//                         <div className="relative p-2">
//                             {/* Image */}
//                             <Image src={offer.image} alt={offer.title} width={398} height={337} className="rounded-lg" />
//                             {/* Discount text */}
//                             <div className="absolute top-4 right-4 w-20 h-8 text-center items-center justify-center flex bg-red-500 text-white font-bold text-sm p-2 rounded-md">
//                                 {offer.discount} OFF
//                             </div>
//                         </div>
//                         <div className="pl-5 p-4 flex flex-col justify-center">
//                             <div className="flex justify-between mb-2">
//                                 <p className="text-gray-500 text-sm">Beast By</p>
//                                 <p className="text-gray-500 text-sm">Expires {offer.expiration}</p>
//                             </div>
//                             <h3 className="text-[18px] mt-2 font-semibold text-[#2D2D2D] mb-1">{offer.title}</h3>
//                             <h3 className="flex items-center gap-1 mb-2">
//                                 <div className="flex items-center gap-1 mb-1 text-[20px]">
//                                     <FaStar className="text-[#FF9F19] " />
//                                     <FaStar className="text-[#FF9F19]" />
//                                     <FaStar className="text-[#FF9F19]" />
//                                     <FaStar className="text-[#FF9F19]" />
//                                 </div>
//                                 <span className="font-semibold ml-2">{offer.rating}</span>
//                                 <span className="text-[#575757]">({offer.reviews})</span>
//                             </h3>
//                             <div className="flex">
//                                 <div className="grid grid-cols-12 gap-2 w-full">
//                                     <div className="col-span-7 ">
//                                         <Link
//                                             href={offer.claimUrl}
//                                             className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg"
//                                         >
//                                             Claim offer
//                                         </Link>
//                                     </div>
//                                     <div className="col-span-5 ">
//                                         <Link
//                                             href={`/offer/food/${offer?.id}`}
//                                             className="flex items-center justify-center mt-3 border border-[#3E3EDF] text-black hover:bg-indigo-600 hover:text-white px-1 py-2 rounded-lg"
//                                         >
//                                             View Offer
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//             />
//         </div>
//     );
// };

// export default Food;





"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

// Offer Data
import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png';
import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png';

const offers = [
  {
    id: 1,
    title: 'Tech Essentials Sale',
    image: img1,
    expiration: '2025-02-28',
    claimUrl: '#',
    discount: '20%',
    rating: 4.0,
    reviews: 100,
  },
  {
    id: 2,
    title: 'Happy Meal Deal',
    image: img2,
    expiration: '2025-01-30',
    claimUrl: '#',
    discount: '10%',
    rating: 4.5,
    reviews: 85,
  },
  {
    id: 3,
    title: 'Gadget Master Deal',
    image: img1,
    expiration: '2025-03-15',
    claimUrl: '#',
    discount: '15%',
    rating: 3.8,
    reviews: 120,
  },
  {
    id: 4,
    title: 'Winter Gear Sale',
    image: img2,
    expiration: '2025-11-20',
    claimUrl: '#',
    discount: '30%',
    rating: 4.2,
    reviews: 98,
  },
  {
    id: 5,
    title: 'Smart Home Deals',
    image: img1,
    expiration: '2025-09-15',
    claimUrl: '#',
    discount: '25%',
    rating: 4.1,
    reviews: 75,
  },
];

const Food: React.FC = () => {
  return (
    <div className="relative shadow-2xl overflow-hidden">
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
            slidesPerView: 3,
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
        {offers.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className="flex-shrink-0 text-white overflow-hidden shadow-2xl p-4 rounded-xl">
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
};

export default Food;

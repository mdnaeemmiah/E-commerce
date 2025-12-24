"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ClockFading } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Pagination, Navigation } from "swiper/modules";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

// Offer Data (fallback images)
import img1 from "@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png";
import img2 from "@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png";

const All: React.FC = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value') || '';
  
  const [offers, setOffers] = useState<any[]>([]); // Initialize offers as an empty array
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [currentPage, setCurrentPage] = useState(1); // Default page for pagination
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  // Filter offers based on search value
  const filteredOffers = offers.filter((offer) => {
    if (!searchValue) return true;
    const search = searchValue.toLowerCase();
    return (
      offer.title?.toLowerCase().includes(search) ||
      offer.description?.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const res = await baseApi.get(ENDPOINTS.allCampaigns, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page: currentPage, size: 10 },
        });

        // console.log(res.data.campaigns)

        // If the response contains campaigns data
        if (Array.isArray(res.data?.campaigns)) {
          const formatted = res.data.campaigns.map((item: any) => ({
            id: item.id, // Ensure to add the unique ID
            title: item.title,
            description: item.description,
            createdAt: item.created_at?.slice(0, 10), // Assuming you want a date formatted like 'YYYY-MM-DD'
            qr_image: item.qr_image,
            total_scans: item.total_scans ?? 0,
            total_conversions: item.total_conversions ?? 0,
            conversion_rate: item.conversion_rate
              ? `${item.conversion_rate}%`
              : "0%",
            expiration: item.end_date, // Add expiration if available
            rating: 4.5, // Fallback rating for now (you can modify it based on your data)
            reviews: item.reviews ?? 0, // Assuming you have review count in your API
            image: img1, // Default fallback image
            discount: item.discount_value,
          }));

          setOffers(formatted);
          setLoading(false); // Set loading to false after data is fetched
        } else {
          toast.error("Invalid data format");
          setLoading(false);
        }
      } catch (err) {
        toast.error("Failed to fetch campaigns");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCampaigns();
  }, [currentPage]);

  // Conditional rendering based on loading and error state
  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  return (
    <div className="relative overflow-hidden shadow-2xl">
      {/* Swiper Container */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
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
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="flex-shrink-0 text-white overflow-hidden shadow-2xl p-4 rounded-xl">
                <div className="relative">
                  {/* {console.log(offers,"naeem")} */}
                  <Image
                    src={offer.image || img1} // Fallback to img1 if no image is provided
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
                    <p className="text-gray-500 text-sm">
                      Expires{" "}
                      {new Date(offer.expiration).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <h3 className="text-[18px] mt-2 font-semibold text-[#2D2D2D] mb-1">
                    {offer.title}
                  </h3>
                  <h3 className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 mb-1 text-[20px]">
                      <FaStar className="text-[#FF9F19]" />
                      <FaStar className="text-[#FF9F19]" />
                      <FaStar className="text-[#FF9F19]" />
                      <FaStar className="text-[#FF9F19]" />
                    </div>
                    <span className="font-semibold ml-2 text-black">
                      {offer.reviews}
                    </span>
                    <span className="text-[#575757]">({offer.reviews})</span>
                  </h3>
                  <div className="flex">
                    <div className="grid grid-cols-1 gap-2 w-full">
                      {/* <div>
                        <Link
                          href={offer.claimUrl || "#"} // Provide a fallback URL if not available
                          className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg"
                        >
                          Claim offer
                        </Link>
                      </div> */}
                      <div>
                        <Link
                          href={`/offer/fashion/${offer?.id}`}
                          className="flex items-center justify-center mt-3 border border-[#3E3EDF] text-black hover:bg-indigo-600 hover:text-white px-1 py-2 rounded-lg"
                        >
                          Claim offer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="text-center py-8 text-gray-600">
            {searchValue ? `No offers found for "${searchValue}"` : 'No offers available at the moment.'}
          </div>
        )}
      </Swiper>

      {/* Custom Previous and Next Buttons */}
      <button className="absolute left-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-700 transition swiper-button-prev">
        <ChevronLeft size={20} />
      </button>
      <button className="absolute right-4 z-10 bg-black text-white p-2 rounded-full hover:bg-neutral-700 transition swiper-button-next">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default All;

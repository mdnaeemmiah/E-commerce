"use client";

import { FiDownload, FiShare2, FiCopy } from "react-icons/fi";
import { PiQrCode } from "react-icons/pi";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface Campaign {
  title: string;
  description: string;
  created_at: string;
  total_scans: number;
  qr_image: string;
  total_conversions: number;
  conversion_rate: number;
}

interface CampaignResponse {
  campaigns: Campaign[];
}

export default function GenerateQr() {
  const [cards, setCards] = useState<any[]>([]);
  const [currentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    const fetchCampaigns = async () => {
      try {
        const res = await baseApi.get<CampaignResponse>(ENDPOINTS.allCampaigns, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page: currentPage, size: 10 },
        });

        // console.log('http://10.10.7.85:8001${card.qr_image}')

        // console.log("API:", res.data);

        if (Array.isArray(res.data?.campaigns)) {
          // API data → UI structure
          const formatted = res.data.campaigns.map((item: any) => ({
            title: item.title,
            subtitle: item.description,
            date: item.created_at?.slice(0, 10),
            scans: item.total_scans ?? 0,
            qr_image: item.qr_image,
            conversions: item.total_conversions ?? 0,

            rate: item.conversion_rate ? `${item.conversion_rate}%` : "0%",
          }));

          setCards(formatted);
        } else {
          toast.error("Invalid data format");
        }
      } catch (err) {
        toast.error("Failed to fetch campaigns");
      }
    };

    fetchCampaigns();
  }, [currentPage]);

  return (
    <div className="p-6 w-full mx-auto border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Generated QR Code</h2>
      <p className="text-sm text-gray-600 mb-4">
        Manage and track your campaign QR codes
      </p>

      <div className="space-y-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="border rounded-xl border-gray-300 p-4 flex flex-col sm:flex-row lg:flex-row items-start justify-between shadow-sm bg-white"
          >
     

            <div className="flex gap-4">
              <div>
                {/* {card.qr_image ? (
                  <Image
                    src={`http://10.10.7.85:8001/media/qrcodes/qrcodes/c040320f-1770-473b-983e-81fb8bfe13f1.png`}
                    alt="QR Code"
                    width={100}
                    height={100}
                  />
                ) : null} */}
                {card.qr_image ? (
                  <img
                    src={`http://10.10.7.85:8001${card.qr_image}`}
                    alt="QR Code"
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No QR Code Available</p>
                )}
              </div>

              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
                <p className="text-xs text-gray-500">Created: {card.date}</p>

                <div className="flex flex-col sm:flex-row gap-10 mt-3 text-sm">
                  <div>
                    <p className="text-gray-600">Total Scans</p>
                    <p className="font-semibold">{card.scans}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Conversions</p>
                    <p className="font-semibold">{card.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate</p>
                    <p className="font-semibold">{card.rate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end items-end flex-row md:flex-col lg:flex-row md:gap-2 mt-4 sm:mt-0">
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiDownload /> Download
              </button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiShare2 /> Share
              </button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiCopy /> Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png';
import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const offers = [
    {
        id: 9,
        title: 'Outdoor Adventure Sale',
        image: img1,
        expiration: '2025-06-15',
        claimUrl: '#',
        discount: '18%',
        rating: 4.2,
        reviews: 140
    },
    {
        id: 10,
        title: 'Fitness Gear Discounts',
        image: img2,
        expiration: '2025-12-01',
        claimUrl: '#',
        discount: '10%',
        rating: 4.0,
        reviews: 50
    }
];

const PendingRewards: React.FC = () => {


    return (
        <div className="w-[90%] mx-auto lg:container mt-20 mb-10">
           <h2 className='text-2xl mb-4 font-semibold'>Your Rewards</h2>
            {/* Dynamically render the offers from the array */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center gap-6">
                {offers.map((offer) => (
                    <div key={offer.id} className="shadow-xl rounded-2xl flex">
                        <div className="p-2">
                            {/* Image */}
                            <Image src={offer.image} alt={offer.title} width={200} height={300} className="rounded-lg h-44 md:h-40 lg:h-34 mt-4 lg:mt-3" />
                        </div>
                        <div className="pl-2 p-4 flex flex-col justify-center">
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-500 text-sm">Beast By</p>
                                <p className="text-gray-500 text-sm">Expires {offer.expiration}</p>
                            </div>
                            <h3 className="text-[18px] font-semibold text-[#2D2D2D] mb-1">{offer.title}</h3>
                            <h3>
                                <span className="font-semibold">{offer.rating}</span> ({offer.reviews})
                            </h3>
                            <div className="">
                                    <div className="col-span-7 ">
                                        <Link
                                            href={offer.claimUrl}
                                            className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg"
                                        >
                                            Uploads Receipt
                                        </Link>
                                    </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingRewards;

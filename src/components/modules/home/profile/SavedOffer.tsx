"use client"

import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png'
import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png'
import React from 'react';
import Image from 'next/image';
import { FaTag } from 'react-icons/fa'; // Importing React Icon

// Offer data
const offers = [
    {
        id: 1,
        title: 'Tech Essentials Sale',
        image: img1,
        expiration: '2025-02-28',
        claimUrl: '#',
        discount: '20%',
    },
    {
        id: 2,
        title: 'Happy Meal Deal',
        image: img2,
        expiration: '2025-01-30',
        claimUrl: '#',
        discount: '10%',
    }
];

const SavedOffer: React.FC = () => {
    return (
        <div className="p-5 md:w-[60%] lg:w-[40%] mx-auto rounded-2xl mt-4 md:mt-10 bg-white flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Saved Offers</h2>

            {/* Dynamically render the offers from the array */}
            <div className="flex flex-wrap justify-center ">
                {offers.map((offer) => (
                    <div key={offer.id} className="shadow-xl mb-10 rounded-2xl max-w-sm mx-4">
                        <div className="relative p-2">
                            {/* Image */}
                            <Image src={offer.image} alt={offer.title} width={398} height={337} className="rounded-lg" />
                            {/* Discount text */}
                            <div className="absolute top-4 right-4 w-20 h-8 text-center items-center justify-center flex bg-red-500 text-white font-bold text-sm p-2 rounded-md">
                                {offer.discount} OFF
                            </div>
                        </div>
                        <div className="pl-5 p-4 flex flex-col justify-center">
                            <div className='flex justify-between mb-4 '>
                                <p className="text-gray-500 text-sm">Beast By</p>
                                <p className="text-gray-500 text-sm">Expires {offer.expiration}</p>
                            </div>
                            <h3 className="text-xl font-semibold">{offer.title}</h3>
                            <a href={offer.claimUrl} className="flex items-center justify-center mt-3 text-white bg-indigo-600 hover:hover:bg-indigo-700 px-4 py-2 rounded-lg">
                                Claim offer
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SavedOffer;

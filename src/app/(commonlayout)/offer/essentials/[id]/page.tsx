// app/offer/fashion/[id]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';

import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png';
import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png';

interface PageProps {
    params: {
        id: string;
    };
}

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
        description: 'Save on the latest gadgets and accessories with this limited-time Tech Essentials Sale.'
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
        description: 'A delightful combo offer perfect for families looking for quick savings and convenience.'
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
        description: 'Top-rated gadgets at a discount—ideal for tech enthusiasts and early adopters.'
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
        description: 'Stay warm and stylish with deep discounts on coats, boots, and cold-weather accessories.'
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
        description: 'Upgrade your home with smart devices and automation tools at reduced prices.'
    },
    {
        id: 6,
        title: 'Fashion Accessories Sale',
        image: img2,
        expiration: '2025-07-30',
        claimUrl: '#',
        discount: '40%',
        rating: 3.9,
        reviews: 65,
        description: 'Accessorize for less—bags, jewelry, and more to complete your look.'
    },
    {
        id: 7,
        title: 'Back to School Offer',
        image: img1,
        expiration: '2025-08-01',
        claimUrl: '#',
        discount: '50%',
        rating: 4.3,
        reviews: 110,
        description: 'Great savings on supplies, backpacks, and tech essentials for the new school year.'
    },
    {
        id: 8,
        title: 'Kitchen Essentials',
        image: img2,
        expiration: '2025-10-05',
        claimUrl: '#',
        discount: '20%',
        rating: 4.4,
        reviews: 90,
        description: 'Everything you need to outfit your kitchen, from cookware to small appliances.'
    },
    {
        id: 9,
        title: 'Outdoor Adventure Sale',
        image: img1,
        expiration: '2025-06-15',
        claimUrl: '#',
        discount: '18%',
        rating: 4.2,
        reviews: 140,
        description: 'Gear up for your next trip with discounts on tents, backpacks, and outdoor essentials.'
    },
    {
        id: 10,
        title: 'Fitness Gear Discounts',
        image: img2,
        expiration: '2025-12-01',
        claimUrl: '#',
        discount: '10%',
        rating: 4.0,
        reviews: 50,
        description: 'Save on workout equipment and apparel to help you meet your fitness goals.'
    }
];

export default function Page({ params }: PageProps) {
    const offer = offers.find((o) => o.id === Number(params.id));

    if (!offer) return notFound();

    return (
        <div className='-mt-10'>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full md:w-[60%] lg:w-[40%] space-y-6">
                    {/* Brand / Title */}
                    <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800">
                        {offer.title}
                    </h1>
                    <div className='bg-white shadow-2xl '>

                        {/* Offer Banner */}
                        <div className="bg-[#3E3EDF]    text-white text-center rounded-lg py-10">
                            <h2 className="md:text-[40px] lg:text-[48px] font-bold">{offer.discount} OFF</h2>
                            <p className="text-sm">Buy, Upload & Get Reward Instantly</p>
                        </div>

                        {/* Product & Offer Card */}
                        <div className="bg-white md:px-20 lg:px-30 p-6 space-y-4 pb-10">
                            <div className="flex justify-center">
                                <Image
                                    src={offer.image}
                                    alt="Product"
                                    width={300}
                                    height={300}
                                    className="object-contain rounded-lg"
                                />
                            </div>

                            <div className="bg-white shadow-2xl mt-10 md:px-20 lg:px-30   rounded-lg p-4 text-center space-y-2 ">
                                {/* Ratings */}
                                <div className="flex items-center justify-center space-x-1">
                                    <div className="text-yellow-400 text-sm">
                                        {'⭐️'.repeat(Math.round(offer.rating))}
                                    </div>
                                    <span className="text-gray-700 text-sm font-medium">
                                        {offer.rating.toFixed(1)}
                                    </span>
                                    <span className="text-gray-500 text-sm">({offer.reviews})</span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-700">{offer?.description}</p>

                                {/* Claim Offer Button */}
                                <button className="w-full cursor-pointer bg-[#3E3EDF] text-white py-2 rounded-md hover:bg-indigo-700 transition">
                                    Claim Offer
                                </button>

                                {/* More Details */}
                                <p className="text-xs text-gray-500 mt-2">
                                    No account? You can still earn-
                                    just upload you receipt.
                                </p>
                                <button className="text-sm   text-[#3E3EDF] underline hover:text-indigo-800">
                                    More Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

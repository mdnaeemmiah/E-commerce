"use client"
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';

import img1 from '@/app/assets/saved/2CEDCEDD-EDBE-4B6B-B11F-30DBA2DCA260 1 (1).png';
import img2 from '@/app/assets/saved/457FC2B0-B590-407B-AE21-B28CDD2D4582 1 (1).png';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';


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

export default function Page() {


  const params = useParams();
  const id = Number(params.id);
  const offer = offers.find((o) => o.id === id);

  if (!offer) return notFound();

  return (
    <div className='-mt-10'>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full md:w-[60%] lg:w-[40%] space-y-6">
          {/* Brand / Title */}
          <h1 className="text-center text-2xl md:text-4xl font-semibold text-gray-800">
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
<h3 className="flex items-center justify-center gap-1 mb-2">
  <div className="flex items-center gap-1 mb-1 text-[20px]">
    <FaStar className="text-[#FF9F19] " />
    <FaStar className="text-[#FF9F19]" />
    <FaStar className="text-[#FF9F19]" />
    <FaStar className="text-[#FF9F19]" />
  </div>
  <span className="font-semibold ml-2">{offer.rating}</span>
  <span className="text-[#575757]">({offer.reviews})</span>
</h3>

                {/* Description */}
                <p className="text-sm text-gray-700">{offer?.description}</p>

                {/* Claim Offer Button */}
                <Link href='/scan'>
                  <button
                    className="w-full cursor-pointer bg-[#3E3EDF] text-white py-2 rounded-md hover:bg-indigo-700 transition"
                  >
                    Claim Offer
                  </button>
                </Link>

                {/* More Details */}
                <p className="text-xs text-gray-500 mt-2">
                  No account? You can still earn-
                  just upload you receipt.
                </p>
                <Link href={`${id}/more`}>
                  <button className="text-sm   text-[#3E3EDF] underline hover:text-indigo-800">
                    More Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* {showHistory && (
          <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          
            <div
              className="absolute inset-0 bg-black opacity-80"
              onClick={() => setShowHistory(false)}
            ></div>

         
            <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-sm shadow-lg">
              <h3 className="text-[20px] md:text-xl font-semibold mb-4 text-center">
                Enter your E-mail or Number
              </h3>

            
              <input
                type="text"
                placeholder="E-mail address or phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
              />

     
              <button className="w-full bg-[#3E3EDF] text-white py-3 rounded-lg cursor-pointer transition">
                Next
              </button>

             
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

 
              <div className="flex justify-center gap-4">
<button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full  transition">
  <Image src={img3} alt="Google" width={24} height={24} />
</button>

<button className="p-2 cursor-pointer border border-gray-300 shadow-2xl rounded-full  transition">
  <Image src={img4} alt="Apple" width={24} height={24} />
</button>
              </div>
            </div>
          </div>
        )} */}


      </div>
    </div>
  );
}

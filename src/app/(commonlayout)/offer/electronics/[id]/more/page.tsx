'use client';

import Image from 'next/image';
import img1 from '@/app/assets/auth/Ellipse 2.png';

const reviews = [
  {
    id: 1,
    name: 'Flores, Juanita',
    time: '1 Days ago',
    rating: 4,
    message:
      'Lorem ipsum dolor sit amet consectetur. Dolor volutpat tellus nunc nulla enim sit. Nunc ut pellentesque aliquet et. Nunc mattis molestie elit malesuada.',
    avatar: img1,
  },
  {
    id: 2,
    name: 'Flores, Juanita',
    time: '1 Days ago',
    rating: 4,
    message:
      'Lorem ipsum dolor sit amet consectetur. Dolor volutpat tellus nunc nulla enim sit. Nunc ut pellentesque aliquet et. Nunc mattis molestie elit malesuada.',
    avatar: img1,
  },
];

export default function Page() {
  return (
    <div className="w-full md:w-[91%] lg:w-[50%] mx-auto p-6 space-y-6 mt-10">
      <div>
        <h2 className="text-xl font-semibold">Summer Athletic Collection</h2>
        <p className="text-sm text-gray-500">Expires 2025-02-28</p>
      </div>

      <div>
        <h3 className="font-bold">Top Offer 10% OFF</h3>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 mt-2">
          <li>Step into summer with style and comfort.</li>
          <li>Get 10% OFF on Nike’s latest Summer Athletic Beast.</li>
          <li>Perfect for training, travel, and everyday movement.</li>
          <li>Hurry, this exclusive offer is valid till 28 Feb 2024.</li>
        </ol>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h4 className="font-semibold mb-2">How It Work</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>🏪 Buy this product at any participating store or online retailer.</li>
          <li>📤 Upload your receipt through NibbAI to verify your purchase.</li>
          <li>💸 Receive your instant reward directly in your Nibbl wallet.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Top Reviews</h4>

        {reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="relative w-10 h-10">
                <Image
                  src={review.avatar}
                  alt="avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-xs text-gray-400">{review.time}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="text-[#FF9F19] text-sm mb-1">
              {'⭐'.repeat(review.rating)}
            </div>

            <p className="text-sm text-gray-700">{review.message}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Your email address"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full cursor-pointer bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-medium py-2 rounded-md">
          Save My Reward
        </button>
      </div>
    </div>
  );
}

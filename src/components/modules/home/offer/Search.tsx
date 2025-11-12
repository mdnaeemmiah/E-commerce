import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <div className="flex flex-col  items-center shadow-sm bg-white border border-gray-100 mt-6 w-[90%] md:w-[90%] lg:w-[1550px] mx-auto rounded-xl">
      <div className="flex flex-row gap-4 items-center w-full px-5">
        {/* Search Input and Icon */}
        <div className="flex items-center w-full  border border-gray-100 bg-white rounded-xl overflow-hidden my-4 focus-within:ring-2 focus-within:ring-[#3E3EDF] transition-all duration-200 ">
          {/* Search Icon */}
          <div className="pl-2 md:px-4 text-gray-400">
            <FaSearch />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search Offers..."
            className="flex-1 py-3 px-4 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button className="bg-[#3E3EDF] cursor-pointer text-white font-medium py-3 px-6 sm:px-8 sm:py-3 md:px-10 md:py-3 lg:px-14  rounded-xl hover:bg-[#3434c4] transition-all duration-200 text-[16px] sm:text-base lg:text-lg">
          Search
        </button>
      </div>
    </div>
  );
}

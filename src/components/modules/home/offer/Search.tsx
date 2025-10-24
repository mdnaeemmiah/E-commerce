// import React from 'react';
// import { FaSearch } from 'react-icons/fa';

// export default function Search() {
//   return (
//     <div className="flex  flex-col items-center shadow-2xl  bg-white border border-gray-100 mt-12 w-[90%] md:w-[90%] lg:w-[1550px] mx-auto rounded-xl">
//       <div className="flex focus-within:ring-1 focus-within:ring-[#3E3EDF] items-center w-[90%] md:w-[95%] lg:w-[98%] border border-gray-100 bg-white rounded-xl  overflow-hidden my-4 focus:ring-1">
//         {/* Search Icon */}
//         <div className="px-4 text-gray-400">
//           <FaSearch />
//         </div>

//         {/* Input Field */}
//         <input
//           type="text"
//           placeholder="Search Offers..."
//           className="flex-1 py-2 px-2 text-gray-700 focus:outline-none"
//         />

//         {/* Search Button */}
//         <button className="bg-[#3E3EDF]  text-white font-medium px-6  rounded-r-xl py-4 transition-colors duration-200">
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <div className="flex flex-col items-center shadow-2xl bg-white border border-gray-100 mt-12 w-[90%] md:w-[90%] lg:w-[1550px] mx-auto rounded-xl">
      <div className="flex items-center w-[90%] md:w-[95%] lg:w-[98%] border border-gray-100 bg-white rounded-xl overflow-hidden my-4 focus-within:ring-2 focus-within:ring-[#3E3EDF] transition-all duration-200">
        {/* Search Icon */}
        <div className="px-4 text-gray-400">
          <FaSearch />
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search Offers..."
          className="flex-1 py-3 px-2 text-gray-700 focus:outline-none"
        />

        {/* Search Button */}
        <button className="bg-[#3E3EDF] text-white font-medium px-1 py-3 sm:px-8 sm:py-3 md:px-10 md:py-3 lg:px-14 lg:py-4 rounded-r-xl hover:bg-[#3434c4] transition-all duration-200 text-sm sm:text-base lg:text-lg">
          Search
        </button>
      </div>
    </div>
  );
}


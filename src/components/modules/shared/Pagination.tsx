
// "use client";

// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Using React Icons for arrows
// import { MdMoreHoriz } from 'react-icons/md'; // For the "..." dots

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
// }

// export default function Pagination({
//     currentPage,
//     totalPages,
//     onPageChange,
// }: PaginationProps) {

//     // Function to create the page numbers with ellipsis when needed
// // Function to create the page numbers with ellipsis when needed
// const getPageNumbers = () => {
//     const pages = [];
//     const delta = 2; // Number of page numbers before and after the current page
//     const start = Math.max(currentPage - delta, 1); // Change from 'let' to 'const'
//     const end = Math.min(currentPage + delta, totalPages); // Change from 'let' to 'const'

//     // Add previous page number and first page (if necessary)
//     if (start > 1) {
//         pages.push(1);
//         if (start > 2) pages.push(<MdMoreHoriz key="dots-left" />);
//     }

//     // Add the current page range
//     for (let i = start; i <= end; i++) {
//         pages.push(i);
//     }

//     // Add next page number and last page (if necessary)
//     if (end < totalPages) {
//         if (end < totalPages - 1) pages.push(<MdMoreHoriz key="dots-right" />);
//         pages.push(totalPages);
//     }

//     return pages;
// };

//     return (
//         <div className="flex justify-center items-center gap-2 mt-10">
//             {/* Back Button */}
//             <button
//                 onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`flex shadow-2xl border border-[#3E3EDF] items-center justify-center px-4 py-2 rounded-md text-gray-600 ${
//                     currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
//                 }`}
//             >
//                 <FaChevronLeft size={20} />
//                 <span className="ml-2">Back</span>
//             </button>

//             {/* Page Numbers */}
//             {getPageNumbers().map((page, index) =>
//                 typeof page === "number" ? (
//                     <button
//                         key={index}
//                         onClick={() => onPageChange(page)}
//                         className={`w-[50px] h-[50px] flex items-center justify-center rounded-full text-sm ${
//                             currentPage === page
//                                 ? "bg-indigo-600 text-white"
//                                 : "bg-white text-gray-800 border border-[#3E3EDF] hover:bg-indigo-600 hover:text-white"
//                         }`}
//                     >
//                         {page}
//                     </button>
//                 ) : (
//                     <span
//                         key={index}
//                         className="w-[50px] h-[50px] flex items-center justify-center text-gray-500"
//                     >
//                         {page}
//                     </span>
//                 )
//             )}

//             {/* Next Button */}
//             <button
//                 onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`flex shadow-2xl border border-[#3E3EDF] items-center justify-center px-4 py-2 rounded-md text-gray-600 ${
//                     currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
//                 }`}
//             >
//                 <span className="mr-2">Next</span>
//                 <FaChevronRight size={20} />
//             </button>
//         </div>
//     );
// }


"use client";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Using React Icons for arrows
import { MdMoreHoriz } from 'react-icons/md'; // For the "..." dots

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {

    // Function to create the page numbers with ellipsis when needed
    const getPageNumbers = () => {
        const pages = [];
        const delta = 2; // Number of page numbers before and after the current page
        const start = Math.max(currentPage - delta, 1); // Ensure start is >= 1
        const end = Math.min(currentPage + delta, totalPages); // Ensure end is <= totalPages

        // Add first page
        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push(<MdMoreHoriz key="dots-left" />);
        }

        // Add current range
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Add last page
        if (end < totalPages) {
            if (end < totalPages - 1) pages.push(<MdMoreHoriz key="dots-right" />);
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-10">
            {/* Back Button */}
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`flex shadow-2xl border border-[#3E3EDF] items-center justify-center px-4 py-2 rounded-md text-gray-600 ${
                    currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
            >
                <FaChevronLeft size={20} />
                <span className="ml-2">Back</span>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`w-[50px] h-[50px] flex items-center justify-center rounded-full text-sm ${
                            currentPage === page
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-800 border border-[#3E3EDF] hover:bg-indigo-600 hover:text-white"
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span
                        key={index}
                        className="w-[50px] h-[50px] flex items-center justify-center text-gray-500"
                    >
                        {page}
                    </span>
                )
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex shadow-2xl border border-[#3E3EDF] items-center justify-center px-4 py-2 rounded-md text-gray-600 ${
                    currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
                }`}
            >
                <span className="mr-2">Next</span>
                <FaChevronRight size={20} />
            </button>
        </div>
    );
}

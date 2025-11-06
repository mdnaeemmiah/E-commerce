
// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { FiX } from "react-icons/fi";
// import { IoMdArrowBack } from "react-icons/io";
// import Swal from 'sweetalert2';

// export default function FAQ() {
//     const [activeIndex, setActiveIndex] = useState<number | null>(null);
//     const [faqData, setFaqData] = useState([
//         {
//             question: "What is GamingPrice.com?",
//             answer:
//                 "GamingPrice lets you upload a photo of your game and instantly see its current market value, powered by PriceCharting data.",
//         },
//         {
//             question: "How does it work?",
//             answer:
//                 "Just upload a clear image of your game — cover, spine, cartridge, or disc. Our AI recognizes the game and pulls real-time prices directly from PriceCharting.",
//         },
//         {
//             question: "Where do the prices come from?",
//             answer:
//                 "All price estimates are sourced from PriceCharting.com, one of the most trusted databases for retro and modern video game values.",
//         },
//         {
//             question: "What conditions are supported?",
//             answer: `You’ll get prices for all common conditions:\nLoose (cartridge or disc only)\nComplete in Box (CIB)\nSealed (brand new)`,
//         },
//         {
//             question: "How often is data updated?",
//             answer:
//                 "Prices are refreshed daily to reflect the latest market trends and sales data.",
//         },
//         {
//             question: "Can I upload multiple games or lots?",
//             answer:
//                 "Yes! You can upload photos showing single games or full lots — our AI will detect and value them individually.",
//         },
//         {
//             question: "Can I trust the results?",
//             answer:
//                 "Yes — every estimate is pulled directly from verified PriceCharting data and analyzed with AI image recognition for best accuracy.",
//         },
//         {
//             question: "Is it free to use?",
//             answer:
//                 "Yes. It’s free for now. In the future, we might add a small paid plan to help cover AI and data costs—it will stay affordable.",
//         },
//     ]);

//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [editingFaq, setEditingFaq] = useState<any>(null);

//     const toggleQuestion = (index: number) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     // const handleDelete = (index: number) => {
//     //     const updatedFaqData = faqData.filter((_, i) => i !== index);
//     //     setFaqData(updatedFaqData);
//     // };

//     const handleEdit = (faq: any) => {
//         setEditingFaq(faq);
//         setIsEditModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsEditModalOpen(false);
//         setEditingFaq(null);
//     };


//         const handleDelete = (vendorId: string) => {
//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "You won't be able to revert this!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#319EE1",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Yes, delete it!"
//             }).then((result: any) => {
//                 if (result.isConfirmed) {
//                     // Remove the transaction
//                     setTransactions((prev) => prev.filter((v) => v.id !== vendorId));
    
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "Your file has been deleted.",
//                         icon: "success",
//                         confirmButtonColor: "#319EE1"
//                     });
//                 }
//             });
//         };
    

//     return (
//         <div className="py-10">
//             <div className="">
//                 <div className="flex justify-between">
//                     <div className="flex items-center gap-2 mb-10">
//                         <Link href="/adminDashboard/settings">
//                             <IoMdArrowBack className="text-xl cursor-pointer" />
//                         </Link>
//                         <h2 className="text-xl font-semibold text-gray-700">FAQ</h2>
//                     </div>
//                     <Link href="/adminDashboard/settings/addfaq">
//                         <button className="flex items-center text-center cursor-pointer gap-2 bg-indigo-600 text-white px-15 py-3 rounded-md hover:bg-indigo-700 transition">
//                             Add New FAQ
//                         </button>
//                     </Link>
//                 </div>

//                 <div className="space-y-4">
//                     {faqData.map((item, index) => (
//                         <div
//                             key={index}
//                             className="bg-white text-black shadow-xl rounded-xl p-4 sm:p-6 transition-all duration-200"
//                         >
//                             <div
//                                 className="flex justify-between items-center cursor-pointer"
//                                 onClick={() => toggleQuestion(index)}
//                             >
//                                 <h2 className="text-lg sm:text-xl font-medium">
//                                     {item.question}
//                                 </h2>
//                                 <span className="ml-4">
//                                     {activeIndex === index ? (
//                                         <FaChevronUp />
//                                     ) : (
//                                         <FaChevronDown />
//                                     )}
//                                 </span>
//                             </div>

//                             {activeIndex === index && (
//                                 <>
//                                     <p className="text-sm sm:text-base text-gray-400 mt-3 whitespace-pre-line">
//                                         {item.answer}
//                                     </p>
//                                     {/* Show Edit and Delete buttons when the FAQ is expanded */}
//                                     <div className="flex justify-end gap-2 mt-4">
//                                         <button
//                                             className="text-blue-600 hover:text-blue-800 border px-6 py-1 font-semibold rounded-md cursor-pointer"
//                                             onClick={() => handleEdit(item)}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             className="text-red-600 hover:text-red-800 border px-6 py-1 font-semibold rounded-md cursor-pointer"
//                                               onClick={() => handleDelete(item.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>


//             {/* Edit Modal */}
//             {isEditModalOpen && (
//                 <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//                     <div className="bg-white rounded-xl w-[95%] max-w-lg  p-6 relative shadow-lg">
//                         <button
//                             onClick={closeModal}
//                             className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-red-500"
//                         >
//                             <FiX size={22} />
//                         </button>

//                         <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">Edit FAQ</h2>

//                         <div className="mb-4">
//                             <label className="block text-sm">Question</label>
//                             <input
//                                 type="text"
//                                 value={editingFaq?.question}
//                                 onChange={(e) =>
//                                     setEditingFaq({
//                                         ...editingFaq,
//                                         question: e.target.value,
//                                     })
//                                 }
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-sm">Answer</label>
//                             <textarea
//                                 value={editingFaq?.answer}
//                                 onChange={(e) =>
//                                     setEditingFaq({
//                                         ...editingFaq,
//                                         answer: e.target.value,
//                                     })
//                                 }
//                                 className="w-full px-3 py-6 border border-gray-300 rounded-md"
//                             />
//                         </div>

//                         <div className="flex justify-between">
//                             <button
//                                 className="text-red-600 border px-3 rounded-md cursor-pointer"
//                                 onClick={closeModal}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer"
//                                 onClick={() => {
//                                     const updatedFaqData = faqData.map((faq) =>
//                                         faq === editingFaq ? editingFaq : faq
//                                     );
//                                     setFaqData(updatedFaqData);
//                                     closeModal();
//                                 }}
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// }


"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [faqData, setFaqData] = useState([
        {
            id: "1", // Unique ID for each FAQ
            question: "What is GamingPrice.com?",
            answer:
                "GamingPrice lets you upload a photo of your game and instantly see its current market value, powered by PriceCharting data.",
        },
        {
            id: "2",
            question: "How does it work?",
            answer:
                "Just upload a clear image of your game — cover, spine, cartridge, or disc. Our AI recognizes the game and pulls real-time prices directly from PriceCharting.",
        },
        {
            id: "3",
            question: "Where do the prices come from?",
            answer:
                "All price estimates are sourced from PriceCharting.com, one of the most trusted databases for retro and modern video game values.",
        },
        {
            id: "4",
            question: "What conditions are supported?",
            answer: `You’ll get prices for all common conditions:\nLoose (cartridge or disc only)\nComplete in Box (CIB)\nSealed (brand new)`,
        },
        {
            id: "5",
            question: "How often is data updated?",
            answer:
                "Prices are refreshed daily to reflect the latest market trends and sales data.",
        },
        {
            id: "6",
            question: "Can I upload multiple games or lots?",
            answer:
                "Yes! You can upload photos showing single games or full lots — our AI will detect and value them individually.",
        },
        {
            id: "7",
            question: "Can I trust the results?",
            answer:
                "Yes — every estimate is pulled directly from verified PriceCharting data and analyzed with AI image recognition for best accuracy.",
        },
        {
            id: "8",
            question: "Is it free to use?",
            answer:
                "Yes. It’s free for now. In the future, we might add a small paid plan to help cover AI and data costs—it will stay affordable.",
        },
    ]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<any>(null);

    const toggleQuestion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleEdit = (faq: any) => {
        setEditingFaq(faq);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        setEditingFaq(null);
    };

    // Delete FAQ with SweetAlert2 confirmation
    const handleDelete = (faqId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#319EE1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result: any) => {
            if (result.isConfirmed) {
                // Remove the FAQ with the given ID
                setFaqData((prevFaqData) => prevFaqData.filter((faq) => faq.id !== faqId));

                Swal.fire({
                    title: "Deleted!",
                    text: "The FAQ has been deleted.",
                    icon: "success",
                    confirmButtonColor: "#319EE1"
                });
            }
        });
    };

    return (
        <div className="py-10">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2 mb-10">
                        <Link href="/adminDashboard/settings">
                            <IoMdArrowBack className="text-xl cursor-pointer" />
                        </Link>
                        <h2 className="text-xl font-semibold text-gray-700">FAQ</h2>
                    </div>
                    <Link href="/adminDashboard/settings/addfaq">
                        <button className="flex items-center text-center cursor-pointer gap-2 bg-indigo-600 text-white px-15 py-3 rounded-md hover:bg-indigo-700 transition">
                            Add New FAQ
                        </button>
                    </Link>
                </div>

                {faqData.map((item, index) => (
                    <div key={item.id} className="bg-white text-black shadow-xl rounded-xl p-4 sm:p-6 transition-all duration-200">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleQuestion(index)}
                        >
                            <h2 className="text-lg sm:text-xl font-medium">{item.question}</h2>
                            <span className="ml-4">
                                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </div>

                        {activeIndex === index && (
                            <>
                                <p className="text-sm sm:text-base text-gray-400 mt-3 whitespace-pre-line">{item.answer}</p>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 border px-6 py-1 font-semibold rounded-md cursor-pointer"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800 border px-6 py-1 font-semibold rounded-md cursor-pointer"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl w-[95%] max-w-lg p-6 relative shadow-lg">
                        <button
                            onClick={closeModal}
                            className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-red-500"
                        >
                            <FiX size={22} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">Edit FAQ</h2>

                        <div className="mb-4">
                            <label className="block text-sm">Question</label>
                            <input
                                type="text"
                                value={editingFaq?.question}
                                onChange={(e) =>
                                    setEditingFaq({
                                        ...editingFaq,
                                        question: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm">Answer</label>
                            <textarea
                                value={editingFaq?.answer}
                                onChange={(e) =>
                                    setEditingFaq({
                                        ...editingFaq,
                                        answer: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-6 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="text-red-600 border px-3 rounded-md cursor-pointer"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer"
                                onClick={() => {
                                    const updatedFaqData = faqData.map((faq) =>
                                        faq === editingFaq ? editingFaq : faq
                                    );
                                    setFaqData(updatedFaqData);
                                    closeModal();
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

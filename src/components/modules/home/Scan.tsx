// "use client";
// import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { FiCamera, FiUpload, FiWatch, FiX } from "react-icons/fi";
// import { RiHomeLine } from "react-icons/ri";
// import popcorn from "@/app/assets/home/Rectangle 15.png";
// import { FaStar, FaUserFriends } from "react-icons/fa";
// import Image from "next/image";
// import { IoSend } from "react-icons/io5";
// import baseApi from "@/api/baseApi";
// import { ENDPOINTS } from "@/api/endPoints";
// import { toast } from "sonner";

// interface HistoryItem {
//   id: number;
//   title: string;
//   amount: string;
//   date: string;
//   store: string;
//   status: "Verified" | "Pending" | "Rejected" | "Bonus Earned";
//   description?: string;
// }

// const data: HistoryItem[] = [
//   {
//     id: 1,
//     title: "Rebate Verified",
//     amount: "$1.00 added to wallet",
//     store: "Whole Foods Market",
//     date: "Apr 2, 2025",
//     status: "Verified",
//   },
//   {
//     id: 2,
//     title: "Receipt Pending Review",
//     amount: "",
//     store: "Whole Foods Market",
//     date: "Apr 2, 2025",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     title: "Review Rejected",
//     amount: "$1.00",
//     store: "Whole Foods Market",
//     date: "Apr 2, 2025",
//     status: "Rejected",
//   },
//   {
//     id: 4,
//     title: "Referral Bonus",
//     amount: "$5.00 Added",
//     store: "Your friend completed their first review!",
//     date: "",
//     status: "Bonus Earned",
//   },
// ];

// const getStatusIcon = (status: string) => {
//   switch (status) {
//     case "Verified":
//       return <FaCheckCircle className="text-green-500 text-xl" />;
//     case "Pending":
//       return (
//         <FiWatch className="text-white text-xl bg-[#FF9400] rounded-full p-1 w-5 h-5" />
//       );
//     case "Rejected":
//       return <FaStar className="text-yellow-400 text-xl" />;
//     case "Bonus Earned":
//       return <FaUserFriends className="text-indigo-500 text-xl" />;
//     default:
//       return null;
//   }
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "Verified":
//       return "text-green-500";
//     case "Pending":
//       return "text-yellow-500";
//     case "Rejected":
//       return "text-red-500";
//     case "Bonus Earned":
//       return "text-indigo-500";
//     default:
//       return "";
//   }
// };

// const Scan: React.FC = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showPopup1, setShowPopup1] = useState(false);
//   const [image, setImage] = useState<File | null>(null); // State to hold the selected image
//   const [imagePreview, setImagePreview] = useState<string | null>(null); // For previewing the image
//   const [uploading, setUploading] = useState(false); // To track uploading status
//   const [receiptData, setReceiptData] = useState<any>(null); // State to hold response data after upload

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string); // Set the image preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Function to handle image removal
//   const handleImageRemove = () => {
//     setImage(null);
//     setImagePreview(null); // Reset image preview
//   };

//   // Function to handle the API call to upload the receipt
//   const handleUpload = async () => {
//     const token = localStorage.getItem("access_token");

//     if (!token) {
//       toast.error("Token not found, please login again.");
//       return;
//     }

//     if (!image) {
//       toast.error("Please select an image to upload.");
//       return;
//     }

//     setUploading(true); // Set uploading state to true

//     try {
//       // Prepare form data for the API request
//       const formData = new FormData();
//       formData.append("receipt_image", image);

//       // API request to upload the receipt image
//       const response = await baseApi.post(ENDPOINTS.receiptUpload, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log(response,"data response")

//       // Handle the response and store data
//       const data = response.data;
//       setReceiptData(data); // Store the response data
//       setImagePreview(null); // Reset the image preview
//       setImage(null); // Reset the selected image

//       toast.success("Receipt uploaded successfully!");
//     } catch (error) {
//       toast.error("Failed to upload receipt. Please try again.");
//     } finally {
//       setUploading(false); // Reset uploading state
//     }
//   };

//   return (
//     <div className="max-w-4xl lg:max-w-5xl mx-auto py-6 mt-6">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
//           Your rewards Hub
//         </h2>
//       </div>

//       {/* Pending Rebates Section */}
//       <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 ">
//         <div className="flex gap-2">
//           <FiWatch size={24} color="#3E3EDF" />
//           <h3 className="text-[18px] font-medium">Pending Rebates</h3>
//         </div>
//         <div className="space-y-4 mt-4">
//           <div className="flex justify-between items-center border-b pb-3 border-gray-300">
//             <span>Noosa 50$ Rebates</span>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//               id="upload-input"
//             />

//             {/* Button to trigger file input */}
//             {!imagePreview && (
//               <label
//                 htmlFor="upload-input"
//                 className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center"
//               >
//                 <FiUpload size={20} className="mr-2" />
//                 Upload Receipt
//               </label>
//             )}

//             {/* Preview image after selection */}
//             {imagePreview && (
//               <div className="flex items-center gap-2 mt-4">
//                 <img
//                   src={imagePreview}
//                   alt="Selected Receipt"
//                   className="w-32 h-32 object-cover rounded-lg border border-gray-200"
//                 />
//                 <button
//                   onClick={handleImageRemove}
//                   className="bg-red-500 mb-30  text-white rounded-full p-1 flex items-center justify-center"
//                 >
//                   <FiX className="" size={20} />
//                 </button>
//               </div>
//             )}

//           </div>
//           <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
//             <span>LaCroix Grapefruit</span>
//             <span className="text-[#00A671] font-semibold">
//               Receipt Verified
//             </span>
//           </div>
//           <p className="text-[#575757]">
//             Upload receipts to complete pending rebate offers.
//           </p>
//         </div>
//       </div>

//       <div className="bg-[#E8E8FF] p-4 rounded-lg shadow-md mb-6 mt-10">
//         <div className="text-center mb-2">
//           <h3 className="text-[24px] font-medium">Want to earn more?</h3>
//           <p>
//             Complete quick reviews from any verified receipt to earn an extra $1
//             per review.
//           </p>
//         </div>

//         <div className="space-y-4 mt-8">
//           {[
//             "Lacroix Grapefruit 12pk",
//             "Noosa Honey Yogurt",
//             "Driscoll Strawberries",
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center border-b pb-3 border-gray-300"
//             >
//               <span>{item}</span>
//               <button
//                 onClick={() => setShowPopup(true)}
//                 className="bg-[#3E3EDF] text-white px-4 py-2 rounded cursor-pointer"
//               >
//                 Start Review
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

// {showPopup && (
//   <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
//     {/* Overlay */}
//     <div
//       className="absolute inset-0 bg-black opacity-70"
//       onClick={() => setShowPopup(false)}
//     ></div>

//     {/* Modal */}
//     <div className="relative z-10 bg-white rounded-2xl p-6 w-full md:max-w-md lg:max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
//       {/* Chat Section */}
//       <div className="space-y-5">
//         {/* Bot message */}
//         <div className="flex flex-col items-start">
//           <p className="text-gray-700 mb-2 flex items-center gap-1">
//             <span className="text-lg">👋</span> Hey there! How did you
//             like the popcorn?
//           </p>
//           <Image
//             src={popcorn}
//             alt="Popcorn"
//             width={120}
//             height={120}
//             className="rounded-lg border border-gray-200"
//           />
//         </div>

//         {/* User reply */}
//         <div className="text-right">
//           <div className="inline-block bg-[#3E3EDF] text-white px-4 py-2 rounded-2xl shadow-sm">
//             It was delicious, and the whole bag was super fresh!
//           </div>
//         </div>

//         {/* Bot question */}
//         <div className="flex flex-col items-start">
//           <p className="text-gray-700">
//             Glad to hear it! What did you like most—taste, texture, or
//             ingredients?
//           </p>
//         </div>

//         {/* User reply */}
//         <div className="text-right">
//           <div className="inline-block bg-[#3E3EDF] text-white px-4 py-2 rounded-2xl shadow-sm">
//             Mostly the great flavor.
//           </div>
//         </div>

//         {/* Bot question */}
//         <div className="flex flex-col items-start">
//           <p className="text-gray-700">
//             Would you purchase it again or recommend it to others?
//           </p>
//         </div>

//         {/* User reply */}
//         <div className="text-right">
//           <div className="inline-block bg-[#3E3EDF] text-white px-4 py-2 rounded-2xl shadow-sm">
//             Yes, it’s a tasty and healthy snack.
//           </div>
//         </div>

//         {/* Summary Box */}
//         <div className="bg-gray-100 p-4 rounded-xl mt-4 border border-gray-200">
//           <p className="text-gray-800 text-sm mb-2 leading-relaxed">
//             The popcorn was delicious, and the whole bag tasted super
//             fresh. I also loved the great flavor. It’s a tasty and healthy
//             snack.
//           </p>
//           <button className="text-blue-600 text-sm underline hover:text-blue-800">
//             Edit
//           </button>
//         </div>

//         {/* Message Input Section */}
// <div className="mt-6 pt-4">
//   <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
//     <input
//       type="text"
//       placeholder="Write message"
//       className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
//     />
//     <button className=" text-[#2b2bd4] p-2 rounded-lg transition">
//       <IoSend className="text-xl" />
//     </button>
//   </div>
// </div>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Receipt History Section */}
//       <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 mt-10">
//         <div className="flex gap-2">
//           <RiHomeLine size={24} color="#3E3EDF" />
//           <h3 className="text-[18px] font-medium">Receipt History</h3>
//         </div>
//         <div className="space-y-4 mt-4">
//           <div className="flex justify-between items-center border-b  pb-3 border-gray-300 ">
//             <span>Noosa 50$ Rebates</span>
//             <span className="text-[#00A671] font-semibold">Verified</span>
//           </div>
//           <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
//             <span>LaCroix Grapefruit</span>
//             <span className="text-[#D7930A] font-semibold">Pending</span>
//           </div>
//           <div className="flex justify-between items-center border-b pb-3 border-gray-300 ">
//             <span>LaCroix Grapefruit</span>
//             <span className="text-[#FF5C5C] font-semibold">Rejected</span>
//           </div>
//           <p className="text-[#575757]">
//             Recent receips are shown below- view update status anytime
//           </p>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-md   p-5">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-start gap-3 border-b  border-gray-300 last:border-none py-3"
//           >
//             {getStatusIcon(item.status)}
//             <div className="flex-1">
//               <p className="text-gray-800 font-medium">{item.title}</p>
//               <p className="text-sm text-gray-600">{item.amount}</p>
//               <p className="text-sm text-gray-500">
//                 {item.store} {item.date && `- ${item.date}`}
//               </p>
//             </div>
//             <p className={`text-sm font-medium ${getStatusColor(item.status)}`}>
//               {item.status}
//             </p>
//           </div>
//         ))}

//         <button className="text-[#3E3EDF] text-[20px] font-semibold mt-3 w-full hover:underline ">
//           View Full History
//         </button>
//       </div>

//       {/* Invite Friends Section */}
//       <div className="bg-white mt-10 p-4 rounded-lg shadow-md mb-6 text-center border-gray-100 border">
//         <h3 className="text-2xl font-medium">Invite Friends, Earn $5</h3>
//         <p className="text-[#575757] mb-2">
//           Get $5 when your friend uploads their first receipt and completes $5
//           in review.
//         </p>
//         <button
//           onClick={() => setShowPopup1(true)}
//           className="bg-[#3E3EDF] text-[20px] cursor-pointer w-full text-white px-4 py-4 rounded mt-4"
//         >
//           Next
//         </button>
//       </div>

// {showPopup1 && (
//   <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
//     {/* Overlay */}
//     <div
//       className="absolute inset-0 bg-black opacity-70"
//       onClick={() => setShowPopup1(false)}
//     ></div>

//     {/* Modal */}
//     <div className="relative z-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-lg overflow-y-auto max-h-[90vh] text-center">
//       {/* Header */}
//       <h2 className="text-xl font-semibold mb-2">
//         Invite Friends, Earn $5
//       </h2>
//       <p className="text-gray-500 mb-6 text-sm">
//         Get $5 when your friend uploads their first receipt and completes
//         $5 in review.
//       </p>

//       {/* Form */}
//       <div className="space-y-4">
//         <input
//           type="text"
//           placeholder="Friend's full name"
//           className="border border-gray-300 w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
//         />
//         <input
//           type="text"
//           placeholder="E-mail address or phone number"
//           className="border border-gray-300 w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#3E3EDF]"
//         />

//         <button className="bg-[#3E3EDF] text-white w-full py-3 rounded-md hover:bg-[#2e2edf] transition duration-200">
//           Send Invite
//         </button>
//       </div>

//       {/* Close Button */}
//       <div className="text-center mt-6">
//         <button
//           onClick={() => setShowPopup1(false)}
//           className="text-gray-600 underline cursor-pointer"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Upload New Receipt Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md my-10 border-gray-100 border">
//         <h3 className="text-2xl font-semibold text-center">
//           Upload New Receipt
//         </h3>
//         <div className="flex space-x-4 mt-4 justify-center">
//           {/* Button with Camera Icon for "Take Photo" */}
//           <button className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center">
//             <FiCamera size={20} className="mr-2" /> {/* Camera Icon */}
//             Take Photo
//           </button>
//           {/* Button with Upload Icon */}
//           <button className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center">
//             <FiUpload size={20} className="mr-2" /> {/* Upload Icon */}
//             Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scan;



"use client";
import React, { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { toast } from "sonner";
import baseApi from "@/api/baseApi";
import { ENDPOINTS } from "@/api/endPoints";
import { IoSend } from "react-icons/io5";
import { RiHomeLine } from "react-icons/ri";
import Image from "next/image";
import Pagination from "../shared/Pagination";

const Scan: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [questionData, setQuestionData] = useState<any>(null);
  const [answer, setAnswer] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>(""); // For tracking current session ID
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]); // Store answered questions
  const [setCurrentQuestionIndex] = useState<number>(0); // Track the current question index
  const [rating, setRating] = useState<number | null>(null); // Rating state
  const [reviewText, setReviewText] = useState<any>(null);
  const [receiptHistory, setReceiptHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  // Load session data from local storage or start fresh
  useEffect(() => {
    const savedSession = localStorage.getItem("session_data");
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setAnsweredQuestions(parsedSession.answeredQuestions || []);
      setSessionId(parsedSession.sessionId || "");
      setQuestionData(parsedSession.questionData || null);
    }
  }, []);

  // Save session data to local storage to persist across page reloads
  useEffect(() => {
    if (sessionId) {
      const sessionData = {
        sessionId,
        answeredQuestions,
        questionData,
      };
      localStorage.setItem("session_data", JSON.stringify(sessionData));
    }
  }, [sessionId, answeredQuestions, questionData]);

  // Handle image change and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Handle receipt upload
  const handleUpload = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("receipt_image", image);

      // First API call to upload receipt
      const receiptUploadResponse = await baseApi.post(
        ENDPOINTS?.receiptUpload,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (receiptUploadResponse?.data) {
        const responseData = receiptUploadResponse.data;

        if (
          responseData?.receipt_data?.line_items &&
          responseData?.receipt_data?.line_items.length > 0
        ) {
          const payloadForAi = {
            receipt_data: responseData?.receipt_data,
          };

          // Second API call to process receipt data
          const receiptUploadAiResponse = await baseApi.post(
            "http://10.10.7.114:8001/api/receipt/upload",
            payloadForAi,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = receiptUploadAiResponse.data;
          setReceiptData(data);
          setItems(data?.products);
          setImagePreview(null);
          setImage(null);

          toast.success("Receipt uploaded successfully!");
        } else {
          toast.error("No line items found in the uploaded receipt.");
        }
      } else {
        toast.error("Failed to upload receipt image.");
      }
    } catch (error) {
      toast.error("Failed to upload receipt. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle starting the review for a selected product
  const handleStartReview = async (item: any) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    if (!receiptData) {
      toast.error("Please upload a receipt to start a review.");
      return;
    }

    const productIdentifier = item.product_name;

    if (!productIdentifier) {
      console.error(
        `Product with identifier '${productIdentifier}' not found in receipt '${receiptData.receipt_id}'`
      );
      toast.error(
        `Product '${productIdentifier}' not found in receipt '${receiptData.receipt_id}'`
      );
      return;
    }

    const payload = {
      receipt_id: receiptData.receipt_id,
      product_identifier: productIdentifier,
    };

    try {
      const response = await baseApi.post(
        "http://10.10.7.114:8001/api/review/start",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      // Reset previous session data
      setAnsweredQuestions([]);
      setSessionId(response.data.session_id);
      setQuestionData(response.data);
      setReviewText(response.data.review_text); // Initialize reviewText from response
      setShowPopup(true);
      setCurrentQuestionIndex(0); // Start from the first question
    } catch (error) {
      console.error("Error starting review:", error);
      toast.error("Failed to start the review. Please try again.");
    }
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      toast.error("Please provide an answer.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    try {
      const payload = {
        session_id: sessionId,
        answer: answer,
        rating: rating, // Include the rating in the payload if available
        review_text: reviewText, // Include review text if available
      };

      // Submit the answer to the API
      const response = await baseApi.post(
        "http://10.10.7.114:8001/api/review/answer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Store the answered question and proceed to the next one
      setAnsweredQuestions((prev) => [
        ...prev,
        { question: questionData?.question, answer: answer },
      ]);
      setAnswer(""); // Clear the answer input

      // Update the question data with the next question from the API response
      setQuestionData((prev) => ({
        ...prev,
        question: response.data.next_question, // Set the next question from the API
        question_number: prev?.question_number + 1, // Increment the question number
      }));

      // Update review text if available from the response
      if (response.data.review_text) {
        setReviewText(response.data.review_text); // Update reviewText from response
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error("Failed to submit your answer. Please try again.");
    }
  };

  const getReceiptHistory = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Token not found, please login again.");
      return;
    }

    try {
      const response = await baseApi.get(ENDPOINTS.receiptHistory, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const totalItems = response.data.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);

      // Paginate data
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setReceiptHistory(response.data.slice(start, end));
    } catch (error) {
      console.error("Error fetching wallet receipt:", error);
      toast.error("Failed to fetch wallet receipt. Please try again.");
    }
  };

  useEffect(() => {
    getReceiptHistory();
  }, [currentPage]);

  const getStatusClass = (status: any) => {
    switch (status) {
      case "approved":
        return "text-[#00A671]"; // Green for approved
      case "pending":
        return "text-[#F9A825]"; // Yellow for pending (changed for uniqueness)
      case "processed":
        return "text-[#1976D2]"; // Blue for processed
      case "rejected":
        return "text-[#FF5C5C]"; // Red for rejected
      default:
        return "text-[#575757]"; // Default gray for undefined statuses
    }
  };

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto py-6 mt-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
          Your rewards Hub
        </h2>
      </div>

      {/* Pending Rebates Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6">
        <div className="flex gap-2">
          <FiUpload size={24} color="#3E3EDF" />
          <h3 className="text-[18px] font-medium">Pending Rebates</h3>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>Noosa 50$ Rebates</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="upload-input"
            />
            {!imagePreview && (
              <label
                htmlFor="upload-input"
                className="bg-[#3E3EDF] cursor-pointer text-[20px] text-white px-4 py-2 rounded-xl flex items-center"
              >
                <FiUpload size={20} className="mr-2" />
                Upload Receipt
              </label>
            )}
            {image && !uploading && (
              <button
                onClick={handleUpload}
                className="bg-[#3E3EDF] md:ml-90 lg:ml-120 mt-26 text-white px-4 py-2 rounded-xl"
              >
                {uploading ? "Uploading..." : "Upload Receipt"}
              </button>
            )}
            {imagePreview && (
              <div className="flex items-center gap-2 mt-4">
                <Image
                  src={imagePreview}
                  alt="Selected Receipt"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={handleImageRemove}
                  className="bg-red-500 mb-30 text-white rounded-full p-1 flex items-center justify-center"
                >
                  <FiX size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center border-b pb-3 border-gray-300">
            <span>LaCroix Grapefruit</span>
            <span className="text-[#00A671] font-semibold">
              Receipt Verified
            </span>
          </div>
          <p className="text-[#575757]">
            Upload receipts to complete pending rebate offers.
          </p>
        </div>
      </div>

      {/* Want to earn more? Section */}
      <div className="bg-[#E8E8FF] p-4 rounded-lg shadow-md mb-6 mt-10">
        <div className="text-center mb-2">
          <h3 className="text-[24px] font-medium">Want to earn more?</h3>
          <p>
            Complete quick reviews from any verified receipt to earn an extra $1
            per review.
          </p>
        </div>

        <div className="space-y-4 mt-8">
          {/* Dynamically render items */}
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3 border-gray-300"
              >
                <span>{item?.product_name}</span>
                <button
                  onClick={() => handleStartReview(item)} // Pass the item as a parameter
                  className="bg-[#3E3EDF] text-white px-4 py-2 rounded cursor-pointer"
                >
                  Start Review
                </button>
              </div>
            ))
          ) : (
            <p>No items available to review yet.</p>
          )}
        </div>
      </div>

      {/* Question Popup */}
      {showPopup && questionData && (
        <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-70"
            onClick={() => setShowPopup(false)}
          ></div>

          {/* Modal */}
          <div className="relative z-10 bg-white rounded-2xl p-6 w-full md:max-w-md lg:max-w-lg shadow-xl overflow-y-auto max-h-[90vh]">
            {/* Chat Section */}
            <div className="space-y-5">
              {/* Display previous questions and answers */}
              {answeredQuestions.length > 0 &&
                answeredQuestions.map((qa, index) => (
                  <div key={index} className="items-start space-x-4 mb-4">
                    {/* Display Question */}
                    <div className="flex-1 text-left text-gray-700 font-semibold">
                      <p>{qa.question}</p>
                    </div>
                    {/* Display Answer */}
                    <div className="flex-1 text-right text-gray-700">
                      <p className="bg-[#2b2bd4] text-white px-3 py-2 rounded-xl mt-5 inline-block">
                        {qa.answer || qa.review_text}
                      </p>
                    </div>
                  </div>
                ))}

              {/* Display current question */}
              <div className="items-start space-x-4 mt-4">
                {/* Display current question */}
                <div className="flex-1 text-left text-gray-700 font-semibold">
                  <p>{questionData?.question}</p>
                </div>
              </div>

              {reviewText && (
                <div className="mt-6 pt-4 bg-gray-100 p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-800 text-sm mb-2 leading-relaxed">
                    {reviewText}
                  </p>
                  <button className="text-blue-600 text-sm underline hover:text-blue-800">
                    Edit
                  </button>
                </div>
              )}

              <div className="mt-6 pt-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-2xl w-full border-none outline-none"
                  />
                  <button
                    onClick={handleAnswerSubmit}
                    className="text-[#2b2bd4] cursor-pointer p-2 rounded-lg transition"
                  >
                    <IoSend className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Display review text when rating is provided or questions are complete */}
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-md mb-6 mt-10">
          <div className="flex gap-2">
            <RiHomeLine size={24} color="#3E3EDF" />
            <h3 className="text-[18px] font-medium">Receipt History</h3>
          </div>
          <div className="space-y-4 mt-4">
            {receiptHistory.length > 0 ? (
              receiptHistory.map((receipt, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3 border-gray-300"
                >
                  <span>{receipt.store_name}</span>
                  <span
                    className={`font-semibold ${getStatusClass(
                      receipt.status
                    )}`}
                  >
                    {receipt.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-[#575757]">No receipt history available.</p>
            )}
            <p className="text-[#575757]">
              Recent receipts are shown below - view update status anytime.
            </p>
          </div>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
           onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Scan;

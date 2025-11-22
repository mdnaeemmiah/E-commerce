
// import { FiDownload, FiShare2, FiCopy } from "react-icons/fi";
// import { PiQrCode } from "react-icons/pi";

// export default function GenerateQr() {
//   const cards = [
//     {
//       title: "Winter Sale QR",
//       subtitle: "Winter Sale – 20% Off",
//       date: "2025-01-01",
//       scans: 1247,
//       conversions: 456,
//       rate: "36.6%",
//     },
//     {
//       title: "Coffee BOGO QR",
//       subtitle: "Winter Sale – 20% Off",
//       date: "2025-01-01",
//       scans: 1567,
//       conversions: 500,
//       rate: "56.9%",
//     },
//     {
//       title: "Winter Sale QR",
//       subtitle: "Winter Sale – 20% Off",
//       date: "2025-01-01",
//       scans: 1247,
//       conversions: 456,
//       rate: "36.6%",
//     },
//   ];

//   return (
//     <div className="p-6 w-full  mx-auto border border-gray-300 rounded-lg ">
//       <h2 className="text-xl font-semibold mb-2">Generated QR Code</h2>
//       <p className="text-sm text-gray-600 mb-4">Manage and track your campaign QR codes</p>

//       <div className="space-y-4">
//         {cards.map((card, i) => (
//           <div
//             key={i}
//             className="border rounded-xl border-gray-300 p-4 flex flex-col lg:flex-row items-start justify-between shadow-sm bg-white"
//           >
//             <div className="flex gap-4">
//               <div className="">
//                 <PiQrCode className="w-16 h-16 text-gray-400" />
//               </div>
//               <div>
//                 <h3 className="font-semibold">{card.title}</h3>
//                 <p className="text-sm text-gray-600">{card.subtitle}</p>
//                 <p className="text-xs text-gray-500">Created: {card.date}</p>

//                 <div className="flex  gap-10 mt-3 text-sm">
//                   <div>
//                     <p className="text-gray-600">Total Scans</p>
//                     <p className="font-semibold">{card.scans}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Conversions</p>
//                     <p className="font-semibold">{card.conversions}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-600">Conversions</p>
//                     <p className="font-semibold">{card.rate}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-2 items-start mt-4 md:mt-6">
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"><FiDownload /> Download</button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"><FiShare2 /> Share</button>
//               <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center gap-2"><FiCopy /> Copy Link</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { FiDownload, FiShare2, FiCopy } from "react-icons/fi";
import { PiQrCode } from "react-icons/pi";

export default function GenerateQr() {
  const cards = [
    {
      title: "Winter Sale QR",
      subtitle: "Winter Sale – 20% Off",
      date: "2025-01-01",
      scans: 1247,
      conversions: 456,
      rate: "36.6%",
    },
    {
      title: "Coffee BOGO QR",
      subtitle: "Winter Sale – 20% Off",
      date: "2025-01-01",
      scans: 1567,
      conversions: 500,
      rate: "56.9%",
    },
    {
      title: "Winter Sale QR",
      subtitle: "Winter Sale – 20% Off",
      date: "2025-01-01",
      scans: 1247,
      conversions: 456,
      rate: "36.6%",
    },
  ];

  return (
    <div className="p-6 w-full mx-auto border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Generated QR Code</h2>
      <p className="text-sm text-gray-600 mb-4">Manage and track your campaign QR codes</p>

      <div className="space-y-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="border rounded-xl border-gray-300 p-4 flex flex-col sm:flex-row lg:flex-row items-start justify-between shadow-sm bg-white"
          >
            <div className="flex gap-4">
              <div className="">
                <PiQrCode className="w-16 h-16 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
                <p className="text-xs text-gray-500">Created: {card.date}</p>

                <div className="flex flex-col sm:flex-row gap-10 mt-3 text-sm">
                  <div>
                    <p className="text-gray-600">Total Scans</p>
                    <p className="font-semibold">{card.scans}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Conversions</p>
                    <p className="font-semibold">{card.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rate</p>
                    <p className="font-semibold">{card.rate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end items-end  flex-row md:flex-col lg:flex-row  md:gap-2  mt-4 sm:mt-0">
              <button className="px-2 md:px-4 py-2  border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiDownload /> Download
              </button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiShare2 /> Share
              </button>
              <button className="px-2 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm flex items-center md:gap-2 w-full sm:w-auto">
                <FiCopy /> Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

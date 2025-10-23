// import NotLogin from '@/components/modules/home/NotLogin'
import Scan from '@/components/modules/home/Scan'
import React from 'react'

export default function page() {
  return (
    <div>
      {/* <NotLogin></NotLogin> */}
      <Scan></Scan>
    </div>
  )
}



// "use client";

// import React, { useEffect, useState } from "react";
// import NotLogin from "@/components/modules/home/NotLogin";
// import Scan from "@/components/modules/home/Scan";

// export default function Page() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

//   useEffect(() => {
//     // Example: check if token exists (you can replace with your logic)
//     const token = localStorage.getItem("authToken");

//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   if (isLoggedIn === null) {
//     // Optional: show loading while checking login state
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-500">Checking login status...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {isLoggedIn ? <Scan /> : <NotLogin />}
//     </div>
//   );
// }

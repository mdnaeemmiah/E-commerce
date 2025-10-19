"use client";

import { Toaster } from "react-hot-toast";
import img1 from "@/app/assets/auth/image18.png"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img1.src})` }}
      >
        {/* ===== Main Content ===== */}
        <main className="flex-grow min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </main>
      </div>
    </>
  );
}

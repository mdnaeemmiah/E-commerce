"use client"; // Marking the component as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import Image from "next/image";
import img1 from "@/app/assets/auth/image 3 (1).png";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/welcome"); // Redirect to the "Welcome" page
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1></h1>
      <Image
        src={img1}
        alt="naeem"
        width={500}
        height={400}
      />
    </div>
  );
}

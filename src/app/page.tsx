import Image from "next/image";
import img1 from "@/app/assets/auth/image 3 (1).png"

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h2></h2>
      <Image
       src={img1}
       alt="naeem"
       width={500}
       height={400}
      ></Image>
    </div>
  );
}

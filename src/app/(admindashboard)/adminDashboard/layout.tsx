// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { usePathname } from "next/navigation"; // ✅ import usePathname
// import {
//     FaBars,
//     FaTimes,
//     FaUserCircle,
//     FaCog,
//     FaHome,
//     FaStore,
//     FaGift,
// } from "react-icons/fa";
// import img1 from "@/app/assets/auth/image3.png";
// import img2 from "@/app/assets/auth/image3.png";
// import img3 from "@/app/assets/auth/Ellipse 2.png";
// import img11 from "@/app/assets/auth/Icon.png"
// import { Toaster } from "react-hot-toast";
// import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

// export default function Layout({ children }: { children: React.ReactNode }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isNotifOpen, setIsNotifOpen] = useState(false);
//     const pathname = usePathname();


//     const notifications = [
//         {
//             id: 1,
//             name: 'Helena',
//             message: 'is uploaded new video in Halloween theme',
//             time: '8:20am',
//             avatar: img2, // use existing imported image or add more
//         },
//         {
//             id: 2,
//             name: 'Oscar',
//             message: 'is uploaded new video in Halloween theme',
//             time: '8:20am',
//             avatar: img2,
//         },
//         {
//             id: 3,
//             name: 'Daniel',
//             message: 'is uploaded new video in Halloween theme',
//             time: '8:20am',
//             avatar: img2,
//         },
//     ];


//     // ✅ Menu items list
//     const menuItems = [
//         { href: "/adminDashboard/dashboard", label: "Dashboard", icon: <FaHome /> },
//         { href: "/adminDashboard/earnings", label: "Earnings", icon: <FaUserCircle /> },
//         { href: "/adminDashboard/users", label: "Users", icon: <FaGift /> },
//         { href: "/adminDashboard/brand", label: "Brand", icon: <FaStore /> },
//         { href: "/adminDashboard/withdrawRequest", label: "Withdraw Request", icon: <FaCog /> },
//         { href: "/adminDashboard/settings", label: "Settings", icon: <FaGift /> },
//         { href: "/adminDashboard/support", label: "Support", icon: <FaGift /> },
//     ];

//     return (
//         <div className="flex min-h-screen relative text-[#575757] ">
//             {/* Sidebar */}
//             <aside
//                 className={`fixed shadow-2xl  top-0 min-h-screen left-0 w-72 lg:w-80  bg-white text-[#3E3EDF] flex flex-col justify-between p-4 z-50 transform transition-transform duration-300
//         ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//             >
//                 <div className="p-4">
//                     {/* Mobile Close Button */}
//                     <div className="flex items-center justify-between md:hidden mb-6 ">
//                         <div className="flex items-center space-x-2">
//                             <Image src={img1} alt="Logo" width={40} height={40} className="opacity-100" />
//                             {/* <h1 className="font-bold text-lg">TrekBot.AI</h1> */}
//                         </div>
//                         <button onClick={() => setIsOpen(false)}>
//                             <FaTimes size={24} className="text-red-500 hover:scale-105" />
//                         </button>
//                     </div>

//                     {/* Desktop Logo */}
//                     <div className="flex justify-center">
//                         <Image src={img1} alt="Logo" width={150} height={100} className="opacity-100" />
//                         {/* <h1 className="font-bold text-[20px]">TrekBot.AI</h1> */}
//                     </div>

//                     {/* Menu */}
//                     <nav className="space-y-2">
//                         {menuItems.map((item) => {
//                             const isActive = pathname === item.href;
//                             return (
//                                 <Link
//                                     key={item.href}
//                                     href={item.href}
//                                     className={`flex items-center gap-2 py-4 px-3 rounded-xl transition-colors duration-200
//                     ${isActive
//                                             ? "bg-[#3E3EDF] text-white font-medium"
//                                             : "hover:bg-[#3E3EDF] hover:text-white"
//                                         }`}
//                                 >
//                                     {item.icon} {item.label}
//                                 </Link>
//                             );
//                         })}
//                     </nav>
//                 </div>

//                 {/* Bottom Profile + Logout */}
//                 <div className="mt-6 p-4">
//                     <button className="mt-8 bg-gray-100 w-full  text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-200 justify-center ">
//                         <Link href="/" className="flex justify-center gap-4">
//                             <Image
//                                 src={img11}
//                                 alt="Description of the image"
//                                 width={20}
//                                 height={14}
//                             />
//                             <p className="text-[18px] font-medium text-[#FF5C5C]">Log out</p>
//                         </Link>
//                     </button>
//                 </div>
//             </aside>

//             {/* Overlay for mobile */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 md:hidden z-40"
//                     onClick={() => setIsOpen(false)}
//                 ></div>
//             )}

//             {/* Main Content */}
//             <main className="flex-1 bg-gray-50 p-2 md:p-6 w-full">
//                 {/* ✅ Topbar (mobile + desktop) */}
//                 <div className="h-20 rounded-2xl shadow-xl  md:ml-72 lg:ml-80  px-4 flex items-center justify-between  bg-red-500 ">
//                     {/* Left section: Hamburger + Profile */}
//                     <div className="flex items-center gap-4">
//                         {/* Hamburger menu (mobile only) */}
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="block md:hidden p-2 rounded-md border border-gray-300 bg-white"
//                         >
//                             <FaBars size={22} />
//                         </button>
//                     </div>

//                     <div className="h-20   bg-white w-full  px-4 items-center flex  justify-between">
//                         {/* ✅ Left: Profile section */}
//                         <div className="sm:block hidden">
//                             <h1 className="text-[#3E3EDF] text-[24px]">Welcome,Tamim </h1>
//                             <p className="text-[16px]">Have a nice day!</p>
//                         </div>

//                         {/* ✅ Right: Notification + Settings */}
//                         <div className="flex items-center gap-4">
//                             <div className="relative z-50" >
//                                 {/* 🔔 Bell Icon */}
//                                 <IoNotificationsOutline
//                                     onClick={(e) => {
//                                         e.stopPropagation(); // Prevent bubbling
//                                         setIsNotifOpen((prev) => !prev); // Toggle independently
//                                     }}
//                                     className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
//                                     size={28}
//                                 />
//                                 <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>

//                                 {/* ✅ Notification Modal */}
//                                 {isNotifOpen && (
//                                     <>
//                                         {/* Background Overlay */}
//                                         <div
//                                             className="fixed inset-0 bg-black opacity-50 z-[99]"
//                                             onClick={() => setIsNotifOpen(false)}
//                                         ></div>

//                                         {/* Popup Box */}
//                                         <div
//                                             className="fixed top-20 right-8 md:right-20 w-80 md:w-96  bg-white rounded-xl shadow-xl z-[100] p-4"
//                                             onClick={(e) => e.stopPropagation()} // Prevent closing on internal click
//                                         >
//                                             <h4 className="text-md font-semibold mb-4 text-[#E8632C]">Notifications</h4>

//                                             <div className="space-y-3 max-h-60 overflow-y-auto">
//                                                 {notifications.length > 0 ? (
//                                                     notifications.map((n) => (
//                                                         <div key={n.id} className="flex items-start gap-3 p-2">
//                                                             <div className="w-9 h-9 rounded-full overflow-hidden">
//                                                                 <Image
//                                                                     src={n.avatar}
//                                                                     alt={n.name}
//                                                                     width={36}
//                                                                     height={36}
//                                                                     className="object-cover w-full h-full rounded-full"
//                                                                 />
//                                                             </div>
//                                                             <div className="flex-1">
//                                                                 <p className="text-sm text-gray-700 leading-snug">
//                                                                     <span className="font-semibold">{n.name}</span> {n.message}
//                                                                 </p>
//                                                             </div>
//                                                             <span className="text-xs text-gray-400">{n.time}</span>
//                                                         </div>
//                                                     ))
//                                                 ) : (
//                                                     <p className="text-sm text-gray-500">No new notifications.</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                             <div className="flex gap-2">
//                                 <Image
//                                     src={img3}
//                                     alt="Dropdown Arrow"
//                                     width={40}
//                                     height={40}
//                                     className="cursor-pointer"
//                                 />
//                                 <div className="text-[14px]">
//                                     <p>Naeem</p>
//                                     <p> Admin</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//                 <div className="mt-2 overflow-y-scroll md:ml-72 lg:ml-82">
//                     <Toaster position="top-center" reverseOrder={false} />
//                     {children}
//                 </div>
//             </main>
//         </div>
//     );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    FaBars,
    FaTimes,
    FaUserCircle,
    FaCog,
    FaHome,
    FaStore,
    FaGift,
} from "react-icons/fa";
import img1 from "@/app/assets/auth/image3.png";
import img2 from "@/app/assets/auth/image3.png";
import img3 from "@/app/assets/auth/Ellipse 2.png";
import img11 from "@/app/assets/auth/Icon.png";
import { Toaster } from "react-hot-toast";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const pathname = usePathname();

    const notifications = [
        { id: 1, name: 'Helena', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
        { id: 2, name: 'Oscar', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
        { id: 3, name: 'Daniel', message: 'uploaded a new video in Halloween theme', time: '8:20am', avatar: img2 },
    ];

    // Menu items list
    const menuItems = [
        { href: "/adminDashboard/dashboard", label: "Dashboard", icon: <FaHome /> },
        { href: "/adminDashboard/earnings", label: "Earnings", icon: <FaUserCircle /> },
        { href: "/adminDashboard/users", label: "Users", icon: <FaGift /> },
        { href: "/adminDashboard/brand", label: "Brand", icon: <FaStore /> },
        { href: "/adminDashboard/withdrawRequest", label: "Withdraw Request", icon: <FaCog /> },
        { href: "/adminDashboard/settings", label: "Settings", icon: <FaGift /> },
        { href: "/adminDashboard/support", label: "Support", icon: <FaGift /> },
    ];

    return (
        <div className="flex min-h-screen relative text-[#575757]">
            {/* Sidebar */}
            <aside
                className={`fixed shadow-2xl top-0 min-h-screen left-0 w-72 lg:w-80 bg-white text-[#3E3EDF] flex flex-col justify-between p-4 z-50 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="p-4">
                    {/* Mobile Close Button */}
                    <div className="flex items-center justify-between md:hidden mb-6">
                        <div className="flex items-center space-x-2">
                            <Image src={img1} alt="Logo" width={40} height={40} />
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <FaTimes size={24} className="text-red-500 hover:scale-105" />
                        </button>
                    </div>

                    {/* Desktop Logo */}
                    <div className="flex justify-center">
                        <Image src={img1} alt="Logo" width={150} height={100} />
                    </div>

                    {/* Menu */}
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 py-4 px-3 rounded-xl transition-colors duration-200
                                    ${isActive ? "bg-[#3E3EDF] text-white font-medium" : "hover:bg-[#3E3EDF] hover:text-white"}`}
                                >
                                    {item.icon} {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Profile + Logout */}
                <div className="mt-6 p-4">
                    <button className="mt-8 bg-gray-100 w-full text-blue-600 font-semibold py-3 rounded-lg hover:bg-gray-200 justify-center">
                        <Link href="/" className="flex justify-center gap-4">
                            <Image src={img11} alt="Log out icon" width={20} height={14} />
                            <p className="text-[18px] font-medium text-[#FF5C5C]">Log out</p>
                        </Link>
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 md:hidden z-40" onClick={() => setIsOpen(false)}></div>
            )}

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 p-2 md:p-6 w-full">
                {/* Topbar (mobile + desktop) */}
                <div className="h-20 rounded-2xl shadow-xl md:ml-72 lg:ml-80 px-4 flex items-center justify-between bg-white">
                    {/* Left section: Hamburger + Profile */}
                    <div className="flex items-center gap-4">
                        {/* Hamburger menu (mobile only) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="block md:hidden p-2 rounded-md border border-gray-300 bg-white"
                        >
                            <FaBars size={22} />
                        </button>
                    </div>

                    {/* Left: Profile section */}
                    <div className="sm:block hidden">
                        <h1 className="text-[#3E3EDF] text-[24px]">Welcome, Tamim</h1>
                        <p className="text-[16px]">Have a nice day!</p>
                    </div>

                    {/* Right: Notification + Settings */}
                    <div className="flex items-center gap-4">
                        <div className="relative z-50">
                            {/* Bell Icon */}
                            <IoNotificationsOutline
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNotifOpen((prev) => !prev);
                                }}
                                className="text-gray-600 bg-[#E0E0E0] rounded-full hover:text-black cursor-pointer w-10 h-10 p-2"
                                size={28}
                            />
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>

                            {/* Notification Modal */}
                            {isNotifOpen && (
                                <>
                                    <div className="fixed inset-0 bg-black opacity-50 z-[99]" onClick={() => setIsNotifOpen(false)}></div>
                                    <div className="fixed top-20 right-8 md:right-20 w-80 md:w-96 bg-white rounded-xl shadow-xl z-[100] p-4" onClick={(e) => e.stopPropagation()}>
                                        <h4 className="text-md font-semibold mb-4 text-[#E8632C]">Notifications</h4>
                                        <div className="space-y-3 max-h-60 overflow-y-auto">
                                            {notifications.length > 0 ? (
                                                notifications.map((n) => (
                                                    <div key={n.id} className="flex items-start gap-3 p-2">
                                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                                            <Image src={n.avatar} alt={n.name} width={36} height={36} className="object-cover w-full h-full rounded-full" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-700 leading-snug">
                                                                <span className="font-semibold">{n.name}</span> {n.message}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{n.time}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-gray-500">No new notifications.</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Image src={img3} alt="Dropdown Arrow" width={40} height={40} className="cursor-pointer" />
                            <div className="text-[14px]">
                                <p>Naeem</p>
                                <p>Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-2 overflow-y-scroll md:ml-72 lg:ml-80">
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </div>
            </main>
        </div>
    );
}

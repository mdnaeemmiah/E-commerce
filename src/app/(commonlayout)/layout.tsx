"use client"

import Footer from '@/components/modules/shared/Footer';
import Navbar from '@/components/modules/shared/Navbar';
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {


    return (
        <>
            <div className=''>
                <Navbar />
                <div className='min-h-screen'>
                    <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
}

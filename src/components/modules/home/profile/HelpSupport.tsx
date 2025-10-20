
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

export default function HelpSupport() {
    return (
        <div className="max-w-md mx-auto mt-40 bg-white rounded-lg shadow-lg p-6 border  border-[#E0E0E0] ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Help & Support</h2>

            <div className=" pt-4">
                <Link href='/profile/helpSupport/faq'>
                    <div className="flex justify-between items-center py-3 shadow-xl cursor-pointer px-4 rounded-2xl hover:bg-gray-200">
                        <span className="text-lg text-gray-700">FAQ</span>
                        <IoIosArrowForward className="text-gray-500 text-xl" />
                    </div>
                </Link>
                <Link href='/profile/helpSupport/contactUs'>
                    <div className="flex justify-between items-center mt-6 py-3 shadow-xl cursor-pointer px-4 rounded-2xl hover:bg-gray-200">
                        <span className="text-lg text-gray-700">Contact Us</span>
                        <IoIosArrowForward className="text-gray-500 text-xl" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

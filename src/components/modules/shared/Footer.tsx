import img1 from '@/app/assets/auth/image3.png';
import Image from 'next/image';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Newsletter */}
        <div>
          <Image src={img1} alt="Logo" width={120} height={40} />
          <p className="mt-4 text-sm">
            Sing Up News Latter To get Update Confirmation News Indice or Promotion
          </p>
          <div className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none w-full"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md">
              Sign Up
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="font-semibold mb-4">Help & support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-4">Address</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 New York City , USA</li>
            <li>📞 +254586222001445</li>
            <li>📧 imtamisnsarkar@gmail.com</li>
          </ul>

          {/* Social Icons with React Icons */}
          <div className="flex gap-4 mt-25">
            <a
              href="#"
              className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="bg-blue-800 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-900 transition"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="#"
              className="bg-sky-500 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="bg-pink-500 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />
      <p className="text-center text-sm text-gray-600">2025 Our Website AI over</p>
    </footer>
  );
}

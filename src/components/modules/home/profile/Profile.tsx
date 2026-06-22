'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import profileImg from '@/app/assets/auth/Ellipse 2.png';
import {
  MdEdit,
  MdOutlineSave,
  MdPrivacyTip,
  MdOutlineDescription,
  MdNotifications,
  MdHelpOutline,
  MdLogout,
  MdDeleteOutline,
} from 'react-icons/md';
import { FiChevronRight } from 'react-icons/fi';

const MenuItem = ({
  icon,
  label,
  onClick,
  danger = false,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-5 py-4 border-b border-gray-100 last:border-none transition ${
      danger ? 'hover:bg-red-50' : 'hover:bg-gray-50'
    }`}
  >
    <div className="flex items-center gap-4">
      <span
        className={`w-9 h-9 flex items-center justify-center rounded-xl ${
          danger ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-[#3E3EDF]'
        }`}
      >
        {icon}
      </span>
      <span className={`text-sm font-medium ${danger ? 'text-red-500' : 'text-gray-700'}`}>
        {label}
      </span>
    </div>
    {right ?? <FiChevronRight size={16} className="text-gray-400" />}
  </button>
);

export default function Profile() {
  const router = useRouter();
  const [notificationOn, setNotificationOn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    router.push('/login');
  };

  return (
    <div className="py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* Avatar Card */}
        <div className="bg-linear-to-br from-[#3E3EDF] to-[#6b6bf5] rounded-3xl p-8 flex flex-col items-center gap-4 shadow-lg shadow-indigo-200">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image src={profileImg} alt="Profile" fill className="object-cover" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-white">Tamim Sarker</p>
            <p className="text-sm text-indigo-200 mt-0.5">tamim@gmail.com</p>
          </div>
          <div className="flex gap-6 mt-2">
            {[
              { label: 'Rewards', value: '$42.50' },
              { label: 'Claims', value: '14' },
              { label: 'Rating', value: '4.8 ★' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-xs text-indigo-200 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Information */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Account Information
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <MenuItem
              icon={<MdEdit size={18} />}
              label="Edit Profile"
              onClick={() => router.push('/profile/editProfile')}
            />
            <MenuItem
              icon={<MdOutlineSave size={18} />}
              label="Saved"
              onClick={() => router.push('/profile/savedOffer')}
            />
          </div>
        </div>

        {/* Policy Centre */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Policy Centre
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <MenuItem
              icon={<MdPrivacyTip size={18} />}
              label="Privacy Policy"
              onClick={() => router.push('/profile/Privacy')}
            />
            <MenuItem
              icon={<MdOutlineDescription size={18} />}
              label="Terms & Condition"
              onClick={() => router.push('/profile/term')}
            />
          </div>
        </div>

        {/* Settings */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Settings
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <MenuItem
              icon={<MdNotifications size={18} />}
              label="Notification"
              right={
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationOn(!notificationOn);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                    notificationOn ? 'bg-[#3E3EDF]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      notificationOn ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              }
            />
            <MenuItem
              icon={<MdHelpOutline size={18} />}
              label="Help & Support"
              onClick={() => router.push('/profile/helpSupport')}
            />
            <MenuItem icon={<MdLogout size={18} />} label="Log Out" onClick={handleLogout} />
            <MenuItem
              icon={<MdDeleteOutline size={18} />}
              label="Delete Account"
              danger
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

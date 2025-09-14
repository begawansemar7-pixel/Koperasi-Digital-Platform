import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from './Icons';

const Header: React.FC = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/marketplace/')) return 'Detail Produk';
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/marketplace': return 'Marketplace';
      case '/savings': return 'Simpanan';
      case '/loans': return 'Pinjaman';
      case '/profile': return 'Profil Anggota';
      default: return 'Koperasi Digital';
    }
  };

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4 h-20">
        <div className="text-2xl font-bold text-gray-800 hidden md:block">{getTitle()}</div>
        <div className="flex-1 mx-4 md:mx-8">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300"
              type="text"
              placeholder="Cari produk, transaksi..."
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700">
            <BellIcon className="h-6 w-6" />
          </button>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <button className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg">
              <img className="h-10 w-10 rounded-full object-cover" src={MOCK_USER.avatarUrl} alt="User Avatar" />
              <div className="hidden lg:block text-left">
                <div className="text-sm font-semibold text-gray-700">{MOCK_USER.name}</div>
                <div className="text-xs text-gray-500">{MOCK_USER.memberId}</div>
              </div>
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 transition-opacity duration-200"
                style={{ opacity: 1 }}
              >
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <img className="h-16 w-16 rounded-full object-cover" src={MOCK_USER.avatarUrl} alt="User Avatar" />
                    <div>
                      <div className="font-bold text-gray-800">{MOCK_USER.name}</div>
                      <div className="text-sm text-gray-500">{MOCK_USER.email}</div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    <UserCircleIcon className="h-5 w-5 mr-3" />
                    Profil Saya
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                    Keluar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
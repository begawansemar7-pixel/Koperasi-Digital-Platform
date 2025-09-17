import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOCK_USER } from '../constants';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ChatBubbleLeftRightIcon } from './Icons';

const Header: React.FC = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getPageConfig = () => {
    const path = location.pathname;

    const dispatchOpenAI = (prompt: string) => {
        window.dispatchEvent(new CustomEvent('open-ai-advisor', { detail: { prompt } }));
    };

    const AiButton: React.FC<{prompt: string}> = ({prompt}) => (
        <button 
            onClick={() => dispatchOpenAI(prompt)}
            className="flex items-center px-3 py-1.5 text-xs bg-secondary/10 text-secondary font-semibold rounded-lg hover:bg-secondary/20 transition-colors"
        >
            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1.5"/>
            Tanya AI
        </button>
    );

    if (path.startsWith('/marketplace/')) return { title: 'Detail Produk', description: 'Lihat rincian lengkap dari produk pilihan Anda.' };
    if (path.startsWith('/programs/')) return { title: 'Detail Program', description: 'Pelajari lebih dalam tentang program unggulan kami.' };

    switch (path) {
      case '/dashboard': 
        return { 
            title: 'Dashboard', 
            description: 'Ringkasan aktivitas dan finansial Anda.', 
            action: <AiButton prompt="Beri saya tips keuangan untuk bulan ini." /> 
        };
      case '/marketplace': 
        return { 
            title: 'Marketplace', 
            description: 'Jelajahi produk unggulan dari anggota Desa Merah Putih.' 
        };
      case '/savings': 
        return { 
            title: 'Simpanan', 
            description: 'Pantau perkembangan simpanan Anda di koperasi.', 
            action: <AiButton prompt="Jelaskan perbedaan antara simpanan pokok, wajib, dan sukarela." /> 
        };
      case '/loans': 
        return { 
            title: 'Pinjaman', 
            description: 'Ajukan pinjaman dan lihat riwayat pembiayaan Anda.',
            action: <AiButton prompt="Bagaimana cara mengajukan pinjaman di koperasi ini?" /> 
        };
      case '/loyalty': 
        return { 
            title: 'Poin Loyalitas', 
            description: 'Kumpulkan poin dan tukarkan dengan hadiah menarik.',
            action: <AiButton prompt="Bagaimana cara mendapatkan lebih banyak poin loyalitas?" /> 
        };
      case '/profile': 
        return { 
            title: 'Profil Anggota', 
            description: 'Lihat dan kelola informasi keanggotaan Anda.' 
        };
      default: 
        return { 
            title: 'Koperasi Digital', 
            description: '' 
        };
    }
  };
  
  const { title, description, action } = getPageConfig();


  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4 h-20">
        <div className="hidden md:block">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                {action}
            </div>
             {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="text-xl font-bold text-gray-800 md:hidden">{title}</div>
        
        <div className="flex-1 mx-4 md:mx-8 max-w-xs">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-300 bg-white text-gray-900"
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
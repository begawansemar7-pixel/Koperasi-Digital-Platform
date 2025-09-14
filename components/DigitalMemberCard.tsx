
import React from 'react';
import type { User } from '../types';

interface DigitalMemberCardProps {
  user: User;
}

const DigitalMemberCard: React.FC<DigitalMemberCardProps> = ({ user }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user.memberId}`;

  return (
    <div className="bg-gradient-to-br from-primary-600 to-secondary p-6 rounded-2xl shadow-lg text-white max-w-md mx-auto">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">KARTU ANGGOTA DIGITAL</h2>
          <p className="text-sm opacity-80">Koperasi Desa Merah Putih</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
        </svg>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-white p-2 rounded-lg">
          <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24" />
        </div>
        <div className="flex-1">
          <p className="text-sm opacity-80">Nama Anggota</p>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm opacity-80 mt-2">Nomor Anggota</p>
          <p className="text-lg font-semibold tracking-wider">{user.memberId}</p>
          <p className="text-xs opacity-80 mt-2">Bergabung Sejak: {new Date(user.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalMemberCard;

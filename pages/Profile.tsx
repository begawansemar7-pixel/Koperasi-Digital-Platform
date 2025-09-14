import React from 'react';
import DigitalMemberCard from '../components/DigitalMemberCard';
import { MOCK_USER } from '../constants';

const Profile: React.FC = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission logic here.
    alert('Perubahan berhasil disimpan!');
  };

  const DetailRow: React.FC<{ label: string; value: string; isInput?: boolean; inputType?: string; isTextArea?: boolean }> = ({ label, value, isInput, inputType = 'text', isTextArea = false }) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 border-b border-gray-200">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {isInput ? (
           isTextArea ? (
             <textarea 
               defaultValue={value}
               rows={3} 
               className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
             />
           ) : (
            <input
              type={inputType}
              defaultValue={value}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
           )
        ) : (
          <span className="flex-grow font-semibold">{value}</span>
        )}
      </dd>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profil Anggota</h1>
        <p className="text-gray-500 mt-1">Lihat dan kelola informasi keanggotaan Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DigitalMemberCard user={MOCK_USER} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Detail Keanggotaan</h3>
          <p className="text-sm text-gray-500 mb-6">Pastikan data Anda selalu valid dan terkini.</p>
          <form onSubmit={handleFormSubmit}>
            <dl className="divide-y divide-gray-200">
              <DetailRow label="Nama Lengkap" value={MOCK_USER.name} />
              <DetailRow label="Nomor Anggota" value={MOCK_USER.memberId} />
              <DetailRow label="Tanggal Bergabung" value={new Date(MOCK_USER.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} />
              <DetailRow label="Alamat Email" value={MOCK_USER.email} isInput inputType="email" />
              <DetailRow label="Nomor Telepon" value={MOCK_USER.phone} isInput inputType="tel" />
              <DetailRow label="Alamat" value={MOCK_USER.address} isInput isTextArea />
              <DetailRow label="Rekening Bank" value={MOCK_USER.bankAccount} isInput />
            </dl>
            <div className="pt-6 text-right">
               <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon, BanknotesIcon, ShoppingCartIcon, CreditCardIcon, ChatBubbleLeftRightIcon } from '../components/Icons';

const DevPersona: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-gradient-to-r from-primary to-red-700 p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img 
              src="https://i.pravatar.cc/150?u=siti_persona" 
              alt="Siti Aminah" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold">Siti Aminah</h1>
              <p className="text-xl text-red-100 mt-1">Pemilik UMKM "Warung Ibu Siti"</p>
              <blockquote className="mt-4 italic text-red-200 border-l-4 border-red-300 pl-4">
                "Saya ingin usaha keripik saya bisa dikenal di luar desa, dan anak-anak bisa sekolah setinggi-tingginya."
              </blockquote>
            </div>
          </div>
        </header>

        <main className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Profil Pengguna</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Usia:</strong> 38 Tahun</li>
                <li><strong>Pekerjaan:</strong> Pemilik Usaha Mikro (Warung Makanan Ringan)</li>
                <li><strong>Lokasi:</strong> Desa Merah Putih</li>
                <li><strong>Status:</strong> Anggota Koperasi Sejak 2021</li>
                <li><strong>Keahlian Teknologi:</strong> Menengah (Aktif di WhatsApp & Facebook)</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Motivasi</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Menyediakan masa depan yang lebih baik untuk kedua anaknya.</span>
                </li>
                 <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Mencapai kemandirian finansial dan mengembangkan usahanya.</span>
                </li>
                 <li className="flex items-start">
                  <StarIcon className="w-5 h-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Berkontribusi pada ekonomi lokal dan komunitas desa.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Latar Belakang</h2>
              <p className="text-gray-700 leading-relaxed">
                Ibu Siti adalah seorang ibu dari dua anak yang menjalankan warung kecil dari rumahnya. Ia adalah warga lama Desa Merah Putih dan menjadi anggota koperasi untuk mendapatkan akses modal yang lebih mudah dan pasar yang lebih luas untuk keripik singkong populernya. Ia berambisi untuk mengembangkan usahanya agar bisa menyuplai ke toko-toko di luar desa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Goals */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Tujuan & Kebutuhan</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center text-green-700"><CheckCircleIcon className="w-5 h-5 mr-2"/> Mendapatkan pinjaman Rp 5.000.000 untuk mesin pengemas.</li>
                        <li className="flex items-center text-green-700"><CheckCircleIcon className="w-5 h-5 mr-2"/> Menjual produknya di Marketplace koperasi.</li>
                        <li className="flex items-center text-green-700"><CheckCircleIcon className="w-5 h-5 mr-2"/> Menabung rutin untuk biaya sekolah anak.</li>
                        <li className="flex items-center text-green-700"><CheckCircleIcon className="w-5 h-5 mr-2"/> Melacak simpanan & pinjaman dengan mudah.</li>
                    </ul>
                </div>

                {/* Frustrations */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">Tantangan & Frustrasi</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center text-red-700"><XCircleIcon className="w-5 h-5 mr-2"/> Proses pinjaman konvensional lambat & banyak dokumen.</li>
                        <li className="flex items-center text-red-700"><XCircleIcon className="w-5 h-5 mr-2"/> Sulit menjangkau pelanggan di luar desa.</li>
                        <li className="flex items-center text-red-700"><XCircleIcon className="w-5 h-5 mr-2"/> Pencatatan keuangan manual memakan waktu.</li>
                        <li className="flex items-center text-red-700"><XCircleIcon className="w-5 h-5 mr-2"/> Terkadang lupa jadwal pembayaran angsuran.</li>
                    </ul>
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Interaksi dengan Aplikasi</h2>
                 <p className="text-gray-700 mb-4">Fitur yang paling sering digunakan oleh Ibu Siti untuk membantunya mencapai tujuannya:</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <ShoppingCartIcon className="w-8 h-8 mx-auto text-primary"/>
                        <p className="mt-2 text-sm font-semibold text-gray-700">Marketplace</p>
                    </div>
                     <div className="bg-gray-100 p-4 rounded-lg">
                        <CreditCardIcon className="w-8 h-8 mx-auto text-primary"/>
                        <p className="mt-2 text-sm font-semibold text-gray-700">Pinjaman</p>
                    </div>
                     <div className="bg-gray-100 p-4 rounded-lg">
                        <BanknotesIcon className="w-8 h-8 mx-auto text-primary"/>
                        <p className="mt-2 text-sm font-semibold text-gray-700">Simpanan</p>
                    </div>
                     <div className="bg-gray-100 p-4 rounded-lg">
                        <ChatBubbleLeftRightIcon className="w-8 h-8 mx-auto text-primary"/>
                        <p className="mt-2 text-sm font-semibold text-gray-700">AI Advisor</p>
                    </div>
                 </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DevPersona;

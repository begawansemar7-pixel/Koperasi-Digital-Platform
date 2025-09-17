import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle registration logic here.
    // For now, we'll just show an alert and navigate to the login page.
    alert('Pendaftaran berhasil! Silakan masuk.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Left side with the image */}
        <div className="hidden md:block md:w-1/2 relative">
             <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://picsum.photos/seed/registerpage/800/1200"
                alt="Smiling farmer"
             />
             <div className="absolute inset-0 bg-primary opacity-70"></div>
             <div className="relative p-12 text-white flex flex-col justify-end h-full">
                <h3 className="text-3xl font-bold">Satu Langkah Menuju Kesejahteraan.</h3>
                <p className="mt-4">Dengan menjadi anggota, Anda turut serta dalam memajukan perekonomian desa dan menikmati manfaat kebersamaan.</p>
             </div>
        </div>

        {/* Right side with the form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
                <Link to="/" className="inline-flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
                    </svg>
                    <span className="text-xl font-bold text-gray-800">Koperasi Digital Merah Putih</span>
                </Link>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Bergabung dengan Koperasi</h2>
                <p className="mt-2 text-sm text-gray-600">Lengkapi data diri Anda untuk menjadi anggota.</p>
            </div>
            <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <input id="name" name="name" type="text" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="Budi Santoso"/>
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                    <textarea id="address" name="address" rows={2} required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="Jl. Merdeka No. 17, Desa Merah Putih"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                      <input id="phone" name="phone" type="tel" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="081234567890"/>
                  </div>
                   <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Alamat Email</label>
                      <input id="email" name="email" type="email" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="anda@email.com"/>
                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                        <input id="password" name="password" type="password" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="********"/>
                    </div>
                     <div>
                        <label htmlFor="confirm-password"className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                        <input id="confirm-password" name="confirm-password" type="password" required className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900" placeholder="********"/>
                    </div>
                </div>

                <div>
                    <label htmlFor="saving-plan" className="block text-sm font-medium text-gray-700">Pilihan Simpanan Awal</label>
                    <select id="saving-plan" name="saving-plan" required className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary bg-white text-gray-900">
                        <option>Paket Dasar (Pokok + Wajib)</option>
                        <option>Paket Plus (Pokok + Wajib + Sukarela Rp100.000)</option>
                        <option>Paket Premium (Pokok + Wajib + Sukarela Rp500.000)</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors">
                        Daftar
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                    Masuk di sini
                </Link>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
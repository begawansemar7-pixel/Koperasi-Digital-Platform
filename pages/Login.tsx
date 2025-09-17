import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle authentication logic here.
    // For now, we'll just navigate to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side with the form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
                <Link to="/" className="inline-flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
                    </svg>
                    <span className="text-xl font-bold text-gray-800">Koperasi Digital Merah Putih</span>
                </Link>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Selamat Datang Kembali</h2>
                <p className="mt-2 text-sm text-gray-600">Silakan masuk ke akun Anda.</p>
            </div>
            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Anggota
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900"
                            placeholder="anda@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700">
                        Kata Sandi
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary bg-white text-gray-900"
                            placeholder="********"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary-dark border-gray-300 rounded"/>
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Ingat saya
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-primary hover:text-primary-dark">
                            Lupa kata sandi?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors">
                        Masuk
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                    Daftar di sini
                </Link>
            </p>
        </div>
        
        {/* Right side with the image */}
        <div className="hidden md:block md:w-1/2 relative">
             <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://picsum.photos/seed/loginpage/800/1000"
                alt="Community gathering"
             />
             <div className="absolute inset-0 bg-secondary opacity-60"></div>
             <div className="relative p-12 text-white flex flex-col justify-end h-full">
                <h3 className="text-3xl font-bold">Maju Bersama, Sejahtera Bersama.</h3>
                <p className="mt-4">Bergabunglah dengan ratusan anggota lain dalam membangun ekonomi desa yang kuat dan mandiri.</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
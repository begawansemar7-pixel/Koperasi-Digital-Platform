import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold">Koperasi Desa Merah Putih</h3>
                        <p className="mt-2 text-sm text-gray-400">
                            Membangun ekonomi desa yang mandiri dan sejahtera melalui digitalisasi.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Tautan Cepat</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link to="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link></li>
                            <li><Link to="/programs" className="text-gray-400 hover:text-white">Program Kerja</Link></li>
                            <li><Link to="/marketplace" className="text-gray-400 hover:text-white">Marketplace</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white">Login Anggota</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Kontak Kami</h4>
                         <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            <li>Jl. Kemerdekaan No. 45, Desa Merah Putih</li>
                            <li>Email: kontak@koperasimp.id</li>
                            <li>Telepon: (021) 123-4567</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-md font-semibold">Ikuti Kami</h4>
                        <div className="mt-4 flex space-x-4">
                            {/* Placeholder for social icons */}
                            <a href="#" className="text-gray-400 hover:text-white">FB</a>
                            <a href="#" className="text-gray-400 hover:text-white">IG</a>
                            <a href="#" className="text-gray-400 hover:text-white">WA</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Koperasi Digital Merah Putih. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
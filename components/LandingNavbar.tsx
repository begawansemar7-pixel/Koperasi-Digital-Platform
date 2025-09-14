import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from './Icons';

const LandingNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const navLinks = [
        { name: 'Tentang Kami', href: '/about' },
        { name: 'Program Kerja', href: '/programs' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Berita', href: '/#news' },
    ];

    const navLinkClass = "font-medium text-gray-600 hover:text-primary transition-colors";
    const mobileNavLinkClass = "block w-full text-center font-medium text-gray-600 hover:text-primary transition-colors py-2";

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                         <Link to="/" className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
                            </svg>
                            <span className="text-xl font-bold text-gray-800">Koperasi MP</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map(link => (
                             <NavLink key={link.name} to={link.href} className={({isActive}) => `${navLinkClass} ${isActive && !link.href.includes('#') ? 'text-primary' : ''}`}>
                                 {link.name}
                             </NavLink>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/login" className="px-4 py-2 text-sm font-semibold text-primary rounded-lg hover:bg-primary-50 transition-colors">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors shadow-sm">
                            Daftar Anggota
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white py-4">
                    <nav className="flex flex-col items-center space-y-2 px-4">
                        {navLinks.map(link => (
                            <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-2 mt-2 text-sm font-semibold text-primary rounded-lg hover:bg-primary-50 transition-colors border border-primary">
                            Login
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors shadow-sm">
                            Daftar Anggota
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default LandingNavbar;
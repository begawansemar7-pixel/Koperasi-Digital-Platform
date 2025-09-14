import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HomeIcon, ShoppingCartIcon, BanknotesIcon, CreditCardIcon, UserCircleIcon, Bars3Icon } from './Icons';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingCartIcon },
  { name: 'Simpanan', href: '/savings', icon: BanknotesIcon },
  { name: 'Pinjaman', href: '/loans', icon: CreditCardIcon },
  { name: 'Profil Anggota', href: '/profile', icon: UserCircleIcon },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary-500 text-white'
        : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
    }`;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
            </svg>
            <span className="text-xl font-bold text-gray-800">Koperasi MP</span>
        </Link>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        {navigation.map((item) => (
          <NavLink key={item.name} to={item.href} className={navLinkClass} end>
            <item.icon className="h-6 w-6 mr-3" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md bg-white shadow-md text-gray-600">
          <Bars3Icon className="h-6 w-6"/>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
         <div className="relative w-64 h-full bg-white shadow-lg flex flex-col">
            {sidebarContent}
         </div>
         <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>
      </div>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            {sidebarContent}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
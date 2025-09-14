import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PROGRAMS } from '../constants';
import { BanknotesIcon, CreditCardIcon, ShoppingCartIcon, AcademicCapIcon } from '../components/Icons';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    BanknotesIcon,
    CreditCardIcon,
    ShoppingCartIcon,
    AcademicCapIcon,
};

const ProgramIcon = ({ name }: { name: string }) => {
    const Icon = iconMap[name];
    return Icon ? <Icon className="h-10 w-10 text-primary" /> : null;
};

const Programs: React.FC = () => {
    return (
        <section id="programs" className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h1 className="text-4xl font-bold text-gray-800">Program Unggulan Kami</h1>
                 <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai layanan untuk mendukung pertumbuhan ekonomi dan kesejahteraan anggota.</p>
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {MOCK_PROGRAMS.map(program => (
                         <Link 
                            to={`/programs/${program.id}`}
                            key={program.title} 
                            className="block bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-300 text-left"
                         >
                             <div className="flex items-center justify-center h-20 w-20 bg-primary-100 rounded-full mb-4 mx-auto md:mx-0">
                                <ProgramIcon name={program.icon} />
                             </div>
                             <div className="text-center md:text-left">
                                <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                                <p className="mt-2 text-gray-600">{program.description}</p>
                             </div>
                         </Link>
                     ))}
                 </div>
            </div>
        </section>
    );
};

export default Programs;
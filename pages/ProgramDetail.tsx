import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROGRAMS } from '../constants';
import { ArrowLeftIcon } from '../components/Icons';

const ProgramDetail: React.FC = () => {
    const { programId } = useParams<{ programId: string }>();
    const program = MOCK_PROGRAMS.find(p => p.id === programId);

    if (!program) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-gray-800">Program Tidak Ditemukan</h1>
                <p className="text-gray-600 mt-2">Program yang Anda cari tidak ada atau telah dipindahkan.</p>
                <Link to="/programs" className="mt-6 inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Kembali ke Halaman Program
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-80">
                <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-5xl font-bold drop-shadow-lg">{program.title}</h1>
                    </div>
                </div>
            </section>
            
            {/* Content Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="prose lg:prose-lg max-w-none text-gray-700">
                        <p>{program.longDescription}</p>
                    </div>
                    <div className="mt-12 text-center">
                        <Link 
                            to={program.cta.link}
                            className="inline-block px-10 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            {program.cta.text}
                        </Link>
                    </div>
                     <div className="mt-12 text-center">
                        <Link to="/programs" className="inline-flex items-center text-primary hover:underline">
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Kembali ke Semua Program
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProgramDetail;
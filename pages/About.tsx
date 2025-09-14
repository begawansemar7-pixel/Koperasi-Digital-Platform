import React from 'react';
import { MOCK_ORGANIZATION } from '../constants';

const About: React.FC = () => {
    return (
        <>
            {/* About Section */}
            <section id="about" className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800">Tentang Koperasi Merah Putih</h1>
                        <p className="mt-2 text-lg text-gray-600">Membangun Ekonomi Desa Melalui Kebersamaan</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://picsum.photos/seed/about/600/400" alt="Tentang Koperasi" className="rounded-lg shadow-lg" />
                        </div>
                        <div>
                            <p className="mt-4 text-gray-600 leading-relaxed">Koperasi Desa Merah Putih adalah lembaga ekonomi yang berlandaskan asas kekeluargaan dan gotong royong. Kami berkomitmen untuk meningkatkan taraf hidup anggota dan masyarakat desa melalui berbagai unit usaha yang transparan, akuntabel, dan berbasis teknologi.</p>
                            <p className="mt-4 text-gray-600 leading-relaxed">Dengan semangat kebersamaan, kami terus berinovasi untuk memberikan pelayanan terbaik dan manfaat maksimal bagi seluruh anggota. Kami percaya bahwa dengan digitalisasi, koperasi dapat menjadi motor penggerak ekonomi lokal yang lebih kuat dan tangguh menghadapi tantangan zaman.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Organizational Structure Section */}
            <section id="structure" className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Struktur Organisasi</h2>
                    <p className="mt-2 text-gray-600">Dipimpin oleh individu-individu berdedikasi untuk kemajuan bersama.</p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {MOCK_ORGANIZATION.map(person => (
                            <div key={person.name} className="text-center">
                                <img src={person.imageUrl} alt={person.name} className="w-32 h-32 rounded-full mx-auto shadow-lg" />
                                <h4 className="mt-4 text-lg font-semibold text-gray-800">{person.name}</h4>
                                <p className="text-primary">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;

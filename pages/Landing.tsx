import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CAROUSEL_SLIDES, MOCK_PROGRAMS, MOCK_NEWS, MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { BanknotesIcon, CreditCardIcon, ShoppingCartIcon, AcademicCapIcon } from '../components/Icons';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    BanknotesIcon,
    CreditCardIcon,
    ShoppingCartIcon,
    AcademicCapIcon,
};


const Landing: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % MOCK_CAROUSEL_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const ProgramIcon = ({ name }: { name: string }) => {
        const Icon = iconMap[name];
        return Icon ? <Icon className="h-10 w-10 text-primary" /> : null;
    };
    
    return (
        <>
            {/* Hero Carousel Section */}
            <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                {MOCK_CAROUSEL_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white p-4 max-w-3xl">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
                                <p className="text-lg md:text-xl mb-8 drop-shadow-md">{slide.description}</p>
                                <Link to="/login" className="px-8 py-3 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-transform transform hover:scale-105 shadow-lg">
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {MOCK_CAROUSEL_SLIDES.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}></button>
                    ))}
                </div>
            </section>
            
            {/* Programs Section */}
            <section id="programs" className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Program Unggulan Kami</h2>
                        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Kami menyediakan berbagai layanan untuk mendukung pertumbuhan ekonomi dan kesejahteraan anggota.</p>
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {MOCK_PROGRAMS.map(program => (
                                <Link to={`/programs/${program.id}`} key={program.title} className="block bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
                                    <div className="flex items-center justify-center h-20 w-20 bg-primary-100 rounded-full mx-auto mb-4">
                                    <ProgramIcon name={program.icon} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800">{program.title}</h3>
                                    <p className="mt-2 text-gray-600">{program.description}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link to="/programs" className="px-8 py-3 text-lg font-semibold text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary-50 transition-colors">
                                Lihat Semua Program
                            </Link>
                        </div>
                </div>
            </section>
            
            {/* About Section */}
            <section id="about" className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img src="https://picsum.photos/seed/about/600/400" alt="Tentang Koperasi" className="rounded-lg shadow-lg" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Tentang Koperasi Merah Putih</h2>
                            <p className="mt-4 text-gray-600">Koperasi Desa Merah Putih adalah lembaga ekonomi yang berlandaskan asas kekeluargaan dan gotong royong. Kami berkomitmen untuk meningkatkan taraf hidup anggota dan masyarakat desa...</p>
                             <Link to="/about" className="mt-6 inline-block font-semibold text-primary hover:text-primary-700 transition-colors">
                                Selengkapnya tentang kami &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marketplace Preview */}
            <section id="marketplace" className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Jelajahi Marketplace Kami</h2>
                        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Temukan produk-produk terbaik hasil karya anggota koperasi Desa Merah Putih.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {MOCK_PRODUCTS.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/marketplace" className="px-8 py-3 text-lg font-semibold text-primary bg-white border-2 border-primary rounded-lg hover:bg-primary-50 transition-colors">
                            Lihat Semua Produk
                        </Link>
                    </div>
                    </div>
            </section>
            
                {/* News Section */}
            <section id="news" className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800">Berita & Pengumuman</h2>
                        <p className="mt-2 text-gray-600">Ikuti perkembangan dan kegiatan terbaru dari Koperasi Merah Putih.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {MOCK_NEWS.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="p-6">
                                    <p className="text-sm text-primary font-semibold">{item.category}</p>
                                    <h3 className="mt-2 text-lg font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-secondary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
                    <h2 className="text-3xl font-bold">Siap Bergabung dan Bertumbuh Bersama Kami?</h2>
                    <p className="mt-2 max-w-2xl mx-auto">Jadilah bagian dari keluarga besar Koperasi Desa Merah Putih dan nikmati berbagai manfaatnya.</p>
                    <div className="mt-8">
                        <Link to="/register" className="px-8 py-3 text-lg font-semibold text-secondary bg-white rounded-lg hover:bg-gray-200 transition-colors shadow-lg">
                            Daftar Sekarang
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Landing;
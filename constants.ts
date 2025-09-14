import type { User, Product, Transaction, Savings, Loan, Comment, Program } from './types';

export const MOCK_USER: User = {
  id: 'USR001',
  name: 'Budi Santoso',
  memberId: 'KOP-MP-2024-001',
  joinDate: '2024-01-15',
  avatarUrl: 'https://i.pravatar.cc/100?u=budi',
  address: 'Jl. Merdeka No. 17, Desa Merah Putih',
  phone: '081234567890',
  email: 'budi.santoso@email.com',
  bankAccount: 'BCA - 1234567890',
};

export const MOCK_SAVINGS: Savings = {
  principal: 500000,
  mandatory: 1200000,
  voluntary: 5500000,
};

export const MOCK_PRODUCTS: Product[] = [
  { id: 'PROD001', name: 'Madu Hutan Asli', seller: 'UMKM Jaya', price: 75000, imageUrl: 'https://picsum.photos/seed/honey/400/300', rating: 4.8, reviews: 120, category: 'Pangan', description: 'Madu murni yang dipanen langsung dari hutan Desa Merah Putih. Memiliki khasiat untuk menjaga daya tahan tubuh dan kaya akan antioksidan alami.' },
  { id: 'PROD002', name: 'Keripik Singkong Pedas', seller: 'Warung Ibu Siti', price: 15000, imageUrl: 'https://picsum.photos/seed/chips/400/300', rating: 4.5, reviews: 250, category: 'Pangan', description: 'Camilan renyah dari singkong pilihan dengan bumbu pedas khas yang bikin ketagihan. Cocok untuk teman santai atau kumpul keluarga.' },
  { id: 'PROD003', name: 'Tas Batik Tulis', seller: 'Batik Lestari', price: 250000, imageUrl: 'https://picsum.photos/seed/bag/400/300', rating: 4.9, reviews: 80, category: 'Kerajinan', description: 'Tas jinjing elegan yang dibuat dari kain batik tulis asli dengan motif parang. Setiap tas adalah karya seni unik hasil tangan pengrajin lokal.' },
  { id: 'PROD004', name: 'Pupuk Organik Cair', seller: 'Tani Makmur', price: 50000, imageUrl: 'https://picsum.photos/seed/fertilizer/400/300', rating: 4.6, reviews: 95, category: 'Pertanian', description: 'Pupuk organik cair yang terbuat dari bahan-bahan alami untuk menyuburkan tanaman dan meningkatkan hasil panen tanpa merusak lingkungan.' },
  { id: 'PROD005', name: 'Kopi Robusta Desa', seller: 'Kopi Kita', price: 60000, imageUrl: 'https://picsum.photos/seed/coffee/400/300', rating: 4.7, reviews: 150, category: 'Pangan', description: 'Biji kopi robusta berkualitas tinggi yang ditanam dan diolah oleh petani lokal. Memiliki aroma kuat dan cita rasa yang khas.' },
  { id: 'PROD006', name: 'Gula Aren Cetak', seller: 'UMKM Manis', price: 25000, imageUrl: 'https://picsum.photos/seed/sugar/400/300', rating: 4.8, reviews: 180, category: 'Pangan', description: 'Gula aren asli yang diolah secara tradisional. Pemanis alami yang lebih sehat dengan aroma karamel yang khas.' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRX001', date: '2024-07-25', description: 'Pembelian di Marketplace', amount: -90000, type: 'debit' },
  { id: 'TRX002', date: '2024-07-20', description: 'Pembagian SHU 2023', amount: 750000, type: 'credit' },
  { id: 'TRX003', date: '2024-07-15', description: 'Setoran Simpanan Sukarela', amount: 500000, type: 'credit' },
  { id: 'TRX004', date: '2024-07-01', description: 'Iuran Wajib Juli 2024', amount: -100000, type: 'debit' },
  { id: 'TRX005', date: '2024-06-28', description: 'Penarikan Simpanan Sukarela', amount: -200000, type: 'debit' },
];

export const MOCK_LOANS: Loan[] = [
    { 
        id: 'LOAN001', 
        amount: 5000000, 
        interestRate: 1.5, 
        termMonths: 12, 
        startDate: '2024-02-01', 
        status: 'Approved', 
        remainingBalance: 2500000,
        repaymentSchedule: [
            { dueDate: '2024-03-01', principal: 416667, interest: 75000, total: 491667, status: 'Paid' },
            { dueDate: '2024-04-01', principal: 416667, interest: 68750, total: 485417, status: 'Paid' },
            { dueDate: '2024-05-01', principal: 416667, interest: 62500, total: 479167, status: 'Paid' },
            { dueDate: '2024-06-01', principal: 416667, interest: 56250, total: 472917, status: 'Paid' },
            { dueDate: '2024-07-01', principal: 416667, interest: 50000, total: 466667, status: 'Paid' },
            { dueDate: '2024-08-01', principal: 416667, interest: 43750, total: 460417, status: 'Paid' },
            { dueDate: '2024-09-01', principal: 416667, interest: 37500, total: 454167, status: 'Upcoming' },
            { dueDate: '2024-10-01', principal: 416667, interest: 31250, total: 447917, status: 'Upcoming' },
            // ... more installments
        ]
    },
    { 
        id: 'LOAN002', 
        amount: 10000000, 
        interestRate: 1.2, 
        termMonths: 24, 
        startDate: '2023-08-15', 
        status: 'Paid Off', 
        remainingBalance: 0,
        repaymentSchedule: [
            { dueDate: '2023-09-15', principal: 416667, interest: 120000, total: 536667, status: 'Paid' },
            { dueDate: '2023-10-15', principal: 416667, interest: 115000, total: 531667, status: 'Paid' },
             // ... all installments are paid
        ]
    },
];

export const MOCK_COMMENTS: Comment[] = [
    { id: 'CMT001', productId: 'PROD001', authorName: 'Siti Aminah', authorAvatar: 'https://i.pravatar.cc/100?u=siti', text: 'Madunya asli banget, kental dan manisnya pas. Anak saya suka!', date: '2024-07-22' },
    { id: 'CMT002', productId: 'PROD001', authorName: 'Bambang Wijoyo', authorAvatar: 'https://i.pravatar.cc/100?u=bambang', text: 'Pengiriman cepat, packing aman. Kualitas madunya tidak diragukan lagi.', date: '2024-07-20' },
    { id: 'CMT003', productId: 'PROD002', authorName: 'Dewi Lestari', authorAvatar: 'https://i.pravatar.cc/100?u=dewi', text: 'Keripiknya renyah dan pedasnya nampol! Bakal order lagi.', date: '2024-07-25' },
];

export const SHU_PROJECTION_DATA = [
  { name: '2021', SHU: 450000 },
  { name: '2022', SHU: 600000 },
  { name: '2023', SHU: 750000 },
  { name: '2024 (Proj.)', SHU: 900000 },
];

export const MOCK_CAROUSEL_SLIDES = [
  { id: 1, title: 'Selamat Datang di Koperasi Digital', description: 'Maju Bersama, Sejahtera Bersama. Digitalisasi untuk Kemandirian Ekonomi Desa.', imageUrl: 'https://picsum.photos/seed/hero1/1200/600', buttonText: 'Pelajari Lebih Lanjut' },
  { id: 2, title: 'Belanja Mudah di Marketplace Lokal', description: 'Dukung produk UMKM Desa Merah Putih. Kualitas terjamin, harga bersahabat.', imageUrl: 'https://picsum.photos/seed/hero2/1200/600', buttonText: 'Kunjungi Marketplace' },
  { id: 3, title: 'Ajukan Pinjaman Jadi Lebih Cepat', description: 'Proses mudah, transparan, dan bunga ringan khusus untuk anggota.', imageUrl: 'https://picsum.photos/seed/hero3/1200/600', buttonText: 'Lihat Opsi Pinjaman' },
];

export const MOCK_PROGRAMS: Program[] = [
    { 
        id: 'simpanan-anggota',
        title: 'Simpanan Anggota', 
        description: 'Menabung aman dengan berbagai pilihan simpanan, mulai dari pokok, wajib, hingga sukarela.', 
        icon: 'BanknotesIcon',
        imageUrl: 'https://picsum.photos/seed/savings/1200/600',
        longDescription: 'Program Simpanan Anggota adalah fondasi dari kekuatan finansial koperasi kita. Anggota dapat berpartisipasi dalam tiga jenis simpanan: Simpanan Pokok yang merupakan modal awal, Simpanan Wajib yang memperkuat permodalan secara rutin, dan Simpanan Sukarela yang memberikan fleksibilitas seperti tabungan bank. Semua simpanan dijamin aman dan akan mendapatkan bagian dari Sisa Hasil Usaha (SHU) setiap tahunnya.',
        cta: { text: 'Lihat Rincian Simpanan', link: '/savings' }
    },
    { 
        id: 'pembiayaan-usaha',
        title: 'Pembiayaan Usaha', 
        description: 'Dapatkan dukungan modal untuk mengembangkan usaha Anda dengan proses yang mudah dan cepat.', 
        icon: 'CreditCardIcon',
        imageUrl: 'https://picsum.photos/seed/financing/1200/600',
        longDescription: 'Kami memahami bahwa modal adalah salah satu tantangan terbesar bagi UMKM. Program Pembiayaan Usaha hadir untuk memberikan solusi pinjaman modal kerja maupun investasi dengan bunga yang kompetitif dan proses pengajuan yang lebih sederhana dibandingkan lembaga keuangan formal. Ajukan pembiayaan secara digital dan dapatkan keputusan lebih cepat untuk mengakselerasi pertumbuhan usaha Anda.',
        cta: { text: 'Ajukan Pembiayaan Sekarang', link: '/loans' }
    },
    { 
        id: 'marketplace-umkm',
        title: 'Marketplace UMKM', 
        description: 'Wadah bagi anggota untuk menjual produk-produk unggulan desa kepada pasar yang lebih luas.', 
        icon: 'ShoppingCartIcon',
        imageUrl: 'https://picsum.photos/seed/marketplace/1200/600',
        longDescription: 'Marketplace UMKM Koperasi Merah Putih adalah etalase digital bagi produk-produk terbaik dari anggota kami. Dari hasil pertanian, kerajinan tangan, hingga kuliner khas desa, semua dapat dipasarkan di sini. Program ini bertujuan untuk meningkatkan visibilitas produk, memperluas jangkauan pasar, dan pada akhirnya meningkatkan pendapatan para pelaku UMKM di Desa Merah Putih.',
        cta: { text: 'Kunjungi Marketplace', link: '/marketplace' }
    },
    { 
        id: 'edukasi-keuangan',
        title: 'Edukasi Keuangan', 
        description: 'Program pelatihan dan literasi keuangan untuk meningkatkan pengetahuan dan kesejahteraan anggota.', 
        icon: 'AcademicCapIcon',
        imageUrl: 'https://picsum.photos/seed/education/1200/600',
        longDescription: 'Kesejahteraan tidak hanya tentang memiliki uang, tetapi juga tentang bagaimana mengelolanya dengan bijak. Program Edukasi Keuangan menyediakan serangkaian seminar, lokakarya, dan konsultasi (termasuk melalui AI Advisor kami) tentang perencanaan anggaran, investasi dasar, manajemen utang, dan pemanfaatan produk-produk koperasi secara optimal. Tingkatkan literasi keuangan Anda untuk masa depan yang lebih cerah.',
        cta: { text: 'Tanya AI Advisor', link: '/dashboard' } // Or link to a specific resource
    },
];

export const MOCK_ORGANIZATION = [
    { name: 'Ahmad Subagja', role: 'Ketua Koperasi', imageUrl: 'https://i.pravatar.cc/150?u=ahmad' },
    { name: 'Siti Aminah', role: 'Sekretaris', imageUrl: 'https://i.pravatar.cc/150?u=siti' },
    { name: 'Bambang Wijoyo', role: 'Bendahara', imageUrl: 'https://i.pravatar.cc/150?u=bambang' },
    { name: 'Dewi Lestari', role: 'Manajer Usaha', imageUrl: 'https://i.pravatar.cc/150?u=dewi' },
];

export const MOCK_NEWS = [
    { id: 1, title: 'Koperasi Merah Putih Sukses Gelar Rapat Anggota Tahunan 2024', date: '25 Juli 2024', category: 'Acara', imageUrl: 'https://picsum.photos/seed/news1/400/250' },
    { id: 2, title: 'Program Pelatihan UMKM Digital Jangkau Puluhan Anggota Baru', date: '18 Juli 2024', category: 'Edukasi', imageUrl: 'https://picsum.photos/seed/news2/400/250' },
    { id: 3, title: 'Inovasi Baru: Layanan Pesan Antar Produk Marketplace Kini Tersedia', date: '10 Juli 2024', category: 'Marketplace', imageUrl: 'https://picsum.photos/seed/news3/400/250' },
];
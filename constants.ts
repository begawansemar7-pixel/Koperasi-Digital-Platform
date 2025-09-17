// Fix: Populated this file with mock data to resolve import errors across the application.
import type { User, Product, Transaction, Savings, Loan, RepaymentInstallment, Comment, Program, LoyaltyReward, LoyaltyTransaction } from './types';

// --- FINANCIAL CONSTANTS ---
// Moved up to be accessible by mock data definitions

// SHU Conversion
export const SHU_2023_RUPIAH = 750000;
export const RUPIAH_PER_SHU_POINT = 1000; // Rp 1.000,- per 1 Poin SHU

// Savings & Investment
export const SAVINGS_ALLOCATION_PERCENTAGE = 0.5; // 50% of earned points go to investments
export const POINT_TO_RUPIAH_CONVERSION = 1; // For investment points, 1 point = Rp1
export const GOLD_PRICE_PER_GRAM = 1350000;
export const UMROH_COST = 35000000;
export const HAJJ_INITIAL_DEPOSIT_COST = 25000000;


export const MOCK_USER: User = {
  id: 'USR001',
  name: 'Budi Santoso',
  memberId: 'KOP-MP-2021-001',
  joinDate: '2021-03-15',
  avatarUrl: 'https://i.pravatar.cc/150?u=budi_santoso',
  address: 'Jl. Merdeka No. 17, RT 02/RW 01, Desa Merah Putih, Kecamatan Bangsa, Kabupaten Negara',
  phone: '081234567890',
  email: 'budi.santoso@example.com',
  bankAccount: 'Bank Central Asia (BCA) - 1234567890',
};

export const MOCK_MEMBERS: User[] = [
  MOCK_USER,
  {
    id: 'USR002',
    name: 'Siti Aminah',
    memberId: 'KOP-MP-2022-015',
    joinDate: '2022-01-20',
    avatarUrl: 'https://i.pravatar.cc/150?u=siti_aminah',
    address: 'Jl. Dahlia No. 5, Desa Merah Putih',
    phone: '081298765432',
    email: 'siti.aminah@example.com',
    bankAccount: 'Bank Mandiri - 0987654321',
  },
  {
    id: 'USR003',
    name: 'Agus Wijaya',
    memberId: 'KOP-MP-2020-112',
    joinDate: '2020-11-05',
    avatarUrl: 'https://i.pravatar.cc/150?u=agus_wijaya',
    address: 'Dusun Mawar RT 03/RW 02, Desa Merah Putih',
    phone: '085611223344',
    email: 'agus.wijaya@example.com',
    bankAccount: 'Bank Rakyat Indonesia (BRI) - 1122334455',
  },
];


export const MOCK_PRODUCTS: Product[] = [
  { id: 'PROD001', name: 'Keripik Singkong Balado', seller: 'Warung Ibu Siti', price: 15000, imageUrl: 'https://picsum.photos/seed/keripik/400/300', rating: 4.8, reviews: 120, category: 'Pangan', description: 'Keripik singkong renyah dengan bumbu balado pedas manis khas Desa Merah Putih. Dibuat dari singkong pilihan dan bumbu alami tanpa pengawet.' },
  { id: 'PROD002', name: 'Tas Anyaman Pandan', seller: 'Kerajinan Tangan Lestari', price: 75000, imageUrl: 'https://picsum.photos/seed/tasanyam/400/300', rating: 4.9, reviews: 85, category: 'Kerajinan', description: 'Tas tangan wanita yang dibuat dari anyaman daun pandan berkualitas tinggi. Desain etnik yang elegan, cocok untuk acara santai maupun formal.' },
  { id: 'PROD003', name: 'Madu Hutan Asli', seller: 'Kelompok Tani Madu Jaya', price: 120000, imageUrl: 'https://picsum.photos/seed/madu/400/300', rating: 4.7, reviews: 95, category: 'Pangan', description: 'Madu murni yang dipanen dari hutan sekitar Desa Merah Putih. Memiliki aroma dan rasa yang khas, serta kaya akan manfaat kesehatan.' },
  { id: 'PROD004', name: 'Bibit Cabai Unggul', seller: 'Tani Makmur', price: 10000, imageUrl: 'https://picsum.photos/seed/cabai/400/300', rating: 4.6, reviews: 250, category: 'Pertanian', description: 'Bibit cabai rawit unggul hasil seleksi petani lokal. Tahan terhadap penyakit dan memiliki produktivitas tinggi.' },
  { id: 'PROD005', name: 'Kain Tenun Tradisional', seller: 'Sanggar Tenun Melati', price: 250000, imageUrl: 'https://picsum.photos/seed/tenun/400/300', rating: 5.0, reviews: 45, category: 'Kerajinan', description: 'Kain tenun dengan motif tradisional yang ditenun secara manual oleh pengrajin terampil. Menggunakan pewarna alami dari tumbuhan.' },
  { id: 'PROD006', name: 'Gula Aren Organik', seller: 'Warung Ibu Siti', price: 25000, imageUrl: 'https://picsum.photos/seed/gulaaren/400/300', rating: 4.8, reviews: 150, category: 'Pangan', description: 'Gula aren cetak yang diolah secara tradisional dari nira pohon aren. Memiliki rasa manis yang khas dengan aroma karamel.' },
  { id: 'PROD007', name: 'Pupuk Kompos Super', seller: 'Tani Makmur', price: 30000, imageUrl: 'https://picsum.photos/seed/pupuk/400/300', rating: 4.5, reviews: 180, category: 'Pertanian', description: 'Pupuk organik hasil pengomposan bahan-bahan alami, diperkaya dengan mikroorganisme penyubur tanah.' },
  { id: 'PROD008', name: 'Topi Bambu Unik', seller: 'Kerajinan Tangan Lestari', price: 55000, imageUrl: 'https://picsum.photos/seed/topibambu/400/300', rating: 4.6, reviews: 60, category: 'Kerajinan', description: 'Topi pelindung dari panas matahari yang terbuat dari bambu pilihan, ringan dan nyaman dipakai.' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TRN001', date: '2024-07-20', description: 'Pembelian Keripik Singkong', amount: -30000, type: 'debit' },
  { id: 'TRN002', date: '2024-07-15', description: 'Iuran Wajib Anggota', amount: 100000, type: 'credit' },
  { id: 'TRN003', date: '2024-07-10', description: 'Penarikan Simpanan Sukarela', amount: -500000, type: 'debit' },
  { id: 'TRN004', date: '2024-07-05', description: 'Pembayaran Angsuran Pinjaman', amount: -750000, type: 'debit' },
  { id: 'TRN005', date: '2024-07-01', description: 'Setoran Simpanan Sukarela', amount: 200000, type: 'credit' },
];

export const MOCK_SAVINGS: Savings = {
    principal: 500000,
    mandatory: 1200000,
    voluntary: 3500000,
};

const repaymentSchedule1: RepaymentInstallment[] = [
    { dueDate: '2024-08-05', principal: 388591, interest: 75000, total: 463591, status: 'Upcoming' },
    { dueDate: '2024-09-05', principal: 394419, interest: 69171, total: 463591, status: 'Upcoming' },
];

const repaymentSchedule2: RepaymentInstallment[] = [
    { dueDate: '2023-12-10', principal: 220000, interest: 30000, total: 250000, status: 'Paid' },
    { dueDate: '2024-01-10', principal: 223300, interest: 26700, total: 250000, status: 'Paid' },
];

export const MOCK_LOANS: Loan[] = [
  { id: 'LOAN001', amount: 5000000, interestRate: 1.5, termMonths: 12, startDate: '2024-07-05', status: 'Approved', remainingBalance: 4611409, repaymentSchedule: repaymentSchedule1 },
  { id: 'LOAN002', amount: 2000000, interestRate: 1.5, termMonths: 8, startDate: '2023-11-10', status: 'Paid Off', remainingBalance: 0, repaymentSchedule: repaymentSchedule2 },
  { id: 'LOAN003', amount: 10000000, interestRate: 1.5, termMonths: 24, startDate: '2024-06-20', status: 'Pending', remainingBalance: 10000000 },
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'CMT001', productId: 'PROD001', authorName: 'Siti Aminah', authorAvatar: 'https://i.pravatar.cc/150?u=siti_persona', text: 'Keripiknya renyah banget, bumbunya pas!', date: '2024-07-18' },
  { id: 'CMT002', productId: 'PROD001', authorName: 'Agus Wijaya', authorAvatar: 'https://i.pravatar.cc/150?u=agus_wijaya', text: 'Anak-anak suka, pedasnya pas. Recommended!', date: '2024-07-17' },
  { id: 'CMT003', productId: 'PROD002', authorName: 'Rina Hartono', authorAvatar: 'https://i.pravatar.cc/150?u=rina_hartono', text: 'Tasnya cantik dan rapi anyamannya. Suka banget!', date: '2024-07-19' },
];

export const MOCK_PROGRAMS: Program[] = [
  { id: 'simpanan', title: 'Simpanan Anggota', description: 'Tabungan aman dengan bagi hasil usaha (SHU) yang kompetitif.', longDescription: 'Program Simpanan Anggota adalah fondasi dari kekuatan finansial koperasi kita. Dengan menabung di koperasi, Anda tidak hanya mengamankan masa depan finansial Anda, tetapi juga turut serta dalam memperkuat modal usaha bersama. Kami menawarkan berbagai jenis simpanan, mulai dari Simpanan Pokok, Simpanan Wajib, hingga Simpanan Sukarela yang fleksibel. Setiap rupiah yang Anda simpan akan dikelola secara profesional untuk kegiatan usaha produktif, dan Anda berhak mendapatkan bagian dari Sisa Hasil Usaha (SHU) setiap tahunnya.', icon: 'BanknotesIcon', imageUrl: 'https://picsum.photos/seed/simpanan/1200/600', cta: { text: 'Lihat Detail Simpanan', link: '/savings' } },
  { id: 'pinjaman', title: 'Pinjaman Produktif', description: 'Akses modal usaha mudah dan cepat dengan bunga ringan.', longDescription: 'Butuh tambahan modal untuk mengembangkan usaha Anda? Program Pinjaman Produktif kami hadir untuk membantu. Kami menyediakan fasilitas pinjaman dengan proses yang mudah, cepat, dan bunga yang bersaing, jauh lebih ringan dibandingkan lembaga keuangan lainnya. Pinjaman ini dirancang khusus untuk mendukung usaha para anggota, baik untuk pembelian bahan baku, alat produksi, maupun ekspansi pasar. Mari majukan usaha Anda bersama kami.', icon: 'CreditCardIcon', imageUrl: 'https://picsum.photos/seed/pinjaman/1200/600', cta: { text: 'Ajukan Pinjaman Sekarang', link: '/loans' } },
  { id: 'marketplace', title: 'Marketplace Digital', description: 'Jual produk unggulan Anda ke pasar yang lebih luas.', longDescription: 'Marketplace Digital Koperasi Merah Putih adalah etalase online bagi produk-produk berkualitas dari para anggota. Melalui platform ini, produk Anda seperti hasil tani, kerajinan tangan, atau olahan makanan dapat diakses oleh pembeli dari berbagai daerah. Kami membantu dalam hal promosi, pengemasan, hingga logistik, sehingga Anda bisa fokus untuk menghasilkan produk terbaik. Ini adalah jembatan Anda menuju pasar yang lebih luas.', icon: 'ShoppingCartIcon', imageUrl: 'https://picsum.photos/seed/marketplace/1200/600', cta: { text: 'Kunjungi Marketplace', link: '/marketplace' } },
  { id: 'pelatihan', title: 'Pelatihan UMKM', description: 'Tingkatkan skill bisnis dan manajemen keuangan Anda.', longDescription: 'Kami percaya bahwa pengetahuan adalah kunci kesuksesan. Oleh karena itu, kami secara rutin mengadakan program Pelatihan UMKM bagi para anggota. Materi yang kami berikan sangat beragam, mulai dari manajemen keuangan sederhana, strategi pemasaran digital, teknik pengemasan produk yang menarik, hingga legalitas usaha. Pelatihan ini dibimbing oleh para ahli di bidangnya dan dirancang untuk mudah dipahami dan diaplikasikan dalam usaha Anda.', icon: 'AcademicCapIcon', imageUrl: 'https://picsum.photos/seed/pelatihan/1200/600', cta: { text: 'Hubungi Kami', link: '/about' } },
  { id: 'kebutuhan-harian', title: 'Layanan Kebutuhan Harian', description: 'Pesan sembako, gas, dan air galon langsung dari aplikasi.', longDescription: 'Tidak perlu repot keluar rumah untuk kebutuhan pokok. Melalui layanan ini, Anda dapat memesan sembako, gas elpiji, dan air minum galon dengan mudah melalui aplikasi. Pesanan akan diantar langsung ke depan pintu rumah Anda oleh kurir dari unit usaha koperasi, memastikan harga yang wajar dan pelayanan yang cepat.', icon: 'ShoppingCartIcon', imageUrl: 'https://picsum.photos/seed/sembako/1200/600', cta: { text: 'Pesan Kebutuhan Pokok', link: '/marketplace' } },
  { id: 'loyalitas', title: 'Poin Loyalitas', description: 'Kumpulkan poin dari setiap transaksi dan tukarkan dengan hadiah.', longDescription: 'Setiap aktivitas Anda di koperasi sangat kami hargai. Melalui Program Poin Loyalitas, setiap transaksi seperti menabung, berbelanja di marketplace, atau membayar angsuran tepat waktu akan mendapatkan poin. Poin yang terkumpul dapat Anda tukarkan dengan berbagai hadiah menarik, mulai dari voucher belanja, produk gratis, hingga potongan biaya administrasi. Semakin aktif Anda, semakin banyak keuntungan yang didapat.', icon: 'StarIcon', imageUrl: 'https://picsum.photos/seed/loyalitas/1200/600', cta: { text: 'Cek Poin Anda', link: '/loyalty' } },
  { id: 'kegiatan-sosial', title: 'Kegiatan Sosial', description: 'Bergotong royong membangun desa melalui kerja bakti dan acara komunitas.', longDescription: 'Semangat kebersamaan adalah pilar utama Desa Merah Putih. Melalui program Kegiatan Sosial, kami mengajak seluruh anggota dan warga untuk berpartisipasi aktif dalam kegiatan yang membangun dan mempererat tali persaudaraan. Mulai dari kerja bakti membersihkan lingkungan, perbaikan fasilitas umum, hingga penyelenggaraan acara syukuran dan perayaan hari besar. Ini adalah wadah kita untuk berkontribusi secara nyata bagi kemajuan desa dan kesejahteraan bersama.', icon: 'UserGroupIcon', imageUrl: 'https://picsum.photos/seed/gotongroyong/1200/600', cta: { text: 'Lihat Jadwal Kegiatan', link: '/programs/kegiatan-sosial' } },
  { id: 'ride-hailing', title: 'Layanan Transportasi', description: 'layanan antar online, aman dan terpercaya untuk kebutuhan warga', longDescription: 'Memperkenalkan layanan transportasi digital pertama di Desa Merah Putih! Butuh ke pasar, ke ladang, atau antar anak sekolah? Pesan ojek dengan mudah melalui aplikasi. Layanan ini dikelola oleh anggota koperasi, untuk anggota dan masyarakat desa, memastikan tarif yang adil dan keamanan bagi penumpang.', icon: 'TruckIcon', imageUrl: 'https://picsum.photos/seed/transportasi/1200/600', cta: { text: 'Pesan Sekarang', link: '/programs/ride-hailing' } },
];

export const MOCK_CAROUSEL_SLIDES = [
    { id: 'slide1', imageUrl: 'https://picsum.photos/seed/hero1/1600/900', title: 'Maju Bersama Koperasi Digital', description: 'Nikmati kemudahan layanan simpan pinjam, marketplace, dan berbagai program unggulan lainnya dalam satu genggaman.', buttonText: 'Masuk & Jelajahi' },
    { id: 'slide2', imageUrl: 'https://picsum.photos/seed/hero2/1600/900', title: 'Produk Lokal, Kualitas Global', description: 'Temukan dan beli produk-produk terbaik hasil karya anggota koperasi di Marketplace kami.', buttonText: 'Kunjungi Marketplace' },
    { id: 'slide3', imageUrl: 'https://picsum.photos/seed/hero3/1600/900', title: 'Wujudkan Impian Usaha Anda', description: 'Dapatkan akses permodalan yang mudah, cepat, dan aman untuk mengembangkan usaha Anda.', buttonText: 'Ajukan Pinjaman' },
];

export const MOCK_NEWS = [
    { id: 'news1', imageUrl: 'https://picsum.photos/seed/news1/400/300', category: 'Pelatihan', title: 'Koperasi Adakan Pelatihan Pemasaran Digital untuk UMKM', date: '15 Juli 2024' },
    { id: 'news2', imageUrl: 'https://picsum.photos/seed/news2/400/300', category: 'Prestasi', title: 'Produk Keripik Anggota Tembus Pasar Supermarket Kota', date: '12 Juli 2024' },
    { id: 'news3', imageUrl: 'https://picsum.photos/seed/news3/400/300', category: 'Pengumuman', title: 'Jadwal Pembagian Sisa Hasil Usaha (SHU) Tahun Buku 2023', date: '10 Juli 2024' },
];

export const MOCK_ORGANIZATION = [
    { name: 'H. Abdullah', role: 'Ketua Koperasi', imageUrl: 'https://i.pravatar.cc/150?u=ketua' },
    { name: 'Siti Aminah', role: 'Sekretaris', imageUrl: 'https://i.pravatar.cc/150?u=sekretaris' },
    { name: 'Bambang Sudiro', role: 'Bendahara', imageUrl: 'https://i.pravatar.cc/150?u=bendahara' },
    { name: 'Dewi Lestari', role: 'Manajer Usaha', imageUrl: 'https://i.pravatar.cc/150?u=manajer' },
];

export const SHU_PROJECTION_DATA = [
    { name: 'Jan', SHU: 40000 }, { name: 'Feb', SHU: 30000 }, { name: 'Mar', SHU: 50000 },
    { name: 'Apr', SHU: 45000 }, { name: 'Mei', SHU: 60000 }, { name: 'Jun', SHU: 55000 },
    { name: 'Jul', SHU: 70000 }, { name: 'Agu', SHU: 75000 }, { name: 'Sep', SHU: 65000 },
    { name: 'Okt', SHU: 80000 }, { name: 'Nov', SHU: 90000 }, { name: 'Des', SHU: 100000 },
];

export const MOCK_LOYALTY_REWARDS: LoyaltyReward[] = [
  { id: 'REW001', name: 'Voucher Pulsa Rp10.000', description: 'Tukarkan poin Anda dengan voucher pulsa senilai Rp10.000.', pointsRequired: 1000, imageUrl: 'https://picsum.photos/seed/pulsa/400/300' },
  { id: 'REW002', name: 'Minyak Goreng 1 Liter', description: 'Dapatkan 1 liter minyak goreng berkualitas untuk kebutuhan dapur Anda.', pointsRequired: 2500, imageUrl: 'https://picsum.photos/seed/minyak/400/300' },
  { id: 'REW003', name: 'Potongan Angsuran Rp50.000', description: 'Gunakan poin untuk mendapatkan potongan angsuran pinjaman.', pointsRequired: 5000, imageUrl: 'https://picsum.photos/seed/potongan/400/300' },
  { id: 'REW004', name: 'Gratis 1 Produk UMKM', description: 'Pilih 1 produk unggulan dari marketplace secara gratis.', pointsRequired: 7500, imageUrl: 'https://picsum.photos/seed/gratisproduk/400/300' },
];

export const MOCK_LOYALTY_TRANSACTIONS: LoyaltyTransaction[] = [
  { id: 'LP001', date: '2024-07-20', description: 'Pembelian di Marketplace', points: 30, type: 'earned' },
  { id: 'LP002', date: '2024-07-15', description: 'Pembayaran Iuran Wajib', points: 10, type: 'earned' },
  { id: 'LP003', date: '2024-07-05', description: 'Bayar Angsuran Tepat Waktu', points: 50, type: 'earned' },
  { id: 'LP004', date: '2024-06-25', description: 'Tukar Voucher Pulsa', points: -1000, type: 'redeemed' },
  { id: 'LP005', date: '2024-06-15', description: 'Pembayaran Iuran Wajib', points: 10, type: 'earned' },
  // The points for SHU are now calculated directly from the SHU value and conversion rate.
  { id: 'LP006', date: '2024-01-10', description: 'Pembagian Poin SHU 2023', points: SHU_2023_RUPIAH / RUPIAH_PER_SHU_POINT, type: 'earned' },
];

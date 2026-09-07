import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Building2,
  Compass,
  HeartHandshake,
  Layers,
  MessageSquareText,
  Ruler,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
import { SITE_INFO } from './layout';

export const ABOUT_PAGE = {
  hero: {
    breadcrumbLabel: 'Tentang Kami',
    kicker: 'Tentang Nusa Atelier',
    title: 'Warisan 30+ Tahun Dedikasi',
    accent: 'Desain Interior & Tekstil Berkelas',
    description:
      'Didirikan pada tahun 1992, Nusa Atelier bertransformasi dari sebuah workshop atelier gorden dan jok kursi menjadi salah satu destinasi terlengkap untuk kebutuhan soft-furnishing dan interior mewah di Indonesia.',
    image: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
    alt: 'Showroom Nusa Atelier Senopati',
  },
  metrics: [
    { value: SITE_INFO.experienceYears, label: 'Tahun Pengalaman' },
    { value: SITE_INFO.projectsCount, label: 'Proyek Tercatat' },
    { value: SITE_INFO.fabricCount, label: 'Sampel Kain Internasional' },
    { value: '2', label: 'Showroom Jakarta' },
  ],
  heritage: {
    kicker: 'Sejak 1992',
    title1: 'Menghidupkan Jiwa Ruangan Melalui',
    titleAccent: 'Karakter Bahan',
    title3: '& Kehangatan Desain',
    paragraphs: [
      'Bagi kami, gorden bukan sekadar penutup jendela dan sofa bukan sekadar tempat duduk. Keduanya adalah elemen sentuh utama yang mendefinisikan suasana, akustik, serta kehangatan sebuah rumah tinggal.',
      'Sejak pembukaan atelier pertama kami di kawasan Menteng, Jakarta Pusat pada awal tahun 90-an hingga ekspansi showroom utama di kawasan Senopati, Jakarta Selatan, kami telah dipercaya oleh ribuan pemilik rumah tinggal, arsitek ternama, kedutaan besar, hingga jaringan hotel bintang lima di Indonesia.',
      'Setiap potong kain yang kami pilih melalui uji ketahanan ketat—mulai dari tes abrasi Martindale hingga resistensi sinar ultraviolet tropis—memastikan hasil akhir tetap indah bertahan puluhan tahun tanpa memudar atau mudah rusak.',
    ],
    qualityCard: {
      title: 'Standar Kualitas',
      text: 'Kain berstandar internasional lolos uji abrasi Martindale dan resisten terhadap paparan sinar ultraviolet tropis.',
    },
    relationshipCard: {
      title: 'Hubungan Panjang',
      text: 'Banyak klien kami adalah generasi kedua keluarga yang tetap mempercayakan keindahan hunian kepada kami.',
    },
    images: [
      {
        src: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
        alt: 'Showroom Nusa Atelier Senopati',
      },
      {
        src: '/assets/unsplash-1586023492125-27b2c045efd7.jpg',
        alt: 'Detail Upholstery Leather Sofa',
      },
    ],
    philosophyQuote:
      '"Karya interior terbaik tidak bersuara keras; ia terasa tenang, kokoh, dan anggun dalam keseharian."',
  },
  journey: {
    kicker: 'Perjalanan Kami',
    title1: 'Tiga Dekade',
    titleAccent: 'Bertumbuh',
    title3: 'dalam Keheningan',
    intro:
      'Setiap babak membawa kami lebih dalam ke dunia tekstil, motorisasi, dan pengerajinan tangan — tanpa pernah melepas karakter atelier kecil di awal perjalanan.',
    milestones: [
      { year: '1992', title: 'Atelier Pertama di Menteng', desc: 'Berdiri dengan lima pengrajin ahli di kawasan pusat Jakarta.' },
      { year: '2000', title: 'Era Motorisasi Gorden', desc: 'Memperkenalkan rel motor listrik dan gorden otomatis untuk residensial dan perkantoran.' },
      { year: '2008', title: 'Showroom Flagship Senopati', desc: 'Galeri 10.000+ sampel kain dunia serta divisi furnitur dan upholstery custom.' },
      { year: '2018', title: 'Smart Home & Grosir Regional', desc: 'Mitra resmi Somfy (Prancis) dan Dooya; distribusi wholesale hingga Singapura.' },
      { year: 'Hari Ini', title: '1.800+ Proyek Dipercaya', desc: 'Melayani hunian mewah, hotel bintang lima, kedutaan besar, dan arsitek ternama.' },
    ],
  },
  workshop: {
    kicker: 'Workshop & Atelier',
    title1: 'Dibuat Oleh Tangan Pengrajin Master,',
    titleAccent: 'Bukan Mesin Cetak',
    title3: 'Massal',
    paragraphs: [
      'Berbeda dari produk ritel siap pakai yang diproduksi massal dengan ukuran generik, setiap potong gorden dan furnitur di Nusa Atelier dijahit secara individual di workshop kami di Jakarta.',
      'Para master tailor kami memiliki pengalaman puluhan tahun dalam menangani berbagai karakter serat kain—dari sutra halus yang membutuhkan sentuhan lembut, velvet berat yang menuntut ketelitian sambungan serat, hingga Belgian linen alami.',
    ],
    features: [
      { icon: Scissors as LucideIcon, title: 'Hand-Finished Detail', desc: 'French pleat & ripple-fold dijahit tangan, bukan mesin massal.' },
      { icon: Ruler as LucideIcon, title: 'Pengukuran Milimeter', desc: 'Survei teknis memakai laser distance meter hingga sudut jendela.' },
      { icon: Layers as LucideIcon, title: 'Steam Shaping', desc: 'Uap suhu khusus memastikan lipatan gelombang jatuh rapi permanen.' },
      { icon: ShieldCheck as LucideIcon, title: 'Rangka Solid Oven', desc: 'Kayu jati/mahoni dry-kiln dengan spring baja dan busa HR.' },
    ],
    noteTitle: 'Teknik Blind-Stitch & Weighted Hem Lead Tape',
    noteDesc:
      'Bagian bawah tirai dipasangi pemberat khusus agar jatuhan kain tetap lurus tanpa meliuk saat hembusan pendingin udara atau angin alami jendela.',
    ctaLabel: 'Reservasi Kunjungan Showroom',
    images: [
      {
        src: '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
        alt: 'Workshop Pembuatan Custom Sofa',
      },
      {
        src: '/assets/unsplash-1513694203232-719a280e022f.jpg',
        alt: 'Detail Jahitan Gorden Presisi',
      },
    ],
  },
  craft: {
    kicker: 'Cara Kami Bekerja',
    title1: 'Empat Tahap',
    titleAccent: 'Terbuka &',
    title3: 'Terukur',
    steps: [
      { step: '01', icon: MessageSquareText as LucideIcon, title: 'Konsultasi & Kurasi Material', desc: 'Visi ruang didiskusikan bersama konsultan interior; karakter kain, warna, dan tekstur dikurasi untuk harmoni.' },
      { step: '02', icon: Ruler as LucideIcon, title: 'Survei On-Site & Pengukuran', desc: 'Tim teknis datang membawa selusin koper katalog kain fisik untuk dicocokkan pada cahaya asli ruangan.' },
      { step: '03', icon: Scissors as LucideIcon, title: 'Craftsmanship di Workshop', desc: 'Dijahit individual oleh master tailor berpengalaman 20+ tahun dengan kelim presisi dan rel premium.' },
      { step: '04', icon: ShieldCheck as LucideIcon, title: 'Instalasi Bersih & Garansi', desc: 'Teknisi in-house memasang rapi, merapikan steam pleat, dan menyerahkan garansi resmi rel.' },
    ],
    note: 'Estimasi pengerjaan rata-rata 7–21 hari kerja, tergantung kompleksitas proyek',
  },
  quality: {
    kicker: 'Standar Kualitas & Garansi',
    title1: 'Diuji Ketat,',
    titleAccent: 'Dipertanggungjawabkan',
    title3: 'Sepenuhnya',
    paragraph:
      'Sebelum sebuah kain layak masuk ke rumah Anda, ia harus melewati laboratorium uji kami. Setiap koleksi dites untuk ketahanan abrasi, stabilitas warna terhadap sinar matahari tropis, hingga kekuatan sambungan benang — standar yang sama digunakan hotel-hotel bintang lima dan proyek kedutaan besar.',
    checks: [
      'Lolos uji abrasi Martindale — dirancang bertahan puluhan tahun pemakaian.',
      'Resistensi sinar ultraviolet tropis agar warna tidak cepat memudar.',
      'Kelim dan benang berstandar jahitan hotel bintang lima.',
      'Uji kelurusan gelombang dan pembersihan lokasi setelah instalasi.',
    ],
    image: {
      src: '/assets/unsplash-1616486338812-3dadae4b4ace.jpg',
      alt: 'Pengerjaan Gorden Mewah — Quality Check Nusa Atelier',
    },
    warrantyItems: [
      { value: '1–5', label: 'Tahun Garansi Resmi Rel & Mekanisme' },
      { value: 'Gratis', label: 'Survei & Pengukuran Seluruh Jabodetabek' },
      { value: '100%', label: 'Instalasi Bersih Bebas Noda' },
      { value: '365', label: 'Hari Dukungan Servis Purnajual' },
    ],
  },
  wholesale: {
    kicker: 'Distributor & Wholesale',
    title1: 'Pemasok Tekstil Terpercaya untuk',
    titleAccent: 'Toko & Desainer',
    title3: 'se-Nusantara',
    paragraphs: [
      'Selain melayani proyek residensial privat, Nusa Atelier memiliki divisi wholesale (grosir) yang menjadi distributor resmi ribuan roll kain interior berkualitas ke toko-toko gorden, desainer, dan kontraktor interior di seluruh Indonesia, Singapura, dan Malaysia.',
      'Setiap mitra grosir memperoleh akses katalog terbaru sebelum dirilis publik, prioritas stok untuk koleksi terbatas, serta dukungan teknis cara menjahit dan memasang material khusus.',
    ],
    cards: [
      { icon: Building2 as LucideIcon, title: 'Kerjasama B2B & Proyek', desc: 'Dukungan sample book, harga grosir bertingkat, dan kepastian ketersediaan stok roll kain.' },
      { icon: Layers as LucideIcon, title: 'Distribusi Nusantara', desc: 'Pengiriman teratur ke Jawa, Bali, Sumatera, Kalimantan, hingga Sulawesi.' },
    ],
    regions: ['Indonesia', 'Singapura', 'Malaysia'],
    image: {
      src: '/assets/unsplash-1600585152220-90363fe7e115.jpg',
      alt: 'Gudang Tekstil & Divisi Wholesale Nusa Atelier',
    },
  },
  pillars: {
    kicker: 'Pilar Utama Kami',
    title1: 'Tiga Komitmen',
    titleAccent: 'Konsisten',
    title3: 'sejak 1992',
    items: [
      { num: '01', icon: Award as LucideIcon, title: 'Kurasi Material Kelas Dunia', desc: 'Kami mengimpor langsung ribuan motif dan tekstur kain dari pabrik tekstil terkemuka di Belgia, Italia, Spanyol, Turki, serta pengrajin tenun lokal Indonesia.' },
      { num: '02', icon: Compass as LucideIcon, title: 'Presisi Ukuran & Pemasangan', desc: 'Survei teknis dilakukan oleh tim berpengalaman untuk mengukur sudut jendela, kekuatan plafon beton, serta jalur kelistrikan motor gorden otomatis.' },
      { num: '03', icon: HeartHandshake as LucideIcon, title: 'Layanan Ramah & Berkelanjutan', desc: 'Kami mendampingi Anda mulai dari pemilihan swatch sampel warna, penjahitan, instalasi bersih tanpa noda, hingga garansi purnajual resmi.' },
    ],
  },
  ctaBand: {
    title: 'Rencanakan Kunjungan',
    accent: 'Konsultasi Gratis Bersama Tim Kami',
    description:
      'Jadwalkan kunjungan ke showroom atau workshop kami di Jakarta untuk melihat langsung kualitas material, sistem motorized, dan konsultasi teknis tanpa biaya.',
  },
};
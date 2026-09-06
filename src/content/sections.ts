import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Building2,
  Compass,
  HeartHandshake,
  Layers,
  Ruler,
  Scissors,
  ShieldCheck,
} from 'lucide-react';
import { SITE_INFO } from './layout';

/* ============ HERO (Beranda) ============ */

export interface HeroSlide {
  image: string;
  alt: string;
  kicker: string;
  headlineTop: string;
  headlineAccent: string;
  body: string;
  cues: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/assets/unsplash-1616486338812-3dadae4b4ace.jpg',
    alt: 'Gorden French Pleat mewah di ruang keluarga',
    kicker: 'Gorden Mewah — Drapery Custom',
    headlineTop: 'Lipit Sempurna, Nuansa',
    headlineAccent: 'Ruang Tak Terhitung.',
    body: 'French pleat, ripple fold, hingga vitrase linen — dijahit presisi oleh master tailor in-house dari ribuan bahan kain impor pilihan dunia.',
    cues: ['32+ Tahun Pengalaman', '10.000+ Kain Dunia', 'Survei & Ukur Gratis'],
  },
  {
    image: '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
    alt: 'Sofa custom berpelapis bouclé premium',
    kicker: 'Custom Sofa & Upholstery',
    headlineTop: 'Furnitur Khusus, Dibuat',
    headlineAccent: 'Fokus pada Detail Terakhir.',
    body: 'Sofa bouclé & velvet impor, reupholstery antik, sampai furniture made-to-measure — dikerjakan di workshop sendiri dengan garansi kualitas.',
    cues: ['1.800+ Proyek Selesai', 'Workshop & Atelier Sendiri', 'Garansi Kualitas'],
  },
  {
    image: '/assets/unsplash-1581858726788-75bc0f6a952d.jpg',
    alt: 'Lantai parquet kayu premium',
    kicker: 'Lantai Parquet & Karpet Wool',
    headlineTop: 'Pijakan Hangat, Lantai',
    headlineAccent: 'Kayu & Karpet Pilihan.',
    body: 'Parquet kayu premium, karpet wool impor, serta acoustic wallcovering — dipasang presisi dengan material ramah lingkungan untuk hunian sehat.',
    cues: ['2 Showroom Jakarta', 'Material Impor Pilihan', 'Layanan Nasional'],
  },
];

export const HERO_CTA = {
  waMessage: 'Halo Nusa Atelier, saya ingin konsultasi mengenai interior',
  waLabel: 'Konsultasi WhatsApp',
  exploreLabel: 'Eksplor Katalog',
};

export const WHATSAPP_FLOAT = {
  buttonAriaLabel: 'Chat WhatsApp',
  label: 'Konsultan Siap Membantu',
  chatHeading: 'Selamat Datang di Nusa Atelier',
  chatDescription:
    'Ada yang bisa kami bantu seputar survei lokasi gratis, katalog, atau pemilihan gorden & upholstery?',
  quickTitle: 'Pilihan Cepat Konsultasi:',
  quickMessages: [
    'Halo, saya ingin menjadwalkan survei gratis di rumah saya.',
    'Halo, saya ingin konsultasi pemilihan gorden untuk apartemen.',
    'Halo, apakah saya bisa minta pricelist kain upholstery sofa?',
    'Halo, saya ingin menanyakan jam buka showroom Fatmawati.',
  ],
  openChatLabel: 'Buka Percakapan WhatsApp',
  defaultMessage: 'Halo Nusa Atelier, saya ingin berkonsultasi',
  iconMark: 'NA',
  iconBrand: 'Nusa Atelier',
};

/* ============ ABOUT SECTION (Beranda) ============ */

export const ABOUT_SECTION = {
  kicker: 'Tentang Nusa Atelier',
  headingTop: 'Warisan 30+ Tahun dalam Setiap',
  headingAccent: 'Lipatan & Jahitan.',
  introParagraph:
    'Atelier gorden dan jok kursi sejak 1992 — kini menjadi destinasi terlengkap untuk soft-furnishing, motorisasi, dan furnitur custom-made di Indonesia.',
  introTagline: 'Sejak 1992 — Jakarta',
  quickFacts: [
    { value: SITE_INFO.experienceYears, label: 'Tahun Pengalaman' },
    { value: SITE_INFO.projectsCount, label: 'Proyek Selesai' },
    { value: SITE_INFO.fabricCount, label: 'Sampel Kain Dunia' },
    { value: '2', label: 'Galeri Showroom' },
    { value: '1–5', label: 'Tahun Garansi' },
  ],
  heritage: {
    intro: 'Sejak 1992, kami tumbuh dari sebuah atelier kecil menjadi rumah bagi ribuan motif kain, motorisasi cerdas, dan furnitur yang dijahit tangan.',
    paragraph:
      'Bagi kami, gorden bukan sekadar penutup jendela dan sofa bukan sekadar tempat duduk. Keduanya adalah elemen sentuh utama yang mendefinisikan suasana, akustik, serta kehangatan sebuah hunian.',
    quote:
      '"Karya interior terbaik tidak bersuara keras; ia terasa tenang, kokoh, dan anggun dalam keseharian."',
    quoteLabel: 'Filosofi Kami',
    timelineLabel: 'Lini Masa',
    timeline: [
      { year: '1992', text: 'Atelier pertama dibuka di Pintu Air, Jakarta Pusat.' },
      { year: '2008', text: 'Showroom flagship Jl. RS Fatmawati dengan galeri sampel terlengkap.' },
      { year: '2018', text: 'Divisi motorized & smart home — mitra resmi Somfy dan Dooya.' },
      { year: 'Sekarang', text: 'Jaringan distribusi grosir hingga Singapura & Malaysia.' },
    ],
    image: {
      src: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
      alt: 'Showroom Heritage Nusa Atelier Fatmawati',
    },
    imageDetail: {
      src: '/assets/unsplash-1513694203232-719a280e022f.jpg',
      alt: 'Detail Jahitan Gorden Presisi',
    },
  },
  tabs: [
    { key: 'story', label: 'Kisah Sejak 1992' },
    { key: 'workshop', label: 'Workshop & Atelier' },
    { key: 'wholesale', label: 'Distributor & Wholesale' },
  ] as { key: 'story' | 'workshop' | 'wholesale'; label: string }[],
  story: {
    title: 'Menghidupkan Jiwa Ruangan Melalui Karakter Bahan & Kehangatan Desain',
    paragraphs: [
      'Sejak pembukaan gerai pertama di Pintu Air hingga ekspansi showroom utama di Jalan RS Fatmawati, kami telah dipercaya oleh ribuan pemilik rumah tinggal, arsitek ternama, kedutaan besar, hingga jaringan hotel bintang lima di Indonesia.',
    ],
    points: [
      'Kurasi langsung dari pabrik tekstil Belgia, Italia, Spanyol, dan Turki.',
      'Kain berstandar internasional — lolos uji abrasi Martindale & resisten UV tropis.',
      'Layanan menyeluruh: konsultasi → survei → penjahitan → instalasi → garansi.',
    ],
    chips: [
      { value: '5★', label: 'Hotel & Embassy' },
      { value: '100+', label: 'Arsitek & Desainer' },
      { value: '100%', label: 'Hand-Finished' },
    ],
    images: [
      {
        src: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
        alt: 'Showroom Nusa Atelier Fatmawati',
      },
      {
        src: '/assets/unsplash-1586023492125-27b2c045efd7.jpg',
        alt: 'Detail Upholstery Leather Sofa',
      },
    ],
    philosophyLabel: 'Filosofi',
    philosophyQuote:
      '"Karya interior terbaik tidak bersuara keras; ia terasa tenang, kokoh, dan anggun dalam keseharian."',
  },
  workshop: {
    title: 'Dibuat Oleh Tangan Pengrajin Master, Bukan Mesin Cetak Massal',
    paragraphs: [
      'Berbeda dari produk ritel siap pakai yang diproduksi massal dengan ukuran generik, setiap potong gorden dan furnitur di Nusa Atelier dijahit secara individual di workshop kami di Jakarta.',
      'Para master tailor kami memiliki pengalaman puluhan tahun dalam menangani berbagai karakter serat kain — dari sutra halus, velvet berat, hingga Belgian linen alami.',
    ],
    features: [
      { icon: Scissors, title: 'Hand-Finished Detail', desc: 'French pleat & ripple-fold dijahit tangan, bukan dengan mesin cetak massal.' },
      { icon: Ruler, title: 'Pengukuran Milimeter', desc: 'Survei teknis memakai laser distance meter hingga sudut jendela dan plafon.' },
      { icon: Layers, title: 'Steam Shaping', desc: 'Proses uap suhu khusus agar lipatan gelombang jatuh rapi dan permanen.' },
      { icon: ShieldCheck, title: 'Rangka Solid Oven', desc: 'Kayu jati/mahoni dry-kiln dengan sistem spring baja dan busa HR.' },
    ] as { icon: LucideIcon; title: string; desc: string }[],
    footerNote:
      'Teknik Blind-Stitch & Weighted Hem Lead Tape — pemberat khusus menjaga jatuhan kain tetap lurus tanpa meliuk.',
    tagline: 'In-House Workshop — Jakarta',
  },
  wholesale: {
    title: 'Pemasok Tekstil Terpercaya untuk Toko & Desainer se-Nusantara',
    paragraphs: [
      'Divisi wholesale (grosir) kami menjadi distributor resmi ribuan roll kain interior ke toko gorden, desainer, dan kontraktor interior di seluruh Indonesia, dengan dukungan sample book dan harga grosir bertingkat.',
    ],
    cards: [
      { icon: Building2, title: 'Kerjasama B2B & Proyek', desc: 'Harga grosir bertingkat, sample book, dan kepastian ketersediaan stok roll.' },
      { icon: Layers, title: 'Distribusi Nusantara', desc: 'Pengiriman teratur ke Jawa, Bali, Sumatera, Kalimantan, hingga Sulawesi.' },
    ] as { icon: LucideIcon; title: string; desc: string }[],
    regions: ['Indonesia', 'Singapura', 'Malaysia'],
  },
  pillars: [
    {
      num: '01',
      icon: Award,
      title: 'Kurasi Material Kelas Dunia',
      desc: 'Kami mengimpor langsung ribuan motif dan tekstur kain dari pabrik tekstil terkemuka di Belgia, Italia, Spanyol, Turki, serta pengrajin tenun lokal Indonesia.',
    },
    {
      num: '02',
      icon: Compass,
      title: 'Presisi Ukuran & Pemasangan',
      desc: 'Survei teknis dilakukan oleh tim berpengalaman untuk mengukur sudut jendela, kekuatan plafon beton, serta jalur kelistrikan motor gorden otomatis.',
    },
    {
      num: '03',
      icon: HeartHandshake,
      title: 'Layanan Ramah & Berkelanjutan',
      desc: 'Kami mendampingi Anda mulai dari pemilihan swatch sampel warna, penjahitan, instalasi bersih tanpa noda, hingga garansi purnajual resmi.',
    },
  ] as { num: string; icon: LucideIcon; title: string; desc: string }[],
  ctaLabel: 'Lihat Sejarah, Workshop & Layanan Lengkap',
};

/* ============ PRODUCT CATEGORIES (Beranda) ============ */

export const PRODUCT_CATEGORIES_SECTION = {
  kicker: 'Koleksi & Produk Eksklusif',
  headingTop: 'Kurasi Interior & ',
  headingAccent: 'Tekstil Mewah',
  headingTail: ' untuk Setiap Ruang',
  paragraph: 'Tersedia lebih dari 10.000 sampel kain impor, rel motorik otomatis, dan perabotan custom made.',
  detailLabel: 'Detail Bahan',
  extraMaterialsLabel: ' lainnya',
  reserveCardLabel: 'Reservasi Kunjungan',
  banner: {
    title: 'Memiliki Desain Sendiri atau Gambar Referensi Arsitek?',
    text: 'Kirimkan foto, denah, atau gambar render 3D Anda kepada kami untuk kalkulasi estimasi kebutuhan kain & rel secara gratis.',
    ctaLabel: 'Reservasi Kunjungan Showroom',
  },
  detailCtaLabel: 'Lihat Seluruh Koleksi Produk & Spesialisasi',
};

/* ============ END TO END SERVICE (Beranda) ============ */

export const END_TO_END_SERVICE = {
  kicker: 'Proses Kerja Transparan & Rapi',
  headingTop: 'Layanan End-to-End: Dari Gagasan Desain Hingga ',
  headingAccent: 'Terpasang Sempurna',
  paragraph:
    'Kami mengelola seluruh proses di bawah satu atap tanpa perantara lepas. Mulai dari penentuan konsep, pengukuran on-site, penjahitan di workshop sendiri, hingga instalasi bergaransi.',
  stageLabelPrefix: 'Tahap ',
  stageLabelSuffix: ' dari 4',
  residential: {
    label: 'Layanan Khusus Residensial',
    title: 'Kunjungan Survei Rumah dengan Koper Katalog Lengkap',
    body: 'Tak sempat datang ke showroom? Konsultan kami dapat dijadwalkan datang ke kediaman Anda di seluruh area Jabodetabek membawa pilihan ratusan swatch kain gorden, katalog wallpaper, dan sampel kayu blinds.',
    points: [
      'Pengukuran akurat dengan laser distance meter',
      'Evaluasi kekuatan plafon dan celah drop-ceiling (curtain box)',
      'Kalkulasi estimasi penawaran harga transparan di hari yang sama',
    ],
    ctaLabel: 'Reservasi Kunjungan Showroom',
  },
  architect: {
    label: 'Kolaborasi Arsitek & Desainer Interior',
    title: 'Dukungan Teknis & Penawaran Khusus Profesional',
    body: 'Kami adalah mitra terpercaya bagi para arsitek (IAI) dan desainer interior (HDII). Kami menyediakan sample book fisik untuk studio Anda, mockup potongan kain, serta asistensi teknis pemasangan rel lengkung dan motorized void tinggi.',
    points: [
      'Peminjaman sample book lengkap untuk presentasi klien',
      'Skema harga khusus profesional (Trade & Project Discount)',
      'Garansi ketepatan waktu deadline serah terima proyek',
    ],
    ctaLabel: 'Hubungi Tim Project / B2B',
    waMessage: 'Halo Nusa Atelier, saya arsitek/desainer interior ingin berkolaborasi',
  },
  detailCtaLabel: 'Jelajahi Seluruh Layanan Secara Lengkap',
};

/* ============ TESTIMONIALS (Selalu Muncul) ============ */

export const TESTIMONIALS_SECTION = {
  kicker: 'Kepercayaan Klien & Rekan Arsitek',
  headingTop: 'Dipercaya Generasi Pemilik Hunian Berkelas ',
  headingAccent: 'Sejak 1992',
  paragraph:
    'Kepuasan sejati lahir dari perhatian mendalam terhadap detail, kerapian jahitan, dan integritas janji waktu pengerjaan kami.',
  bannerTitle: 'Arsitek & Desainer Interior:',
  bannerText: 'Kami menyediakan layanan peminjaman katalog fisik & swatch kain gratis untuk keperluan moodboard Anda.',
  bannerCtaLabel: 'Hubungi Divisi Project',
  bannerWaMessage: 'Halo Nusa Atelier, saya arsitek/desainer ingin meminjam katalog sampel kain',
};

/* ============ FAQ (Selalu Muncul) ============ */

export const FAQ_SECTION = {
  kicker: 'Pertanyaan yang Sering Diajukan',
  headingTop: 'Informasi Transparan untuk ',
  headingAccent: 'Kenyamanan Anda',
  paragraph:
    'Semua hal yang perlu Anda ketahui mengenai proses survei, spesifikasi bahan, waktu pengerjaan, hingga garansi purnajual.',
  askBox: {
    title: 'Punya Pertanyaan Spesifik Mengenai Ukuran atau Denah Ruang Anda?',
    text: 'Konsultan kami siap menjawab dan memberikan saran teknis langsung melalui chat WhatsApp.',
    ctaLabel: 'Tanya Tim Ahli Kami via WhatsApp',
    waMessage: 'Halo Nusa Atelier, saya memiliki pertanyaan seputar interior',
  },
};

/* ============ SHOWROOMS (Selalu Muncul) ============ */

export const SHOWROOMS_SECTION = {
  kicker: 'Kunjungi Galeri Fisik Kami',
  headingTop: 'Sentuh & Rasakan Langsung ',
  headingAccent: 'Koleksi Tekstil',
  headingTail: ' Terbaik di Showroom Jakarta',
  paragraph:
    'Kunjungi galeri kami di Jakarta Selatan atau Jakarta Pusat untuk merasakan tekstur bahan kain asli, melihat demonstrasi sistem rel bermotor, dan berdiskusi langsung bersama konsultan interior kami.',
  infoLabels: {
    address: 'Alamat Lengkap:',
    hours: 'Jam Operasional:',
    phone: 'Telepon Showroom:',
    facilities: 'Fasilitas & Keunggulan Galeri:',
  },
  actionLabels: {
    maps: 'Petunjuk Google Maps',
    reserve: 'Reservasi Kunjungan',
    openMap: 'Buka Peta',
  },
};

/* ============ CTABAND & PAGE HERO (Selalu Muncul) ============ */

export const CTABAND = {
  reserveLabel: 'Reservasi Kunjungan Showroom',
  waMessage: 'Halo Nusa Atelier, saya ingin berkonsultasi mengenai interior',
  waLabel: 'Konsultasi WhatsApp',
};

export const PAGE_HERO = {
  breadcrumbHome: 'Beranda',
  reserveCtaLabel: 'Reservasi Kunjungan Showroom',
};
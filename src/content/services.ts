import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Clock,
  Droplets,
  Home,
  Layers,
  LayoutGrid,
  Palette,
  RefreshCcw,
  ShieldCheck,
  SlidersHorizontal,
  Sofa,
  Sparkles,
  Wifi,
  Wrench,
} from 'lucide-react';
import { SITE_INFO } from './layout';

export const SERVICES_PAGE = {
  hero: {
    breadcrumbLabel: 'Layanan',
    kicker: 'Layanan End-to-End Terpadu',
    title: 'Satu Atap Untuk ',
    accent: 'Seluruh Kebutuhan Interior Anda',
    description:
      'Dari konsultasi desain, kurasi material, survei on-site, pengerjaan di workshop in-house, hingga instalasi bergaransi — kami mengelola seluruh proses di bawah satu pengawasan tanpa perantara. Melayani hunian residensial, proyek arsitek, dan segmen komersial.',
    image: '/assets/unsplash-1616486338812-3dadae4b4ace.jpg',
    alt: 'Detail Pengerjaan Gorden Mewah Nusa Atelier',
  },
  overview: {
    kicker: 'Ikhtisar Layanan Kami',
    title1: 'Bukan Sekadar Menjual Produk,',
    titleAccent: 'Kami Mengelola Proyek',
    title3: 'Anda Secara Utuh',
    paragraphs: [
      'Sejak 1992, Nusa Atelier melayani lebih dari 1.800+ proyek — dari rumah tinggal mewah, penthouse, hingga hotel dan kedutaan besar. Setiap layanan dirancang untuk menjadi satu pintu: konsultasi, fabrikasi, dan pemasangan dikerjakan oleh tim yang sama di bawah satu tanggung jawab.',
      'Keunggulan kami terletak pada workshop dan atelier in-house. Tidak ada pihak luar yang mengerjakan jahitan, rangka, maupun pemasangan — sehingga standar presisi dan garansi dapat kami kendalikan penuh.',
    ],
    stats: [
      { icon: ShieldCheck as LucideIcon, value: '1–5 Tahun', label: 'Garansi Resmi Tertulis' },
      { icon: Clock as LucideIcon, value: '7–21 Hari', label: 'Estimasi Pengerjaan' },
      { icon: Palette as LucideIcon, value: SITE_INFO.fabricCount, label: 'Sampel Kain' },
    ],
    image: {
      src: '/assets/unsplash-1513694203232-719a280e022f.jpg',
      alt: 'Suasana Interior Hunian Mewah dengan Gorden NA',
    },
  },
  serviceLines: {
    kicker: 'Ruang Lingkup Layanan',
    title1: 'Empat Lini Layanan',
    titleAccent: 'Utama Kami',
    lines: [
      {
        icon: Layers as LucideIcon,
        title: 'Gorden & Window Fashion',
        desc: 'Drapery custom mulai dari French Pleat klasik, Ripple-Fold modern, hingga vitrase sheer linen Eropa dengan jatuh kain flawless.',
        points: [
          'Double drapery berlapis & lining blackout penuh',
          'Rel premium, curtain box, dan void hingga 6 meter tanpa sambungan',
          'Kompatibel sistem motorized & integrasi smart home',
        ],
      },
      {
        icon: SlidersHorizontal as LucideIcon,
        title: 'Blinds & Window Shades',
        desc: 'Wooden Venetian, Silhouette & Shangri-La, roller blinds, dan honeycomb — kontrol cahaya presisi dengan kesan bersih tanpa tali.',
        points: [
          'Slat basswood presisi lebar 50mm, 18 pilihan urat kayu',
          'Kontrol remote / aplikasi / smart home (Somfy, Dooya)',
          'Instalasi jendela lengkung, skylight, dan bi-folding door',
        ],
      },
      {
        icon: Sofa as LucideIcon,
        title: 'Upholstery & Custom Furniture',
        desc: 'Sofa custom, reupholstery, headboard, dan kursi makan dengan bahan dari bouclé bertekstur hingga kulit full-grain Italia.',
        points: [
          'Rangka jati/mahoni dry-kiln dengan spring suspension baja',
          'Busa HR high-resilience + feather-down; jahitan blind-stitch',
          'Layanan CMT (cut, make & trim) untuk kain milik klien',
        ],
      },
      {
        icon: LayoutGrid as LucideIcon,
        title: 'Wallpaper & Flooring Kustom',
        desc: 'Wallcovering sutra & grasscloth seamless serta lantai parquet engineered oak dan karpet hand-tufted serat wool New Zealand.',
        points: [
          'Pemasangan seamless tanpa sambungan terlihat',
          'Fire-retardant Class A, bebas VOC, akustik nyaman',
          'Parquet herringbone/chevron — aman untuk underfloor heating',
        ],
      },
    ],
  },
  process: {
    kicker: 'Proses Kerja Transparan',
    title1: 'Empat Tahap yang',
    titleAccent: 'Pasti Dilalui',
    title3: 'Setiap Pelanggan',
    images: [
      '/assets/unsplash-1586023492125-27b2c045efd7.jpg',
      '/assets/unsplash-1618221195710-dd6b41faaea6.jpg',
      '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
      '/assets/unsplash-1600585154340-be6161a56a0c.jpg',
    ],
    stages: [
      [
        'Konsultasi konsep & kebutuhan di showroom atau via WhatsApp (kirim denah / foto ruangan)',
        'Kurasi dari 10.000+ sampel kain impor (Belgia, Italia, Turki) dan tenun lokal pilihan',
        'Rekomendasi komposisi fungsi: blackout, sheer, thermal, acoustic, hingga fire-retardant',
        'Persetujuan konsep, skema warna, dan estimasi anggaran awal',
      ],
      [
        'Bebas biaya survei di seluruh Jabodetabek — tim membawa koper katalog kain fisik',
        'Pengukuran laser distance meter: lebar, tinggi void, levelling, serta jalur kelistrikan motor',
        'Evaluasi kekuatan plafon beton, celah curtain box, dan akses instalasi',
        'Penawaran harga transparan diajukan pada hari yang sama di lokasi',
      ],
      [
        'Penjahitan manual oleh master tailor pengalaman 20+ tahun di in-house workshop',
        'Steam shaping treatment agar lipatan gelombang jatuh rapi permanen',
        'Hem berpemberat (weighted hem) & lead tape menjaga garis bawah tirai tetap lurus',
        'Rangka custom sofa: kayu solid oven + spring baja + busa HR premium',
      ],
      [
        'Teknisi in-house: pemasangan rapi tanpa debu noda, kelim karpet diselesaikan presisi',
        'Pemeriksaan kelurusan gelombang, uji fungsi motorized & kestabilan rel',
        'Garansi resmi rel & mekanisme 1–5 tahun, dicatat dalam kartu garansi tertulis',
        'Layanan purnajual: dry-clean profesional gorden & penggantian sparepart',
      ],
    ],
  },
  special: {
    kicker: 'Layanan Khusus & Kolaborasi',
    title1: 'Dirancang untuk',
    titleAccent: 'Kebutuhan yang Berbeda',
    note: 'Butuh penanganan khusus untuk proyek Anda? Konsultasikan kebutuhan spesifik bersama tim project kami.',
    ctaLabel: 'Reservasi Kunjungan Showroom',
    services: [
      {
        icon: Home as LucideIcon,
        title: 'Kunjungan Survei Rumah Gratis',
        desc: 'Konsultan datang langsung ke kediaman Anda di seluruh Jabodetabek membawa ratusan sampel kain tanpa biaya.',
        points: ['Pengukuran laser presisi di lokasi', 'Penawaran transparan di hari yang sama'],
      },
      {
        icon: Building2 as LucideIcon,
        title: 'Skema Trade & B2B Profesional',
        desc: 'Mitra terpercaya arsitek (IAI) dan desainer interior (HDII) dengan dukungan teknis penuh.',
        points: ['Peminjaman sample book untuk presentasi klien', 'Harga khusus bertingkat & garansi ketepatan deadline'],
      },
      {
        icon: Sparkles as LucideIcon,
        title: 'Proyek Komersial & Hospitality',
        desc: 'Hotel butik, restoran fine-dining, kedutaan, dan kantor korporat dengan standar commercial heavy-duty.',
        points: ['Material tahan abrasi & sertifikasi keamanan api', 'Instalasi massal terjadwal tanpa mengganggu operasional'],
      },
      {
        icon: Wifi as LucideIcon,
        title: 'Motorized & Smart Home',
        desc: 'Authorized partner Somfy & Dooya — rel otomatis senyap yang terhubung dengan ekosistem rumah pintar.',
        points: ['Remote, sakelar dinding, dan aplikasi smartphone', 'Integrasi Apple HomeKit, Google Home, dan Control4'],
      },
    ],
  },
  warranty: {
    kicker: 'Garansi & Layanan Purnajual',
    title1: 'Ketenangan Dimulai dari',
    titleAccent: 'Garansi & Dukungan',
    title3: 'yang Jelas',
    paragraph:
      'Investasi interior Anda layak dijaga. Kami mendampingi jauh setelah instalasi selesai — dengan kartu garansi tertulis, layanan perawatan berkala, dan tim servis yang responsif.',
    ctaLabel: 'Konsultasi Garansi via WhatsApp',
    waMessage:
      'Halo Nusa Atelier, saya ingin menanyakan garansi / layanan purnajual',
    items: [
      { icon: ShieldCheck as LucideIcon, title: 'Garansi Rel & Mekanisme 1–5 Tahun', desc: 'Garansi resmi tertulis untuk semua rel, motor, dan sistem mekanisme pemasangan.' },
      { icon: Droplets as LucideIcon, title: 'Dry-Clean Profesional', desc: 'Layanan pencucian gorden berstandar hotel beserta perawatan kain berkala.' },
      { icon: RefreshCcw as LucideIcon, title: 'Perawatan & Pemindahan Rel', desc: 'Penyesuaian tarikan, relokasi instalasi saat renovasi, hingga penggantian sparepart.' },
      { icon: Wrench as LucideIcon, title: 'After-Sales Responsif', desc: 'Tim servis menangani keluhan cepat dengan penjadwalan kunjungan yang jelas.' },
    ],
  },
  gallery: {
    kicker: 'Galeri Realisasi',
    title1: 'Bukti Karya yang',
    titleAccent: 'Telah Kami Selesaikan',
    note:
      'Sebagian cuplikan dari 1.800+ proyek yang telah kami kerjakan sejak 1992 — dari hunian pribadi, penthouse, hingga hotel butik.',
    items: [
      {
        image: '/assets/unsplash-1618221195710-dd6b41faaea6.jpg',
        alt: 'Ruang keluarga modern dengan gorden double drapery dan lining blackout',
        project: 'Gorden & Vitrase Linen',
        location: 'Residence · Pondok Indah',
      },
      {
        image: '/assets/unsplash-1600585152220-90363fe7e115.jpg',
        alt: 'Ruang tamu mewah dengan drapery netral dan sofa custom',
        project: 'Sofa Custom & Upholstery Velvet',
        location: 'Penthouse · Menteng',
      },
      {
        image: '/assets/unsplash-1615873968403-89e068629265.jpg',
        alt: 'Sofa berlapis kain bouclé bertekstur dengan kursi aksen',
        project: 'Reupholstery Bouclé',
        location: 'Boutique Hotel · Senopati',
      },
      {
        image: '/assets/unsplash-1581858726788-75bc0f6a952d.jpg',
        alt: 'Interior premium dengan gorden dan wallcovering seamless',
        project: 'Gorden & Silk Wallcovering',
        location: 'Apartment · SCBD',
      },
      {
        image: '/assets/unsplash-1600566753376-12c8ab7fb75b.jpg',
        alt: 'Hunian bergaya dengan tirai berwarna gelap dan furnitur kayu solid',
        project: 'Full Window Package & Blinds',
        location: 'Residence · BSD',
      },
      {
        image: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
        alt: 'Koleksi gorden motorized pada ruang konsultasi',
        project: 'Motorized Roller & Sheer',
        location: 'Office · Kuningan',
      },
    ],
  },
  ctaBand: {
    title: 'Wujudkan Ruang Impian Anda',
    accent: 'Mulai dari Konsultasi & Survei Gratis',
    description:
      'Reservasi kunjungan ke showroom kami di Fatmawati atau Pintu Air, atau hubungi konsultan kami via WhatsApp untuk diskusi awal tanpa komitmen.',
  },
};
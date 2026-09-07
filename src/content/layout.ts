export const SITE_INFO = {
  name: 'Nusa Atelier',
  tagline: 'Solusi Interior & Tekstil Mewah Berkelas Sejak 1992',
  foundedYear: '1992',
  experienceYears: '32+',
  projectsCount: '1.800+',
  fabricCount: '10.000+',
  phoneGeneral: '+62 21 555 0172',
  email: 'info@nusaatelier.com',
  instagram: '@nusaatelier.id',
  operationalHours: 'Senin - Sabtu: 09.00 - 18.00 WIB',
};

export type NavTargetType = 'anchor' | 'route';

export type NavMenuKind = 'links';

export interface NavChild {
  label: string;
  href: string;
  type: NavTargetType;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  type: NavTargetType;
  menu?: NavMenuKind;
  menuSubtitle?: string;
  children?: NavChild[];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '#beranda', type: 'anchor' },
  { label: 'Tentang', href: '/tentang-kami', type: 'route' },
  {
    label: 'Koleksi',
    href: '#koleksi-produk',
    type: 'anchor',
    menu: 'links',
    menuSubtitle: 'Jelajahi koleksi produk, material, dan gaya interior signature kami.',
    children: [
      {
        label: 'Koleksi & Produk Eksklusif',
        href: '/koleksi-produk',
        type: 'route',
        description: 'Seluruh katalog produk & material pilihan kami.',
      },
      {
        label: 'Spesialisasi Kami',
        href: '/koleksi-produk#koleksi-spesialisasi',
        type: 'route',
        description: 'Enam keahlian khusus — gorden hingga parquet & karpet.',
      },
      {
        label: 'Katalog Lengkap',
        href: '/koleksi-produk#katalog-lengkap',
        type: 'route',
        description: 'Semua produk dengan filter kategori cepat.',
      },
    ],
  },
  {
    label: 'Layanan',
    href: '#layanan',
    type: 'anchor',
    menu: 'links',
    menuSubtitle: 'Empat lini layanan interior terpadu dalam satu atap sejak 1992.',
    children: [
      {
        label: 'Layanan End-to-End Terpadu',
        href: '/layanan',
        type: 'route',
        description: 'Satu atap untuk seluruh kebutuhan interior Anda.',
      },
      {
        label: 'Ikhtisar Layanan Kami',
        href: '/layanan#layanan-ikhtisar',
        type: 'route',
        description: 'Kami mengelola seluruh proyek Anda secara utuh.',
      },
      {
        label: 'Ruang Lingkup Layanan',
        href: '/layanan#layanan-ruang-lingkup',
        type: 'route',
        description: 'Gorden, blinds, upholstery, wallpaper & flooring.',
      },
      {
        label: 'Proses Kerja Transparan',
        href: '/layanan#layanan-proses',
        type: 'route',
        description: 'Konsultasi, survei, workshop, instalasi bergaransi.',
      },
      {
        label: 'Layanan Khusus & Kolaborasi',
        href: '/layanan#layanan-khusus',
        type: 'route',
        description: 'Grosir kain, B2B arsitek, dan kolaborasi desainer.',
      },
      {
        label: 'Garansi & Layanan Purnajual',
        href: '/layanan#layanan-garansi',
        type: 'route',
        description: 'Garansi resmi 1–5 tahun & after-sales responsif.',
      },
      {
        label: 'Galeri Realisasi',
        href: '/layanan#layanan-galeri',
        type: 'route',
        description: 'Proyek nyata hunian, komersial, dan hotel.',
      },
    ],
  },
  { label: 'Showroom', href: '#showroom', type: 'anchor' },
  { label: 'FAQ', href: '#faq', type: 'anchor' },
];

export const LOGO = {
  mark: 'NA',
  brand: 'Nusa',
  brandSuffix: 'Atelier',
  brandSub: 'Indonesia',
  estLabel: 'EST. 1992',
  drawerBrand: 'Nusa Atelier',
  drawerSub: 'Navigasi Utama',
};

export const TOPBAR = {
  showroomLine: 'Showroom: Senopati & Menteng Jakarta',
  freeSurveyLabel: 'Survei Bebas Biaya',
  waMessage: 'Halo Nusa Atelier, saya tertarik untuk konsultasi interior',
};

export const HEADER_CTA = {
  showroomLabel: 'Reservasi Showroom',
  mobileShowroomLabel: 'Reservasi',
};

export const DRAWER = {
  contactsTitle: 'Kontak & Info',
  showroomLine: 'Showroom: Senopati & Menteng Jakarta',
  waMessage: 'Halo Nusa Atelier, saya tertarik konsultasi',
  reserveLabel: 'Reservasi Kunjungan Showroom',
};

export interface FooterLink {
  label: string;
  type: 'anchor' | 'route';
  target: string;
}

export const FOOTER = {
  brandMark: 'NA',
  brand: 'Nusa Atelier',
  brandSub: 'Atelier & Interior Tekstil • Est. 1992',
  description:
    'Penyedia solusi interior terpadu, gorden mewah, blinds modern, kain upholstery internasional, serta custom furniture berkelas di Jakarta. Melayani hunian residensial, penthouse, kedutaan besar, dan perhotelan selama lebih dari 3 dekade.',
  guaranteeLabel: 'In-House Workshop & Garansi Mekanisme Resmi',
  quickLinksTitle: 'Navigasi Cepat',
  quickLinks: [
    { label: 'Beranda', type: 'anchor', target: '#beranda' },
    { label: 'Tentang Kami', type: 'route', target: '/tentang-kami' },
    { label: 'Koleksi Produk', type: 'route', target: '/koleksi-produk' },
    { label: 'Layanan End-to-End', type: 'route', target: '/layanan' },
    { label: 'Lokasi Showroom', type: 'anchor', target: '#showroom' },
    { label: 'Pertanyaan Umum (FAQ)', type: 'anchor', target: '#faq' },
  ] as FooterLink[],
  categoriesTitle: 'Koleksi & Spesialisasi',
  categories: [
    { label: 'Gorden Ripple Fold & Vitrase Linen', type: 'route', target: '/koleksi-produk' },
    { label: 'Wooden Venetian Blinds & Motorized Roller', type: 'route', target: '/koleksi-produk' },
    { label: 'Kain Pelapis Sofa Bouclé & Velvet', type: 'route', target: '/koleksi-produk' },
    { label: 'Textured Silk & Acoustic Wallcovering', type: 'route', target: '/koleksi-produk' },
    { label: 'Custom Sofa & Reupholstery Service', type: 'route', target: '/koleksi-produk' },
    { label: 'Lantai Parquet Kayu & Karpet Wool', type: 'route', target: '/koleksi-produk' },
    { label: 'Divisi Grosir / Wholesale Kain', type: 'route', target: '/layanan' },
  ] as FooterLink[],
  showroomsTitle: 'Galeri Showroom Jakarta',
  showrooms: [
    {
      name: 'Showroom Senopati (Jakarta Selatan)',
      address: 'Jl. Senopati No. 21A, Kebayoran Baru',
      phone: 'Telp: (021) 555 0172',
    },
    {
      name: 'Studio Menteng (Jakarta Pusat)',
      address: 'Jl. HOS Cokroaminoto No. 12, Menteng',
      phone: 'Telp: (021) 555 0173',
    },
  ],
  reserveLabel: 'Reservasi Kunjungan Showroom',
  copyrightLine: (year: number) =>
    `© 1992 - ${year} PT Nusa Atelier. Seluruh Hak Cipta Dilindungi Undang-Undang.`,
  legal: ['Kebijakan Privasi', 'Syarat & Ketentuan Layanan', 'Pedoman Garansi'],
};
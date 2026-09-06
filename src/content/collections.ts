import type { LucideIcon } from 'lucide-react';
import { Building, Home, Ruler, Zap } from 'lucide-react';

export const PRODUCTS_PAGE = {
  hero: {
    breadcrumbLabel: 'Koleksi & Produk',
    kicker: 'Koleksi & Produk Eksklusif',
    title: 'Kurasi Interior & ',
    accent: 'Tekstil Mewah untuk Setiap Ruang',
    description:
      'Kami menghadirkan lebih dari 10.000 sampel kain impor, blinds motorik otomatis, dan perabotan custom made langsung dari workshop kami di Jakarta.',
    image: '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
    alt: 'Koleksi kain upholstery mewah',
  },
  advantages: [
    { icon: Ruler as LucideIcon, title: 'Custom Made 100%', desc: 'Setiap produk dibuat sesuai ukuran jendela, dinding, atau proporsi ruang Anda secara presisi.' },
    { icon: Zap as LucideIcon, title: 'Motorized & Smart Home', desc: 'Terintegrasi Somfy & Dooya. Dapat dikontrol via remote, app, atau voice assistant.' },
    { icon: Home as LucideIcon, title: 'In-House Workshop', desc: 'Penjahitan & produksi langsung di Jakarta. Kualitas terkontrol ketat dari awal hingga akhir.' },
    { icon: Building as LucideIcon, title: 'Trade & B2B Pricing', desc: 'Harga spesial untuk arsitek, desainer interior, toko, dan proyek berskala besar.' },
  ],
  catalogDetails: [
    {
      id: 'gorden',
      name: 'Gorden & Vitrase',
      tagline: 'Sistem gelombang presisi dengan jatuh kain mewah flawless',
      desc: 'Drapery elegan bergaya arsitektural modern dengan gelombang konsisten dari plafon hingga lantai. Kami menyediakan opsi ripple fold untuk estetika minimalis modern, French Pleat untuk nuansa klasik formal, hingga system double-layer untuk kombinasi vitrase sheer tembus cahaya dan blackout velvet. Setiap tirai dijahit custom berdasarkan ukuran jendela aktual Anda.',
      highlights: ['Ripple Fold & French Pleat custom', 'Double-layer sheer & blackout', 'Kompatibel motorized track', 'Tersedia 1.000+ motif & warna'],
      image: '/assets/unsplash-1513694203232-719a280e022f.jpg',
      alt: 'Gorden ripple fold mewah di ruang tamu',
    },
    {
      id: 'blinds',
      name: 'Blinds & Window Shades',
      tagline: 'Kontrol cahaya presisi dengan estetika bersih modern',
      desc: 'Solusi window covering modern mulai dari wooden venetian blinds kayu Basswood asli, roller blinds minimalis, hingga inovasi Silhouette & Shangri-La yang memadukan kelembutan sheer dan fleksibilitas louver. Pilihan motorized tersedia untuk semua seri, dengan kontrol melalui remote atau integrasi smart home.',
      highlights: ['Wooden Venetian slat 50mm premium', 'Silhouette & Shangri-La halus', 'Motorized Somfy & Dooya', 'UV protection hingga 90%'],
      image: '/assets/unsplash-1618221195710-dd6b41faaea6.jpg',
      alt: 'Wooden venetian blinds di ruang kerja',
    },
    {
      id: 'kain',
      name: 'Kain Upholstery & Sofa',
      tagline: 'Sensasi tekstur lembut, hangat, dan berseni tinggi',
      desc: 'Koleksi kain pelapis kursi dan sofa favorit desainer interior internasional. Mulai dari bouclé dan chenille yang sedang tren untuk sofa lengkung modern, kulit asli Italian full-grain yang bernilai investasi tinggi, hingga velvet dan linen premium yang memadukan ketahanan tinggi dengan keindahan visual.',
      highlights: ['Bouclé & Chenille high durability', 'Italian Full Grain Leather', 'Martindale test > 60.000 rubs', 'Stain-resistant nano treatment'],
      image: '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
      alt: 'Kain bouclé dan kulit Italian di sofa',
    },
    {
      id: 'wallpaper',
      name: 'Wallpaper & Wallcovering',
      tagline: 'Pelapis dinding bertekstur mewah dengan pendar cahaya sutra',
      desc: 'Bukan sekadar kertas dinding biasa, melainkan wallcovering tekstil anyaman sutra, linen, dan serat tumbuhan alami yang dipasang rapi tanpa sambungan terlihat. Memberikan dimensi dan kedalaman pada dinding hunian sekaligus menawarkan kenyamanan akustik yang signifikan.',
      highlights: ['Seamless installation tanpa sambungan', 'Acoustic comfort meredam gema', 'Bebas VOC & tidak berbau tajam', 'Fire retardant Class A'],
      image: '/assets/unsplash-1618219908412-a29a1bb7b86e.jpg',
      alt: 'Wallcovering tekstil sutra di foyer',
    },
    {
      id: 'furniture',
      name: 'Custom Furniture',
      tagline: 'Furnitur dibuat khusus sesuai proporsi dan sudut ruang Anda',
      desc: 'Kami memproduksi sofa custom, kursi makan, headboard tempat tidur, dan credenza dengan rangka kayu solid oven—kayu jati atau mahoni—serta busa densitas tinggi HR yang tidak mudah kempes. Pilihan kain, kulit, piping, dan dimensi dapat disesuaikan sepenuhnya.',
      highlights: ['Rangka kayu jati/mahoni oven', 'Busa HR high-resilience tahan lama', 'Pilihan kain & piping detail', 'Ukuran, kedalaman & keempukan custom'],
      image: '/assets/unsplash-1555041469-a586c61ea9bc.jpg',
      alt: 'Sofa custom curved di ruang tamu',
    },
    {
      id: 'flooring',
      name: 'Lantai Parquet & Karpet',
      tagline: 'Kemewahan pijakan lantai dengan estetika hangat alami',
      desc: 'Pilihan lantai kayu engineered oak bermotif herringbone atau chevron bergaya mansion Eropa, serta karpet custom hand-tufted dari serat wol New Zealand untuk kenyamanan kaki tanpa tanding. Tersedia opsi underfloor heating safe untuk kenyamanan maksimal.',
      highlights: ['Engineered European White Oak', 'Hand-tufted 100% NZ Wool', 'Anti gores & anti rayap', 'Tahan underfloor heating'],
      image: '/assets/unsplash-1581858726788-75bc0f6a952d.jpg',
      alt: 'Lantai herringbone dan karpet wool',
    },
  ],
  fullCatalog: {
    kicker: 'Katalog Lengkap',
    title1: 'Semua Produk',
    titleAccent: 'Eksklusif',
    title3: 'Kami',
    specTitle: 'Spesifikasi Bahan:',
    detailLabel: 'Detail Bahan',
    reserveLabel: 'Reservasi Kunjungan',
  },
  ctaBand: {
    title: 'Kirimkan Gambar Denah atau Referensi Desain Anda',
    description:
      'Kami menghitung kebutuhan kain, rel, dan estimasi biaya secara transparan dan gratis berdasarkan gambar denah atau referensi arsitek Anda.',
  },
};
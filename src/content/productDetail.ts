import type { LucideIcon } from 'lucide-react';
import {
  Clock,
  MessageCircle,
  Paintbrush,
  PenTool,
  Ruler,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export const PRODUCT_DETAIL_PAGE = {
  homeLabel: 'Beranda',
  catalogLabel: 'Koleksi & Produk',
  hero: {
    reserveLabel: 'Reservasi Kunjungan Showroom',
    sampleLabel: 'Tanya Sampel via WhatsApp',
  },
  gallery: {
    kicker: 'Galeri Inspirasi',
    title1: 'Detail dalam',
    titleAccent: 'Setiap Sudut Ruang',
  },
  specs: {
    kicker: 'Spesifikasi & Detail Teknis',
    title1: 'Spesifikasi',
    titleAccent: 'Lengkap Produk',
    note: 'Spesifikasi dapat disesuaikan dengan kebutuhan dan kondisi lapangan Anda. Seluruh pengukuran akhir dilakukan saat survei on-site oleh tim teknis kami.',
  },
  quickFacts: [
    { icon: Clock as LucideIcon, title: 'Estimasi Pengerjaan', desc: '7–21 hari kerja menyesuaikan kompleksitas desain dan luas area.' },
    { icon: ShieldCheck as LucideIcon, title: 'Garansi Resmi', desc: '1–5 tahun untuk rel, mekanisme, dan motor motorized.' },
    { icon: Ruler as LucideIcon, title: 'Survei & Pengukuran', desc: '100% gratis untuk area Jabodetabek — tim membawa koper sampel kain.' },
    { icon: Paintbrush as LucideIcon, title: 'Fully Customizable', desc: 'Ukuran, warna, tekstur, dan mekanisme dapat disesuaikan sepenuhnya.' },
  ],
  needToKnowTitle1: 'Yang Perlu',
  needToKnowAccent: 'Anda Ketahui',
  materials: {
    kicker: 'Komposisi Material',
    title1: 'Komposisi Bahan',
    titleAccent: '& Komponen',
  },
  features: {
    kicker: 'Keunggulan',
    title1: 'Fitur Utama',
    titleAccent: 'Produk Ini',
  },
  callouts: {
    placementTitle: 'Rekomendasi Penempatan',
    craftsmanshipTitle: 'Jaminan Craftsmanship In-House',
    craftsmanshipDesc:
      'Setiap pesanan dipotong dan dijahit secara custom sesuai ukuran akurat jendela atau ruang Anda. Termasuk jasa steam shaping, blind-stitch hem, dan pemasangan oleh teknisi internal Nusa Atelier di seluruh Jabodetabek.',
  },
  explore: {
    kicker: 'Jelajahi Lebih Lanjut',
    title1: 'Semua Produk',
    titleAccent: 'dalam Satu Tampilan',
    detailLabel: 'Lihat Detail',
  },
  order: {
    kicker: 'Alur Pemesanan',
    title1: 'Cara Memesan',
    titleAccent: 'Produk Ini',
    steps: [
      { icon: MessageCircle as LucideIcon, title: 'Konsultasi via WhatsApp', desc: 'Ceritakan kebutuhan dan ukuran ruang Anda. Kami dampingi memilih material beserta mekanisme yang paling sesuai.' },
      { icon: Ruler as LucideIcon, title: 'Survei & Pengukuran Gratis', desc: 'Teknisi kami datang mengukur presisi dan membawa koper sampel kain untuk dicoba langsung di tempat.' },
      { icon: PenTool as LucideIcon, title: 'Produksi Custom In-House', desc: 'Dipotong, dijahit, dan dirakit oleh craftsman internal mengikuti spesifikasi final yang disepakati.' },
      { icon: Truck as LucideIcon, title: 'Pemasangan & Garansi', desc: 'Tim internal memasang rapi di lokasi, dilanjutkan penyetelan akhir serta masa garansi resmi.' },
    ],
  },
  ctaBand: {
    title: 'Melihat & Menyentuh Langsung Koleksi Terbaik Kami',
    accent: 'Konsultasi & Survei di Jabodetabek 100% Gratis.',
    description:
      'Kunjungi showroom kami untuk mencoba langsung sampel material {product}, menyaksikan kualitas jahitan serta rel motorized, dan berdiskusi bebas biaya dengan konsultan interior kami.',
  },
};
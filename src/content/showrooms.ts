export interface Showroom {
  id: string;
  name: string;
  district: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  facilities: string[];
  image: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
}

export const SHOWROOMS_DATA: Showroom[] = [
  {
    id: 'senopati-south-jakarta',
    name: 'Showroom Senopati (Jakarta Selatan)',
    district: 'Kebayoran Baru, Jakarta Selatan',
    address: 'Jl. Senopati No. 21A, Kramat Pela, Kebayoran Baru',
    city: 'Jakarta Selatan 12120',
    hours: 'Senin - Sabtu: 09.00 - 18.00 WIB | Minggu: Dengan Janji Temu',
    phone: '+62 21 555 0172',
    facilities: ['Koleksi Sampel Kain Terlengkap (10.000+ Fabric)', 'Display Sistem Motorized Blinds & Gorden', 'Ruang Konsultasi Arsitek & Desainer', 'Area Parkir Luas & Valet Tamu'],
    image: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jl.+Senopati+No.21A+Kramat+Pela+Jakarta+Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsUrl: 'https://maps.google.com/?q=Showroom+Nusa+Atelier+Senopati',
  },
  {
    id: 'menteng-central-jakarta',
    name: 'Studio Menteng (Jakarta Pusat)',
    district: 'Menteng, Jakarta Pusat',
    address: 'Jl. HOS Cokroaminoto No. 12, Gondangdia, Menteng',
    city: 'Jakarta Pusat 10310',
    hours: 'Senin - Sabtu: 09.00 - 17.30 WIB | Minggu: Tutup',
    phone: '+62 21 555 0173',
    facilities: ['Divisi Tekstil Wholesale & Retail', 'Koleksi Kain Sutra, Jacquard & Damask Klasik', 'Workshop Penjahitan & Custom Upholstery', 'Konsultasi Proyek Berskala Besar'],
    image: '/assets/unsplash-1600585152220-90363fe7e115.jpg',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jl.+HOS+Cokroaminoto+Menteng+Jakarta+Pusat&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsUrl: 'https://maps.google.com/?q=Studio+Nusa+Atelier+Menteng',
  },
];
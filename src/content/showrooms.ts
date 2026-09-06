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
    id: 'fatmawati-south-jakarta',
    name: 'Showroom Fatmawati (Jakarta Selatan)',
    district: 'Kebayoran Baru, Jakarta Selatan',
    address: 'Jl. RS Fatmawati No. 5A - D, RT.1/RW.6, Gandaria Utara, Kebayoran Baru',
    city: 'Jakarta Selatan 12140',
    hours: 'Senin - Sabtu: 09.00 - 18.00 WIB | Minggu: Dengan Janji Temu',
    phone: '+62 21 750 4911',
    facilities: ['Koleksi Sampel Kain Terlengkap (10.000+ Fabric)', 'Display Sistem Motorized Blinds & Gorden', 'Ruang Konsultasi Arsitek & Desainer', 'Area Parkir Luas & Valet Tamu'],
    image: '/assets/unsplash-1616046229478-9901c5536a45.jpg',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jl.+RS+Fatmawati+No.5A+Gandaria+Utara+Jakarta+Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsUrl: 'https://maps.google.com/?q=Home+Decor+Indonesia+Fatmawati',
  },
  {
    id: 'pintu-air-central-jakarta',
    name: 'Heritage Studio Pintu Air (Jakarta Pusat)',
    district: 'Pasar Baru, Jakarta Pusat',
    address: 'Jl. Pintu Air Raya No. 34 - 36, Pasar Baru, Sawah Besar',
    city: 'Jakarta Pusat 10710',
    hours: 'Senin - Sabtu: 09.00 - 17.30 WIB | Minggu: Tutup',
    phone: '+62 21 384 7228',
    facilities: ['Divisi Tekstil Wholesale & Retail', 'Koleksi Kain Sutra, Jacquard & Damask Klasik', 'Workshop Penjahitan & Custom Upholstery', 'Konsultasi Proyek Berskala Besar'],
    image: '/assets/unsplash-1600585152220-90363fe7e115.jpg',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Jl.+Pintu+Air+Raya+Pasar+Baru+Jakarta+Pusat&t=&z=15&ie=UTF8&iwloc=&output=embed',
    googleMapsUrl: 'https://maps.google.com/?q=Home+Decor+Indonesia+Pintu+Air',
  },
];
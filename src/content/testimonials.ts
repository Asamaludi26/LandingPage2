export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  projectType: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'testi-1',
    quote: 'Nusa Atelier sudah menjadi andalan kami selama lebih dari 15 tahun. Mulai dari gorden rumah tinggal kami di Menteng hingga villa di Bali. Jahitan ripple-fold mereka sangat rapi, tidak ada kerutan aneh, dan tim instalasinya sangat sopan serta teliti menjaga kebersihan lantai.',
    author: 'Ibu Ratna Sastrowardoyo',
    role: 'Pemilik Hunian & Kolektor Seni',
    location: 'Menteng, Jakarta Pusat',
    avatar: '/assets/unsplash-1544005313-94ddf0286df2.jpg',
    projectType: 'Private Residence (Drapery & Reupholstery)',
  },
  {
    id: 'testi-2',
    quote: 'Sebagai arsitek, detail sambungan kain dan kelurusan rel gorden adalah hal krusial. Nusa Atelier memiliki workshop sendiri sehingga akurasi ukuran jendela void setinggi 5.5 meter kami pas milimeter demi milimeter. Sangat profesional dan rekomendasi utama saya.',
    author: 'Ar. Hendra Kusuma, IAI',
    role: 'Principal Architect & Desainer Interior',
    location: 'Senopati, Jakarta Selatan',
    avatar: '/assets/unsplash-1507003211169-0a1dd7228f2d.jpg',
    projectType: 'Luxury Villa & Penthouse Projects',
  },
  {
    id: 'testi-3',
    quote: 'Proses surveinya sangat membantu. Mereka datang ke apartemen saya di Sudirman membawa 6 koper katalog sampel kain, jadi saya bisa langsung cocokkan dengan warna marmer dan pencahayaan lampu malam. Pelayanan bintang lima dari awal sampai selesai.',
    author: 'Bpk. David Tanaka',
    role: 'Managing Director & Resident',
    location: 'Sudirman Anandamaya Penthouse',
    avatar: '/assets/unsplash-1500648767791-00dcc994a43e.jpg',
    projectType: 'Motorized Drapery & Silk Wallcovering',
  },
];
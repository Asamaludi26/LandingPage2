export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Konsultasi & Kurasi Material',
    description: 'Diskusikan visi ruang impian Anda bersama konsultan interior kami di showroom atau kirimkan denah/foto ruangan via WhatsApp. Kami membantu memilih karakter kain, warna, dan tekstur yang harmonis.',
    icon: 'MessageSquareText',
  },
  {
    step: '02',
    title: 'Survei On-Site & Pengukuran Presisi',
    description: 'Tim teknis ahli kami datang langsung ke lokasi Anda di seluruh Jabodetabek bebas biaya. Kami membawa koper katalog kain fisik agar Anda bisa melihat warna asli di bawah pencahayaan ruangan Anda.',
    icon: 'Ruler',
  },
  {
    step: '03',
    title: 'Craftsmanship di Workshop Kami',
    description: 'Setiap gorden, sofa, dan blinds dijahit dengan teliti di in-house workshop kami oleh master tailor berpengalaman 20+ tahun, dengan jahitan kelim presisi dan rel kualitas premium standar hotel bintang 5.',
    icon: 'Scissors',
  },
  {
    step: '04',
    title: 'Instalasi Bersih & Garansi Penuh',
    description: 'Teknisi in-house kami memasang dengan rapi, memeriksa kelurusan gelombang, merapikan uap panas (steam pleat), serta memberikan garansi resmi rel dan mekanisme pergerakan.',
    icon: 'ShieldCheck',
  },
];